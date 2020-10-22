<template>
  <v-container>
    You now can remove this and create your own homepage, or in the router.js create a redirect to one of the other
    views, so that becomes the homepage
  </v-container>
</template>

<script lang="js">
import eventBus from '@/eventBus.js';

export default {
  name: 'Home',
  created() {
    eventBus.$emit('setBreadcrumbs', [
      {
        exact: true,
        to: { name: 'home' },
        text: this.$t('global.dashboard'),
      },
    ]);
  },
};
</script>
