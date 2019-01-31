import Vue from 'vue'

// imgs
import logout from '@/assets/img/logout.png'
import userLog from '@/assets/img/userLog.png'
import sideBarA from '@/assets/img/sideBarA.png'
import sideBarB from '@/assets/img/sideBarB.png'

import batchUploadBg from '@/assets/img/batchUploadBg.png'
import searchBg from '@/assets/img/searchBg.png'
import geneExtractBg from '@/assets/img/geneExtractBg.png'

import add from '@/assets/img/add.png'
import searchSelect from '@/assets/img/searchSelect.png'
import view from '@/assets/img/view.png'

import malice from '@/assets/img/malice.png'
import safe from '@/assets/img/safe.png'
import unknown from '@/assets/img/unknown.png'

import geneDownload from '@/assets/img/geneDownload.png'
import pcapDownload from '@/assets/img/pcapDownload.png'

import equipment from '@/assets/img/equipment.png'
import unEquipment from '@/assets/img/un-equipment.png'

import setupBtn from '@/assets/img/setup-btn.png'
import resetBtn from '@/assets/img/reset-btn.png'
import closeBtn from '@/assets/img/close-btn.png'

import selectAll from '@/assets/img/selectAll.png'

import redfileIsread from '@/assets/img/redfile_isread.png'
import grayfileIsread from '@/assets/img/grayfile_isread.png'
import orangefileIsread from '@/assets/img/orangefile_isread.png'
import greenfileIsread from '@/assets/img/greenfile_isread.png'
import grayfileUnread from '@/assets/img/grayfile_unread.png'
import redfileUnread from '@/assets/img/redfile_unread.png'
import orangefileUnread from '@/assets/img/orangefile_unread.png'
import greenfileUnread from '@/assets/img/greenfile_unread.png'

// color.scss utils.js 配置，需重启项目才能生效
// common files
import common from '@/assets/js/common.js'
import '@/assets/css/reset.css'
import '@/assets/css/theme.scss'
Vue.prototype.$common = common

// 区分组件上，根据项目不同做出微调
Vue.prototype.$tokenName = localStorage.tokenName

// 引用服务器图片和文件的domain
localStorage.setItem('downloadUrl', localStorage.apiPath)

// 图片引入
Vue.prototype.$img = Object.assign({
  logout: logout,
  userLog: userLog,
  sideBarA: sideBarA,
  sideBarB: sideBarB,
  batchUploadBg: batchUploadBg,
  searchBg: searchBg,
  geneExtractBg: geneExtractBg,
  add: add,
  searchSelect: searchSelect,
  view: view,
  malice: malice,
  safe: safe,
  unknown: unknown,
  geneDownload: geneDownload,
  pcapDownload: pcapDownload,
  equipment: equipment,
  unEquipment: unEquipment,
  setupBtn: setupBtn,
  resetBtn: resetBtn,
  closeBtn: closeBtn,
  selectAll: selectAll,
  redfileIsread: redfileIsread,
  grayfileIsread: grayfileIsread,
  orangefileIsread: orangefileIsread,
  greenfileIsread: greenfileIsread,
  greenfileUnread: greenfileUnread,
  grayfileUnread: grayfileUnread,
  redfileUnread: redfileUnread,
  orangefileUnread: orangefileUnread
}, Vue.prototype.$img)

// 恶意性类型
// select
Vue.prototype.$threatenOptions = () => {
  let obj = [
    { value: 'yes', label: '安全' },
    { value: 'no', label: '恶意' },
    { value: 'unknown', label: '未知' }
  ]
  switch (localStorage.tokenName) {
    case 'zhirong':
    case 'gtd':
      obj.push({ value: '-1', label: '未检测' })
      break
  }
  return obj
}
// table td
Vue.prototype.$detectionResult = (val) => {
  let str = ''
  switch (val) {
    case 'yes':
      str = '安全'
      break
    case 'no':
      str = '恶意'
      break
    case 'unknown':
      str = '未知'
      break
    default:
      str = '未检测'
      break
  }
  return str
}
