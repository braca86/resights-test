<template lang="pug">
  v-data-table(
    :loading="loading"
    :headers="headers"
    :items="items"
    item-key="email"
    dense
    :footer-props="{ 'items-per-page-options': [10, 20, 30, 40, 50], 'show-first-last-page': true, 'first-icon': 'mdi-arrow-collapse-left', 'last-icon': 'mdi-arrow-collapse-right', 'prev-icon': 'mdi-minus', 'next-icon': 'mdi-plus', 'show-current-page': true }"
    :server-items-length="itemsCount"
    :options.sync="pagination"
    show-expand
    :expanded.sync="expanded"
  ).elevation-1.mt-10
    template(
      v-slot:top
    )
      v-text-field(
        v-model="searchRecords"
        placeholder="Search all records"
        @input="searchRecordsInput"
      ).mx-4
    template(
      v-if="columnsFilters"
      v-slot:body.prepend
    )
      tr
        td(
          v-for="(value, key) in columnsFilters"
          :key="key"
        )          
          column-filter(
            :filter-options="{ value, key }"
            @filter-column="filterColumn"
          )
        td &nbsp;
    template(
      v-slot:item.user="{ item }"
    ) {{ `${item.user.title} ${item.user.first_name} ${item.user.last_name}` }}
    template(
      v-slot:expanded-item="{ headers, item }"
    )
      td(
        :colspan="headers.length"
        :style="{  }"
      ).py-2
        div ip address: {{ item.ip_address }}
        div color: {{ item.color }}
          v-chip(
            :color="item.color.toLowerCase()"
            pill
            x-small
          ).ml-2
        div currency: {{ item.currency }}
</template>

<script>
import ColumnFilter from "./DataTableColumnFilter.vue";

export default {
  name: "DataTable",
  components: { ColumnFilter },
  props: {
    headers: {
      type: Array,
      required: true
    },
    items: {
      type: Array,
      required: true
    },
    itemsCount: {
      type: Number,
      required: true,
    },
    columnsFilters: {
      type: [Object, Boolean],
      required: false,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      expanded: [],
      pagination: {
        page: 1,
        itemsPerPage: 10
      },
      searchRecords: "",
      searchColumns: {}
    }
  },
  watch: {
    pagination(val) {
      this.loading = true;
      this.$emit("fetch-data", { pagination: val, filter: { records: this.searchRecords, ...this.searchColumns } });
    },
    items() {
      this.loading = false;
    }
  },
  methods: {
    searchRecordsInput() {
      this.loading = true;
      this.pagination = {
        page: 1,
        itemsPerPage: 10
      };
    },
    filterColumn(columnFilter) {
      this.loading = true;
      this.searchColumns = {
        ...this.searchColumns,
        ...columnFilter
      }
      this.pagination = { 
        page: 1,
        itemsPerPage: 10
      };
    }
  }
}
</script>

<style lang="sass" scoped>
  .v-data-table
    max-width: 100%
</style>
