<template>
  <v-row class="py-4" justify="center">
    <v-col class="text-center wide uppercase pa-0" cols="12">
      <h3>{{ title }}</h3>
      <v-icon>mdi-menu-down</v-icon>
    </v-col>

    <v-col cols="12" md="9" lg="6" xl="5">
      <v-form @submit.prevent="searchGlobal(search)">
        <v-text-field
          @keyup.enter="submit"
          v-model="search"
          label="Type search terms and hit <Enter>"
          :clearable="true"
          append-outer-icon="mdi-magnify"
          solo
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
      title: 'Get started & explore this Research Hub',
      search: ''
    }
  }
}
</script>
