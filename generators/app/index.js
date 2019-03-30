const Generator = require('yeoman-generator/lib');
const basename = require('path').basename;

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

        this.option('path', {
            type: String,
            required: false,
            desc: 'Project files root name',
            default: 'lib'
        });

        this.option('type', {
            type: String,
            required: false,
            desc: 'Project type',
            default: ''
        });

        this.option('name', {
            type: String,
            required: false,
            desc: 'Project name to be included in the package.json',
            default: basename(process.cwd())
        });
    }

    async prompting() {
        this.props = await this.prompt(this.getQuestions());
    }

    configuring() {
        const {type} = this.props;
        const {options} = this;
        const {libPath, path} = options;
        // this.composeWith(require.resolve('generator-license'));
        // this.composeWith(require.resolve('../babel/app'));
        this.composeWith(require.resolve('../assets/app'), {
            // path: `${libPath}/${path}`
        });

        this.composeWith(require.resolve('../jest/app'), {
            // destination
        });
        // this.composeWith(require.resolve('../eslint/generators/app'));
        // this.composeWith(require.resolve('../webpack/app'));
        if (type === 'fullstack') {
            // this.composeWith(require.resolve('../client/generators/app'), {
            //     // fullstack: true
            // });
            // this.composeWith(require.resolve('../server/generators/app'), {
            //     // fullstack: true
            // });
        }
        if (type === 'client') {
            // this.composeWith(require.resolve('../client/generators/app'));
        } else if (type === 'server') {
            // this.composeWith(require.resolve('../server/generators/app'),);
        }
        this.config.set();
    }

    getQuestions() {
        return [
            {
                type: 'list',
                name: 'appType',
                message: 'Node app type?',
                choices: this.types,
                store: true
            }
        ];
    }

    _getDefaultScripts() {
        const {path, name} = this.options;
        return {
            name: name,
            version: '0.0.0',
            scripts: {},
            main: `${path}/index.js`,
            dependencies: {},
            devDependencies: {}
        };
    }

    overrideEslint() {

    }

    writing() {
        this.fs.extendJSON(this.destinationPath('package.json'), this._getDefaultScripts());
        // this.fs.extendJSON(this.destinationPath('.eslintrc'), this.overrideEslint());

    }

    install() {
        // console.log('App this.config.getAll()', this.config.getAll());

        // this.npmInstall();
    }

    end() {
        this.log(`You have finished building ${this.options.name}.`);
    }
};
