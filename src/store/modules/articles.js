import {
  fetchItemsList,
  fetchItemsListCarousel
} from '@/services/client.articles'

export { namespaced, state, mutations, actions, getters }

const namespaced = true

const state = {
  info: [],
  infoCached: new Map(),
  infoCarousel: [],
  suggestions: ['arrest', 'drug', 'prison']
}

const mutations = {
  CACHE_INFO(state, { item, slug }) {
    state.infoCached.set(slug, item)
  },
  FETCH_INFO(state, payload) {
    state.info = payload.map(el => {
      el.date = el.date.slice(0, 10)
      return el
    })
  },
  FETCH_INFO_CAROUSEL(state, payload) {
    state.infoCarousel = payload
  }
}

const actions = {
  cacheInfo({ commit }, payload) {
    commit('CACHE_INFO', payload)
  },
  async fetchInfo({ commit }) {
    commit('FETCH_INFO', await fetchItemsList())
  },
  async fetchInfoCarousel({ commit }) {
    commit('FETCH_INFO_CAROUSEL', await fetchItemsListCarousel())
  }
}

const getters = {
  getCached: state => slug => state.infoCached.get(slug),
  isCached: state => slug => state.infoCached.has(slug)
}
