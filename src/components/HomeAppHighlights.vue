<template>
  <BaseSection v-if="apps" :title="title" :home="true" :to="to">
    <v-container pt-0>
      <v-layout row wrap justify-center>
        <v-flex xs12 sm6 md4 lg3 v-for="(app, i) in apps" :key="i">
          <RHAppCard v-if="app" :item="app" />
        </v-flex>
      </v-layout>
    </v-container>
  </BaseSection>
</template>

<script>
import { mapGetters } from 'vuex'
const BaseSection = () => import('@/components/BaseSection')
const RHAppCard = () =>
  import('icjia-research-lib/lib/umd').then(lib => lib.AppCard)

export default {
  components: {
    BaseSection,
    RHAppCard
  },
  data() {
    return {
      title: 'app highlights',
      to: 'apps'
    }
  },
  computed: {
    ...mapGetters('apps', {
      apps: 'highlights'
    })
  },
  async created() {
    if (this.$store.state.apps.data.length === 0) {
      await this.$store.dispatch('apps/fetchInfo')
    }
  }
}
</script>
