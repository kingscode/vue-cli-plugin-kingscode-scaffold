<script>

export default {
  name: 'Form',
  props: {
    value: {
      default() {
        return {
          values: {},
          valid: false,
        };
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
        this.$emit('input', {
          values: this.values,
          valid: this.valid,
        });
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
    validate() {
      this.$refs.form.validate();
    },
    clear() {
      this.$refs.form.reset();
    },
    setFormValues(values) {
      return values;
    },
    handleFormEmit() {
      clearTimeout(this.emitTimeout);
      this.emitTimeout = setTimeout(() => {
        this.$emit('input', {
          values: this.values,
          valid: this.valid,
        });
      }, 500);
    },
  },
  beforeDestroy() {
    clearTimeout(this.emitTimeout);
  },
};
</script>
