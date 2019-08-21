<template>
  <div>
    <TheProgessBar />

    <ArticleView
      v-if="item"
      :item="item"
      :downloader="downloader"
      @tag-click="searchTagGlobal($event)"
      @author-click="searchAuthorOnArticleSearch($event)"
    />

    <ArticleSocialSharing
      v-if="item && baseUrl"
      :url="baseUrl + '/' + item.slug"
      :title="item.title"
    />
  </div>
</template>

<script>
import { saveAs } from 'file-saver'
import { fetchItemBySlug } from '@/services/client.articles'
import { searchGlobalMixin } from '@/mixins/searchMixin'
const ArticleSocialSharing = () => import('@/components/ArticleSocialSharing')
const ArticleView = () => import('icjia-research-lib').then(m => m.ArticleView)
const TheProgessBar = () => import('@/components/TheProgressBar')

export default {
  name: 'ArticleView',
  components: {
    ArticleSocialSharing,
    ArticleView,
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
    try {
      const item = await fetchItemBySlug(this.$route.params.slug)
      this.baseUrl = await window.location.origin
      this.item = item
      this.meta.title = item.title
      this.meta.description = item.abstract
    } catch {
      this.$router.push({ name: '404' })
    }
  },
  methods: {
    async downloader(type) {
      const file = this.item[`${type}file`]
      const url = `${process.env.VUE_APP_API_BASE_URL}/${file.url}`
      saveAs(url, decodeURI(file.name))
    },
    searchAuthorOnArticleSearch(e) {
      const search = e.target.textContent || e.target.innerText
      this.$router.push({ name: 'article-search', params: { search } })
    }
  }
}
</script>
