module.exports = (api, options) => {

    if (options.useCrud) {
        api.extendPackage({
            dependencies: {
                '@kingscode/vuetify-resource': '^0.4.2',
                'axios': '^0.18.0',
                'vuex': '^3.1.0',
                'vuex-persistedstate': '^2.5.4',
            },
        });
    }
    api.render('./template', {
        ...options,
    });

};