<template>
    <v-container>
        <v-layout align-center justify-center mt-5>
            <v-flex xs12 sm10 md8 lg6 xl4>
                <v-form ref="form">
                    <v-subheader class="pa-0">Profiel</v-subheader>
                    <v-card class="themed-color">
                        <div class="text-xs-center pa-5"
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
                            ></v-text-field>
                            <v-text-field
                                v-model="profileForm.email"
                                label="Email"
                                hint="Welk e-mail adres wil je gebruiken om in te loggen?"
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
                        >
                            <v-icon>fa-save</v-icon>
                        </v-btn>
                    </v-card>

                    <v-subheader class="pa-0">Wachtwoord</v-subheader>
                    <v-card class="themed-color">
                        <div class="text-xs-center pa-5"
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
                            ></v-text-field>
                            <v-text-field
                                v-model="passwordForm.password_confirmation"
                                :append-icon="passwordShow ? 'fas fa-eye-slash' : 'fas fa-eye'"
                                :type="passwordShow ? 'text' : 'password'"
                                label="Wachtwoord ter controle"
                                hint="Hetzelfde wachtwoord"
                                @click:append="passwordShow = !passwordShow"
                                :rules="[(v) => v === passwordForm.password || 'Beiden wachtwoorden moeten hezelfde zijn']"
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
            };
        },
        methods: {
            updateProfile() {
                this.profileFormLoading = true;
                this.$http.put('profile', this.profileForm).finally(() => {
                    this.profileFormLoading = false;
                });
            },
            updatePassword() {
                this.passwordFormLoading = true;
                this.$http.put('profile/password', this.passwordForm).finally(() => {
                    this.passwordFormLoading = false;
                });
            },
            getProfile() {
                return new Promise((resolve) => {
                    this.$http.get('profile').then((response) => {
                        resolve(response.data.data);
                    });
                });
            }
        },
        created() {
            this.getProfile().then((profile) => {
                this.profileForm.email = profile.email;
                this.profileForm.name = profile.name;
            })
        },
    };
</script>

<style scoped>

</style>