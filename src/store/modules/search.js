import { fetchItemsList as fetchAppsList } from '@/services/client.apps.js'
import { fetchItemsList as fetchArticlesList } from '@/services/client.articles.js'
import { fetchItemsList as fetchDatasetsList } from '@/services/client.datasets.js'

export { namespaced, state, mutations, actions }

const isSearch = true

const namespaced = true

const state = {
  apps: [],
  articles: [],
  datasets: [],
  suggestions: ['drug', 'juvenile', 'victims']
}

const mutations = {
  FETCH_SEARCH_INFO_APPS(state, payload) {
    state.apps = payload
  },
  FETCH_SEARCH_INFO_ARTICLES(state, payload) {
    state.articles = payload
  },
  FETCH_SEARCH_INFO_DATASETS(state, payload) {
    state.datasets = payload
  }
}

const actions = {
  async fetchSearchInfo({ commit, state }) {
    if (state.apps.length === 0) {
      commit('FETCH_SEARCH_INFO_APPS', await fetchAppsList(isSearch))
    }

    if (state.articles.length === 0) {
      commit('FETCH_SEARCH_INFO_ARTICLES', await fetchArticlesList(isSearch))
    }

    if (state.datasets.length === 0) {
      commit('FETCH_SEARCH_INFO_DATASETS', await fetchDatasetsList(isSearch))
    }
  }
}
