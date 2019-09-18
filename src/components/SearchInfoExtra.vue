<template>
  <div class="text-center font-lato">
    <template v-if="items.length > 0">
      <v-col class="mx-auto pa-0" cols="10">
        <v-row align-content="center" justify="space-between" no-gutters>
          <v-select
            :items="categories"
            class="font-lato ma-0"
            style="max-width: 240px;"
            append-icon=""
            clearable
            label="Filter by category"
            :prepend-inner-icon="mdiFilter"
            rounded
            @input="category => $emit('search-category', category)"
          ></v-select>

          <span class="align-self-center px-6">{{ msgFound }}</span>
        </v-row>
      </v-col>

      <div v-if="filteredItems.length === 0">
        <p class="mt-6 mb-0">Need suggestions? Try these:</p>
        <v-btn
          v-for="(suggestion, i) in suggestions"
          :key="i"
          class="mt-1 text-none"
          text
          @click="$emit('search-suggestion', suggestion)"
        >
          <template>{{ suggestion }}</template>
        </v-btn>
      </div>
    </template>

    <div v-else class="pt-2">Loading {{ contentType }}s...</div>
  </div>
</template>

<script>
import { mdiFilter } from '@mdi/js'

export default {
  props: {
    contentType: {
      type: String,
      default: ''
    },
    filteredItems: {
      type: Array,
      default: () => []
    },
    items: {
      type: Array,
      default: () => []
    },
    suggestions: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      mdiFilter
    }
  },
  computed: {
    categories() {
      return [...new Set(this.items.flatMap(el => el.categories))].sort()
    },
    msgFound() {
      const count = this.filteredItems.length
      const type = count > 1 ? `${this.contentType}s` : this.contentType
      return `${count} ${type} found`
    }
  }
}
</script>
