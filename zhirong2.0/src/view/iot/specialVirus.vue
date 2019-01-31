<template>
  <div class="specialVirus">
    <div class="specialVirus_container">
      <section class="table-con">
        <el-table
          :data="tableData"
          border
          fit
          highlight-current-row
          :cell-style="{borderColor: '#64A5D4', 'text-align': 'center'}"
          :header-cell-style="{borderColor: '#64A5D4', textAlign: 'center', color: '#000'}"
          style="border: 1px solid #64A5D4">

          <el-table-column prop="name" label="病毒名称" width="260">
          </el-table-column>

          <el-table-column
            label="影响系统"
            prop="influence">
          </el-table-column>

          <el-table-column
            label="危害说明"
            prop="ins">
          </el-table-column>

          <el-table-column
            label="详情查看"
            width="90">
            <template slot-scope="scope">
              <img
              class="check-report-icon __handCursor"
              :src="$img.view"
              @click="checkReport(scope.row.name, scope.row.discribe)">
            </template>
          </el-table-column>

        </el-table>

        <div class="btn-container" v-if="tableData.length">
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

      </section>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      options: {},
      tableData: [],
      total: 0,
      alltags: [],
      currentPage: 1,
      selectFile: [],
      loading: false
    }
  },
  methods: {
    pageChange (val) {
      this.currentPage = Number(val)
      this.init(val)
    },
    // 判断data数据中的discrib字段是否有值来设置跳转路径及显示提示
    checkReport (name, disc) {
      if (disc === '') {
        this.$message({
          message: '此特种病毒暂无详情',
          type: 'warning'
        })
      } else if (disc.indexOf('@path:') > -1) {
        this.$router.push({'path': disc.split('path:')[1]})
      } else {
        this.$router.push({'path': '/iotVirusEncyclopedia', query: {name: name, dis: disc}})
        console.log('bbb')
      }
      // this.$router.push({'path': '/iotSampleReport', query: {md5: md5, id: id}})
    },
    init () {
      axios.get('../../../static/specialVirus.json').then(res => {
        this.tableData = res
        this.total = this.tableData.length
      })
    }
  },
  mounted () {
    this.init()
    // 为了防止sibebar卡顿，使得加载数据在0.5（sidebar运行时间）后执行
    setTimeout(() => {
      // lable数据
      this.$store.dispatch('getAllLable')
    }, 500)
  }
}
</script>
<style scoped>
  .specialVirus_container {
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
