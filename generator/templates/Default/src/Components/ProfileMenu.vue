<template>
    <v-menu
        bottom
        left
        offset-y
        transition="slide-y-transition"
    >
        <v-btn class="mr-3" fab icon slot="activator">
            <v-avatar class="accent" size="48" title>
                <v-icon>fa-user</v-icon>
            </v-avatar>
        </v-btn>
        <v-list>
            <v-list-tile @click="routeTo('profile')">
                <v-list-tile-title>Profiel</v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="logout">
                <v-list-tile-title>Uitloggen</v-list-tile-title>
            </v-list-tile>
        </v-list>
    </v-menu>
</template>

<script>

    export default {
        components: {},
        watch: {},
        props: [],
        name: 'profile-menu',
        data() {
            return {};
        },
        created() {

        },
        methods: {
            routeTo(name) {
                this.$router.push({name: name});
            },
            logout() {
                this.$store.dispatch('Authorization/unauthorized');
            }
        },
    };
</script>

<style scoped lang="scss">

</style>