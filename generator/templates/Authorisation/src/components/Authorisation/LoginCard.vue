<template>
    <v-card height="100%">
        <v-form @submit.prevent="handleLogin()" ref="form" v-model="isValid">
            <v-card-title class="title">Ik wil inloggen</v-card-title>
            <v-card-text>
                <v-alert :value="!!errorMessage.length"
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
import LoginRequest from '../../api/endpoints/authorisation/login';
import {mapGetters} from 'vuex';

export default {
    name: 'LoginCard',
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
            findError: 'Error/find',
        }),
    },
    methods: {
        handleLogin() {
            this.isLoading = true;
            LoginRequest(this.form.email, this.form.password)
                .then(res => {
                    this.isRedirecting = true;
                    this.redirectToAuthDispense(res.data.token);
                })
                .catch(() => this.errorMessage = this.findError('email'))
                .finally(() => this.isLoading = false);
        },
        redirectToAuthDispense(token) {
            const form = document.createElement('form');

            form.method = 'POST';
            form.action = process.env.VUE_APP_ROOT_API + '/auth/dispense';

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
