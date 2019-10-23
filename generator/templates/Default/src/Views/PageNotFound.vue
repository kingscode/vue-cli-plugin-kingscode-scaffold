<template>
    <div class="text-center">
        <h1>
            Pagina niet gevonden
        </h1>
        <div class="my-12 title">De pagina die u probeert te bereiken is niet gevonden</div>
        <v-btn color="primary" @click="home">Terug naar de startpagina</v-btn>
    </div>
</template>

<script>

    export default {
        name: 'page-not-found',
        data() {
            return {};
        },
        methods: {
            home() {
                this.$router.push({name: 'home'});
            }
        },
    };
</script>

<style scoped lang="scss">

</style>
