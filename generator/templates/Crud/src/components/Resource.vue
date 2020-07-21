<template>
    <v-container fluid>
        <vuetify-resource
            :beforeCreateCallback="beforeOpenCreateHandler"
            :beforeUpdateCallback="beforeOpenUpdateHandler"
            :deleteCallback="handleDeleteRequest"
            :createCallback="handleCreateRequest"
            :getDataCallback="handleIndexRequest"
            :getItemCallback="handleShowRequest"
            :updateCallback="handleUpdateRequest"
            @row-click="onRowClick"
            :meta="meta"
            :tableContent="tableContent"
            :texts="require('../VuetifyResourceTexts.js').default"
            ref="resourceList"
            v-model="selected"
            v-bind="$attrs"
        >
            <div slot="createContent">
                <component :errors="errors"
                           :is="formComponent"
                           :is-update-form="false"
                           ref="createForm"
                           v-model="createForm"/>
            </div>
            <div slot="updateContent">
                <component :errors="errors"
                           :is="formComponent"
                           :is-update-form="true"
                           ref="updateForm"
                           v-model="updateForm"/>
            </div>
            <template v-slot:crudActionsAfter="slotProps">
                <slot name="crudActionsAfter" v-bind="slotProps"></slot>
            </template>
        </vuetify-resource>
    </v-container>
</template>

<script>
import VuetifyResource from '@kingscode/vuetify-resource';

export default {
    name: 'Resource',
    components: {VuetifyResource},
    data() {
        return {
            createForm: {values: {}},
            updateForm: {values: {}},
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
                return {name: 'item', namePlural: 'items'};
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
            const {sortBy, sortDesc, page, itemsPerPage} = pagination;
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
                    }).catch(() => reject());

            });
        },
        handleShowRequest(id) {
            return new Promise((resolve) => {
                this.showRequest(id)
                    .then((response) => {
                        let item;

                        if (this.modelType) {
                            item = new this.modelType();
                            item.mapResponse(response.data.data);
                        } else {
                            item = response.data.data;
                        }

                        resolve({
                            item,
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
                                if (this.modelType) {
                                    this.createForm.values = new this.modelType();
                                } else {
                                    this.createForm.values = {};
                                }

                                resolve();
                            })
                            .catch((error) => {
                                this.errors = error.response.data.errors;
                                reject();
                            });
                    } else {
                        reject();
                    }
                });

            });
        },
        handleUpdateRequest(selected) {
            this.errors = {};
            this.$refs.updateForm.validate();

            return new Promise((resolve, reject) => {
                process.nextTick(() => {
                    if (this.updateForm.valid) {
                        this.updateForm.values.id = selected[0].id;

                        this.updateRequest(this.updateForm.values)
                            .then(() => resolve())
                            .catch((error) => {
                                this.errors = error.response.data.errors;
                                reject();
                            });
                    } else {
                        reject();
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

                Promise.all(promises).then(() => {
                    resolve();
                }).catch(() => reject());

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
        },
        beforeOpenUpdateHandler(selected) {
            if (this.beforeOpenUpdate) {
                this.beforeOpenUpdate(selected);
                return;
            }

            if (this.modelType) {
                this.updateForm.values = new this.modelType();
                this.updateForm.values.mapResponse(selected[0]);
            } else {
                this.updateForm.values = selected[0];
            }
        },
    },
};
</script>
