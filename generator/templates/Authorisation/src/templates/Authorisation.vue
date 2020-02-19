<template>
    <div id="app">
        <v-app class="primary" id="inspire">
            <v-content>
                <v-container fill-height fluid justify-center class="primary">
                    <router-view/>
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
