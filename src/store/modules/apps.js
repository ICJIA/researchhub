import { fetchItemsList } from '@/services/client.apps'

export { namespaced, state, mutations, actions, getters }

const namespaced = true

const state = {
  data: [],
  suggestions: ['app', 'dashboard']
}

const mutations = {
  FETCH_INFO(state, payload) {
    state.data = payload.map(el => {
      el.date = el.date.slice(0, 10)
      return el
    })
  }
}

const actions = {
  async fetchInfo({ commit }) {
    commit('FETCH_INFO', await fetchItemsList())
  }
}

const getters = {
  highlights(state) {
    return state.data.slice(0, 3)
  }
}
