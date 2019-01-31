<template>
  <div class="AnalysisReport">
    <div class="AnalysisReport-container">
      <el-radio-group v-model="tabPosition" @change="handleClick">
        <el-radio-button label="daily">日报</el-radio-button>
        <el-radio-button label="weekly">周报</el-radio-button>
        <el-radio-button label="monthly">月报</el-radio-button>
      </el-radio-group>
      <el-tabs :tab-position="tabPosition">
        <div class="__beeTable">
          <ul>
            <li>标题</li>
            <li>生成时间</li>
            <li>查看</li>
          </ul>
          <ul v-for="(analysisReportData, index) in analysisReportData.results" :key="index">
            <li>{{ analysisReportData.report_result }}</li>
            <li>{{ $common.dateChange(analysisReportData.create_time) }}</li>
            <li>
              <img
                :src="$img.view"
                class="check-report-icon __handCursor"
                @click="viewReport(analysisReportData.id,
                  analysisReportData.report_result,
                  tabNumber)">
            </li>
          </ul>
        </div>
      </el-tabs>
      <el-pagination
        v-if="analysisReportData.count"
        class="__text-left page-con"
        background
        layout="prev, pager, next"
        :total="analysisReportData.count"
        :page-size="20"
        :pager-count="5"
        @current-change="pageChange"
        :current-page.sync="currentPage">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AnalysisReport',
  data () {
    return {
      tabPosition: 'daily',
      tabNumber: 1,
      currentPage: 1
    }
  },
  computed: {
    ...mapGetters(['analysisReportData'])
  },
  watch: {
    currentPage (page) {
      this.urlSync()
    }
  },
  methods: {
    urlSync () {
      this.$router.push({
        path: '/AnalysisReport',
        query: {
          pageNo: this.currentPage,
          type: this.tabNumber
        }
      })
    },
    init (val) {
      this.$store.dispatch('getAnalysisReport', {
        type: this.tabNumber,
        page: val || 1,
        _this: this
      })
    },
    handleClick (val) {
      if (val === 'daily') {
        this.tabNumber = 1
      } else if (val === 'weekly') {
        this.tabNumber = 2
      } else if (val === 'monthly') {
        this.tabNumber = 3
      }
      this.urlSync()
      this.init(this.currentPage = 1)
    },
    viewReport (id, title, type, importLevel) {
      this.$router.push({
        path: '/ReportDetail',
        query: {
          id: id,
          title: title,
          type: this.tabNumber
        }
      })
    },
    pageChange (val) {
      this.currentPage = val
      this.init(val)
    }
  },
  mounted () {
    this.tabNumber = this.$route.query.type || 1
    switch (Number(this.tabNumber)) {
      case 1:
        this.tabPosition = 'daily'
        break
      case 2:
        this.tabPosition = 'weekly'
        break
      case 3:
        this.tabPosition = 'monthly'
        break
    }
    this.init(this.$route.query.pageNo)
  }
}
</script>
<style scoped="scoped">
  .AnalysisReport-container {
    width: 80%;
    margin: 20px auto 0;
  }
  .__beeTable ul {
    justify-content: space-between;
  }
  .__beeTable ul li:first-of-type {
    flex: 2;
  }
  .__beeTable ul li:nth-of-type(2) {
    flex: 1.5;
  }
  .__beeTable ul li:last-of-type {
    flex: 1;
    align-items: center;
  }
  .check-report-icon {
    height: 1rem;
  }
  .page-con {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
</style>
