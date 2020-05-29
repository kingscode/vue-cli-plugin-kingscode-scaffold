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
                    tabindex="11"
                />
            </v-card-text>
            <v-card-actions>
                <VSpacer/>
                <v-btn tabindex="12" type="submit" color="primary" :loading="isLoading">Wachtwoord aanvragen</v-btn>
            </v-card-actions>
        </v-form>
    </v-card>
</template>

<script>
import forgottenRequest from '../../api/endpoints/password/forgotten.js';

export default {
    name: 'PasswordForgottenCard',
    data() {
        return {
            alertType: 'info',
            alertMessage: null,
            isLoading: false,
            valid: null,
            form: {
                email: '',
            },
        };
    },
    methods: {
        async handleRegister() {
            this.$refs.form.validate();
            if (!this.valid) {
                return;
            }
            this.isLoading = true;
            const {success, message} = await forgottenRequest(this.form.email);
            this.alertType = success ? 'success' : 'error';
            this.alertMessage = message;
            this.isLoading = false;
        },
    },
};
</script>

<style scoped>

</style>
