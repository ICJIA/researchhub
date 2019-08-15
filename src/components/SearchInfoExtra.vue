<template>
  <div class="text-center font-lato">
    <div v-if="items.length === 0">Loading {{ contentType }}s...</div>

    <template v-else class="py-2">
      <div>{{ filteredItems.length }} {{ contentType }}s found</div>

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
  </div>
</template>

<script>
export default {
  props: {
    contentType: String,
    items: Array,
    filteredItems: Array,
    suggestions: Array
  }
}
</script>
