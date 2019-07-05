<template>
  <BaseSection :title="title" href="/docs/">
    <v-layout justify-center>
      <v-flex xs12 sm10 md8>
        <v-layout row wrap>
          <v-flex xs12 sm4 v-for="(item, i) in items" :key="i">
            <v-container class="pb-0">
              <a :href="`/docs/${item.ref}`" target="_blank" rel="noreferrer">
                <h2 class="mb-5 light">{{ item.title }}</h2>
              </a>
              <p class="resource-item">{{ item.body }}</p>
            </v-container>
            <v-divider class="hidden-sm-and-up" />
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </BaseSection>
</template>

<script>
const BaseSection = () => import('@/components/BaseSection')

export default {
  components: {
    BaseSection
  },
  data() {
    return {
      title: 'documentation',
      items: [
        {
          title: 'User Guide',
          body:
            'New to the Research Hub? Read to find out more about navigating \
            the Research Hub like a pro.',
          ref: 'guide/'
        },
        {
          title: 'API Reference',
          body:
            'Learn how to use the Research Hub API to obtain data, analyze \
            them, and develop awesome applications.',
          ref: 'dev-guide/api.html'
        },
        {
          title: 'Contributing Guidelines',
          body:
            'Need help! Find out how to make contributions to the Research \
            Hub and have your work recognized.',
          ref: 'dev-guide/contributing.html'
        }
      ]
    }
  }
}
</script>

<style scoped>
.docs-item {
  font-size: 1.2em;
}
</style>
