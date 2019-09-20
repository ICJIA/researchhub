<template>
  <div>
    <BaseViewTitle class="pa-4">
      <h1 class="py-4">{{ $options.static.title }}</h1>

      <p class="font-lato font-weight-light large">
        {{ $options.static.subtitle }}
      </p>

      <p class="text-right">
        <v-btn to="about" text color="white">{{ $options.static.about }}</v-btn>
      </p>
    </BaseViewTitle>

    <HomeSearch />

    <div class="pt-6 grey-background">
      <h3 class="font-lato text-center text-uppercase wide">
        <template>{{ 'Latest publications' }}</template>
      </h3>

      <div class="pt-4 pt-sm-0">
        <HomeLatestArticles />

        <HomeLatestApps />

        <HomeLatestDatasets />
      </div>
    </div>

    <div class="pt-6">
      <HomeDocumentation />
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
  static: {
    title:
      'Home of Illinois Criminal Justice Information Authority Data and Research',
    subtitle:
      'Welcome to the Illinois Crinimal Justice Information Authority \
      (ICJIA) Research Hub. Here you can find various criminal justice \
      datasets, research publications, and resources to develop web \
      applications, dashboards, and more.',
    about: 'About this Research Hub'
  }
}
</script>

<style scoped>
.grey-background {
  background-color: rgba(27, 31, 35, 0.05);
}
</style>
