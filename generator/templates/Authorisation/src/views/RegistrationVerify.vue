<template>
  <v-row align="stretch" justify-md="center">
    <v-col md="3">
      <v-card height="100%">
        <v-form @submit.prevent="onFormSubmit()" ref="form">
          <VCardTitle class="title" v-text="$t('authorisation.registrationVerify.title')"/>
          <v-card-text>
            <v-alert
                :type="alertType"
                :value="!!alertMessage.length"
                text
                transition="fade-transition"
            >
              {{ alertMessage }}
            </v-alert>

            <k-field-group language-prefix="authorisation.fields">
              <KTextField
                  field="email"
                  tabindex="0"
                  v-model="form.email"
              />
              <KTextField
                  :append-icon="showPassword ? 'far fa-eye-slash' : 'far fa-eye'"
                  :type="showPassword ? 'text' : 'password'"
                  @click:append="showPassword = !showPassword"
                  field="password"
                  tabindex="1"
                  v-model="form.password"
              />
              <KTextField
                  :append-icon="showPassword ? 'far fa-eye-slash' : 'far fa-eye'"
                  :type="showPassword ? 'text' : 'password'"
                  @click:append="showPassword = !showPassword"
                  field="password"
                  tabindex="2"
                  v-model="form.passwordConfirmation"
              />
            </k-field-group>
          </v-card-text>
          <v-card-actions>
            <VSpacer/>
            <VBtn :loading="isLoading" color="primary" tabindex="12" type="submit" v-text="$t('actions.save')"/>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { verify } from '@/api/endpoints/authorisation/register';
import { getRateLimitMinutes } from '@/api/util/response';
import { getFragment } from '@/application/util/url';
import KFieldGroup from '@/components/crud/fields/KFieldGroup.vue';
import KTextField from '@/components/crud/fields/KTextField.vue';

export default {
  name: 'Verify',
  components: {
    KTextField,
    KFieldGroup,
  },
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

      // TODO: what to do?
      if (!token) return;

      this.isLoading = true;

      verify(token, this.form.email, this.form.password, this.form.passwordConfirmation)
          .then(() => {
            this.alertMessage = this.$t('authorisation.registrationVerify.successMessage');
            this.alertType = 'success';
          })
          .catch((error) => {
            const { response } = error;
            const { status } = response;

            this.alertType = 'error';
            if (status === 429) {
              this.alertMessage = this.$t('errors.429', { minutes: getRateLimitMinutes(response) });
            } else if (status === 400) {
              this.alertMessage = this.$t('authorisation.registrationVerify.errorMessage');
            }
            this.validate();
          })
          .finally(() => {
            this.isLoading = false;
          });
    },
  },
};
</script>
