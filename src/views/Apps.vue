<template>
  <div>
    <BaseViewTitle :home="false">
      <h3 class="light">
        <template>{{ 'ICJIA Research Hub' }}</template>
        <v-icon color="white">chevron_right</v-icon>
        <template>{{ title }}</template>
      </h3>
    </BaseViewTitle>

    <router-view search="" />
  </div>
</template>

<script>
const BaseViewTitle = () => import('@/components/BaseViewTitle')

export default {
  name: 'Apps',
  metaInfo: {
    titleTemplate: 'Apps | %s',
    meta: [
      {
        vmid: 'desc-apps',
        name: 'description',
        content: 'Applications on Illinois criminal justice'
      }
    ]
  },
  components: {
    BaseViewTitle
  },
  data() {
    return {
      title: 'Apps'
    }
  }
}
</script>
