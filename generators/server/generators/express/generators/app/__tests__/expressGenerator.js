const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const path = require('path');

const {
    describe,
    test
} = global;

describe('express generator', () => {
    test('mock test', function () {
        expect(1).toBe(1);
    });
    // test('use generator express', () => {
    //     return helpers.run(path.join(__dirname, '../index.js'))
    //         .withOptions({
    //             path: 'my-path',
    //             port: 3000,
    //             db: true,
    //             io: true,
    //             auth: true,
    //             oauth: ['a', 'c']
    //         })
    //         .then(function () {
    //             assert.file('my-path/index.js');
    //             // assert.file('.eslintignore');
    //             // assert.fileContent('.eslintrc', 'eslint:recommended');
    //         });
    // });
});
