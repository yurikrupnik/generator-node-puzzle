const Generator = require('yeoman-generator/lib');

module.exports = class D extends Generator {
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

    install() {
        this.npmInstall([
            '@babel/core',
            '@babel/plugin-syntax-object-rest-spread',
            "@babel/plugin-syntax-dynamic-import",
            '@babel/preset-env'
        ], { 'save-dev': true });
    }
};
