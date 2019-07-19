import { fetchData, buildQuery } from './client'

export { fetchItemBySlug, fetchItemsList }

/**
 * Fetch a published app for view using slug.
 * @param {String} slug
 */
async function fetchItemBySlug(slug) {
  const params = `where: { slug: "${slug}", status: "published" }`
  const fields = getAppFields('view')
  const query = buildQuery('apps', params, fields)
  const data = await fetchData(query)
  return data.apps[0]
}

/**
 * Fetch a list of published apps.
 * @param {Boolean} isSearch
 */
async function fetchItemsList(isSearch) {
  const type = isSearch ? 'search' : 'card'
  const params = 'sort: "date:desc", where: { status: "published" }'
  const fields = getAppFields(type)
  const query = buildQuery('apps', params, fields)
  const data = await fetchData(query)
  return data.apps
}

/**
 * Get app fields by type for building a query string.
 * @param {String} type
 */
function getAppFields(type) {
  const isSearch = type === 'search'
  const isView = type === 'view'

  let fields = `
    title
    slug
    external
    date
    categories
    tags
  `

  if (!isSearch) {
    fields = `${fields}
      image
      contributors
    `
  }

  if (isView) {
    fields = `${fields}
      description
      url
      citation
      funding
      articles (sort: "date:desc", where: { status: "published" }) {
        title
        slug
      }
      datasets (sort: "date:desc", where: { status: "published" }) {
        title
        slug
      }
    `
  }

  return fields
}
