<template>
  <v-row align="stretch" justify-md="center">
    <v-col md="3">
      <PasswordForgottenCard/>
    </v-col>
  </v-row>
</template>

<script>
import PasswordForgottenCard from '../components/Authorisation/PasswordForgottenCard.vue';

export default {
  name: 'PasswordForgotten',
  components: { PasswordForgottenCard },
};
</script>
