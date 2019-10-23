<template>
    <v-container>
        <v-layout align-center justify-center mt-12>
            <v-flex xs12 sm10 md8 lg6 xl4>
                <v-form @submit.prevent="updateProfile" ref="profileForm">
                    <v-subheader class="pa-0">Profiel</v-subheader>
                    <v-card class="themed-color">
                        <div class="text-xs-center pa-12"
                             v-if="profileFormLoading">
                            <v-progress-circular
                                :width="3"
                                color="accent"
                                indeterminate
                            ></v-progress-circular>
                        </div>
                        <v-card-text v-else>
                            <v-text-field
                                v-model="profileForm.name"
                                label="Naam"
                                hint="Hoe heet je?"
                                :rules="[(v) => !!v || 'Naam is verplicht', v => serverError('name', v)]"
                            ></v-text-field>
                            <v-text-field
                                v-model="profileForm.email"
                                label="Email"
                                hint="Welk e-mail adres wil je gebruiken om in te loggen?"
                                :rules="[(v) => !!v || 'E-mail is verplicht', v => serverError('email', v)]"
                            ></v-text-field>
                        </v-card-text>
                        <v-btn
                            color="accent"
                            dark
                            small
                            absolute
                            bottom
                            right
                            fab
                            @click="updateProfile"
                            type="submit"
                        >
                            <v-icon>fa-save</v-icon>
                        </v-btn>
                    </v-card>

                </v-form>
                <v-form  @submit.prevent="updatePassword" ref="passwordForm">
                    <v-subheader class="pa-0">Wachtwoord</v-subheader>
                    <v-card class="themed-color">
                        <div class="text-xs-center pa-12"
                             v-if="passwordFormLoading">
                            <v-progress-circular
                                :width="3"
                                color="accent"
                                indeterminate
                            ></v-progress-circular>
                        </div>
                        <v-card-text v-else>
                            <v-text-field
                                v-model="passwordForm.password"
                                :append-icon="passwordShow ? 'fas fa-eye-slash' : 'fas fa-eye'"
                                :type="passwordShow ? 'text' : 'password'"
                                label="Wachtwoord"
                                hint="kies een veilig en lang wachtwoord"
                                @click:append="passwordShow = !passwordShow"
                                :rules="[(v) => v === passwordForm.password || 'Beiden wachtwoorden moeten hezelfde zijn', (v) => serverError('password', v)]"
                            ></v-text-field>
                            <v-text-field
                                v-model="passwordForm.password_confirmation"
                                :append-icon="passwordShow ? 'fas fa-eye-slash' : 'fas fa-eye'"
                                :type="passwordShow ? 'text' : 'password'"
                                label="Wachtwoord ter controle"
                                hint="Hetzelfde wachtwoord"
                                @click:append="passwordShow = !passwordShow"
                                :rules="[(v) => v === passwordForm.password || 'Beiden wachtwoorden moeten hezelfde zijn', (v) => serverError('password', v)]"
                            ></v-text-field>
                        </v-card-text>
                        <v-btn
                            color="accent"
                            dark
                            small
                            absolute
                            bottom
                            right
                            fab
                            @click="updatePassword"
                            type="submit"
                        >
                            <v-icon>fa-save</v-icon>
                        </v-btn>
                    </v-card>
                </v-form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

    export default {
        name: 'Profile',
        data() {
            return {
                passwordForm: {
                    password: '',
                    password_confirmation: '',
                },
                profileForm: {
                    email: '',
                    name: '',
                },
                passwordFormLoading: false,
                profileFormLoading: false,
                ipFormErrors: null,
                passwordShow: false,
                errors: {},
            };
        },
        methods: {
            updateProfile() {
                this.errors = {};
                this.profileFormLoading = true;
                this.$http.put('profile', this.profileForm).then(() => {
                    this.profileFormLoading = false;
                }).catch((error) => {
                    this.errors = error.response.data.errors;
                    this.profileFormLoading = false;
                    this.$refs.profileForm.validate();
                });
            },
            updatePassword() {
                this.errors = {};
                this.passwordFormLoading = true;
                this.$http.put('profile/password', this.passwordForm).then(() => {
                    this.passwordFormLoading = false;
                }).catch((error) => {
                    this.errors = error.response.data.errors;
                    this.passwordFormLoading = false;
                    this.$refs.passwordForm.validate();
                });
            },
            getProfile() {
                return new Promise((resolve) => {
                    this.$http.get('profile').then((response) => {
                        resolve(response.data.data);
                    });
                });
            },
            serverError(name, v) {
                if (this.errors !== null && typeof this.errors[name] !== 'undefined') {
                    return this.errors[name][0];
                }
                return true;
            },
        },
        created() {
            this.getProfile().then((profile) => {
                this.profileForm.email = profile.email;
                this.profileForm.name = profile.name;
            });
        },
    };
</script>

<style scoped>

</style>
