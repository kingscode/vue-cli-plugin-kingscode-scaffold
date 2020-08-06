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
        name: 'useGithubDeployments',
        type: 'confirm',
        message: 'Do you want to use github actions for deployments?',
        default: true,
    },
    {
        name: 'addRobotsFile',
        type: 'confirm',
        message: 'Do you want to disallow robots (SEO) to visit this applications (Y: robots.txt is placed in public folder, N: if you use github actions for deployment, in the test deployment a robots.txt is generated)',
        default: false,
    },
    {
        name: 'plugins',
        type: 'checkbox',
        message: 'Which plugins should we install for you?',
        choices: [
            {
                value: 'Sentry',
                name: 'error logging with Sentry',
                checked: true,
            },
            {
                value: 'analytics',
                name: 'Google Analytics with vue-analytics',
                checked: true,
            },
            {
                value: 'fontawesomepro',
                name: 'Font Awesome Pro',
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
