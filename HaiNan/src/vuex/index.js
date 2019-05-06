import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

Vue.use(Vuex)

const state = {
  userList: [],
  cveTrend: {},
  analysisTrend: {},
  cveStyleAttack: {},
  softGeneTrend: {},
  indexCveresult: {},
  radarRes: {},
  wordCloud: {},
  exploitCode: '',
  bugStoreRes: {},
  softStoreRes: {},
  relateBugGene: null
}

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})

export default store
