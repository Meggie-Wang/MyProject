<template>
  <div class="ResourceClear">
    <div v-if="is_unFinished">
      <template>
        <Loading></Loading>
      </template>
    </div>
    <div class="saveSpace">
      <h2>存储空间</h2>
      <div>
        <span>存储空间：</span>
        <div class="showSaveSpace">
          <el-tooltip class="item" effect="light" placement="top-start">
            <div slot="content">已使用空间 {{usedSpacePercent}}%<br/>{{usedSpace}}G</div>
            <div :style="{width: usedSpacePercent + '%'}" class="saveSpace_inner">{{usedSpacePercent}}%</div>
            }
          </el-tooltip>
          <el-tooltip class="item" effect="light" placement="top-start">
            <div slot="content">未使用空间 {{freeSpacePercent}}%<br/>{{freeSpace}}G</div>
            <div :style="{width: freeSpacePercent + '%'}" class="saveSpace_inner">{{freeSpacePercent}}%</div>
          </el-tooltip>
          <el-tooltip class="item" effect="light" placement="top-start">
            <div slot="content">阈值 {{threshold}}%</div>
            <span :style="{left: (threshold + '%')}"></span>
          </el-tooltip>
        </div>
      </div>
    </div>
    <div class="saveSetting">
      <h2>存储设置</h2>
      <div class="saveWarning">
        <h3><span>存储报警</span></h3>
        <div>
          <el-radio-group v-model="use">
            <el-radio-button label="1">开启</el-radio-button>
            <el-radio-button label="0">关闭</el-radio-button>
          </el-radio-group>
        </div>
        <div>
          阈值设定：<input
              style="height: 2rem;width: 80px;"
              placeholder="请输入阈值"
              v-model="limitValue"
              :disabled="use === '0'"><i style="margin-left: .5rem">%</i>
        </div>
        <div>
          告警方式：<el-checkbox-group v-model="alarmType" :disabled="use === '0'">
            <el-checkbox label="mail">邮件</el-checkbox>
          </el-checkbox-group>
        </div>
        <div>
          <el-button size="mini" @click="warningSettingSave()">保存</el-button>
        </div>
      </div>
      <div class="clearMethod">
        <h3><span>清理策略</span></h3>
        <div>
          <span>清理文件类型</span><el-checkbox-group v-model="clearFileType">
            <el-checkbox-button label="PE32">PE32</el-checkbox-button>
            <el-checkbox-button label="TXT">TXT</el-checkbox-button>
            <el-checkbox-button label="PDF">PDF</el-checkbox-button>
            <el-checkbox-button label="ELF">ELF</el-checkbox-button>
            <el-checkbox-button label="ZIP">ZIP</el-checkbox-button>
            <el-checkbox-button label="HTML">HTML</el-checkbox-button>
          </el-checkbox-group>
        </div>
        <div class="sampleMaliceStyle">
          <span>样本恶意性</span>
          <el-select
            v-model="sampleMalice"
            placeholder="请选择">
            <template slot="prefix" v-if="sampleMalice">
              <i
                class="el-icon-error el-icon-error-custom"
                @click="sampleMalice = ''"
                style="line-height: 40px;"></i>
            </template>
            <el-option
              v-for="item in sampleMaliceOpt"
              :key="item.label"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <span>样本上传时间</span><el-date-picker
            v-model="upLoadTime"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            :default-time="['12:00:00']">
          </el-date-picker>
        </div>
        <div>
          <span>检测完成时间</span><el-date-picker
            v-model="detectCompleteTime"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            :default-time="['12:00:00']">
          </el-date-picker>
        </div>
        <div>
          <span>清理数量</span><input
              style="font-size: 14px;width: 172px;"
              placeholder="请输入清理数量"
              v-model="counts">
        </div>
        <div>
          <el-button size="mini" @click="clearTableData()">开始检索<i class="el-icon-loading" v-if="searchLoading" style="margin-left: 2px;"></i></el-button>
        </div>
      </div>
    </div>
    <div class="sampleTable" v-if="TableData && TableData.length > 0">
      <el-table
        class="storage-list"
        :data="TableData"
        border
        max-height="500"
        highlight-current-row
        @selection-change="selsChange"
        :cell-style="{borderColor: '#3a537e', 'text-align': 'center'}"
        :header-cell-style="{borderColor: '#3a537e', textAlign: 'center', color: '#000'}"
        style="border: 1px solid #3a537e">
        <el-table-column
          prop="sample_name"
          label="文件名"
          :resizable="false">
          <template slot-scope="scope">
            <FileName :name="scope.row.sample_name" :length="20" />
          </template>
        </el-table-column>
        <el-table-column
          prop="detect_finished_time"
          label="完成时间"
          :resizable="false">
          <template slot-scope="scope">
            <span>{{$common.dateChange(scope.row.detect_finished_time)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="is_malicious"
          label="检测结果"
          :resizable="false">
          <template slot-scope="scope">
            <span>{{$detectionResult(scope.row.is_malicious)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="标签"
          :resizable="false">
          <template slot-scope="scope">
            <Tags
            :id="scope.row.detect_id"
            :md5="scope.row.sample_md5"
            :exist="scope.row.sample_label + ',' + Math.random()"
            :alltags="[]"/>
          </template>
        </el-table-column>
        <el-table-column
          label="结果查看"
          width="90"
          :resizable="false">
          <template slot-scope="scope">
            <img
            class="check-report-icon __handCursor"
            :src="$img.view"
            @click="checkReport(scope.row.sample_md5, scope.row.detect_id, scope.row.important_level)">
          </template>
        </el-table-column>
        <el-table-column
          type="selection"
          width="55"
          :resizable="false">
        </el-table-column>
      </el-table>
      <el-button style="margin-top: 1rem;" size="mini" @click="clear()" :disabled="check.length === 0">开始清除<i class="el-icon-loading" v-if="clearLoading" style="margin-left: 2px;"></i></el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ResourceClear',
  data () {
    return {
      alarmType: [],
      clearFileType: [],
      use: '0',
      limitValue: 0,
      sampleMalice: '',
      sampleMaliceOpt: [{
        label: '安全',
        value: 'ok'
      }, {
        label: '恶意',
        value: 'no'
      }, {
        label: '未知',
        value: 'unknown'
      }, {
        label: '未检测',
        value: '-1'
      }],
      upLoadTime: [],
      detectCompleteTime: [],
      counts: 1000,
      TableData: [],
      sels: [],
      check: [],
      freeSpace: 0,
      freeSpacePercent: 0,
      usedSpace: 0,
      usedSpacePercent: 0,
      threshold: 0,
      clearLoading: false,
      searchLoading: false,
      is_unFinished: true
      // apiComplete: 0
    }
  },
  watch: {
  },
  methods: {
    inputCheck (val, minLimit, maxLimit) {
      this[val] = Number(this[val].toString().replace(/\D/g, ''))
      this[val] = this[val] > maxLimit ? maxLimit : (this[val] < minLimit ? minLimit : this[val])
    },
    saveWarningData () {
      this.$api.get('storage_alarm_setting').then((res) => {
        if (res && res.status === 200) {
          this.limitValue = res.data.threshold
          this.alarmType = res.data.alarm_type
          this.use = res.data.use.toString()
        } else if (res && res.status === 400) {
          this.$message.error(res.msg)
        }
      })
    },
    warningSettingSave () {
      if (this.limitValue.toString() !== this.limitValue.toString().replace(/\D/g, '') || this.limitValue > 100 || this.limitValue < 10) {
        this.$message.warning('请输入10-100的整数')
      } else {
        this.$api.post('storage_alarm_setting', {
          use: Number(this.use),
          threshold: this.limitValue,
          alarm_type: this.alarmType
        }).then((res) => {
          if (res.status === 200) {
            this.$message({
              message: res.msg,
              type: 'success'
            })
            this.saveSpaceData()
            this.saveWarningData()
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    clearTableData () {
      if (this.counts.toString() !== this.counts.toString().replace(/\D/g, '') || this.counts > 10000 || this.counts < 100) {
        this.$message.warning('请输入100-10000的整数')
      } else {
        this.searchLoading = true
        this.$api.get('storage_clean', {
          counts: this.counts,
          file_types: this.clearFileType.join(','),
          malicious: this.sampleMalice,
          submit_time_range: this.upLoadTime.join(','),
          detect_time_range: this.detectCompleteTime.join(',')
        }).then((res) => {
          if (res.status === 200) {
            this.TableData = res.data
            this.searchLoading = false
          }
          // this.apiComplete += 1
        })
      }
    },
    selsChange (sels) {
      this.sels = sels
      this.check = []
      for (var i = 0; i < this.sels.length; i++) {
        this.check[i] = this.sels[i].detect_id
      }
    },
    checkReport (md5, id, importLevel) {
      if (this.$tokenName === 'zhirong') {
        window.open(window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '') + '/#/SampleReport?md5=' + md5 + '&id=' + id + '&importLevel=' + importLevel)
      } else {
        this.$router.push({'path': '/SampleReport', query: {md5: md5, id: id}})
      }
    },
    clear () {
      this.$confirm('此操作将清除所选项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.clearLoading = true
        this.$api.post('storage_clean', {
          id_list: this.check
        }).then(res => {
          if (res.status === 200) {
            this.$message({
              message: res.msg,
              type: 'success'
            })
            this.clearLoading = false
          } else {
            this.$message.error(res.msg)
          }
          this.clearTableData()
        })
      }).catch(() => {})
    },
    saveSpaceData () {
      this.$api.get('storage_usage').then((res) => {
        if (res) {
          let saveSpaceTotal = res.data.total
          let saveSpaceFree = res.data.free
          let saveSpaceUsed = res.data.used
          this.freeSpace = (saveSpaceFree / 1024).toFixed(2)
          this.freeSpacePercent = (saveSpaceFree / saveSpaceTotal * 100).toFixed(2)
          this.usedSpace = (saveSpaceUsed / 1024).toFixed(2)
          this.usedSpacePercent = (saveSpaceUsed / saveSpaceTotal * 100).toFixed(2)
          this.threshold = res.data.threshold
          this.is_unFinished = false
        }
      })
    }
  },
  mounted () {
    setTimeout(() => {
      this.saveWarningData()
      this.saveSpaceData()
    }, 500)
  }
}

</script>
<style scoped="scoped" lang="scss">
  .ResourceClear {
    color: rgb(52,82,126);
    h2 {
      font-size: 1.5rem;
      color: $textColor;
      border-bottom: 2px solid $borderColor;
    }
    input::placeholder{
      color: #c0c4cc;
    }
    h3 {
      font-size: 1rem;
      color: $textColor;
      border-bottom: 1px solid $borderColor;
      display: flex;
      justify-content: space-between;
      padding: 2px 0;
      margin-bottom: .5rem;
    }
    .saveSetting {
      margin-top: 1rem;
      > div {
        padding: 5px 10px;
        > div {
          padding: 5px 10px;
          display: flex;
          align-items: center;
          span {
            display: block;
            width: 7rem;
          }
        }
      }
    }
    .sampleTable {
      margin-bottom: 1rem;
    }
    .saveSpace {
      > div {
        display: flex;
        align-items: center;
        height: 3rem;
        margin: 3rem 0;
        span {
          display: block;
          width: 5rem;
        }
        .showSaveSpace {
          width: calc(100% - 5rem - 2px);
          border: 1px solid $borderColor;
          height: 100%;
          display: flex;
          position: relative;
          > div:first-of-type {
            border-right: 1px solid $borderColor;
          }
          span {
            display: block;
            width: 0;
            height: calc(100% - 8px);
            border: 4px solid red;
            position: absolute;
            top: 0;
          }
        }
        .saveSpace_inner {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .saveSpace_inner:first-of-type {
          background-color: $bgColor;
          color: white;
        }
        .saveSpace_inner:last-of-type {
          background-color: white;
        }
      }
    }
  }
  input {
    height: 38px;
    line-height: 38px;
    border: 1px solid $borderColor;
    border-radius: 4px;
    text-align: center;
  }
  input:disabled {
    background-color: #f5f7fa;
    border: 1px solid #3a537e;
    color: #c0c4cc;
    cursor: not-allowed;
  }
</style>
<style type="text/css" lang="scss">
  .sampleTable td:last-of-type, .sampleTable th:nth-last-child(2) {
    border-right: 1px solid $borderColor;
  }
  .sampleTable .el-tag {
    margin: 0 .3rem .3rem 0;
  }
  .sampleTable .__handCursor {
    height: 1rem;
  }
  .ResourceClear .el-radio-button__inner {
    padding: 8px 12px;
    box-shadow: none;
  }
  .ResourceClear .el-radio-button__orig-radio:checked+.el-radio-button__inner {
    box-shadow: none;
  }
  .ResourceClear .sampleMaliceStyle .el-select .el-input input {
    max-width: 198px;
  }
</style>
