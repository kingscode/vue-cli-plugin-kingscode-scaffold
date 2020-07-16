import Vue from 'vue';
import Vuex from 'vuex';
/* MODULES */
import Authorisation from './modules/authorisation';
import Error from './modules/error';
/* END MODULES */

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        authorisation: Authorisation,
        error: Error,
    },
});
