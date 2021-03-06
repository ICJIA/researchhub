<template>
  <div>
    <v-col class="mx-auto" cols="12" sm="10" lg="8" xl="7">
      <DatasetView
        v-if="item"
        :downloader="downloader"
        :item="item"
        @tag-click="searchTagGlobal($event)"
      />
    </v-col>

    <TheSocialSharing v-if="item" :show-always="true" :title="meta.title" />
  </div>
</template>

<script>
import { hostBaseURL, meta, publicPath } from '@/config'
import { fetchItemBySlug } from '@/services/client.datasets'
import { searchGlobalMixin } from '@/mixins/searchMixin'
const DatasetView = () => import('researchhub-lib').then(m => m.DatasetView)
const TheSocialSharing = () => import('@/components/TheSocialSharing')

export default {
  metaInfo() {
    const { title, description } = this.meta

    return {
      titleTemplate: `${title} | %s`,
      meta: [
        {
          property: 'og:url',
          content: `${hostBaseURL}${publicPath}${this.$route.path.slice(1)}`
        },
        {
          property: 'og:title',
          content: `${title} | ${meta.title}`
        },
        {
          property: 'og:description',
          content: `${description}`
        }
      ]
    }
  },
  components: {
    DatasetView,
    TheSocialSharing
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
  async created() {
    try {
      const slug = this.$route.params.slug
      let item

      if (this.$store.getters['datasets/isCached'](slug)) {
        item = this.$store.getters['datasets/getCached'](slug)
      } else {
        item = await fetchItemBySlug(slug)
        this.$store.dispatch('datasets/cacheInfo', { slug, item })
      }

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
      window.open(process.env.BASE_URL + `files/${hash}${ext}`, '_blank')
    }
  }
}
</script>
