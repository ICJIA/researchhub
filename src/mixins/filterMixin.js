export default {
  data() {
    return {
      icjiaOnly: false
    }
  },
  computed: {
    hasExternal() {
      return this.items.filter(item => item.external).length > 0
    }
  },
  methods: {
    filterExternal(items) {
      if (this.icjiaOnly) {
        return items.filter(item => !item.external)
      } else {
        return items
      }
    },
    filterItems(items, searchterm, filterer) {
      const s = searchterm.toUpperCase()

      return this.filterExternal(items).filter(item => filterer(item, s))
    }
  }
}
