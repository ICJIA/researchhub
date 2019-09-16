import { fetchItemsList } from '@/services/client.apps'

export { namespaced, state, mutations, actions, getters }

const namespaced = true

const state = {
  info: [],
  infoCached: new Map(),
  suggestions: ['app', 'dashboard']
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
  }
}

const actions = {
  cacheInfo({ commit }, payload) {
    commit('CACHE_INFO', payload)
  },
  async fetchInfo({ commit }) {
    commit('FETCH_INFO', await fetchItemsList())
  }
}

const getters = {
  getCached: state => slug => state.infoCached.get(slug),
  getLatest: state => state.info.slice(0, 3),
  isCached: state => slug => state.infoCached.has(slug)
}
