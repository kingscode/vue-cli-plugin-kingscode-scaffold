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
                    :rules="[(v) => !!v || 'Naam is verplicht']"
                    label="Naam"
                    v-model="form.name"
                    tabindex="10"
                />
                <VTextField
                    :rules="[(v) => !!v || 'E-Mail is verplicht']"
                    label="E-Mail"
                    v-model="form.email"
                    tabindex="11"
                />
            </v-card-text>
            <v-card-actions>
                <VSpacer/>
                <v-btn tabindex="12" type="submit" color="primary" :loading="isLoading">Registreren</v-btn>
            </v-card-actions>
        </v-form>
    </v-card>
</template>

<script>
import registerRequest from '../../api/endpoints/authorisation/register.js';

export default {
    name: 'RegisterCard',
    data() {
        return {
            alertType: 'info',
            alertMessage: null,
            isLoading: false,
            valid: null,
            form: {
                name: '',
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
            const {success, message} = await registerRequest(this.form.email, this.form.name);
            this.alertType = success ? 'success' : 'error';
            this.alertMessage = message;
            this.isLoading = false;
        },
    },
};
</script>

<style scoped>

</style>
