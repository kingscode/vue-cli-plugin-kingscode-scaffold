<template>
  <v-card height="100%">
    <v-form ref="form" v-model="isValid" @submit.prevent="handleRegister()">
      <VCardTitle class="title" v-text="$t('authorisation.passwordForgotten.title')"/>
      <v-card-text>
        <v-alert
            :type="alertType"
            :value="!!alertMessage.length"
            class="mb-10"
            transition="fade-transition"
        >
          {{ alertMessage }}
        </v-alert>
        <k-field-group language-prefix="authorisation.fields">
          <KTextField
              v-model="form.email"
              autocomplete="username"
              autofocus
              field="email"
              tabindex="1"
          />
        </k-field-group>
      </v-card-text>
      <v-card-actions>
        <VSpacer/>
        <VBtn
            :to="{name:'login'}"
            color="primary"
            text
            v-text="$t('actions.back')"/>
        <VBtn :loading="isLoading"
              color="primary"
              tabindex="2"
              type="submit"
              v-text="$t('authorisation.passwordForgotten.request')"/>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import KFieldGroup from '@/components/crud/fields/KFieldGroup.vue';
import KTextField from '@/components/crud/fields/KTextField.vue';
import ForgottenRequest from '../../api/endpoints/authorisation/password/forgotten';
import { getOrganisationFromUrl } from '../../application/util/url.js';

export default {
  name: 'PasswordForgottenCard',
  components: {
    KFieldGroup,
    KTextField,
  },
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

      ForgottenRequest(this.form.email, getOrganisationFromUrl())
          .then(() => {
            this.alertMessage = this.$t('authorisation.passwordForgotten.successMessage');
            this.alertType = 'success';
          })
          .catch(() => {
            this.alertMessage = this.$t('errors.422');
          })
          .finally(() => {
            this.isLoading = false;
          });
    },
  },
};
</script>
