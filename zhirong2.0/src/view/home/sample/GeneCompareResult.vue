<template>
  <div class="GeneCompareResult">
    <Loading v-if="is_unFinished"></Loading>

    <!-- <Table
      :tableTitle="tableTitle"
      :tableData="tableData"
      :total="total"
      :page="currentPage"
      @requestApi="init"
      @sort="sortAct">
        <template slot="jump" slot-scope="props">
          <el-button
            size="mini"
            @click="showImg(props.id)">查看</el-button>
        </template>
      </Table> -->
    <gene-group-chart :optionData="tableData"/>
  </div>
</template>

<script>
// 2019-4-22 需求
// 1，禁止滚动条的放大范围
// 2，鹰眼拖动上下距离
// 3，禁止mni图上点击查看

export default{
  name: 'GeneCompareResult',
  data () {
    return {
      Title: '',
      keyList: [],
      tableTitle: [
        {
          prop: 'gene_count',
          label: '基因数量'
        }, {
          prop: 'similarity',
          label: '相似度'
        }, {
          prop: 'id',
          label: '详情'
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
      this.$api.get('differAnalysis', {
        id: this.$route.query.id,
        tar_md5: this.$route.query.tar_md5,
        sort_style: this.$route.query.sort_style,
        page: Number(val) || 1
      }).then((res) => {
        this.is_unFinished = false
        if (res.length) {
          this.tableData = res.map(i => {
            i.similarity = (i.similarity * 100).toFixed(2) + '%'
            return i
          })
        } else {
          // 无数据，关闭window tab
          this.$notify.warning({
            title: '警告',
            message: '无对比数据，窗口即将关闭...',
            duration: 2000,
            onClose: function () {
              window.close()
            }
          })
        }
      })
      this.currentPage = Number(val) || 1
    },
    showImg (val) {
      this.$router.push({
        path: '/GeneCompareImg',
        query: {id: val}
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
  .GeneCompareResult {
    box-sizing: border-box;
    // padding: 20px 10%;
  }
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
