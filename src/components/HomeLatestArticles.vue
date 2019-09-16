<template>
  <BaseSection v-if="articles" :title="title" :to="to">
    <v-carousel cycle hide-delimiters>
      <router-link
        v-for="(article, i) in articles"
        :key="i"
        aria-label="Latest Articles item"
        class="text-none"
        :to="`/articles/${article.slug}`"
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
      title: 'articles',
      to: 'articles'
    }
  },
  computed: {
    ...mapState('articles', {
      articles: 'infoCarousel'
    })
  },
  async created() {
    if (!this.articles || this.articles.length === 0) {
      await this.$store.dispatch('articles/fetchInfoCarousel')
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
