<template>
  <BaseToolbar :logo-path="$options.static.logoPath">
    <template #toolbarItems>
      <v-btn
        v-for="view in $options.static.views"
        :key="view"
        :to="`/${view}`"
        text
      >
        <template>{{ view }}</template>
      </v-btn>

      <v-btn :href="$options.static.docsPath" target="_blank" text
        >documentation</v-btn
      >
    </template>

    <template #toolbarDrawerItems>
      <v-list-item
        v-for="(view, i) in $options.static.views"
        :key="i"
        :to="`/${view}`"
      >
        <v-list-item-title>{{ view }}</v-list-item-title>
      </v-list-item>

      <v-list-item :href="$options.static.docsPath">
        <v-list-item-title>documentation</v-list-item-title>
      </v-list-item>
    </template>
  </BaseToolbar>
</template>

<script>
const BaseToolbar = () => import('researchhub-lib').then(m => m.BaseToolbar)

export default {
  components: {
    BaseToolbar
  },
  static: {
    docsPath: process.env.BASE_URL + 'docs',
    logoPath: process.env.BASE_URL + 'icjia-logo.png',
    views: ['about', 'apps', 'articles', 'datasets']
  }
}
</script>
