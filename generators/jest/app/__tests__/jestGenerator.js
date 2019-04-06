const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const path = require('path');

const {
    describe,
    test
} = global;

describe('jest generator', () => {
    describe('default options', () => {
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
    });

    describe('setup file', () => {
        test('should not create jestsetup.js', function () {
            return helpers.run(path.join(__dirname, '../index'))
                .withOptions({setup: false})
                .then(function () {
                    assert.noFile('jestsetup.js');
                });
        });
        test('jest with setup options', function () {
            return helpers.run(path.join(__dirname, '../index'))
                .withOptions({setup: true, e2e: false})
                .then(function () {
                    assert.file('jestsetup.js');
                    assert.noFile('e2e');
                });
        });

        test('jest with different paths', function () {
            return helpers.run(path.join(__dirname, '../index'))
                .withOptions({
                    destinationPath: 'lol',
                    e2ePath: 'mi',
                    css: true
                })
                .then(function() {
                    assert.fileContent('package.json', 'jest lol/');
                    assert.fileContent('package.json', 'jest lol/ --coverage');
                    assert.fileContent('package.json', 'jest lol/ --watch');
                    assert.fileContent('package.json', 'jest mi/');
                    assert.fileContent('package.json', 'identity-obj-proxy');
                    assert.file('mi/app.test.js');
                    assert.noFile('e2e');
                });
        });

        test('jest with css option', function () {
            return helpers.run(path.join(__dirname, '../index'))
                .withOptions({
                    css: true,
                })
                .then(function() {
                    assert.fileContent('package.json', 'identity-obj-proxy');
                });
        });
    });
});
