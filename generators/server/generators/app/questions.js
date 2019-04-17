const questions = [
    {
        type: 'list',
        name: 'serverFramework',
        message: 'Choose server side library',
        choices: [
            {
                value: 'koa',
                name: 'Koa'
            },
            {
                value: 'express',
                name: 'Express'
            }
        ],
        store: true
    }
];

module.exports = questions;
