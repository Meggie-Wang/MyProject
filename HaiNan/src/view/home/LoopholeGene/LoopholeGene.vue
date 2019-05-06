<template>
  <div class="LoopholeGene">
    <router-intro content="对漏洞信息形成基于软件安装后文件的漏洞基因描述，最终转换为软件漏洞基因库。"/>

    <div class="searchOption">
      <Select
        :optData="selectOpt"
        @initList="init"
        path="/LoopholeGene"/>
      <Search
        :searchPlaceholder="searchPlaceholder"
        @initList="init"
        path="/LoopholeGene"/>
    </div>
    <Table
      :tableTitle=tableTitle
      :tableData=tableData
      :total="total"
      :page="currentPage"
      @requestApi="init"></Table>
  </div>
</template>

<script>
export default{
  name: 'LoopholeGene',
  data () {
    return {
      searchPlaceholder: '文件MD5、软件名',
      searchVal: '',
      selectOpt: {
        select_1: {
          placeholder: '关联漏洞',
          option: [
            { value: '1', label: '是' },
            { value: '0', label: '否' }
          ]
        },
        select_2: {
          placeholder: '基因文件',
          option: [
            { value: '1', label: '是' },
            { value: '0', label: '否' }
          ]
        },
        select_3: this.$bugType
        // select_4: this.$harmWho
      },
      tableTitle: [
        {
          prop: 'fileMd5',
          label: '文件MD5'
        },
        {
          prop: 'belongSoftName',
          label: '所属软件名'
        },
        {
          prop: 'fileType',
          label: '文件类型'
        },
        {
          prop: 'hole_type',
          label: '漏洞类型'
        },
        {
          prop: 'relateBugCount',
          label: '关联漏洞数'
        },
        {
          prop: 'detect_result',
          label: '基因文件',
          width: '100'
        },
        {
          prop: 'inStoreTime',
          label: '入库时间'
        }
      ],
      tableData: [],
      total: 0,
      currentPage: 1
    }
  },
  methods: {
    init (val) {
      let obj = {
        startTime: this.$route.query.startTime || '',
        endTime: this.$route.query.endTime || '',
        hasRelateBugGeneFile: this.$route.query.select_1Val || '',
        is_gene: this.$route.query.select_2Val || '',
        bugType: this.$route.query.select_3Val || '',
        attackType: this.$route.query.select_4Val || '',
        searchName: this.$route.query.searchName || '',
        page: val || 1
      }
      this.$api.get('bugGeneStore', obj).then(res => {
        this.tableData = res.results.map(i => {
          i.inStoreTime = this.$common.dateChange(i.inStoreTime)
          i.hasRelateBugGene = i.hasRelateBugGene ? '是' : '否'
          i.detect_result = i.detect_result === -1 ? '否' : (i.detect_result === 1 ? '是' : '正在检测')
          i.inStoreTime = this.$common.dateChange(i.inStoreTime)
          this.$bugType.option.forEach(j => {
            if (j.value === String(i.hole_type)) {
              i.hole_type = j.label
            } else if (i.hole_type === null) {
              i.hole_type = '无'
            }
          })
          return i
        })
        this.total = res.count || 0
        // 定义currentPage传入table组件中，目的是为了在数据点击选项或搜索后若数据未发生变化，即total未发生改变时触发watch跳到第一页
        this.currentPage = val
      })
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
