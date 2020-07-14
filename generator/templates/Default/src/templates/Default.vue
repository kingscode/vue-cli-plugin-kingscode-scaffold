<template>
    <div v-if="isLoggedIn">
        <v-navigation-drawer
            app
            fixed
            v-model="isMenuOpen"
        >
            <router-link :to="{name: 'home'}">
                <img :src="require('../assets/logo.png')" class="logo">
            </router-link>
            <v-divider class="mt-10"/>
            <MainMenu/>
        </v-navigation-drawer>
        <v-app-bar app color="primary" dark mfixed>
            <v-app-bar-nav-icon @click.stop="isMenuOpen = !isMenuOpen"></v-app-bar-nav-icon>
            <v-toolbar-title>Beheer</v-toolbar-title>
            <VSpacer/>
            <AppBarMenu/>
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
import AppBarMenu from '../components/AppBarMenu.vue';
import MainMenu from './../components/menu/MainMenu.vue';
import {mapGetters} from 'vuex';

export default {
    name: 'Default',
    components: {
        AppBarMenu,
        MainMenu,
    },
    data() {
        return {
            isMenuOpen: true,
        };
    },
    computed: {
        ...mapGetters({
            isLoggedIn: 'Authorisation/isLoggedIn',
        }),
    },
    created() {
        if (!this.isLoggedIn) {
            this.$router.push({
                name: 'login',
            });
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
