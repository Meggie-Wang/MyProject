import Vue from 'vue'

// 组件列表
import FileName from '@/components/FileName.vue'
import Tags from '@/components/Tags.vue'
import Loading from '@/components/Loading'
import DelCustomTags from '@/components/DelCustomTags'
import FamilyAi2 from '@/components/geneFamily/FamilyAi2'
import Vechart from '@/components/vueEcharts/v-echart'
import UploadAct from '@/components/UploadAct.vue'
import SearchOptions from '@/components/SearchOptions.vue'
import ToTop from '@/components/ToTop.vue'

import NoData from '@/components/main/Nodata'

Vue.component('FileName', FileName)
Vue.component('Tags', Tags)
Vue.component('Loading', Loading)
Vue.component('DelCustomTags', DelCustomTags)
Vue.component('FamilyAi2', FamilyAi2)
Vue.component('Vechart', Vechart)
Vue.component('UploadAct', UploadAct)
Vue.component('SearchOptions', SearchOptions)
Vue.component('ToTop', ToTop)

Vue.component('NoData', NoData)
