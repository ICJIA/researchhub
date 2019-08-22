<template>
  <BaseSection v-if="apps" :title="title" :home="true" :to="to">
    <v-col class="mx-auto" cols="12" md="10" lg="8" xl="7">
      <v-row justify="center">
        <v-col v-for="(app, i) in apps" :key="i" cols="12" sm="10" md="4">
          <AppCard
            v-if="app"
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
const AppCard = () => import('icjia-research-lib').then(m => m.AppCard)
const BaseSection = () => import('@/components/BaseSection')

export default {
  components: {
    AppCard,
    BaseSection
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
