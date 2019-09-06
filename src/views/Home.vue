<template>
  <div>
    <BaseViewTitle class="pa-4">
      <h1 class="py-4">{{ title }}</h1>

      <p class="font-lato large light">{{ subtitle }}</p>

      <p class="text-right">
        <v-btn to="about" text color="#ddd">{{ about }}</v-btn>
      </p>
    </BaseViewTitle>

    <HomeSearch />

    <div class="grey-background">
      <HomeLatestArticles />

      <HomeLatestApps />

      <HomeLatestDatasets />
    </div>

    <HomeDocumentation />

    <div class="d-flex justify-center">
      <FundingAcknowledgement />
    </div>
  </div>
</template>

<script>
const BaseViewTitle = () => import('@/components/BaseViewTitle')
const FundingAcknowledgement = () =>
  import('@/components/FundingAcknowledgement')
const HomeDocumentation = () => import('@/components/HomeDocumentation')
const HomeLatestApps = () => import('@/components/HomeLatestApps')
const HomeLatestArticles = () => import('@/components/HomeLatestArticles')
const HomeLatestDatasets = () => import('@/components/HomeLatestDatasets')
const HomeSearch = () => import('@/components/HomeSearch')

export default {
  metaInfo: {
    titleTemplate: 'Home | %s'
  },
  components: {
    BaseViewTitle,
    FundingAcknowledgement,
    HomeDocumentation,
    HomeLatestApps,
    HomeLatestArticles,
    HomeLatestDatasets,
    HomeSearch
  },
  data() {
    return {
      title:
        'Home of Illinois Criminal Justice Information Authority Data and Research',
      subtitle:
        'Welcome to the Illinois Crinimal Justice Information Authority (ICJIA) Research Hub. Here you can find various criminal justice datasets, research publications and resources to develop web applications, dashboards and more.',
      about: 'About this Research Hub'
    }
  }
}
</script>

<style scoped>
.grey-background {
  background-color: #eee;
}
</style>
