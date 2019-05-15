<template>
    <v-list>
        <div
            :key="item.title"
            v-for="item in items">
            <v-list-group
                :disabled="item.disabled"
                :prepend-icon="item.icon"
                @click="routeTo(item.route)"
                no-icon
                v-if="typeof item.items !== 'undefined'"
                v-model="item.active"
            >
                <v-list-tile @click="routeTo('merchant')" slot="activator">
                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile
                    :key="subItem.title"
                    @click="routeTo(subItem.route)"

                    v-for="subItem in item.items"
                    v-model="$route.name === subItem.route"
                >
                    <v-list-tile-action>
                        <v-icon>{{ subItem.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
                    </v-list-tile-content>

                </v-list-tile>
            </v-list-group>
            <v-list-tile
                @click="routeTo(item.route)"
                v-else
                v-model="$route.name === item.route"
            >
                <v-list-tile-action>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>

            </v-list-tile>
        </div>

    </v-list>
</template>

<script>
    export default {
        name: 'MainMenu',
        computed: {
        data() {
            return {
                items: [
                    {
                        icon: 'fa-users',
                        title: 'Gebruikers',
                        route: 'users',
                    }

                ]
            };
        },
        methods: {
            routeTo(name) {
                this.$router.push({name: name});
            }
        }
    };
</script>

<style scoped>
</style>