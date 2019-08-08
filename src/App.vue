<template>
  <v-app>
    <the-toolbar />

    <router-view v-if="alive" />

    <ServerError v-else />

    <the-button-back-to-top />

    <the-footer />
  </v-app>
</template>

<script>
import { healthCheck } from '@/services/client.utils'
const ServerError = () => import('@/components/ServerError')
const TheToolbar = () => import('@/components/TheToolbar')
const TheButtonBackToTop = () => import('@/components/TheButtonBackToTop')
const TheFooter = () => import('@/components/TheFooter')

export default {
  name: 'App',
  metaInfo: {
    title: 'Research Hub',
    meta: [
      {
        name: 'description',
        content:
          'Welcome to the Illinois Crinimal Justice Information Authority \
          (ICJIA) Research Hub. Here you can find various criminal justice \
          datasets, research publications and resources to develop web \
          applications, dashboards and more.'
      }
    ]
  },
  components: {
    ServerError,
    TheToolbar,
    TheButtonBackToTop,
    TheFooter
  },
  data() {
    return {
      alive: true
    }
  },
  async created() {
    this.alive = await healthCheck()
  }
}
</script>

<style>
.section-title {
  border-bottom: 1px #999 solid;
  text-transform: uppercase;
}

.v-messages {
  display: none;
}

.error-page {
  font-size: 1.25rem;
  font-family: 'Lato';
  text-align: center;
  margin-top: 5%;
}

.error-page h1 {
  font-family: 'Lato';
  text-transform: uppercase;
  font-weight: bold;
}
</style>
