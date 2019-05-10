import Vue from 'vue'
import App from './App'
import store from './vuex'
import router from './router'
import axios from 'axios'
import echarts from 'echarts'
import BaiduMap from 'vue-baidu-map'
import VueLazyload from 'vue-lazyload'
import VueI18n from 'vue-i18n'
import Paginate from 'vuejs-paginate'
import {
  Pagination,
  DatePicker,
  Table,
  TableColumn,
  Popover,
  Tag,
  Button,
  Alert,
  Aside,
  Main,
  Container,
  Menu,
  Submenu,
  MenuItem,
  Select, Input, Option,
  Upload, Collapse, CollapseItem,
  Message, Progress, Steps,
  Step, Cascader, Tabs,
  TabPane, Dropdown,
  DropdownMenu, DropdownItem,
  Checkbox
} from 'element-ui'

import 'url-search-params-polyfill'
import icon from './assets/img/logoIcon.png'

Vue.component(Pagination.name, Pagination)
Vue.component(DatePicker.name, DatePicker)
Vue.component(Table.name, Table)
Vue.component(TableColumn.name, TableColumn)
Vue.component(Popover.name, Popover)
Vue.component(Tag.name, Tag)
Vue.component(Button.name, Button)
Vue.component(Alert.name, Alert)
Vue.component(Aside.name, Aside)
Vue.component(Main.name, Main)
Vue.component(Container.name, Container)
Vue.component(Menu.name, Menu)
Vue.component(Submenu.name, Submenu)
Vue.component(MenuItem.name, MenuItem)
Vue.component(Select.name, Select)
Vue.component(Input.name, Input)
Vue.component(Option.name, Option)
Vue.component(Upload.name, Upload)
Vue.component(Collapse.name, Collapse)
Vue.component(CollapseItem.name, CollapseItem)
Vue.component(Progress.name, Progress)
Vue.component(Steps.name, Steps)
Vue.component(Step.name, Step)
Vue.component(Cascader.name, Cascader)
Vue.component(Tabs.name, Tabs)
Vue.component(TabPane.name, TabPane)
Vue.component(Dropdown.name, Dropdown)
Vue.component(DropdownMenu.name, DropdownMenu)
Vue.component(DropdownItem.name, DropdownItem)
Vue.component('paginate', Paginate)


Vue.use(VueLazyload, {
  preLoad: 1,
  error: require('../static/img/logo.png'),
  loading: require('../static/img/loading.gif'),
  attempt: 1
})
Vue.use(BaiduMap, {
  ak: 'bDePvwR4Q8VsZOmXCMIkmYujFntOc5Kq'
})
Vue.use(VueI18n)
Vue.use(DatePicker)

Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts
Vue.prototype.$message = Message

// web icon
const webIcon = document.querySelector('#web-icon')
webIcon.href = icon

// 项目的中英文名字
Vue.prototype.$projectEnName = 'project'
Vue.prototype.$projectCnName = document.title = '数戎-全球恶意代码软件基因大数据服务平台'

window.bus = new Vue()

let local = localStorage.getItem('locale')
if (local === null) {
  localStorage.setItem('locale', 'zh')
}
const i18n = new VueI18n({
  locale: localStorage.getItem('locale'),
  messages: {
    'zh': require('../static/js/lang/zh'),
    'en': require('../static/js/lang/en')
  }
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
router.afterEach((to,from,next) => {
  window.scrollTo(0,0)
})

new Vue({
  router,
  store,
  i18n,
  template: '<App />',
  components: { App },
  data: {
    eventHub: new Vue(),
    charts: []
  }
}).$mount('#app')