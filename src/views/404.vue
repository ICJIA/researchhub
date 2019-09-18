<template>
  <div>
    <BaseViewTitle :home="false">
      <h3 class="font-weight-light">
        <template>{{ 'ICJIA Research Hub' }}</template>
        <v-icon color="white">{{ mdiChevronRight }}</v-icon>
        <template>{{ 'Error' }}</template>
      </h3>
    </BaseViewTitle>

    <div class="error-page">
      <v-icon color="error" x-large>{{ mdiCloseCircle }}</v-icon>
      <h1 class="pb-4">Page not found</h1>

      <p>Sorry. The page you are looking for does not exist.</p>
      <v-btn text to="/">
        <template>{{ 'return to home' }}</template>
        <v-icon>{{ mdiReload }}</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mdiChevronRight, mdiCloseCircle, mdiReload } from '@mdi/js'
const BaseViewTitle = () => import('@/components/BaseViewTitle')

export default {
  components: {
    BaseViewTitle
  },
  data() {
    return {
      mdiChevronRight,
      mdiCloseCircle,
      mdiReload
    }
  }
}
</script>
