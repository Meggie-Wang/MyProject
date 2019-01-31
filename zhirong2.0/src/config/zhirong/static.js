import Vue from 'vue'

// 更换项目需要替换的静态资源

// imgs
import icon from '@/assets/img/webicon/rongpan-logo.png'
import logo from '@/assets/img/rongpan-logo.png'
import zhirongLogo from '@/assets/img/zhirong-logo.png'
import mainBg from '@/assets/img/zhirong-mainBg.png' // 整体背景

// color.scss utils.js 配置，需重启项目才能生效
// common files
import '@/assets/css/common.scss'
import '@/assets/css/change-element-ui.scss'

// 图片引入
Vue.prototype.$img = {
  logo: logo,
  zhirongLogo: zhirongLogo,
  mainBg: mainBg
}
Vue.prototype.chartColor = ['#4fc4ed', '#4d9cdb', '#4ee2df', '#4ebbe4', '#6becc6']

Vue.prototype.$projectName = document.title = '软件基因恶意代码检测引擎'

const webIcon = document.querySelector('#web-icon')
webIcon.href = icon

Vue.prototype.$projectCnName = '软件基因恶意代码检测引擎'
