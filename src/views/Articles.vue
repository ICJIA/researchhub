<template>
  <div>
    <BaseViewTitle :home="false">
      <h3 class="light">
        <template>{{ 'ICJIA Research Hub' }}</template>
        <v-icon color="white">chevron_right</v-icon>
        <span>{{ title }}</span>
      </h3>
    </BaseViewTitle>

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
