const Generator = require('yeoman-generator/lib');
const basename = require('path').basename;
var mkdirp = require('mkdirp');

module.exports = class KoaGenerator extends Generator {
    constructor(args, opts) {
        super(args, opts);

        this.option('path', {
            type: String,
            required: false,
            desc: 'Destination path of a files',
            default: ''
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

    // configuring() {
    //     // this._buildCodeSrcFolder();
    //     this.config.set({
    //         //     src: this.options.codeSrc,
    //         componentDestination: this.options.codeSrc + 'components',
    //         // apiDestination: this.options.codeSrc + 'api'
    //     });
    // }

    writing() {
        const { path, port, db, auth, io, oauth } = this.options;
        this.fs.copyTpl(
            this.templatePath(),
            this.destinationPath(path),
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
        // console.log('App this.config.getAll()', this.config.getAll());

        // this.npmInstall();
    }
};
