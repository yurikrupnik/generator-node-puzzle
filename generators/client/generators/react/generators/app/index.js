var Generator = require('yeoman-generator');
// var Webpack = require('../webpack/app');
var path = require('path');
// var webpack = require('../webpack/app');
// var G = require('generator-webpack-mussia');

// var reduce = require('lodash.reduce');
// const utils = require('./utils');
// const questions = require('./questions');

module.exports = class ReactGenerator extends Generator {
    constructor(args, opts) {
        super(args, opts);

        this.option('css', {
            type: Boolean,
            required: false,
            desc: 'Include css files',
            default: true
        });

        this.option('sass', {
            type: Boolean, // todo check that
            required: Boolean,
            desc: 'Include sass files',
            default: false
        });

    }

    configuring() {
        this.config.set({
            extentions: '.jsx',
            sos: 'yes'
        });
    }

    writing() {
        this.fs.copyTpl(
            this.templatePath(),
            this.destinationPath('src'),
            this.options,
        );
    }

    _installPackages() {
        this.npmInstall([
            'react',
            'prop-types',
            'react-dom',
            'react-router',
            'react-router-dom'
        ]);
    }

    _installDevPackages() {
        this.npmInstall([
            '@babel/preset-react',
            'eslint-plugin-jsx-a11y',
            'eslint-plugin-react',
            'react-testing-library'
        ], { 'save-dev': true });
    }

    install() {
        this._installPackages();
        this._installDevPackages();
    }

    end() {
        this.log(`You have finished building ReactGenerator.`);
    }
};
