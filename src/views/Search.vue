<template>
  <div>
    <BaseViewTitle :home="false">
      <h3 class="light">
        <template>{{ 'ICJIA Research Hub' }}</template>
        <v-icon color="white">chevron_right</v-icon>
        <span>{{ title }}</span>
      </h3>
    </BaseViewTitle>

    <v-container class="pb-5">
      <v-layout row wrap justify-center>
        <v-flex xs12 sm8 lg6>
          <SearchBar
            ref="searchBar"
            label="Search for Research Hub items (by title, date, categories, tags)"
            :search.sync="searchLocal"
          />

          <SearchInfoExtra
            contentType="item"
            :items="[...apps, ...articles, ...datasets]"
            :filteredItems="[
              ...filterApps,
              ...filterArticles,
              ...filterDatasets
            ]"
            :suggestions="suggestions"
            @search-suggestion="useSearchTerm($event)"
          />
        </v-flex>

        <v-flex xs12>
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
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
const BaseViewTitle = () => import('@/components/BaseViewTitle')
const SearchBar = () => import('@/components/SearchBar')
const SearchInfoExtra = () => import('@/components/SearchInfoExtra')
const SearchResultList = () => import('@/components/SearchResultList')

export default {
  name: 'Search',
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
      const s = this.searchLocal.toUpperCase()

      return this.apps.filter(item => {
        return (
          item.title.toUpperCase().match(s) ||
          item.date.match(s) ||
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
    },
    filterArticles() {
      const s = this.searchLocal.toUpperCase()

      return this.articles.filter(item => {
        return (
          item.title.toUpperCase().match(s) ||
          item.date.match(s) ||
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
    },
    filterDatasets() {
      const s = this.searchLocal.toUpperCase()

      return this.datasets.filter(item => {
        return (
          item.title.toUpperCase().match(s) ||
          item.date.match(s) ||
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
    await this.$store.dispatch('search/fetchSearchInfo')
    this.apps = this.$store.state.search.apps
    this.articles = this.$store.state.search.articles
    this.datasets = this.$store.state.search.datasets
  },
  methods: {
    useSearchTerm(x) {
      this.$vuetify.goTo(0)
      this.searchLocal = x
      this.$refs.searchBar.searchInput = x
    }
  }
}
</script>
