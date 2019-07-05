<template>
  <div>
    <TheProgessBar />

    <RHArticleView
      v-if="item"
      :item="item"
      :downloader="downloadPDF"
      @tag-click="searchGlobal($event)"
    />

    <ArticleSocialSharing
      v-if="item && baseUrl"
      :url="baseUrl + '/' + item.slug"
      :title="item.title"
    />
  </div>
</template>

<script>
import FileSaver from 'file-saver'
import { fetchItemBySlug, fetchFileInfoById } from '@/services/client.articles'
import { searchGlobalMixin } from '@/mixins/searchMixin'
const ArticleSocialSharing = () => import('@/components/ArticleSocialSharing')
const RHArticleView = () =>
  import('icjia-research-lib/lib/umd').then(lib => lib.ArticleView)
const TheProgessBar = () => import('@/components/TheProgressBar')

export default {
  name: 'ArticleView',
  components: {
    ArticleSocialSharing,
    RHArticleView,
    TheProgessBar
  },
  mixins: [searchGlobalMixin],
  data() {
    return {
      item: null,
      baseUrl: '',
      meta: {
        title: 'Articles',
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
          vmid: 'desc-articles',
          name: 'description',
          content: `${description}`
        }
      ]
    }
  },
  async created() {
    const item = await fetchItemBySlug(this.$route.params.slug)
    this.baseUrl = await window.location.origin
    this.item = item
    this.meta.title = item.title
    this.meta.description = item.abstract
  },
  methods: {
    async downloadPDF(id, type) {
      const res = await fetchFileInfoById(id, type)
      let file

      if (type === 'report') {
        file = res.reportpdf
      } else if (type === 'slides') {
        file = res.slidsepdf
      }

      const url = `${process.env.VUE_APP_API_BASE_URL}/${file.url}`
      FileSaver.saveAs(url, decodeURI(file.name))
    }
  }
}
</script>
