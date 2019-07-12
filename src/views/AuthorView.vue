<template>
  <v-container>
    <v-layout justify-center>
      <v-flex xs12 sm10 md8>
        <RHAuthorView
          v-if="item"
          :item="item"
          :getArticleInfo="getArticleInfo"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {
  fetchItemCardById,
  fetchItemsByAuthor
} from '@/services/client.articles'
const RHAuthorView = () =>
  import('icjia-research-lib/lib/umd').then(lib => lib.AuthorView)

export default {
  name: 'AuthorView',
  components: {
    RHAuthorView
  },
  data() {
    return {
      item: null,
      meta: {
        title: 'Authors',
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
          vmid: 'desc-authors',
          name: 'description',
          content: `${description}`
        }
      ]
    }
  },
  async created() {
    if (this.$store.state.authors.data.length === 0) {
      await this.$store.dispatch('authors/fetchData')
    }
    const slug = this.$route.params.slug
    const item = this.$store.state.authors.data.filter(item => {
      return item.slug === slug
    })[0]

    item.articles = await fetchItemsByAuthor(item.title)

    this.item = item
    this.meta.title = item.title
    this.meta.description = item.description
  },
  methods: {
    async getArticleInfo(id) {
      return await fetchItemCardById(id)
    }
  }
}
</script>
