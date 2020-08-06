import router from '../../router';

export default {
  namespaced: true,
  state: {
    token: '',
  },
  mutations: {
    setAuthorisationToken(state, token) {
      state.token = token;
    },
  },
  actions: {
    logout(context) {
      context.commit('setAuthorisationToken', '');

      router.push({
        name: 'login',
      });
    },
  },
  getters: {
    isLoggedIn: state => !!state.token.length,
  },
};
