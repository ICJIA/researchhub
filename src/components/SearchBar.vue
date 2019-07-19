<template>
  <v-text-field
    @keyup="onKeyup($event)"
    @click:clear="onClear($event)"
    :value="searchInput"
    :label="searchLabel"
    :clearable="true"
    prepend-inner-icon="search"
    solo
  />
</template>

<script>
export default {
  props: {
    label: String,
    search: String
  },
  data() {
    return {
      searchInput: this.search,
      searchLabel: this.label
    }
  },
  methods: {
    onKeyup(e) {
      this.$emit('update:search', e.target.value)
    },
    onClear() {
      this.$emit('update:search', '')
    }
  }
}
</script>
