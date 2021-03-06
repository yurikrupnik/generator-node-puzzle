const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const path = require('path');

const {
    describe,
    test
} = global;

describe('Eslint generator', () => {
    test('use generator eslint', () => {
        return helpers.run(path.join(__dirname, '../index.js'))
            .then(function () {
                assert.file('.eslintrc');
                assert.fileContent('.eslintrc', 'eslint:recommended');
            });
    });
});
