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
    }

    writing() {
        const { path, e2ePath, e2e } = this.options;

        const scripts = {
            'test': `jest ${path}/`,
            'test:watch': `jest ${path}/ --watch`,
            'test:coverage': `jest ${path}/ --coverage`
        };

        const e2eScripts = {
            'test:e2e': `jest ${e2ePath}/`,
        };

        this.fs.extendJSON(
            this.destinationPath('package.json'),
            {
                scripts: Object.assign({}, scripts, e2e ? e2eScripts : {})
            }
        );

        if (e2e) {
            this.fs.copyTpl(
                this.templatePath(),
                this.destinationPath(e2ePath)
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
