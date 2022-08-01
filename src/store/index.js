import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isModalOpen:false
  },
  getters: {
  },
  mutations: {
    toggleModal(state) {
      console.log("change state")
      state.isModalOpen = !state.isModalOpen
    }
  },
  actions: {
  },
  modules: {
  }
})
