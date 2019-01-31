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
  .up_left_top {
    height: 265px;
  }
  .up_lfet_bottom {
  }
  .up_right {
    width: 45%;
    height: 260px;
    margin: 10px 5% 10px 0;
  }
  .up_right_top {
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
  table th {
    height:30px;    
    border-right: 2px solid #169175;
    border-bottom: 2px solid #169175;
    width: 12.5%;
  }
  table th:nth-child(4) {
    box-sizing: border-box;
    width: 25%;
  }
  table th:nth-last-child(1) {
    border-right: none;
  }
  table td {
    border-right: 2px solid #169175;
    border-bottom: 2px solid #169175;
    text-align: center;
    height:60px; 
  }
  table tr:last-of-type td {
    border-bottom: none;
  }
   table td:nth-child(4) {
    padding: 0 2%;
  } 
  table td:nth-last-child(1) {
    border-right: none;
  }
  table td i {
    display: inline-block;
    width: 30px;
    height: 30px;
    cursor: pointer;
    user-select: none;
  }
  table td i:first-of-type {
    margin-right: 10%;
  }
</style>
<style>
  /*分页*/
  .pagination {
    display: flex;
    justify-content: flex-end;
    width: 80%;
    height: 30px;
    line-height: 30px;
    margin: 0 auto;
  }
  .pagination li {
    margin-left: 1rem !important;
  }
  .pagination li a {
    display: flex;
    justify-content: space-around;
    align-items: center;
    min-width: 1.5rem;
    height: 1.5rem;
    white-space: nowrap;
    border-radius: 2px;
    outline: none;
    user-select: none;
  }
  .page-item.active a {
    background: #017d63;
    color: #fff;
  }
  .pagination li a:hover {
    color: #017d63;
  }
  .page-item.active a:hover {
    color: #fff;
  }
</style>
<template>
  <div class="detHistory_container">
    <!-- 基因检测概要 begin -->
    <p class="title">{{ $t('messages.detectionHistory.historicalDet') }}</p>
    <div class="line"></div>
    <div class="up">
      <div class="up_left fl">
        <div class="up_left_top" id="up_left_top">
          <!-- 图表 -->
        </div>
        <div class="up_lfet_bottom">
          <p style="text-align:center">{{ $t('messages.detectionHistory.LastYearDetTask') }}</p>
        </div>
      </div>
      <div class="up_right fr">
        <div class="up_right_top" id="up_right_top">
          <!-- 图表 -->
        </div>
        <div class="up_right_bottom">
          <p style="text-align:center">{{ $t('messages.detectionHistory.testResAnalysis') }}</p>
        </div>
      </div>
    </div>
    <!-- 基因检测概要 end -->
    <!-- 检测任务队列 begin -->
    <p class="title">{{ $t('messages.detectionHistory.historicalDetRes') }}</p>
    <div class="line"></div>
    <div class="down">
      <table>
        <tr>
          <th>{{ $t('messages.detectionQueue.sampleName') }}</th>
          <th>{{ $t('messages.detectionQueue.submitTime') }}</th>
          <th>{{ $t('messages.detectionHistory.completionTime') }}</th>
          <th>{{ $t('messages.detectionHistory.detRes') }}</th>
          <th>{{ $t('messages.detectionHistory.resView') }}</th>
          <th>{{ $t('messages.detectionQueue.taskUser') }}</th>
        </tr>
        <tr v-for="(testQueue, index) in testQueues" :key="index">
          <td>{{ testName[index] }}</td>
          <td>{{ testQueue.submitTime }}</td>
          <td>{{ testQueue.finishTime }}</td>
          <td>{{ testQueue.testResult }}</td>
          <td>
            <i :style="{'background': testQueue.id === 'param_error' ? 'url(../../../static/img/icon.png) -254px -49px no-repeat' : 'url(../../../static/img/icon.png) 0px -50px no-repeat'}" @click="geneRep(testQueue.id, testQueue.testName, testQueue.finishTime)"></i><i :style="{'background': testQueue.id === 'param_error' ? 'url(../../../static/img/icon.png) -203px -146px no-repeat' : 'url(../../../static/img/icon.png) -97px -97px no-repeat'}" @click="downloadgeneRep(testQueue.id, testQueue.testName)"></i>
          </td>
          <td>{{ testQueue.userId }}</td>
        </tr>
      </table>
    </div>
    <!-- 检测任务队列 end -->
    <!-- 分页 -->
    <paginate
      v-if="total"
      :page-count="Math.ceil(total / 20)"
      :page-range="5"
      :margin-pages="1"
      :click-handler="handleCurrentChange"
      :prev-text="'<'"
      :next-text="'>'"
      :container-class="'pagination'"
      :page-class="'page-item'"
      :initial-page="Number(this.$route.query.page - 1)"></paginate>
  </div>
</template>
<script>
import api from '../../api/ipApi'
import echarts from 'echarts'
import {Loading} from 'element-ui'

export default {
  data() {
    return {
      testQueues: [],
      total: 0,
      loading: {},
      testName: []
    }
  },
  props: ['language'],
  watch: {
    language (val) {
      this.getData()
    }
  },
  mounted() {
    this.getData()
    this.urlChange(this.$route.query.page || 1)
  },
  methods: {
    getData () {
      this.loading = Loading.service()
      // 图表调用数据
      api.getQueueEchartsMonth().then(res => {
        this.loading = Loading.service().close()
        if (res.status === 200) {
          this.day = res.data
          // 第一张
          this.myBar = echarts.init(document.getElementById("up_left_top"));
          var option = {
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
              data: [this.day.date11, this.day.date10, this.day.date9, this.day.date8, this.day.date7, this.day.date6, this.day.date5, this.day.date4, this.day.date3, this.day.date2, this.day.date1, this.day.date],
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
              data: [this.day.sample11, this.day.sample10, this.day.sample9, this.day.sample8, this.day.sample7, this.day.sample6, this.day.sample5, this.day.sample4, this.day.sample3, this.day.sample2, this.day.sample1, this.day.sample],
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
          this.myBar.setOption(option, true);
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
          this.myLine.setOption(option2, true)
          this.drawLine()
        }
      })

      // 任务队列
      api.getDecetionPage(this.$route.query.page || 1).then(res => {
        var that = this
        if (res.status === 200) {
          that.testQueues = res.data.results
          for (var i = 0; i < res.data.results.length; i++) {
            that.testName[i] = res.data.results[i].testName
            if (that.testName[i].length > 40) {
              that.testName[i] = that.testQueues[i].testName.substring(0, 40) + '...'
            }
            if (res.data.results[i].testResult) {
              that.total = res.data.count
              that.testQueues[i].id = res.data.results[i].testResult.geneTestingResults
              that.testQueues[i].submitTime = res.data.results[i].submitTime.split('T')[0] + ' ' + res.data.results[i].submitTime.split('T')[1].split('.')[0]
              that.testQueues[i].finishTime = res.data.results[i].finishTime.split('T')[0] + ' ' + res.data.results[i].finishTime.split('T')[1].split('.')[0]
              var testingResult = Number(res.data.results[i].testResult.isViruses)
              switch (testingResult) {
                case 0:
                  that.testQueues[i].testResult = this.$t('messages.detectionQueue.maliciousTwo')
                  break
                case 1:
                  that.testQueues[i].testResult = this.$t('messages.detectionQueue.maliciousOne')
                  break
                case 2:
                  that.testQueues[i].testResult = this.$t('messages.detectionQueue.maliciousThree')
                  break
                case 3:
                  that.testQueues[i].testResult = this.$t('messages.detectionQueue.maliciousFour')
                  break
              }
            } else {
              that.testQueues[i].testResult = this.$t('messages.detectionQueue.nothing')
              that.testQueues[i].submitTime = res.data.results[i].submitTime.split('T')[0] + ' ' + res.data.results[i].submitTime.split('T')[1].split('.')[0]
              that.testQueues[i].finishTime = res.data.results[i].finishTime.split('T')[0] + ' ' + res.data.results[i].finishTime.split('T')[1].split('.')[0]
            }
            if (that.testQueues[i].id === 'param_error') {
              that.testQueues[i].testResult = this.$t('messages.detectionQueue.error')
            }
          }
        }
      })
    },
    drawBar() {
      window.addEventListener('resize', function() {
        this.myBar.resize()
      }.bind(this))
    },
    drawLine() {
      window.addEventListener('resize', function() {
        this.myLine.resize()
      }.bind(this))
    },
    // 当前页码
    handleCurrentChange(val) {
      this.urlChange(val)
      api.getDecetionPage(val).then(res => {
        var that = this
        if (res.status === 200) {
          that.testQueues = res.data.results
          for (var i = 0; i < res.data.results.length; i++) {
            that.testName[i] = res.data.results[i].testName
            if (that.testName[i].length > 40) {
              that.testName[i] = that.testQueues[i].testName.substring(0, 40) + '...'
            }
            if (res.data.results[i].testResult) {
              that.total = res.data.count
              that.testQueues[i].id = res.data.results[i].testResult.geneTestingResults
              that.testQueues[i].submitTime = res.data.results[i].submitTime.split('T')[0] + ' ' + res.data.results[i].submitTime.split('T')[1].split('.')[0]
              that.testQueues[i].finishTime = res.data.results[i].finishTime.split('T')[0] + ' ' + res.data.results[i].finishTime.split('T')[1].split('.')[0]
              var testingResult = res.data.results[i].testResult.isViruses
              switch (testingResult) {
                case 0:
                  that.testQueues[i].testResult = this.$t('messages.detectionQueue.maliciousTwo')
                  break
                case 1:
                  that.testQueues[i].testResult = this.$t('messages.detectionQueue.maliciousOne')
                  break
                case 2:
                  that.testQueues[i].testResult = this.$t('messages.detectionQueue.maliciousThree')
                  break
                case 3:
                  that.testQueues[i].testResult = this.$t('messages.detectionQueue.maliciousFour')
                  break
              }
            } else {
              that.testQueues[i].testResult = "无"
              that.testQueues[i].submitTime = res.data.results[i].submitTime.split('T')[0] + ' ' + res.data.results[i].submitTime.split('T')[1].split('.')[0]
              that.testQueues[i].finishTime = res.data.results[i].finishTime.split('T')[0] + ' ' + res.data.results[i].finishTime.split('T')[1].split('.')[0]
            }
            if (that.testQueues[i].id === 'param_error') {
              that.testQueues[i].testResult = "检测错误"
            }
          }
        }
      })
    },
    // 改变url
    urlChange(page) {
      if (!page) {
        page = 1
      }
      location.href = location.href.split('?')[0] + '?page=' + page
    },
    geneRep(id, fileName, finishTime) {
      if (id !== 'param_error') {
        this.$router.push({
          path: 'geneReport',
          query: {
            id: id,
            fileName: fileName,
            finishTime: finishTime
          }
        })
        return
      }
    },
    downloadgeneRep(id, fileName) {
      if (id !== 'param_error') {
        var reportUrl = api.requestUrl + 'api/GENE_getReport/id=' + id + '/filename=' + fileName + '/'
        window.open(reportUrl)
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.path !== '/dashboard') {
      this.loading = Loading.service().close()
    }
    next()
  },
  destroyed() {
    this.myLine.clear()
    this.myBar.clear()
  }
}
</script>