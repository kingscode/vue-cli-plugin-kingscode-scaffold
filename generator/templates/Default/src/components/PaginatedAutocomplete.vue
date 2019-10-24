<template>
    <v-autocomplete v-bind="$attrs"
                    :items="items"
                    :search-input.sync="searchInput"
                    :loading="loading"
                    :value="$attrs.value"
                    @change="handleChange"
                    v-if="enabled"
    >
        <template v-slot:append-item>
            <v-flex v-if="canLoadMoreItems" class="text-center">
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
                loading: true,
                enabled: true,
            };
        },
        props: {
            pagination: {
                type: Object,
                default() {
                    return {
                        url: '',
                        perPage: 15,
                    };
                },
            },
        },
        watch: {
            searchInput() {
                let selectedItemsText = this.items.filter(obj => {
                    return obj.id === this.$attrs.value;
                })[0][this.$attrs['item-text']];
                if(selectedItemsText !== this.searchInput) {
                    this.getItemsFromApi(this.page, this.searchInput);
                }
            },
            '$attrs.value': {
                handler() {
                    this.loadSelectedItemsIfTheyNotExist();
                },
                deep: false,
            },
        },
        computed: {
            canLoadMoreItems() {
                return this.page < this.lastPage;
            },
        },
        created() {
            this.reload();
        },
        methods: {
            getItemsFromApi(page, searchInput) {
                this.loading = true;
                this.$http.get(this.pagination.url + '?perPage=' + this.pagination.perPage + '&page=' + page + '&q=' + (searchInput || '')).then((response) => {
                    response.data.data = response.data.data.map(obj => this.mapItems(obj));

                    this.items = [...this.items, ...response.data.data];
                    this.page = response.data.meta.current_page;
                    this.lastPage = response.data.meta.last_page;
                    this.loading = false;
                });

            },
            // load selected items first
            getSelectedItems() {
                let ids = this.$attrs.value;
                if (typeof ids === 'undefined' || ids === null) {
                    return;
                }
                if (typeof ids === 'number') {
                    ids = [ids];
                }
                this.$http.get(this.pagination.url + '?only=' + ids.join() + '&perPage=' + ids.length).then((response) => {
                    response.data.data = response.data.data.map(obj => this.mapItems(obj));
                    this.items = [...this.items, ...response.data.data];
                });
            },
            handleChange(value) {
                this.$emit('input', value);
            },
            mapItems(obj) {
                return {
                    [this.$attrs['item-text']]: obj[this.$attrs['item-text']],
                    [this.$attrs['item-value']]: obj[this.$attrs['item-value']],
                };
            },
            reload() {
                this.items = [];
                this.getSelectedItems();
                this.getItemsFromApi(1);
            },
            loadSelectedItemsIfTheyNotExist() {
                let ids = this.$attrs.value;
                if (typeof ids === 'undefined' || ids === null) {
                    return;
                }
                if (typeof ids === 'number') {
                    ids = [ids];
                }
                ids.forEach((value) => {
                    let found = this.items.find((obj) => {
                        return obj.id === value;
                    });
                    if (typeof found === 'undefined') {
                        this.getSelectedItems();
                        return;
                    }
                });
            },
        },
    };
</script>

<style scoped>

</style>
