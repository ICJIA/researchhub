<template>
  <Footer :agency="$options.static.agency" :github="$options.static.github" />
</template>

<script>
const Footer = () => import('icjia-research-lib').then(m => m.Footer)

export default {
  components: {
    Footer
  },
  static: {
    agency: {
      name: 'Illinois Criminal Justice Information Authority',
      url: 'http://www.icjia.state.il.us/'
    },
    github: {
      url: 'https://github.com/icjia/icjia-research',
      version: '1.0.0-beta.7'
    }
  }
}
</script>
