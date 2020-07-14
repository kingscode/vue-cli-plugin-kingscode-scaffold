<template>
    <v-container fluid>
        <Resource
            :create-form-component="() => import('../components/forms/UserForm.vue')"
            :meta="{name: 'gebruiker', namePlural: 'gebruikers'}"
            :table-content="tableContent"
            :update-form-component="() => import('../components/forms/UserForm.vue')"
            resource-uri="user"
            can-search
        />
    </v-container>
</template>

<script lang="js">
import Resource from '@/components/Resource.vue';

export default {
    components: {Resource},
    name: 'UserResource',
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
