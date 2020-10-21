<template>
  <v-container fluid>
    <Resource
        :create-request="createHandler"
        :delete-request="deleteHandler"
        :form-component="() => import('../components/forms/UserForm.vue')"
        :index-request="indexHandler"
        :meta="{name: $tc('user.title', 1), namePlural: $tc('user.title', 2)}"
        :model-type="modelType"
        :show-request="showHandler"
        :table-content="tableContent"
        :update-request="updateHandler"
    />
  </v-container>
</template>

<script lang="js">
import Resource from '@/components/Resource.vue';
import { create, index, remove, show, update } from '../api/endpoints/user.js';
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
    deleteHandler: () => remove,
    createHandler: () => create,
    modelType: () => User,
    tableContent() {
      return [
        {
          text: this.$t('user.fields.name'),
          align: 'left',
          sortable: true,
          value: 'name',
        },
        {
          text: this.$t('user.fields.email'),
          align: 'left',
          sortable: true,
          value: 'email',
        },
      ];
    },
  },
};
</script>
