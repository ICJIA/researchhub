export const searchGlobalMixin = {
  methods: {
    searchGlobal(x) {
      this.$router.push({
        name: 'search',
        params: {
          search: x
        }
      })
    }
  }
}

export const searchLocalMixin = {
  data() {
    return {
      localSearch: ''
    }
  },
  methods: {
    searchLocal(x) {
      this.$vuetify.goTo(0)
      this.localSearch = x
      this.$refs.searchBar.searchInput = x
    }
  }
}
