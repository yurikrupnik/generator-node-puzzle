var Generator = require('yeoman-generator/lib');
var mkdirp = require('mkdirp');
// var Webpack = require('../webpack/app');
var path = require('path');
// var webpack = require('../webpack/app');
// var G = require('generator-webpack-mussia');

// var reduce = require('lodash.reduce');
// const utils = require('./utils');
// const questions = require('./questions');

module.exports = class JestGenerator extends Generator {
    constructor(args, opts) {
        super(args, opts);
    }

    // configuring() {
    //     mkdirp('asd', function (err) {
    //         if (err) console.error(err);
    //         // else console.log('pow!')
    //     });
    // }

    writing() {
        this.fs.extendJSON(
            this.destinationPath('package.json'),
            {
                scripts: {
                    'test': 'jest src/',
                    'test:watch': 'jest src/ --watch',
                    'test:coverage': 'jest src/ --coverage',
                    'test:e2e': 'jest e2e/',
                }
            }
        );
    }

    _installDevPackages() {
        this.npmInstall([
            'jest',
        ], { 'save-dev': true });

    }

    install() {

        // this._installDevPackages();
    }
};
