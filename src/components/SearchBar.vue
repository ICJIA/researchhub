<template>
  <v-text-field
    :value="searchInput"
    :label="searchLabel"
    :clearable="true"
    prepend-inner-icon="mdi-magnify"
    solo
    @click:clear="onClear($event)"
    @keyup="onKeyup($event)"
  />
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    search: {
      type: String,
      default: ''
    }
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
