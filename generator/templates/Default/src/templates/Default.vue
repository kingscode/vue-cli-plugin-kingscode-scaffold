<template>
  <div v-if="isLoggedIn">
    <v-navigation-drawer
        v-model="isMenuOpen"
        app
        fixed
    >
      <router-link :to="{name: 'home'}">
        <img :src="require('../assets/logo.png')" class="logo">
      </router-link>
      <v-divider class="mt-10"/>
      <TheMainMenu/>
    </v-navigation-drawer>
    <v-app-bar app color="primary" dark mfixed>
      <v-app-bar-nav-icon @click.stop="isMenuOpen = !isMenuOpen"></v-app-bar-nav-icon>
      <v-toolbar-title>Beheer</v-toolbar-title>
      <VSpacer/>
      <AppBarMenu/>
    </v-app-bar>
    <v-main>
      <v-row class="ma-3 mb-0">
        <Breadcrumbs class="breadcrumbs"/>
      </v-row>
      <router-view/>
    </v-main>
    <v-footer app color="primary" inset>
      <span class="white--text">Created by Kings Code</span>
    </v-footer>
  </div>
</template>

<script>
import AppBarMenu from '@/components/AppBarMenu.vue';
import TheMainMenu from '@/components/menu/TheMainMenu.vue';
import { mapGetters } from 'vuex';
import Breadcrumbs from '@/components/Breadcrumbs.vue';

export default {
  name: 'Default',
  components: {
    Breadcrumbs,
    AppBarMenu,
    TheMainMenu,
  },
  data() {
    return {
      isMenuOpen: true,
    };
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'authorisation/isLoggedIn',
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

<style lang="scss" scoped>

.logo {
  cursor:  pointer;
  display: block;
  margin:  30px auto;
  width:   50%;
}
</style>

<style lang="scss">
.v-dialog--fullscreen > .v-card.v-sheet.theme--light {
  background: rgb(248, 249, 250);
}
</style>
