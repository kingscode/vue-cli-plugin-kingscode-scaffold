const helpers = require('./tools/helpers');

module.exports = (api, options) => {
    api.extendPackage({
        dependencies: {
            'axios': '^0.18.0',
            'vuex': '^3.1.0',
            'vuex-persistedstate': '^2.5.4',
        },
    });
    if (options.useCrud) {
        api.extendPackage({
            dependencies: {
                '@kingscode/vuetify-resource': '^0.4.2',
            },
        });
        api.render('./templates/Crud', {
            ...options,
        });
    }

    api.render('./templates/Default', {
        ...options,
    });

    if (options.useTemplateLoader) {
        api.render('./templates/TemplateLoader', {
            ...options,
        });
    }
    if (options.useAuthorisation) {
        api.render('./templates/Authorisation', {
            ...options,
        });
    }
    api.onCreateComplete(() => {

        if (options.useCrud) {
            helpers.updateFile(api, api.entryFile, lines => {
                const vueImportIndex = lines.findIndex(line => line.match(/^import Vue/));
                const newVueIndex = lines.findIndex(line => line.match(/^new Vue/));

                lines.splice(vueImportIndex + 1, 0, 'import API from \'./API.js\';');
                lines.splice(vueImportIndex + 1, 0, 'import VuetifyResource from \'@kingscode/vuetify-resource\';');

                lines.splice(newVueIndex - 1, 0, 'Vue.use(VuetifyResource);');
                lines.splice(newVueIndex - 1, 0, 'window.$http = API;');
                lines.splice(newVueIndex - 1, 0, 'Vue.prototype.$http = API;');

                return lines;
            });
        }
    });
};