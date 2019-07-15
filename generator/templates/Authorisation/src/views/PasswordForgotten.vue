<template>
    <v-form @submit.prevent="handlePasswordForgotten()" ref="form" v-model="valid">
        <v-card>
            <v-card-text>
                <template v-if="!loading">
                    <img :src="require('../assets/logo.png')" class="logo">
                    <v-alert
                        :value="successMessage !== null"
                        class="mb-4"
                        transition="fade-transition"
                        type="success"
                    >
                        {{successMessage}}
                    </v-alert>
                    <v-text-field
                        :rules="[(v) => !!v || 'E-Mail is verplicht']"
                        label="E-Mail"
                        v-model="email"
                    ></v-text-field>
                </template>
                <div class="text-xs-center" v-else>
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
                <v-btn @click="handleLogin()" color="accent" flat>inloggen</v-btn>
                <v-btn @click="handlePasswordForgotten()" type="submit" color="accent">Wachtwoord aanvragen</v-btn>
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
                successMessage: null,
            };
        },
        created() {
            if (this.$store.getters['Authorization/isLoggedIn']) {
                this.$router.push({name: 'home'});
            }
        },
        methods: {
            handlePasswordForgotten() {
                if (this.valid) {
                    this.loading = true;
                    this.$http.post('password/forgotten', {
                        email: this.email,
                    }).then(() => {
                        this.loading = false;
                        this.successMessage = 'Wanneer het E-Mail adres "' + this.email + '" bestaat binnen ons systeem is daar nu een mail naar verstuurd met een link.';
                    });
                }
                this.$refs.form.validate();
            },
            handleLogin() {
                this.$router.push({name: 'login'});
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