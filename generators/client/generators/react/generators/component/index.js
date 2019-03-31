const Generator = require('yeoman-generator/lib');
// var path = require('path');
const join = require('path').join;

module.exports = class Component extends Generator {
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

    // configuring() {
    // mkdirp(this.options.name, (error) => {
    //     if (error) {
    //         console.log('error', error);
    //     }
    // });
    // }

    writing() {
        console.log('this.options.name', this.options.name);
        // console.log('this.options[some-arg]', this.options['some-arg']);
        const {path, name} = this.options;
        // console.log('componentName', name);
        // console.log('path', path);
        const destination = join(path, name);
        // const destination = `${path}/${name}`;
        console.log('destination', destination);
        // console.log('destination111111111', destination1);
        this.fs.copyTpl(
            this.templatePath(),
            this.destinationPath(destination),
            // this.destinationPath(`${path}/${componentName}`),
            {
                name: name
            },
        );
    }
};
