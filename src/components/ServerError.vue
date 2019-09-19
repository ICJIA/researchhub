<template>
  <div>
    <BaseViewTitle :home="false">
      <h3 class="font-weight-light">
        <template>{{ 'ICJIA Research Hub' }}</template>
        <v-icon color="white">{{ $options.static.mdiChevronRight }}</v-icon>
        <template>{{ 'Error' }}</template>
      </h3>
    </BaseViewTitle>

    <div class="error-page">
      <v-icon x-large color="error">{{
        $options.static.mdiCloseCircle
      }}</v-icon>
      <h1 class="pb-4">Sorry, something went wrong</h1>

      <p>Try refreshing the page or please check back later.</p>
    </div>
  </div>
</template>

<script>
import { mdiChevronRight, mdiCloseCircle } from '@mdi/js'
const BaseViewTitle = () => import('@/components/BaseViewTitle')

export default {
  components: {
    BaseViewTitle
  },
  static: {
    mdiChevronRight,
    mdiCloseCircle
  }
}
</script>
