import Vue from 'vue'
import App from './App'
import store from './vuex'

import '@/config/third-components'

import router from '@/config/project'

Vue.config.productionTip = false

/* eslint-disable no-new */
const _this = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
export default _this
