<template>
  <BaseSection v-if="apps" title="apps" :home="true" to="apps">
    <v-col class="mx-auto" cols="12" sm="10" lg="8" xl="7">
      <v-row justify="center">
        <v-col v-for="(app, i) in apps" :key="i" cols="12" md="4">
          <AppCard
            v-if="app"
            :horizontal="$vuetify.breakpoint.smOnly"
            :item="app"
            @tag-click="searchTagGlobal($event)"
          />
        </v-col>
      </v-row>
    </v-col>
  </BaseSection>
</template>

<script>
import { mapGetters } from 'vuex'
import { searchGlobalMixin } from '@/mixins/searchMixin'
const AppCard = () => import('researchhub-lib').then(m => m.AppCard)
const BaseSection = () => import('@/components/BaseSection')

export default {
  components: {
    AppCard,
    BaseSection
  },
  mixins: [searchGlobalMixin],
  computed: {
    ...mapGetters('apps', {
      apps: 'getLatest'
    })
  },
  async created() {
    if (this.$store.state.apps.info.length === 0) {
      await this.$store.dispatch('apps/fetchInfo')
    }
  }
}
</script>
