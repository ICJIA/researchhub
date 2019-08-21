<template>
  <div class="pt-6">
    <v-col class="mx-auto pa-0" cols="12" sm="8" lg="6" xl="5">
      <v-row align="center" justify="center" no-gutters>
        <v-col cols="10" :class="hasExternal ? 'col-sm-9' : ''">
          <SearchBar
            ref="searchBar"
            label="Search for datasets (by title, date, sources, categories, tags)"
            :search.sync="localSearch"
          />
        </v-col>

        <v-col v-if="hasExternal" class="pa-0" cols="4" sm="3">
          <v-switch
            v-model="icjiaOnly"
            label="ICJIA only"
            class="mx-6 my-0 pa-0 font-lato"
          />
        </v-col>
      </v-row>

      <SearchInfoExtra
        :contentType="contentType"
        :items="items"
        :filteredItems="filteredItems"
        :suggestions="suggestions"
        @search-suggestion="searchLocal($event)"
      />
    </v-col>

    <v-col class="mx-auto" cols="12" sm="10" lg="8" xl="7">
      <v-row justify="center">
        <v-col v-for="(item, i) in filteredItems" :key="i" cols="12" lg="6">
          <keep-alive>
            <DatasetCard :item="item" @tag-click="searchTagGlobal($event)" />
          </keep-alive>
        </v-col>
      </v-row>
    </v-col>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import filterMixin from '@/mixins/filterMixin'
import { searchGlobalMixin, searchLocalMixin } from '@/mixins/searchMixin'
const DatasetCard = () => import('icjia-research-lib').then(m => m.DatasetCard)
const SearchBar = () => import('@/components/SearchBar')
const SearchInfoExtra = () => import('@/components/SearchInfoExtra')

export default {
  name: 'DatasetSearch',
  components: {
    DatasetCard,
    SearchBar,
    SearchInfoExtra
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
