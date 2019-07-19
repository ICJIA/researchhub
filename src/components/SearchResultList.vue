<template>
  <BaseSection :title="title" :to="to">
    <v-layout justify-center class="font-lato">
      <v-flex xs12 sm10 md8>
        <ul>
          <li v-for="result in results" :key="result.title" class="my-2">
            <router-link :to="`${to}/${result.slug}`">
              <span class="large">{{ result.title }}</span>
            </router-link>

            <v-btn
              v-for="tag in result.tags"
              :key="tag"
              class="tag"
              small
              depressed
              round
              @click="$emit('search-tag', $event.target.textContent)"
            >
              <template>{{ tag }}</template>
            </v-btn>

            <span v-if="result.external" class="external small">
              <v-icon class="external">favorite</v-icon>
              <span>This is an external contribution</span>
            </span>

            <div>
              <template>{{ result.date.slice(0, 10) + ' | ' }}</template>
              <template>{{
                result.categories
                  .map(el => el.charAt(0).toUpperCase() + el.slice(1))
                  .join(', ')
              }}</template>
            </div>
          </li>
        </ul>
      </v-flex>
    </v-layout>
  </BaseSection>
</template>

<script>
const BaseSection = () => import('@/components/BaseSection')

export default {
  components: {
    BaseSection
  },
  props: {
    title: String,
    to: String,
    results: Array
  }
}
</script>

<style scoped>
.tag {
  background-color: #e0e0e0 !important;
  color: #333;
  margin: 4px;
  min-width: 0;
  text-transform: uppercase;
}
</style>
