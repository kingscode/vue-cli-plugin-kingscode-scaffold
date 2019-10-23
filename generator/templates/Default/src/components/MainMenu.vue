<template>
    <v-list>
        <div
            :key="index"
            v-for="(item, index) in items">
            <v-list-group
                :disabled="item.disabled"
                :prepend-icon="item.icon"
                no-icon
                v-if="typeof item.items !== 'undefined'"
                v-model="item.active"
            >
                <v-list-item slot="activator">
                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item
                    :key="subItem.title"
                    @click="routeTo(subItem.route)"

                    v-for="subItem in item.items"
                    :value="$route.name === subItem.route"
                >
                    <v-list-item-action>
                        <v-icon>{{ subItem.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>{{ subItem.title }}</v-list-item-title>
                    </v-list-item-content>

                </v-list-item>
            </v-list-group>
            <v-list-item
                @click="routeTo(item.route)"
                v-else
                :value="$route.name === item.route"
            >
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
        name: 'MainMenu',
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
            },
        },
    };
</script>

<style scoped>
</style>
