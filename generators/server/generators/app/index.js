var Generator = require('yeoman-generator/lib');
var path = require('../express/generators/app');
// var G = require('generator-webpack-mussia');

// var reduce = require('lodash.reduce');
const questions = require('./questions');
// const utils = require('../app/utils'); // todo fix file system in project

module.exports = class ServerGenerator extends Generator {
    constructor(args, opts) {
        super(args, opts);

        this.option('path', {
            type: String,
            required: false,
            desc: 'Destination path of a files',
            default: ''
        });

        this.option('port', {
            type: Number,
            required: false,
            desc: 'Destination path of a files',
            default: 5000
        });
    }

    async prompting() {
        const { path, port } = this.options;
        const answers = await this.prompt(questions);
        const { db, io, auth, oauth, serverFramework } = answers;
        if (serverFramework === 'koa') {
            this.composeWith(require.resolve('../koa/generators/app'),{
                path,
                port,
                db,
                io,
                auth,
                oauth
            });
        } else if (serverFramework === 'express') {
            this.composeWith(require.resolve('../express/generators/app'), {
                path,
                port,
                db,
                io,
                auth,
                oauth
            });
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
