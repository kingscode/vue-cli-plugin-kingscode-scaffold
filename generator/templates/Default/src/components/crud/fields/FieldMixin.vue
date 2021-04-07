<script>
import { translateField } from '@/application/util/translation.js';

export default {
  name: 'BaseField',
  inject: {
    fieldGroup: {
      default: undefined,
    },
  },
  props: {
    field: {
      required: true,
      type: String,
    },
    validationField: {
      type: String,
    },
    label: {
      type: String,
      default: '',
    },
    rules: {
      type: Array,
      default: () => [],
    },
    required: {
      type: Boolean,
      default: false,
    },
    tabindex: {
      type: [String, Number],
    },
    grid: {
      type: [Object, String],
    },
  },
  computed: {
    translatedLabel() {
      if (this.required) {
        return `${this.computedLabel} *`;
      }
      return this.computedLabel;
    },
    computedLabel() {
      if (this.label) {
        return this.label;
      }
      if (this.fieldGroup && this.fieldGroup.languagePrefix) {
        return translateField(this.field, this.fieldGroup.languagePrefix);
      }
      return this.label || this.field;
    },
    computedRules() {
      const rules = [...this.rules, () => this.getServerError()];
      if (this.required) {
        rules.push((v) => !!v || this.$t('validation.required', { field: this.computedLabel }));
      }
      return rules;
    },
    fieldProps() {
      if (this.fieldGroup && this.fieldGroup.computedFieldProps) {
        return { ...this.fieldGroup.computedFieldProps, ...this.$attrs };
      }
      return { ...this.$attrs };
    },

  },
  methods: {
    getServerError() {
      const error = this.$store.getters['error/find'](this.validationField || this.field);
      if (error) {
        // ServerError should be removed after it had been appeared,
        //    else the ServerError keep existing and appearing when the user tries to navigate to a different form
        this.removeServerError(this.field);
        return error;
      }

      return true;
    },
    removeServerError(key) {
      this.$store.commit('error/remove', key);
    },
  },
};
</script>
<style>
.k-field-wrapper {
  padding: 0;
  width:   100%;
}
</style>
