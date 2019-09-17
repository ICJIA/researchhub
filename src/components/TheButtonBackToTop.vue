<template>
  <v-fab-transition>
    <v-btn
      v-show="fab"
      v-scroll="onScroll"
      aria-label="Back to top"
      bottom
      color="rgba(70, 108, 140, 0.8)"
      dark
      fab
      fixed
      right
      @click="toTop"
    >
      <v-icon color="white">{{ mdiChevronUp }}</v-icon>
    </v-btn>
  </v-fab-transition>
</template>

<script>
import { mdiChevronUp } from '@mdi/js'

export default {
  data() {
    return {
      fab: false,
      mdiChevronUp
    }
  },
  methods: {
    onScroll(e) {
      if (typeof window === 'undefined') return
      const top = window.pageYOffset || e.target.scrollTop || 0
      this.fab = top > 100
    },
    toTop() {
      this.$vuetify.goTo(0)
    }
  }
}
</script>
