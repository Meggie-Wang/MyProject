<template>
  <div class="LoopholeDatabase">
    <router-intro content="漏洞是在硬件、软件、协议的具体实现或系统安全策略上存在的缺陷，从而可以使攻击者能够在未授权的情况下访问或破坏系统。是受限制的计算机、组件、应用程序或其他联机资源的无意中留下的不受保护的入口点。"/>

    <div class="searchOption">
      <Select
        :optData="selectOpt"
        @initList="init"
        path="/LoopholeDatabase"/>
      <Search
        :searchPlaceholder="searchPlaceholder"
        @initList="init"
        path="/LoopholeDatabase"/>
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
  name: 'LoopholeDatabase',
  data () {
    return {
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
          width: '100'
        },
        {
          prop: 'relateSoftCount',
          label: '相关软件数量',
          width: '110'
        },
        {
          prop: 'relateGeneCount',
          label: '相关基因数量',
          width: '110'
        }
      ],
      tableData: [],
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
      searchPlaceholder: '漏洞号、漏洞名',
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
        page: val || 1
      }
      this.$store.dispatch('getBugStoreRes', obj)
      // 定义currentPage传入table组件中，目的是为了在数据点击选项或搜索后若数据未发生变化，即total未发生改变时触发watch跳到第一页
      this.currentPage = val
    }
  },
  mounted () {
    this.init(Number(this.$route.query.page))
  }
}
</script>
<style scoped lang="scss">
  .searchOption {
    display: flex;
  }
</style>
