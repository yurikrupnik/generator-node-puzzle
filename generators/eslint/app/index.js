const Generator = require('yeoman-generator/lib');

module.exports = class Eslint extends Generator {
    constructor(args, opts) {
        super(args, opts);

        this.option('react', {
            type: Boolean,
            required: false,
            desc: 'Include React support',
            default: false
        });
    }

    _installDevPackages() {
        const { react } = this.options;
        this.npmInstall([
            'babel-eslint',
            'eslint',
            'eslint-plugin-import',
            'eslint-plugin-node'
        ].concat(react ? [
            'eslint-config-airbnb',
            'eslint-plugin-jsx-a11y',
            'eslint-plugin-react'
        ]: []), { 'save-dev': true });
    }

    writing() {
        this.fs.copyTpl(
            this.templatePath('.eslintrc'),
            this.destinationPath('.eslintrc'),
            {
                react: this.options.react
            }
        );
    }

    install() {
        this._installDevPackages();
    }
};
