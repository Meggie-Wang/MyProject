<template>
  <div class="detectionHistory iotsearch-options">
    <div class="detectionHistory_container">
      <section class="table-con">
        <el-table
          :data="tableData"
          border
          fit
          highlight-current-row
          :cell-style="{borderColor: '#98ACE9', 'text-align': 'center'}"
          :header-cell-style="{borderColor: '#98ACE9', textAlign: 'center', color: '#000'}"
          style="border: 1px solid #98ACE9">

          <el-table-column label="测试文件名" width="260">
            <template slot-scope="scope">
              <FileName :name="scope.row.sample_name" :length="20" />
            </template>
          </el-table-column>

          <el-table-column prop="sample_md5" label="MD5" width="320"></el-table-column>

          <el-table-column
            prop="platform"
            label="运行平台">
          </el-table-column>

          <el-table-column
            prop="sample_label"
            label="恶意标签">
            <template slot-scope="scope">
              <!-- exist 每次搜索的时候，值可能是一样的，这样在组件内就不会触发watch，所以此处加了一个random()以保证没次触发 -->
              <Tags
              :id="scope.row.id"
              :md5="scope.row.sample_md5"
              :exist="scope.row.sample_label + ',' + Math.random()"
              :chooseTags="chooseTags"
              :alltags="alltags"
              @initList="init(currentPage)"/>
            </template>
          </el-table-column>

          <el-table-column
            prop="gene_family"
            label="家族信息">
            <template slot-scope="scope">
              <span v-if="scope.row.gene_family">{{scope.row.gene_family}}</span>
              <span v-else>无</span>
            </template>
          </el-table-column>

          <el-table-column
            label="详情查看"
            width="90">
            <template slot-scope="scope">
              <img
              class="check-report-icon __handCursor"
              :src="$img.view"
              @click="checkReport(scope.row.sample_md5, scope.row.is_malicious, scope.row.id)">
            </template>
          </el-table-column>

        </el-table>

        <div class="btn-container" v-if="tableData.length">
          <el-pagination
            class="__text-right"
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="20"
            :pager-count="5"
            @current-change="pageChange"
            :current-page.sync="currentPage">
          </el-pagination>
        </div>

      </section>
      <SearchOptions
        :alltags="alltags"
        :load="loading"
        :currentPage="currentPage"
        path="/maliceSample"
        :showGenePcap="true"
        @initList="init"
        @options="optionsAct"/>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      options: {},
      chooseTags: [],
      tableData: [],
      total: 0,
      alltags: [],
      currentPage: 1,
      loading: false
    }
  },
  computed: {
    ...mapGetters(['allLable'])
  },
  watch: {
    allLable (res) {
      // 接收allLabel
      // 由于Tags组件 也需要使用 所以alltags在这里加载，并不是只在serachOptions
      this.alltags = this.$common.inheritObj(res)
    }
  },
  methods: {
    optionsAct (data) {
      this.options = data
    },
    init (page) {
      // console.log(page)
      this.loading = true
      this.currentPage = Number(page) || 1
      // 后去选择的标签
      this.chooseTags = this.options.tags ? JSON.parse(this.options.tags) : ''
      this.chooseTags.reverse()
      // table数据
      let a = {
        page: page || 1,
        md5: this.options.md5,
        apt: this.options.apt,
        tags: this.options.tags,
        malicious: this.options.malicious,
        start_time: this.options.start_time,
        end_time: this.options.end_time,
        gene_path: this.options.gene_path,
        pcap_path: this.options.pcap_path
      }
      if (Number(localStorage.userClass) === 4) {
        a.submit_user = window.localStorage.userName
      }
      this.$api.get('detection_history', a).then((res) => {
        this.loading = false
        if (res) {
          this.total = res.count
          this.tableData = res.results
          for (var i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].sample_label.indexOf('Dos') > -1) {
              this.tableData[i].platform = 'Dos'
            } else if (this.tableData[i].sample_label.indexOf('Linux') > -1) {
              this.tableData[i].platform = 'Linux'
            } else if (this.tableData[i].sample_label.indexOf('Windows') > -1) {
              this.tableData[i].platform = 'Windows'
            } else {
              this.tableData[i].platform = '无'
            }
          }
          /*
          @ 更新当前页码
          * 需要在本也数据total有意义后才能生效
          */
          this.currentPage = Number(this.$route.query.pageNo) || 1
        }
      })
    },
    pageChange (val) {
      this.currentPage = Number(val)
      this.init(val)
    },
    checkReport (md5, malicious, id) {
      this.$router.push({'path': '/iotSampleReport', query: {md5: md5, id: id}})
    }
  },
  mounted () {
    // 为了防止sibebar卡顿，使得加载数据在0.5（sidebar运行时间）后执行
    setTimeout(() => {
      // lable数据
      this.$store.dispatch('getAllLable')
    }, 500)
  }
}
</script>
<style scoped>
  .detectionHistory_container {
    width: 80%;
    margin: 0 auto;
    padding-bottom: 1rem;
  }
  .table-con {
    margin-top: 1rem;
  }
  .tags-con .el-tag{
    margin: 0 .7rem .5rem 0;
  }
  .check-report-icon {
    height: 1rem;
  }
  .search-btn-con button {
    margin-top: 1rem;
    width: auto;
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
  }
</style>
