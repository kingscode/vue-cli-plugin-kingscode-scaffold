<template>
    <v-form @submit.prevent="handlePasswordForgotten()" ref="form" v-model="valid">
        <v-card>
            <v-card-text>
                <img :src="require('../assets/logo.png')" class="logo">
                <template v-if="!loading">
                    <v-alert
                        :value="errorMessage !== null"
                        class="mb-10"
                        transition="fade-transition"
                        type="error"
                    >
                        {{errorMessage}}
                    </v-alert>
                    <v-text-field
                        :rules="[(v) => !!v || 'E-Mail is verplicht']"
                        label="E-Mail"
                        v-model="email"
                    ></v-text-field>
                    <v-text-field
                        :append-icon="showpassword ? 'fa-eye-slash' : 'fa-eye'"
                        :rules="[(v) => !!v || 'Wachtwoord is verplicht', v => serverError('password', v)]"
                        :type="showpassword ? 'text' : 'password'"
                        @click:append="showpassword = !showpassword"
                        label="Nieuw wachtwoord"
                        v-model="password"
                    ></v-text-field>
                    <v-text-field
                        :append-icon="showpassword ? 'fa-eye-slash' : 'fa-eye'"
                        :rules="[(v) => !!v || 'Wachtwoord is verplicht']"
                        :type="showpassword ? 'text' : 'password'"
                        @click:append="showpassword = !showpassword"
                        label="Nieuw wachtwoord"
                        v-model="password_confirmation"
                    ></v-text-field>
                </template>
                <div class="text-center" v-else>
                    <v-progress-circular
                        :size="70"
                        :width="7"
                        color="accent"
                        indeterminate
                    ></v-progress-circular>
                </div>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="handlePasswordReset()" type="submit" color="accent">Wachtwoord resetten</v-btn>
            </v-card-actions>
        </v-card>
    </v-form>
</template>

<script>

    export default {
        components: {},
        watch: {},
        props: [],
        name: '',
        data() {
            return {
                loading: false,
                valid: null,
                email: '',
                password: '',
                password_confirmation: '',
                errorMessage: null,
                showpassword: false,
                errors: {},
            };
        },
        created() {
            if (this.$store.getters['Authorization/isLoggedIn']) {
                this.$router.push({name: 'home'});
            }
            this.email = this.$route.query.email;
        },
        methods: {
            handlePasswordReset() {
                this.$refs.form.validate();
                this.loading = true;
                this.$http.post('password/reset', {
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.password_confirmation,
                    token: this.$route.params.token,
                }).then(() => {
                    this.loading = false;
                    this.handleLogin();
                }).catch((error) => {
                    this.loading = false;
                    if (error.response.status === 422) {
                        this.errors = error.response.data.errors;
                        process.nextTick(() => {
                            this.$refs.form.validate();
                        });
                    } else {
                        this.errorMessage = 'Er ging iets mis.';
                        if (typeof error.response.data.message !== 'undefined' && error.response.data.message !== null) {
                            this.errorMessage = error.response.data.message;
                        }
                    }
                });
            },
            handleLogin() {
                this.$router.push({name: 'login'});
            }, serverError(name) {
                if (this.errors !== null && typeof this.errors[name] !== 'undefined') {
                    return this.errors[name][0];
                }
                return true;
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
