<template>
  <v-row class="py-6" justify="center" no-gutters>
    <v-col class="text-center text-uppercase wide" cols="10">
      <h3>{{ title }}</h3>
      <v-icon>{{ mdiMenuDown }}</v-icon>
    </v-col>

    <v-col cols="10" lg="6" xl="5">
      <v-form @submit.prevent="searchGlobal(search)">
        <v-text-field
          v-model="search"
          :append-outer-icon="mdiMagnify"
          clearable
          label="Type search terms and hit <Enter>"
          solo
          @keyup.enter="submit"
        />
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import { mdiMagnify, mdiMenuDown } from '@mdi/js'
import { searchGlobalMixin } from '@/mixins/searchMixin'

export default {
  mixins: [searchGlobalMixin],
  data() {
    return {
      mdiMagnify,
      mdiMenuDown,
      title: 'Explore ICJIA Research Hub',
      search: ''
    }
  }
}
</script>
