<template>
  <div :class="this.grid" class="k-field-wrapper">
    <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        min-width="290px"
        offset-y
        transition="scale-transition"
    >
      <template #activator="{ on }">
        <v-text-field
            ref="field"
            v-bind="fieldProps"
            v-on="on"
            :label="translatedLabel"
            :rules="computedRules"
            :value="formattedDate"
            readonly
        ></v-text-field>
      </template>
      <v-date-picker ref="picker"
                     :type="type"
                     v-model="datePickerDate"
                     no-title
                     scrollable
                     @change="$emit('input', $event)">
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="menu = false">{{ $t('actions.cancel') }}</v-btn>
        <v-btn color="primary" text @click="$refs.menu.save(datePickerDate);$refs.field.validate()">
          {{ $t('actions.continue') }}
        </v-btn>
      </v-date-picker>
    </v-menu>
  </div>
</template>

<script>
import Field from '@/components/crud/fields/FieldMixin.vue';
import dayjs from 'dayjs';

export default {
  name: 'KDateField',
  mixins: [Field],
  data: () => ({
    menu: false,
    date: '',
    datePickerDate: '',
  }),
  props: {
    value: {
      type: String,
    },
    yearFirst: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
    },
    format: {
      type: String,
      default: 'D MMMM YYYY',
    },
  },
  watch: {
    date() {
      this.$emit('input', this.date);
    },
    value() {
      this.date = this.value;
      this.datePickerDate = this.value;
    },
    menu(val) {
      if (!this.yearFirst) return;
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'));
    },
  },
  created() {
    if (this.type === 'month') {
      return this.date = this.value || dayjs().format('MMM YYYY');
    }
    this.date = this.value || dayjs().format('YYYY-MM-DD');
  },
  computed: {
    formattedDate() {
      if (!this.date) {
        return '';
      }
      return dayjs(this.date).format(this.format);
    },
  },
};
</script>

