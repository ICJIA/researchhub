<template>
  <BaseSection :title="title" href="/docs/">
    <v-col class="mx-auto" cols="12" sm="10" lg="8" xl="7">
      <v-row>
        <v-col cols="12" sm="4" v-for="(item, i) in items" :key="i">
          <div class="px-4">
            <a :href="`/docs/${item.ref}`" target="_blank" rel="noreferrer">
              <h2 class="mb-10 light">{{ item.title }}</h2>
            </a>
            <p class="font-lato pb-4">{{ item.body }}</p>
            <v-divider v-if="i < items.length - 1" class="hidden-sm-and-up" />
          </div>
        </v-col>
      </v-row>
    </v-col>
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
