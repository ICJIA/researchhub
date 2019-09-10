<template>
  <v-row class="py-6" justify="center" no-gutters>
    <v-col class="text-center wide uppercase" cols="10">
      <h3>{{ title }}</h3>
      <v-icon>mdi-menu-down</v-icon>
    </v-col>

    <v-col cols="10" lg="6" xl="5">
      <v-form @submit.prevent="searchGlobal(search)">
        <v-text-field
          v-model="search"
          append-outer-icon="mdi-magnify"
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
import { searchGlobalMixin } from '@/mixins/searchMixin'

export default {
  mixins: [searchGlobalMixin],
  data() {
    return {
      title: 'Explore ICJIA Research Hub',
      search: ''
    }
  }
}
</script>
