<template>
  <div :class="this.grid" class="k-field-wrapper">
    <v-select :label="translatedLabel"
              :rules="computedRules"
              v-bind="fieldProps"
              v-on="$listeners">
      <template v-for="(_, name) in $slots" v-slot:[name]>
        <slot :name="name"/>
      </template>
    </v-select>
  </div>
</template>

<script>
import Field from '@/components/crud/fields/FieldMixin.vue';

export default {
  name: 'KSelect',
  mixins: [Field],
};
</script>
