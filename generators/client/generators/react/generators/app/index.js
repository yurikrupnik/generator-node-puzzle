var Generator = require('yeoman-generator');
// var Webpack = require('../webpack/app');
// var path = require('path');
// var webpack = require('../webpack/app');
// var G = require('generator-webpack-mussia');

// var reduce = require('lodash.reduce');
// const utils = require('./utils');
// const questions = require('./questions');

module.exports = class ReactGenerator extends Generator {
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

        // this.option('ssr', {
        //     type: Boolean,
        //     required: false,
        //     desc: 'Include srr support',
        //     default: false
        // });

        // this.option('loadable', {
        //     type: Boolean,
        //     required: false,
        //     desc: 'Include webpack',
        //     default: false
        // });
    }

    configuring() {
        // console.log('React type', this.options.type);

        this.composeWith(require.resolve('../../../../../webpack/app'), {
            type: this.options.type,
            // ssr: this.options.ssr,
            react: true,
            extensions: '.jsx',
            sass: this.options.sass,
            destinationPath: this.options.destinationPath,
            loadable: this.options.loadable
        });
    }

    writing() {
        const { srr, destinationPath } = this.options;
        this.fs.copyTpl(
            this.templatePath(),
            this.destinationPath(destinationPath),
            { srr }
        );
    }

    _installPackages() {
        this.npmInstall([
            'react',
            'prop-types',
            'react-dom',
            'react-router',
            'react-router-dom',
            'react-loadable'
        ]);
    }

    _installDevPackages() {
        this.npmInstall([
            'react-testing-library'
        ], {'save-dev': true});
    }

    install() {
        this._installPackages();
        this._installDevPackages();
    }
};
