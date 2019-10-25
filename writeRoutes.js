/***
 * Write routes to prerender in JSON
 */
const axios = require('axios')
const dotenv = require('dotenv')
const fs = require('fs')

main()

async function main() {
  dotenv.config()

  const routes = ['/', '/about', '/apps', '/articles', '/datasets']
  const client = axios.create({ baseURL: process.env.VUE_APP_API_BASE_URL })

  const appRoutes = await fetchAppRoutes(client)
  const articleRoutes = await fetchArticleRoutes(client)
  const datasetRoutes = await fetchDatasetRoutes(client)

  routes.push(...appRoutes)
  routes.push(...articleRoutes)
  routes.push(...datasetRoutes)

  try {
    fs.writeFile('routes.json', JSON.stringify(routes), error => {
      if (error) throw error
    })
  } catch (e) {
    console.error(e)
  }
}

async function fetchRoutesByType(client, type) {
  const res = await client
    .post('graphql', {
      query: `{
        ${type} (sort: "date:desc", where: { status: "published" }) {
          slug
        }
      }`
    })
    .catch(err => {
      console.error(err)
    })
  return res.data.data
}

async function fetchAppRoutes(client) {
  const data = await fetchRoutesByType(client, 'apps')
  return data.apps.map(el => {
    return `/apps/${el.slug}`
  })
}

async function fetchArticleRoutes(client) {
  const data = await fetchRoutesByType(client, 'articles')
  return data.articles.map(el => {
    return `/articles/${el.slug}`
  })
}

async function fetchDatasetRoutes(client) {
  const data = await fetchRoutesByType(client, 'datasets')
  return data.datasets.map(el => {
    return `/datasets/${el.slug}`
  })
}
