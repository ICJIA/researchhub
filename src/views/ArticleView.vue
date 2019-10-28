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

    <TheSocialSharing v-if="item" :title="meta.title" />
  </div>
</template>

<script>
import { meta } from '@/config'
import { fetchItemBySlug } from '@/services/client.articles'
import prerenderMixin from '@/mixins/prerenderMixin'
import { searchGlobalMixin } from '@/mixins/searchMixin'
const ArticleView = () => import('icjia-research-lib').then(m => m.ArticleView)
const TheProgessBar = () => import('@/components/TheProgressBar')
const TheSocialSharing = () => import('@/components/TheSocialSharing')

const getImageURL = ({ _id, splash }) => {
  const ext = splash.split('data:image/')[1].split(';')[0]
  const base = window.location.origin + process.env.BASE_URL + 'images'
  return `${base}/${_id}-splash.${ext}`
}

export default {
  metaInfo() {
    const { title, description, image } = this.meta

    return {
      titleTemplate: `${title} | %s`,
      meta: [
        {
          property: 'og:url',
          content: window.location.href
        },
        {
          property: 'og:type',
          content: 'article'
        },
        {
          property: 'og:title',
          content: `${title} | ${meta.title}`
        },
        {
          property: 'og:description',
          content: `${description}`
        },
        {
          property: 'og:image',
          content: image
        }
      ]
    }
  },
  components: {
    ArticleView,
    TheProgessBar,
    TheSocialSharing
  },
  mixins: [prerenderMixin, searchGlobalMixin],
  data() {
    return {
      item: null,
      meta: {
        title: 'Articles',
        description: '',
        image: ''
      }
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

      this.item = item
      this.meta.title = item.title
      this.meta.description = item.abstract
      this.meta.image = getImageURL(item)
    } catch {
      this.$router.push({ name: '404' })
    }
  },
  methods: {
    async downloader(type) {
      const { hash, ext } = this.item[`${type}file`]
      window.open(process.env.BASE_URL + `files/${hash}${ext}`, '_blank')
    },
    searchAuthorOnArticleSearch(e) {
      const search = e.target.textContent || e.target.innerText
      this.$router.push({ name: 'article-search', params: { search } })
    }
  }
}
</script>
