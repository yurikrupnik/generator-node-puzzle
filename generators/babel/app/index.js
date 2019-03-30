const Generator = require('yeoman-generator/lib');

module.exports = class Babel extends Generator {
    constructor(args, opts) {
        super(args, opts);
    }

    static packages(){
        return [
            '@babel/core',
            '@babel/plugin-syntax-object-rest-spread',
            '@babel/preset-env'
        ];
    }

    writing() {
        const defaultBabel = {
            'presets': [
                ['@babel/preset-env', {
                    'targets': {
                        'node': 'current'
                    }
                }]
            ],
            'plugins': [
                '@babel/plugin-syntax-object-rest-spread'
            ]

        };
        this.fs.writeJSON(this.destinationPath('.babelrc'), defaultBabel);
    }

    install() {
        // this.npmInstall(Babel.packages(), { 'save-dev': true });
    }
};
