var Generator = require('yeoman-generator/lib');

module.exports = class JestGenerator extends Generator {
    constructor(args, opts) {
        super(args, opts);

        this.option('path', {
            type: String,
            required: false,
            desc: 'Destination path',
            default: 'src'
        });

        this.option('e2ePath', {
            type: String,
            required: false,
            desc: 'e2e folder path',
            default: 'e2e'
        });

        this.option('e2e', {
            type: Boolean,
            required: false,
            desc: 'Include e2e',
            default: true
        });

        this.option('setup', {
            type: Boolean,
            required: false,
            desc: 'Include jestsetup.js file',
            default: false
        });

        this.option('css', {
            type: Boolean,
            required: false,
            desc: 'Include css to config',
            default: false
        });
    }

    writing() {
        const { path, e2ePath, e2e, setup, css } = this.options;
        const scripts = {
            'test': `jest ${path}/`,
            'test:watch': `jest ${path}/ --watch`,
            'test:coverage': `jest ${path}/ --coverage`
        };

        const e2eScripts = {
            'test:e2e': `jest ${e2ePath}/`,
        };

        let jestConfig = {
            "modulePathIgnorePatterns": [
                "<rootDir>/.*/__mocks__"
            ]
        };

        if (setup) {
            jestConfig.setupFiles = ['./jestsetup.js'];
        }

        if (css) {
            jestConfig.moduleNameMapper = {
                "\\.(css|less|scss)$": "identity-obj-proxy"
            }
        }

        this.fs.extendJSON(
            this.destinationPath('package.json'),
            {
                scripts: Object.assign({}, scripts, e2e ? e2eScripts : {}),
                jest: jestConfig
            }
        );

        if (e2e) {
            this.fs.copyTpl(
                this.templatePath('e2e'),
                this.destinationPath(e2ePath)
            );
        }
        if (setup) {
            this.fs.copyTpl(
                this.templatePath('jestsetup.js'),
                this.destinationPath('jestsetup.js')
            );
        }
    }

    _installDevPackages() {
        const { e2e } = this.options;
        this.npmInstall([
            'jest',
        ], { 'save-dev': true });

        if (e2e) {
            this.npmInstall([
                'puppeteer',
            ], { 'save-dev': true });
        }
    }

    install() {
        // this._installDevPackages();
    }
};
