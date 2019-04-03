const Generator = require('yeoman-generator/lib');

module.exports = class Webpack extends Generator {
    constructor(args, opts) {
        super(args, opts);

        this.option('fullstack', {
            type: Boolean,
            required: false,
            default: false,
            desc: 'Include both client and server projects'
        });

        this.option('sass', {
            type: Boolean,
            required: false,
            default: false,
            desc: 'Include SASS .scss files'
        });

        this.option('destinationPath', {
            type: String,
            required: false,
            desc: 'Destination path of a files',
            default: 'src'
        });

        this.option('type', {
            type: String,
            required: false,
            desc: 'Include React support',
            default: 'client'
        });

        this.option('react', {
            type: Boolean,
            required: false,
            desc: 'Include React support',
            default: false
        });

        this.option('loadable', {
            type: Boolean,
            required: false,
            desc: 'Include webpack',
            default: false
        });
    }

    configuring() {
        const {
            destinationPath,
            loadable,
            react
        } = this.options;
        // this.composeWith(require.resolve('generator-license'));

        this.composeWith(require.resolve('../../babel/app'), {
            react,
            loadable
        });
        this.composeWith(require.resolve('../../assets/app'), {
            path: `${destinationPath}/assets`
        });

        this.composeWith(require.resolve('../../jest/app'));
        this.composeWith(require.resolve('../../eslint/app'), {
            react
        });
    }

    _createWebpackFiles() {
        const {options} = this;

        if (options.type === 'client') {
            this.fs.copyTpl(
                this.templatePath('webpack.config.client.js'),
                this.destinationPath('webpack.config.js'),
                this.options
                // Object.assign({}, this.options, {
                //     react: isReact(promptValues.projectType)
                // }),
            );
        }
        if (options.type === 'server') {
            this.fs.copyTpl(
                this.templatePath('webpack.config.server.js'),
                this.destinationPath('webpack.config.js'),
                this.options
                // filters
            );
        }
        if (options.type === 'fullstack') {
            this.fs.copyTpl(
                this.templatePath('webpack.config.server.js'),
                this.destinationPath('webpack.config.server.js'),
                this.options
                // Object.assign({}, this.options, {
                //     react: isReact(promptValues.projectType)
                // }),
            );
            this.fs.copyTpl(
                this.templatePath('webpack.config.client.js'),
                this.destinationPath('webpack.config.client.js'),
                this.options
                // Object.assign({}, this.options, {
                //     react: isReact(promptValues.projectType)
                // }),
            );
        }
    }



    writing() {
        this._createWebpackFiles();

    }

    _getDefaultPackage() {
        const {type, destinationPath, react, sass, name, fullstack} = this.options;
        const scriptServer = {
            start: 'webpack -w',
            'start:mongo': 'docker run --rm -d -p 27017:27017 --name mongo mongos',
            build: 'run-s clean webpack --env.prod',
            'clean': 'rimraf dist/',
        };

        const scriptClient = {
            start: 'webpack-dev-server',
            build: 'npm-run-s clean webpack --env.prod',
            'clean': 'rimraf dist/',
        };

        const scriptsFullstack = {
            start: 'run-p start:client start:server',
            'start:client': 'webpack-dev-server --config webpack.config.client.js',
            'start:server': 'webpack -w --config webpack.config.server.js',
            'start:mongo': 'run-p build:server build:client',
            'build': 'webpack --env.prod --config webpack.config.client.js',
            'build:client': 'webpack --env.prod --config webpack.config.client.js',
            'build:server': 'webpack --env.prod --config webpack.config.server.js',
            'clean': 'rimraf dist/',
        };

        let scripts = scriptClient;
        if (type === 'server') {
            scripts = scriptServer;
        } else if (type === 'fullstack') {
            scripts = scriptsFullstack;
        }

        return {
            name: name,
            version: '0.0.0',
            engines: {node: ">=6"},
            scripts,
            main: `${destinationPath}/index.${react ? 'jsx' : 'js'}`,
            dependencies: {},
            devDependencies: {}
        };
    }

    _createPackage() {
        this.fs.extendJSON(this.destinationPath('package.json'), this._getDefaultPackage());
    }

    _installDevPackages() {
        this.npmInstall([
            'webpack',
            'webpack-cli',
            'webpack-bundle-analyzer',
            'npm-run-all'
        ], {'save-dev': true});

    }

    _handleClientWebpackPackages() {
        const {options} = this;
        const sass = options.sass ? ['node-sass', 'sass-loader'] : [];
        this.npmInstall([
            'css-hot-loader',
            'css-loader',
            'html-webpack-plugin',
            'terser-webpack-plugin',
            'identity-obj-proxy',
            'mini-css-extract-plugin',
            'optimize-css-assets-webpack-plugin',
            'style-loader',
            'webpack-dev-server'
        ].concat(sass), {'save-dev': true});
    }

    _handleServerDevDependencies() {
        if (this.options.type === 'server' || this.options.type === 'fullstack') {
            this.npmInstall([
                'generate-json-webpack-plugin',
                'nodemon-webpack-plugin',
                'webpack-node-externals',
                'dotenv'
            ], { 'save-dev': true });
        }
    }

    install() {
        this._createPackage();
        this._handleClientWebpackPackages();
        this._handleServerDevDependencies();
        this._installDevPackages();
    }
};
