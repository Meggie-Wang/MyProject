import Vue from 'vue'

// 第三方组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueLazyload from 'vue-lazyload'
import VueClipboard from 'vue-clipboard2'
import BaiduMap from 'vue-baidu-map'

// 第三方应用js
import echarts from 'echarts'
import exportExcel from '@/assets/js/exportExcel.js'
import sha256 from 'sha256'

Vue.prototype.$echarts = echarts
Vue.prototype.$exportExcel = exportExcel
Vue.prototype.$sha256 = sha256

Vue.use(ElementUI)
Vue.use(VueClipboard)
Vue.use(VueLazyload, {
  preLoad: 1,
  loading: './static/img/loading.gif',
  attempt: 1
})
Vue.use(BaiduMap, {
  ak: 'bDePvwR4Q8VsZOmXCMIkmYujFntOc5Kq'
})
