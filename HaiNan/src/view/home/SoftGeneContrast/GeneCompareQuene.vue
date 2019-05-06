<template>
  <div class="GeneCompareQuene">
    <RouterIntro content="对比检测历史中显示正在检测的进程，和历史检测事件。"/>
    <div class="searchOption">
      <Select
        :optData="selectOpt"
        @initList="init"
        path="/GeneCompareQuene"/>
      <Search
        :searchPlaceholder="searchPlaceholder"
        @initList="init"
        path="/GeneCompareQuene"/>
    </div>
    <Table
      :tableTitle="tableTitle"
      :tableData="tableData"
      :total="total"
      :page="currentPage"
      @requestApi="init">
        <template slot="lookCompare" slot-scope="props">
          <el-button
            size="small"
            :disabled="props.params.analysis_status === '检测中'
              ? true
              : false"
            @click="detectAct(props.params)">查看</el-button>
        </template>
      </Table>
  </div>
</template>

<script>
export default{
  name: 'GeneCompareQuene',
  data () {
    return {
      searchPlaceholder: '文件MD5',
      searchVal: '',
      selectOpt: {
      },
      tableTitle: [
        {
          prop: 'file1Md5',
          label: '文件1MD5'
        },
        {
          prop: 'file2Md5',
          label: '文件2MD5'
        },
        {
          prop: 'create_time',
          label: '提交时间'
        },
        {
          prop: 'analysis_status',
          label: '分析状态'
        },
        {
          prop: 'id',
          label: '操作'
        }
      ],
      tableData: [],
      total: 0,
      currentPage: 1
    }
  },
  watch: {
    analysisName (val) {
      this.inputTst(val)
    }
  },
  methods: {
    init (val) {
      let obj = {
        startTime: this.$route.query.startTime || '',
        endTime: this.$route.query.endTime || '',
        // submit_user: localStorage.userName,
        searchName: this.$route.query.searchName || '',
        page: val || 1
      }
      this.$api.get('detect_history', obj).then(res => {
        this.tableData = res.results.map(i => {
          i.analysis_status = i.analysis_status === '1' ? '检测完成' : '检测中'
          i.file1Md5 = i.sample_list.split('\', \'')[0].split('[\'')[1]
          i.file2Md5 = i.sample_list.split('\', \'')[1].split('\']')[0]
          i.create_time = this.$common.dateChange(i.create_time)
          return i
        })
        this.total = res.count || 0
        // 定义currentPage传入table组件中，目的是为了在数据点击选项或搜索后若数据未发生变化，即total未发生改变时触发watch跳到第一页
        this.currentPage = val
      })
    },
    detectAct (val) {
      this.$router.push({
        path: 'GeneCompareResult',
        query: {
          id: val.id,
          file1Md5: val.file1Md5,
          file2Md5: val.file2Md5,
          lastPage: this.$route.query.page || 1
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
  beforeRouteLeave (to, path, next) {
    clearInterval(this.timer)
    next()
  }
}
</script>
<style scoped lang="scss">
  .searchOption {
    display: flex;
  }
  .borderColor {
    border: 1px solid $greenLight;
  }
  ._hide {
    display: none;
  }
  .bg {
    background-color: $greenLight;
    color: #fff;
  }
  .grayBg {
    background-color: $geneToolSelectBg;
    color: #fff;
  }
  .option-select {
    font-size: 0;
  }
  .option-select label {
    font-size: 0.8rem;
    display: inline-block;
    height: 1.5rem;
    line-height: 1.5rem;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    padding-left: 10px;
    padding-right: 10px;
    border: 1px solid $greenLight;
    border-bottom: none;
    border-right: none;
  }
  .option-select label:last-child {
    border-right: 1px solid $greenLight;
  }
  .parameter-option .parameter-option-con {
    box-sizing: border-box;
    padding: 1rem .5rem;
  }
  .parameter-option .cluster-rate div {
    margin-left: 5px;
    width: 50%;
  }
  .parameter-option .parameter-option-auto {
    margin: .5rem 0;
  }
  .gene-clustering-name {
    margin: 1rem 1rem 0 0;
    width: calc(100% - 10rem);
  }
  .GeneContrast-btn-con {
    margin-top: 1rem;
    text-align: center;
  }
  .contrastImg {
    background-color: $bgColor-opacity;
    height: 320px;
    margin-top: 1rem;
  }
  .clusteringResults {
    margin: 2% auto;
    .charts{
      height: 20rem;
    }
    .family_num_err {
      font-size: .8rem;
      color:red;
      margin-top: .5rem;
      text-align: center;
    }
  }
  .family_num_err {
    font-size: .8rem;
    color: red;
    margin-top: .5rem;
  }
</style>
<style>
  .el-tabs__nav {
    width: 100%;
  }
  .el-tabs__item {
    width: 50%;
    text-align: center;
    font-size: 1rem;
  }
  .el-tabs__active-bar {
    background-color: $bgColor-opacity;
  }
</style>
