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
          <v-icon>$user</v-icon>
        </v-avatar>
      </v-btn>
    </template>
    <v-list>
      <v-list-item @click="logout">
        <v-list-item-title>Uitloggen</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'AppBarMenu',
  methods: {
    ...mapActions({
      logout: 'authorisation/logout',
    }),
  },
};
</script>
