const Generator = require('yeoman-generator/lib');

module.exports = class Eslint extends Generator {
    constructor(args, opts) {
        super(args, opts);
    }

    writing() {
        const eslintDefault = {
            'parser': 'babel-eslint',
            'rules': {
                'indent': [2, 4],
                'comma-dangle': 0,
                'no-underscore-dangle': 1
            },
            'extends': ['eslint:recommended', 'plugin:node/recommended']
        };

        this.fs.writeJSON(this.destinationPath('.eslintrc'), eslintDefault);
        this.fs.write(this.destinationPath('.eslintignore'), 'coverage');
    }

    _installDevPackages() {
        this.npmInstall([
            'babel-eslint',
            'eslint',
            'eslint-plugin-import',
            'eslint-plugin-node'
        ], { 'save-dev': true });
    }

    install() {
        // this._installDevPackages();
    }
};
