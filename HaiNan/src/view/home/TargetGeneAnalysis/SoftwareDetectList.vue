<template>
  <div class="SoftwareDetectList">
    <div class="searchOption">
      <Select
        :optData="selectOpt"
        @initList="init"
        @options="optionsAct"
        path="/SoftwareDetectList"/>
      <Search
        :searchPlaceholder="searchPlaceholder"
        @initList="init"
        @searchAct="searchAct"
        path="/SoftwareDetectList"/>
    </div>
    <Table :tableTitle=tableTitle :tableData=tableData />
  </div>
</template>

<script>
export default{
  name: 'SoftwareDetectList',
  data () {
    return {
      searchVal: '',
      searchPlaceholder: '请输入检索的软件名、漏洞名',
      selectOpt: {
        select_1: {
          placeholder: '是否关联漏洞',
          option: [
            { value: 'yes', label: '是' },
            { value: 'no', label: '否' },
            { value: 'unknown', label: '未知' }
          ]
        },
        select_2: {
          placeholder: '是否关联漏洞基因文件',
          option: [
            { value: 'yes', label: '是' },
            { value: 'no', label: '否' },
            { value: 'unknown', label: '未知' }
          ]
        },
        select_3: {
          placeholder: '软件类型',
          option: [
            { value: 'yes', label: '安全' },
            { value: 'no', label: '恶意' },
            { value: 'unknown', label: '未知' },
            { value: '-1', label: '未检测' }
          ]
        }
      },
      tableTitle: [
        {
          prop: 'softNo',
          label: '序号'
        },
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
          label: '是否关联漏洞'
        },
        {
          prop: 'hasRelateBugGene',
          label: '是否关联漏洞基因'
        },
        {
          prop: 'inStoreTime',
          label: '入库时间'
        }
      ],
      tableData: [
        {
          softNo: '2016-05-02',
          softName: '王小虎',
          softType: '2019-2-27',
          hasRelateBug: '低',
          hasRelateBugGene: '2019-2-27',
          inStoreTime: '低'
        },
        {
          softNo: '2016-05-04',
          softName: '王小虎',
          softType: '2019-2-27',
          hasRelateBug: '低',
          hasRelateBugGene: '2019-2-27',
          inStoreTime: '低'
        }
      ],
      hasRelateBug: '',
      hasRelateBugGeneFile: '',
      softType: '',
      startTime: '',
      endTime: ''
    }
  },
  methods: {
    init () {
      console.log('aaa')
    },
    optionsAct (val) {
      this.hasRelateBug = val.select_1Val
      this.hasRelateBugGeneFile = val.select_2Val
      this.softType = val.select_3Val
      this.startTime = val.start_time
      this.endTime = val.end_time
    },
    searchAct (val) {
      this.searchVal = val
    }
  }
}
</script>
<style scoped>
  .searchOption {
    display: flex;
  }
</style>
