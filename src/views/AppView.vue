<template>
  <v-col class="mx-auto" cols="12" sm="10" md="8" xl="7">
    <AppView v-if="item" :item="item" @tag-click="searchTagGlobal($event)" />
  </v-col>
</template>

<script>
import { fetchItemBySlug } from '@/services/client.apps'
import { searchGlobalMixin } from '@/mixins/searchMixin'

export default {
  mixins: [searchGlobalMixin],
  data() {
    return {
      item: null,
      meta: {
        title: 'Apps',
        description: ''
      }
    }
  },
  metaInfo() {
    const title = this.meta.title
    const description = this.meta.description
    return {
      titleTemplate: `${title} | %s`,
      meta: [
        {
          vmid: 'desc-apps',
          name: 'description',
          content: description
        }
      ]
    }
  },
  async created() {
    try {
      const item = await fetchItemBySlug(this.$route.params.slug)
      this.item = item
      this.meta.title = item.title
      this.meta.description = item.description
    } catch {
      this.$router.push({ name: '404' })
    }
  }
}
</script>
