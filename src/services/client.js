import axios from 'axios'
import NProgress from 'nprogress'

const client = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL
})

client.interceptors.request.use(config => {
  NProgress.start()
  return config
})

client.interceptors.response.use(response => {
  NProgress.done()
  return response
})

export default client

export { fetchData, buildQuery }

/**
 * Fetch Data from API server using a graphql query.
 * @param {String} query Graphql query string
 * @return {Promise<Object>} Query response
 */
async function fetchData(query) {
  const res = await client
    .post('/graphql', {
      query
    })
    .catch(err => {
      console.error(err)
    })
  return res.data.data
}

/**
 * Generate graphql a query string
 * @param {String} contentType Content type
 * @param {String} params Parameters
 * @param {String} fields Fields
 * @return {String} A query string
 */
function buildQuery(contentType, params, fields) {
  return `{\n  ${contentType} (${params}) {${fields}\n  }\n}`
}
