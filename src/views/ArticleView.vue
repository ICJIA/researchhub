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
import { fetchItemBySlug } from '@/services/client.articles'
import { searchGlobalMixin } from '@/mixins/searchMixin'
const ArticleSocialSharing = () => import('@/components/ArticleSocialSharing')
const ArticleView = () => import('icjia-research-lib').then(m => m.ArticleView)
const TheProgessBar = () => import('@/components/TheProgressBar')

export default {
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
      const slug = this.$route.params.slug
      let item

      if (this.$store.getters['articles/isCached'](slug)) {
        item = this.$store.getters['articles/getCached'](slug)
      } else {
        item = await fetchItemBySlug(slug)
        this.$store.dispatch('articles/cacheInfo', { slug, item })
      }

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
      const { hash, ext } = this.item[`${type}file`]
      window.open(`/files/${hash}${ext}`, '_blank')
    },
    searchAuthorOnArticleSearch(e) {
      const search = e.target.textContent || e.target.innerText
      this.$router.push({ name: 'article-search', params: { search } })
    }
  }
}
</script>
