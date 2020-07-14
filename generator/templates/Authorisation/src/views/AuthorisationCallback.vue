<template>
    <v-overlay>
        <VProgressCircular indeterminate size="64"/>
    </v-overlay>
</template>

<script lang="js">
import {mapMutations} from 'vuex';
import {getFragment} from '../application/util/url.js';

export default {
    name: 'AuthorisationCallback',
    methods: {
        ...mapMutations({
            setAuthorisationToken: 'authorisation/setAuthorisationToken',
        }),
    },
    created() {
        const redirectUri = this.$route.query.redirect_uri;

        const token = getFragment('token');

        if (!token) return; // what to do?

        this.setAuthorisationToken(token);

        this.$router.push({name: redirectUri});
    },
};
</script>
