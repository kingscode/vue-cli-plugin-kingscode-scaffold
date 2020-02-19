<template>
    <v-row justify-md="center" align="stretch">
        <v-col md="3">
            <PasswordResetCard :token="$route.params.token"/>
        </v-col>
    </v-row>
</template>

<script>

    import PasswordResetCard from '../components/Authorisation/PasswordResetCard.vue';
    export default {
        name: 'PasswordReseet',
        components: {PasswordResetCard},
    };
</script>
