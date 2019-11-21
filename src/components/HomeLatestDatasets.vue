<template>
  <BaseSection v-if="datasets" title="datasets" :home="true" to="datasets">
    <v-col class="mx-auto" cols="12" sm="10" lg="8" xl="7">
      <v-row justify="center">
        <v-col v-for="(dataset, i) in datasets" :key="i" cols="12" md="6">
          <DatasetCard
            v-if="dataset"
            :item="dataset"
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
const BaseSection = () => import('@/components/BaseSection')
const DatasetCard = () => import('researchhub-lib').then(m => m.DatasetCard)

export default {
  components: {
    BaseSection,
    DatasetCard
  },
  mixins: [searchGlobalMixin],
  computed: {
    ...mapGetters('datasets', {
      datasets: 'getLatest'
    })
  },
  async created() {
    if (this.$store.state.datasets.info.length === 0) {
      await this.$store.dispatch('datasets/fetchInfo')
    }
  }
}
</script>
