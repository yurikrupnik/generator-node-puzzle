const Generator = require('yeoman-generator/lib');
const path = require('path');

module.exports = class Webpack extends Generator {
    constructor(args, opts) {
        super(args, opts);

        this.option('name', {
            type: String,
            required: false,
            desc: 'Project root folder',
            default: path.basename(process.cwd())
        });

        this.option('type', {
            type: String,
            required: false,
            desc: 'Project type',
            default: 'client'
        });


        this.option('css', {
            type: Boolean,
            required: false,
            default: false,
            desc: 'Include css support'
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

        this.option('vue', {
            type: Boolean,
            required: false,
            desc: 'Include Vue support',
            default: false
        });

        this.option('angular', {
            type: Boolean,
            required: false,
            desc: 'Include Vue support',
            default: false
        });

        this.option('port', {
            type: Number,
            required: false,
            desc: 'Include webpack',
            default: 5000
        });

        this.option('loadable', {
            type: Boolean,
            required: false,
            desc: 'Include webpack',
            default: false
        });

        this.option('ssr', {
            type: Boolean,
            required: false,
            desc: 'Support server side rendering',
            default: false
        });
    }

    default() {
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
            destinationPath: `${destinationPath}/assets`
        });

        this.composeWith(require.resolve('../../eslint/app'), {
            react
        });
    }

    _createWebpackFiles() {
        const { options } = this;
        const { type, destinationPath } = options;
        const isFullstack = type === 'fullstack';
        if (type === 'client') {
            this.fs.copyTpl(
                this.templatePath('webpack.config.client.js'),
                this.destinationPath('webpack.config.js'),
                Object.assign({}, options, {
                    isFullstack
                })
            );
        }
        if (options.type === 'server') {
            this.fs.copyTpl(
                this.templatePath('webpack.config.server.js'),
                this.destinationPath('webpack.config.js'),
                Object.assign({}, options, {
                    isFullstack
                })
            );
        }
        if (options.type === 'fullstack') {
            this.fs.copyTpl(
                this.templatePath('webpack.config.server.js'),
                this.destinationPath('webpack.config.server.js'),
                Object.assign({}, options, {
                    isFullstack
                })
            );
            this.fs.copyTpl(
                this.templatePath('webpack.config.client.js'),
                this.destinationPath('webpack.config.client.js'),
                Object.assign({}, options, {
                    isFullstack
                })
            );
        }

        // copy config.js file
        this.fs.copyTpl(
            this.templatePath('config.js'),
            this.destinationPath(`${destinationPath}/config.js`),
            Object.assign({}, options, {
                isFullstack
            })
        );

        // copy index.ejs file
        this.fs.copyTpl(
            this.templatePath('index.ejs'),
            this.destinationPath(`${destinationPath}/index.ejs`),
            Object.assign({}, options, {
                isFullstack
            })
        );
    }

    writing() {
        this._createWebpackFiles();
    }

    _getDefaultPackage() {
        const { type, destinationPath, react, name } = this.options;

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
            'start:client': 'webpack --c webpack.config.client.js',
            'start:server': 'webpack -w --c webpack.config.server.js',
            'start:mongo': 'docker run --rm -d -p 27017:27017 --name mongo mongo',
            'build': 'npm-run-all run-p build:server build:client',
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
            description: '',
            main: `${destinationPath}/${type === 'fullstack' ? 'server' : 'index'}.${react ? 'jsx' : 'js'}`,
            scripts,
            repository: {
                type: '',
                url: ''
            },
            dependencies: {},
            devDependencies: {},
            engines: {node: ">=6"}
        };
    }

    _createPackage() {
        const { type } = this.options;
        if (type === 'fullstack') {
            const pkg = this.fs.readJSON('package.json');
            if (!pkg) {
                this.fs.extendJSON(this.destinationPath('package.json'), this._getDefaultPackage());
            }
        } else {
            this.fs.extendJSON(this.destinationPath('package.json'), this._getDefaultPackage());
        }
    }

    _installDevPackages() {
        this.npmInstall([
            'webpack',
            'webpack-cli',
            'webpack-bundle-analyzer',
            'npm-run-all',
            'file-loader',
            'eslint-loader',
            'dotenv'
        ], {'save-dev': true});

    }

    _handleClientWebpackPackages() {
        const { options } = this;
        const { type } = options;
        if (type === 'client' || type === 'fullstack') {
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
                'webpack-dev-server',
                'raw-loader',
            ].concat(sass), {'save-dev': true});
        }
    }

    conflict() {
        const { destinationPath, css } = this.options;
        this._createPackage();
        this.composeWith(require.resolve('../../jest/app'), {
            destinationPath,
            css
        });
    }

    _handleServerDevDependencies() {
        if (this.options.type === 'server' || this.options.type === 'fullstack') {
            this.npmInstall([
                'generate-json-webpack-plugin',
                'nodemon-webpack-plugin',
                'webpack-node-externals'
            ], { 'save-dev': true });
        }
    }

    install() {
        this._handleClientWebpackPackages();
        this._handleServerDevDependencies();
        this._installDevPackages();
    }

    end() {
    }
};
