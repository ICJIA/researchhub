export const searchGlobalMixin = {
  methods: {
    searchGlobal(search) {
      this.$router.push({ name: 'search', params: { search } })
    },
    searchTagGlobal(e) {
      const search = e.target.textContent || e.target.innerText
      this.searchGlobal(search)
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
    searchLocal(search) {
      this.$vuetify.goTo(0)
      this.localSearch = search
      this.$refs.searchBar.searchInput = search
    }
  }
}
