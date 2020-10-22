<template>
  <div :class="this.grid" class="k-field-wrapper">
    <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="time"
        max-width="290px"
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
            :value="formattedTime"
            readonly
        ></v-text-field>
      </template>
      <v-time-picker
          format="24hr"
          scrollable
          no-title
          v-if="menu"
          v-model="timePickerTime"
          @change="$emit('input', $event)"
          max-width="290px"
          min-width="290px"
      >
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="menu = false">{{ $t('actions.cancel') }}</v-btn>
        <v-btn color="primary" text @click="$refs.menu.save(timePickerTime);$refs.field.validate()">
          {{ $t('actions.continue') }}
        </v-btn>
      </v-time-picker>
    </v-menu>
  </div>
</template>

<script>
import Field from '@/components/crud/fields/FieldMixin.vue';
import dayjs from '@/plugins/dayjs';

export default {
  name: 'KTimeField',
  mixins: [Field],
  data: () => ({
    menu: false,
    time: '',
    timePickerTime: '',
  }),
  props: {
    value: {
      type: String,
      default: dayjs().format('HH:mm'),
    },
    format: {
      type: String,
      default: 'HH:MM',
    },
  },
  watch: {
    time() {
      this.$emit('input', this.time);
    },
    value() {
      this.time = this.value;
      this.timePickerTime = this.value;
    },
  },
  created() {
    this.time = this.value || dayjs().format('HH:mm');
  },
  computed: {
    formattedTime() {
      if (!this.time) {
        return '';
      }
      return dayjs(`1970-00-00T${this.time}`).format(this.format);
    },
  },
};
</script>
