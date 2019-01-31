<!-- 柱状图 -->
<style lang="stylus" scoped>
  .columnChart{
    background: url('../../../static/img/dashboard/frame3.png') no-repeat;
    background-size: 100% 100%;
  }
  .main{
    width: 95%;
    height: 73%;
    margin-top: 5.5%;
  }
  .active .main{
    width: 95%;
    margin-top: 2.5%;
  }
</style>

<template>
  <div class="columnChart">
    <v-header :name="$t('messages.dashboard.sampleAnalysis')" :legendArr="$t('messages.dashboard.columnLegend')" :myChart="myChart"></v-header>
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
      columndata: {}
    }
  },
  props: ['styleActive', 'winResize'],
  components: {
    'v-header': header
  },
  mounted() {
    this.myChart = echarts.init(document.querySelector('.columnChart .main'))
    var colors = ['rgba(27,168,210,0.7)', 'rgba(196,40,43,0.7)', 'rgba(236,164,41,0.7)']
    api.column().then((res) => {
      this.columndata = res.data.column
      let ipArr = []
      for (let i = 0; i < this.columndata.data.ip.length; i++) {
        ipArr.push(this.columndata.data.ip[i] / 10)
      }
      this.columndata.data.ip = ipArr
      var option = {
        color: colors,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: (params) => {
            let res = '<div style="text-align: left;">' + params[0].axisValue + '<br/>'
            res += '<span style="display:inline-block;background: rgba(27,168,210,0.7);width:10px;height:10px;border-radius:10px;"></span> ' + this.$t('messages.dashboard.columnLegend[0].name') + ': ' + params[0].value + '*10' + '<br/>'
            res += '<span style="display:inline-block;background: rgba(196,40,43,0.7);width:10px;height:10px;border-radius:10px;"></span> ' + this.$t('messages.dashboard.columnLegend[1].name') + ': ' + params[1].value + '<br/>'
            res += '<span style="display:inline-block;background: rgba(236,164,41,0.7);width:10px;height:10px;border-radius:10px;"></span> ' + this.$t('messages.dashboard.columnLegend[2].name') + ': ' + params[2].value + '<br/>'
            res += '</div>'
            return res
          }
        },
        grid: {
          left: '10%',
          right: '11%',
          bottom: '1%',
          top: '5%',
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
          boundaryGap: [0, 0.01],
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
          data: this.columndata.country.reverse()
        },
        series: [
          {
            name: this.$t('messages.dashboard.columnLegend[0].name'),
            type: 'bar',
            data: this.columndata.data.ip.reverse()
          },
          {
            name: this.$t('messages.dashboard.columnLegend[1].name'),
            type: 'bar',
            data: this.columndata.data.sample.reverse()
          },
          {
            name: this.$t('messages.dashboard.columnLegend[2].name'),
            type: 'bar',
            data: this.columndata.data.gene.reverse()
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
  },
  methods: {
    init() {
      let legendArr = this.myChart.getOption().series
      legendArr.forEach((data) => {
        data.selected = true;
      })
      this.$root.charts.push(this.myChart)
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
    }
  }
}
</script>