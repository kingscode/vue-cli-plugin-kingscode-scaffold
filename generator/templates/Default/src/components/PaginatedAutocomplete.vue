<template>
    <v-autocomplete v-bind="$attrs"
                    :items="items"
                    :search-input.sync="searchInput"
                    :loading="isLoading"
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

<script lang="js">
import axios from '../api/implementation/app';

export default {
    name: 'PaginatedAutocomplete',
    data() {
        return {
            items: [],
            page: 1,
            lastPage: 1,
            searchInput: '',
            isLoading: true,
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
            const selectedItemsText = this.items.filter(item => item.id === this.$attrs.value)[0][this.$attrs['item-text']];

            if (selectedItemsText !== this.searchInput) {
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
        canLoadMoreItems: vm => vm.page < vm.lastPage,
        selectedIds: vm => {
            const value = vm.$attrs.value;

            if (!value) return [];

            return Array.isArray(value) ? value : [value];
        },
    },
    created() {
        this.reload();
    },
    methods: {
        getItemsFromApi(page, searchInput) {
            this.isLoading = true;

            axios.get(`${this.pagination.url}?perPage=${this.pagination.perPage}page=${page}&q=${searchInput}`)
                .then(response => {
                    const axiosData = response.data;

                    axiosData.data = response.data.data.map(obj => this.mapItems(obj));
                    this.items = [...this.items, ...axiosData.data];

                    const meta = axiosData.meta;
                    this.page = meta.currentPage;
                    this.lastPage = meta.lastPage;
                })
                .finally(() => this.isLoading = false);
        },
        getSelectedItems() {
            const ids = this.selectedIds;

            if (!ids.length) return;

            this.isLoading = true;

            axios.get(`${this.pagination.url}?only=${ids.join()}&perPage=${ids.length}`)
                .then(response => {
                    const axiosData = response.data;

                    axiosData.data = axiosData.data.map(obj => this.mapItems(obj));
                    this.items = [...this.items, ...axiosData.data];
                })
                .finally(() => this.isLoading = false);
        },
        handleChange(value) {
            this.$emit('input', value);
        },
        mapItems(obj) {
            const itemText = this.$attrs['item-text'];
            const itemValue = this.$attrs['item-value'];

            return {
                [itemText]: obj[itemText],
                [itemValue]: obj[itemValue],
            };
        },
        reload() {
            this.items = [];
            this.getSelectedItems();
            this.getItemsFromApi(1);
        },
        loadSelectedItemsIfTheyNotExist() {
            const ids = this.selectedIds;

            if (!ids.length) return;

            ids.forEach(value => {
                const item = this.items.find(item => item.id === value);

                if (!item) this.getSelectedItems();
            });
        },
    },
};
</script>

<style scoped>

</style>
