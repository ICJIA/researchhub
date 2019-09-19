<template>
  <div>
    <BaseViewTitle page="Apps" />

    <router-view search="" />
  </div>
</template>

<script>
const BaseViewTitle = () => import('@/components/BaseViewTitle')

export default {
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
  }
}
</script>
