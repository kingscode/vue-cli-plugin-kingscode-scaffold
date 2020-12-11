<template>
  <v-row :class="this.grid" class="k-field-wrapper ma-0">
    <VFileInput
        v-bind="fieldProps"
        v-on="$listeners"
        :label="translatedLabel"
        :rules="computedRules"
        :value="value"
        class="pr-2"
    />
    <div class="file-preview d-flex justify-center mb-2">
      <v-icon v-if="!preview" :size="40">{{ icon }}</v-icon>
      <VImg v-else :src="preview"/>
    </div>
  </v-row>
</template>

<script>
import Field from '@/components/crud/fields/FieldMixin.vue';

export default {
  name: 'KFileField',
  mixins: [Field],
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: {
      type: [Object, File],
    },
  },
  data: () => ({
    preview: '',
    previewType: '',
  }),
  watch: {
    value: {
      immediate: true,
      handler(value) {
        this.fetchPreview(value);
      },
    },
  },
  computed: {
    icon() {
      if (!this.previewType) {
        return '$upload';
      }
      return this.getIconByType(this.previewType);
    },
  },
  methods: {
    fetchPreview(file) {
      if (!file || !file.type) {
        this.preview = '';
        this.previewType = '';
        return;
      }
      if (file.type.match('image.*')) {
        if (file instanceof Blob) {
          const reader = new FileReader();
          reader.addEventListener('load', () => {
            this.preview = reader.result;
            this.previewType = '';
          }, false);
          reader.readAsDataURL(file);
          return;
        }
        this.preview = file.url;
        return;
      }
      this.preview = '';
      this.previewType = file.type;
    },
    getIconByType(type) {
      if (type.match('video/*')) {
        return '$fileVideo';
      } else if (type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || type === 'application/msword') {
        return '$fileWord';
      } else if (type === 'application/pdf') {
        return '$filePdf';
      }
      return '$fileUnkown';
    },
  },
};
</script>

<style scoped>
.file-preview {
  border:   1px solid;
  height:   100px;
  overflow: hidden;
  width:    100px;
}
</style>
