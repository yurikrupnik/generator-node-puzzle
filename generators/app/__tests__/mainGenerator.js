const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const path = require('path');

const {
    describe,
    test
} = global;

describe('App Generator', () => {
    describe('projectType question', () => {
        test('server projectType', () => {
            return helpers.run(path.join(__dirname, '../index.js'))
                .withPrompts({
                    projectType: 'client'
                });
        });
        test('client projectType', () => {
            return helpers.run(path.join(__dirname, '../index.js'))
                .withPrompts({
                    projectType: 'server'
                });
        });
        test('fillstack projectType', () => {
            return helpers.run(path.join(__dirname, '../index.js'))
                .withPrompts({
                    projectType: 'fullstack'
                });
        });
    });
});
