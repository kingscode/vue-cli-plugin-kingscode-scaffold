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
            tabindex="1"
            v-model="form.email"
        />
        <VTextField
            :append-icon="showPassword ? 'fa-eye-slash' : 'fa-eye'"
            :rules="[(v) => !!v || 'Wachtwoord is verplicht']"
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
            label="Wachtwoord"
            tabindex="2"
            v-model="form.password"
        />
        <VTextField
            :append-icon="showPassword ? 'fa-eye-slash' : 'fa-eye'"
            :rules="[(v) => !!v || 'Wachtwoord is verplicht']"
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
            label="Wachtwoord"
            tabindex="3"
            v-model="form.passwordConfirmation"
        />
      </v-card-text>
      <v-card-actions>
        <VSpacer/>
        <v-btn :loading="isLoading" color="primary" tabindex="4" type="submit">Wachtwoord aanvragen</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import resetRequest from '../../api/endpoints/password/reset.js';
import { getRateLimitMinutes } from '../../api/util/response.js';

export default {
  name: 'PasswordResetCard',
  props: {
    token: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      alertType: 'success',
      alertMessage: '',
      isLoading: false,
      isValid: false,
      form: {
        email: '',
        password: '',
        passwordConfirmation: '',
      },
      showPassword: false,
    };
  },
  methods: {
    handleRegister() {
      this.$refs.form.validate();

      if (!this.isValid) return;

      this.isLoading = true;
      this.alertType = 'error';
      this.errorMessage = '';

      resetRequest(this.form.email, this.token, this.form.password, this.form.passwordConfirmation)
          .then(() => {
            this.alertType = 'success';
            this.alertMessage = 'Je wachtwoord is opnieuw ingesteld, je kan nu inloggen.';
          })
          .catch(error => {
            const response = error.response;
            const status = response.status;

            if (status === 429) {
              this.alertMessage =
                  `Je hebt tevaak een foutieve login poging gedaan. Probeer het over ${getRateLimitMinutes(response, 15)} minuten opnieuw`;
            } else if (status === 400) {
              this.alertMessage =
                  'Deze wachtwoord reset pagina is verlopen, vraag opnieuw een wachtwoord aan via de wachtwoord vergeten optie';
            }

            this.$refs.form.validate();
          })
          .finally(() => this.isLoading = false);
    },
  },
};
</script>

<style scoped>

</style>
