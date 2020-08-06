<template>
  <v-container fluid>
    <Resource
        :create-request="createHandler"
        :delete-request="deleteHandler"
        :form-component="() => import('../components/forms/UserForm.vue')"
        :index-request="indexHandler"
        :meta="{name: 'gebruiker', namePlural: 'gebruikers'}"
        :model-type="modelType"
        :show-request="showHandler"
        :table-content="tableContent"
        :update-request="updateHandler"
    />
  </v-container>
</template>

<script lang="js">
import Resource from '@/components/Resource.vue';
import { create, destroy, index, show, update } from '../api/endpoints/user.js';
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
