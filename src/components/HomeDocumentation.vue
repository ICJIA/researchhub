<template>
  <BaseSection href="/docs/" :title="title">
    <v-col class="mx-auto" cols="12" sm="10" lg="8" xl="7">
      <v-row>
        <v-col v-for="(item, i) in items" :key="i" cols="12" sm="4">
          <div class="px-4">
            <a :href="`/docs/${item.ref}`" target="_blank" rel="noreferrer">
              <h2 class="mb-10 light">{{ item.title }}</h2>
            </a>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <p class="font-lato pb-4" v-html="item.body"></p>
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
            'New to <em>ICJIA Research Hub</em>? Learn how to navigate it \
            and find criminal justice data & research most relevant to \
            your interests.',
          ref: 'guide/'
        },
        {
          title: 'Developer Guide',
          body:
            'For those interested in the technical details of \
            <em>ICJIA Research Hub</em> and more.',
          ref: 'dev-guide/'
        },
        {
          title: 'FAQ',
          body:
            'Find answers to frequently asked questions about \
            <em>ICJIA Research Hub</em>.',
          ref: 'guide/faq.html'
        }
      ]
    }
  }
}
</script>
