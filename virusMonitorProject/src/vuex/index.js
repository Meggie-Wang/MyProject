import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as mutations from './mutations'

Vue.use(Vuex)

const state = {
  language: localStorage.getItem('locale') || 'zh'
}

const store = new Vuex.Store({
  state,
  getters,
  mutations
})

export default store
