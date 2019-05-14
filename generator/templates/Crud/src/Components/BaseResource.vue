<template>
    <vuetify-resource
        :beforeCreateCallback="beforeOpenCreate"
        :beforeUpdateCallback="beforeOpenUpdate"
        :canDelete="false"
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
    >
        <div slot="createContent">
            <component :errors="errors" :is="createFormComponent" ref="createForm" v-model="createForm"/>
        </div>
        <div slot="updateContent">
            <component :errors="errors" :is="updateFormComponent" ref="updateForm" v-model="updateForm"/>
        </div>
    </vuetify-resource>
</template>
<script>
    export default {
        components: {},
        name: 'base-resource',
        data() {
            return {
                resourceUri: '',
                showResourceUri: null,
                updateResourceUri: null,
                deleteResourceUri: null,
                createResourceUri: null,
                createForm: {values: {}},
                updateForm: {values: {}},
                errors: {},
            };
        },
        methods: {
            /***
             * @param pagination
             * @param search
             */
            getDataFromApi(pagination, search) {
                const {sortBy, descending, page, rowsPerPage} = pagination;
                return new Promise((resolve, reject) => {

                    $http.get(this.resourceUri, {
                            params: {
                                q: search,
                                sortBy: sortBy,
                                desc: descending ? 1 : 0,
                                page: page,
                                perPage: rowsPerPage,
                            },
                        })
                        .then((response) => {
                            let items = response.data.data;
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
                    $http.get((this.showResourceUri || this.resourceUri) + '/' + id)
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
                for (let key in this.createForm.values) {
                    form_data.append(key, this.createForm.values[key]);
                }
                return form_data;

            },
            createEvent() {
                this.errors = {};
                this.$refs.createForm.validate();
                return new Promise((resolve, reject) => {
                    process.nextTick(() => {
                        if (this.createForm.valid) {
                            $http.post((this.createResourceUri || this.resourceUri), this.getCreateFormValues(),
                                {
                                    headers: {
                                        'Content-Type': 'multipart/form-data',
                                    },
                                })
                                .then(() => {
                                    this.afterCreated();
                                    resolve();
                                }).catch((error) => {
                                console.log(error);
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
                for (let key in this.updateForm.values) {
                    form_data.append(key, this.updateForm.values[key]);
                }
                return form_data;
            },
            updateEvent(selected) {
                this.errors = {};
                this.$refs.updateForm.validate();
                return new Promise((resolve, reject) => {
                    process.nextTick(() => {
                        if (this.updateForm.valid) {
                            $http.put((this.updateResourceUri || this.resourceUri) + '/' + selected[0].id, this.getUpdateFormValues(),
                                {
                                    headers: {
                                        'Content-Type': 'multipart/form-data',
                                    },
                                })
                                .then(() => {
                                    this.afterUpdated();
                                    resolve();
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
            beforeOpenUpdate(selected) {
                this.updateForm.values = selected[0];
            },
            beforeOpenCreate() {
                this.$refs.createForm.clear();
            },
            deleteEvent(ids) {
                return new Promise((resolve) => {
                    $http.delete(this.resourceUri + '/delete-many', {
                            data: {ids: ids},
                        })
                        .then(() => {
                            resolve();
                        });
                });
            },
            afterUpdated() {

            },
        },
    };
</script>
