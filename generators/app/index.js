const Generator = require('yeoman-generator/lib');
const basename = require('path').basename;
var mkdirp = require('mkdirp');

module.exports = class App extends Generator {
    constructor(args, opts) {
        super(args, opts);

        this.types = [
            {
                value: 'fullstack',
                name: 'Fullstack'
            },
            {
                value: 'client',
                name: 'Client'
            },
            {
                value: 'server',
                name: 'Server'
            }
        ];

        this.option('codeSrc', {
            type: String,
            required: false,
            desc: 'Project files root folder name',
            default: 'src'
        });

        this.option('name', {
            type: String,
            required: false,
            desc: 'Project name to be included in the package.json',
            default: basename(process.cwd())
        });

        this.option('port', {
            type: Number,
            required: false,
            desc: 'Project port',
            default: 5000
        });
    }

    _buildCodeSrcFolder() {
        const {codeSrc} = this.options;
        mkdirp(codeSrc, (error) => {
            if (error) {
                console.log('error', error);
            }
        });
    }

    async prompting() {
        const { projectType } = await this.prompt(this.getQuestions());
        const {options, port} = this;
        const {codeSrc} = options;

        // this.composeWith(require.resolve('generator-license'));

        // this.composeWith(require.resolve('../babel/app'));
        // this.composeWith(require.resolve('../assets/app'), {
        //     path: `${codeSrc}/assets`
        // });
        //
        // this.composeWith(require.resolve('../jest/app'));
        // this.composeWith(require.resolve('../eslint/app'));
        // this.composeWith(require.resolve('../webpack/app'));

        if (projectType === 'fullstack') {
            this.composeWith(require.resolve('../client/generators/app'), {
                fullstack: true,
                path: codeSrc
            });
            this.composeWith(require.resolve('../server/generators/app'), {
                fullstack: true,
                path: codeSrc,
                port
            });
        }
        if (projectType === 'client') {
            this.composeWith(require.resolve('../client/generators/app'), {
                path: codeSrc
            });
        } else if (projectType === 'server') {
            this.composeWith(require.resolve('../server/generators/app'),{
                path: codeSrc,
                port
            });
        }
    }

    configuring() {
        this._buildCodeSrcFolder();
        // this.config.set({
        //     src: this.options.codeSrc,
        //     componentDestination: this.options.codeSrc + 'components',
        //     apiDestination: this.options.codeSrc + 'api'
        // });
    }

    getQuestions() {
        return [
            {
                type: 'list',
                name: 'projectType',
                message: 'Node app type?',
                choices: this.types,
                store: true
            }
        ];
    }

    _isReactIncludedInProject() {
        const {promptValues} = this.config.getAll();
        return promptValues && promptValues.viewEngine === 'react';
    }

    _getDefaultPackage() {
        const {codeSrc, name} = this.options;
        const filePrefix = this._isReactIncludedInProject() ? 'jsx' : 'js';
        return {
            name: name,
            version: '0.0.0',
            engines: {node: ">=6"},
            scripts: {
                start: 'webpack',
            },
            main: `${codeSrc}/index.${filePrefix}`,
            dependencies: {},
            devDependencies: {}
        };
    }

    _createPackage() {
        this.fs.extendJSON(this.destinationPath('package.json'), this._getDefaultPackage());
    }

    _copyConfigFiles() {
        const { name, port, codeSrc } = this.options;
        this.fs.copy(
            this.templatePath('.*'),
            this.destinationPath()
        );
        this.fs.copyTpl(
            this.templatePath(),
            this.destinationPath(codeSrc),
            {
                port,
                name
            }
        );
    }

    writing() {
        this._createPackage();
        this._copyConfigFiles();
    }

    end() {
    }
};
