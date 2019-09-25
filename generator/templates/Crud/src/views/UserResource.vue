<script>
    import UserForm from '../components/forms/User.vue';
    import BaseResource from '../components/BaseResource.vue';

    export default {
        components: {UserForm},
        extends: BaseResource,
        name: 'user-resource',
        data() {
            return {
                meta: {name: 'gebruiker', namePlural: 'gebruikers'},
                resourceUri: 'user',
                tableContent: [
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
                createFormComponent: UserForm,
                updateFormComponent: UserForm
            };
        },
    };
</script>

<style scoped>

</style>
