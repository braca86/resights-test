<template lang="pug">
  v-container
    v-row
      v-col(cols)
        DataTable(
          v-if="items"
          :headers="$options.headers"
          :items="items"
          :items-count="itemsCount"
          :columns-filters="$options.columnsFilters"
          @fetch-data="fetchItems"
        )
        v-progress-circular(
          v-else
          width="2"
          color="rs__primary"
          indeterminate
        ).mx-auto
</template>

<script>
import DataTable from "~/components/DataTable.vue";
import { filterData, countries, genders }  from "~/helpers/index.js";

export default {
  components: {
    DataTable
  },
  headers: [
    { text: "Name", value: "user", align: "start", sortable: false },
    { text: "Email", value: "email", sortable: false },
    { text: "Gender", value: "gender", sortable: false },
    { text: "Year", value: "year", sortable: false },
    { text: "Sales", value: "sales", sortable: false },
    { text: "Country", value: "country", sortable: false },
    { text: "", value: "data-table-expand" }
  ],
  columnsFilters: {
    user: { type: "text", placeholder: "Search by name" },
    email: { type: "text", placeholder: "Search by email" },
    gender: { type: "select", placeholder: "Select gender", options: genders },
    year: { type: "yearPicker", placeholder: "Select year" },
    sales: { type: "number", placeholder: "More than" },
    country: { type: "select", placeholder: "Select country", options: countries }
  },
  data() {
    return {
      items: null,
      itemsCount: null
    }
  },
  async created() {
    const { items, itemsCount } = await this.fetchData({ page: 1, itemsPerPage: 10 });
    this.items = items;
    this.itemsCount = itemsCount;
  },
  methods: {
    async fetchData(pagination, filter = null) {
      await this.delay(1000);
      return filterData(pagination, filter);
    },
    delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    async fetchItems({ pagination, filter}) {
      const { items, itemsCount } = await this.fetchData(pagination, filter);
      this.items = items;
      this.itemsCount = itemsCount;
    }
  }
}
</script>

<style lang="sass" scoped>
.v-progress-circular
  position: absolute
  top: 50%
  left: 50%

::v-deep .v-input 
  font-size: 14px
</style>