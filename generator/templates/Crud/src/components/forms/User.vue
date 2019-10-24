<template>
    <v-container>
        <v-form ref="form" v-model="valid" class="mt-5">
            <v-col cols="12" sm="10" offset-sm="1" md="8" offset-md="2" lg="6" offset-lg="3">
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
            </v-col>
        </v-form>
    </v-container>
</template>

<script>
    import Form from './../BaseForm';

    export default {
        name: 'user-form',
        extends: Form,
    };
</script>
