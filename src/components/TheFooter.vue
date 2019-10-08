<template>
  <Footer :agency="$options.static.agency" :github="$options.static.github" />
</template>

<script>
import { agency, github } from '@/config'
const Footer = () => import('icjia-research-lib').then(m => m.Footer)

export default {
  components: {
    Footer
  },
  static: {
    agency,
    github
  }
}
</script>
