const Generator = require('yeoman-generator/lib');
const basename = require('path').basename;
var mkdirp = require('mkdirp');

module.exports = class KoaGenerator extends Generator {
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

        this.option('css', {
            type: Boolean,
            required: false,
            desc: 'Include css support',
            default: false
        });

        this.option('sass', {
            type: Boolean,
            required: false,
            desc: 'Include sass support',
            default: false
        });

        this.option('port', {
            type: Number,
            required: false,
            desc: 'Port to use',
            default: 5000
        });

        this.option('ssr', {
            type: Boolean,
            required: false,
            desc: 'Support server side rendering',
            default: false
        });

        // this.option('db', {
        //     type: Boolean,
        //     required: false,
        //     desc: 'Include Database',
        //     default: false
        // });
        //
        // this.option('io', {
        //     type: Boolean,
        //     required: false,
        //     desc: 'Include socket.io',
        //     default: false
        // });
        //
        // this.option('oauth', { // todo check array values
        //     type: String,
        //     // required: false,
        //     // desc: 'Include oauth services',
        //     // default: ''
        // });
    }

    configuring() {
        const { type, css, sass, destinationPath, ssr } = this.options;
        const { promptValues } = this.config.getAll();
        this.composeWith(require.resolve('../../../../../webpack/app'), {
            type,
            sass: promptValues && promptValues.sass || sass,
            css: css || promptValues.viewEngine,
            destinationPath,
            ssr
        });
    }

    writing() {
        const { destinationPath, port, db, auth, io, oauth } = this.options;
        this.fs.copyTpl(
            this.templatePath(),
            this.destinationPath(destinationPath),
            {
                port,
                db,
                io,
                auth,
                oauth
            }
        );

    }

    install() {
        this.npmInstall([
            'koa',
            'koa-logger',
            'koa-router'
        ]);
    }
};
