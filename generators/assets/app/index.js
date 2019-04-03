var Generator = require('yeoman-generator/lib');

module.exports = class AssetsGenerator extends Generator {
    constructor(args, opts) {
        super(args, opts);

        this.option('destination', {
            type: String,
            required: false,
            desc: 'Destination path',
            default: 'assets'
        });
    }

    writing() {
        const { destination } = this.options;
        this.fs.copy(
            this.templatePath(),
            this.destinationPath(destination)
        );
    }
};
