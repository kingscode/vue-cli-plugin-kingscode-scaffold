<template>
    <v-container fluid>
        <vuetify-resource
            :beforeCreateCallback="beforeOpenCreateHandler"
            :beforeUpdateCallback="beforeOpenUpdateHandler"
            :createCallback="createEvent"
            :deleteCallback="deleteEvent"
            :getDataCallback="getDataFromApi"
            :getItemCallback="getItemFromApi"
            :meta="meta"
            :tableContent="tableContent"
            :texts="require('../VuetifyResourceTexts.js').default"
            :updateCallback="updateEvent"
            can-delete-resource-key="can_be_deleted"
            ref="resourceList"
            v-model="selected"
            can-search
        >
            <div slot="createContent">
                <component :errors="errors"
                           :is="createFormComponent"
                           :is-update-form="false"
                           ref="createForm"
                           v-model="createForm"/>
            </div>
            <div slot="updateContent">
                <component :errors="errors"
                           :is="updateFormComponent"
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
import cloneDeep from 'lodash.clonedeep';
import FormDataValues from './../mixins/formDataValues';

export default {
    components: {},
    name: 'Resource',
    mixins: [FormDataValues],
    data() {
        return {
            createForm: {values: {}},
            updateForm: {values: {}},
            errors: {},
            selected: [],
        };
    },
    props: {
        tableContent: {
            type: Array,
            required: true,
        },
        createFormComponent: {
            required: true,
        },
        updateFormComponent: {
            required: true,
        },
        meta: {
            type: Object,
            required: false,
            default: () => {
                return {name: 'item', namePlural: 'items'};
            },
        },
        resourceUri: {
            type: String,
            required: true,
        },
        showResourceUri: {
            type: String,
            required: false,
        },
        updateResourceUri: {
            type: String,
            required: false,
        },
        deleteResourceUri: {
            type: String,
            required: false,
        },
        createResourceUri: {
            type: String,
            required: false,
        },
        mapCreateFormValues: {
            type: Function,
            required: false,
        },
        mapUpdateFormValues: {
            type: Function,
            required: false,
        },
        mapCreateAndUpdateFormValues: {
            type: Function,
            required: false,
            default: (values) => {
                return values;
            },
        },
        mapDataResponse: {
            type: Function,
            required: false,
            default: (data) => {
                return data;
            },
        },
        beforeOpenUpdate: {
            type: Function,
            required: false,
        },
        beforeOpenCreate: {
            type: Function,
            required: false,
        },
        afterUpdate: {
            type: Function,
            required: false,
        },
    },
    methods: {
        /***
         * @param pagination
         * @param search
         */
        getDataFromApi(pagination, search) {
            const {sortBy, sortDesc, page, itemsPerPage} = pagination;
            return new Promise((resolve, reject) => {
                this.$http.get(this.resourceUri, {
                        params: {
                            q: search,
                            sortBy: sortBy[0],
                            desc: sortDesc[0] ? 1 : 0,
                            page: page,
                            perPage: itemsPerPage,
                        },
                    })
                    .then((response) => {
                        let items = this.mapDataResponse(response.data.data);
                        let total = response.data.meta.total;
                        resolve({
                            items,
                            total,
                        });
                    }).catch(() => reject());

            });
        },
        getItemFromApi(id) {
            return new Promise((resolve) => {
                this.$http.get((this.showResourceUri || this.resourceUri) + '/' + id)
                    .then((response) => {
                        let item = response.data.data;
                        resolve({
                            item,
                        });
                    });

            });
        },
        getCreateFormValues() {
            let form_data = new FormData();
            this.appendFormData(form_data, this.mapCreateFormValuesHandler(cloneDeep(this.createForm.values)));

            return form_data;

        },
        createEvent() {
            this.errors = {};
            this.$refs.createForm.validate();
            return new Promise((resolve, reject) => {
                process.nextTick(() => {
                    if (this.createForm.valid) {
                        this.$http.post((this.createResourceUri || this.resourceUri), this.getCreateFormValues(),
                            {
                                headers: {
                                    'Content-Type': 'multipart/form-data',
                                },
                            })
                            .then((response) => {
                                this.createForm.values = {};
                                if (typeof this.afterCreate === 'function') {
                                    this.afterCreate(response.data.data).then(() => {
                                        resolve();
                                    });
                                } else {
                                    resolve();
                                }
                            }).catch((error) => {
                            this.errors = error.response.data.errors;
                            reject();
                        });

                    } else {
                        reject();
                    }
                });

            });
        },
        getUpdateFormValues() {
            let form_data = new FormData();
            this.appendFormData(form_data, this.mapUpdateFormValuesHandler(cloneDeep(this.updateForm.values)));

            return form_data;
        },
        updateEvent(selected) {
            this.errors = {};
            this.$refs.updateForm.validate();
            return new Promise((resolve, reject) => {
                process.nextTick(() => {
                    if (this.updateForm.valid) {
                        this.$http.put((this.updateResourceUri || this.resourceUri) + '/' + selected[0].id, this.getUpdateFormValues(),
                            {
                                headers: {
                                    'Content-Type': 'multipart/form-data',
                                },
                            })
                            .then((response) => {
                                if (typeof this.afterUpdate === 'function') {
                                    this.afterUpdate(response.data.data).then(() => {
                                        resolve();
                                    });
                                } else {
                                    resolve();
                                }
                            }).catch((error) => {
                            this.errors = error.response.data.errors;
                            reject();
                        });

                    } else {
                        reject();
                    }
                });

            });

        },
        deleteEvent(ids) {
            return new Promise((resolve) => {
                let promises = [];
                ids.forEach((id) => {
                    promises.push(this.$http.delete((this.deleteResourceUri || this.resourceUri) + '/' + id));
                });
                Promise.all(promises).then(() => {
                    resolve();
                });

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
            this.updateForm.values = selected[0];
        },
        mapCreateFormValuesHandler(values) {
            return this.mapCreateFormValues ? this.mapCreateFormValues() : this.mapCreateAndUpdateFormValues(values);
        },
        mapUpdateFormValuesHandler(values) {
            return this.mapUpdateFormValues ? this.mapUpdateFormValues() : this.mapCreateAndUpdateFormValues(values);
        },
    },
};
</script>
