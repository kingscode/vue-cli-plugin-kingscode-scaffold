<template>
    <div v-if="$store.getters['Authorisation/isLoggedIn']">
        <v-navigation-drawer
            app
            fixed
            v-model="menu"
        >
            <router-link :to="{name: 'home'}">
                <img :src="require('../assets/logo.png')" class="logo">
            </router-link>
            <v-divider class="mt-10"/>
            <main-menu/>
        </v-navigation-drawer>
        <v-app-bar app color="primary" dark mfixed>
            <v-app-bar-nav-icon @click.stop="menu = !menu"></v-app-bar-nav-icon>
            <v-toolbar-title>Beheer</v-toolbar-title>
            <v-spacer/>
            <profile-menu></profile-menu>
        </v-app-bar>
        <v-main>
            <router-view/>
        </v-main>
        <v-footer app color="primary" inset>
            <span class="white--text">Created by Kings Code</span>
        </v-footer>
    </div>
</template>

<script>
import ProfileMenu from './../components/ProfileMenu.vue';
import MainMenu from './../components/MainMenu.vue';

export default {
    name: 'template-default',
    components: {ProfileMenu, MainMenu},
    data() {
        return {
            menu: true,
        };
    },
    beforeCreate() {
        if (!this.$store.getters['Authorisation/isLoggedIn']) {
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
