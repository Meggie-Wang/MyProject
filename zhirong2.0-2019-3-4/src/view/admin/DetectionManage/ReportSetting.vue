<template>
  <div class="ReportSetting">
    <div class="ReportSetting-con">
      <header><h2>报表设置</h2></header>
      <el-button @click="showDialog('实时报表设置')">实时报表设置</el-button>
      <el-button @click="showDialog('定时报表设置')">定时报表设置</el-button>
      <el-dialog
        :title="dialogTitle"
        :visible.sync="centerDialogVisible"
        center
        :before-close="handleClose">
        <div>
          <header><h2>{{ dialogTitle === '实时报表设置' ? '时间选择' : '定时报表类型' }}</h2></header>
          <div v-if="dialogTitle === '实时报表设置'">
            <el-date-picker
              v-model="outputReportTime"
              type="datetimerange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy-MM-dd">
            </el-date-picker>
          </div>
          <div v-else>
            <el-checkbox-group v-model="timingRepoteType">
              <el-checkbox-button label="dayReport">日报</el-checkbox-button>
              <el-checkbox-button label="monthReport">月报</el-checkbox-button>
              <el-checkbox-button label="weekReport">周报</el-checkbox-button>
            </el-checkbox-group>
          </div>
        </div>
        <div>
          <header><h2>数量设置</h2></header>
          <div class="numSetting">
            <span>最新告警信息数量：</span>
            <el-input v-model="AlarmNum" placeholder="请输入数量（10-100）"></el-input>
          </div>
        </div>
        <el-button :disabled="dialogTitle === '实时报表设置' ? ((outputReportTime === null ? outputReportTime === null : outputReportTime.length === 0) || AlarmNum === '') : (AlarmNum === '')" @click="dialogTitle === '实时报表设置' ? outputReport() : timingSetting ()">{{ dialogTitle === '实时报表设置' ? '生成报表' : '保存设置' }}</el-button>
      </el-dialog>
    </div>
    <div class="ReportRecord">
      <header><h2>报表记录</h2></header>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="实时报表" name="1">
          <el-date-picker
            v-model="ReportRecordDate"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-MM-dd"
            @change="changeReportRecordTime">
          </el-date-picker>
          <el-table
            :data="tableData"
            border
            fit
            highlight-current-row
            :cell-style="{borderColor: '#3a537e', textAlign: 'center'}"
            :header-cell-style="{borderColor: '#3a537e', textAlign: 'center', color: '#000'}"
            style="border: 1px solid #3a537e">
            <el-table-column label="生成时间">
              <template slot-scope="scope">{{ $common.dateChange(scope.row.create_time) }}</template>
            </el-table-column>
            <el-table-column prop="gen_user" label="生成用户"></el-table-column>
            <el-table-column width="150" label="查看">
              <template slot-scope="scope">
                <img class="__handCursor" :src="$img.view" alt="" @click="showReport(scope.row.id)">
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="定时报表" name="2">
          <el-select
            v-model="ReportType"
            @change="getReportRecordData(ReportType, currentPage = 1)">
            <template slot="prefix">
              <i
                class="el-icon-error el-icon-error-custom"
                @click="ReportType = '2'; getReportRecordData(ReportType, currentPage = 1)"
                style="line-height: 40px;"></i>
            </template>
            <el-option
              v-for="item in ReportTypeOption"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-table
            :data="tableData"
            border
            fit
            highlight-current-row
            :cell-style="{borderColor: '#3a537e', textAlign: 'center'}"
            :header-cell-style="{borderColor: '#3a537e', textAlign: 'center', color: '#000'}"
            style="border: 1px solid #3a537e">
            <el-table-column label="生成时间">
              <template slot-scope="scope">{{ $common.dateChange(scope.row.create_time) }}</template>
            </el-table-column>
            <el-table-column width="150" label="查看">
              <template slot-scope="scope">
                <img class="__handCursor" :src="$img.view" alt="" @click="showReport(scope.row.id)">
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
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
  name: 'ReportSetting',
  data () {
    return {
      activeName: '1',
      centerDialogVisible: false,
      dialogTitle: '',
      TimedReportSelect: ['3'],
      AlarmNum: '',
      RealTimeReportDate: '',
      RealTimeReportStartTime: '',
      RealTimeReportEndTime: '',
      ReportRecordDate: '',
      ReportRecordStartTime: '',
      ReportRecordEndTime: '',
      ReportType: '3',
      ReportTypeOption: [
        {
          label: '日报',
          value: '3'
        },
        {
          label: '周报',
          value: '4'
        },
        {
          label: '月报',
          value: '5'
        }
      ],
      tableData: [],
      total: 0,
      currentPage: 1,
      timingRepoteType: ['dayReport'],
      originalTimingRepoteType: ['dayReport'],
      outputReportTime: []
    }
  },
  watch: {
    currentPage (page) {
      // 更新url上pageNo
      this.$router.push({
        path: '/ReportSetting',
        query: {
          pageNo: page || 1
        }
      })
    },
    timingRepoteType (val) {
      if (val.length === 0 && this.originalTimingRepoteType.length === 1) {
        this.timingRepoteType = this.originalTimingRepoteType
      } else {
        this.originalTimingRepoteType = val
      }
    },
    centerDialogVisible (val) {
      this.AlarmNum = ''
      this.outputReportTime = []
    }
  },
  methods: {
    getReportRecordData (type, val) {
      this.$api.get('forms_info', {gen_type: type, page: val, start_time: this.ReportRecordStartTime, end_time: this.ReportRecordEndTime}).then(res => {
        if (res) {
          this.tableData = res.results
          this.tableData.forEach((results) => {
            results.forms_type = results.forms_type === 'all' ? '综合报表' : results.forms_type.toUpperCase() + '报表'
          })
          this.total = res.count
          /*
          @ 更新当前页码
          * 需要在本地数据total有意义后才能生效
          */
          this.currentPage = Number(this.$route.query.pageNo) || 1
        }
      })
    },
    showDialog (val) {
      if (localStorage.userClass === '2') {
        this.dialogTitle = val
        this.centerDialogVisible = true
        if (val === '定时报表设置') {
          this.timingSettingData()
        }
      } else {
        this.$message.warning('您没有此项权限！')
      }
    },
    // 关闭弹窗
    handleClose () {
      this.centerDialogVisible = false
      this.AlarmNum = ''
    },
    // 报表记录tab
    handleClick () {
      if (this.activeName === '2') {
        this.getReportRecordData('3', this.$route.query.pageNo)
        return
      }
      this.getReportRecordData(this.activeName, this.$route.query.pageNo)
    },
    // 报表记录时间选择器
    changeReportRecordTime (date) {
      if (date) {
        this.ReportRecordStartTime = this.$common.dateChange(date[0]).split(' ')[0]
        this.ReportRecordEndTime = this.$common.dateChange(date[1]).split(' ')[0]
      } else {
        this.ReportRecordStartTime = ''
        this.ReportRecordEndTime = ''
      }
      this.getReportRecordData('1', this.$route.query.pageNo)
      this.currentPage = 1
    },
    pageChange (val) {
      this.currentPage = val
      this.getReportRecordData(val)
    },
    showReport (val) {
      this.$router.push({
        path: 'ReportInfo',
        query: {
          id: val
        }
      })
    },
    inputCheck (val, minLimit, maxLimit) {
      this[val] = Number(this[val].toString().replace(/\D/g, ''))
      this[val] = this[val] > maxLimit ? maxLimit : (this[val] < minLimit ? minLimit : this[val])
    },
    timingSettingData () {
      this.$api.get('forms_setting').then((res) => {
        if (res) {
          var a = []
          if (res.data.month_switch === 1) {
            a.push('monthReport')
          }
          if (res.data.week_switch === 1) {
            a.push('weekReport')
          }
          if (res.data.day_switch === 1) {
            a.push('dayReport')
          }
          this.timingRepoteType = a
          this.AlarmNum = res.data.warning_amount
        }
      })
    },
    timingSetting () {
      if (this.AlarmNum.toString() !== this.AlarmNum.toString().replace(/\D/g, '') || this.AlarmNum > 100 || this.AlarmNum < 10) {
        this.$message.warning('请输入10-100的整数')
      } else {
        this.$api.post('forms_setting', {
          month_switch: this.timingRepoteType.indexOf('monthReport') > -1 ? 1 : 0,
          week_switch: this.timingRepoteType.indexOf('weekReport') > -1 ? 1 : 0,
          day_switch: this.timingRepoteType.indexOf('dayReport') > -1 ? 1 : 0,
          warning_amount: this.AlarmNum
        }).then((res) => {
          if (res.status === 200) {
            this.$message({
              message: res.message,
              type: 'success'
            })
            this.timingSettingData()
            this.centerDialogVisible = false
          } else {
            this.$message.error(res.message)
          }
        })
      }
    },
    outputReport () {
      if (this.AlarmNum.toString() !== this.AlarmNum.toString().replace(/\D/g, '') || this.AlarmNum > 100 || this.AlarmNum < 10) {
        this.$message.warning('请输入10-100的整数')
      } else {
        let genSetting = {}
        var time = this.outputReportTime
        genSetting.time = {
          start_time: this.$common.dateChange(time[0]),
          end_time: this.$common.dateChange(time[1])
        }
        genSetting.setting = {}
        genSetting.forms_type = 'all'
        genSetting.setting = {
          http_setting: {virus: this.AlarmNum, host_ip: this.AlarmNum},
          pop3_setting: {virus: this.AlarmNum, host_ip: this.AlarmNum, receiver: this.AlarmNum},
          ftp_setting: {virus: this.AlarmNum, host_ip: this.AlarmNum, server: this.AlarmNum},
          smtp_setting: {virus: this.AlarmNum, sender: this.AlarmNum, host_ip: this.AlarmNum},
          smb_setting: {virus: this.AlarmNum, host_ip: this.AlarmNum}
        }
        let obj = {
          gen_setting: JSON.stringify(genSetting),
          user: localStorage.userName
        }
        this.$api.post('generate_forms', obj).then((res) => {
          if (res.status === 200) {
            this.$message({
              message: res.message,
              type: 'success'
            })
            this.getReportRecordData(1, 1)
            this.centerDialogVisible = false
          } else {
            this.$message.error(res.message)
          }
        })
      }
    }
  },
  mounted () {
    this.getReportRecordData(this.activeName, this.$route.query.page)
  }
}
</script>
<style scoped="scoped" lang="scss">
  .ReportSetting {
    h2 {
      font-size: 1.5rem;
      color: $textColor;
    }
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid $textColor;
      margin-bottom: 1rem;
    }
    .el-dialog__body > div {
      margin-bottom: 1rem;
      .numSetting {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
      }
    }
    .ReportRecord {
      margin-top: 1rem;
      .el-tab-pane {
        margin-top: 1rem;
      }
      .el-table {
        margin-top: 1rem;
      }
      img {
        width: 23px;
      }
      .btn-container {
        margin-top: 1rem;
      }
    }
  }
  .el-input__inner, .el-input {
    width: auto;
    border: 1px solid $textColor;
    border-radius: 5px;
  }
  .ReportSetting .el-icon-error:before {
    display: none;
  }
</style>
<style lang="scss">
  .ReportRecord .el-date-editor {
    border: none!important;
    padding: 0!important;
  }
</style>
