<template>
  <div class="LoopholeGeneAnalysis">
    <router-intro content="使用软件基因技术，提取指定漏洞软件相关基因信息。利用软件基因的大数据处理和自动化处理能力，对漏洞信息形成基于软件基因的漏洞描述，最终转换为软件漏洞基因库。为软件漏洞检测提供技术支撑。"/>

    <div class="searchOption">
      <Select
        :optData="selectOpt"
        @initList="init"
        path="/LoopholeGeneAnalysis"/>
      <Search
        :searchPlaceholder="searchPlaceholder"
        @initList="init"
        path="/LoopholeGeneAnalysis"/>
    </div>
    <Table
      :tableTitle="tableTitle"
      :tableData="tableData"
      :total="total"
      :page="currentPage"
      @requestApi="init">

        <template slot="analysis" slot-scope="props">
          <el-button
            size="small"
            @click="jump(props.id)">分析</el-button>
        </template>

      </Table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default{
  name: 'LoopholeGeneAnalysis',
  data () {
    return {
      searchPlaceholder: '漏洞号、漏洞名',
      searchVal: '',
      selectOpt: {
        select_1: this.$harmWho,
        select_2: this.$bugType,
        select_3: {
          placeholder: '危害程度',
          option: [
            {value: '低', label: '低'},
            {value: '中', label: '中'},
            {value: '高', label: '高'},
            {value: 'unknown', label: '未知'}
          ]
        }
      },
      tableTitle: [
        {
          prop: 'bugNo',
          label: '漏洞号'
        },
        {
          prop: 'bugName',
          label: '漏洞名'
        },
        {
          prop: 'inStoreTime',
          label: '录入时间'
        },
        {
          prop: 'harmLevel',
          label: '危害程度',
          width: 120
        },
        {
          prop: 'id',
          label: '操作',
          width: 120
        }
      ],
      tableData: [],
      total: 0,
      currentPage: 1
    }
  },
  computed: {
    ...mapGetters(['bugStoreRes'])
  },
  watch: {
    bugStoreRes (res) {
      this.tableData = res.results.map(i => {
        i.harmLevel = !i.harmLevel ? '未知' : i.harmLevel
        i.relateGeneCount = i.relateGeneCount === 0 ? '0' : i.relateGeneCount
        i.relateSoftCount = i.relateSoftCount === 0 ? '0' : i.relateSoftCount
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
        harmWho: this.$route.query.select_1Val || '',
        bugType: this.$route.query.select_2Val || '',
        harmLevel: this.$route.query.select_3Val || '',
        searchName: this.$route.query.searchName || '',
        page: val || 1,
        analysisStatus: 0
      }
      this.$store.dispatch('getBugStoreRes', obj)
      // 定义currentPage传入table组件中，目的是为了在数据点击选项或搜索后若数据未发生变化，即total未发生改变时触发watch跳到第一页
      this.currentPage = val
    },
    jump (id) {
      this.$router.push({
        path: 'LoopholeGeneAnalysisDetail',
        query: {id: id}
      })
    }
  },
  mounted () {
    this.init(Number(this.$route.query.page))
  }
}
</script>
<style scoped lang="scss">
  .LoopholeGeneAnalysisHead {
    .Title {
      color: $textColor;
      background: $bgColor-opacity;
      font-size: 1rem;
      font-weight: bold;
      border-radius: 2px 2px 0 0;
      padding: 8px 1rem;
    }
    .content {
      margin-top: 1px;
      color: $tableTitleText;
      background: $tableTitleBg;
      font-size: .8rem;
      font-weight: normal;
      padding: 8px 1rem;
    }
  }
  .searchOption {
    display: flex;
    margin-top: .5rem;
  }
</style>
