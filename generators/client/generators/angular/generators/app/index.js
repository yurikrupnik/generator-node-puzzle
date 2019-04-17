var Generator = require('yeoman-generator/lib');
// var Webpack = require('../webpack/app');
var path = require('path');
// var webpack = require('../webpack/app');
// var G = require('generator-webpack-mussia');

// var reduce = require('lodash.reduce');
// const utils = require('./utils');
// const questions = require('./questions');

module.exports = class VueGenerator extends Generator {
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

    async prompting() {
        this.props = await this.prompt([
            // {
            //     type: 'confirm',
            //     name: 'angular-router',
            //     message: 'Would you like to use angul',
            //     default: true,
            //     store: true
            // }
        ]);
    }

    configuring() {
        this.composeWith(require.resolve('../../../../../webpack/app'), {
            type: this.options.type,
            angular: true,
            sass: this.options.sass,
            destinationPath: this.options.destinationPath,
            // loadable: this.options.loadable
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
            'angular'
        ]);

        this.npmInstall([
            'html-loader'
        ], { 'save-dev': true });
    }

    install() {
        this.installPackages();
    }
};
