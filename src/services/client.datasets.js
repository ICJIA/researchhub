import { fetchOneBySlug, fetchList } from './client.utils'
import {
  searchFields,
  datasetBaseFields as baseFields,
  datasetViewFields as viewFields
} from '@/consts/queryFields'

export { fetchItemBySlug, fetchItemsList }

/**
 * Fetch a published dataset for view using slug.
 * @param {String} slug
 */
const fetchItemBySlug = async slug =>
  await fetchDatasetBySlug({ fields: viewFields, slug })

/**
 * Fetch a list of published datasets.
 * @param {Boolean} isSearch
 */
const fetchItemsList = async isSearch =>
  await fetchDatasetsList({ fields: isSearch ? searchFields : baseFields })

const fetchDatasetBySlug = fetchOneBySlug('datasets')
const fetchDatasetsList = fetchList('datasets')
