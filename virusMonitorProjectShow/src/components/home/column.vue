<!-- 柱状图 -->
<style lang="stylus" scoped>
  .columnChart {
    background: url('../../../static/img/dashboard/frame2.png') no-repeat;
    background-size: 100% 100%;
  }
  .main {
    width: 95%;
    height: 73%;
    margin-top: 5.5%;
  }
  .active .main {
    margin-top: 2.5%;
  }
</style>

<template>
  <div class="columnChart">
    <v-header :name="$t('messages.dashboard.vulnerabilityTotal')" :legendArr="$t('messages.dashboard.columnLegend')" :myChart="myChart"></v-header>
    <div class="main"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import echarts from 'echarts'
import header from 'components/header/header2'
import api from '../../api/ipApi'

export default {
  data() {
    return {
      myChart: {},
      columndata: {}
    }
  },
  props: ['styleActive', 'winResize'],
  computed: {
    ...mapGetters(['language'])
  },
  components: {
    'v-header': header
  },
  mounted() {
    this.myChart = echarts.init(document.querySelector('.columnChart .main'));
    this.drawBar()
  },
  methods: {
    init() {
      let legendArr = this.myChart.getOption().series
      legendArr.forEach((data) => {
        data.selected = true
      })
      this.$root.charts.push(this.myChart)
    },
    drawBar () {
      var colors = ['rgba(27,168,210,0.7)', 'rgba(196,40,43,0.7)', 'rgba(236,164,41,0.7)']
      api.column().then((res) => {
        this.columndata = res.data.data
        let nameArr = []
        let valueArr = []
        for (let i in this.columndata) {
          if (this.columndata[i].name !== 'SecurityInfo') {
            this.columndata[i].name = this.$t('messages.dashboard.columnLegend')[i].name
            nameArr.push(this.columndata[i].name)
            valueArr.push(this.columndata[i].value)
          }
        }
        var option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            formatter: '{b}： {c}'
          },
          grid: {
            left: '15%',
            right: '15%',
            bottom: '2%',
            top: '20%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            axisLabel: {
              fontSize: 16
            },
            axisLine: {
              lineStyle: {
                color: '#2BC9A6',
                width: 3
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              lineStyle: {
                color: '#2BC9A6'
              }
            }
          },
          yAxis: {
            type: 'category',
            axisTick: {
              show: false
            },
            axisLabel: {
              fontSize: 16,
              color: 'rgba(240, 240, 240, 0.8)'
            },
            axisLine: {
              lineStyle: {
                color: '#2BC9A6',
                width: 3
              }
            },
            data: nameArr
          },
          series: [
            {
              type: 'bar',
              barWidth: 30,
              data: valueArr,
              itemStyle: {
                normal: {
                  color: function (params) {
                    return colors[params.dataIndex]
                  }
                }
              },
              label: {
                normal: {
                  show: true,
                  position: 'right',
                  fontSize: 15,
                  color: 'rgba(240, 240, 240, 0.8)'
                }
              }
            }
          ]
        }
        this.myChart.setOption(option)
        this.init()
        window.addEventListener('resize', function() {
          if (location.href.split('#/')[1] === 'dashboard') {
            this.myChart.resize()
          }
        }.bind(this))
      })
    }
  },
  watch: {
    styleActive: function() {
      $('.main').css('height', '97%')
      $('.active .main').css('height', '53%')
      this.myChart.resize()
      $('.main').css('height', '')
    },
    winResize (val, old) {
      if (old) this.myChart.resize()
    },
    language () {
      this.drawBar()
    }
  }
}
</script>