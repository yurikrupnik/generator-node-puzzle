const Generator = require('yeoman-generator/lib');

module.exports = class Babel extends Generator {
    constructor(args, opts) {
        super(args, opts);
    }

    writing() {
        const defaultBabelConfig = {
            'presets': [
                ['@babel/preset-env', {
                    'targets': {
                        'node': 'current'
                    }
                }]
            ],
            'plugins': [
                '@babel/plugin-syntax-object-rest-spread',
                "@babel/plugin-syntax-dynamic-import"
            ]

        };
        this.fs.writeJSON(this.destinationPath('.babelrc'), defaultBabelConfig);
    }

    _installDevPackages() {
        this.npmInstall([
            '@babel/core',
            '@babel/plugin-syntax-object-rest-spread',
            "@babel/plugin-syntax-dynamic-import",
            '@babel/preset-env'
        ], { 'save-dev': true });
    }

    install() {
        // this._installDevPackages();
    }
};
