<template>
  <transition name="fade">
    <social-sharing
      v-show="fab"
      v-scroll="onScroll"
      class="social-sharing"
      :url="url"
      :title="title"
      inline-template
    >
      <div>
        <network style="background-color:#305891;" network="facebook">
          <v-icon
            aria-label="Share to Facebook"
            style="padding:2px 7px; color:white; cursor:pointer;"
            small
          >
            <template>{{ 'mdi-facebook-box' }}</template>
          </v-icon>
        </network>
        <network style="background-color:#4498c8;" network="linkedin">
          <v-icon
            aria-label="Share to LinkedIn"
            style="padding:2px 7px; color:white; cursor:pointer;"
            small
          >
            <template>{{ 'mdi-linkedin-box' }}</template>
          </v-icon>
        </network>
        <network style="background-color:#2ca8d2;" network="twitter">
          <v-icon
            aria-label="Share to Twitter"
            style="padding:2px 7px; color:white; cursor:pointer;"
            small
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
    title: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: ''
    }
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
