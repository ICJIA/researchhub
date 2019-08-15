<template>
  <div class="pt-6 pb-12">
    <v-col class="mx-auto pa-0" cols="12" sm="8" lg="6" xl="5">
      <v-row align="center" justify="center" no-gutters>
        <v-col cols="10" :class="hasExternal ? 'col-sm-9' : ''">
          <SearchBar
            ref="searchBar"
            label="Search for articles (by title, date, authors, categories, tags)"
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

    <v-col
      v-for="(item, i) in filteredItems"
      :key="i"
      class="mx-auto"
      cols="12"
      sm="10"
      lg="8"
      xl="7"
    >
      <keep-alive>
        <RHArticleCard
          :item="item"
          @tag-click="searchTagGlobal($event)"
          @author-click="searchAuthorLocal($event)"
        />
      </keep-alive>
    </v-col>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import filterMixin from '@/mixins/filterMixin'
import { searchGlobalMixin, searchLocalMixin } from '@/mixins/searchMixin'
const RHArticleCard = () =>
  import('icjia-research-lib/lib/umd').then(lib => lib.ArticleCard)
const SearchBar = () => import('@/components/SearchBar')
const SearchInfoExtra = () => import('@/components/SearchInfoExtra')

export default {
  name: 'ArticleSearch',
  components: {
    RHArticleCard,
    SearchBar,
    SearchInfoExtra
  },
  props: {
    search: String
  },
  mixins: [filterMixin, searchGlobalMixin, searchLocalMixin],
  data() {
    return {
      contentType: 'article',
      localSearch: this.search || ''
    }
  },
  computed: {
    ...mapState('articles', {
      items: 'info',
      suggestions: 'suggestions'
    }),
    filteredItems() {
      return this.filterItems(this.items, this.localSearch, (item, s) => {
        return (
          item.title.toUpperCase().match(s) ||
          item.date.match(s) ||
          item.authors
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
    if (this.$store.state.articles.info.length === 0) {
      await this.$store.dispatch('articles/fetchInfo')
    }
  },
  methods: {
    searchAuthorLocal(e) {
      const text = e.target.textContent || e.target.innerText
      this.searchLocal(text)
    }
  }
}
</script>
