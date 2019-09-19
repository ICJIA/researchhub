<template>
  <div>
    <BaseViewTitle page="Datasets" />

    <router-view search="" />
  </div>
</template>

<script>
const BaseViewTitle = () => import('@/components/BaseViewTitle')

export default {
  metaInfo: {
    titleTemplate: 'Datasets | %s',
    meta: [
      {
        vmid: 'desc-datasets',
        name: 'description',
        content: 'Datasets on Illinois criminal justice'
      }
    ]
  },
  components: {
    BaseViewTitle
  }
}
</script>
