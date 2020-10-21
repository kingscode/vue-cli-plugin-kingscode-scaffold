<template>
  <v-overlay>
    <VProgressCircular indeterminate size="64"/>
  </v-overlay>
</template>

<script lang="js">
import { getFragment } from '@/application/util/url';
import admin from '@/router/routes/admin.js';
import { mapActions, mapMutations, mapState } from 'vuex';

export default {
  name: 'AuthorisationCallback',
  methods: {
    ...mapMutations({
      setAuthorisationToken: 'authorisation/setAuthorisationToken',
    }),
    ...mapActions({
      fetchProfile: 'authorisation/fetchProfile',
    }),
  },
  computed: {
    ...mapState('authorisation', ['isAdmin']),
  },
  async created() {
    const redirectUri = this.$route.query.redirect_uri;

    const token = getFragment('token');

    if (!token) throw new Error('AuthorisationCallback::created token hash not found');

    this.setAuthorisationToken(token);
    await this.fetchProfile();
    if (this.isAdmin) {
      this.$router.addRoutes([admin]);
    }
    this.$router.push({ name: redirectUri });
  },
};
</script>
