<template>
    <v-form @submit.prevent="handleLogin()" ref="form" v-model="valid">
        <v-card>
            <v-card-text>
                <template v-if="!loading">
                    <img :src="require('../assets/logo.png')" class="logo">
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
                        v-model="username"
                        tabindex="1"
                    ></v-text-field>
                    <v-text-field
                        :append-icon="showpassword ? 'fa-eye-slash' : 'fa-eye'"
                        :rules="[(v) => !!v || 'Wachtwoord is verplicht']"
                        :type="showpassword ? 'text' : 'password'"
                        @click:append="showpassword = !showpassword"
                        label="Wachtwoord"
                        v-model="password"
                        tabindex="2"
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
                <v-btn @click="handlePasswordForgotten()" color="accent" text>Wachtwoord vergeten</v-btn>
                <v-btn @click="handleLogin()" tabindex="3" type="submit" color="accent">Inloggen</v-btn>
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
                showpassword: false,
                password: '',
                username: '',
                errorMessage: null,
            };
        },
        created() {
            if (this.$store.getters['Authorization/isLoggedIn']) {
                this.$router.push({name: 'home'});
            }
        },
        methods: {
            handleLogin() {
                if (this.valid) {
                    if (!this.$store.getters['Authorization/isLoggedIn']) {
                        this.loading = true;
                        this.$store.dispatch('Authorization/login', {
                            username: this.username,
                            password: this.password,
                        }).catch((error) => {
                            this.loading = false;
                            if (error === 'invalid_credentials') {
                                this.errorMessage = 'De opgegeven gebruikersnaam en wachtwoord kloppen niet.';
                            } else {
                                this.errorMessage = 'Er ging iets onbekends mis.';
                            }
                        });
                    }
                    return;
                }
                this.$refs.form.validate();
            },
            handlePasswordForgotten() {
                this.$router.push({name: 'password.forgotten'});
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
