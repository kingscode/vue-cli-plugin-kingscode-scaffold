module.exports = (api, options) => {

    if (options.isVuetifyInstalled) {
        if (options.useCrud) {
            api.extendPackage({
                dependencies: {
                    '@kingscode/vuetify-resource': '^0.4.2',
                    'axios': '^0.18.0',
                },
            });
        }
        api.render('./templates/default', {
            ...options,
        });
    }

};