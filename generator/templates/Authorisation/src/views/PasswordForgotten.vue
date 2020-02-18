<template>
    <v-row justify-md="center" align="stretch">
        <v-col md="3">
            <PasswordForgottenCard/>
        </v-col>
    </v-row>
</template>

<script>

    import PasswordForgottenCard from '../components/Authorisation/PasswordForgottenCard.vue';
    export default {
        name: 'PasswordForgotten',
        components: {PasswordForgottenCard},
    };
</script>
