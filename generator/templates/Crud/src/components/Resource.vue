<template>
  <vuetify-resource
      ref="resourceList"
      v-model="selected"
      v-bind="$attrs"
      :beforeCreateCallback="beforeOpenCreateHandler"
      :beforeUpdateCallback="beforeOpenUpdateHandler"
      :createCallback="handleCreateRequest"
      :deleteCallback="handleDeleteRequest"
      :getDataCallback="handleIndexRequest"
      :getItemCallback="handleShowRequest"
      :meta="meta"
      :tableContent="tableContent"
      :texts="require('../VuetifyResourceTexts.js').default"
      :updateCallback="handleUpdateRequest"
      @row-click="onRowClick"
  >
    <div slot="createContent">
      <component :is="formComponent"
                 ref="createForm"
                 v-model="createForm"
                 :errors="errors"
                 :is-update-form="false"/>
    </div>
    <div slot="updateContent">
      <component :is="formComponent"
                 ref="updateForm"
                 v-model="updateForm"
                 :errors="errors"
                 :is-update-form="true"/>
    </div>
    <template v-slot:crudActionsAfter="slotProps">
      <slot v-bind="slotProps" name="crudActionsAfter"></slot>
    </template>
  </vuetify-resource>
</template>

<script>
import VuetifyResource from '@kingscode/vuetify-resource';

export default {
  name: 'Resource',
  components: { VuetifyResource },
  data() {
    return {
      createForm: { values: {} },
      updateForm: { values: {} },
      errors: {},
      selected: [],
    };
  },
  props: {
    modelType: {
      type: Function,
      required: false,
    },
    tableContent: {
      type: Array,
      required: true,
    },
    formComponent: {
      required: false,
    },
    meta: {
      type: Object,
      required: false,
      default: () => {
        return {
          name: 'item',
          namePlural: 'items',
        };
      },
    },
    indexRequest: {
      type: Function,
      required: true,
    },
    showRequest: {
      type: Function,
    },
    createRequest: {
      type: Function,
    },
    updateRequest: {
      type: Function,
    },
    deleteRequest: {
      type: Function,
    },
    beforeOpenUpdate: {
      type: Function,
      required: false,
    },
    beforeOpenCreate: {
      type: Function,
      required: false,
    },
  },
  methods: {
    onRowClick(item) {
      this.$emit('row-click', item);
    },
    /***
     * @param pagination
     * @param search
     */
    handleIndexRequest(pagination, search) {
      const { sortBy, sortDesc, page, itemsPerPage } = pagination;
      return new Promise((resolve, reject) => {
        const sorting = {};
        if (sortBy[0]) {
          sorting.sortBy = sortBy[0];
          sorting.desc = sortDesc[0] ? 1 : 0;
        }

        const params = {
          page: page,
          perPage: itemsPerPage,
          ...sorting,
        };

        if (search) {
          params.search = search;
        }

        this.indexRequest(page, itemsPerPage, search, sorting.sortBy, sorting.desc)
            .then((response) => {
              const items = response.data.data;
              const total = response.data.meta.total;
              resolve({
                items,
                total,
              });
            })
            .catch((e) => reject(e));

      });
    },
    handleShowRequest(id) {
      return new Promise((resolve) => {
        this.showRequest(id)
            .then((response) => {
              resolve({
                item: response.data.data,
              });
            });

      });
    },
    handleCreateRequest() {
      this.errors = {};
      this.$refs.createForm.validate();

      return new Promise((resolve, reject) => {
        process.nextTick(() => {
          if (this.createForm.valid) {
            this.createRequest(this.createForm.values)
                .then(() => {
                  this.createForm.values = {};
                  resolve();
                })
                .catch((error) => {
                  this.errors = error.response.data.errors;
                  reject(error);
                });
          } else {
            reject(new Error('(create)Form is invalid'));
          }
        });

      });
    },
    handleUpdateRequest() {
      this.errors = {};
      this.$refs.updateForm.validate();

      return new Promise((resolve, reject) => {
        process.nextTick(() => {
          if (this.updateForm.valid) {
            this.updateRequest(this.updateForm.values)
                .then(() => resolve())
                .catch((error) => {
                  this.errors = error.response.data.errors;
                  reject(error);
                });
          } else {
            reject(new Error('(update)Form is invalid'));
          }
        });
      });

    },
    handleDeleteRequest(ids) {
      return new Promise((resolve, reject) => {
        const promises = [];
        ids.forEach((id) => {
          promises.push(this.deleteRequest(id));
        });

        Promise.all(promises)
            .then(() => {
              resolve();
            })
            .catch((e) => reject(e));

      });
    },
    /**
     * The methods below are functions for wrapping function which are set by a prop.
     * This is because a props default cant access the this, so it can't call other functions
     */
    beforeOpenCreateHandler(selected) {
      if (this.beforeOpenCreate) {
        this.beforeOpenCreate(selected);
      }
      if (this.modelType) {
        this.createForm.values = new this.modelType();
      }
    },
    beforeOpenUpdateHandler(selected) {
      if (this.beforeOpenUpdate) {
        this.beforeOpenUpdate(selected);
        return;
      }
      if (!this.modelType) {
        this.updateForm.values = selected[0];
        return;
      }
      this.updateForm.values = new this.modelType().mapResponse(selected[0]);
    },
  },
};
</script>
