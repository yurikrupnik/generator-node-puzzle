const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const path = require('path');

const {
    describe,
    test
} = global;

describe('Eslint generator', () => {
    test('use generator eslint default', () => {
        return helpers.run(path.join(__dirname, '../index.js'))
            .then(function () {
                assert.file('.eslintrc');
                assert.fileContent('.eslintrc', '"parser": "babel-eslint"');
                assert.noFileContent('.eslintrc', 'jsx-a11y');
                // assert.noFileContent('.eslintrc', 'airbnb');
            });
    });
    test('use generator eslint with react', () => {
        return helpers.run(path.join(__dirname, '../index.js'))
            .withOptions({
                react: true
            })
            .then(function () {
                assert.file('.eslintrc');
                assert.fileContent('.eslintrc', 'react/jsx-indent');
                assert.fileContent('.eslintrc', 'react/jsx-indent-props');
                assert.fileContent('.eslintrc', 'jsx-a11y/anchor-is-valid');
                assert.fileContent('.eslintrc', 'airbnb');
                assert.noFileContent('.eslintrc', 'eslint:recommended');
            });
    });
});
