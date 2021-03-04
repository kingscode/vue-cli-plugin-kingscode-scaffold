<template>
  <v-list nav>
    <template v-for="item in items">
      <v-list-group
          v-if="!!item.items && item.items.length"
          v-model="item.active"
          :disabled="item.disabled"
          :prepend-icon="item.icon"
          :key="item.title"
      >

        <template v-slot:activator>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
            v-for="subItem in item.items"
            :key="subItem.title"
            :to="subItem.route"
            :value="$route.name === subItem.route"
            exact>
          <v-list-item-action>
            <v-icon>{{ subItem.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ subItem.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list-group>

      <v-list-item
          v-else
          :to="item.route"
          :value="$route.name === item.route"
          color="primary"
          :key="item.title"
          exact>
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

    </template>
  </v-list>
</template>

<script>
export default {
  name: 'Menu',
  computed: {
    items: () => [],
  },
};
</script>

<style scoped>
</style>
