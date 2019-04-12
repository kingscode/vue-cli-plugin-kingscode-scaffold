module.exports = [
    {
        name: 'isVuetifyInstalled',
        type: 'confirm',
        message: 'Did you install vuetify before? If not we\'ll install it for you :)',
        default: false,
    },
    {
        name: 'useCrud',
        type: 'confirm',
        message: 'Do you want to use a crud system?',
        default: true,
    },
    {
        name: 'useTemplateLoader',
        type: 'confirm',
        message: 'Do you want to use a template loader (multiple templates configuration in the router)',
        default: true,
    },
    {
        name: 'useAuthorisation',
        type: 'confirm',
        message: 'Do you want to use authorisation (Login/register/invitation/password forgotten)',
        default: true,
    },
];