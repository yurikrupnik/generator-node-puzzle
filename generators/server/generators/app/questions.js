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
    // {
    //     type: 'confirm',
    //     name: 'db',
    //     message: 'Would you like to use MongoDB?',
    // },
    // {
    //     type: 'confirm',
    //     name: 'auth',
    //     message: 'Would you scaffold out an authentication boilerplate?',
    //     when: answers => answers.db
    // },
    // {
    //     type: 'checkbox',
    //     name: 'oauth',
    //     message: 'Would you like to include additional oAuth strategies?',
    //     when: answers => answers.auth,
    //     choices: [
    //         {
    //             value: 'googleAuth',
    //             name: 'Google',
    //             checked: true
    //         },
    //         {
    //             value: 'facebookAuth',
    //             name: 'Facebook',
    //             checked: true
    //         },
    //         {
    //             value: 'twitterAuth',
    //             name: 'Twitter',
    //             checked: true
    //         }]
    // },
    // {
    //     type: 'confirm',
    //     name: 'io',
    //     message: 'Would you like to use SocketIO?',
    //     default: true
    // },
    // {
    //     type: 'confirm',
    //     name: 'ssr',
    //     message: 'Would you like Server side rendering?',
    //     store: true
    // }
];

module.exports = questions;
