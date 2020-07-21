<template>
    <v-row justify-md="center" align="stretch">
        <v-col md="3">
            <LoginCard/>
        </v-col>
        <v-col md="3">
            <RegisterCard/>
        </v-col>
    </v-row>
</template>

<script lang="js">
import RegisterCard from '../components/Authorisation/RegisterCard.vue';
import LoginCard from '../components/Authorisation/LoginCard.vue';

export default {
    name: 'Login',
    components: {
        RegisterCard,
        LoginCard,
    },
};
</script>
