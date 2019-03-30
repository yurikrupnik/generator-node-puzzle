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

    installPackages() {
        this.npmInstall([
            'react',
            'prop-types',
            'react-dom',
            'react-router',
            'react-router-dom'
        ]);
    }

    installDevPackages() {
        this.npmInstall([
            '@babel/preset-react',
            'eslint-plugin-jsx-a11y',
            'eslint-plugin-react',
            'react-testing-library'
        ], { 'save-dev': true });
    }

    install() {

        this.installPackages();
        this.installDevPackages();
    }

    end() {
        this.log(`You have finished building ReactGenerator.`);
    }
};
