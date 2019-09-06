const filterExternal = (item, icjiaOnly) => (icjiaOnly ? !item.external : true)

const filterCategory = (item, category) =>
  category ? item.categories.includes(category) : true

export default {
  data() {
    return {
      category: undefined,
      icjiaOnly: false
    }
  },
  computed: {
    hasExternal() {
      return this.items.filter(item => item.external).length > 0
    }
  },
  methods: {
    filterItems(items, searchterm, filterSearch) {
      return items.filter(
        item =>
          filterExternal(item, this.icjiaOnly) &&
          filterCategory(item, this.category) &&
          filterSearch(item, searchterm.toUpperCase())
      )
    }
  }
}
