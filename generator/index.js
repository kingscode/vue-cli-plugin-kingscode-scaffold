const helpers = require('./tools/helpers');
const fs = require('fs');

module.exports = (api, options) => {
    api.extendPackage({
        dependencies: {
            'axios': '^0.19.2',
            'dayjs': '^1.8.19',
            'vuex': '^3.1.2',
            'vuex-persistedstate': '^2.5.4',
            'lodash.clonedeep': '^4.5.0',
            'css-vars-ponyfill': '^2.1.2',
            'vue-router': '3.3.4',
        },
    });
    if (options.plugins.includes('fontawesomepro')) {
        api.extendPackage({
            dependencies: {
                '@fortawesome/fontawesome-pro': '^5.8.1',
            },
        });
    }

    if (options.useCrud) {
        api.extendPackage({
            dependencies: {
                '@kingscode/vuetify-resource': '^1.4.1',
            },
        });
        api.render('./templates/Crud', options);
    }

    if (options.useGithubDeployemnts) {
        api.render('./templates/Deployment', options);
    }

    if (options.addRobotsFile) {
        api.render('./templates/Robots', options);
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
