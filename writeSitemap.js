const axios = require('axios')
const fs = require('fs')
const sm = require('sitemap')

main()

async function main() {
  const { apiBaseURL, hostBaseURL, publicPath } = require('./src/config')

  const routes = ['/', '/404', '/about', '/apps', '/articles', '/datasets']
  const client = axios.create({ baseURL: apiBaseURL })

  routes.push(...(await fetchAppRoutes(client)))
  routes.push(...(await fetchArticleRoutes(client)))
  routes.push(...(await fetchDatasetRoutes(client)))

  const baseURL = removeTrailingSlash(publicPath)
  const urls = routes.map(route => ({
    url: baseURL + route,
    changefreq: 'weekly'
  }))
  const sitemap = sm.createSitemap({
    hostname: hostBaseURL,
    cacheTime: 600000, // 600 sec (10 min) cache purge period
    urls
  })

  try {
    fs.writeFile('./public/sitemap.xml', sitemap.toString(), error => {
      if (error) throw error
      console.log('Created: ./public/sitemap.xml')
    })
  } catch (e) {
    console.error(e)
  }
}

async function fetchRoutesByType(client, type) {
  const res = await client
    .post('graphql', {
      query: `{
        ${type} (where: { status: "published" }) {
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

function removeTrailingSlash(path) {
  return path.slice(-1) === '/' ? path.slice(0, -1) : path
}
