<template>
  <div class="pt-6">
    <v-col class="mx-auto pa-0" cols="12" sm="8" lg="6" xl="5">
      <v-row align="center" justify="center" no-gutters>
        <v-col cols="10" :class="hasExternal ? 'col-sm-9' : ''">
          <SearchBar
            ref="searchBar"
            label="Search for apps (by title, contributors, categories, tags)"
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
        :contentType="contentType"
        :items="items"
        :filteredItems="filteredItems"
        :suggestions="suggestions"
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
const SearchBar = () => import('@/components/SearchBar')
const SearchInfoExtra = () => import('@/components/SearchInfoExtra')

export default {
  name: 'AppSearch',
  components: {
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
      items: 'data',
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
    if (this.$store.state.apps.data.length === 0) {
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
