<template>
  <div class="LoopholeSoftwareDatabase">
    <router-intro content="对漏洞信息形成基于软件的漏洞描述，最终转换为软件漏洞软件库。"/>

    <div class="searchOption">
      <Select
        :optData="selectOpt"
        @initList="init"
        path="/LoopholeSoftwareDatabase"/>
      <Search
        :searchPlaceholder="searchPlaceholder"
        @initList="init"
        path="/LoopholeSoftwareDatabase"/>
    </div>
    <Table
      :tableTitle="tableTitle"
      :tableData="tableData"
      :total="total"
      :page="currentPage"
      @requestApi="init"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default{
  name: 'LoopholeSoftwareDatabase',
  data () {
    return {
      searchPlaceholder: '软件名',
      searchName: '',
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
        },
        select_3: this.$harmWho,
        select_4: this.$bugType
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
          prop: 'update_date',
          label: '检测时间'
        },
        {
          prop: 'softSource',
          label: '软件来源'
        }
      ],
      tableData: [],
      total: 0,
      currentPage: 1
    }
  },
  computed: {
    ...mapGetters(['softStoreRes'])
  },
  watch: {
    softStoreRes (res) {
      this.tableData = res.results.map(i => {
        i.inStoreTime = this.$common.dateChange(i.inStoreTime)
        i.update_date = this.$common.dateChange(i.update_date)
        i.hasRelateBug = i.hasRelateBug ? '是' : '否'
        i.hasRelateBugGene = i.hasRelateBugGene ? '是' : '否'
        i.softType = i.softType ? i.softType : '无'
        i.softSource = i.softSource ? i.softSource : '无'
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
        bugType: this.$route.query.select_3Val || '',
        harmWho: this.$route.query.select_4Val || '',
        searchName: this.$route.query.searchName || '',
        page: val || 1
      }
      this.$store.dispatch('getSoftStoreRes', obj)
      // 定义currentPage传入table组件中，目的是为了在数据点击选项或搜索后若数据未发生变化，即total未发生改变时触发watch跳到第一页
      this.currentPage = val
    }
  },
  mounted () {
    this.init(Number(this.$route.query.page))
  }
}
</script>
<style scoped>
  .searchOption {
    display: flex;
  }
</style>
