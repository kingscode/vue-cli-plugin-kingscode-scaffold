<template>
    <v-overlay :value="true">
        <VProgressCircular indeterminate size="64"/>
    </v-overlay>
</template>
<script>
import {mapMutations} from 'vuex';

export default {
    name: 'AuthorisationCallback',
    methods: {
        ...mapMutations({
            setAuthorisationToken: 'Authorisation/setAuthorisationToken',
        }),
    },
    created() {
        const redirectUri = this.$route.query.redirect_uri;

        const regex = new RegExp('[\\#&]token=([^&#]*)');
        const token = decodeURIComponent(regex.exec(this.$route.hash)[1]);

        this.setAuthorisationToken(token);

        this.$router.push({name: redirectUri});
    },
};
</script>
