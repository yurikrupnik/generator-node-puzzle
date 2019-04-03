const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const path = require('path');

const {
    describe,
    test
} = global;

describe('Client generator', () => {

    test('Client generator react', () => {
        return helpers.run(path.join(__dirname, '../index.js'))
            .withPrompts({
                viewEngine: 'react'
            })
            .then(function () {
                // assert.file('.eslintrc');
                // assert.fileContent('.eslintrc', 'eslint:recommended');
            });
    });

    test('Client generator vue', () => {
        return helpers.run(path.join(__dirname, '../index.js'))
            .withPrompts({
                viewEngine: 'vue'
            })
            .then(function () {
                // assert.file('.eslintrc');
                // assert.fileContent('.eslintrc', 'eslint:recommended');
            });
    });

    test('Client generator angular', () => {
        return helpers.run(path.join(__dirname, '../index.js'))
            .withPrompts({
                viewEngine: 'angular'
            })
            .then(function () {
                // assert.file('.eslintrc');
                // assert.fileContent('.eslintrc', 'eslint:recommended');
            });
    });



    test('Client generator fullstack', () => {
        return helpers.run(path.join(__dirname, '../index.js'))
            .withOptions({
                viewEngine: 'fullstack',
                fullstack: true,
                sass: false,
                codeSplit: false,
            })
            .then(function () {
                // assert.file('.eslintrc');
                // assert.file('.babelrc');
                // assert.fileContent('.eslintrc', 'eslint:recommended');
            });
    });

});
