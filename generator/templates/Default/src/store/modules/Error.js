import {ADD, CLEAR, FIND, REMOVE} from '../constants.js';

export default {
    namespaced: true,
    state: {
        errors: [],
    },
    mutations: {
        [REMOVE]: (state, key) => state.errors.splice(state.errors.findIndex(x => x.key === key), 1),
        [CLEAR]: state => state.errors = [],
        [ADD]: (state, {message, key}) => {
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
        [FIND]: state => key => {
            const error = state.errors.find(x => x.key === key);

            if (error) return error.message;
        },
        hasError: state => !!state.errors.length,
        first: state => {
            if (!state.errors.length)
                return '';

            return state.errors[0].message;
        },
    },
};
