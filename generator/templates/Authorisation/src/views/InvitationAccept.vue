<template>
    <v-form @submit.prevent="handleAccept()" ref="form">
        <v-card>
            <v-card-text>
                <img :src="require('../assets/logo.png')" class="logo">
                <div v-if="!isLoading">
                    <v-alert
                        :value="!!firstValidGlobalError.length"
                        class="mb-10"
                        transition="fade-transition"
                        type="error"
                    >
                        {{firstValidGlobalError}}
                    </v-alert>
                    <VTextField
                        :rules="[(v) => !!v || 'E-Mail is verplicht']"
                        label="E-Mail"
                        v-model="email"
                    />
                    <VTextField
                        :append-icon="showPassword ? 'fa-eye-slash' : 'fa-eye'"
                        :rules="[(v) => !!v || 'Wachtwoord is verplicht', () => serverError('password')]"
                        :type="showPassword ? 'text' : 'password'"
                        @click:append="showPassword = !showPassword"
                        label="Wachtwoord"
                        v-model="password"
                    />
                    <VTextField
                        :append-icon="showPassword ? 'fa-eye-slash' : 'fa-eye'"
                        :rules="[(v) => !!v || 'Wachtwoord is verplicht']"
                        :type="showPassword ? 'text' : 'password'"
                        @click:append="showPassword = !showPassword"
                        label="Wachtwoord"
                        v-model="passwordConfirmation"
                    />
                </div>
                <div class="text-center" v-else>
                    <VProgressCircular
                        :size="70"
                        :width="7"
                        color="accent"
                        indeterminate
                    />
                </div>
            </v-card-text>
            <v-card-actions>
                <VSpacer/>
                <v-btn type="submit" color="accent">Uitnodiging accepteren</v-btn>
            </v-card-actions>
        </v-card>
    </v-form>
</template>

<script lang="js">
import axios from '../api/implementation/app';
import {mapGetters} from 'vuex';

export default {
    name: 'InvitationAccept',
    data() {
        return {
            isLoading: false,
            email: '',
            password: '',
            passwordConfirmation: '',
            errorMessage: '',
            showPassword: false,
            errors: {},
        };
    },
    computed: {
        ...mapGetters({
            isLoggedIn: 'authorisation/isLoggedIn',
            firstError: 'error/first',
            findError: 'error/find',
        }),
        firstValidGlobalError: vm => vm.errorMessage || vm.firstError,
    },
    created() {
        if (this.isLoggedIn) {
            this.$router.push({
                name: 'home',
            });
        }
        this.email = this.$route.query.email || '';
    },
    methods: {
        handleAccept() {
            this.$refs.form.validate();

            this.isLoading = true;

            axios.post('invitation/accept', {
                email: this.email,
                password: this.password,
                password_confirmation: this.passwordConfirmation,
                token: this.$route.params.token,
            }).then(() => this.$router.push({
                    name: 'login',
                }),
            ).catch(error => {
                const response = error.response;
                const data = response.data;

                if (response.status === 422) {
                    this.errors = data.errors || [];
                    process.nextTick(() => {
                        this.$refs.form.validate();
                    });
                } else {
                    if (data.message) this.errorMessage = data.message;
                    else this.errorMessage = 'Er ging iets mis';
                }
            }).finally(() => this.isLoading = false);
        },
        serverError(name) {
            return this.findError(name) || true;
        },
    },
};
</script>

<style scoped lang="scss">
.logo {
    display: block;
    margin: 0 auto;
}
</style>
