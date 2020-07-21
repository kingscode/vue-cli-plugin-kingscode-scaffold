<template>
    <div class="text-center">
        <h1>Onjuiste autorisatie</h1>
        <div class="my-12 title">Je hebt niet voldoende rechten om deze actie uit te mogen voeren</div>
        <v-btn color="primary" :to="{name: 'home'}">Terug naar de homepage</v-btn>
    </div>
</template>

<script lang="js">
export default {
    name: 'PageForbidden',
};
</script>
