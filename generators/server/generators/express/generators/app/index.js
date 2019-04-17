const Generator = require('yeoman-generator/lib');
// const basenam/**/e = require('path').basename;
// var mkdirp = require('mkdirp');

module.exports = class ExpressGenerator extends Generator {
    constructor(args, opts) {
        super(args, opts);


        this.option('type', {
            type: String,
            required: false,
            desc: 'Project type',
            default: 'server'
        });

        this.option('destinationPath', {
            type: String,
            required: false,
            desc: 'Destination path of a files',
            default: 'src'
        });

        this.option('sass', {
            type: Boolean,
            required: false,
            desc: 'Include sass support',
            default: false
        });

        this.option('ssr', {
            type: Boolean,
            required: false,
            desc: 'Support server side rendering',
            default: false
        });

        this.option('port', {
            type: Number,
            required: false,
            desc: 'Port to use',
            default: 5000
        });

        this.option('db', {
            type: Boolean,
            required: false,
            desc: 'Include Database',
            default: false
        });

        this.option('io', {
            type: Boolean,
            required: false,
            desc: 'Include socket.io',
            default: false
        });

        this.option('oauth', { // todo check array values
            type: String,
            // required: false,
            // desc: 'Include oauth services',
            // default: ''
        });
    }

    async prompting() {
        this.props = await this.prompt([
            {
                type: 'confirm',
                name: 'db',
                message: 'Would you like to use MongoDB?',
            },
            {
                type: 'confirm',
                name: 'auth',
                message: 'Would you scaffold out an authentication boilerplate?',
                when: answers => answers.db
            },
            {
                type: 'confirm',
                name: 'io',
                message: 'Would you like to use SocketIO?',
                default: true
            }
        ]);
    }

    configuring() {
        this.composeWith(require.resolve('../../../../../webpack/app'), {
            type: this.options.type,
            sass: this.options.sass,
            ssr: this.options.ssr,
            destinationPath: this.options.destinationPath,
            // loadable: this.options.loadable
        });
    }

    writing() {
        const { destinationPath, port, ssr, type } = this.options;
        const { db, auth, io } = this.props;

        if (db) {
            this.fs.copy(
                this.templatePath('services/db'),
                this.destinationPath(`${destinationPath}/services/db`),
            );

            this.fs.copy(
                this.templatePath('api/projects'),
                this.destinationPath(`${destinationPath}/api/projects`),
            );

            this.fs.copy(
                this.templatePath('api/users'),
                this.destinationPath(`${destinationPath}/api/users`),
            );

            this.fs.copyTpl(
                this.templatePath('api/index.js'),
                this.destinationPath(`${destinationPath}/api/index.js`),
                { db, auth }
            );

            this.fs.copy(
                this.templatePath('api/methods.js'),
                this.destinationPath(`${destinationPath}/api/methods.js`),
            );
        } else {
            this.fs.copy(
                this.templatePath('api/pure'),
                this.destinationPath(`${destinationPath}/api/users`),
            );
        }

        if (io) {
            this.fs.copy(
                this.templatePath('services/socket'),
                this.destinationPath(`${destinationPath}/services/socket`),
            );
        }

        if (auth) {
            this.fs.copy(
                this.templatePath('services/passport'),
                this.destinationPath(`${destinationPath}/services/passport`),
            );

            this.fs.copy(
                this.templatePath('api/auth'),
                this.destinationPath(`${destinationPath}/api/auth`),
            );
        }

        if (ssr) {
            this.fs.copy(
                this.templatePath('services/render'),
                this.destinationPath(`${destinationPath}/services/render`),
            );
        }

        const { promptValues } = this.config.getAll();
        const extension = promptValues && promptValues.viewEngine === 'react' ? 'jsx' : 'js';
        this.fs.copyTpl(
            this.templatePath('index.js'),
            this.destinationPath(`${destinationPath}/${type === 'fullstack' ? 'server': 'index'}.${extension}`),
            {
                port,
                db,
                io,
                auth,
                ssr
            }
        );
    }

    install() {
        const { db, auth, io } = this.props;
        this.npmInstall([
            'express',
            'morgan'
        ]);

        if (db) {
            this.npmInstall([
                'connect-mongo',
                'express-session',
                'mongoose'
            ]);
        }

        if (auth) {
            this.npmInstall([
                'bcrypt',
                'faker',
                'passport',
                'passport-local',
                'passport-facebook',
                'shortid'
            ]);
        }

        if (io) {
            this.npmInstall([
                'socket.io',
                'socket.io-client'
            ]);
        }
    }

};
