import Vue from 'vue';
import Vuex from 'vuex';

import createPersistedState from 'vuex-persistedstate';
/* MODULES */
import Authorisation from './modules/Authorisation.js';
import Error from './modules/Error.js';
/* END MODULES */

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [
        createPersistedState(),
    ],
    modules: {
        Authorisation,
        Error,
    },
});
