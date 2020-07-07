<script>
import BaseForm from '@/components/BaseForm.vue';

export default {
    name: 'Form',
    extends: BaseForm,
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
        isUpdateForm: {
            type: Boolean,
            default: false,
        },
    },
    watch: {
        value: {
            immediate: true,
            handler() {
                if (Object.keys(this.value.values).length !== 0) {
                    this.values = this.setFormValues(this.value.values);
                }
            },
            deep: true,
        },
        valid: {
            handler() {
                this.handleFormEmit();
            },
        },
        values: {
            handler() {
                this.handleFormEmit();
            },
            deep: true,
        },
    },
    data() {
        return {
            valid: false,
            values: {},
        };
    },
    methods: {
        setFormValues(values) {
            return values;
        },
        handleFormEmit() {
            clearTimeout(this.emitTimeout);
            this.emitTimeout = setTimeout(() => {
                this.$emit('input', {values: this.values, valid: this.valid});
            }, 500);
        },
    },
};
</script>
