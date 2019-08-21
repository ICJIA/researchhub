<template>
  <BaseToolbar logoPath="./icjia-logo.png">
    <template v-slot:toolbarItems>
      <v-btn v-for="view in views" :key="view" :to="`/${view}`" text>
        <template>{{ view }}</template>
      </v-btn>

      <v-btn href="/docs/" target="_blank" text>documentation</v-btn>
    </template>

    <template v-slot:toolbarDrawerItems>
      <v-list-item v-for="(view, i) in views" :key="i" :to="`/${view}`">
        <v-list-item-title>{{ view }}</v-list-item-title>
      </v-list-item>

      <v-list-item href="/docs/">
        <v-list-item-title>documentation</v-list-item-title>
      </v-list-item>
    </template>
  </BaseToolbar>
</template>

<script>
const BaseToolbar = () => import('icjia-research-lib').then(m => m.BaseToolbar)

export default {
  components: {
    BaseToolbar
  },
  data() {
    return {
      views: ['about', 'apps', 'articles', 'datasets']
    }
  }
}
</script>
