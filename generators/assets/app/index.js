var Generator = require('yeoman-generator/lib');

module.exports = class AssetsGenerator extends Generator {
    constructor(args, opts) {
        super(args, opts);

        this.option('path', {
            type: String,
            required: false,
            desc: 'Destination path',
            default: 'assets'
        });
    }

    writing() {
        this.fs.copy(
            this.templatePath(),
            this.destinationPath(this.options.path),
        );
    }
};
