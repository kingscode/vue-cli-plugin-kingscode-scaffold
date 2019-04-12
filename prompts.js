
function isVuetifyInstalled (answers) {
    return answers.isVuetifyInstalled
}
function isVuetifyNotInstalled (answers) {
    return answers.isVuetifyInstalled === false
}

module.exports = [
    {
        name: 'isVuetifyInstalled',
        type: 'confirm',
        message: 'Did you install vuetify before? You must install this!',
        default: false,
    },
    {
        name: 'useCrud',
        type: 'confirm',
        message: 'Do you want to use a crud system?',
        default: true,
        when: isVuetifyInstalled
    },
    {
        name: 'useTemplateLoader',
        type: 'confirm',
        message: 'Do you want to use a template loader (multiple templates configuration in the router)',
        default: true,
        when: isVuetifyInstalled
    },
    {
        name: 'useAuthorisation',
        type: 'confirm',
        message: 'Do you want to use authorisation (Login/register/invitation/password forgotten)',
        default: true,
        when: isVuetifyInstalled
    },
    {
        name: 'installVuetifyFirst',
        type: 'confirm',
        message: 'Then install it first with the command: vue add vuetify',
        default: true,
        when: isVuetifyNotInstalled
    },
];