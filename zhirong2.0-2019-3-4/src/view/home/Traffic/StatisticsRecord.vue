<template>
  <div class="StatisticsRecord">
    <div v-if="is_unFinished">
      <template>
        <Loading></Loading>
      </template>
    </div>
    <div class="StatisticsRecord-con">
      <el-tabs v-model="statisticsType" @tab-click="handleClick">
        <el-tab-pane v-for="(i, j) in statisticsTypeOption" :key="j" :label="i.label" :name="i.name">
          <section class="operate-con">
            <el-input v-if="statisticsType === '3'" v-model="ip" placeholder="请输入主机IP"></el-input>
            <el-select
              v-if="statisticsType !== '3' && statisticsType !== '4'"
              v-model="selectOption"
              :placeholder="selectPlace"
              @change="init(statisticsTypeOption[statisticsType - 1].value, currentPage = 1)">
              <template slot="prefix" v-if="selectOption">
                <i
                  class="el-icon-error el-icon-error-custom"
                  @click="selectOption = ''; init(statisticsTypeOption[statisticsType - 1].value, currentPage = 1)"
                  style="line-height: 40px;"></i>
              </template>
              <el-option
                v-for="item in selectOptionData"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-date-picker
              v-model="date"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="changeTime">
            </el-date-picker>
            <div v-if="statisticsType === '3'">
              <el-button @click="searchIp">搜索</el-button>
            </div>
          </section>

          <el-table
            :data="tableData"
            border
            fit
            highlight-current-row
            :cell-style="{borderColor: '#3a537e', textAlign: 'center'}"
            :header-cell-style="{borderColor: '#3a537e', textAlign: 'center', color: '#000'}"
            style="border: 1px solid #3a537e">
            <el-table-column :label="statisticsType === '4' ? '时间' : '开始时间'">
              <template slot-scope="scope">{{ $common.dateChange(scope.row.start_time).split(' ')[0] }}</template>
            </el-table-column>
            <el-table-column label="结束时间" v-if="statisticsType !== '4'">
              <template slot-scope="scope">{{ $common.dateChange(scope.row.end_time).split(' ')[0] }}</template>
            </el-table-column>
            <el-table-column prop="virus_name" label="威胁事件" v-if="statisticsType === '1'"></el-table-column>
            <el-table-column prop="protocol" label="协议" v-if="statisticsType === '2'"></el-table-column>
            <el-table-column prop="ip" label="威胁IP" :show-overflow-tooltip="true" v-if="statisticsType === '3'"></el-table-column>
            <el-table-column prop="amount" label="统计数量" width="150"></el-table-column>
            <el-table-column prop="total_mount" label="告警总量" width="150"></el-table-column>
          </el-table>

          <el-pagination
            v-if="total"
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="20"
            :pager-count="5"
            @current-change="pageChange"
            :current-page.sync="currentPage">
          </el-pagination>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: 'StatisticsRecord',
  data () {
    return {
      is_unFinished: true,
      statisticsType: '1',
      statisticsTypeOption: [
        {
          name: '1',
          value: 'bro_threaten_event',
          label: '基于威胁事件'
        },
        {
          name: '2',
          value: 'bro_threaten_protocol',
          label: '基于协议信息'
        },
        {
          name: '3',
          value: 'bro_threaten_ip',
          label: '基于威胁IP'
        },
        {
          name: '4',
          value: 'bro_threaten_time',
          label: '基于时间'
        }
      ],
      ip: '',
      selectPlace: '请选择威胁事件',
      date: '',
      startTime: '',
      endTime: '',
      selectOption: '',
      selectOptionData: [
        {
          value: '蠕虫',
          label: '蠕虫'
        },
        {
          value: '风险软件',
          label: '风险软件'
        },
        {
          value: '木马',
          label: '木马'
        },
        {
          value: '感染式恶意代码',
          label: '感染式恶意代码'
        },
        {
          value: '恶意软件',
          label: '恶意软件'
        },
        {
          value: '下载器',
          label: '下载器'
        },
        {
          value: '注入攻击',
          label: '注入攻击'
        },
        {
          value: '后门攻击',
          label: '后门攻击'
        },
        {
          value: '恶意代码',
          label: '恶意代码'
        },
        {
          value: '间谍软件',
          label: '间谍软件'
        },
        {
          value: '疑似威胁',
          label: '疑似威胁'
        },
        {
          value: '恶意广告软件',
          label: '恶意广告软件'
        },
        {
          value: '僵尸程序',
          label: '僵尸程序'
        }
      ],
      tableData: [],
      total: 0,
      currentPage: 1
    }
  },
  watch: {
    currentPage (page) {
      // 更新url上pageNo
      this.$router.push({
        path: '/StatisticsRecord',
        query: {
          pageNo: page || 1
        }
      })
    }
  },
  methods: {
    handleClick (tab) {
      this.selectOption = ''
      this.ip = ''
      this.date = ''
      this.startTime = ''
      this.endTime = ''
      switch (tab.name) {
        case '1':
          this.selectPlace = '请选择威胁事件'
          this.selectOptionData = [
            {
              value: '蠕虫',
              label: '蠕虫'
            },
            {
              value: '风险软件',
              label: '风险软件'
            },
            {
              value: '木马',
              label: '木马'
            },
            {
              value: '感染式恶意代码',
              label: '感染式恶意代码'
            },
            {
              value: '恶意软件',
              label: '恶意软件'
            },
            {
              value: '下载器',
              label: '下载器'
            },
            {
              value: '注入攻击',
              label: '注入攻击'
            },
            {
              value: '后门攻击',
              label: '后门攻击'
            },
            {
              value: '恶意代码',
              label: '恶意代码'
            },
            {
              value: '间谍软件',
              label: '间谍软件'
            },
            {
              value: '疑似威胁',
              label: '疑似威胁'
            },
            {
              value: '恶意广告软件',
              label: '恶意广告软件'
            },
            {
              value: '僵尸程序',
              label: '僵尸程序'
            }
          ]
          break
        case '2':
          this.selectPlace = '请选择协议'
          this.selectOptionData = [
            {
              value: 'http',
              label: 'http'
            },
            {
              value: 'ftp',
              label: 'ftp'
            },
            {
              value: 'pop3',
              label: 'pop3'
            },
            {
              value: 'smtp',
              label: 'smtp'
            },
            {
              value: 'smb',
              label: 'smb'
            }
          ]
          break
      }
      this.init(this.statisticsTypeOption[tab.index].value, this.currentPage = 1)
    },
    searchIp () {
      if (this.ip) {
        if (/^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/.test(this.ip) || /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/.test(this.ip)) {
          this.init(this.statisticsTypeOption[this.statisticsType - 1].value, this.currentPage = 1)
        } else {
          this.$message({
            message: 'IP格式不正确',
            type: 'warning'
          })
        }
      } else {
        this.$message({
          message: '请输入主机IP',
          type: 'warning'
        })
      }
    },
    changeTime (date) {
      if (date) {
        this.startTime = this.$common.dateChange(date[0]).split(' ')[0]
        this.endTime = this.$common.dateChange(date[1]).split(' ')[0]
      } else {
        this.startTime = ''
        this.endTime = ''
      }
      this.init(this.statisticsTypeOption[this.statisticsType - 1].value, this.currentPage = 1)
    },
    init (statisticsType, val) {
      let obj = {
        bro_type: statisticsType,
        threaten_event: this.selectOption,
        threaten_protocol: this.selectOption,
        threaten_ip: this.ip,
        start_time: this.startTime,
        end_time: this.endTime,
        page: val || this.currentPage
      }
      if (statisticsType === 'bro_threaten_event') {
        obj.threaten_protocol = ''
      } else if (statisticsType === 'bro_threaten_protocol') {
        obj.threaten_event = ''
      }
      this.$api.get('malicious_count', obj).then(res => {
        if (res) {
          this.is_unFinished = false
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
      this.init(this.statisticsTypeOption[this.statisticsType - 1].value, this.currentPage = 1)
    }
  },
  mounted () {
    this.init(this.statisticsTypeOption[this.statisticsType - 1].value, this.$route.query.pageNo)
  }
}
</script>
<style scoped="scoped" lang="scss">
  .StatisticsRecord {
    .StatisticsRecord-con {
      width: 80%;
      margin: 1rem auto;
      .operate-con {
        display: flex;
        justify-content: flex-end;
        padding: 20px 0;
        > div {
          margin-right: 10px;
        }
        > div:last-of-type {
          margin-right: 0;
        }
      }
      .el-pagination {
        margin-top: 1rem;
      }
    }
  }
  .StatisticsRecord .el-input {
    width: auto;
    border: 1px solid #3a537e;
    border-radius: 5px;
  }
</style>
<style lang="scss">
  .operate-con {
    .el-date-editor {
      display: inline-flex;
      box-sizing: border-box;
      border: 1px solid $borderColor!important;
      border-radius: 5px;
      .el-range-input {
        border: none!important;
      }
    }
  }
</style>
