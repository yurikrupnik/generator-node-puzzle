const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const path = require('path');
// const util = require('util');
// const fs = require('fs');
// const fs = require('fs-extra');

const {
    describe,
    test
} = global;

describe('react generator', () => {
    describe('react config file', () => {
        test('react client defaults', function () {
            return helpers.run(path.join(__dirname, '../index.js'))
                .withOptions({

                })
                .then(function() {
                    assert.file('index.jsx');
                    assert.fileContent('index.jsx', 'react');
                });
        });
        test('react sass exits', function () {
            return helpers.run(path.join(__dirname, '../index.js'))
                .withOptions({
                    sass: true
                })
                .then(function() {
                    assert.file('index.jsx');
                });
        });
        test('react sass does not exits', function () {
            return helpers.run(path.join(__dirname, '../index.js'))
                .withOptions({
                    sass: false,
                    path: 'lol'
                })
                .then(function() {
                    assert.file('lol/index.jsx');
                });
        });
    });

    describe('overwrite eslint config to use airbnb', () => { // todo
        test('react client defaults', function () {
            return helpers.run(path.join(__dirname, '../index.js'))
                .inTmpDir(function (dir) {
                    // `dir` is the path to the new temporary directory
                    // const eslintDefault = {
                    //     'parser': 'babel-eslint',
                    //     'rules': {
                    //         'indent': [2, 4],
                    //         'comma-dangle': 0,
                    //         'no-underscore-dangle': 1
                    //     },
                    //     'extends': ['eslint:recommended', 'plugin:node/recommended']
                    // };
                    //
                    // // old fs
                    // // fs.writeFileSync('./.eslintrc', util.inspect(eslintDefault) , dir);
                    //
                    // const eslintPath = path.join(__dirname, '../../../../../../../.eslintrc');
                    // // console.log('pa', pa);
                    //
                    // fs.copySync(eslintPath, dir);
                })
                .withOptions({

                })
                .then(function() {
                    // assert.file('.eslintrc');
                    // assert.fileContent('src/index.jsx', 'react');
                });
        });
        // test('react sass exits', function () {
        //     return helpers.run(path.join(__dirname, '../index.js'))
        //         .withOptions({
        //             sass: true
        //         })
        //         .then(function() {
        //             assert.file('src/index.jsx');
        //         });
        // });
        // test('react sass does not exits', function () {
        //     return helpers.run(path.join(__dirname, '../index.js'))
        //         .withOptions({
        //             sass: false
        //         })
        //         .then(function() {
        //             assert.file('src/index.jsx');
        //         });
        // });

    });
});
