import { fetchItemsList } from '@/services/client.datasets'

export { namespaced, state, mutations, actions, getters }

const namespaced = true

const state = {
  info: [],
  suggestions: ['felony', 'juvenile', 'UCR']
}

const mutations = {
  FETCH_INFO(state, payload) {
    state.info = payload.map(el => {
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
  latest(state) {
    return state.info.slice(0, 2)
  }
}
