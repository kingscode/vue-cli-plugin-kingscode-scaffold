<template>
  <v-card height="100%">
    <v-form @submit.prevent="handleRegister()" ref="form" v-model="isValid">
      <VCardTitle class="title" v-text="$t('authorisation.passwordReset.title')"/>
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
              field="email"
              tabindex="1"
              v-model="form.email"
          />
          <KTextField
              :append-icon="showPassword ? '$invisible' : '$visible'"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
              field="password"
              tabindex="2"
              v-model="form.password"
          />
          <KTextField
              :append-icon="showPassword ? '$invisible' : '$visible'"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
              field="password"
              tabindex="3"
              v-model="form.passwordConfirmation"
          />
        </k-field-group>
      </v-card-text>
      <v-card-actions>
        <VSpacer/>
        <VBtn :loading="isLoading" color="primary" tabindex="4" type="submit" v-text="$t('actions.save')"/>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import { getRateLimitMinutes } from '@/api/util/response.js';
import KFieldGroup from '@/components/crud/fields/KFieldGroup.vue';
import KTextField from '@/components/crud/fields/KTextField.vue';
import resetRequest from '../../api/endpoints/authorisation/password/reset';

export default {
  name: 'PasswordResetCard',
  components: {
    KTextField,
    KFieldGroup,
  },
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
  created() {
    this.form.email = this.$route.query.email;
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
            this.alertMessage = this.$t('authorisation.passwordReset.successMessage');
          })
          .catch((error) => {
            this.alertType = 'error';
            const { response } = error;
            const { status } = response;

            if (status === 429) {
              this.alertMessage = this.$t('errors.429', { minutes: getRateLimitMinutes(response) });
            } else if (status === 400) {
              this.alertMessage = this.$t('authorisation.passwordReset.errorMessage');
            }

            this.$refs.form.validate();
          })
          .finally(() => {
            this.isLoading = false;
          });
    },
  },
};
</script>

<style scoped>

</style>
