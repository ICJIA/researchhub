import client from './client'

export { fetchData, fetchOneBySlug, fetchList, healthCheck }

/**
 * Fetch a publisehd content with the matching slug.
 * @param {String} contentType
 * @param {[String]} fields [String]
 * @param {String} slug String
 */
const fetchOneBySlug = contentType => async ({ fields, slug }) =>
  (await fetchData(contentType)({
    params: `where: { slug: "${slug}", status: "published" }`,
    fields
  }))[0]

/**
 * Fetch a list of publisehd contents.
 * @param {String} contentType
 * @param {String} params
 * @param {[String]} fields [String]
 */
const fetchList = contentType => async ({
  params = 'sort: "date:desc", where: { status: "published" }',
  fields
}) => await fetchData(contentType)({ params, fields })

/**
 * Fetch data from API server.
 * @param {String} contentType
 * @param {String} params String
 * @param {String} fields [String]
 */
const fetchData = contentType => async ({ params, fields }) =>
  await fetchQueryResult(contentType)(
    `{\n  ${contentType} (${params}) {${fields.join('\n')}\n  }\n}`
  )

/**
 * Fetch graphql query results from API server.
 * @param {String} contentType
 * @param {String} query
 * @return {(query:String) => Promise<Object>}
 */
const fetchQueryResult = contentType => async query =>
  await client
    .post('/graphql', { query, validateStatus: status => status === 200 })
    .then(({ data }) => data.data[contentType])
    .catch(err => console.error(err))

/**
 * Check API server health.
 */
const healthCheck = async (timeout = 2000) =>
  await client
    .head(`/`, { timeout })
    .then(res => res.status === 200)
    .catch(() => false)
