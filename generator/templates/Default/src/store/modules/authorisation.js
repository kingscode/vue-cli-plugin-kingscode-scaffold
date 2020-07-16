import router from '../../router';

import createPersistedState from 'vuex-persistedstate';

export default {
    namespaced: true,
    plugins: [
        createPersistedState(),
    ],
    state: {
        token: '',
    },
    mutations: {
        setAuthorisationToken(currentState, token) {
            currentState.token = token;
        },
    },
    actions: {
        logout(state) {
            state.token = '';

            router.push({
                name: 'login',
            });
        },
    },
    getters: {
        isLoggedIn: state => !!state.token.length,
    },
};
