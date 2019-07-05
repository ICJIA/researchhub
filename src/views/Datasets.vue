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
