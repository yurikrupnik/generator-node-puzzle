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

    configuring() {
        this.composeWith(require.resolve('../../../../../webpack/app'), {
            type: 'server',
            sass: this.options.sass,
            ssr: this.options.ssr,
            destinationPath: this.options.destinationPath,
            // loadable: this.options.loadable
        });
        // this._buildCodeSrcFolder();
        // this.config.set({
        //     //     src: this.options.codeSrc,
        //     componentDestination: this.options.codeSrc + 'components',
        //     // apiDestination: this.options.codeSrc + 'api'
        // });
    }

    writing() {
        const { destinationPath, port, db, auth, io, oauth } = this.options;
        // console.log('oauth', oauth);

        this.fs.copyTpl(
            this.templatePath(),
            this.destinationPath(destinationPath),
            {
                port,
                db,
                // path: 'd',
                io,
                auth,
                oauth
            }
        );
    }

    install() {
        // console.log('App this.config.getAll()', this.config.getAll());

        this.npmInstall([
            'express',
            'morgan'
        ]);
    }
};
