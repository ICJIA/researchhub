<template>
  <div>
    <BaseViewTitle class="pa-4">
      <h1 class="py-4">{{ title }}</h1>

      <p class="font-lato large light">{{ subtitle }}</p>

      <p class="text-right">
        <v-btn to="about" text color="#ddd">{{ about }}</v-btn>
      </p>
    </BaseViewTitle>

    <div v-for="i in 5" :key="i" :class="{ 'grey-background': i % 2 == 1 }">
      <HomeSearch v-if="i == 1" />

      <HomeLatestArticles v-if="i == 2" />

      <HomeLatestApps v-if="i == 3" />

      <HomeLatestDatasets v-if="i == 4" />

      <HomeDocumentation v-if="i == 5" />
    </div>
  </div>
</template>

<script>
const BaseViewTitle = () => import('@/components/BaseViewTitle')
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
    HomeDocumentation,
    HomeLatestApps,
    HomeLatestArticles,
    HomeLatestDatasets,
    HomeSearch
  },
  data() {
    return {
      title: 'The Home of the Illinois Criminal Justice Data and Research',
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
