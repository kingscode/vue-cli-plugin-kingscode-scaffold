import router from './../../router';

export default {
    namespaced: true,
    state: {
        tokens: null,
    }, mutations: {
        setAuthorizationTokens(currentState, tokens) {
            currentState.tokens = tokens;
        },
    },
    actions: {
        login(context, data) {
            return new Promise((resolve, reject) => {
                $http.post('oauth/token',
                    {
                        grant_type: 'password',
                        client_id: process.env.VUE_APP_OAUTH_CLIENT_ID,
                        client_secret: process.env.VUE_APP_OAUTH_CLIENT_SECRET,
                        username: data.username,
                        password: data.password,
                        scope: '*',
                    },
                ).then((response) => {
                    context.commit('setAuthorizationTokens',
                        response.data,
                    );
                    router.push({name: 'home'});
                    resolve();
                }).catch((error) => {
                    reject(error.response.data.error);
                });
            });
        },
        unauthorized(context) {
            context.commit('setAuthorizationTokens', null);
            router.push({name: 'login'});
        },
        refreshToken() {

        },
    },
    getters: {
        isLoggedIn: state => {
            return state.tokens !== null;
        },
        getAccessToken: state => {
            if (state.tokens === null) {
                return '';
            }
            return state.tokens.access_token;
        },
    },
};
