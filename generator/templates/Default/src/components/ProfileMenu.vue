<template>
    <v-menu
        bottom
        left
        offset-y
        transition="slide-y-transition"
    >
        <template v-slot:activator="{ on }">
            <v-btn class="mr-6" fab icon v-on="on">
                <v-avatar class="accent" size="48" title>
                    <v-icon>fa-user</v-icon>
                </v-avatar>
            </v-btn>
        </template>
        <v-list>
            <v-list-item :to="{name:'profile'}">
                <v-list-item-title>Profiel</v-list-item-title>
            </v-list-item>
            <v-list-item @click="logout">
                <v-list-item-title>Uitloggen</v-list-item-title>
            </v-list-item>
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
            logout() {
                this.$store.dispatch('Authorization/unauthorized');
            }
        },
    };
</script>

<style scoped lang="scss">

</style>
