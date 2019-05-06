<template>
  <div class="detectionHistory">
    <Loading v-if="is_unFinished"></Loading>
    <div class="detectionHistory_container">
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

        <el-select
          v-if="$tokenName === 'gtd' || $tokenName === 'zhirong'"
          v-model="uploadStyle"
          @change="init(currentPage = 1)">
          <template slot="prefix" v-if="uploadStyle">
            <i
              class="el-icon-error el-icon-error-custom"
              @click="uploadStyle = ''; init(currentPage = 1)"
              style="line-height: 40px;"></i>
          </template>
          <el-option
            v-for="item in uploadStyleOption"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
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
          style="border: 1px solid #3a537e">

          <el-table-column label="文件名">
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
            label="上传方式"
            width="160"
            v-if="$tokenName === 'gtd' || $tokenName === 'zhirong'">
            <template slot-scope
              ="scope">{{ scope.row.upload_style === '0' ? '批量上传' : '手动上传' }}</template>
          </el-table-column>

          <el-table-column
            v-if="$tokenName === 'gtd'"
            label="检测状态"
            width="160">
            <template slot-scope="scope">{{ detectStatus[scope.row.detect_status]}}</template>
          </el-table-column>
          <el-table-column
            v-else
            label="检测状态"
            width="160">
            <template slot-scope="scope">{{ scope.row.detect_status === 0 ? '等待预处理检测' : (scope.row.detect_status === 1 ? '等待动态检测' : (scope.row.detect_status === 2 ? '正在预处理检测' : '正在动态检测')) }}</template>
          </el-table-column>

          <el-table-column
            label="操作"
            width="90">
            <template slot-scope="scope">
              <span
                v-if="scope.row.detect_status === 0 || scope.row.detect_status === 1">
                <span
                  v-if="scope.row.is_priority === -1" class="precedence __handCursor"
                  @click="setPrecedence(scope.row.id)">设置优先</span>
                <span v-else class="precedence">已优先</span>
              </span>
              <span v-else>无操作</span>
            </template>
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
      timer: {},
      is_unFinished: true,
      uploadStyle: '',
      uploadStyleOption: [
        {
          value: '批量上传',
          label: '批量上传'
        },
        {
          value: '手动上传',
          label: '手动上传'
        }
      ],
      detectStatus: ['等待检测', '等待动态检测', '静态检测中', '动态检测中']
    }
  },
  computed: {
    ...mapGetters(['detQueue'])
  },
  watch: {
    detQueue (val) {
      this.tableData = val.results
      this.total = val.count
      this.is_unFinished = false
    },
    currentPage (page) {
      this.$router.push({
        path: '/DetectionQueue',
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
      let uploadStyle = ''
      if (this.uploadStyle === '批量上传') {
        uploadStyle = '0'
      } else if (this.uploadStyle === '手动上传') {
        uploadStyle = '1'
      }
      let a = {
        page: val || 1,
        start_time: this.startTime,
        end_time: this.endTime,
        upload_style: uploadStyle,
        hash_style: 'md5',
        hash_value: this.md5,
        md5: this.md5,
        submit_user: localStorage.userClass === 4 ? localStorage.userName : ''
      }
      this.$store.dispatch('getDetQueue', a)
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
    setPrecedence (id) {
      this.$api.get('precedence', {id: id, status: 1}).then((res) => {
        if (res.status === 200) {
          this.init(this.$route.query.pageNo)
        } else {
          alert(res.message)
        }
      })
    },
    pageChange (val) {
      this.currentPage = val
      this.init(val)
    }
  },
  mounted () {
    this.currentPage = Number(this.$route.query.pageNo)
    this.init(this.currentPage)
    this.timer = setInterval(() => {
      this.init(this.currentPage)
    }, 10000)
  },
  beforeRouteLeave (to, from, next) {
    clearInterval(this.timer)
    next()
  }
}
</script>
<style scoped>
  .detectionHistory_container {
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
  .precedence {
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
