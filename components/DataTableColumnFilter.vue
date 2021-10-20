<template lang="pug">
  v-autocomplete(
    v-if="filterOptions.value.type === 'select'"
    :items="filterOptions.value.options"
    v-model="value"
    :placeholder="filterOptions.value.placeholder"
    clearable
  )
  v-menu(
    v-else-if="filterOptions.value.type === 'yearPicker'"
    v-model="menu"
    ref="menu"
    :close-on-content-click="true"
  )
    template(
      v-slot:activator="{ on, attrs }"
    )
      v-text-field(
        v-model="value"
        :placeholder="filterOptions.value.placeholder"
        readonly
        v-bind="attrs"
        v-on="on"
        clearable
      )
    v-date-picker(
      reactive
      show-current
      ref="picker"
      no-title
      max="2021-NaN-NaN"
      @input="yearInput"
    )
  v-text-field(
    v-else
    :type="filterOptions.value.type"
    v-model="value"
    :placeholder="filterOptions.value.placeholder"
  )
</template>

<script>
export default {
  name: "DataTableColumnFilter",
  props: {
    filterOptions: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      value: null,
      yearValue: null,
      menu: false
    }
  },
  watch: {
    menu(val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = "YEAR"));
    },
    value() {
      this.value = this.value === null ? "" : this.value;
      const filter = {
        [this.filterOptions.key]: this.value
      };
      this.$emit("filter-column", filter);
    }
  },
  methods: {
    yearInput(val) {
      this.value = val.split("-")[0];
    }
  }
}
</script>