import Vue from 'vue';
import Vuex from 'vuex';
import Authorisation from './modules/Authorisation.js';
import createPersistedState from 'vuex-persistedstate';
-
Vue.use(Vuex);
export default new Vuex.Store({
    plugins: [
        createPersistedState(),
    ],
    modules: {
        Authorisation,
    },
});
