<template>
  <div>
    <v-col class="mx-auto" cols="12" sm="10" md="8" xl="7">
      <AppView v-if="item" :item="item" @tag-click="searchTagGlobal($event)" />
    </v-col>

    <TheSocialSharing v-if="item" :show-always="true" :title="meta.title" />
  </div>
</template>

<script>
import { hostBaseURL, meta, publicPath } from '@/config'
import { fetchItemBySlug } from '@/services/client.apps'
import { searchGlobalMixin } from '@/mixins/searchMixin'
const AppView = () => import('researchhub-lib').then(m => m.AppView)
const TheSocialSharing = () => import('@/components/TheSocialSharing')

const getImageURL = ({ _id, image }) => {
  const ext = image.split('data:image/')[1].split(';')[0]
  const base = `${hostBaseURL}${publicPath}images`
  return `${base}/${_id}-image.${ext}`
}

export default {
  metaInfo() {
    const { title, description, image } = this.meta

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
          content: description
        },
        {
          property: 'og:image',
          content: image
        }
      ]
    }
  },
  components: {
    AppView,
    TheSocialSharing
  },
  mixins: [searchGlobalMixin],
  data() {
    return {
      item: null,
      meta: {
        title: 'Apps',
        description: '',
        image: ''
      }
    }
  },
  async created() {
    try {
      const slug = this.$route.params.slug
      let item

      if (this.$store.getters['apps/isCached'](slug)) {
        item = this.$store.getters['apps/getCached'](slug)
      } else {
        item = await fetchItemBySlug(slug)
        this.$store.dispatch('apps/cacheInfo', { slug, item })
      }

      this.item = item
      this.meta.title = item.title
      this.meta.description = item.description
      this.meta.image = getImageURL(item)
    } catch {
      this.$router.push({ name: '404' })
    }
  }
}
</script>
