<script>

    export default {
        name: 'Form',
        props: {
            value: {
                default() {
                    return {values: {}, valid: false};
                },
                type: Object,
            },
            errors: {
                default() {
                    return {};
                },
                type: Object,
            },
        },

        watch: {
            value: {
                immediate: true,
                handler() {
                    this.values = this.setFormValues(this.value.values);
                },
                deep: true,
            },
            valid: {
                handler() {
                    this.$emit('input', {values: this.values, valid: this.valid});
                },
            },
            values: {
                handler() {
                    this.$emit('input', {values: this.values, valid: this.valid});
                },
                deep: true,
            },
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
                values: {}
            };
        },
        methods: {
            validate() {
                this.$refs.form.validate();
            },
            clear() {
                this.$refs.form.reset();
            },
            serverError(name, v) {
                if (this.errors !== null && typeof this.errors[name] !== 'undefined') {
                    return this.errors[name][0];
                }
                return true;
            },
            setFormValues(values) {
                return values;
            },
        },
    };
</script>

<style>
    .v-input.required label::after
    {
        content: " *";
    }
</style>
