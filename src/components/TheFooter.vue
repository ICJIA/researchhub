<template>
  <Footer :github="$options.static.github" />
</template>

<script>
import { github } from '@/config'
const Footer = () => import('researchhub-lib').then(m => m.Footer)

export default {
  components: {
    Footer
  },
  static: {
    github
  }
}
</script>
