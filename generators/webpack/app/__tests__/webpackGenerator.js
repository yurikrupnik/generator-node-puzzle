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

    describe('webpack types', () => {
        test('webpack type client default options', function () {
            return helpers.run(path.join(__dirname, '../index.js'))
                .withOptions(Object.assign({},
                    licenceMockPromp,
                    {
                        type: 'client',

                    }))
                .then(function () {
                    assert.file('config.js');
                    // assert.file('as');
                    // assert.noFileContent('webpack.config.js', '.scss');
                    // assert.noFileContent('webpack.config.js', '.jsx');
                });
        });

        test('webpack type server default options', function () {
            return helpers.run(path.join(__dirname, '../index.js'))
                .withOptions(Object.assign({},
                    licenceMockPromp,
                    {
                        type: 'server',

                    }))
                .then(function () {
                    assert.file('config.js');
                    // assert.noFileContent('webpack.config.js', '.scss');
                    // assert.noFileContent('webpack.config.js', '.jsx');
                });
        });

        test('webpack type fullstack default options', function () {
            return helpers.run(path.join(__dirname, '../index.js'))
                .withOptions(Object.assign({},
                    licenceMockPromp,
                    {
                        type: 'fullstack',
                        // fullstack: true
                        // codeSrc: 'lol'

                    }))
                .then(function () {
                    assert.file('config.server.js');
                    assert.file('config.client.js');
                    // assert.file('as');
                    // assert.noFileContent('webpack.config.js', '.scss');
                    // assert.noFileContent('webpack.config.js', '.jsx');
                });
        });
    });
});
