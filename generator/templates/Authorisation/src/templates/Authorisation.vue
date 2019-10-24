<template>
    <div id="app">
        <v-app class="primary" id="inspire">
            <v-content>
                <v-container fill-height fluid justify-center class="primary">
                    <v-flex lg4 md6 xl3 xs12>
                        <router-view/>
                    </v-flex>
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
        name: 'template-authorisation',
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
