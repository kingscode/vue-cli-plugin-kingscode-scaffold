<template>
  <k-autocomplete v-bind="computedAttributes"
                  v-on="$listeners"
                  :field="field"
                  :item-text="itemText"
                  :item-value="itemValue"
                  :items="items"
                  :loading="isLoading"
                  :return-object="returnObject"
                  :search-input.sync="search"
                  :value="value"
                  :disabled="disabled"
                  no-filter
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
      required: false,
    },
    returnObject: {
      type: Boolean,
      default: true,
    },
    itemText: {
      type: String,
      default: 'name',
    },
    itemValue: {
      type: String,
      default: 'id',
    },
    disabled: {
      type: Boolean,
    },
  },
  watch: {
    search() {
      this.handleInitialFetch();
    },
    disabled(value) {
      if (!value) {
        this.handleInitialFetch();
      }
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
      this.isLoading = true;

      // currentValues are the id's of selected values in the autocomplete.
      // They will be excluded from the autocomplete, because they are already known
      let currentValues = [];
      if (this.returnObject) {
        currentValues = this.valuesAsArray.map((item) => item[this.itemValue]);
      } else {
        currentValues = this.valuesAsArray;
      }

      const result = await this.paginator(this.page, this.perPage, this.searchParameter, undefined, undefined, { exclude: currentValues });
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
        this.searchParameter = (this.search && this.searchIsValid()) ? this.search : '';

        this.page = 1;
        this.items = [];

        if (this.returnObject) {
          // If we are working with objects, we need to add the value objects to the item list,
          // so they are at the top of the selectable values
          this.items = [...this.valuesAsArray];
        } else if (this.valuesAsArray.length) {
          // If not, we need to fetch all the values, otherwise we don't know their names
          const result = await this.paginator(1, this.valuesAsArray.length, undefined, undefined, undefined, { only: this.valuesAsArray });
          this.items = [...result.data.data];
        }

        if (!this.disabled) {
          const result = await this.getPaginator();
          this.items = [...this.items, ...result];
        }
      }, 400);
    },
    /**
     * Check if the search is valid and not the current selected value
     * @returns {boolean}
     */
    searchIsValid() {
      if (!this.value) return true;
      if (this.returnObject) {
        return !this.value[this.itemText] === this.search;
      }
      return !this.items.find((item) => item[this.itemText] === this.search);

    },
    refresh() {
      this.handleInitialFetch();
    },
  },
};
</script>
