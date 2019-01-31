import Vue from 'vue'

// 组件列表
import Sidebar from '@/components/sidebar/zhirong-Sidebar'
import myHeader from '@/components/header.vue'

import HackerList from '@/components/main/hackerList'
import WordList from '@/components/main/wordList.vue'
import Pie2 from '@/components/main/pie2.vue'
import Point from '@/components/main/point.vue'
import Bar from '@/components/main/bar.vue'
import myLine from '@/components/main/line.vue'
import Pie from '@/components/main/pie.vue'

import SampleReportOption from '@/components/SampleReportOption.vue'

Vue.component('Sidebar', Sidebar)
Vue.component('myHeader', myHeader)

Vue.component('HackerList', HackerList)
Vue.component('WordList', WordList)
Vue.component('Pie2', Pie2)
Vue.component('Point', Point)
Vue.component('Bar', Bar)
Vue.component('myLine', myLine)
Vue.component('Pie', Pie)

Vue.component('SampleReportOption', SampleReportOption)
