<template>
  <transition name="fade">
    <social-sharing
      v-scroll="onScroll"
      v-show="fab"
      :url="url"
      :title="title"
      inline-template
    >
      <v-layout class="fixed-left" align-start column>
        <network
          network="facebook"
          style="background-color:#305891; padding:0 7px; cursor:pointer; border-bottom:1px solid #fff"
        >
          <v-icon small style="color:white;">fa-facebook-square</v-icon>
        </network>
        <network
          network="linkedin"
          style="background-color:#4498c8; padding:0 7px; cursor:pointer; border-bottom:1px solid #fff"
        >
          <v-icon small style="color:white;">fa-linkedin-square</v-icon>
        </network>
        <network
          network="twitter"
          style="background-color:#2ca8d2; padding:0 7px; cursor:pointer; border-bottom:1px solid #fff"
        >
          <v-icon small style="color:white;">fa-twitter-square</v-icon>
        </network>
      </v-layout>
    </social-sharing>
  </transition>
</template>

<script>
export default {
  props: {
    url: String,
    title: String
  },
  data() {
    return {
      fab: false
    }
  },
  methods: {
    onScroll(e) {
      if (typeof window === 'undefined') return
      const top = window.pageYOffset || e.target.scrollTop || 0
      this.fab = top > 50
    }
  }
}
</script>

<style scoped>
.fixed-left {
  position: fixed;
  top: 75%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
