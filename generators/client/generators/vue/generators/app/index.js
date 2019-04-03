var Generator = require('yeoman-generator/lib');
var Webpack = require('../../../../../webpack/app');
// var path = require('path');
// var webpack = require('../webpack/app');
// var G = require('generator-webpack-mussia');

// var reduce = require('lodash.reduce');
// const utils = require('./utils');
// const questions = require('./questions');

module.exports = class VueGenerator extends Generator {
    constructor(args, opts) {
        super(args, opts);
        // this.props.name = path.basename(process.cwd())
        // this.option('type', {
        //     type: String,
        //     required: false,
        //     desc: 'Project name to be included in the package.json',
        //     default: path.basename(process.cwd())
        // });

        this.option('css', {
            type: Boolean,
            required: false,
            desc: 'Include css files',
            default: true
        });

        this.option('sass', {
            type: String,
            required: Boolean,
            desc: 'Include sass files',
            default: false
        });

    }

    async prompting() {
        this.props = await this.prompt([
            {
                type: 'confirm',
                name: 'vue-router',
                message: 'Would you like to use Vue-Router',
                default: true,
                store: true
            }
        ]);
    }

    configuring() {
        this.composeWith(require.resolve('../../../../../webpack/app'), {
            type: 'client',
            vue: true,
            // extensions: '.jsx',
            sass: this.options.sass,
            destinationPath: this.options.destinationPath,
            loadable: this.options.loadable
        });
        this.config.set({
            extensions: '.vue',
            vue: true
        });
    }

    writing() {
        this.fs.copyTpl(
            this.templatePath(),
            this.destinationPath('src'),
            this.options,
        );
    }

    installPackages() {
        this.npmInstall([
            'vue'
        ]);
    }

    install() {
        this.installPackages();
    }

    end() {
        this.log(`You have finished building Vue.`);
    }
};
