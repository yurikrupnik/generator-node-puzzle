const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const path = require('path');

const {
    describe,
    test
} = global;

describe('Assets generator', () => {
    test('assets generator default options', function () {
        return helpers.run(path.join(__dirname, '../index.js'))
            .withOptions({})
            .withPrompts({})
            .then(() => {
                assert.file('assets');
            });
    });
    test('assets generate with path option', function () {
        return helpers.run(path.join(__dirname, '../index.js'))
            .withOptions({
                destination: 'lol/d'
            })
            .then(function () {
                assert.file('lol/d');
                assert.file('lol/d/download.jpeg');
                assert.file('lol/d/IF-pin1.png');
                assert.file('lol/d/favicon.ico');
            });
    });
});
