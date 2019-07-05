import { fetchData, buildQuery } from './client'

export {
  fetchItemBySlug,
  fetchItemCardById,
  fetchItemsList,
  fetchItemsListCarousel,
  fetchFileInfoById
}

/**
 * Fetch an article for view using slug.
 * @param {String} slug
 */
async function fetchItemBySlug(slug) {
  const params = `where: { slug: "${slug}", status: "published" }`
  const fields = getArticleFields('view')
  const query = buildQuery('articles', params, fields)
  const data = await fetchData(query)
  return data.articles[0]
}

/**
 * Fetch a published article for card using id.
 * @param {String} id
 */
async function fetchItemCardById(id) {
  const params = `id: "${id}"`
  const fields = getArticleFields('card')
  const query = buildQuery('article', params, fields)
  const data = await fetchData(query)
  return data.article
}

/**
 * Fetch a list of published articles.
 * @param {Boolean} isSearch
 */
async function fetchItemsList(isSearch) {
  const type = isSearch ? 'search' : 'card'
  const params = 'sort: "date:desc", where: { status: "published" }'
  const fields = getArticleFields(type)
  const query = buildQuery('articles', params, fields)
  const data = await fetchData(query)
  return data.articles
}

/**
 * Fetch a list of published, in-house articles for carousel.
 */
async function fetchItemsListCarousel() {
  const params =
    'limit: 5, sort: "date:desc", where: { status: "published", external: false }'
  const fields = `
    title
    slug
    splash`
  const query = buildQuery('articles', params, fields)
  const data = await fetchData(query)
  return data.articles
}

/**
 * Fetch info on an article file attachment using id.
 * @param {String} id
 * @param {String} type
 */
async function fetchFileInfoById(id, type) {
  const params = `id: "${id}"`
  const fields = `
    ${type}pdf {
      name
      url
    }
  `
  const query = buildQuery('article', params, fields)
  const data = await fetchData(query)
  return data.article
}

/**
 * Get article fields by type for building a query string.
 * @param {String} type
 */
function getArticleFields(type) {
  const isSearch = type === 'search'
  const isView = type === 'view'

  let fields = `
    title
    slug
    external
    date
    categories
    tags`

  if (!isSearch) {
    fields = `
      _id
      ${fields}
      ${isView ? 'splash' : 'thumbnail'}
      type
      abstract
      authors {
        title
        slug
      }`
  }

  if (isView) {
    fields = `
      ${fields}
      splash
      images
      markdown
      citation
      doi
      funding
      # reportpdf {
      #   url
      # }
      # slidespdf {
      #   url
      # }
      apps (sort: "date:desc", where: { status: "published" }) {
        title
        slug
      }
      datasets (sort: "date:desc", where: { status: "published" }) {
        title
        slug
      }`
  }

  return fields
}
