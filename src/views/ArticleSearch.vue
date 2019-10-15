<template>
  <div class="pt-6">
    <v-col class="mx-auto pa-0" cols="12" sm="8" lg="6" xl="5">
      <v-row align="center" justify="center" no-gutters>
        <v-col :class="hasExternal ? 'col-sm-9' : ''" cols="10">
          <SearchBar
            ref="searchBar"
            label="Search for articles (by title, date, authors, tags)"
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
        content-type="article"
        :filtered-items="filteredItems"
        :items="items"
        :suggestions="suggestions"
        @search-category="$event => (category = $event)"
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
        <ArticleCard
          :horizontal="$vuetify.breakpoint.smAndUp"
          :item="item"
          @tag-click="searchTagGlobal($event)"
          @author-click="searchAuthorLocal($event)"
        />
      </keep-alive>
    </v-col>

    <div class="py-6 text-center font-lato">
      <v-icon class="px-1 warning--text">{{
        $options.static.mdiClockAlertOutline
      }}</v-icon>
      <span>Older publications can be found </span>
      <a
        :href="$options.static.hostBaseURL + '/research/publications'"
        rel="noreferrer"
        target="_blank"
      >
        <template>{{ 'here' }}</template>
      </a>
    </div>
  </div>
</template>

<script>
import { mdiClockAlertOutline } from '@mdi/js'
import { mapState } from 'vuex'
import { hostBaseURL } from '@/config'
import filterMixin from '@/mixins/filterMixin'
import { searchGlobalMixin, searchLocalMixin } from '@/mixins/searchMixin'
const ArticleCard = () => import('icjia-research-lib').then(m => m.ArticleCard)
const SearchBar = () => import('@/components/SearchBar')
const SearchInfoExtra = () => import('@/components/SearchInfoExtra')

export default {
  components: {
    ArticleCard,
    SearchBar,
    SearchInfoExtra
  },
  mixins: [filterMixin, searchGlobalMixin, searchLocalMixin],
  props: {
    search: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      localSearch: this.search || ''
    }
  },
  computed: {
    ...mapState('articles', {
      items: 'info',
      suggestions: 'suggestions'
    }),
    filteredItems() {
      return this.filterItems({
        items: this.items,
        search: this.localSearch,
        filterSearch: (item, s) =>
          item.title.toUpperCase().match(s) ||
          item.date.match(s) ||
          item.authors
            .map(el => el.title)
            .join('')
            .toUpperCase()
            .match(s) ||
          item.tags
            .join('')
            .toUpperCase()
            .match(s)
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
  },
  static: {
    mdiClockAlertOutline,
    hostBaseURL
  }
}
</script>
