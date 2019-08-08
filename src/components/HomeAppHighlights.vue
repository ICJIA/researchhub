<template>
  <BaseSection v-if="apps" :title="title" :home="true" :to="to">
    <v-container pt-0>
      <v-layout row wrap justify-center>
        <v-flex xs12 sm10 md6 lg4 xl3 v-for="(app, i) in apps" :key="i">
          <RHAppCard
            v-if="app"
            :item="app"
            @tag-click="searchTagGlobal($event)"
          />
        </v-flex>
      </v-layout>
    </v-container>
  </BaseSection>
</template>

<script>
import { mapGetters } from 'vuex'
import { searchGlobalMixin } from '@/mixins/searchMixin'
const BaseSection = () => import('@/components/BaseSection')
const RHAppCard = () =>
  import('icjia-research-lib/lib/umd').then(lib => lib.AppCard)

export default {
  components: {
    BaseSection,
    RHAppCard
  },
  mixins: [searchGlobalMixin],
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
