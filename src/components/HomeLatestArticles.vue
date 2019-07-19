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
          gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.33)"
        >
          <v-layout justify-center>
            <v-flex xs10 sm8>
              <h1
                class="text-xs-center"
                style="color:white; margin:15% 10% 0 10%"
              >
                <template>{{ article.title }}</template>
              </h1>
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
</style>
