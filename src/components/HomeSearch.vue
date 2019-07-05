<template>
  <v-container>
    <v-layout justify-center row wrap>
      <v-flex xs12 class="text-xs-center uppercase">
        <h3>{{ title }}</h3>
        <v-icon>fa-caret-down</v-icon>
      </v-flex>

      <v-flex xs12 md9 xl6>
        <v-form @submit.prevent="searchGlobal(search)">
          <v-text-field
            @keyup.enter="submit"
            v-model="search"
            label="Type search terms and hit <Enter>"
            :clearable="true"
            append-outer-icon="search"
            solo
          />
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
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
