<template>
  <div>
    <BaseViewTitle :page="title" />

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
  },
  data() {
    return {
      title: 'Apps'
    }
  }
}
</script>
