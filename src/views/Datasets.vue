<template>
  <div>
    <BaseViewTitle :page="title" />

    <router-view search="" />
  </div>
</template>

<script>
const BaseViewTitle = () => import('@/components/BaseViewTitle')

export default {
  name: 'Datasets',
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
  },
  data() {
    return {
      title: 'Datasets'
    }
  }
}
</script>
