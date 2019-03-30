var Generator = require('yeoman-generator/lib');
var path = require('path');
// var G = require('generator-webpack-mussia');

var reduce = require('lodash.reduce');
const questions = require('./questions');
// const utils = require('../app/utils'); // todo fix file system in project

module.exports = class ServerGenerator extends Generator {
    constructor(args, opts) {
        super(args, opts);
    }

    async prompting() {
        this.props = await this.prompt(questions);
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
