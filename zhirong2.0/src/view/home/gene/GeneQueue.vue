<template>
  <div class="gene-queue">
    <div class="gene-queue-con">
      <section class="operate-con">
        <el-date-picker
          v-model="date"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['12:00:00']"
          @change="changeTime">
        </el-date-picker>
        <el-input v-model="md5" placeholder="搜索MD5"></el-input>
        <el-button
          type="primary"
          :loading="false"
          @click="init(currentPage = 1)">搜索</el-button>
      </section>

      <section class="table-con">
        <el-table
          :data="tableData"
          border
          fit
          highlight-current-row
          :cell-style="{borderColor: '#3a537e', textAlign: 'center'}"
          :header-cell-style="{borderColor: '#3a537e', textAlign: 'center', color: '#000'}"
          style="border: 1px solid #3a537e">

          <el-table-column label="测试文件名">
            <template slot-scope="scope">
              <FileName :name="scope.row.sample_name" :length="32" />
            </template>
          </el-table-column>

          <el-table-column prop="sample_md5" label="MD5"></el-table-column>

          <el-table-column
            label="提交时间"
            width="160">
            <template slot-scope="scope">{{ $common.dateChange(scope.row.create_time) }}</template>
          </el-table-column>

          <el-table-column
            label="分析状态"
            width="160">
            <template slot-scope="scope">{{ Number(scope.row.analysis_status) ? '正在分析' : '等待分析' }}</template>
          </el-table-column>
        </el-table>
      </section>

      <div class="btn-container">
        <el-pagination
          v-if="total"
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
    </div>
  </div>
</template>
<script>
export default {
  name: 'geneQueue',
  data () {
    return {
      date: '',
      md5: '',
      startTime: '',
      endTime: '',
      tableData: [],
      total: 0,
      timer: {},
      currentPage: 1
    }
  },
  watch: {
    currentPage (page) {
      // 更新url上pageNo
      console.log(page)
      this.$router.push({
        path: '/GeneQueue',
        query: {
          pageNo: page || 1
        }
      })
    }
  },
  methods: {
    changeTime (date) {
      if (date) {
        this.startTime = this.$common.dateChange(date[0])
        this.endTime = this.$common.dateChange(date[1])
      } else {
        this.startTime = ''
        this.endTime = ''
      }
    },
    init (val) {
      this.$api.get('analysis_queue', {
        page: val || this.currentPage,
        md5: this.md5,
        start_time: this.startTime,
        end_time: this.endTime
      }).then(res => {
        if (res) {
          this.tableData = res.results
          this.total = res.count
          /*
          @ 更新当前页码
          * 需要在本地数据total有意义后才能生效
          */
          this.currentPage = Number(this.$route.query.pageNo) || 1
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
    this.timer = setInterval(() => {
      this.init(this.$route.query.pageNo)
    }, 10000)
  },
  beforeRouteLeave (to, from, next) {
    clearInterval(this.timer)
    next()
  }
}
</script>
<style scoped="scoped" lang="scss">
  .gene-queue {
    .gene-queue-con {
      width: 80%;
      margin: 0 auto;
      .operate-con {
        padding: 20px 0;
        text-align: end;
      }
      .btn-container {
        margin-top: 1rem;
      }
    }
  }
  .el-input__inner, .el-input {
    width: auto;
    border: 1px solid #3a537e;
    border-radius: 5px;
  }
</style>
