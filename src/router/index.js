import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
import ga from 'vue-ga'
import NProgress from 'nprogress'
import { gaAPIKey, meta } from '@/config'
import routes from './routes'

Vue.use(Router)
Vue.use(Meta)

const router = new Router({
  base: process.env.BASE_URL,
  mode: 'history',
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return window.scrollTo({
        top: document.querySelector(to.hash).offsetTop - 90,
        behavior: 'smooth'
      })
    } else {
      return window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || meta.title
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

ga(router, gaAPIKey)

export default router
