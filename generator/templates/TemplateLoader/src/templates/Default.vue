<template>
    <div id="app">
        <v-app class="primary" id="inspire">
            <v-content>
                <v-container>
                    <v-content>
                        <router-view/>
                    </v-content>
                </v-container>
            </v-content>
        </v-app>
    </div>
</template>

<script>

    export default {
        components: {},
        watch: {},
        props: [],
        name: 'template-default',
        data() {
            return {};
        },
        created() {

        },
        methods: {},
    };
</script>

<style scoped lang="scss">

</style>