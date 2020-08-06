<template>
  <v-row align="stretch" justify-md="center">
    <v-col md="3">
      <v-card height="100%">
        <v-form @submit.prevent="onFormSubmit()" ref="form" v-model="isValid">
          <v-card-title class="title">Ik wil een account aanvragen</v-card-title>
          <v-card-text>
            <v-alert
                :type="alertType"
                :value="!!alertMessage.length"
                text
                transition="fade-transition"
            >
              {{ alertMessage }}
            </v-alert>
            <VTextField
                :rules="[(v) => !!v || 'E-mailadres is verplicht', () => serverError('email')]"
                filled
                label="E-mailadres"
                tabindex="0"
                v-model="form.email"
            />
            <VTextField
                :append-icon="showPassword ? 'far fa-eye-slash' : 'far fa-eye'"
                :rules="[(v) => !!v || 'Wachtwoord is verplicht', () => serverError('password')]"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
                filled
                label="Wachtwoord"
                tabindex="1"
                v-model="form.password"
            />
            <VTextField
                :append-icon="showPassword ? 'far fa-eye-slash' : 'far fa-eye'"
                :rules="[(v) => !!v || 'Wachtwoord is verplicht', (v) => v === form.password || 'Wachtwoorden komen niet overeen', () => serverError('passwordConfirmation')]"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
                filled
                label="Wachtwoord nogmaals"
                tabindex="2"
                v-model="form.passwordConfirmation"
            />
          </v-card-text>
          <v-card-actions>
            <VSpacer/>
            <v-btn :loading="isLoading" color="primary" tabindex="12" type="submit">Instellen</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { verify } from '../api/endpoints/authorisation/register.js';
import { getRateLimitMinutes } from '../api/util/response.js';
import { getFragment } from '../application/util/url.js';
import BaseForm from '../components/BaseForm.vue';

export default {
  name: 'Verify',
  extends: BaseForm,
  data() {
    return {
      form: {
        email: '',
      },
      isLoading: false,
      alertType: 'success',
      alertMessage: '',
      valid: true,
      showPassword: false,
    };
  },
  created() {
    this.form.email = getFragment('email');
  },
  methods: {
    onFormSubmit() {
      const token = getFragment('token');

      if (!token) return; // what to do?

      this.isLoading = true;

      verify(token, this.form.email, this.form.password, this.form.passwordConfirmation)
          .then(() => {
            this.alertMessage = 'Je account is geactiveerd, je kunt nu inloggen.';
            this.alertType = 'success';
          })
          .catch(error => {
            const response = error.response;
            const status = response.status;

            if (status === 429) {
              this.alertMessage = `Je hebt te vaak een foutieve activatie poging gedaan.
                         Probeer het over ${getRateLimitMinutes(response)} minuten opnieuw`;
              this.alertType = 'error';
              return;
            } else if (status === 400) {
              this.alertMessage = 'De verificatie is verlopen, vraag opnieuw een wachtwoord aan via de wachtwoord vergeten optie.';
              this.alertType = 'error';
              return;
            }
            this.alertMessage = 'Niet alle velden zijn juist ingevuld';
            this.alertType = 'error';
            this.validate();
          })
          .finally(() => {
            this.isLoading = false;
          });
    },
  },
};
</script>
=
