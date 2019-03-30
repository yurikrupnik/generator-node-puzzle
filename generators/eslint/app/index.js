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
            'extends': ['eslint:recommended']
        };

        this.fs.writeJSON(this.destinationPath('.eslintrc'), eslintDefault);
    }

    _packages() {

    }
    install() {
        this.npmInstall([
            'babel-eslint',
            'eslint',
            'eslint-plugin-import',
        ], { 'save-dev': true });
    }

    end() {
        this.log(`You have finished building EslingGenerator`);
    }
};
