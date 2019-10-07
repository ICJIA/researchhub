module.exports = {
  apiBaseURL:
    process.env.VUE_APP_API_BASE_URL || 'https://research.icjia-api.cloud',
  gaAPIKey: process.env.VUE_APP_GA_ID || '',
  publicPath: process.env.VUE_APP_PUBLIC_PATH || '/researchhub/'
}
