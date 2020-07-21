import Vue from 'vue';
import Vuex from 'vuex';
/* MODULES */
import Authorisation from './modules/authorisation';
import Error from './modules/error';
/* END MODULES */

import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [
        createPersistedState({
            paths: [
                'authorisation',
            ],
        }),
    ],
    modules: {
        authorisation: Authorisation,
        error: Error,
    },
});
