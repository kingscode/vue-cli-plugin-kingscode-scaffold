<template>
    <v-container fluid>
        <Resource
            :form-component="() => import('../components/forms/UserForm.vue')"
            :meta="{name: 'gebruiker', namePlural: 'gebruikers'}"
            :table-content="tableContent"
            :index-request="indexHandler"
            :show-request="showHandler"
            :update-request="updateHandler"
            :delete-request="deleteHandler"
            :create-request="createHandler"
            :model-type="modelType"
        />
    </v-container>
</template>

<script lang="js">
import Resource from '@/components/Resource.vue';
import {create, destroy, index, show, update} from '../api/endpoints/user.js';
import User from '../application/models/user.js';

export default {
    name: 'UserResource',
    components: {
        Resource,
    },
    computed: {
        indexHandler: () => index,
        showHandler: () => show,
        updateHandler: () => update,
        deleteHandler: () => destroy,
        createHandler: () => create,
        modelType: () => User,
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
