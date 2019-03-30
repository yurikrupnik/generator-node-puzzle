const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const path = require('path');

const {
    describe,
    test
} = global;

describe('jest generator', () => {
    test('jest something', function () { // todo describe this
        return helpers.run(path.join(__dirname, '../index'))
            .then(function() {
                // assert.file('.eslintrc');
                // assert.fileContent('.eslintrc', 'eslint:recommended');
                // assert.fileContent('.eslintrc', '\'parser\': \'babel-eslint\'');
            });
    });
});
