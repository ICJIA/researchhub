import { meta } from '@/config'
import { isAuthor } from '@/services/client.authors'

const getDefaultMeta = view => ({
  title: `${view} | ${meta.title}`
})

export default [
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
]
