<template>
    <v-card height="100%">
        <v-form @submit.prevent="handleRegister()" ref="form" v-model="valid">
            <v-card-title class="title">Ik wil een account aanvragen</v-card-title>
            <v-card-text>
                <v-alert
                    :value="alertMessage !== null"
                    class="mb-10"
                    transition="fade-transition"
                    :type="alertType"
                >
                    {{alertMessage}}
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
                <VTextField
                    :append-icon="showPassword ? 'fa-eye-slash' : 'fa-eye'"
                    :rules="[(v) => !!v || 'Wachtwoord is verplicht']"
                    :type="showPassword ? 'text' : 'password'"
                    @click:append="showPassword = !showPassword"
                    label="Wachtwoord"
                    v-model="form.passwordConfirmation"
                    tabindex="3"
                />
            </v-card-text>
            <v-card-actions>
                <VSpacer/>
                <v-btn tabindex="4" type="submit" color="primary" :loading="isLoading">Wachtwoord aanvragen</v-btn>
            </v-card-actions>
        </v-form>
    </v-card>
</template>

<script>
import resetRequest from '../../api/endpoints/password/reset.js';

export default {
    name: 'PasswordResetCard',
    props: {
        token: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            alertType: 'info',
            alertMessage: null,
            isLoading: false,
            valid: null,
            form: {
                email: '',
                password: '',
                passwordConfirmation: '',
            },
            showPassword: false,
        };
    },
    methods: {
        async handleRegister() {
            this.$refs.form.validate();
            if (!this.valid) {
                return;
            }
            this.isLoading = true;
            const {success, message} = await resetRequest(this.form.email, this.token, this.form.password, this.form.passwordConfirmation);
            this.alertType = success ? 'success' : 'error';
            this.alertMessage = message;
            this.isLoading = false;
        },
    },
};
</script>

<style scoped>

</style>
