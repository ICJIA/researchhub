<template>
  <v-app>
    <TheToolbar />

    <v-main>
      <AlertCOVID ref="alert" />
      <router-view v-if="alive" />
      <ServerError v-else />
    </v-main>

    <TheButtonBackToTop />

    <TheFundingStatement />

    <TheFooter />
  </v-app>
</template>

<script>
import { meta } from '@/config'
import { healthCheck } from '@/services/client.utils'
import TheToolbar from '@/components/TheToolbar'
const AlertCOVID = () => import('researchhub-lib').then(m => m.AlertCOVID)
const ServerError = () => import('@/components/ServerError')
const TheButtonBackToTop = () => import('@/components/TheButtonBackToTop')
const TheFooter = () => import('@/components/TheFooter')
const TheFundingStatement = () => import('@/components/TheFundingStatement')

export default {
  metaInfo: {
    title: meta.title,
    meta: [
      {
        name: 'description',
        content: meta.description
      },
      {
        name: 'twitter:card',
        content: 'summary'
      },
      {
        name: 'twitter:site',
        content: '@ICJIA_Illinois'
      }
    ]
  },
  components: {
    AlertCOVID,
    ServerError,
    TheToolbar,
    TheButtonBackToTop,
    TheFooter,
    TheFundingStatement
  },
  data() {
    return {
      alive: true
    }
  },
  watch: {
    $route() {
      if (this.$refs.alert) this.$refs.alert.reset()
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
