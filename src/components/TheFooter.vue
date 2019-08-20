<template>
  <Footer :agency="agency" :github="github" />
</template>

<script>
export default {
  data() {
    return {
      agency: {
        name: 'Illinois Criminal Justice Information Authority',
        url: 'http://www.icjia.state.il.us/'
      },
      github: {
        url: 'https://github.com/icjia/icjia-research',
        version: '0.3.2'
      }
    }
  }
}
</script>
