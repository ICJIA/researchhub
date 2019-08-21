<template>
  <Footer :agency="agency" :github="github" />
</template>

<script>
const Footer = () => import('icjia-research-lib').then(m => m.Footer)

export default {
  components: {
    Footer
  },
  data() {
    return {
      agency: {
        name: 'Illinois Criminal Justice Information Authority',
        url: 'http://www.icjia.state.il.us/'
      },
      github: {
        url: 'https://github.com/icjia/icjia-research',
        version: '0.4.0'
      }
    }
  }
}
</script>
