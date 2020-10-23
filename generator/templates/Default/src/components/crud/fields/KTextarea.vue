<template>
  <div class="k-field-wrapper" :class="this.grid">
    <VTextarea :label="translatedLabel"
               :rules="computedRules"
               v-bind="fieldProps"
               v-on="$listeners"/>
  </div>
</template>

<script>
import Field from '@/components/crud/fields/FieldMixin.vue';

export default {
  mixins: [Field],
  name: 'KTextarea',
};
</script>
