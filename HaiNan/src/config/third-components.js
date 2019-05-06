import Vue from 'vue'

// 第三方组件
import ElementUI from 'element-ui'
import '../../element-variables.scss'
// import '../../theme/index.css'
import VueLazyload from 'vue-lazyload'

// 第三方应用js
import echarts from 'echarts'
import sha256 from 'sha256'

Vue.prototype.$echarts = echarts
Vue.prototype.$sha256 = sha256

Vue.use(ElementUI)
Vue.use(VueLazyload, {
  preLoad: 1,
  loading: '@/assets/img/loading.gif',
  attempt: 1
})
