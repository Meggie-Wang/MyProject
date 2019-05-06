<template>
  <div class="SoftwareGeneDetect">
    <router-intro
      content="利用软件基因的大数据处理和自动化处理能力，基于软件漏洞库和漏洞基因库。通过大数据分析和人工智能算法，评估软件与漏洞基因的匹配度及存在漏洞的风险。">
      <template slot="upload">
        <div class="upload">
          <div class="upload_left">
            <img :src="$img.upload" @click="uploadShow = true">
            <span>支持扩展名：RAR,ZIP</span>
            <Upload
              v-if="uploadShow"
              @hideUpd="uploadShow = false; init(1)"/>
          </div>

          <div class="upload_right">
            <p>人工上传待检测软件，软件当是安装后的文件包，并压缩文件。</p>
            <p>注意：如果安装过程中有些资源安装到其他的目录位置，需要手动导入到检测文件包中。</p>
          </div>
        </div>
      </template>
    </router-intro>

    <div class="searchOption">
      <Select
        :optData="selectOpt"
        @initList="init"
        path="/SoftwareGeneDetect"/>
      <Search
        :searchPlaceholder="searchPlaceholder"
        @initList="init"
        path="/SoftwareGeneDetect"/>
    </div>
    <Table
      :tableTitle=tableTitle
      :tableData=tableData
      :total="total"
      :page="currentPage"
      @requestApi="init">
        <template
          slot="detect"
          slot-scope="props">
            <el-button
              size="mini"
              :disabled="props.detect_status !== '提取完成'
                ? true
                : false"
              @click="detectAct(props.id)">检测</el-button>
            <el-button
              :disabled="props.predict_status !== 1"
              size="mini"
              @click="checkDetectList(props.softName)">历史</el-button>
        </template>
      </Table>

    <!-- 检测方式 -->
    <GeneDetectionSelect
      v-if="showDetectSelect"
      :softId="softId"
      @closeSelect="showDetectSelect = false" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default{
  name: 'SoftwareGeneDetect',
  data () {
    return {
      searchVal: '',
      searchPlaceholder: '软件名',
      selectOpt: {
        select_1: {
          placeholder: '关联漏洞',
          option: [
            { value: '1', label: '是' },
            { value: '0', label: '否' }
          ]
        },
        select_2: {
          placeholder: '关联漏洞基因',
          option: [
            { value: '1', label: '是' },
            { value: '0', label: '否' }
          ]
        }
      },
      tableTitle: [
        {
          prop: 'softName',
          label: '软件名'
        },
        {
          prop: 'softType',
          label: '类型'
        },
        {
          prop: 'hasRelateBug',
          label: '关联漏洞',
          width: '120'
        },
        {
          prop: 'hasRelateBugGene',
          label: '关联漏洞基因',
          width: '140'
        },
        {
          prop: 'inStoreTime',
          label: '入库时间'
        },
        {
          prop: 'complete_date',
          label: '检测时间'
        },
        {
          prop: 'detect_status',
          label: '软件基因提取状态'
        },
        {
          prop: 'id',
          label: '操作',
          width: 150
        }
      ],
      tableData: [],
      total: 0,
      currentPage: 1,
      uploadShow: false,
      showDetectSelect: false,
      softId: 0,
      timer: null
    }
  },
  computed: {
    ...mapGetters(['softStoreRes'])
  },
  watch: {
    softStoreRes (res) {
      this.tableData = res.results.map(i => {
        i.inStoreTime = this.$common.dateChange(i.inStoreTime)
        i.complete_date = this.$common.dateChange(i.complete_date) || '未检测'
        i.hasRelateBug = i.hasRelateBug ? '是' : '否'
        i.hasRelateBugGene = i.hasRelateBugGene ? '是' : '否'
        i.detect_status = i.detect_status === 1 ? '提取完成' : '正在提取基因'
        i.softType = i.softType ? i.softType : '无'
        return i
      })
      this.total = res.count || 0
    }
  },
  methods: {
    init (val) {
      let obj = {
        startTime: this.$route.query.startTime || '',
        endTime: this.$route.query.endTime || '',
        hasRelateBug: this.$route.query.select_1Val || '',
        hasRelateBugGeneFile: this.$route.query.select_2Val || '',
        searchName: this.$route.query.searchName || '',
        page: val || 1
      }
      this.$store.dispatch('getSoftStoreRes', obj)
      // 定义currentPage传入table组件中，目的是为了在数据点击选项或搜索后若数据未发生变化，即total未发生改变时触发watch跳到第一页
      this.currentPage = val
    },
    // 选择检测方式
    detectAct (id) {
      this.showDetectSelect = true
      this.softId = id
    },
    checkDetectList (name) {
      this.$router.push({
        path: 'SoftwareDetectList',
        query: {
          searchName: name
        }
      })
    }
  },
  mounted () {
    this.init(Number(this.$route.query.page))
    this.timer = setInterval(() => {
      this.init(Number(this.$route.query.page))
    }, 3000)
  },
  beforeRouteLeave (to, from, next) {
    clearInterval(this.timer)
    next()
  }
}
</script>
<style scoped lang="scss">
  .searchOption {
    display: flex;
  }
</style>
