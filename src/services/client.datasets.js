import { fetchData, buildQuery } from './client'

export { fetchItemBySlug, fetchItemsList, fetchDataById }

/**
 * Fetch a published dataset for view using slug.
 * @param {String} slug
 */
async function fetchItemBySlug(slug) {
  const params = `where: { slug: "${slug}", status: "published" }`
  const fields = getDatasetFields('view')
  const query = buildQuery('datasets', params, fields)
  const data = await fetchData(query)
  return data.datasets[0]
}

/**
 * Fetch a list of published datasets.
 * @param {Boolean} isSearch
 */
async function fetchItemsList(isSearch) {
  const params = 'sort: "date:desc", where: { status: "published" }'
  const fields = getDatasetFields(isSearch ? 'search' : 'card')
  const query = buildQuery('datasets', params, fields)
  const data = await fetchData(query)
  return data.datasets
}

/**
 * Fetch data, or info on data, by id.
 * @param {String} id
 * @param {Boolean} csv
 */
async function fetchDataById(id, csv) {
  const params = `id: "${id}"`
  const fields = csv
    ? `datacsv
      datafilename`
    : `datafile {
        name
        url
      }`
  const query = buildQuery('dataset', params, fields)
  const data = await fetchData(query)
  return data.dataset
}

/**
 * Get dataset fields by type for building a query string.
 * @param {String} type
 */
function getDatasetFields(type) {
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
      sources
      agegroup`
  }

  if (isView) {
    fields = `
      ${fields}
      timeperiod
      unit
      variables
      description
      notes
      citation
      funding
      datafilename
      apps (sort: "date:desc", where: { status: "published" }) {
        title
        slug
      }
      articles (sort: "date:desc", where: { status: "published" }) {
        title
        slug
      }`
  }

  return fields
}
