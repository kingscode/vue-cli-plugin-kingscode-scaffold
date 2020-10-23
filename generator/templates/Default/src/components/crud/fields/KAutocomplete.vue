<template>
  <div class="k-field-wrapper" :class="this.grid">
    <v-autocomplete :label="translatedLabel"
                    :rules="computedRules"
                    v-bind="fieldProps"
                    v-on="$listeners">
      <template v-for="(index, name) in $slots" v-slot:[name]>
        <slot :name="name"/>
      </template>
    </v-autocomplete>
  </div>
</template>

<script>
import Field from '@/components/crud/fields/FieldMixin.vue';

export default {
  mixins: [Field],
  name: 'KAutocomplete',
};
</script>
