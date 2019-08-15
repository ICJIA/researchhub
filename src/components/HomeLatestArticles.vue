<template>
  <BaseSection v-if="articles" :title="title" :to="to">
    <v-carousel hide-delimiters show-arrows-on-hover>
      <router-link
        v-for="(article, i) in articles"
        :key="i"
        :to="`/articles/${article.slug}`"
        style="text-decoration: none"
      >
        <v-carousel-item
          :src="article.splash"
          gradient="to top right, rgba(100,115,201,.4), rgba(25,32,72,.4)"
        >
          <v-row class="fill-height" align="center" justify="center">
            <v-col cols="10" sm="6" lg="4">
              <h1 class="article-title">{{ article.title }}</h1>
            </v-col>
          </v-row>
        </v-carousel-item>
      </router-link>
    </v-carousel>
  </BaseSection>
</template>

<script>
import { mapState } from 'vuex'
const BaseSection = () => import('@/components/BaseSection')

export default {
  components: {
    BaseSection
  },
  data() {
    return {
      title: 'Latest articles',
      to: 'articles'
    }
  },
  computed: {
    ...mapState('articles', {
      articles: 'carouselInfo'
    })
  },
  async created() {
    if (!this.articles || this.articles.length === 0) {
      await this.$store.dispatch('articles/fetchCarouselInfo')
    }
  }
}
</script>

<style scoped>
.article-title {
  color: white;
  text-align: center;
  text-shadow: 1px 2px #466c8c;
}
</style>
