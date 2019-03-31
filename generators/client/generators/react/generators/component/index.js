const Generator = require('yeoman-generator/lib');
// var path = require('path');
const join = require('path').join;

module.exports = class ComponentGenerator extends Generator {
    constructor(args, opts) {
        super(args, opts);

        // this.argument('name', {type: String, required: true});

        this.option('css', {
            type: Boolean,
            required: false,
            desc: 'Include default .css file',
            default: true,
        });

        this.option('css', {
            type: Boolean,
            required: false,
            desc: 'Include .scss file',
            default: false,
        });


        this.option('path', {
            type: String,
            required: false,
            desc: 'Destination path of a component',
            default: ''
        });

        this.option('name', {
            type: String,
            required: true,
            desc: 'Component name',
            default: ''
        });
    }

    writing() {
        const {path, name} = this.options;
        const destination = join(path, name);
        this.fs.copyTpl(
            this.templatePath(),
            this.destinationPath(destination),
            {
                name
            },
        );
    }
};
