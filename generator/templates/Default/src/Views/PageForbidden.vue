<template>
    <div class="text-center">
        <h1>
            Onjuiste autorisatie
        </h1>
        <div class="my-12 title">Je hebt niet voldoende rechten om deze actie uit te mogen voeren</div>
        <v-btn color="primary" @click="home">Terug naar de homepage</v-btn>
    </div>
</template>

<script>

    export default {
        name: 'page-forbidden',
        data() {
            return {};
        },
        methods: {
            home() {
                this.$router.push({name: 'home'});
            },
        },
    };
</script>

<style scoped lang="scss">

</style>
