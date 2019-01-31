import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

Vue.use(Vuex)

// 只有cncert的管理员有1
const editAuth = Boolean(Number(localStorage.editAuth))

const state = {
  editAuth: editAuth,
  threatData: {},
  wordList: {},
  geneFamily: {},
  point: {},
  detectionResult: {},
  sampleDetection: {},
  sampleAnalysis: {},
  attackTypeData: {},
  search: {},
  detQueue: {},
  sampleReport: {},
  allLable: [],
  sampleTags: [],
  aptFamily: [],
  analysisReportData: {},
  analysisReportDetailData: {},
  activeCountry: '',
  setFileImportLevel: {}
}

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})

export default store
