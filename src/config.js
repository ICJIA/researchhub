module.exports = {
  apiBaseURL:
    process.env.VUE_APP_API_BASE_URL || 'https://researchhub.icjia-api.cloud',
  gaAPIKey: process.env.VUE_APP_GA_ID || '',
  github: 'https://github.com/icjia/researchhub',
  hostBaseURL:
    process.env.VUE_APP_HOST_BASE_URL || 'https://icjia.illinois.gov',
  meta: {
    title: 'ICJIA Research Hub',
    description:
      'Welcome to the Illinois Criminal Justice Information Authority (ICJIA) Research Hub. Here you can find various criminal justice datasets, research publications and resources to develop web applications, dashboards and more.'
  },
  publicPath: process.env.VUE_APP_PUBLIC_PATH || '/researchhub/'
}
