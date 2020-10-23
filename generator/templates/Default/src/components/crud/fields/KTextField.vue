<template>
  <div class="k-field-wrapper" :class="this.grid">
    <v-text-field :label="translatedLabel"
                  :rules="computedRules"
                  v-bind="fieldProps"
                  v-on="$listeners">
      <template v-for="(_, name) in $slots" v-slot:[name]>
        <slot :name="name"/>
      </template>
    </v-text-field>
  </div>
</template>

<script>
import Field from '@/components/crud/fields/FieldMixin.vue';

export default {
  mixins: [Field],
  name: 'KTextField',
};
</script>
