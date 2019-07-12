<template>
  <v-container>
    <v-layout justify-center>
      <v-flex xs12 sm10 md8>
        <RHDatasetView
          v-if="item"
          :item="item"
          :downloader="downloader"
          @tag-click="searchGlobal($event)"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { saveAs } from 'file-saver'
import { fetchItemBySlug } from '@/services/client.datasets'
import { searchGlobalMixin } from '@/mixins/searchMixin'
const RHDatasetView = () =>
  import('icjia-research-lib/lib/umd').then(lib => lib.DatasetView)

export default {
  name: 'DatasetView',
  components: {
    RHDatasetView
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
    const item = await fetchItemBySlug(this.$route.params.slug)
    this.item = item
    this.meta.title = item.title
    this.meta.description = item.description
  },
  methods: {
    async downloader() {
      const file = this.item.datafile
      const url = `${process.env.VUE_APP_API_BASE_URL}/${file.url}`
      saveAs(url, decodeURI(file.name))
    }
  }
}
</script>
