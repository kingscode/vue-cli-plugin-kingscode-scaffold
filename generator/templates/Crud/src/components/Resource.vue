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
            ref="resourceList"
            v-model="selected"
            v-bind="$attrs"
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
import axios from '../api/implementation/app';

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
            required: false,
        },
        updateFormComponent: {
            required: false,
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
                let sorting = {};
                if (sortBy[0]) {
                    sorting = {
                        sortBy: sortBy[0],
                        desc: sortDesc[0] ? 1 : 0,
                    };
                }
                axios.get(this.resourceUri, {
                        q: search,
                        page: page,
                        perPage: itemsPerPage,
                        ...sorting,
                    })
                    .then(res => {
                        const items = this.mapDataResponse(res.data.data);
                        const total = res.data.meta.total;
                        resolve({
                            items,
                            total,
                        });
                    }).catch(() => reject());

            });
        },
        getItemFromApi(id) {
            return new Promise((resolve) => {
                axios.get((this.showResourceUri || this.resourceUri) + '/' + id)
                    .then((response) => {
                        const item = response.data.data;
                        resolve({
                            item,
                        });
                    });

            });
        },
        getCreateFormValues() {
            const formData = new FormData();
            this.appendFormData(formData, this.mapCreateFormValuesHandler(cloneDeep(this.createForm.values)));

            return formData;

        },
        createEvent() {
            this.errors = {};
            this.$refs.createForm.validate();
            return new Promise((resolve, reject) => {
                process.nextTick(() => {
                    if (this.createForm.valid) {
                        axios.post((this.createResourceUri || this.resourceUri), this.getCreateFormValues())
                            .then(res => {
                                this.createForm.values = {};
                                if (typeof this.afterCreate === 'function') {
                                    this.afterCreate(res.data.data).then(() => {
                                        resolve();
                                    });
                                } else {
                                    resolve();
                                }
                            }).catch((error) => {
                            this.errors = error.data.errors;
                            reject();
                        });

                    } else {
                        reject();
                    }
                });

            });
        },
        getUpdateFormValues() {
            const formData = new FormData();
            this.appendFormData(formData, this.mapUpdateFormValuesHandler(cloneDeep(this.updateForm.values)));

            return formData;
        },
        updateEvent(selected) {
            this.errors = {};
            this.$refs.updateForm.validate();
            return new Promise((resolve, reject) => {
                process.nextTick(() => {
                    if (this.updateForm.valid) {
                        axios.put((this.updateResourceUri || this.resourceUri) + '/' + selected[0].id, this.getUpdateFormValues())
                            .then(res => {
                                if (typeof this.afterUpdate === 'function') {
                                    this.afterUpdate(res.data.data).then(() => {
                                        resolve();
                                    });
                                } else {
                                    resolve();
                                }
                            }).catch((error) => {
                            this.errors = error.data.errors;
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
                const promises = [];
                ids.forEach(id => promises.push(axios.delete(`${this.deleteResourceUri || this.resourceUri}/${id}`)));
                Promise.all(promises).then(() => resolve());
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
