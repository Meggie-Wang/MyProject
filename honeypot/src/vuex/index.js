import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

Vue.use(Vuex)

const state = {
  mapData: {},
  broadcastData: {},
  MaliciousInvasion: {},
  statusTypeData: {},
  wordcloudData: [],
  statusData: {},
  sideBar: {},
  // 状态页图表
  LineMaliciousInvasion: [
    {key: 'Cowrie', key2: 'Password attacks', name: '字典口令攻击'},
    {key: 'Honeytrap', key2: 'Port scanning', name: '端口扫描'},
    {key: 'Dionaea', key2: 'Malicious code', name: '恶意代码'},
    {key: 'Glastopf', key2: 'Web attacks', name: 'web攻击'},
    {key: 'eMobility', key2: 'Transport infrastructure', name: '交通基础设施攻击'},
    {key: 'Syslog', key2: 'E-mail threats', name: '邮件攻击'},
    {key: 'ElasticPot', key2: 'Remote code execution', name: '远程代码执行'},
    {key: 'ConPot', key2: 'Industrial threats', name: '工控攻击'}
  ],
  aboutData: [],
  language: localStorage.getItem('locale') || 'zh'
}

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})

export default store
