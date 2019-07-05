<template>
  <v-container class="pb-5">
    <v-layout row wrap justify-center>
      <v-flex xs12 sm8 lg6>
        <v-layout row wrap>
          <v-flex xs12 :class="hasExternal ? 'sm10' : ''">
            <SearchBar
              ref="searchBar"
              label="Search for datasets (by title, date, sources, categories, tags)"
              :search.sync="localSearch"
            />
          </v-flex>

          <v-flex v-if="hasExternal" xs12 sm2>
            <v-switch
              v-model="icjiaOnly"
              label="ICJIA only"
              class="ml-4 font-lato"
            />
          </v-flex>
        </v-layout>

        <SearchInfoExtra
          :contentType="contentType"
          :items="items"
          :filteredItems="filteredItems"
          :suggestions="suggestions"
          @search-suggestion="searchLocal($event)"
        />
      </v-flex>

      <v-flex xs12 sm10 xl8>
        <v-layout row wrap justify-center>
          <v-flex xs12 xl6 v-for="(item, i) in filteredItems" :key="i">
            <keep-alive>
              <RHDatasetCard :item="item" @tag-click="searchGlobal($event)" />
            </keep-alive>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import filterMixin from '@/mixins/filterMixin'
import { searchGlobalMixin, searchLocalMixin } from '@/mixins/searchMixin'
const RHDatasetCard = () =>
  import('icjia-research-lib/lib/umd').then(lib => lib.DatasetCard)
const SearchBar = () => import('@/components/SearchBar')
const SearchInfoExtra = () => import('@/components/SearchInfoExtra')

export default {
  name: 'DatasetSearch',
  components: {
    SearchBar,
    SearchInfoExtra,
    RHDatasetCard
  },
  mixins: [filterMixin, searchGlobalMixin, searchLocalMixin],
  data() {
    return {
      contentType: 'dataset'
    }
  },
  computed: {
    ...mapState('datasets', {
      items: 'info',
      suggestions: 'suggestions'
    }),
    filteredItems() {
      return this.filterItems(this.items, this.localSearch, (item, s) => {
        return (
          item.title.toUpperCase().match(s) ||
          item.date.match(s) ||
          item.sources
            .map(el => el.title)
            .join('')
            .toUpperCase()
            .match(s) ||
          item.categories
            .join('')
            .toUpperCase()
            .match(s) ||
          item.tags
            .join('')
            .toUpperCase()
            .match(s)
        )
      })
    }
  },
  async created() {
    if (this.$store.state.datasets.info.length === 0) {
      await this.$store.dispatch('datasets/fetchInfo')
    }
  }
}
</script>
