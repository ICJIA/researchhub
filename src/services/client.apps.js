import { fetchOneBySlug, fetchList } from './client.utils'
import {
  searchFields,
  appBaseFields as baseFields,
  appViewFields as viewFields
} from '@/consts/queryFields'

export { fetchItemBySlug, fetchItemsList }

/**
 * Fetch a published app for view using slug.
 * @param {String} slug
 */
const fetchItemBySlug = async slug =>
  await fetchAppBySlug({ fields: viewFields, slug })

/**
 * Fetch a list of published apps.
 * @param {Boolean} isSearch
 */
const fetchItemsList = async isSearch =>
  await fetchAppsList({ fields: isSearch ? searchFields : baseFields })

const fetchAppBySlug = fetchOneBySlug('apps')
const fetchAppsList = fetchList('apps')
