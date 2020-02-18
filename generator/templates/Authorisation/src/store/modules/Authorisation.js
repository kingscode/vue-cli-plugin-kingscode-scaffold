export default {
    namespaced: true,
    state: {
        token: null,
    }, mutations: {
        setAuthorisationToken(currentState, token) {
            currentState.token = token;
        },
    },
    getters: {
        isLoggedIn: state => {
            return state.token !== null;
        },
        getAccessToken: state => {
            if (state.token === null) {
                return '';
            }
            return state.token;
        },
    },
};
