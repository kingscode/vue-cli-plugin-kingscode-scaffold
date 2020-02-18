<template>
    <v-card height="100%">
        <v-form @submit.prevent="handleLogin()" ref="form" v-model="valid">
            <v-card-title class="title">Ik wil inloggen</v-card-title>
            <v-card-text>
                <v-alert
                    :value="errorMessage !== null"
                    class="mb-10"
                    transition="fade-transition"
                    type="error"
                >
                    {{errorMessage}}
                </v-alert>
                <VTextField
                    :rules="[(v) => !!v || 'E-Mail is verplicht']"
                    label="E-Mail"
                    v-model="form.email"
                    tabindex="1"
                />
                <VTextField
                    :append-icon="showPassword ? 'fa-eye-slash' : 'fa-eye'"
                    :rules="[(v) => !!v || 'Wachtwoord is verplicht']"
                    :type="showPassword ? 'text' : 'password'"
                    @click:append="showPassword = !showPassword"
                    label="Wachtwoord"
                    v-model="form.password"
                    tabindex="2"
                />
            </v-card-text>
            <v-card-actions>
                <VSpacer/>
                <v-btn :to="{name: 'password.forgotten'}" tabindex="4" color="primary" text>Wachtwoord vergeten</v-btn>
                <v-btn tabindex="3" type="submit" color="primary" :loading="isLoading">Inloggen</v-btn>
            </v-card-actions>
        </v-form>

        <v-overlay v-model="isRedirecting" class="text-center">
            <VProgressCircular indeterminate size="64"/>
            <div class="mt-5">Je bent ingelogd, we sturen je nu door.</div>
        </v-overlay>
    </v-card>
</template>

<script>
import loginRequest from './../../api/authorisation/login';

export default {
    name: 'LoginCard',
    data() {
        return {
            errorMessage: null,
            isLoading: false,
            showPassword: false,
            valid: null,
            form: {
                email: '',
                password: '',
            },
            isRedirecting: false,
        };
    },
    methods: {
        async handleLogin() {
            this.$refs.form.validate();
            if (!this.valid) {
                return;
            }
            this.isLoading = true;
            const {success, message, token} = await loginRequest(this.form.email, this.form.password);

            this.isLoading = false;

            if (success) {
                this.isRedirecting = true;
                return this.redirectToAuthDispense(token);
            }

            this.errorMessage = message;
        },
        redirectToAuthDispense(token) {
            const form = document.createElement("form");

            form.method = 'POST';
            form.action = process.env.VUE_APP_ROOT_API + '/auth/dispense';

            const redirectUriElement = document.createElement("input");
            redirectUriElement.name = 'redirect_uri';
            redirectUriElement.value= 'home';
            form.appendChild(redirectUriElement);

            const emailElement = document.createElement("input");
            emailElement.name = 'email';
            emailElement.value= this.form.email;
            form.appendChild(emailElement);

            const tokenElement = document.createElement("input");
            tokenElement.name = 'token';
            tokenElement.value= token;
            form.appendChild(tokenElement);

            document.body.appendChild(form);
            form.submit();
        }
    },
};
</script>

<style scoped>

</style>
