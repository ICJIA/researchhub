<template>
  <div class="pb-12">
    <BaseViewTitle :page="title" />

    <v-col class="mx-auto pt-6 pb-0 px-0" cols="10" sm="8" lg="6" xl="5">
      <SearchBar
        ref="searchBar"
        label="Search for Research Hub items (by title, date, tags)"
        :search.sync="searchLocal"
      />

      <SearchInfoExtra
        content-type="item"
        :filtered-items="[
          ...filteredApps,
          ...filteredArticles,
          ...filteredDatasets
        ]"
        :items="[...apps, ...articles, ...datasets]"
        :suggestions="suggestions"
        @search-category="$event => (category = $event)"
        @search-suggestion="useSearchTerm($event)"
      />
    </v-col>

    <SearchResultList
      v-if="filteredApps && filteredApps.length > 0"
      :results="filteredApps"
      title="Apps"
      to="apps"
      @search-tag="useSearchTerm($event)"
    />

    <SearchResultList
      v-if="filteredArticles && filteredArticles.length > 0"
      :results="filteredArticles"
      title="Articles"
      to="articles"
      @search-tag="useSearchTerm($event)"
    />

    <SearchResultList
      v-if="filteredDatasets && filteredDatasets.length > 0"
      :results="filteredDatasets"
      title="Datasets"
      to="datasets"
      @search-tag="useSearchTerm($event)"
    />
  </div>
</template>

<script>
import filterMixin from '@/mixins/filterMixin'
const BaseViewTitle = () => import('@/components/BaseViewTitle')
const SearchBar = () => import('@/components/SearchBar')
const SearchInfoExtra = () => import('@/components/SearchInfoExtra')
const SearchResultList = () => import('@/components/SearchResultList')

export default {
  metaInfo: {
    titleTemplate: 'Search | %s'
  },
  components: {
    BaseViewTitle,
    SearchBar,
    SearchInfoExtra,
    SearchResultList
  },
  mixins: [filterMixin],
  props: {
    search: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      title: 'Search',
      searchLocal: this.search || '',
      apps: [],
      articles: [],
      datasets: [],
      suggestions: this.$store.state.search.suggestions
    }
  },
  computed: {
    filteredApps() {
      return this.getFilteredItems({
        items: this.apps,
        search: this.searchLocal
      })
    },
    filteredArticles() {
      return this.getFilteredItems({
        items: this.articles,
        search: this.searchLocal
      })
    },
    filteredDatasets() {
      return this.getFilteredItems({
        items: this.datasets,
        search: this.searchLocal
      })
    }
  },
  async created() {
    await this.$store.dispatch('search/fetchSearchInfo')
    this.apps = this.$store.state.search.apps
    this.articles = this.$store.state.search.articles
    this.datasets = this.$store.state.search.datasets
  },
  methods: {
    getFilteredItems({ items, search }) {
      return this.filterItems({
        items,
        search,
        filterSearch: (item, s) =>
          item.title.toUpperCase().match(s) ||
          item.date.match(s) ||
          item.tags
            .join('')
            .toUpperCase()
            .match(s)
      })
    },
    useSearchTerm(x) {
      this.$vuetify.goTo(0)
      this.searchLocal = x
      this.$refs.searchBar.searchInput = x
    }
  }
}
</script>
