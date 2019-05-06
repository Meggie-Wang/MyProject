import Vue from 'vue'

import router from './router.js'
import api from './api.js'
import './components.js' // 组件套装
import './static.js' // 静态资源

Vue.prototype.$api = api

export default router
