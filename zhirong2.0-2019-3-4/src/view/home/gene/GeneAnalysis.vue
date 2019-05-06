<template>
  <div class="gene-analysis">
    <div class="gene-analysis-con">
      <section
      class="operate-con __text-right">

        <el-date-picker
          v-model="date"
          type="datetimerange"
          range-separator=""
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['12:00:00']"
          @change="dateAct(date)">
        </el-date-picker>

        <div class="el-input el-input--prefix md5-search">
          <input
          type="text"
          name="userName"
          class="el-input__inner"
          placeholder="搜索MD5"
          v-model="md5">
        </div>

        <el-button
        type="primary"
        :loading="false"
        @click="init()">搜索</el-button>

      </section>

      <section class="result-con">
        <FamilyAi2
        :familyClassDom="familyClassDom"
        :familyResult="familyResult"
        ref="familyAi"/>
      </section>

      <div class="btn-container" v-if="familyResult.length">
        <div
        v-if="showTable"
        class="page-con">
          <el-pagination
            class="__text-left"
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="20"
            :pager-count="5"
            @current-change="pageChange"
            :current-page.sync="currentPage">
          </el-pagination>
        </div>
        <div
          v-if="$tokenName !== 'gtd' && false"
          class="btn-con">
          <el-button
          type="primary"
          size="mini"
          @click="downloadFiles">导出文件</el-button>
          <p>
            <span>
              如果标签均为零，则说明该文件无基因
            </span>
          </p>
        </div>
      </div>

      <!-- <section
      v-else
      class="has-no-result">
        <span>无数据</span>
      </section> -->

    </div>
  </div>
</template>
<script>
export default {
  name: 'gene-analysis',
  data () {
    return {
      date: '',
      md5: '',
      startTime: '',
      endTime: '',
      familyClassDom: [],
      familyResult: [],
      currentPage: 1,
      total: 0,
      showTable: true
    }
  },
  watch: {
    currentPage (page) {
      this.$router.push({
        path: '/GeneAnalysis',
        query: {
          pageNo: page || 1
        }
      })
    }
  },
  methods: {
    // 下载基因文件
    downloadFiles () {
      let Arr = this.$refs.familyAi.check
      if (Arr.length) {
        for (var i = 0; i < Arr.length; i++) {
          let a = Arr[i]
          this.$api.get('download_genefiledeamo', {
            id: a
          }).then(res => {
            if (res.data.gene_url === null) {
              this.$message({
                type: 'warning',
                message: '该文件无基因文件'
              })
            } else {
              this.$common.downloadFile(res.data.gene_url)
            }
          })
        }
      } else {
        this.$message({
          type: 'warning',
          message: '请先选择基因文件！'
        })
      }
    },
    dateAct (str) {
      if (str === null) {
        this.searchTimes = ''
        this.startTime = ''
        this.endTime = ''
      } else {
        this.startTime = this.$common.dateChange(str[0])
        this.endTime = this.$common.dateChange(str[1])
      }
    },
    init (val) {
      this.showTable = true
      this.$api.get('analysis_history', {
        page: val || 1,
        md5: this.md5,
        start_time: this.startTime,
        end_time: this.endTime
      }).then(res => {
        if (res && res.count) {
          this.total = res.count
          /*
          @ 更新当前页码
          * 需要在本也数据total有意义后才能生效
          */
          this.currentPage = Number(this.$route.query.pageNo)
          // 遍历添加表头
          // 解析字段：
          // 解析原则：
          this.familyResult = []
          this.familyClassDom = []
          res.results.forEach((i, j) => {
            // table 内容
            let obj = this.$common.formatJson(i.analysis_result)
            let key = ''
            let contentTags = []
            if (i.analysis_result.length) {
              key = Object.getOwnPropertyNames(obj)[0]
              // 要遍历的内容
              contentTags = this.$common.formatJson(i.analysis_result)[key]
              // table-header
              for (let i in contentTags) {
                this.familyClassDom.push(i)
              }
              // table body
              this.familyResult.push({
                id: i.id,
                sample_name: i.sample_name,
                sample_md5: i.sample_md5,
                create_time: this.$common.dateChange(i.create_time),
                tags: contentTags
              })
            } else {
              // this.familyClassDom = []
              this.familyResult.push({
                id: i.id,
                sample_name: i.sample_name,
                sample_md5: i.sample_md5,
                create_time: this.$common.dateChange(i.create_time),
                tags: contentTags
              })
            }
          })
          this.familyClassDom = Array.from(new Set(this.familyClassDom))
          // console.log(this.familyClassDom, this.familyResult)
        } else {
          this.showTable = false
          this.familyResult = []
          this.familyClassDom = []
        }
      })
    },
    pageChange (val) {
      this.currentPage = val
      this.init(val)
    }
  },
  mounted () {
    this.init(this.$route.query.pageNo)
  }
}
</script>
<style scoped="scoped" lang="scss">
  .gene-analysis{
    color: #333;
    .gene-analysis-con {
      margin: 0 auto;
      height: 100%;
      width: 80%;
      .operate-con {
        padding-top: 20px;
        font-size: 0;
        .el-select,
        .el-date-editor{
          width: 50%;
          margin-bottom: 0.5rem;
        }
        .el-select-50 {
          width: calc(24% - 2px);
          margin-right: 1%;
        }
        .el-select-40 {
          width: calc(49% - 98px - 2px);
          margin-right: 1%;
        }
        .md5-search {
          border: 1px solid #3a537e;
          border-radius: 5px;
          width: auto;
          margin-right: .5rem;
        }
      }
      .table-con {
        .load-more-con {
          margin-top: 1rem;
          text-align: center;
        }
      }
      .result-con{
        margin: 1rem 0 0;
      }
      .btn-container {
        position: relative;
        margin-top: 1rem;
        text-align: end;
      }
      .btn-con {
        position: absolute;
        right: 0;
        top: 0;
        p {
          font-size: .8rem;
          color: #999;
          margin-top: .5rem;
        }
      }
      .page-con { margin: 1rem 0; }
      .has-no-result {
        width: calc(100% - 1px);
        text-align: center;
        color: #999;
        font-weight: normal;
        font-size: 1rem;
        box-sizing: border-box;
        padding: 15px 0;
        border: 1px solid #c3c6cb;
        border-top-width: 0;
      }
    }
  }
</style>
