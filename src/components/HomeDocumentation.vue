<template>
  <BaseSection href="/docs/" :title="title">
    <v-col class="mx-auto" cols="12" sm="10" lg="8" xl="7">
      <v-row>
        <v-col v-for="(item, i) in items" :key="i" cols="12" sm="4">
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
            'New to the Research Hub? Click here and find out more about \
            navigating the Research Hub like a pro.',
          ref: 'guide/'
        },
        {
          title: 'Developer Guide',
          body:
            'For those interested in the technical details of the Research Hub \
            and more.',
          ref: 'dev-guide/'
        },
        {
          title: 'FAQ',
          body:
            'Find answers to some freqntly asked questions about ICJIA Research Hub.',
          ref: 'dev-guide/contributing.html'
        }
      ]
    }
  }
}
</script>
