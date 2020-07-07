<script>
import store from '../store';
import Error from '../store/modules/Error';

export default {
    name: 'Form',
    computed: {
        hasServerError: () => Error.state.errors.length > 0,
    },
    watch: {
        errors: {
            handler() {
                this.validate();
            },
            deep: true,
        },
    },
    data() {
        return {
            valid: false,
        };
    },
    methods: {
        validate() {
            this.$refs.form.validate();
        },
        clear() {
            this.$refs.form.reset();
        },
        serverError(key) {
            const error = store.getters['Error/find'](key);

            if (error) {
                this.removeServerError(key);

                return error;
            }

            return true;
        },
        removeServerError(key) {
            store.commit('Error/remove', key);
        },
    },
};
</script>
