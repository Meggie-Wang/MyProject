import api from '../config/project/api.js'
// import { Notification } from 'element-ui'

// 用户列表
export const getUserList = ({commit}) => {
  api.get('userList').then(res => {
    let userList = []
    if (res.status && res.status === 200) {
      userList = res.data
    }
    commit('userList', userList)
  })
}

// 漏洞录入数据
export const getCveTrend = ({ commit }) => {
  api.get('cveTrend').then((res) => {
    let cveTrend = res.data
    commit('cveTrendData', cveTrend)
  })
}

// 漏洞数据分析
export const getAnalysisTrend = ({ commit }) => {
  api.get('analysisTrend').then((res) => {
    let analysisTrend = res.data
    commit('analysisTrendData', analysisTrend)
  })
}

// 漏洞类型分析
export const getCveStyleAttack = ({ commit }) => {
  api.get('cveStyleAttack').then((res) => {
    let cveStyleAttack = res.data
    commit('cveStyleAttackData', cveStyleAttack)
  })
}

// 轮播
export const getIndexCveresult = ({ commit }, page) => {
  let detectionResult = []
  api.get('indexCveresult', {page: page}).then((res) => {
    detectionResult.push(res)
    return res
  }).then(res => {
    api.get('indexCveresult', {
      page: Math.ceil(res.count / 3) !== page ? page + 1 : 1
    }).then((res) => {
      detectionResult.push(res)
    }).then(() => {
      commit('indexCveresult', detectionResult)
    })
  })
}

// 雷达
export const getRadarData = ({ commit }) => {
  api.get('cveStyleWork').then(res => {
    commit('radarRes', res)
  })
}

// 漏洞软件及基因数据
export const getSoftGeneTrend = ({ commit }) => {
  api.get('softGeneTrend').then(res => {
    let softGeneTrend = res.data
    commit('softGeneTrendData', softGeneTrend)
  })
}

// 漏洞热词
export const getWordCloud = ({ commit }) => {
  api.get('wordCloud', {
    num: 40
  }).then((res) => {
    let wordCloud = res
    commit('wordCloudData', wordCloud)
  })
}

// 漏洞库详情漏洞利用代码
export const getExploitCode = ({ commit }, obj) => {
  api.get('exploitCode', obj).then((res) => {
    let exploitCode = res
    commit('exploitCodeData', exploitCode)
  })
}

// 漏洞库
export const getBugStoreRes = ({commit}, obj) => {
  api.get('bugStore', obj).then(res => {
    commit('bugStoreRes', res)
  })
}

// 软件库
export const getSoftStoreRes = ({commit}, obj) => {
  api.get('softStore', obj).then(res => {
    commit('softStoreRes', res)
  })
}

// 漏洞详情中软件的文件列表 & 软件库的相关漏洞基因
export const getRelateBugGene = ({commit}, obj) => {
  api.get('softRelateGeneStore', obj).then(res => {
    commit('relateBugGene', res)
  })
}
