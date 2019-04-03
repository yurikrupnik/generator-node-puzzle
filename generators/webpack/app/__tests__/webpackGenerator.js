const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const path = require('path');

const {
    describe,
    test
} = global;

describe('webpack generator', () => {
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
    describe('webpack client', () => {
        test('webpack client default options', function () {
            return helpers.run(path.join(__dirname, '../index.js'))
                .withOptions(combinedPromps, {
                    type: 'client'
                })
                .then(function () {
                    // assert.file('webpack.config.js');
                    // assert.file('as');
                    // assert.noFileContent('webpack.config.js', '.scss');
                    // assert.noFileContent('webpack.config.js', '.jsx');
                });
        });

        test('webpack client default options', function () {
            return helpers.run(path.join(__dirname, '../index.js'))
                .withOptions(combinedPromps, {
                    type: 'server'
                })
                .then(function () {
                    // assert.file('webpack.config.js');
                    // assert.file('as');
                    // assert.noFileContent('webpack.config.js', '.scss');
                    // assert.noFileContent('webpack.config.js', '.jsx');
                });
        });

        test('webpack client default options', function () {
            return helpers.run(path.join(__dirname, '../index.js'))
                .withOptions(combinedPromps, {
                    type: 'fullstack'
                })
                .then(function () {
                    // assert.file('webpack.config.js');
                    // assert.file('as');
                    // assert.noFileContent('webpack.config.js', '.scss');
                    // assert.noFileContent('webpack.config.js', '.jsx');
                });
        });
    });
    //
    // describe('webpack server', () => {
    //     test('webpack server default options', function () {
    //         return helpers.run(path.join(__dirname, '../index.js'))
    //             .withOptions({
    //                 type: 'server',
    //                 // react: true,
    //                 // fullstack: true,
    //                 sass: true
    //             })
    //             .then(function () {
    //                 assert.file('webpack.config.js');
    //                 // assert.noFileContent('webpack.config.js', '.scss');
    //                 // assert.noFileContent('webpack.config.js', '.jsx');
    //             });
    //     });
    // });
    //
    // describe('webpack server', () => {
    //     test('webpack server default options', function () {
    //         return helpers.run(path.join(__dirname, '../index.js'))
    //             .withOptions({
    //                 type: 'fullstack',
    //                 // react: true,
    //                 // fullstack: true,
    //                 // sass: true
    //             })
    //             .then(function () {
    //                 // assert.file('webpack.config.js');
    //                 assert.noFile('webpack.config.js');
    //                 assert.noFile('webpack.config.js');
    //                 assert.file('webpack.config.server.js');
    //                 assert.file('webpack.config.client.js');
    //             });
    //     });
    // });


    // test('webpack default options', function () {
    //     return helpers.run(path.join(__dirname, '../index.js'))
    //         .withOptions({
    //             // type: 'client',
    //             // react: true,
    //             // fullstack: true,
    //             // sass: true
    //         })
    //         .then(function () {
    //             // assert.file('webpack.config.js');
    //             // assert.noFileContent('webpack.config.js', '.scss');
    //             // assert.noFileContent('webpack.config.js', '.jsx');
    //         });
    // });
    //
    // test('webpack type react options', function () {
    //     return helpers.run(path.join(__dirname, '../index.js'))
    //         .withOptions({
    //             type: 'client',
    //             react: true,
    //             // fullstack: true,
    //             // sass: true
    //         })
    //         .then(function () {
    //             // assert.file('webpack.config.js');
    //             // assert.noFileContent('webpack.config.js', '.scss');
    //             // assert.noFileContent('webpack.config.js', '.jsx');
    //         });
    // });
    // test('webpack with options', function () {
    //     return helpers.run(path.join(__dirname, '../index.js'))
    //         .withOptions({
    //             type: 'client',
    //             react: true,
    //             // fullstack: true,
    //             sass: true
    //         })
    //         .then(function () {
    //             assert.file('webpack.config.js');
    //             assert.fileContent('webpack.config.js', '.scss');
    //             assert.fileContent('webpack.config.js', '.jsx');
    //         });
    // });
    // test('webpack check for .scss', function () {
    //     return helpers.run(path.join(__dirname, '../index.js'))
    //         .withOptions({
    //             type: 'client',
    //             fullstack: true,
    //         })
    //         .then(function () {
    //             assert.file('webpack.config.js');
    //         });
    // });
    // test('webpack fullstack', function () {
    //     return helpers.run(path.join(__dirname, '../index.js'))
    //         .withOptions({
    //             type: 'fullstack',
    //         })
    //         .then(function () {
    //             assert.file('webpack.config.server.js');
    //             assert.file('webpack.config.client.js');
    //         });
    // });
});
