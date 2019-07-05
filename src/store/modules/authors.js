import { fetchItemsList } from '@/services/client.authors'

export { namespaced, state, mutations, actions }

const namespaced = true

const state = {
  data: []
}

const mutations = {
  FETCH_DATA(state, payload) {
    state.data = payload
  }
}

const actions = {
  async fetchData({ commit }) {
    commit('FETCH_DATA', await fetchItemsList())
  }
}
