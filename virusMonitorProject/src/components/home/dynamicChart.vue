<style lang="stylus" scoped>
  .dynamicChart {
    background: url('../../../static/img/dashboard/frame3.png') no-repeat;
    background-size: 100% 100%;
  }
  .main {
    width: 90%;
    height: 74%;
    margin-top: 6%;
    margin-left: 6%;
  }
  .active .main {
    width: 90%;
    margin-top: 3%;
  }
</style>

<template>
  <div class="dynamicChart">
    <v-header :name="$t('messages.dashboard.realTimeData')" :legendArr="$t('messages.dashboard.dynamicLegend')" :myChart="myChart"></v-header>
    <div class="main"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import header from 'components/header/header3'
import api from '../../api/ipApi'

export default {
  data() {
    return {
      myChart: {},
      dynamicDate: [],
      dateList1: [],
      dateList2: [],
      dateList3: [],
      valueList1: [],
      updateAmountMax1: 0,
      valueList2: [],
      updateAmountMax2: 0,
      valueList3: [],
      updateAmountMax3: 0,
      timer: {},
      firstStep: 0
    }
  },
  props: ['styleActive', 'winResize'],
  watch: {
    styleActive () {
      $('.main').css('height', '102%')
      $('.active .main').css('height', '55%')
      this.myChart.resize()
      $('.main').css('height', '')
    },
    winResize (val, old) {
      if (old) this.myChart.resize()
    }
  },
  components: {
    'v-header': header
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    this.myChart = echarts.init(document.querySelector('.dynamicChart .main'))
    this.drawEcharts()
    this.timer = setInterval(() => {
      this.drawEcharts()
    }, 1800000)
  },
  methods: {
    init() {
      let legendArr = this.myChart.getOption().series
      legendArr.forEach((data) => {
        data.selected = true
      })
      this.$root.charts.push(this.myChart)
      api.windowResize(this)
    },
    drawEcharts() {
      api.dynamicChart().then((res) => {
        this.dynamicDate = res.data
        if (this.valueList1.length > 0) {
          this.valueList1.splice(0, 300)
          this.dateList1.splice(0, 300)
        }
        if (this.valueList2.length > 0) {
          this.valueList2.splice(0, 300)
          this.dateList2.splice(0, 300)
        }
        if (this.valueList3.length > 0) {
          this.valueList3.splice(0, 300)
          this.dateList3.splice(0, 300)
        }
        for (var i = 0; i < this.dynamicDate.ipupdate.length; i++) {
          this.valueList1.unshift(this.dynamicDate.ipupdate[i].fields.updateAmount);
          this.dateList1.unshift((this.dynamicDate.ipupdate[i].fields.createTime).slice(11, 16));
          // 计算y轴数据间隔
          if (this.dynamicDate.ipupdate[i].fields.updateAmount) {
            this.updateAmountMax1 = this.updateAmountMax1 < this.dynamicDate.ipupdate[i].fields.updateAmount ? this.dynamicDate.ipupdate[i].fields.updateAmount : this.updateAmountMax1
          }
        }
        for (var z = 0; z < this.dynamicDate.sampleupdate.length; z++) {
          this.valueList2.unshift(this.dynamicDate.sampleupdate[z].fields.updateAmount);
          this.dateList2.unshift((this.dynamicDate.sampleupdate[z].fields.createTime).slice(11, 16));
          // 计算y轴数据间隔
          if (this.dynamicDate.sampleupdate[z].fields.updateAmount) {
            this.updateAmountMax2 = this.updateAmountMax2 < this.dynamicDate.sampleupdate[z].fields.updateAmount ? this.dynamicDate.sampleupdate[z].fields.updateAmount : this.updateAmountMax2
          }
        }
        for (var r = 0; r < this.dynamicDate.geneupdate.length; r++) {
          this.valueList3.unshift(this.dynamicDate.geneupdate[r].fields.updateAmount);
          this.dateList3.unshift((this.dynamicDate.geneupdate[r].fields.createTime).slice(11, 16));
          // 计算y轴数据间隔
          if (this.dynamicDate.geneupdate[r].fields.updateAmount) {
            this.updateAmountMax3 = this.updateAmountMax3 < this.dynamicDate.geneupdate[r].fields.updateAmount ? this.dynamicDate.geneupdate[r].fields.updateAmount : this.updateAmountMax3
          }
        }
      }).then(() => {
        this.myChart.setOption(this.getOption())
        this.init()
      })
    },
    getOption() {
      var option = {
        tooltip: {
          trigger: 'axis'
        },
        xAxis: [
          {
            // x轴show:false;时，坐标及文字隐藏
            // show: false,
            max: 300,
            interval: 0,
            axisLine: {
              lineStyle: {
                // x轴底面线
                color: ['rgba(230, 230, 230, 0.2)']
              }
            },
            axisLabel: {
              // 在axisLabel下面，文字隐藏
              show: false,
              textStyle: {
                color: 'white'
              }
            }, // 去除坐标轴上的刻度线
            axisTick: {
              show: false
            },
            data: this.dateList1
          },
          {
            // x轴show:false;时，坐标隐藏
            // show : false,
            max: 300,
            interval: 0,
            axisLine: {
              lineStyle: {
                color: ['rgba(230, 230, 230, 0.2)']
              }
            },
            axisLabel: {
              // 在axisLabel下面，文字隐藏
              show: false,
              textStyle: {
                color: 'white'
              }
            },
            // 去除坐标轴上的刻度线
            axisTick: {
              show: false
            },
            data: this.dateList2,
            gridIndex: 1
          },
          {
            max: 300,
            interval: 0,
            axisLine: {
              lineStyle: {
                color: ['rgba(230, 230, 230, 0.2)']
              }
            },
            axisLabel: {
              fontSize: 16,
              textStyle: {
                color: '#2BC9A6'
              },
              interval: 30
            },
            axisTick: {
              show: false
            },
            data: this.dateList3,
            gridIndex: 2
          }
        ],
        yAxis: [
          {
            max: 'dataMax',
            interval: this.updateAmountMax1 / 2 || 1,
            splitLine: {
              lineStyle: {
                color: ['rgba(230, 230, 230, 0.4)']
              }
            },
            // 实现坐标轴颜色更改
            axisLine: {
              lineStyle: {
                color: '#2BC9A6',
                width: 2
              }
            },
            axisLabel: {
              show: true,
              fontSize: 16,
              textStyle: {
                color: '#2BC9A6'
              }
            },
            axisTick: {
              show: false
            }
          },
          {
            max: 'dataMax',
            interval: this.updateAmountMax2 / 2 || 1,
            splitLine: {
              lineStyle: {
                color: ['rgba(230, 230, 230, 0.4)']
              }
            },
            // 实现坐标轴颜色更改
            axisLine: {
              lineStyle: {
                color: '#2BC9A6',
                width: 2
              }
            },
            axisLabel: {
              show: true,
              fontSize: 16,
              textStyle: {
                color: '#2BC9A6'
              }
            },
            gridIndex: 1,
            axisTick: {
              show: false
            }
          },
          {
            max: 'dataMax',
            interval: this.updateAmountMax3 / 2 || 1,
            splitLine: {
              lineStyle: {
                color: ['rgba(230, 230, 230, 0. )']
              }
            },
            // 实现坐标轴颜色更改
            axisLine: {
              lineStyle: {
                color: '#2BC9A6',
                width: 2
              }
            },
            axisLabel: {
              show: true,
              fontSize: 16,
              textStyle: {
                color: '#2BC9A6'
              }
            },
            gridIndex: 2,
            axisTick: {
              show: false
            }
          }
        ],
        grid: [
          {
            bottom: '70%',
            left: '14%',
            right: '10%'
          }, {
            bottom: '40%',
            top: '40%',
            left: '14%',
            right: '10%'
          }, {
            top: '70%',
            left: '14%',
            right: '10%'
          }
        ],
        series: [
          {
            type: 'line',
            showSymbol: false,
            data: this.valueList1,
            itemStyle: {
              normal: {
                lineStyle: {
                  color: '#2584B4'
                }
              }
            }
          },
          {
            type: 'line',
            showSymbol: false,
            data: this.valueList2,
            xAxisIndex: 1,
            yAxisIndex: 1,
            itemStyle: {
              normal: {
                lineStyle: {
                  color: '#F46D7E'
                }
              }
            }
          },
          {
            type: 'line',
            showSymbol: true,
            symbolSize: 7,
            symbolStyle: {
              color: '#2BC9A6'
            },
            data: this.valueList3,
            xAxisIndex: 2,
            yAxisIndex: 2,
            itemStyle: {
              normal: {
                lineStyle: {
                  color: '#CDAF69'
                }
              }
            }
          }
        ]
      }
      return option
    }
  }
}
</script>
