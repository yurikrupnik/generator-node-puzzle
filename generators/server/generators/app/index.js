var Generator = require('yeoman-generator/lib');
// var path = require('path');
// var G = require('generator-webpack-mussia');

// var reduce = require('lodash.reduce');
const questions = require('./questions');
// const utils = require('../app/utils'); // todo fix file system in project

module.exports = class ServerGenerator extends Generator {
    constructor(args, opts) {
        super(args, opts);
    }

    async prompting() {
        const answers = await this.prompt(questions);
        if (answers.serverFramework === 'koa') {
            this.composeWith(require.resolve('../koa/generators/app'));
        } else if (answers.serverFramework === 'esxpress') {
            this.composeWith(require.resolve('../esxpress/generators/app'));
        }
    }

    _handleServerDevDependencies() {
        this.npmInstall([
            'generate-json-webpack-plugin',
            'nodemon-webpack-plugin',
            'webpack-node-externals',
            'dotenv'
        ], { 'save-dev': true });
    }

    install() {
        // this._handleServerDevDependencies();
    }

};
