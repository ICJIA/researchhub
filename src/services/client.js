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
