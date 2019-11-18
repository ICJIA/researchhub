<template>
  <v-text-field
    :value="searchInput"
    :label="searchLabel"
    :clearable="true"
    :prepend-inner-icon="$options.static.mdiMagnify"
    solo
    @click:clear="onClear($event)"
    @keyup="onKeyup($event)"
  >
    <template #append-outer>
      <v-tooltip top nudge-bottom="10">
        <template v-slot:activator="{ on }">
          <a :href="`/docs/guide${$route.path}`" v-on="on">
            <v-icon>{{ $options.static.mdiHelpCircleOutline }}</v-icon>
          </a>
        </template>
        <span class="font-lato">Click to see how to navigate this page.</span>
      </v-tooltip>
    </template>
  </v-text-field>
</template>

<script>
import { mdiHelpCircleOutline, mdiMagnify } from '@mdi/js'

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
      searchLabel: this.label,
      path: this.$route.path
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
    mdiHelpCircleOutline,
    mdiMagnify
  }
}
</script>

<style scoped>
a:hover .v-icon {
  color: #fb8c00 !important;
}
</style>
