import _this from '../api/ipApi.js'

// // 检测结果
// export const getDetectionResult = ({ commit }, page) => {
//   _this.$api.get('detection_result', {page: page}).then((res) => {
//     let detectionResult = res
//     commit('detectionResultData', detectionResult)
//   })
// }

// // 威胁分析类型分析
// export const getWordList = ({ commit }) => {
//   _this.$api.get('wordList', {
//     num: 20
//   }).then((res) => {
//     let wordList = res
//     for (var i = 0; i < wordList.length; i++) {
//       wordList[i].name = wordList[i].threaten_name
//       wordList[i].value = wordList[i].sample_amount
//     }
//     commit('wordListData', wordList)
//   })
// }

// // 基因家族
// export const getGeneFamily = ({ commit }) => {
//   _this.$api.get('geneFamily').then((res) => {
//     let geneFamily = res.data
//     commit('geneFamilyData', geneFamily)
//   })
// }

// // 地理分布
// export const getPoint = ({ commit }) => {
//   _this.$api.get('point').then((res) => {
//     if (res.status === 200) {
//       let point = res
//       commit('pointData', point)
//     }
//   })
// }

// // 分析结果
// export const getSampleDetection = ({ commit }) => {
//   _this.$api.get('sampleDetection').then((res) => {
//     let sampleDetection = res.data
//     commit('sampleDetectionData', sampleDetection)
//   })
// }

// // 分析检测状态
// export const getSampleAnalysis = ({ commit }) => {
//   _this.$api.get('sampleAnalysis').then((res) => {
//     let sampleAnalysis = res.data
//     commit('sampleAnalysisData', sampleAnalysis)
//   })
// }

// // 威胁数据
// export const getThreat = ({ commit }) => {
//   _this.$api.get('threatData').then((res) => {
//     let threatData = res.data
//     commit('threatData', threatData)
//   })
// }

// // 威胁类型
// export const getAttackType = ({ commit }) => {
//   _this.$api.get('attackType').then((res) => {
//     let attackTypeData = res.data
//     commit('attackTypeData', attackTypeData)
//   })
// }

// // 搜索
// export const getSearch = ({ commit }, searchObj) => {
//   _this.$api.get('search', {query: searchObj.query, select: searchObj.select}).then((res) => {
//     let search
//     if (res.status === 200) {
//       search = res
//     } else {
//       search = Math.random()
//     }
//     commit('searchData', search)
//   })
// }

// // 检测队列
// export const getDetQueue = ({ commit }, searchObj) => {
//   if (Number(localStorage.userClass) === 4) {
//     _this.$api.get('detection_queue', {page: searchObj.page, start_time: searchObj.start_time, end_time: searchObj.end_time, md5: searchObj.md5, submit_user: localStorage.userName}).then((res) => {
//       // searchObj._this.currentPage = Number(searchObj.page)
//       let detQueue = res
//       commit('detQueueData', detQueue)
//     })
//   } else {
//     _this.$api.get('detection_queue', {page: searchObj.page, start_time: searchObj.start_time, end_time: searchObj.end_time, md5: searchObj.md5}).then((res) => {
//       // searchObj._this.currentPage = Number(searchObj.page)
//       let detQueue = res
//       commit('detQueueData', detQueue)
//     })
//   }
// }

// // 样本分析报告
// export const getSampleReport = ({commit}, id) => {
//   _this.$api.get('sampleReport', {id: id}).then(res => {
//     let sampleReport
//     if (res.status === 200) {
//       sampleReport = res.data
//     }
//     localStorage.setItem('Report3d', '0')
//     commit('sampleReport', sampleReport)
//   }).catch(() => {
//     localStorage.setItem('Report3d', '0')
//   })
// }

// // 获取所有的标签
// export const getAllLable = ({ commit }) => {
//   // 检索条件增加三个
//   // |名称    |type|
//   // |文件类型 | 5  |
//   // |平台    | 4  |
//   // |cpu架构 | 6  |
//   let allLable = [
//     { name: '选择恶意性类型标签', enName: 'threaten', threaten: [] },
//     { name: '选择行为标签', enName: 'unthreaten', unthreaten: [] },
//     { name: '选择自定义标签', enName: 'custom', custom: [] },
//     { name: '文件类型', enName: 'fileType', fileType: [] },
//     { name: '平台', enName: 'platform', platform: [] },
//     { name: 'cpu架构', enName: 'cpu', cpu: [] },
//     { name: '物联网特征标签', enName: 'iot', iot: {} }
//   ]
//   let tags = []
//   let iotNum = {}
//   _this.$api.get('label_list').then(res => {
//     allLable[0].threaten = []
//     allLable[1].unthreaten = []
//     allLable[2].custom = []
//     allLable[3].fileType = []
//     allLable[4].platform = []
//     allLable[5].cpu = []
//     allLable[6].iot = {}
//     res.forEach((element, index) => {
//       switch (Number(element.label_type)) {
//         case 1:
//           allLable[0].threaten.push({ cn_name: element.cn_name, show: false })
//           break
//         case 2:
//           allLable[1].unthreaten.push({ cn_name: element.cn_name, show: false })
//           break
//         case 3:
//           allLable[2].custom.push({ cn_name: element.cn_name, show: false })
//           break
//         case 4:
//           allLable[4].platform.push({ cn_name: element.cn_name, show: false })
//           break
//         case 5:
//           allLable[3].fileType.push({ cn_name: element.cn_name, show: false })
//           break
//         case 6:
//           allLable[5].cpu.push({ cn_name: element.cn_name, show: false })
//           break
//         case 7:
//           // 按照首字母组成字典
//           // 提取数字字典
//           if (isNaN(element.cn_name.slice(0, 1))) {
//             let arr = allLable[6].iot[element.cn_name.slice(0, 1).toUpperCase()]
//             if (Array.isArray(arr)) {
//               allLable[6].iot[element.cn_name.slice(0, 1).toUpperCase()].push({
//                 cn_name: element.cn_name,
//                 show: false
//               })
//             } else {
//               allLable[6].iot[element.cn_name.slice(0, 1).toUpperCase()] = []
//               allLable[6].iot[element.cn_name.slice(0, 1).toUpperCase()].push({
//                 cn_name: element.cn_name,
//                 show: false
//               })
//             }
//           } else {
//             let nn = allLable[6].iot[element.cn_name.slice(0, 1).toUpperCase()]
//             if (Array.isArray(nn)) {
//               iotNum['Z' + element.cn_name.slice(0, 1).toUpperCase()].push({
//                 cn_name: element.cn_name,
//                 show: false
//               })
//             } else {
//               iotNum['Z' + element.cn_name.slice(0, 1).toUpperCase()] = []
//               iotNum['Z' + element.cn_name.slice(0, 1).toUpperCase()].push({
//                 cn_name: element.cn_name,
//                 show: false
//               })
//             }
//           }
//           break
//       }
//       tags.push(element.cn_name)
//     })
//     Object.assign(allLable[6].iot, iotNum)
//     if (localStorage.tokenName !== 'cncert') {
//       allLable.splice(6)
//     }
//     commit('allLable', allLable)
//     commit('sampleTags', tags)
//   })
// }

// // 家族模型
// export const getAptFamily = ({commit}) => {
//   let aptFamily = []
//   _this.$api.get('aptList').then(res => {
//     res.forEach(function (i, j) {
//       aptFamily.push(i.model_name)
//     })
//   })
//   commit('aptFamily', aptFamily)
// }

// // 报表分析报告
// export const getAnalysisReport = ({commit}, searchObj) => {
//   _this.$api.get('analysisReport', {type: searchObj.type, page: searchObj.page}).then(res => {
//     searchObj._this.currentPage = Number(searchObj.page)
//     let analysisReportData = res
//     commit('analysisReportData', analysisReportData)
//   })
// }

// // 报表分析报告详情
// export const getAnalysisReportDetail = ({commit}, id) => {
//   _this.$api.get('analysisReportDetail', {id: id}).then(res => {
//     let analysisReportDetailData = res.result
//     commit('analysisReportDetailData', analysisReportDetailData)
//   })
// }
