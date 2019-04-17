const Generator = require('yeoman-generator/lib');
const questions = require('./questions');

module.exports = class ServicesGenerator extends Generator {
    constructor(args, opts) {
        super(args, opts);

        this.option('destinationPath', {
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

    async prompting() {
        this.props = await this.prompt(questions);
    }

    // configuring() {
    //     // this._buildCodeSrcFolder();
    //     this.config.set({
    //     //     src: this.options.codeSrc,
    //         componentDestination: this.options.codeSrc + 'components',
    //         // apiDestination: this.options.codeSrc + 'api'
    //     });
    // }

    writing() {
        const { db, auth, io, oauth } = this.props;
        const { path, port } = this.options;
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
