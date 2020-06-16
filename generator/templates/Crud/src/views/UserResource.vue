<template>
    <v-container fluid>
        <Resource
            :create-form-component="() => import('../components/forms/User.vue')"
            :meta="{name: 'gebruiker', namePlural: 'gebruikers'}"
            :table-content="tableContent"
            :update-form-component="() => import('../components/forms/User.vue')"
            resource-uri="user"
            can-search
        />
    </v-container>
</template>
<script>
    import Resource from '@/components/Resource.vue';

    export default {
        components: {Resource},
        name: 'user-resource',
        data() {
            return {
                tableContent: [
                    {
                        text: 'Naam',
                        align: 'left',
                        sortable: true,
                        value: 'name',
                    },
                    {
                        text: 'E-mail',
                        align: 'left',
                        sortable: true,
                        value: 'email',
                    },
                ],
            };
        },
    };
</script>

<style scoped>

</style>
