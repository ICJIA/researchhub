<template>
  <BaseSection :title="title" :to="to">
    <v-col class="mx-auto font-lato" cols="10" lg="8" xl="7">
      <ul>
        <li v-for="result in results" :key="result.title" class="my-2">
          <router-link :to="`${to}/${result.slug}`">
            <span class="large">{{ result.title }}</span>
          </router-link>

          <v-btn
            v-for="tag in result.tags"
            :key="tag"
            class="chip"
            depressed
            rounded
            small
            @click="$emit('search-tag', $event.target.textContent)"
          >
            <template>{{ tag }}</template>
          </v-btn>

          <template v-if="result.external">
            <v-icon class="marker-external pl-1" small>{{
              $options.static.mdiCharity
            }}</v-icon>
            <span class="marker-external small">
              <template>{{ 'This is an external contribution' }}</template>
            </span>
          </template>

          <div class="text-capitalize">
            <template>{{ result.date.slice(0, 10) + ' | ' }}</template>
            <template>{{ result.categories.join(', ') }}</template>
          </div>
        </li>
      </ul>
    </v-col>
  </BaseSection>
</template>

<script>
import { mdiCharity } from '@mdi/js'
const BaseSection = () => import('@/components/BaseSection')

export default {
  components: {
    BaseSection
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    to: {
      type: String,
      default: ''
    },
    results: {
      type: Array,
      default: () => []
    }
  },
  static: {
    mdiCharity
  }
}
</script>
