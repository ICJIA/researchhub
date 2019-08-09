import { fetchList } from './client.utils'

export { isAuthor }

/**
 * Check if there exists an author with the given title (name).
 * @param {String} title
 */
const isAuthor = async title => extractTitles(await fetchAuthors()).has(title)

/**
 * Extract a set of author titles from a list of articles.
 */
const extractTitles = res =>
  new Set(res.flatMap(el => [...el.authors.map(el => el.title)]))

/**
 * Fetch a list of authors for published articles.
 */
const fetchAuthors = async () =>
  await fetchList('articles')({ fields: ['authors'] })
