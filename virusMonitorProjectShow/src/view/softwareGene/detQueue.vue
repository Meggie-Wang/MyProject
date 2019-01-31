<style scoped>
  .title {
    margin: 3% 0 1% 10%;
    font-weight: bold;
    color: #169175;
  }
  .end {
    margin: 9% 0 20% 10%;
    font-weight: bold;
    color: #169175;
    padding-bottom: 1%;
  }
  .line {
    height: 2px;
    width: 80%;
    margin: 1% auto;
    background: #169175;
  }
  .up {
    width: 80%;
    height: 300px;
    margin: 0 auto;
  }
  .up_left {
    width: 45%;
    height: 260px;
    margin: 10px 2%;
  }
  .up_left_top{
    height: 265px;
  }
  .up_lfet_bottom {
  }
  .up_right {
    width: 45%;
    height: 260px;
    margin: 10px 5% 10px 0;
  }
  .up_right_top{
    height: 265px;
  }
  .down {
    border: 2px solid #169175;
    width: 80%;
    margin: 1% auto;
    border-radius: 5px;
  }
  table {
    width: 100%;
    margin: 0 auto;
  }
  table tr {
    border-bottom: 2px solid #169175;
  }
  table tr:last-of-type {
    border-bottom: none;
  }
  table th {
    height:30px;    
    border-right: 2px solid #169175;
    width: 12.5%;
  }
  table th:nth-child(4){
    box-sizing: border-box;
    width: 25%;
  }
  table th:nth-last-child(1) {
    border-right: none;
  }
  table td {
    border-right: 2px solid #169175;
    text-align: center;
    height:60px; 
  }
   table td:nth-child(4) {
    padding: 0 2%;
  }
  table td:nth-last-child(1) {
    border-right: none;
  }
</style>
<style>
  .detQueue_container .el-progress-bar__inner {
    width: 90%;
    animation: myMove 5s ease forwards;
  }
  @keyframes myMove {
    0% {
      width: 0;
    }
    90% {
      width: 90%;
    }
  }
</style>
<template>
  <div class="detQueue_container">
    <!-- 基因检测概要 begin -->
    <p class="title">{{ $t('messages.detectionQueue.recentGeneDet') }}</p>
    <div class="line"></div>
    <div class="up">
      <div class="up_left fl">
        <div class="up_left_top" id="up_left_top">
          <!-- 图表 -->
        </div>
        <div class="up_lfet_bottom">
          <p style="text-align:center">{{ $t('messages.detectionQueue.lastTenDetDis') }}</p>
        </div>
      </div>
      <div class="up_right fr">
        <div class="up_right_top" id="up_right_top">
          <!-- 图表 -->
        </div>
        <div class="up_right_bottom">
          <p style="text-align:center">{{ $t('messages.detectionQueue.lastTenDetRes') }}</p>
        </div>
      </div>
    </div>
    <!-- 基因检测概要 end -->
    <!-- 检测任务队列 begin -->
    <p class="title">{{ $t('messages.detectionQueue.GeneDetQueue') }}</p>
    <div class="line"></div>
    <div class="down">
      <table>
        <tr>
          <th>{{ $t('messages.detectionQueue.sampleName') }}</th>
          <th>{{ $t('messages.detectionQueue.submitTime') }}</th>
          <th>{{ $t('messages.detectionQueue.expecteComTime') }}</th>
          <th>{{ $t('messages.detectionQueue.detProgress') }}</th>
          <th>{{ $t('messages.detectionQueue.detState') }}</th>
          <th>{{ $t('messages.detectionQueue.taskUser') }}</th>
        </tr>
        <tr v-for="(testQueue, index) in testQueues">
          <td>{{ testQueue.testName }}</td>
          <td>{{ testQueue.submitTime }}</td>
          <td>{{ testQueue.finishTime }}</td>
          <td>
            <el-progress :text-inside="true" :stroke-width="20" :percentage="percentage(testQueue.statusNum)" status="success"></el-progress>
          </td>
          <td>{{ testQueue.status }}</td>
          <td>{{ testQueue.userId }}</td>
        </tr>
      </table>
    </div>
    <!-- 检测任务队列 end -->
    <router-link class="end" to="/detHistory">{{ $t('messages.detectionQueue.historyTasks') }}</router-link>
  </div>
</template>
<script>
import echarts from 'echarts'
import api from '../../api/ipApi'
import {Loading} from 'element-ui'

export default {
  data() {
    return {
      day: '',
      testQueues: [],
      timer: {},
      loading: {},
      option: {}
    }
  },
  props: ['language'],
  watch: {
    language (val) {
      this.getEchartsData()
    }
  },
  mounted() {
    this.getEchartsData()
    this.timer = setInterval(() => {
      this.getQueueData()
    }, 1500)
  },
  methods: {
    // 图表数据
    getEchartsData () {
      this.loading = Loading.service()
      api.getQueueEchartsDay().then(res => {
        this.loading = Loading.service().close()
        var that = this
        if (res.status === 200) {
          this.day = res.data;
          // 第一张
          this.myBar = echarts.init(document.getElementById("up_left_top"));
          this.option = {
            tooltip: {
              trigger: 'item'
            },
            legend: {
              data: [this.$t('messages.detectionQueue.taskDistribution')],
              selectedMode: false
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: {
              type: 'category',
              data: [this.day.date9, this.day.date8, this.day.date7, this.day.date6, this.day.date5, this.day.date4, this.day.date3, this.day.date2, this.day.date1, this.day.date],
              axisLabel: {
                // 在axisLabel下面，文字隐藏
                show: true,
                textStyle: {
                  color: 'black'
                }
              },
              axisLine: {
                lineStyle: {
                  // x轴底面线
                  color: '#333333'
                }
              },
              axisTick: {
                // 刻度
                show: false
              }
            },
            yAxis: {
              type: 'value',
              splitLine: {
                show: false
              },
              axisLabel: {
                // 在axisLabel下面，文字隐藏
                show: true,
                textStyle: {
                  color: 'black'
                }
              },
              axisLine: {
                lineStyle: {
                  // x轴底面线
                  color: '#333333'
                }
              },
              axisTick: {
                show: false
              }
            },
            series: [{
              name: this.$t('messages.detectionQueue.taskDistribution'),
              data: [this.day.sample9, this.day.sample8, this.day.sample7, this.day.sample6, this.day.sample5, this.day.sample4, this.day.sample3, this.day.sample2, this.day.sample1, this.day.sample],
              type: 'bar',
              barWidth: 20,
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#2fb594'},
                      {offset: 0.5, color: '#1f9177'},
                      {offset: 1, color: '#0e6955'}
                    ]
                  )
                }
              }
            }]
          };
          this.myBar.setOption(this.option, true)
          this.drawBar()
          // 第二张
          this.myLine = echarts.init(document.getElementById("up_right_top"));
          var option2 = {
            color: ['#22CBA2', '#DC753B', '#E269AC', '#DFC42B'],
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: [this.$t('messages.detectionQueue.maliciousTwo'), this.$t('messages.detectionQueue.maliciousOne'), '', this.$t('messages.detectionQueue.maliciousFour'), this.$t('messages.detectionQueue.maliciousThree')],
              width: '85%'
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: [this.day.date9, this.day.date8, this.day.date7, this.day.date6, this.day.date5, this.day.date4, this.day.date3, this.day.date2, this.day.date1, this.day.date]
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                name: this.$t('messages.detectionQueue.maliciousTwo'),
                type: 'line',
                type: 'line',
                data: [this.day.neither9, this.day.neither8, this.day.neither7, this.day.neither6, this.day.neither5, this.day.neither4, this.day.neither3, this.day.neither2, this.day.neither1, this.day.neither],
                barWidth: 20,
                itemStyle: {
                  normal: {
                    lineStyle: {
                      color: '#22CBA2'
                    }
                  }
                }
              },
              {
                name: this.$t('messages.detectionQueue.maliciousOne'),
                type: 'line',
                data: [this.day.malicious_gene9, this.day.malicious_gene8, this.day.malicious_gene7, this.day.malicious_gene6, this.day.malicious_gene5, this.day.malicious_gene4, this.day.malicious_gene3, this.day.malicious_gene2, this.day.malicious_gene1, this.day.malicious_gene],
                barWidth: 20,
                itemStyle: {
                  normal: {
                    lineStyle: {
                      color: '#DC753B'
                    }
                  }
                }
              },
              {
                name: this.$t('messages.detectionQueue.maliciousThree'),
                type: 'line',
                data: [this.day.both9, this.day.both8, this.day.both7, this.day.both6, this.day.both5, this.day.both4, this.day.both3, this.day.both2, this.day.both1, this.day.both],
                barWidth: 20,
                itemStyle: {
                  normal: {
                    lineStyle: {
                      color: '#E269AC'
                    }
                  }
                }
              },
              {
                name: this.$t('messages.detectionQueue.maliciousFour'),
                type: 'line',
                data: [this.day.malice9, this.day.malice8, this.day.malice7, this.day.malice6, this.day.malice5, this.day.malice4, this.day.malice3, this.day.malice2, this.day.malice1, this.day.malice],
                barWidth: 20,
                itemStyle: {
                  normal: {
                    lineStyle: {
                      color: '#DFC42B'
                    }
                  }
                }
              }
            ]
          }
          this.myLine.setOption(option2, true);
          this.drawLine()
        }
      })
    },
    // 任务队列
    getQueueData () {
      api.getQueue().then(res => {
        var that = this
        if (res.data.status === 2) {
          document.cookie = 'token_virus=' + escape('')
          this.$router.push({path: '/login'})
        } else if (res.data.status === 0) {
          alert(this.$t('messages.login.incorrectErr'))
          this.$router.back(-1)
        } else if (res.status === 200) {
          that.testQueues = res.data
          for (var i = 0; i < res.data.length; i++) {
            that.testQueues[i].statusNum = res.data[i].status
            that.testQueues[i].submitTime = res.data[i].submitTime.split('T')[0] + ' ' + res.data[i].submitTime.split('T')[1].split('.')[0]
            var date = new Date(that.testQueues[i].submitTime)
            date.setMinutes((date.getMinutes() + 2))
            var month = parseInt(date.getMonth()) + 1
            var day = date.getDate()
            var hour = date.getHours()
            var minute = date.getMinutes()
            var second = date.getSeconds()
            if (month < 10) {
              month = '0' + month
            }
            if (day < 10) {
              day = '0' + day
            }
            if (hour < 10) {
              hour = '0' + hour
            }
            if (minute < 10) {
              minute = '0' + minute
            }
            if (second < 10) {
              second = '0' + second
            }
            that.testQueues[i].finishTime = date.getFullYear() + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
            if (res.data[i].status === 1) {
              that.testQueues[i].status = this.$t('messages.detectionQueue.waiting')
            } else if (res.data[i].status === 2) {
              that.testQueues[i].status = this.$t('messages.detectionQueue.detection')
            }
          }
        }
      })
    },
    drawBar() {
      window.addEventListener('resize', function() {
        this.myBar.resize();
      }.bind(this));
    },
    drawLine() {
      window.addEventListener('resize', function() {
        this.myLine.resize();
      }.bind(this));
    },
    percentage(statusNum) {
      if (statusNum === 1) {
        // $('.el-progress-bar__inner').animate({'width': '80%'}, 5000)
        return 0
      } else if (statusNum === 2) {
        return 80
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.path !== '/dashboard') {
      this.loading = Loading.service().close()
    }
    clearInterval(this.timer)
    next()
  },
  destroyed() {
    this.myLine.clear()
    this.myBar.clear()
  }
}
</script>