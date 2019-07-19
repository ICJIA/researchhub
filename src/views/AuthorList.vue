<template>
  <v-container mb-5>
    <v-layout row wrap justify-center>
      <v-flex xs12 sm8 lg4>
        <v-list subheader class="pa-0">
          <v-subheader class="font-lato">{{ listHeader }}</v-subheader>

          <template v-for="(item, i) in items">
            <v-divider :key="`divider${i}`"></v-divider>
            <v-list-tile :key="`author${i}`" :to="`/authors/${item.slug}`">
              <v-list-tile-content class="text-xs-center font-lato">
                <v-list-tile-title v-text="item.title"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AuthorList',
  data() {
    return {
      listHeader: 'ICJIA Research Hub Article authors'
    }
  },
  computed: {
    ...mapState('authors', {
      items: 'data'
    })
  },
  async mounted() {
    if (this.$store.state.authors.data.length === 0) {
      await this.$store.dispatch('authors/fetchData')
    }
  }
}
</script>
