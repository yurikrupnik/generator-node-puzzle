var Generator = require('yeoman-generator/lib');

module.exports = class VueGenerator extends Generator {
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


    }

    async prompting() {
        this.props = await this.prompt([
            // {
            //     type: 'confirm',
            //     name: 'vue-router',
            //     message: 'Would you like to use Vue-Router',
            //     default: true,
            //     store: true
            // }
        ]);
    }

    configuring() {
        this.composeWith(require.resolve('../../../../../webpack/app'), {
            css: this.options.css,
            type: 'client',
            vue: true,
            extensions: '.vue',
            sass: this.options.sass,
            destinationPath: this.options.destinationPath
        });
    }

    writing() {
        this.fs.copyTpl(
            this.templatePath(),
            this.destinationPath('src'),
            this.options,
        );
    }

    installPackages() {
        this.npmInstall([
            'vue'
        ]);
    }

    install() {
        this.installPackages();
    }

    end() {
        this.log(`You have finished building Vue.`);
    }
};
