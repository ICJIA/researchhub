<template>
  <BaseSection v-if="articles" :title="title" :to="to">
    <v-carousel>
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
          <v-layout align-center justify-center fill-height>
            <v-flex xs10 sm8 lg6>
              <h1 class="article-title">{{ article.title }}</h1>
            </v-flex>
          </v-layout>
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
.v-image__image:hover {
  background-color: grey;
  background-image: none;
}

.article-title {
  color: white;
  text-align: center;
}
</style>
