<template>
    <v-container>
        <v-layout align-center justify-center mt-5>
            <v-flex lg6 md8 sm10 xl4 xs12>
                <v-form ref="form" v-model="valid">
                    <v-subheader class="pa-0">Gebruiker</v-subheader>
                    <v-card class="themed-color">
                        <v-card-text>
                            <v-text-field
                                :counter="100"
                                :rules="[(v) => !!v || 'Naam is verplicht', v => serverError('name', v), (v) => !!v && v.length <= 100 || 'de naam mag maximaal 100 tekens bevatten']"
                                label="Naam"
                                class="required"
                                v-model="values.name"></v-text-field>
                            <v-text-field
                                :counter="150"
                                :rules="[(v) => !!v || 'E-mail is verplicht', v => serverError('email', v), (v) => !!v && v.length <= 100 || 'het e-mailadres mag maximaal 150 tekens bevatten']"
                                label="E-mail"
                                hint="Het e-mailadres waarmee de gebruiker gaat inloggen en waarnaar een mail verzonden wordt met instructies om een wachtwoord aan te maken"
                                class="required"
                                v-model="values.email"></v-text-field>
                        </v-card-text>
                    </v-card>
                </v-form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import Form from './../BaseForm';

    export default {
        name: 'user-form',
        extends: Form,
    };
</script>
