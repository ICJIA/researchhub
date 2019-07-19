<template>
  <div class="text-xs-center font-lato">
    <div v-if="items.length === 0">Loading {{ contentType }}s...</div>

    <template v-else class="py-2">
      <div>{{ filteredItems.length }} {{ contentType }}s found</div>

      <div v-if="filteredItems.length === 0">
        <template>{{ 'Need suggestions? Try these:' }}</template>
        <br />
        <span v-for="(suggestion, i) in suggestions" :key="i">
          <v-btn
            flat
            class="ma-1"
            style="text-transform: none;"
            @click="$emit('search-suggestion', suggestion)"
          >
            <template>{{ suggestion }}</template>
          </v-btn>
        </span>
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

<style></style>
