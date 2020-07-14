<script>
import store from '../store';

export default {
    name: 'Form',
    props: {
        errors: {
            default: () => ({}),
            type: Object,
        },
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
            const error = store.getters['error/find'](key);

            if (error) {
                this.removeServerError(key);

                return error;
            }

            return true;
        },
        removeServerError(key) {
            store.commit('error/remove', key);
        },
    },
};
</script>
