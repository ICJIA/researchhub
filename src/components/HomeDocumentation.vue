<template>
  <BaseSection :href="$options.static.docsPath" title="documentation">
    <v-col class="mx-auto" cols="12" sm="10" lg="8" xl="7">
      <v-row>
        <v-col
          v-for="(item, i) in $options.static.items"
          :key="i"
          cols="12"
          sm="4"
        >
          <div class="px-4">
            <a :href="item.ref" target="_blank" rel="noreferrer">
              <h2 class="font-weight-light mb-10">{{ item.title }}</h2>
            </a>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <p class="font-lato pb-4" v-html="item.body"></p>
            <v-divider
              v-if="i < $options.static.items.length - 1"
              class="hidden-sm-and-up"
            />
          </div>
        </v-col>
      </v-row>
    </v-col>
  </BaseSection>
</template>

<script>
const BaseSection = () => import('@/components/BaseSection')
const docsPath = process.env.BASE_URL + 'docs'

export default {
  components: {
    BaseSection
  },
  static: {
    docsPath,
    items: [
      {
        title: 'User Guide',
        body:
          'New to <em>ICJIA Research Hub</em>? Learn how to navigate it \
            and find criminal justice data & research most relevant to \
            your interests.',
        ref: docsPath + '/guide/'
      },
      {
        title: 'Developer Guide',
        body:
          'For those interested in the technical details of \
            <em>ICJIA Research Hub</em> and more.',
        ref: docsPath + '/dev-guide/'
      },
      {
        title: 'FAQ',
        body:
          'Find answers to frequently asked questions about \
            <em>ICJIA Research Hub</em>.',
        ref: docsPath + '/guide/faq.html'
      }
    ]
  }
}
</script>
