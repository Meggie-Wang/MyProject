<template>
  <div class="DeviceStatus">
    <div class="DeviceStatus-con">
      <div v-if="is_unFinished">
        <template>
          <Loading></Loading>
        </template>
      </div>
      <div class="systemStatus">
        <h2>系统运行状态</h2>
        <div>
          <table>
            <tr>
              <td><div>检测样本总数：</div>{{ RunState.test_times }}</td>
              <td><div>运行天数：</div>{{ RunState.run_days }}</td>
            </tr>
            <tr>
              <td><div>生成报告数量：</div>{{ RunState.report_times}}</td>
              <td><div>生成报表数量：</div>{{ RunState.statement_times}}</td>
            </tr>
            <tr>
              <td><div>今日分析总量：</div>{{ RunState.today_analysis }}</td>
              <td><div>待分析样本总量：</div>{{ RunState.waite_analysis }}</td>
            </tr>
            <tr>
              <td><div>设备告警数量：</div>{{ RunState.unhealthy_module }}</td>
              <td></td>
            </tr>
          </table>
          <div class="myline">
            <myLine
              :winResize="winResize"
              :myChartData="LineData"
              :topBarData="sampleDetection"
              echartTitleColor="#315697"
              echartTitledate='当天'
              topSize1="14"
              topSize2="16"
              fontColor="#fff"/>
          </div>
        </div>
      </div>
      <div class="equipmentStatus">
        <h2>设备运行状态</h2>
        <div class="web">
          <h3>Web系统</h3>
          <div class="main">
            <Vechart
              className="echart"
              :options="lineOption"
              :winResize="winResize" />
          </div>
        </div>
        <div class="storage">
          <h3>存储系统</h3>
          <div class="__beeTable">
            <h4>存储状态</h4>
            <div>
              <ul>
                <li>总存储空间</li>
                <li>已用存储空间</li>
                <li>存储空间使用率</li>
                <li>样本占用空间</li>
                <li>病毒样本占用比</li>
                <li>普通样本占用比</li>
              </ul>
              <ul>
                <li>{{StorageState.total_storage || 0}}</li>
                <li>{{StorageState.use_storage || 0}}</li>
                <li>{{StorageState.storage_rate || 0}}</li>
                <li>{{StorageState.sample_storage_rate || 0}}</li>
                <li>{{StorageState.virus_sample_storage_rate || 0}}</li>
                <li>{{StorageState.normal_sample_storage_rate || 0}}</li>
              </ul>
            </div>
          </div>
          <div class="node-state">
            <h4>存储节点运行状态</h4>
            <div>
              <ul class="node-state-list">
                <li>节点总数:{{NodeState.total_nodes || 0}}</li>
                <li>正常运行数:{{NodeState.active_nodes || 0}}</li>
                <li>关闭数:{{NodeState.offline_nodes || 0}}</li>
                <li>异常节点数:{{NodeState.error_nodes || 0}}</li>
              </ul>
              <div class="storage-node-list">
                <ul class="storage-node">
                  <li v-for="(item, index) in NodeList" :key='index'>
                    <div class="node-number"><p>节点{{ index + 1 }}</p></div>
                    <div class="storage-node-details">
                      <p><span>状态：</span><span :style="{'color': item.status==='OFFLINE'?'red':'rgb(52,82,126)'}">{{item.status}}</span></p>
                      <p><span>存储：</span>{{item.usage}}</p>
                      <p><span>CPU：</span>{{item.cpu_usage}}</p>
                      <p><span>内存：</span>{{item.memory_usage}}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="detect">
          <h3>检测系统</h3>
          <div class="equipment1">
            <ul>
              <li v-for="(item, index) in sandboxList" :key="index">
                <span>
                  <img :src="$img.zhirongLogo">
                </span>
                <span><img :src="$img.equipment" alt="" v-if="item.running_status==='1'"><img :src="$img.unEquipment" alt="" v-else></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'DeviceStatus',
  data () {
    return {
      is_unFinished: true,
      StorageState: '',
      NodeList: [],
      NodeState: '',
      dataFailedCount: 0,
      RunState: '',
      LineData: [],
      creatTime: [],
      DeviceStatusTime: [],
      DeviceStatusData: [],
      lineOption: {},
      winResize: 0,
      sandboxList: []
    }
  },
  computed: {
    ...mapGetters(['sampleDetection'])
  },
  methods: {
    init () {
      // 系统运行状态
      this.$api.get('system_basic_status').then(webkitDep => {
        this.RunState = webkitDep.data
        let timeArr = webkitDep.data['create_time']
        for (var i = 0; i < timeArr.length; i++) {
          this.creatTime.push(this.$common.dateChange(timeArr[i]))
        }
        this.LineData = {
          create_time: this.creatTime,
          maliciously_amount: webkitDep.data.maliciously_amount,
          nonmaliciously_amount: webkitDep.data.nonmaliciously_amount,
          unknow_amount: webkitDep.data.unknow_amount,
          today_detection_total_amount: webkitDep.data.today_detection_total_amount,
          today_into_storage_amount: webkitDep.data.today_into_storage_amount
        }
        this.is_unFinished = false
      })
      // 存储状态
      this.$api.get('system_storage_info').then(res => {
        if (res.status === 200) {
          this.StorageState = res.ret[0]
        }
      })
      // web系统折线图
      this.$api.get('data_line_parameter', {hardware: 1}).then((res) => {
        if (res.status === 200) {
          for (let i in res.data) {
            this.getWebLineData(i)
          }
        }
      })
      // 检测系统 沙箱
      this.$api.get('system_resource_status').then(res => {
        this.NodeList = res.storage_info.data.storages_info
        this.NodeState = res.storage_info.data.storage_total_info
        if (this.dataFailedCount === 0 && res.storage_info.status === 400) {
          this.$message.error(res.storage_info.message)
          this.dataFailedCount = 1
        }
        this.sandboxList = res.sandboxes_info.data.sandboxes_info[1].machine_list
        this.is_unFinished = false
      })
    },
    getWebLineData (val) {
      this.$api.get('manual_data_line', {manual_item_name: val}).then((result) => {
        if (result.status === 200) {
          // 图表时间
          let timeArr = []
          result.time.reverse().forEach((times) => {
            timeArr.push(this.$common.dateChange(times))
          })
          this.DeviceStatusTime = timeArr
          // 图表数据
          let webLineData = result.data['192.168.122.77']
          for (let j in webLineData) {
            this.DeviceStatusData.push(webLineData[j])
          }
          this.drawEchart(this.DeviceStatusData, this.DeviceStatusTime)
        }
      })
    },
    drawEchart (echartData, times) {
      let legendData = []
      let series = []
      for (let i = 0; i < echartData.length; i++) {
        legendData.push({
          name: echartData[i].name,
          icon: 'roundRect'
        })
        series.push({
          type: 'line',
          name: echartData[i].name,
          data: echartData[i].data
        })
      }
      this.lineOption = {
        legend: {
          top: '30',
          data: legendData
        },
        xAxis: {
          type: 'category',
          data: times
        },
        yAxis: {
          type: 'value'
        },
        tooltip: {
          trigger: 'axis'
        },
        color: this.chartColor,
        series: series
      }
    }
  },
  mounted () {
    this.init()
    this.$store.dispatch('getSampleDetection')
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.winResize = window.innerHeight + '/' + window.innerWidth
    })
  }
}
</script>
<style scoped="scoped" lang="scss">
  .DeviceStatus-con {
    color: $textColor;
    h2 {
      font-size: 1.5rem;
      border-bottom: 2px solid $borderColor;
    }
    .systemStatus {
      table {
        width: 100%;
        margin-top: 1rem;
        font-size: 1rem;
        font-weight: bold;
        tr {
          width: 100%;
          height: 2rem;
          display: flex;
          td {
            width: 50%;
            display: flex;
          }
          td:last-of-type div {
            width: 8.5rem;
            text-align: right;
          }
        }
      }
      .myline {
        width: 100%;
        margin-top: 1rem;
        height: 30vw;
        border: 1px solid rgb(52,82,126)
      }
      .myline .line {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 30vw;
        background: none !important;
        margin: auto;
      }
      .myline /deep/ .line .lineTop ul li {
        background: none;
      }
    }
    .equipmentStatus {
      margin-top: 1rem;
      > div {
        margin-top: 1rem;
      }
      h3 {
        text-align: center;
      }
      .web {
        .main {
          width: 100%;
          height: 400px;
        }
      }
      .storage {
        > div {
          margin-top: 1rem;
          > div {
            margin-top: 1rem;
          }
        }
        h4 {
          border-bottom: 1px solid $borderColor;
        }
        .__beeTable li {
          color: $textColor;
          border: 1px solid rgb(52,82,126);
        }
        .node-state-list {
          width: 100%;
          font-weight: bolder;
          height: 40px;
          border: 1px solid rgb(52,82,126);
          border-radius: 5px;
          li {
            line-height: 2.5rem;
            float: left;
            width: calc(25% - .5px);
            text-align: center;
          }
        }
        .storage-node-list {
          width: 100%;
        }
        .storage-node {
          margin: auto;
          font-weight: bolder;
          overflow: hidden;
          p {
            height: 40px;
            line-height: 40px;
            margin: 0.1rem auto;
            text-align: center;
          }
          li {
            float: left;
            margin-right: 2%;
            width: calc(18.4%);
          }
          li:nth-of-type(5n){
            margin-right: 0;
          }
        }
        .storage-node-details p {
          border: 1px solid rgb(52,82,126);
          border-radius: 5px;
          overflow: hidden;
          span{
            margin-right: .5rem;
          }
        }
      }
      .detect {
        > div {
          width: 98%;
          margin: 1rem auto;
          ul {
            display: flex;
            flex-wrap: wrap;
            border: 1px dashed rgb(52, 82, 126);
            li {
              margin: 1rem auto;
              text-align: center;
              span {
                display: block;
                width: 80%;
                margin: 10px auto;
                img {
                  width: 50%;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
