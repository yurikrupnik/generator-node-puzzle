const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const path = require('path');

const {
    describe,
    test,
    expect
} = global;

const licenceMockPromp = {
    name: 'John Doe', // (optional) Owner's name
    email: 'john.doe@example.com', // (optional) Owner's email
    website: 'https://example.com', // (optional) Owner's website
    year: '1945', // (optional) License year (defaults to current year)
    licensePrompt: 'Which license do you want to use?', // (optional) customize license prompt text
    defaultLicense: 'MIT', // (optional) Select a default license
    license: 'MIT', // (optional) Select a license, so no license pro
};

const combinedPromps = Object.assign({},
    licenceMockPromp,
    {
        type: 'client',
        codeSrc: 'lol'

    });

function assign(ob1, ob2) {
    return Object.assign({},
        ob1,
        ob2);
}

const mock = {
    'generator-node-puzzle': {
        promptValues: {
            projectType: 'client',
            viewEngine: 'react',
            sass: true,
            serverFramework: 'koa',
            srr: false
        }
    }
};

// const appOptions = ['fullstack', 'client', 'server']
describe('app', () => {
    describe('projectType question', () => {
        test('server projectType', () => {
            return helpers.run(path.join(__dirname, '../index.js'))
                .withPrompts(Object.assign({},combinedPromps,
                    {
                        projectType: 'server'
                    }));
        });
        test('client projectType', () => {
            return helpers.run(path.join(__dirname, '../index.js'))
                .withPrompts(Object.assign({},combinedPromps,
                    {
                        projectType: 'client'
                    }));
        });
        test('fillstack projectType', () => {
            return helpers.run(path.join(__dirname, '../index.js'))
                .withPrompts(Object.assign({},combinedPromps,
                    {
                        projectType: 'fullstack'
                    }));
        });
    });

    test('default files', () => {
        return helpers.run(path.join(__dirname, '../index.js'))
            .withPrompts(Object.assign({},combinedPromps,
                {}))
            .then(function () {
                assert.file('package.json');
                assert.file('.env');
                assert.file('.gitignore');
                assert.file('.travis.yml');
                assert.file('.editorconfig');
            });
    });

    test('should override default name', () => {
        return helpers.run(path.join(__dirname, '../index.js'))
            .withPrompts(licenceMockPromp)
            .withOptions({
                name: 'd'
            })
            .then(function () {
                assert.fileContent('package.json', '"name": "d"');
            });
    });
});

// describe('App generator', () => {
//     describe('run with defaults', () => {
//         test('default files', () => {
//             return helpers.run(path.join(__dirname, '../index.js'))
//                 .withPrompts(combinedPromps)
//                 .withOptions({})
//                 .then(function () {
//                     assert.file('package.json');
//                     assert.file('.env');
//                     assert.file('.gitignore');
//                     assert.file('.travis.yml');
//                     assert.file('.editorconfig');
//                 });
//         });
//
//

//     });
//     // describe('package.json creation', () => {
//     //     test('default package.json', () => {
//     //         return helpers.run(path.join(__dirname, '../index.jx'))
//     //             // .withLocalConfig()
//     //             .withPrompts(licenceMockPromp)
//     //             .withOptions({
//     //                 // type: 'client',
//     //                 // codeSrc: 'lol',
//     //                 // name: 'ass'
//     //             })
//     //             .then(function () {
//     //                 assert.file('package.json');
//     //             });
//     //     });
//     //     test('should override default name', () => {
//     //         return helpers.run(path.join(__dirname, '../index.js'))
//     //             .withPrompts(licenceMockPromp)
//     //             .withOptions({
//     //                 name: 'lol'
//     //             })
//     //             .then(function () {
//     //                 assert.file('package.json');
//     //                 assert.fileContent('package.json', '"name": "lol"');
//     //             });
//     //     });
//     // });
//     describe('src project files creation', () => {
//         test('should create default folder', () => {
//             return helpers.run(path.join(__dirname, '../index.js'))
//                 .withPrompts(licenceMockPromp)
//                 .withOptions({})
//                 .then(function () {
//                     assert.file('src');
//                 });
//         });
//         test('should override default folder by codeSrc', () => {
//             return helpers.run(path.join(__dirname, '../index.js'))
//                 .withPrompts(licenceMockPromp)
//                 .withOptions({
//                     codeSrc: 'lol'
//                 })
//                 .then(function () {
//                     assert.file('lol');
//                 });
//         });
//     });
//     // describe('codeSrc option', () => {
//     //     // test('do some stuff', () => {
//     //     //     return helpers.run(path.join(__dirname, '../index.js'))
//     //     //         .withPrompts(licenceMockPromp)
//     //     //         .withOptions({
//     //     //             type: 'server',
//     //     //             codeSrc: 'lol',
//     //     //             name: 'ass'
//     //     //         })
//     //     //         .then(function () {
//     //     //             assert.file('lol');
//     //     //         });
//     //     // });
//     //     test('should create custom src folder', () => {
//     //         return helpers.run(path.join(__dirname, '../index.js'))
//     //             .withPrompts(Object.assign({},
//     //                 licenceMockPromp,
//     //                 {
//     //                     // type: 'server',
//     //                     codeSrc: 'lol'
//     //                 }))
//     //             .then(function () {
//     //                 assert.file('lol');
//     //             });
//     //     });
//     // });
//     describe('codeSrc option', () => {
//         test('should create default src folder', () => {
//             return helpers.run(path.join(__dirname, '../index.js'))
//                 .withPrompts(licenceMockPromp)
//                 .then(function () {
//                     assert.file('src');
//                 });
//         });
//
//         test('should create custom src folder', () => {
//             return helpers.run(path.join(__dirname, '../index.js'))
//                 .withPrompts(licenceMockPromp)
//                 .withOptions({
//                     codeSrc: 'lol'
//                 })
//                 .then(function () {
//                     assert.file('lol');
//                 });
//         });
//     });
//
//     describe('default withPrompts and options', () => {
//         describe('withPrompts', () => {
//             test('generate fullstack', () => {
//                 return helpers.run(path.join(__dirname, '../index.js'))
//                     .withPrompts(Object.assign({},
//                         licenceMockPromp,
//                         {
//                             type: 'fullstack'
//                         }))
//                     .then(function () {
//                         assert.file('package.json');
//                     });
//             });
//             test('generate server', () => {
//                 return helpers.run(path.join(__dirname, '../index.js'))
//                     .withPrompts(Object.assign({},
//                         licenceMockPromp,
//                         {
//                             type: 'server'
//                         }))
//                     .then(function () {
//                         assert.file('package.json');
//                     });
//             });
//             test('generate client', () => {
//                 return helpers.run(path.join(__dirname, '../index.js'))
//                     .withPrompts(Object.assign({},
//                         licenceMockPromp,
//                         {
//                             type: 'client'
//                         }))
//                     .then(function () {
//                         assert.file('package.json');
//                     });
//             });
//         });
//
//         describe('withPrompts', () => {
//             test('generate fullstack', () => {
//                 return helpers.run(path.join(__dirname, '../index.js'))
//                     .withPrompts(licenceMockPromp)
//                     .withOptions({
//                         type: 'client'
//                     })
//                     .then(function () {
//                         assert.file('package.json');
//                     });
//             });
//             test('generateserver', () => {
//                 return helpers.run(path.join(__dirname, '../index.js'))
//                     .withPrompts(licenceMockPromp)
//                     .withOptions({
//                         type: 'server'
//                     })
//                     .then(function () {
//                         assert.file('package.json');
//                     });
//             });
//             test('generate client', () => {
//                 return helpers.run(path.join(__dirname, '../index.js'))
//                     .withPrompts(licenceMockPromp)
//                     .withOptions({
//                         type: 'fullstack'
//                     })
//                     .then(function () {
//                         assert.file('package.json');
//                     });
//             });
//         });
//         describe('config file', () => {
//             test('default', () => {
//                 return helpers.run(path.join(__dirname, '../index.js'))
//                     .withPrompts(licenceMockPromp)
//                     .withOptions({
//                         type: 'client'
//                     })
//                     .then(function () {
//                         assert.file('src/config.js');
//                         assert.fileContent('src/config.js', '5000');
//                     });
//             });
//             test('pass port and name and codeSrc', () => {
//                 return helpers.run(path.join(__dirname, '../index.js'))
//                     .withPrompts(licenceMockPromp)
//                     .withOptions({
//                         name: 'yuro',
//                         port: 4444
//                     })
//                     .then(function () {
//                         assert.fileContent('src/config.js', '4444');
//                         assert.fileContent('src/config.js', 'mongodb://localhost/yuro');
//                     });
//             });
//             test('generateserver', () => {
//                 return helpers.run(path.join(__dirname, '../index.js'))
//                     .withPrompts(licenceMockPromp)
//                     .withOptions({
//                         type: 'server'
//                     })
//                     .then(function () {
//                         assert.file('package.json');
//                     });
//             });
//             test('generate client', () => {
//                 return helpers.run(path.join(__dirname, '../index.js'))
//                     .withPrompts(licenceMockPromp)
//                     .withOptions({
//                         type: 'fullstack'
//                     })
//                     .then(function () {
//                         assert.file('package.json');
//                     });
//             });
//         });
//     });
// });
