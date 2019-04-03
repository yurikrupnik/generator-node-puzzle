const questions = [
    {
        type: 'confirm',
        name: 'db',
        message: 'Would you like to use MongoDB?',
    },
    {
        type: 'confirm',
        name: 'auth',
        message: 'Would you scaffold out an authentication boilerplate?',
        when: answers => answers.db
    },
    {
        type: 'checkbox',
        name: 'oauth',
        message: 'Would you like to include additional oAuth strategies?',
        when: answers => answers.auth,
        choices: [
            {
                value: 'googleAuth',
                name: 'Google',
                checked: false
            },
            {
                value: 'facebookAuth',
                name: 'Facebook',
                checked: false
            },
            {
                value: 'twitterAuth',
                name: 'Twitter',
                checked: false
            }]
    },
    {
        type: 'confirm',
        name: 'io',
        message: 'Would you like to use SocketIO?',
        default: true
    }
];

module.exports = questions;
