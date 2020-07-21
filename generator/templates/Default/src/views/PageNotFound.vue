<template>
    <div class="text-center">
        <h1>Pagina niet gevonden</h1>
        <div class="my-12 title">De pagina die u probeert te bereiken is niet gevonden</div>
        <v-btn color="primary" :to="{name: 'home'}">Terug naar de startpagina</v-btn>
    </div>
</template>

<script lang="js">
export default {
    name: 'PageNotFound',
};
</script>
