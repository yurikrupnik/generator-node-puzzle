const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const path = require('path');

const {
    describe,
    test,
    expect
} = global;

describe('App generator', () => {

    const licenceMockPromp = {
        name: 'John Doe', // (optional) Owner's name
        email: 'john.doe@example.com', // (optional) Owner's email
        website: 'https://example.com', // (optional) Owner's website
        year: '1945', // (optional) License year (defaults to current year)
        licensePrompt: 'Which license do you want to use?', // (optional) customize license prompt text
        defaultLicense: 'MIT', // (optional) Select a default license
        license: 'MIT', // (optional) Select a license, so no license pro
    };

    test('generate fullstack', () => {
        return helpers.run(path.join(__dirname, '../index.js'))
            .withPrompts(Object.assign({},
                licenceMockPromp,
                {
                    type: 'fullstack'
                }))
            .then(function () {
                assert.file('package.json');
            });
    });
    test('generateserver', () => {
        return helpers.run(path.join(__dirname, '../index.js'))
            .withPrompts(Object.assign({},
                licenceMockPromp,
                {
                    type: 'server'
                }))
            .then(function () {
                assert.file('package.json');
            });
    });
    test('generate client', () => {
        return helpers.run(path.join(__dirname, '../index.js'))
            .withPrompts(Object.assign({},
                licenceMockPromp,
                {
                    type: 'client'
                }))
            .then(function () {
                assert.file('package.json');
            });
    });
});
