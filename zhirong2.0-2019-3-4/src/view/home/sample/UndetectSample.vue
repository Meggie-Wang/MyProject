<template>
  <div class="UndetectSample">
    <Loading v-if="is_unFinished"></Loading>
    <div class="UndetectSample_container">
      <section
        class="operate-con">
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
      <section
        class="table-con"
        style="height: calc(50% - 0px);">
        <el-table
          :data="tableData"
          border
          fit
          highlight-current-row
          :cell-style="{borderColor: '#3a537e', textAlign: 'center'}"
          :header-cell-style="{borderColor: '#3a537e', textAlign: 'center', color: '#000'}"
          style="border: 1px solid #3a537e"
          @selection-change="handleSelectionChange">
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
            label="操作"
            width="90">
            <template slot-scope="scope">
              <span
              class="doDetect __handCursor"
              @click="doDetect(scope.row.id)">添加检测</span>
            </template>
          </el-table-column>
          <el-table-column
            type="selection"
            width="40">
          </el-table-column>
        </el-table>
      </section>
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
        <div class="btn-con">
          <el-button
            type="primary"
            size="mini"
            @click="downloadFiles">导出样本</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      date: '',
      md5: '',
      tableData: [],
      startTime: '',
      endTime: '',
      currentPage: 1,
      total: 0,
      selectFile: [],
      is_unFinished: true
    }
  },
  computed: {
    ...mapGetters(['undetectSample'])
  },
  watch: {
    undetectSample (val) {
      this.tableData = val.results
      this.total = val.count
      this.is_unFinished = false
    },
    currentPage (page) {
      this.$router.push({
        path: '/UndetectSample',
        query: {
          pageNo: page || 1
        }
      })
    },
    startTime (val) {
      if (val === '') {
        this.init()
      }
    }
  },
  methods: {
    init (val) {
      let a = {
        page: val || 1,
        start_time: this.startTime,
        end_time: this.endTime,
        hash_style: 'md5',
        hash_value: this.md5,
        md5: this.md5,
        submit_user: localStorage.userClass === 4 ? localStorage.userName : ''
      }
      this.$store.dispatch('getUndetectSample', a)
    },
    changeTime (date, md5) {
      if (date) {
        this.startTime = this.$common.dateChange(date[0])
        this.endTime = this.$common.dateChange(date[1])
        this.init()
      } else {
        this.startTime = ''
        this.endTime = ''
      }
      this.currentPage = 1
    },
    pageChange (val) {
      this.currentPage = val
      this.init(val)
    },
    doDetect (id) {
      this.$api.get('detectionUndetectSample', {sample_id: id, user: localStorage.userName, user_id: localStorage.userClass}).then((res) => {
        if (res.status === 200) {
          this.init(this.$route.query.pageNo)
        } else {
          alert(res.message)
        }
      })
    },
    // checkbox触发
    handleSelectionChange (val) {
      this.selectFile = val
    },
    downloadFiles () {
      // 上传选中的ids
      let ids = []
      this.selectFile.forEach(function (i, j) {
        ids.push(i.id)
      })

      // 一个文件时候返回正常数据格式
      // 多个文件时候是文件流，无status
      if (ids.length === 1 || ((this.$tokenName !== 'gtd' && this.$tokenName !== 'zhirong') && ids.length > 0)) {
        this.loading = true
        this.$api.get('uploadUndetectSample', {
          sample_list: JSON.stringify(ids),
          user: localStorage.userName
        }).then(res => {
          this.loading = false
          res.data.forEach(function (element, index) {
            this.$common.downloadFile(element)
          }.bind(this))
        })
      } else if (ids.length > 1) {
        this.loading = true
        this.$api.blob('uploadUndetectSample', {
          sample_list: JSON.stringify(ids),
          user: localStorage.userName
        }).then(res => {
          this.loading = false
          let url = window.URL.createObjectURL(new Blob([res]))
          let link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', '多个未检测文件.tar.gz')
          document.body.appendChild(link)
          link.click()
        })
      } else {
        this.$message({
          type: 'warning',
          message: '请先选择样本！'
        })
      }
    }
  },
  mounted () {
    this.currentPage = Number(this.$route.query.pageNo)
    this.init(this.currentPage)
  }
}
</script>
<style scoped>
  .UndetectSample_container {
    width: 80%;
    margin: 0 auto;
  }
  .operate-con {
    display: flex;
    justify-content: flex-end;
    padding: 20px 0;
  }
  .operate-con > div {
    margin-right: 10px;
  }
  .el-input__inner, .el-input {
    width: auto;
    border: 1px solid #3a537e;
    border-radius: 5px;
  }
  .doDetect {
    color: #3a537e;
  }
  .btn-container {
    position: relative;
    margin-top: 1rem;
    margin-bottom: 1rem;
    text-align: end;
  }
  .btn-con {
    position: absolute;
    right: 0;
    top: 0;
  }
</style>
