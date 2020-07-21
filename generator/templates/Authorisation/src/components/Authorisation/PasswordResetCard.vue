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
import {getRateLimitMinutes} from '../../api/util/response.js';

export default {
    name: 'PasswordResetCard',
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
                    this.alertMessage = 'Je wachtwoord is opnieuw ingesteld, je kan nu inloggen.';
                })
                .catch(error => {
                    const response = error.response;
                    const status = response.status;

                    if (status === 429) {
                        this.alertMessage =
                            `Je hebt tevaak een foutieve login poging gedaan. Probeer het over ${getRateLimitMinutes(response, 15)} minuten opnieuw`;
                    } else if (status === 400) {
                        this.alertMessage =
                            'Deze wachtwoord reset pagina is verlopen, vraag opnieuw een wachtwoord aan via de wachtwoord vergeten optie';
                    }

                    this.$refs.form.validate();
                })
                .finally(() => this.isLoading = false);
        },
    },
};
</script>

<style scoped>

</style>
