<template>
  <div class="text-center font-lato">
    <template v-if="items.length > 0">
      <v-col class="mx-auto pa-0" cols="10">
        <v-row align-content="center" justify="space-between" no-gutters>
          <v-select
            class="font-lato ma-0"
            style="max-width: 240px;"
            @input="category => $emit('search-category', category)"
            :items="categories"
            append-icon=""
            clearable
            label="Filter by category"
            prepend-inner-icon="mdi-filter"
            rounded
          ></v-select>

          <span class="align-self-center px-6">{{ msgFound }}</span>
        </v-row>
      </v-col>

      <div v-if="filteredItems.length === 0">
        <p class="mt-6 mb-0">Need suggestions? Try these:</p>
        <v-btn
          v-for="(suggestion, i) in suggestions"
          :key="i"
          text
          class="mt-1"
          style="text-transform: none;"
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
export default {
  props: {
    contentType: String,
    items: Array,
    filteredItems: Array,
    suggestions: Array
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
