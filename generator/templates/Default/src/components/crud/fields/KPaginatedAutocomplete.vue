<template>
  <k-autocomplete v-bind="computedAttributes"
                  v-on="$listeners"
                  :field="field"
                  :items="items"
                  :loading="isLoading"
                  :search-input.sync="search"
                  :value="value"
                  no-filter
                  return-object
  >
    <template v-if="lastPage > page" #append-item>
      <v-list-item>
        <v-btn text @click="loadMore">{{ $t('actions.loadMore') }}</v-btn>
      </v-list-item>
    </template>
    <template #no-data>
      <v-list-item v-if="isLoading">
        {{ $vuetify.lang.t('$vuetify.dataIterator.loadingText') }}
      </v-list-item>
      <v-list-item v-else>
        {{ $vuetify.lang.t('$vuetify.dataIterator.noResultsText') }}
      </v-list-item>
    </template>
  </k-autocomplete>
</template>

<script>
import KAutocomplete from '@/components/crud/fields/KAutocomplete.vue';

/**
 * @TODO at this moment filtering is turned off, when this is activated vuetify filteres based on the item text.
 * But then the result is double filtered and items witch advanced filtering from the API won't appear.
 * When it is enabled (which can't be done) vuetify doesn't show selected items that don't correspond to the search term.
 * When we would remove these from the items, they are no longer visible as a value in the autocomplete itself
 * The only thing we could do is create a custom filter that excludes items that are already selected, but then all
 * selected items are hidden including the ones which do correspond to the filter.
 */
export default {
  name: 'KPaginatedAutocomplete',
  components: { KAutocomplete },
  props: {
    field: {
      type: String,
      required: true,
    },
    paginator: {
      type: Function,
      required: true,
    },
    value: {
      type: [Array, Object],
      required: false,
    },
  },
  watch: {
    search() {
      this.handleInitialFetch();
    },
  },
  data() {
    return {
      items: [],
      page: 1,
      lastPage: 1,
      perPage: 25,
      search: '', //autocomplete search value
      searchParameter: '', //the value that will be send to the API
      timeout: 0,
      isLoading: false,
    };
  },
  created() {
    this.handleInitialFetch();
  },
  computed: {
    /**
     * All attribute that need to be passed to the KAutocomplete.
     * All the values inside this object are overwriteable so only add props here that may be overwritten!
     * @returns Object
     */
    computedAttributes() {
      return {
        itemText: 'name',
        chips: !!this.$attrs.multiple,
        deletableChips: !!this.$attrs.multiple,
        ...this.$attrs,
      };
    },
    valuesAsArray() {
      if (!this.value) {
        return [];
      }
      return Array.isArray(this.value) ? this.value : [this.value];
    },
  },
  methods: {
    async getPaginator() {
      const excludeIds = this.valuesAsArray.map((item) => item.id);
      this.isLoading = true;
      const result = await this.paginator(this.page, this.perPage, this.searchParameter, undefined, undefined, { exclude: excludeIds });
      this.lastPage = result.data.meta.lastPage;
      this.isLoading = false;
      return result.data.data;
    },
    async loadMore() {
      this.page++;
      const result = await this.getPaginator();
      this.items = [...this.items, ...result];
    },
    async handleInitialFetch() {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(async () => {
        if (this.value && this.search === this.value[this.computedAttributes.itemText]) {
          return;
        }
        this.searchParameter = this.search;
        this.page = 1;
        this.items = [...this.valuesAsArray];
        const result = await this.getPaginator();
        this.items = [...this.items, ...result];
      }, 200);
    },
    refresh() {
      this.handleInitialFetch();
    },
  },
};
</script>
