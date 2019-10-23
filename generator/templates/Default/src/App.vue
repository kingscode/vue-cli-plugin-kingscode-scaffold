<template>
    <div id="app">
        <v-app id="inspire" v-if="$store.getters['Authorization/isLoggedIn']">
            <v-navigation-drawer
                app
                fixed
                v-model="menu"
            >
                <img :src="require('../assets/logo.png')" @click="$router.push({name: 'home'})" class="logo">
                <v-divider class="mt-10"/>
                <main-menu/>
            </v-navigation-drawer>
            <v-toolbar app color="primary" dark mfixed>
                <v-toolbar-side-icon @click.stop="menu = !menu"></v-toolbar-side-icon>
                <v-toolbar-title>Beheer</v-toolbar-title>
                <v-spacer/>
                <profile-menu></profile-menu>
            </v-toolbar>
            <v-content>
                <router-view/>
            </v-content>
            <v-footer app color="primary" inset>
                <span class="white--text pl-6">Created by Kings Code</span>
            </v-footer>
        </v-app>
    </div>
</template>

<script>
    import ProfileMenu from './components/ProfileMenu.vue';
    import MainMenu from './components/MainMenu.vue';

    export default {
        name: 'template-default',
        components: {ProfileMenu, MainMenu},
        data() {
            return {
                menu: true,
            };
        },
        beforeCreate() {
            if (!this.$store.getters['Authorization/isLoggedIn']) {
                this.$router.push({name: 'login'});
            }
        },
    };
</script>

<style scoped lang="scss">

    .logo {
        display: block;
        margin: 30px auto;
        width: 50%;
        cursor: pointer;
    }
</style>
<style lang="scss">
    .v-dialog--fullscreen > .v-card.v-sheet.theme--light {
        background: rgb(248, 249, 250);
    }
</style>
