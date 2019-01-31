<style lang="stylus" scoped>
  .dynamicChart {
    background: url('../../../static/img/dashboard/frame1.png') no-repeat;
    background-size: 100% 100%;
  }
  .main {
    width: 100%;
    height: 65%;
    margin-top: 5%;
  }
  .active .main {
    height: 85%;
    margin-top: 0;
  }
</style>

<template>
  <div class="dynamicChart">
    <v-header :name="$t('messages.dashboard.IPFingerprint')" :legendArr="$t('messages.dashboard.IPTotal')" :total="total" :myChart="myChart"></v-header>
    <div class="main"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import header from 'components/header/header1'
import api from '../../api/ipApi'

export default {
  data() {
    return {
      myChart: {},
      nameList: [],
      dataList: [],
      total: 0
    }
  },
  props: ['styleActive', 'winResize'],
  watch: {
    styleActive: function() {
      $('.main').css('height', '97%')
      $('.active .main').css('height', '53%')
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
  },
  methods: {
    drawEcharts() {
      let colors = ['rgba(167,174,96,0.7)', 'rgba(171,104,175,0.7)', 'rgba(125,171,125,0.7)', 'rgba(114,166,203,0.7)', 'rgba(165,117,141,0.7)', 'rgba(154,58,62,0.7)']
      api.pie().then((res) => {
        this.total = res.data.data.numbers[2].ip_amount
        let dynamicData = res.data.data.country
        for (let i = 0; i < dynamicData.length; i++) {
          this.nameList.push(dynamicData[i].name)
          this.dataList.push(dynamicData[i].value)
        }
        var option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '10%',
            right: '12%',
            top: '20%',
            bottom: '10%',
            containLabel: true
          },
          xAxis: {
            axisLine: {
              lineStyle: {
                color: ['rgba(230, 230, 230, 0.2)']
              }
            },
            axisLabel: {
              textStyle: {
                color: '#2BC9A6'
              }
            },
            axisTick: {
              show: false
            },
            data: this.nameList
          },
          yAxis: {
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
          series: [
            {
              name: '',
              type: 'bar',
              barWidth: 50,
              data: this.dataList,
              itemStyle: {
                normal: {
                  color: function (params) {
                    return colors[params.dataIndex]
                  }
                }
              }
            }
          ]
        }
        this.myChart.setOption(option)
        this.init()
      })
    },
    init() {
      this.$root.charts.push(this.myChart)
      api.windowResize(this)
    }
  }
}
</script>
