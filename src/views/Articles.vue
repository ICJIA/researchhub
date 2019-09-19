<template>
  <div>
    <BaseViewTitle page="Articles" />

    <router-view search="" />
  </div>
</template>

<script>
const BaseViewTitle = () => import('@/components/BaseViewTitle')

export default {
  metaInfo: {
    titleTemplate: 'Articles | %s',
    meta: [
      {
        vmid: 'desc-articles',
        name: 'description',
        content: 'Research articles and reports on Illinois criminal justice'
      }
    ]
  },
  components: {
    BaseViewTitle
  }
}
</script>
