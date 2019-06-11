<template>
    <v-autocomplete v-bind="$attrs"
                    :items="items"
                    :search-input.sync="searchInput"
                    :loading="loading"
    >
        <template v-slot:append-item>
            <v-flex v-if="canLoadMoreItems" class="text-xs-center">
                <v-btn color="accent" @click="getItemsFromApi(page + 1)">Meer laden</v-btn>
            </v-flex>
        </template>
    </v-autocomplete>
</template>
<script>
    export default {
        name: 'PaginatedAutocomplete',
        data() {
            return {
                items: [],
                page: 1,
                lastPage: 1,
                searchInput: null,
            };
        },
        props: {
            default() {
                return {
                    url: '',
                    perPage: 15,
                    loading: true
                };
            },
            pagination: {
                type: Object,
            },
        },
        watch: {
            searchInput() {
                this.getItemsFromApi(this.page);
            },
        },
        computed: {
            canLoadMoreItems() {
                return this.page < this.lastPage;
            },
        },
        created() {
            this.getItemsFromApi(1);
        },
        methods: {
            getItemsFromApi(page) {
                this.loading = true;
                this.$http.get(this.pagination.url + '?perPage=' + this.pagination.perPage + '&page=' + page + '&q=' + (this.searchInput || '')).then((response) => {
                    response.data.data = response.data.data.map(obj => {
                        return {[this.$attrs['item-text']]: obj[this.$attrs['item-text']], [this.$attrs['item-value']]: obj[this.$attrs['item-value']]};
                    });
                    if (this.items === []) {
                        this.items = response.data.data;
                    } else {
                        this.items = [...this.items, ...response.data.data];
                    }
                    this.page = response.data.meta.current_page;
                    this.lastPage = response.data.meta.last_page;
                    this.loading = false;
                });

            },
        },
    };
</script>

<style scoped>

</style>