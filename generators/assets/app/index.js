var Generator = require('yeoman-generator/lib');
// var mkdirp = require('mkdirp');
// var Webpack = require('../webpack/app');
// var path = require('path');
// var webpack = require('../webpack/app');
// var G = require('generator-webpack-mussia');

// var reduce = require('lodash.reduce');
// const utils = require('./utils');
// const questions = require('./questions');

module.exports = class AssetsGenerator extends Generator {
    constructor(args, opts) {
        super(args, opts);

        this.option('path', {
            type: String,
            required: false,
            desc: 'Destination path',
            default: 'assets'
        });
    }

    writing() {
        this.fs.copy(
            this.templatePath(),
            this.destinationPath(this.options.path),
        );
    }
};
