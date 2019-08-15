<template>
  <div>
    <BaseViewTitle :page="title" />

    <router-view search="" />
  </div>
</template>

<script>
const BaseViewTitle = () => import('@/components/BaseViewTitle')

export default {
  name: 'Articles',
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
  },
  data() {
    return {
      title: 'Articles'
    }
  }
}
</script>
