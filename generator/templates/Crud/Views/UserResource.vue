<template>
    <vuetify-resource
        :beforeCreateCallback="beforeOpenCreate"
        :beforeUpdateCallback="beforeOpenUpdate"
        :createCallback="createEvent"
        :deleteCallback="deleteEvent"
        :getDataCallback="getDataFromApi"
        :getItemCallback="getItemFromApi"
        :tableContent="tableContent"
        :texts="require('../VuetifyResourceTexts.js').default"
        :updateCallback="updateEvent"
        ref="resourceList"
        v-model="selected"
        :canDelete="false"
    >
        <div slot="createContent">
            <user-form v-model="createForm" ref="createForm"/>
        </div>
        <div slot="updateContent">
            <user-form v-model="updateForm" ref="updateForm"/>
        </div>
    </vuetify-resource>
</template>

<script>
    import UserForm from './../Components/forms/User.vue';
    import BaseResource from './../Components/BaseResource.vue';

    export default {
        components: {UserForm},
        extends: BaseResource,
        name: 'MerchantResource',
        data() {
            return {
                selected: null,
                resourceUri: 'admin/user',
                tableContent: [
                    {
                        text: 'Naam',
                        align: 'left',
                        sortable: true,
                        value: 'name',
                    },
                ],
            };
        },
    };
</script>

<style scoped>

</style>