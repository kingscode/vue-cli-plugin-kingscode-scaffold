<template>
  <div :class="this.grid" class="k-field-wrapper">
    <v-radio-group v-bind="fieldProps"
                   v-on="$listeners"
                   :label="translatedLabel"
                   :rules="computedRules">
      <VRadio
          v-for="(radio, index) in items"
          :key="index"
          :label="radio.text"
          :value="radio.value"
      />
    </v-radio-group>
  </div>
</template>

<script>
import Field from '@/components/crud/fields/FieldMixin.vue';

export default {
  name: 'KRadioGroup',
  mixins: [Field],
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
