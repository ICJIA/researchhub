import { fetchList } from './client.utils'

export { fetchItemsList }

/**
 * Fetch a list of authors.
 */
const fetchItemsList = async () =>
  await fetchAuthorsList({ params: 'sort: "title"', fields })

const fields = ['_id', 'title', 'slug', 'description']
const fetchAuthorsList = fetchList('authors')
