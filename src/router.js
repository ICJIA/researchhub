import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
import NProgress from 'nprogress'

Vue.use(Router)
Vue.use(Meta)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/about',
      component: () => import('@/views/About.vue')
    },
    {
      path: '/apps',
      component: () => import('@/views/Apps.vue'),
      children: [
        {
          path: '',
          component: () => import('@/views/AppSearch.vue')
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
          props: true
        },
        {
          path: ':slug',
          component: () => import('@/views/ArticleView.vue')
        }
      ]
    },
    {
      path: '/datasets',
      component: () => import('@/views/Datasets.vue'),
      children: [
        {
          path: '',
          component: () => import('@/views/DatasetSearch.vue')
        },
        {
          path: ':slug',
          component: () => import('@/views/DatasetView.vue')
        }
      ]
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('@/views/Search.vue'),
      props: true
    },
    {
      path: '/404',
      component: () => import('@/views/404.vue')
    },
    {
      path: '*',
      component: () => import('@/views/404.vue')
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
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
