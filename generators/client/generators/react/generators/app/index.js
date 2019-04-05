var Generator = require('yeoman-generator');

module.exports = class ReactGenerator extends Generator {
    constructor(args, opts) {
        super(args, opts);

        this.option('type', {
            type: String,
            required: false,
            desc: 'Project type',
            default: 'client'
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
            desc: 'Include css files',
            default: true
        });

        this.option('sass', {
            type: Boolean, // todo check that
            required: false,
            desc: 'Include sass support',
            default: false
        });
    }

    configuring() {
        this.composeWith(require.resolve('../../../../../webpack/app'), {
            type: this.options.type,
            react: true,
            extensions: '.jsx',
            sass: this.options.sass,
            destinationPath: this.options.destinationPath,
            css: this.options.css,
            loadable: this.options.loadable
        });
    }

    writing() {
        const { srr, destinationPath, type } = this.options;

        if (type === 'fullstack') {
            this.fs.copyTpl(
                this.templatePath('index.jsx'),
                this.destinationPath(`${destinationPath}/client.jsx`),
                { srr }
            );

            this.fs.copyTpl(
                this.templatePath('routes'),
                this.destinationPath(`${destinationPath}/routes`),
                { srr }
            );
            this.fs.copyTpl(
                this.templatePath('components'),
                this.destinationPath(`${destinationPath}/components`),
                { srr }
            );
        } else {
            this.fs.copyTpl(
                this.templatePath(),
                this.destinationPath(destinationPath),
                { srr }
            );
        }
    }

    _installPackages() {
        this.npmInstall([
            'react',
            'prop-types',
            'react-dom',
            'react-router',
            'react-router-dom',
            'react-loadable'
        ]);
    }

    _installDevPackages() {
        this.npmInstall([
            'react-testing-library'
        ], {'save-dev': true});
    }

    install() {
        this._installPackages();
        this._installDevPackages();
    }
};
