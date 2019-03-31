const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const path = require('path');

const {
    describe,
    test
} = global;

describe('jest generator', () => {
    test('jest with setup options', function () {
        return helpers.run(path.join(__dirname, '../index'))
            .withOptions({ setup: true })
            .then(function() {
                assert.file('jestsetup.js');
            });
    });
    test('jest with default options', function () {
        return helpers.run(path.join(__dirname, '../index'))
            .then(function() {
                assert.fileContent('package.json', 'jest src/');
                assert.fileContent('package.json', 'jest src/ --coverage');
                assert.fileContent('package.json', 'jest src/ --watch');
                assert.fileContent('package.json', 'jest e2e/');
                assert.file('e2e');
                assert.noFile('jestsetup.js');
            });
    });

    test('jest with different paths', function () { // todo describe this
        return helpers.run(path.join(__dirname, '../index'))
            .withOptions({
                path: 'lol',
                e2ePath: 'mi'
            })
            .then(function() {
                assert.fileContent('package.json', 'jest lol/');
                assert.fileContent('package.json', 'jest lol/ --coverage');
                assert.fileContent('package.json', 'jest lol/ --watch');
                assert.fileContent('package.json', 'jest mi/');
                assert.file('mi/app.test.js');
                assert.noFile('e2e');
            });
    });

    test('jest no e2e', function () { // todo describe this
        return helpers.run(path.join(__dirname, '../index'))
            .withOptions({
                e2e: false,
            })
            .then(function() {
                assert.noFileContent('package.json', 'test:e2e');
            });
    });

    test('jest with setup option', function () { // todo describe this
        return helpers.run(path.join(__dirname, '../index'))
            .withOptions({
                setup: true,
            })
            .then(function() {
                assert.fileContent('package.json', './jestsetup.js');
            });
    });


    test('jest with local config', function () { // todo describe this
        return helpers.run(path.join(__dirname, '../index'))
            .withOptions({
                css: true,
            })
            .then(function() {
                assert.fileContent('package.json', 'identity-obj-proxy');
            });
    });
});
