<template>
  <div class="pt-6">
    <v-col class="mx-auto pa-0" cols="12" sm="8" lg="6" xl="5">
      <v-row align="center" justify="center" no-gutters>
        <v-col cols="10" :class="hasExternal ? 'col-sm-9' : ''">
          <SearchBar
            ref="searchBar"
            label="Search for apps (by title, contributors, tags)"
            :search.sync="localSearch"
          />
        </v-col>

        <v-col v-if="hasExternal" class="pa-0" cols="4" sm="3">
          <v-switch
            v-model="icjiaOnly"
            label="ICJIA only"
            class="mx-4 mt-0 pa-0 font-lato"
          />
        </v-col>
      </v-row>

      <SearchInfoExtra
        :content-type="contentType"
        :filtered-items="filteredItems"
        :items="items"
        :suggestions="suggestions"
        @search-category="$event => (category = $event)"
        @search-suggestion="searchLocal($event)"
      />
    </v-col>

    <v-col class="mx-auto" cols="12" sm="10" lg="8" xl="7">
      <v-row justify="center">
        <v-col
          v-for="(item, i) in filteredItems"
          :key="i"
          cols="12"
          sm="6"
          lg="4"
        >
          <keep-alive>
            <AppCard :item="item" @tag-click="searchTagGlobal($event)" />
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
const AppCard = () => import('icjia-research-lib').then(m => m.AppCard)
const SearchBar = () => import('@/components/SearchBar')
const SearchInfoExtra = () => import('@/components/SearchInfoExtra')

export default {
  components: {
    AppCard,
    SearchBar,
    SearchInfoExtra
  },
  mixins: [filterMixin, searchGlobalMixin, searchLocalMixin],
  data() {
    return {
      contentType: 'app'
    }
  },
  computed: {
    ...mapState('apps', {
      items: 'info',
      suggestions: 'suggestions'
    }),
    filteredItems() {
      return this.filterItems(this.items, this.localSearch, (item, s) => {
        return (
          item.title.toUpperCase().match(s) ||
          item.contributors
            .map(el => el.title)
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
    if (this.$store.state.apps.info.length === 0) {
      await this.$store.dispatch('apps/fetchInfo')
    }
  },
  methods: {
    searchTag(e) {
      const text = e.target.textContent || e.target.innerText
      this.searchGlobal(text)
    }
  }
}
</script>
