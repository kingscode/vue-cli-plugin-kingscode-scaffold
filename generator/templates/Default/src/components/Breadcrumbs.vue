<template>
  <VBreadcrumbs :class="breadcrumbsClass" :items="breadcrumbs" class="py-1 pl-0"/>
</template>

<script>
import eventBus from '../eventBus';

export default {
  name: 'Breadcrumbs',
  data() {
    return {
      breadcrumbs: [],
      placeholders: {},
    };
  },
  computed: {
    breadcrumbsClass() {
      return this.$vuetify.theme.dark ? 'dark' : 'light';
    },
  },
  created() {
    eventBus.$on('setBreadcrumbs', (breadcrumbs) => {
      this.breadcrumbs = breadcrumbs;
    });
  },
};
</script>
