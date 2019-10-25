<template>
  <v-row class="py-6" justify="center" no-gutters>
    <v-col class="text-center text-uppercase wide" cols="10">
      <h3>Explore ICJIA Research Hub</h3>
      <v-icon>{{ $options.static.mdiMenuDown }}</v-icon>
    </v-col>

    <v-col cols="10" lg="6" xl="5">
      <v-form @submit.prevent="searchGlobal(search)">
        <v-text-field
          v-model="search"
          :append-outer-icon="$options.static.mdiMagnify"
          clearable
          label="Search for Research Hub items (by title, date, tags)"
          solo
          @click:append-outer="searchGlobal(search)"
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
      search: ''
    }
  },
  static: {
    mdiMagnify,
    mdiMenuDown
  }
}
</script>
