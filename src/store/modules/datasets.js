import { fetchItemsList } from '@/services/client.datasets'

export { namespaced, state, mutations, actions, getters }

const namespaced = true

const state = {
  info: [],
  infoCached: new Map(),
  suggestions: ['felony', 'juvenile', 'UCR']
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
  latest(state) {
    return state.info.slice(0, 2)
  },
  getCached: state => slug => state.infoCached.get(slug),
  isCached: state => slug => state.infoCached.has(slug)
}
