const Generator = require('yeoman-generator/lib');

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

        this.option('destinationPath', {
            type: String,
            required: false,
            desc: 'Project files root folder name',
            default: 'src'
        });

        this.option('port', {
            type: Number,
            required: false,
            desc: 'Project port',
            default: 5000
        });
    }

    async prompting() {
        const { projectType, ssr } = await this.prompt([
            {
                type: 'list',
                name: 'projectType',
                message: 'Node app type?',
                choices: this.types,
                store: true
            },
            {
                type: 'confirm',
                name: 'ssr',
                message: 'Would you like Server side rendering?',
                store: true,
                when: answers => answers.projectType === 'fullstack'
            }
        ]);

        const { port, destinationPath } = this.options;

        if (projectType === 'fullstack') {
            this.composeWith(require.resolve('../client/generators/app'), {
                type: projectType,
                destinationPath,
                ssr
            });
            this.composeWith(require.resolve('../server/generators/app'), {
                type: projectType,
                destinationPath,
                port,
                ssr
            });
        }
        if (projectType === 'client') {
            this.composeWith(require.resolve('../client/generators/app'), {
                type: projectType,
                destinationPath,
                ssr
            });
        } else if (projectType === 'server') {
            this.composeWith(require.resolve('../server/generators/app'),{
                type: projectType,
                destinationPath,
                port,
                ssr
            });
        }
    }
};
