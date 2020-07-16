<template>
    <v-container fluid>
        <Resource
            :form-component="() => import('../components/forms/UserForm.vue')"
            :meta="{name: 'gebruiker', namePlural: 'gebruikers'}"
            :table-content="tableContent"
            resource-uri="user"
        />
    </v-container>
</template>

<script lang="js">
import Resource from '@/components/Resource.vue';

export default {
    name: 'UserResource',
    components: {
        Resource,
    },
    computed: {
        tableContent: () => [
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
    },
};
</script>
