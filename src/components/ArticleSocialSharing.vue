<template>
  <transition name="fade">
    <social-sharing
      class="social-sharing"
      v-scroll="onScroll"
      v-show="fab"
      :url="url"
      :title="title"
      inline-template
    >
      <div>
        <network network="facebook" style="background-color:#305891;">
          <v-icon
            small
            aria-label="Share to Facebook"
            style="padding:2px 7px; color:white; cursor:pointer;"
          >
            <template>{{ 'mdi-facebook-box' }}</template>
          </v-icon>
        </network>
        <network network="linkedin" style="background-color:#4498c8;">
          <v-icon
            small
            aria-label="Share to LinkedIn"
            style="padding:2px 7px; color:white; cursor:pointer;"
          >
            <template>{{ 'mdi-linkedin-box' }}</template>
          </v-icon>
        </network>
        <network network="twitter" style="background-color:#2ca8d2;">
          <v-icon
            small
            aria-label="Share to Twitter"
            style="padding:2px 7px; color:white; cursor:pointer;"
          >
            <template>{{ 'mdi-twitter-box' }}</template>
          </v-icon>
        </network>
      </div>
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
.social-sharing {
  position: fixed;
  top: 75%;
  width: 30px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
