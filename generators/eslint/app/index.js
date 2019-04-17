const Generator = require('yeoman-generator/lib');
const exec = require('child_process').exec;

module.exports = class Eslint extends Generator {
    constructor(args, opts) {
        super(args, opts);

        this.option('react', {
            type: Boolean,
            required: false,
            desc: 'Include React support',
            default: false
        });

        exec('npm info "eslint-config-airbnb" peerDependencies --json', function (error, response) {
            if (error) {
                console.log('error', error);
            }
            // const value = JSON.parse(response);
            const keys = Object.keys(response);
            console.log('keys', keys);

            // console.log('value',value);
            // console.log('b', Object.values(JSON));
            // console.log('c', c);

        });
    }

    _installDevPackages() {
        const { react } = this.options;
        this.npmInstall([
            // 'babel-eslint',
            // 'eslint',
            // 'eslint-plugin-import'
        ].concat(react ? [
            // 'eslint-config-airbnb',
            // 'eslint-plugin-jsx-a11y',
            // 'eslint-plugin-react'
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
