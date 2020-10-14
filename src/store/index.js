import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mountedLoadingPage: false
  },
  getters: {
    getLoadingStatus: function (state) {
      return state.mountedLoadingPage
    }
  },
  mutations: {
    upateLoadingStatus: function(state, status) {
      state.mountedLoadingPage = status
    }
  },
  actions: {
  },
  modules: {
  }
})
