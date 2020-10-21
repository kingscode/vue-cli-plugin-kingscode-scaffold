<template>
  <v-row align="stretch" justify-md="center">
    <v-col md="3">
      <LoginCard/>
    </v-col>
  </v-row>
</template>

<script lang="js">
import LoginCard from '@/components/authorisation/LoginCard.vue';

export default {
  name: 'Login',
  components: {
    LoginCard,
  },
};
</script>
