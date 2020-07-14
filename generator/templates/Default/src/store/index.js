import Vue from 'vue';
import Vuex from 'vuex';
/* MODULES */
import Authorisation from './modules/Authorisation';
import Error from './modules/Error';
/* END MODULES */

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        authorisation: Authorisation,
        error: Error,
    },
});
