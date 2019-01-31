import Vue from 'vue'

// 组件列表
import Sidebar from '@/components/sidebar/guoan-Sidebar'
import myHeader from '@/components/guoan-main/header.vue'

import HackerList from '@/components/guoan-main/hackerList'
import Pie from '@/components/guoan-main/pie.vue'
import Point from '@/components/guoan-main/point.vue'
import myLine from '@/components/guoan-main/line.vue'
import systemLine from '@/components/main/line.vue'

import Point2 from '@/components/main/point.vue'
import Pie2 from '@/components/main/pie.vue'
import WordList from '@/components/main/wordList.vue'
import Bar from '@/components/main/bar.vue'

Vue.component('Sidebar', Sidebar)
Vue.component('myHeader', myHeader)
Vue.component('HackerList', HackerList)
Vue.component('Pie', Pie)
Vue.component('Point', Point)
Vue.component('Point2', Point2)
Vue.component('WordList', WordList)
Vue.component('myLine', myLine)
Vue.component('systemLine', systemLine)
Vue.component('Pie2', Pie2)
Vue.component('Bar', Bar)
