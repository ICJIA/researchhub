<template>
  <v-col class="mx-auto" cols="12" sm="10" lg="8" xl="7">
    <DatasetView
      v-if="item"
      :item="item"
      :downloader="downloader"
      @tag-click="searchTagGlobal($event)"
    />
  </v-col>
</template>

<script>
import { saveAs } from 'file-saver'
import { fetchItemBySlug } from '@/services/client.datasets'
import { searchGlobalMixin } from '@/mixins/searchMixin'

export default {
  name: 'DatasetView',
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
      const file = this.item.datafile
      const url = `${process.env.VUE_APP_API_BASE_URL}/${file.url}`
      saveAs(url, decodeURI(file.name))
    }
  }
}
</script>
