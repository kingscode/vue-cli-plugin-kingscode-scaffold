<template>
  <v-row align="stretch" justify-md="center">
    <v-col md="3">
      <PasswordResetCard :token="$route.params.token"/>
    </v-col>
  </v-row>
</template>

<script lang="js">
import PasswordResetCard from '../components/Authorisation/PasswordResetCard.vue';

export default {
  name: 'PasswordReset',
  components: {
    PasswordResetCard,
  },
};
</script>
