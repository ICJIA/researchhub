<template>
  <RHBaseToolbar :menu="true">
    <template v-slot:toolbarItems>
      <v-btn v-for="view in views" :key="view" :to="`/${view}`" flat>
        <template>{{ view }}</template>
      </v-btn>

      <v-btn href="/docs/" target="_blank" flat>documentation</v-btn>
    </template>

    <template v-slot:toolbarDrawerItems>
      <v-list-tile v-for="(view, i) in views" :key="i" :to="`/${view}`">
        <v-list-tile-title>{{ view }}</v-list-tile-title>
      </v-list-tile>

      <v-list-tile href="/docs/">
        <v-list-tile-title>documentation</v-list-tile-title>
      </v-list-tile>
    </template>
  </RHBaseToolbar>
</template>

<script>
const RHBaseToolbar = () =>
  import('icjia-research-lib/lib/umd').then(lib => lib.BaseToolbar)

export default {
  components: {
    RHBaseToolbar
  },
  data() {
    return {
      views: ['about', 'apps', 'articles', 'datasets']
    }
  }
}
</script>
