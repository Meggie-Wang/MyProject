// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex'
import VueI18n from 'vue-i18n'

import echarts from 'echarts'
import BaiduMap from 'vue-baidu-map'
import VueAwesomeSwiper from 'vue-awesome-swiper'

import '@/assets/css/common.css'
import '@/assets/css/main.css'
import '@/assets/css/swiper.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import bs from '@/assets/js/backspace.js'

// 实现对字符码的截获，keypress中屏蔽了这些功能按键
document.onkeypress = bs.banBackSpace
// 对功能按键的获取
document.onkeydown = bs.banBackSpace

Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(BaiduMap, {
  ak: 'bDePvwR4Q8VsZOmXCMIkmYujFntOc5Kq'
})
Vue.use(VueAwesomeSwiper)
Vue.use(VueI18n)

/*
  读取localstorge
  如果有，赋值给i18n
  如果没有，存'zh'
  切换语言，存localstorge
*/
let local = localStorage.getItem('locale')
if (local === null) {
  localStorage.setItem('locale', 'zh')
}

const i18n = new VueI18n({
  locale: localStorage.getItem('locale'),
  messages: {
    'zh': require('./assets/js/lang/zh'),
    'en': require('./assets/js/lang/en')
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
