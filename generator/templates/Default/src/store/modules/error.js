export default {
  namespaced: true,
  state: {
    errors: [],
  },
  mutations: {
    remove: (state, key) => state.errors.splice(state.errors.findIndex(x => x.key === key), 1),
    clear: state => state.errors = [],
    add: (state, { message, key }) => {
      const target = state.errors.find(x => x.key === key);

      if (!target) {
        return state.errors.push({
          key: key,
          message: message,
        });
      }

      target.message = message;
    },
  },
  getters: {
    find: state => key => {
      const error = state.errors.find(x => x.key === key);

      return error ? error.message : '';
    },
    first: state => {
      if (!state.errors.length) {
        return '';
      }

      return state.errors[0].message;
    },
  },
};
