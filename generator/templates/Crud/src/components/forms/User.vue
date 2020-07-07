<template>
    <v-container>
        <v-form ref="form" v-model="valid" class="mt-5">
            <v-col cols="12" sm="10" offset-sm="1" md="8" offset-md="2" lg="6" offset-lg="3">
                <v-subheader class="pa-0">Gebruiker</v-subheader>
                <v-card class="themed-color">
                    <v-card-text>
                        <VTextField
                            :counter="100"
                            :rules="[(v) => !!v || 'Naam is verplicht', () => serverError('name'), (v) => !!v && v.length <= 100 || 'de naam mag maximaal 100 tekens bevatten']"
                            label="Naam"
                            v-model="values.name"/>
                        <VTextField
                            :counter="150"
                            :rules="[(v) => !!v || 'E-mail is verplicht', () => serverError('email'), (v) => !!v && v.length <= 100 || 'het e-mailadres mag maximaal 150 tekens bevatten']"
                            label="E-mail"
                            hint="Het e-mailadres waarmee de gebruiker gaat inloggen en waarnaar een mail verzonden wordt met instructies om een wachtwoord aan te maken"
                            v-model="values.email"/>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-form>
    </v-container>
</template>

<script>
    import Form from '@/components/VuetifyResourceBaseForm.vue';

    export default {
        name: 'user-form',
        extends: Form,
    };
</script>
