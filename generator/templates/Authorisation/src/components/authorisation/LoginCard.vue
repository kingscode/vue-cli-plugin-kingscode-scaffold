<template>
  <v-card height="100%">
    <v-form @submit.prevent="handleLogin()" ref="form" v-model="isValid">
      <VCardTitle class="title" v-text="$t('authorisation.login.title')"/>
      <v-card-text>
        <v-alert :value="!!errorMessage.length"
                 class="mb-10"
                 transition="fade-transition"
                 type="error"
        >
          {{ errorMessage }}
        </v-alert>
        <v-alert v-if="$route.query.message"
                 class="mb-10"
                 transition="fade-transition"
                 type="success"
        >
          {{ $t(`authorisation.login.messages.${$route.query.message}`) }}
        </v-alert>
        <k-field-group language-prefix="authorisation.fields">
          <KTextField field="email"
                      autofocus
                      tabindex="1"
                      v-model="form.email"
                      autocomplete="username"
          />
          <KTextField :append-icon="showPassword ? '$invisible' : '$visible'"
                      :type="showPassword ? 'text' : 'password'"
                      @click:append="showPassword = !showPassword"
                      field="password"
                      autocomplete="current-password"
                      tabindex="2"
                      v-model="form.password"
          />
        </k-field-group>
      </v-card-text>
      <v-card-actions>
        <VSpacer/>
        <VBtn :to="{name: 'password.forgotten'}"
              color="primary"
              tabindex="4"
              text
              v-text="$t('authorisation.actions.passwordForgotten')"/>
        <VBtn :loading="isLoading"
              color="primary"
              tabindex="3"
              type="submit"
              v-text="$t('authorisation.actions.login')"/>
      </v-card-actions>
    </v-form>

    <v-overlay class="text-center" v-model="isRedirecting">
      <VProgressCircular indeterminate size="64"/>
      <div class="mt-5" v-text="$t('authorisation.login.successMessage')"></div>
    </v-overlay>
  </v-card>
</template>

<script>
import { getRateLimitMinutes } from '@/api/util/response';
import KFieldGroup from '@/components/crud/fields/KFieldGroup.vue';
import KTextField from '@/components/crud/fields/KTextField.vue';
import { mapGetters } from 'vuex';
import LoginRequest from '../../api/endpoints/authorisation/login';

export default {
  name: 'LoginCard',
  components: {
    KFieldGroup,
    KTextField,
  },
  data() {
    return {
      errorMessage: '',
      isLoading: false,
      showPassword: false,
      isValid: false,
      form: {
        email: '',
        password: '',
      },
      isRedirecting: false,
    };
  },
  computed: {
    ...mapGetters({
      findError: 'error/find',
    }),
  },
  methods: {
    handleLogin() {
      this.isLoading = true;
      LoginRequest(this.form.email, this.form.password)
          .then((res) => {
            this.isRedirecting = true;
            this.redirectToAuthDispense(res.data.data.token);
          })
          .catch((err) => {
            const { response } = err;
            const { status } = response;

            if (status === 429) {
              this.errorMessage = this.$t('errors.429', { minutes: getRateLimitMinutes(response) });
            } else {
              this.errorMessage = this.findError('email');
            }
            this.$refs.form.validate();
          })
          .finally(() => {
            this.isLoading = false;
          });
    },
    redirectToAuthDispense(token) {
      const form = document.createElement('form');

      form.method = 'POST';
      form.action = `${process.env.VUE_APP_ROOT_API}/auth/dispense`;

      const redirectUriElement = document.createElement('input');
      redirectUriElement.name = 'redirect_uri';
      redirectUriElement.value = 'home';
      form.appendChild(redirectUriElement);

      const emailElement = document.createElement('input');
      emailElement.name = 'email';
      emailElement.value = this.form.email;
      form.appendChild(emailElement);

      const tokenElement = document.createElement('input');
      tokenElement.name = 'token';
      tokenElement.value = token;
      form.appendChild(tokenElement);

      document.body.appendChild(form);
      form.submit();
    },
  },
};
</script>
