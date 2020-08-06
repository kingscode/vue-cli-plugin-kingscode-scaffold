<template>
  <v-row align="stretch" justify-md="center">
    <v-col md="3">
      <LoginCard/>
    </v-col>
    <v-col md="3">
      <RegisterCard/>
    </v-col>
  </v-row>
</template>

<script lang="js">
import LoginCard from '../components/Authorisation/LoginCard.vue';
import RegisterCard from '../components/Authorisation/RegisterCard.vue';

export default {
  name: 'Login',
  components: {
    RegisterCard,
    LoginCard,
  },
};
</script>
