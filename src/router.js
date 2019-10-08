import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
import ga from 'vue-ga'
import NProgress from 'nprogress'
import { gaAPIKey, meta } from '@/config'
import { isAuthor } from '@/services/client.authors'

Vue.use(Router)
Vue.use(Meta)

const getDefaultMeta = view => ({
  title: `${view} | ${meta.title}`
})

const router = new Router({
  base: process.env.BASE_URL,
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('@/views/Home.vue'),
      meta: getDefaultMeta('Home')
    },
    {
      path: '/about',
      component: () => import('@/views/About.vue'),
      meta: getDefaultMeta('About')
    },
    {
      path: '/apps',
      component: () => import('@/views/Apps.vue'),
      children: [
        {
          path: '',
          component: () => import('@/views/AppSearch.vue'),
          meta: getDefaultMeta('Apps')
        },
        {
          path: ':slug',
          component: () => import('@/views/AppView.vue')
        }
      ]
    },
    {
      path: '/articles',
      component: () => import('@/views/Articles.vue'),
      children: [
        {
          path: '',
          name: 'article-search',
          component: () => import('@/views/ArticleSearch.vue'),
          meta: getDefaultMeta('Articles'),
          props: true
        },
        {
          path: ':slug',
          component: () => import('@/views/ArticleView.vue'),
          meta: getDefaultMeta('Articles')
        }
      ]
    },
    {
      path: '/author/:slug',
      beforeEnter: async (to, from, next) =>
        next(
          (await isAuthor(to.params.slug))
            ? { name: 'article-search', params: { search: to.params.slug } }
            : { name: '404' }
        )
    },
    {
      path: '/datasets',
      component: () => import('@/views/Datasets.vue'),
      children: [
        {
          path: '',
          component: () => import('@/views/DatasetSearch.vue'),
          meta: getDefaultMeta('Datasets')
        },
        {
          path: ':slug',
          component: () => import('@/views/DatasetView.vue'),
          meta: getDefaultMeta('Datasets')
        }
      ]
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('@/views/Search.vue'),
      meta: getDefaultMeta('Search'),
      props: true
    },
    {
      path: '/page-not-found',
      name: '404',
      component: () => import('@/views/404.vue'),
      meta: getDefaultMeta('404')
    },
    {
      path: '*',
      redirect: { name: '404' }
    }
  ],
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
