<template>
  <div class="pb-12">
    <BaseViewTitle :page="title" />

    <v-col class="mx-auto pt-6 pb-0 px-0" cols="10" sm="8" lg="6" xl="5">
      <SearchBar
        ref="searchBar"
        label="Search for Research Hub items (by title, date, categories, tags)"
        :search.sync="searchLocal"
      />

      <SearchInfoExtra
        contentType="item"
        :items="[...apps, ...articles, ...datasets]"
        :filteredItems="[...filterApps, ...filterArticles, ...filterDatasets]"
        :suggestions="suggestions"
        @search-suggestion="useSearchTerm($event)"
      />
    </v-col>

    <SearchResultList
      v-if="filterApps && filterApps.length > 0"
      title="Apps"
      to="apps"
      :results="filterApps"
      @search-tag="useSearchTerm($event)"
    />

    <SearchResultList
      v-if="filterArticles && filterArticles.length > 0"
      title="Articles"
      to="articles"
      :results="filterArticles"
      @search-tag="useSearchTerm($event)"
    />

    <SearchResultList
      v-if="filterDatasets && filterDatasets.length > 0"
      title="Datasets"
      to="datasets"
      :results="filterDatasets"
      @search-tag="useSearchTerm($event)"
    />
  </div>
</template>

<script>
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
  props: {
    search: String
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
    filterApps() {
      return this.filterItems({
        items: this.apps,
        search: this.searchLocal.toUpperCase()
      })
    },
    filterArticles() {
      return this.filterItems({
        items: this.articles,
        search: this.searchLocal.toUpperCase()
      })
    },
    filterDatasets() {
      return this.filterItems({
        items: this.datasets,
        search: this.searchLocal.toUpperCase()
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
    filterItems({ items, search }) {
      return search
        ? items.filter(
            ({ title, date, categories, tags }) =>
              title.toUpperCase().match(search) ||
              date.match(search) ||
              categories
                .join('')
                .toUpperCase()
                .match(search) ||
              tags
                .join('')
                .toUpperCase()
                .match(search)
          )
        : []
    },
    useSearchTerm(x) {
      this.$vuetify.goTo(0)
      this.searchLocal = x
      this.$refs.searchBar.searchInput = x
    }
  }
}
</script>
