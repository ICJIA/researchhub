<template>
  <div>
    <BaseViewTitle :home="false">
      <h3 class="light">
        <template>{{ 'ICJIA Research Hub' }}</template>
        <v-icon color="white">chevron_right</v-icon>
        <span>{{ title }}</span>
      </h3>
    </BaseViewTitle>

    <router-view />
  </div>
</template>

<script>
const BaseViewTitle = () => import('@/components/BaseViewTitle')

export default {
  name: 'Authors',
  metaInfo: {
    titleTemplate: 'Authors | %s',
    meta: [
      {
        vmid: 'desc-authors',
        name: 'description',
        content: 'Authors contributed to research publications.'
      }
    ]
  },
  components: {
    BaseViewTitle
  },
  data() {
    return {
      title: 'Authors'
    }
  }
}
</script>
