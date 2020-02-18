module.exports = [
    {
        name: 'useCrud',
        type: 'confirm',
        message: 'Do you want to use a crud system?',
        default: true,
    },
    {
        name: 'useAuthorisation',
        type: 'confirm',
        message: 'Do you want to use authorisation (Login/register/invitation/password forgotten)',
        default: true,
    },
    {
        name: 'useGithubDeployemnts',
        type: 'confirm',
        message: 'Do you want to use github actions for deployments?',
        default: true,
    },
    {
        name: 'plugins',
        type: 'checkbox',
        message: 'Which plugins should we install for you?',
        choices: [
            {
                value: 'sentry',
                name: 'error logging with sentry',
                checked: true,
            },
            {
                value: 'analytics',
                name: 'Google Analytics with vue-analytics',
                checked: true,
            },
            {
                value: 'fontawesomepro',
                name: 'Font awesome pro',
                checked: false,
            },
        ],
    },
    {
        name: 'rootUrl',
        type: 'input',
        message: 'What is the root API url? (you can change this later)',
        default: '//example.local/api',
    },
];
