import Vue from 'vue'

// imgs
import icon from '@/assets/img/webicon/cncert-logo.png'
import logo from '@/assets/img/logo.png'
import zhirongLogo from '@/assets/img/zhirong-logo.png'
import mainBg from '@/assets/img/mainBg.png' // 整体背景

// color.scss utils.js 配置，需重启项目才能生效
// common files
import '@/assets/css/common.scss'
import '@/assets/css/change-element-ui.scss'

// 图片引入
Vue.prototype.$img = {
  logo: logo,
  zhirongLogo: zhirongLogo,
  mainBg: mainBg // 整体背景
}

Vue.prototype.chartColor = ['#4fc4ed', '#4d9cdb', '#4ee2df', '#4ebbe4', '#6becc6']

Vue.prototype.$projectName = document.title = 'CNCERT'

const webIcon = document.querySelector('#web-icon')
webIcon.href = icon

Vue.prototype.$projectCnName = '恶意代码基因检测分析系统' // 大屏主标题
