<template>
    <v-list>
        <div :key="item.title" v-for="item in items">
            <v-list-item-group
                :disabled="item.disabled"
                :prepend-icon="item.icon"
                v-if="!!item.items && item.items.length"
                v-model="item.active">
                <template slot="activator">
                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </template>
                <v-list-item
                    v-for="subItem in item.items"
                    :key="subItem.title"
                    :to="subItem.route"
                    :value="$route.name === subItem.route">
                    <v-list-item-action>
                        <v-icon>{{ subItem.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>{{ subItem.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
            <v-list-item
                :to="item.route"
                v-else
                :value="$route.name === item.route">
                <v-list-item-action>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </div>
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
