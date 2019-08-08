import { fetchData, fetchOneBySlug, fetchList } from './client.utils'
import {
  searchFields,
  articleCardFields as cardFields,
  articleViewFields as viewFields
} from '@/consts/queryFields'

export {
  fetchItemBySlug,
  fetchItemCardById,
  fetchItemsList,
  fetchItemsListCarousel
}

/**
 * Fetch an article for view using slug.
 * @param {String} slug
 */
const fetchItemBySlug = async slug =>
  await fetchArticleBySlug({ fields: viewFields, slug })

/**
 * Fetch a published article for card using id.
 * @param {String} id
 */
const fetchItemCardById = async id =>
  await fetchData('article')({ params: `id: "${id}"`, fields: cardFields })

/**
 * Fetch a list of published articles.
 * @param {Boolean} isSearch
 */
const fetchItemsList = async isSearch =>
  await fetchArticlesList({ fields: isSearch ? searchFields : cardFields })

/**
 * Fetch a list of published, in-house articles for carousel.
 */
const fetchItemsListCarousel = async () =>
  await fetchArticlesList({
    params:
      'limit: 5, sort: "date:desc", where: { status: "published", external: false }',
    fields: ['title', 'slug', 'splash']
  })

const fetchArticleBySlug = fetchOneBySlug('articles')
const fetchArticlesList = fetchList('articles')
