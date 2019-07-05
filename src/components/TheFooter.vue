<template>
  <RHFooter :agency="agency" :github="github" />
</template>

<script>
const RHFooter = () =>
  import('icjia-research-lib/lib/umd').then(lib => lib.Footer)

export default {
  components: {
    RHFooter
  },
  data() {
    return {
      agency: {
        name: 'Illinois Criminal Justice Information Authority',
        url: 'http://www.icjia.state.il.us/'
      },
      github: {
        url: '/',
        version: '0.1.0'
      }
    }
  }
}
</script>
