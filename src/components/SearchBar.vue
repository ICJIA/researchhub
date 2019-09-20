<template>
  <v-text-field
    :value="searchInput"
    :label="searchLabel"
    :clearable="true"
    :prepend-inner-icon="$options.static.mdiMagnify"
    solo
    @click:clear="onClear($event)"
    @keyup="onKeyup($event)"
  />
</template>

<script>
import { mdiMagnify } from '@mdi/js'

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
  },
  static: {
    mdiMagnify
  }
}
</script>
