<template>
  <div class="fieldgroup">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'KFieldGroup',
  props: {
    languagePrefix: {
      required: false,
      type: String,
      default: '',
    },
    fieldProps: {
      required: false,
      type: Object,
      default: () => {
      },
    },
  },
  provide() {
    return {
      fieldGroup: this,
    };
  },
  computed: {
    computedFieldProps() {
      return {
        validateOnBlur: true,
        ...this.fieldProps,
      };
    },
  },
};
</script>
