import { fetchData, buildQuery } from './client'

export { fetchItemsList }

/**
 * Fetch a list of authors.
 */
async function fetchItemsList() {
  const params = 'sort: "title"'
  const fields = `
    _id
    title
    slug
    description
    articles (sort: "date:desc", where: { status: "published" }) {
      _id
    }
  `
  const query = buildQuery('authors', params, fields)
  const data = await fetchData(query)
  return data.authors
}
