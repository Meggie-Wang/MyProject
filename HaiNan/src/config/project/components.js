import Vue from 'vue'

// 组件列表
import myHeader from '@/components/Header'
import ElHeader from '@/components/ElHeader'
import Table from '@/components/Table'
import BasicInfor from '@/components/BasicInfor'
import DetailTable from '@/components/DetailTable'
import Search from '@/components/Search'
import Select from '@/components/Select'
import Loading from '@/components/Loading'
import DetailTitle from '@/components/DetailTitle'
// 检测方式
import GeneDetectionSelect from '@/components/GeneDetectionSelect'
// 上传
import UploadFile from '@/components/uploadFile/UploadFile'
import Upload from '@/components/Upload'
// 态势
import VEchart from '@/components/vueEcharts/v-echart'
// 路由简介
import RouterIntro from '@/components/RouterIntro'

Vue.component('myHeader', myHeader)
Vue.component('ElHeader', ElHeader)
Vue.component('Table', Table)
Vue.component('BasicInfor', BasicInfor)
Vue.component('DetailTable', DetailTable)
Vue.component('Search', Search)
Vue.component('Select', Select)
Vue.component('Loading', Loading)
Vue.component('DetailTitle', DetailTitle)
Vue.component('UploadFile', UploadFile)
Vue.component('Upload', Upload)
Vue.component('GeneDetectionSelect', GeneDetectionSelect)
Vue.component('VEchart', VEchart)
Vue.component('RouterIntro', RouterIntro)
