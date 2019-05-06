import Vue from 'vue'

import router from './router.js'
import './components.js' // 组件套装
import './static.js' // 静态资源
import api from './api.js'

Vue.prototype.$api = api

export default router
