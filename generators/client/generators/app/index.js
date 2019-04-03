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

        this.types = ['react', 'vue', 'angular'];

        this.option('fullstack', {
            type: Boolean,
            required: false,
            default: false,
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
                message: 'Choose client side library/framework',
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
                message: 'Would you like to use SASS to compile CSS',
                default: true,
                store: true
            },
            {
                type: 'confirm',
                name: 'loadable',
                message: 'Would you like to use code with dynamic import',
                default: true,
                store: true
            }
        ]);
    }

    writing() {
        const { props, options } = this;
        const { sass, loadable, viewEngine } = props;
        const { destinationPath, fullstack } = options;
        if (viewEngine === 'react') {
            this.composeWith(require.resolve('../react/generators/app'), {
                sass,
                destinationPath,
                loadable,
                fullstack
            });
        } else if (viewEngine === 'vue') {
            this.composeWith(require.resolve('../vue/generators/app'), {
                sass,
                destinationPath,
                loadable,
                fullstack
            });
        } else if (viewEngine === 'angular') {
            this.composeWith(require.resolve('../angular/generators/app'), {
                sass,
                destinationPath,
                loadable,
                fullstack
            });
        }
    }
};
