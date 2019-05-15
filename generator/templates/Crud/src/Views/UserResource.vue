<script>
    import UserForm from './../components/forms/User.vue';
    import BaseResource from './../components/BaseResource.vue';

    export default {
        components: {UserForm},
        extends: BaseResource,
        name: 'user-resource',
        data() {
            return {
                selected: null,
                resourceUri: 'user',
                tableContent: [
                    {
                        text: 'Naam',
                        align: 'left',
                        sortable: true,
                        value: 'name',
                    },
                ],
                createFormComponent: UserForm,
                updateFormComponent: UserForm
            };
        },
    };
</script>

<style scoped>

</style>