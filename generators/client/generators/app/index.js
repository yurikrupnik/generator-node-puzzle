var Generator = require('yeoman-generator/lib');
// var path = require('../../../webpack/app');
// var webpack = require('../webpack/app');
// var G = require('generator-webpack-mussia');

// var reduce = require('lodash.reduce');
// const utils = require('./utils');
// const questions = require('./questions');

module.exports = class ClientGenerator extends Generator {
    constructor(args, opts) {
        super(args, opts);

        this.option('type', {
            type: String,
            required: false,
            default: 'client',
            desc: 'Include both client and server projects'
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
            default: true,
            desc: 'Include .css files'
        });
    }

    async prompting() {
        this.props = await this.prompt([
            {
                type: 'list',
                name: 'viewEngine',
                message: 'Choose client side library',
                choices: [
                    {
                        value: 'react',
                        name: 'React'
                    },
                    {
                        value: 'vue',
                        name: 'Vue'
                    },
                    {
                        value: 'angular',
                        name: 'Angular'
                    }
                ],
                store: true
            },
            {
                type: 'confirm',
                name: 'sass',
                message: 'Would you like to use SASS to compile to CSS',
                default: true,
                store: true
            }
        ]);
    }

    writing() {
        const { props, options } = this;
        const { sass, loadable, viewEngine } = props;
        const { destinationPath, type } = options;
        if (viewEngine === 'react') {
            this.composeWith(require.resolve('../react/generators/app'), {
                sass,
                destinationPath,
                loadable,
                type
            });
        } else if (viewEngine === 'vue') {
            this.composeWith(require.resolve('../vue/generators/app'), {
                sass,
                destinationPath,
                loadable,
                type
            });
        } else if (viewEngine === 'angular') {
            this.composeWith(require.resolve('../angular/generators/app'), {
                sass,
                destinationPath,
                loadable,
                type
            });
        }

        this._handleStyles();
    }

    _handleStyles() {
        const {sass} = this.props;
        const {destinationPath} = this.options;
        if (sass) {
            this.fs.copyTpl(
                this.templatePath('styles'),
                this.destinationPath(`${destinationPath}/styles`),
                { sass }
            );
        } else {
            this.fs.copyTpl(
                this.templatePath('styles/_reset.scss'),
                this.destinationPath(`${destinationPath}/styles/index.css`),
                { sass }
            );
        }
    }
};
