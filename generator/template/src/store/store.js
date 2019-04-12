import Vue from 'vue';
import Vuex from 'vuex';
import Authorization from './modules/Authorization.js';
import createPersistedState from 'vuex-persistedstate';
-
Vue.use(Vuex);
export default new Vuex.Store({
    plugins: [
        (store) => {
            window.initialState = JSON.parse(JSON.stringify(store.state));
        },
        createPersistedState(),
    ],
    modules: {
        Authorization,
    },
    state: {
        version: {
            major: 1,
            minor: 0,
            patch: 0,
        },
        refresh: false,
    },
});