const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const path = require('path');

const {
    describe,
    test
} = global;

describe('react generator', () => {
    describe('react config file', () => {
        test('react client defaults', function () {
            // expect(1).toBe(1);
            return helpers.run(path.join(__dirname, '../index.js'))
                .withOptions({

                })
                .then(function() {
                    assert.file('src/index.jsx');
                });
        });
        test('react sass exits', function () {
            // expect(1).toBe(1);
            return helpers.run(path.join(__dirname, '../index.js'))
                .withOptions({
                    sass: true
                })
                .then(function() {
                    assert.file('src/index.jsx');
                });
        });
        test('react sass does not exits', function () {
            // expect(1).toBe(1);
            return helpers.run(path.join(__dirname, '../index.js'))
                .withOptions({
                    sass: false
                })
                .then(function() {
                    assert.file('src/index.jsx');
                });
        });

    });
});
