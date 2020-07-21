<template>
    <v-card height="100%">
        <v-form @submit.prevent="handleRegister()" ref="form" v-model="isValid">
            <v-card-title class="title">Ik wil een account aanvragen</v-card-title>
            <v-card-text>
                <v-alert
                    :value="!!alertMessage.length"
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
import {register} from '../../api/endpoints/authorisation/register.js';

export default {
    name: 'RegisterCard',
    data() {
        return {
            alertType: 'success',
            alertMessage: '',
            isLoading: false,
            isValid: false,
            form: {
                name: '',
                email: '',
            },
        };
    },
    methods: {
        handleRegister() {
            this.$refs.form.validate();

            if (!this.isValid) return;

            this.isLoading = true;
            this.alertType = 'error';
            this.alertMessage = '';

            register(this.form.email, this.form.name)
                .then(() => {
                    this.alertType = 'success';
                    this.alertMessage = 'Er is een account aangemaakt, controleer je e-mail om een wachtwoord te kiezen zodat je vervolgens kunt inloggen.';
                })
                .catch(() => {
                    this.alertType = 'error';
                    this.alertMessage = 'De ingevulde gegevens kloppen niet.';
                })
                .finally(() => this.isLoading = false);
        },
    },
};
</script>

<style scoped>

</style>
