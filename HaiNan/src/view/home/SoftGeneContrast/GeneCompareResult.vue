<template>
  <div class="GeneCompareResult">
    <Loading v-if="is_unFinished"></Loading>
    <DetailTitle :title="Title"/>
    <Table
      :tableTitle="tableTitle"
      :tableData="tableData"
      :total="total"
      :page="currentPage"
      @requestApi="init"
      @showImg="showImg"
      @sort="sortAct" />
  </div>
</template>

<script>
export default{
  name: 'GeneCompareResult',
  data () {
    return {
      Title: '',
      keyList: [],
      tableTitle: [
        {
          prop: 'func1',
          label: '文件1'
        }, {
          prop: 'func2',
          label: '文件2'
        }, {
          prop: 'value',
          label: '相似度'
        }
      ],
      tableData: [],
      pngData: [],
      AllData: [],
      Img: [],
      total: 0,
      currentPage: 1,
      is_unFinished: true,
      sort: false
    }
  },
  watch: {
  },
  methods: {
    init (val, sort) {
      this.$api.get('analysis_result', {
        result_id: this.$route.query.id,
        sort_type: sort ? 1 : null
      }).then((res) => {
        this.is_unFinished = false
        this.AllData = res.data.analysis_result.key_list
        this.total = this.AllData.length
        this.pngData = res.data.analysis_result.png_data
        if (val === 1) {
          this.keyList = []
          this.paging(this.keyList, this.AllData, 20)
          this.funcSplit(this.keyList)
          this.tableData = this.keyList
        } else {
          this.keyList = []
          this.pagechange(this.keyList, this.AllData, val, 20)
          this.funcSplit(this.keyList)
          this.tableData = this.keyList
        }
      })
      this.currentPage = Number(val) || 1
    },
    showImg (val) {
      this.Img = []
      let imgPath = this.pngData[val.name]
      for (let i = 0; i < imgPath.length; i++) {
        var a = this.$api.apiPath + 'api/image_show/?image_path=' + imgPath[i] + '&token=' + localStorage[localStorage.tokenName + '_token']
        this.Img.push(a)
      }
      this.$router.push({
        path: '/GeneCompareImg',
        query: {imgArr: this.Img, func1: val.func1, func2: val.func2}
      })
    },
    // 翻页事触发的事件 data为存储当前页数据的数组 e为总数据 val为页码 pageSize为每页条数
    pagechange (data, e, val, pageSize) {
      if (e && e.length) {
        if (val > (e.length / pageSize)) {
          for (var i = (val - 1) * pageSize; i < e.length; i++) {
            data.push(e[i])
          }
        } else {
          for (var j = (val - 1) * pageSize; j < val * pageSize; j++) {
            data.push(e[j])
          }
        }
      }
    },
    // 第一次进入页面触发的事件 data为存储当前页数据的数组 e为总数据 pageSize为每页条数
    paging (data, e, pageSize) {
      if (e && e.length) {
        if (e.length > pageSize) {
          for (var i = 0; i < pageSize; i++) {
            data[i] = e[i]
          }
        } else {
          for (var j = 0; j < e.length; j++) {
            data[j] = e[j]
          }
        }
      }
    },
    funcSplit (Arr) {
      Arr.map(i => {
        i.func1 = i.name.split(',')[0] ? i.name.split(',')[0] : '无'
        i.func2 = i.name.split(',')[1] ? i.name.split(',')[1] : '无'
        i.value = (i.value * 100).toFixed(2) + ' %'
        return i
      })
    },
    sortAct () {
      this.sort = !this.sort
      this.init(this.$route.query.lastPage, this.sort)
    }
  },
  mounted () {
    this.init(Number(this.$route.query.page) || 1)
    this.Title = this.$route.query.file1Md5 + '，' + this.$route.query.file2Md5
  }
}
</script>
<style scoped lang="scss">
  .compareReultList {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }
  .compareReult {
    display: block;
    padding: 8px 10px;
    text-align: center;
    border: 1px solid $tableTitleText;
    border-radius: 3px;
    background-color: $bgColor-opacity;
    width: calc(50% - 22px);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
<style lang="scss">
  .el-pagination {
    text-align: right;
    margin-top: .5rem;
    padding-right: 0;
    .el-pager {
      margin: 0 1px;
      li {
        margin: 0 1px;
        border-radius: 2px;
      }
      li:hover, li.active {
        background: #fff;
      }
    }
    button {
      border-radius: 2px;
    }
  }
</style>
