<template>
  <v-card height="100%">
    <v-form @submit.prevent="handleRegister()" ref="form" v-model="isValid">
      <v-card-title class="title">Ik wil een account aanvragen</v-card-title>
      <v-card-text>
        <v-alert
            :type="alertType"
            :value="!!alertMessage.length"
            class="mb-10"
            transition="fade-transition"
        >
          {{ alertMessage }}
        </v-alert>
        <VTextField
            :rules="[(v) => !!v || 'E-Mail is verplicht']"
            label="E-Mail"
            tabindex="11"
            v-model="form.email"
        />
      </v-card-text>
      <v-card-actions>
        <VSpacer/>
        <v-btn :loading="isLoading" color="primary" tabindex="12" type="submit">Wachtwoord aanvragen</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import ForgottenRequest from '../../api/endpoints/password/forgotten.js';

export default {
  name: 'PasswordForgottenCard',
  data() {
    return {
      alertType: 'success',
      alertMessage: '',
      isLoading: false,
      isValid: false,
      form: {
        email: '',
      },
    };
  },
  methods: {
    handleRegister() {
      this.$refs.form.validate();

      if (!this.isValid) return;

      this.isLoading = true;
      this.alertMessage = '';
      this.alertType = 'error';

      ForgottenRequest(this.form.email)
          .then(() => {
            this.alertMessage = 'Er is een wachtwoord vergeten mail verstuurd mits er een account bestaat met het gegeven email adres.';
            this.alertType = 'success';
          })
          .catch(() => this.alertMessage = 'De ingevulde gegevens kloppen niet.')
          .finally(() => this.isLoading = false);
    },
  },
};
</script>
