<template>
  <v-col class="mx-auto" cols="12" sm="10" lg="8" xl="7">
    <DatasetView
      v-if="item"
      :downloader="downloader"
      :item="item"
      @tag-click="searchTagGlobal($event)"
    />
  </v-col>
</template>

<script>
import { fetchItemBySlug } from '@/services/client.datasets'
import { searchGlobalMixin } from '@/mixins/searchMixin'
const DatasetView = () => import('icjia-research-lib').then(m => m.DatasetView)

export default {
  components: {
    DatasetView
  },
  mixins: [searchGlobalMixin],
  data() {
    return {
      item: null,
      meta: {
        title: 'Datasets',
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
          vmid: 'desc-datasets',
          name: 'description',
          content: `${description}`
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
  },
  methods: {
    async downloader() {
      const { hash, ext } = this.item.datafile
      window.open(`/files/${hash}${ext}`, '_blank')
    }
  }
}
</script>
