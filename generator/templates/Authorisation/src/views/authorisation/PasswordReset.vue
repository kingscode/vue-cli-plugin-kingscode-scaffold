<template>
  <v-row justify-md="center" align="stretch">
    <v-col md="3">
      <PasswordResetCard :token="$route.params.token"/>
    </v-col>
  </v-row>
</template>

<script lang="js">
import PasswordResetCard from '@/components/authorisation/PasswordResetCard.vue';

export default {
  name: 'PasswordReset',
  components: {
    PasswordResetCard,
  },
};
</script>
