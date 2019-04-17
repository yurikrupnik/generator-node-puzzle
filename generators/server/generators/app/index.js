var Generator = require('yeoman-generator/lib');
const questions = require('./questions');

module.exports = class ServerGenerator extends Generator {
    constructor(args, opts) {
        super(args, opts);

        this.option('type', {
            type: String,
            required: false,
            default: 'server',
            desc: 'Include both client and server projects'
        });

        this.option('destinationPath', {
            type: String,
            required: false,
            desc: 'Destination path of a files',
            default: 'src'
        });

        this.option('port', {
            type: Number,
            required: false,
            desc: 'Port to run app on',
            default: 5000
        });

        this.option('ssr', {
            type: Boolean,
            required: false,
            desc: 'Include server side rendering support',
            default: false
        });
    }

    async prompting() {
        const {destinationPath, ssr, port, type} = this.options;
        const answers = await this.prompt(questions);
        const {serverFramework} = answers;
        if (serverFramework === 'koa') {
            this.composeWith(require.resolve('../koa/generators/app'), {
                destinationPath,
                port,
                type,
                ssr
            });

        } else if (serverFramework === 'express') {
            this.composeWith(require.resolve('../express/generators/app'), {
                destinationPath,
                port,
                type,
                ssr
            });
        }
    }
};
