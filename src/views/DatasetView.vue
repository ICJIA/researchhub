<template>
  <v-container>
    <v-layout justify-center>
      <v-flex xs12 sm10 md8>
        <RHDatasetView
          v-if="item"
          :item="item"
          :downloader="downloadData"
          @tag-click="searchGlobal($event)"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import FileSaver from 'file-saver'
import { fetchItemBySlug, fetchDataById } from '@/services/client.datasets'
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
    async downloadData(id, isDataCsv) {
      const res = await fetchDataById(id, isDataCsv)

      if (isDataCsv) {
        const blob = new Blob([res.datacsv], {
          type: 'text/csv;charset=utf-8'
        })
        FileSaver.saveAs(blob, `${res.datafilename}.csv`)
      } else {
        const url = `${process.env.VUE_APP_API_BASE_URL}/${res.datafile.url}`
        FileSaver.saveAs(url, decodeURI(res.datafile.name))
      }
    }
  }
}
</script>
