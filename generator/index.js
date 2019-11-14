const helpers = require('./tools/helpers');
const fs = require('fs');

module.exports = (api, options) => {
    api.extendPackage({
        dependencies: {
            'axios': '^0.18.0',
            'vuex': '^3.1.0',
            'vuex-persistedstate': '^2.5.4',
            '@fortawesome/fontawesome-pro': '^5.8.1',
            'lodash.clonedeep': '^4.5.0',
            'css-vars-ponyfill': '^2.1.2',
        },
    });
    if (options.useCrud) {
        api.extendPackage({
            dependencies: {
                '@kingscode/vuetify-resource': '^1.1.0',
            },
        });
        api.render('./templates/Crud', options);
    }

    api.render('./templates/Default', options);

    if (options.useAuthorisation) {
        api.render('./templates/Authorisation', options);
    }

    if (options.plugins.includes('sentry')) {
        api.extendPackage({
            dependencies: {
                '@sentry/browser': '^5.8.0',
                '@sentry/integrations': '^5.8.0',
            },
        });
        api.render('./templates/Plugins/sentry', options);
    }

    if (options.plugins.includes('analytics')) {
        api.extendPackage({
            dependencies: {
                'vue-analytics': '^5.17.4',
            },
        });
        api.render('./templates/Plugins/analytics', options);
    }

    api.onCreateComplete(() => {
        if (fs.existsSync('src/store.js')) {
            fs.unlinkSync(api.resolve('src/store.js'));
        }
        if (fs.existsSync('src/assets/logo.svg')) {
            fs.unlinkSync(api.resolve('src/assets/logo.svg'));
        }
        if (fs.existsSync('src/components/HelloWorld.vue')) {
            fs.unlinkSync(api.resolve('src/components/HelloWorld.vue'));
        }
        if (fs.existsSync('src/main.js')) {
            fs.unlinkSync(api.resolve('src/main.js'));
        }
        fs.renameSync(api.resolve('src/newmain.js'), api.resolve('src/main.js'));
    });
};
