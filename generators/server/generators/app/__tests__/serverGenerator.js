const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const path = require('path');

const {
    describe,
    test
} = global;

describe('server generator', () => {
    test('server side koa', function () {
        return helpers.run(path.join(__dirname, '../index.js'))
            // .withPrompts({
            //     serverFramework: 'koa'
            // })
            .withPrompts({
                serverFramework: 'koa',
                // db: true,
                // auth: true,
                // oauth: [],
                // confirm: true
            })
            .then(function () {
                // assert.file('src/index.jsx');
            });
    });
    test('server side express', function () {
        return helpers.run(path.join(__dirname, '../index.js'))
        // .withOptions({})
        //     .withOptions({
        //         serverFramework: 'express'
        //     })
            .withPrompts({
                serverFramework: 'express',
                // db: true,
                // auth: true,
                // oauth: [],
                // confirm: true
            })
            .then(function () {
                // assert.file('src/index.jsx');
            });
    });
});
