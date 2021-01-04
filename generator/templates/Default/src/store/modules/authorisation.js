import router from '../../router';

const initialState = ({ token: null });

export default {
  namespaced: true,
  state: initialState,
  mutations: {
    setAuthorisationToken(state, token) {
      Object.assign(state, { token });
    },
    resetAuthorisation(state) {
      Object.keys(state).forEach((key) => delete state[key]);
      Object.assign(state, initialState);
    },
  },
  actions: {
    logout({ commit }) {
      commit('resetAuthorisation');
      router.push({ name: 'login' });
    },
  },
  getters: {
    isLoggedIn: state => !!state.token,
  },
};
