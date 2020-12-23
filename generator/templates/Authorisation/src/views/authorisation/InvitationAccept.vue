<template>
  <v-row align="stretch" justify-md="center">
    <v-col md="3">
      <v-form @submit.prevent="handleAccept()" ref="form" v-model="isValid">
        <v-card>
          <VCardTitle class="title" v-text="$t('authorisation.invitationAccept.title')"/>
          <v-card-text>
            <v-alert
                :value="!!alertMessage.length"
                class="mb-10"
                transition="fade-transition"
                type="error"
            >
              {{ alertMessage }}
              <v-row class="mx-0 mt-3 justify-end">
                <v-btn v-if="errorCode === 400 && !!alertMessage.length" outlined @click="handleResend">
                  {{ $t('authorisation.invitationAccept.resend') }}
                </v-btn>
              </v-row>
            </v-alert>

            <k-field-group language-prefix="authorisation.fields">
              <KTextField
                  autocomplete="username"
                  autofocus
                  disabled
                  field="email"
                  tabindex="1"
                  v-model="email"
              />
              <KTextField
                  autocomplete="new-password"
                  autofocus
                  field="password"
                  tabindex="1"
                  type="password"
                  v-model="password"
              />
              <KTextField
                  autocomplete="new-password"
                  field="passwordConfirmation"
                  tabindex="1"
                  type="password"
                  v-model="passwordConfirmation"
              />
            </k-field-group>
          </v-card-text>
          <v-card-actions>
            <VSpacer/>
            <v-btn :loading="isLoading" color="primary" type="submit">{{
                $t('authorisation.invitationAccept.request')
              }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-col>
  </v-row>
</template>

<script lang="js">
import { acceptInvitation, resendInvitation } from '@/api/endpoints/authorisation/register.js';
import { getRateLimitMinutes } from '@/api/util/response.js';
import KFieldGroup from '@/components/crud/fields/KFieldGroup.vue';
import KTextField from '@/components/crud/fields/KTextField.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'InvitationAccept',
  components: {
    KFieldGroup,
    KTextField,
  },
  data() {
    return {
      errorCode: 0,
      alertMessage: '',
      isLoading: false,
      isValid: false,

      email: this.$route.query.email,
      password: '',
      passwordConfirmation: '',
    };
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'authorisation/isLoggedIn',
      firstError: 'error/first',
    }),
  },
  created() {
    if (this.isLoggedIn) {
      this.$router.push({
        name: 'home',
      });
    }

    if (!this.$route.query.email) {
      this.$router.push({
        name: 'login',
      });

      throw new Error('InvitationAccept::created no email present');
    }
  },
  methods: {
    async handleResend() {
      await resendInvitation(this.email);
      this.$router.push({name: 'login', query: {message: 'resendInvitationSuccess'}});
    },
    handleAccept() {
      this.isLoading = true;
      acceptInvitation(this.email, this.$route.params.token, this.password, this.passwordConfirmation)
          .then(() => {
            this.$router.push({name: 'login', query: {message: 'acceptInvitationSuccess'}});
          })
          .catch((error) => {
            const { response } = error;
            const { status } = response;

            this.errorCode = status;
            if (status === 429) {
              this.alertMessage = this.$t('errors.429', { minutes: getRateLimitMinutes(response) });
            } else if (status === 400) {
              this.alertMessage = this.$t('authorisation.invitationAccept.errorMessage');
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

<style lang="scss" scoped>
.logo {
  display: block;
  margin:  0 auto;
}
</style>
