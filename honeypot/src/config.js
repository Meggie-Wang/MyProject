import Vue from 'vue'
import icon from '../static/logo.png'

const webIcon = document.querySelector('#web-icon')
webIcon.href = icon

// 项目的中英文名字
Vue.prototype.$projectEnName = 'project'
Vue.prototype.$projectCnName = document.title = '猎戎-网络威胁诱捕与态势感知系统'
