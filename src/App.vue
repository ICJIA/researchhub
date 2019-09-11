<template>
  <v-app>
    <the-toolbar />

    <v-content>
      <router-view v-if="alive" />
      <ServerError v-else />
    </v-content>

    <the-button-back-to-top />

    <the-footer />
  </v-app>
</template>

<script>
import { healthCheck } from '@/services/client.utils'
import TheToolbar from '@/components/TheToolbar'
const ServerError = () => import('@/components/ServerError')
const TheButtonBackToTop = () => import('@/components/TheButtonBackToTop')
const TheFooter = () => import('@/components/TheFooter')

export default {
  metaInfo: {
    title: 'Research Hub',
    meta: [
      {
        name: 'description',
        content:
          'Welcome to the Illinois Crinimal Justice Information Authority (ICJIA) Research Hub. Here you can find various criminal justice  datasets, research publications and resources to develop web  applications, dashboards and more.'
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
.section-title {
  border-bottom: 1px #999 solid;
  text-transform: uppercase;
}
.v-text-field__details,
.v-messages {
  display: none;
}
.wide {
  letter-spacing: 0.06em;
}
.grey-background .section-title a {
  color: #166cc0 !important;
}
</style>
