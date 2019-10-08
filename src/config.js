module.exports = {
  agency: {
    name: 'Illinois Criminal Justice Information Authority',
    url: 'http://www.icjia.state.il.us/'
  },
  apiBaseURL:
    process.env.VUE_APP_API_BASE_URL || 'https://research.icjia-api.cloud',
  gaAPIKey: process.env.VUE_APP_GA_ID || '',
  github: {
    url: 'https://github.com/icjia/icjia-research',
    version: '1.0.0-beta.9'
  },
  meta: {
    title: 'Research Hub',
    description:
      'Welcome to the Illinois Crinimal Justice Information Authority (ICJIA) Research Hub. Here you can find various criminal justice datasets, research publications and resources to develop web applications, dashboards and more.'
  },
  publicPath: process.env.VUE_APP_PUBLIC_PATH || '/researchhub/'
}
