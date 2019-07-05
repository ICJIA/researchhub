import {
  fetchItemsList,
  fetchItemsListCarousel
} from '@/services/client.articles'

export { namespaced, state, mutations, actions }

const namespaced = true

const state = {
  info: [],
  carouselInfo: [],
  suggestions: ['arrest', 'drug', 'prison']
}

const mutations = {
  FETCH_INFO(state, payload) {
    state.info = payload.map(el => {
      el.date = el.date.slice(0, 10)
      return el
    })
  },
  FETCH_CAROUSEL_INFO(state, payload) {
    state.carouselInfo = payload
  }
}

const actions = {
  async fetchInfo({ commit }) {
    commit('FETCH_INFO', await fetchItemsList())
  },
  async fetchCarouselInfo({ commit }) {
    commit('FETCH_CAROUSEL_INFO', await fetchItemsListCarousel())
  }
}
