<template>
  <div>
    <v-col class="mx-auto" cols="12" sm="10" md="8" xl="7">
      <AppView v-if="item" :item="item" @tag-click="searchTagGlobal($event)" />
    </v-col>

    <TheSocialSharing v-if="item" :show-always="true" :title="meta.title" />
  </div>
</template>

<script>
import { fetchItemBySlug } from '@/services/client.apps'
import { searchGlobalMixin } from '@/mixins/searchMixin'
const AppView = () => import('icjia-research-lib').then(m => m.AppView)
const TheSocialSharing = () => import('@/components/TheSocialSharing')

export default {
  metaInfo() {
    const { title, description } = this.meta

    return {
      titleTemplate: `${title} | %s`,
      meta: [
        {
          vmid: 'og:url',
          property: 'og:url',
          content: window.location.href
        },
        {
          vmid: 'og:title',
          property: 'og:title',
          content: `${title} | Research Hub`
        },
        {
          vmid: 'desc-apps',
          name: 'description',
          property: 'og:description',
          content: description
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
        description: ''
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
    } catch {
      this.$router.push({ name: '404' })
    }
  }
}
</script>
