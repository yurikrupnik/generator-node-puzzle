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
            // loadable: this.options.loadable
        });
    }

    writing() {
        const { ssr, type, sass, destinationPath } = this.options;
        // routes
        this.fs.copy(
            this.templatePath('routes'),
            this.destinationPath(`${destinationPath}/routes`)
        );

        // components
        this.fs.copy(
            this.templatePath('components'),
            this.destinationPath(`${destinationPath}/components`)
        );

        // api
        this.fs.copy(
            this.templatePath('api'),
            this.destinationPath(`${destinationPath}/api`)
        );

        this.fs.copyTpl(
            this.templatePath('index.jsx'),
            this.destinationPath(`${destinationPath}/${type === 'fullstack' ? 'client.jsx' : 'index.jsx'}`),
            {
                ssr,
                sass
            }
        );
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
