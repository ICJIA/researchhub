<template>
  <v-progress-linear v-model="progress" class="screen-top" height="3" />
</template>

<script>
export default {
  data() {
    return {
      progress: 0
    }
  },
  created() {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      let scrollPos = window.scrollY
      let docHeight = document.documentElement.scrollHeight
      let winHeight = window.innerHeight

      this.progress = (100 * scrollPos) / (docHeight - winHeight)
    }
  }
}
</script>

<style scoped>
.screen-top {
  position: fixed;
  left: 0;
  top: 0;
  margin: 0;
}
</style>
