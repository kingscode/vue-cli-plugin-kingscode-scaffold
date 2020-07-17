<template>
    <v-container fluid>
        <Resource
            :form-component="() => import('../components/forms/UserForm.vue')"
            :meta="{name: 'gebruiker', namePlural: 'gebruikers'}"
            :table-content="tableContent"
            :update-handler="updateHandler"
            :delete-handler="deleteHandler"
            :create-handler="createHandler"
            resource-uri="user"
        />
    </v-container>
</template>

<script lang="js">
import Resource from '@/components/Resource.vue';

import {create, destroy, update} from '../api/endpoints/user.js';

export default {
    name: 'UserResource',
    components: {
        Resource,
    },
    computed: {
        updateHandler: () => update,
        deleteHandler: () => destroy,
        createHandler: () => create,
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
