import axios from 'axios'
import NProgress from 'nprogress'
import { apiBaseURL } from '@/config'

const client = axios.create({
  baseURL: apiBaseURL
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
