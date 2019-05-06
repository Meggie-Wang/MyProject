<template>
  <div class="line-view">
    <div class="line1"></div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'line-view',
  data () {
    return {
      myChart: {},
      lineLegendData: {}
    }
  },
  props: ['winResize'],
  computed: {
    ...mapGetters(['statusData', 'LineMaliciousInvasion', 'language'])
  },
  watch: {
    statusData (val) {
      this.lineLegendData = val
      let attackEvent = JSON.parse(JSON.stringify(val.attackEvent))
      let attackEventData = attackEvent.Series
      let attackArr = []
      for (let i in this.LineMaliciousInvasion) {
        attackArr.push(this.LineMaliciousInvasion[i].key)
      }
      for (let i in attackEventData) {
        let index = attackEventData[i].name
        if (attackArr.indexOf(index) !== -1) {
          attackEventData[i].name = this.LineMaliciousInvasion[attackArr.indexOf(index)].key2
          if (this.$i18n.locale === 'zh') {
            attackEventData[i].name = this.LineMaliciousInvasion[attackArr.indexOf(index)].name
          }
        }
      }
      this.$nextTick(() => {
        this.drawLine1(attackEvent)
      })
    },
    winResize (val, old) {
      if (old) this.myChart.resize()
    },
    language (val) {
      let lineLegend = JSON.parse(JSON.stringify(this.lineLegendData.attackEvent))
      let attackArr = []
      for (let i in this.LineMaliciousInvasion) {
        attackArr.push(this.LineMaliciousInvasion[i].key)
      }
      for (let i in lineLegend.Series) {
        let index = lineLegend.Series[i].name
        if (attackArr.indexOf(index) !== -1) {
          lineLegend.Series[i].name = this.LineMaliciousInvasion[attackArr.indexOf(index)].key2
          if (val === 'zh') {
            lineLegend.Series[i].name = this.LineMaliciousInvasion[attackArr.indexOf(index)].name
          }
        }
      }
      this.drawLine1(lineLegend)
    }
  },
  methods: {
    drawLine1 (data) {
      let option = {
        legend: {
          type: 'scroll',
          top: 'middle',
          right: 0,
          height: '90%',
          orient: 'vertical',
          textStyle: {
            color: '#fff'
          },
          pageTextStyle: {
            color: '#fff'
          },
          icon: 'roundRect'
        },
        xAxis: {
          type: 'category',
          data: data.DataX,
          axisLine: {
            lineStyle: {
              color: '#028D70'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#9EC1BB'
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            symbol: 'rect',
            symbolSize: [10, 10],
            lineStyle: {
              color: '#028D70',
              width: 10
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#9EC1BB'
            }
          },
          interval: data.DataY / 2 || 1,
          max: 'dataMax'
        },
        series: data.Series
      }
      this.myChart.clear()
      this.myChart.setOption(option)
      this.myChart.hideLoading()
      window.addEventListener('resize', function () {
        if (this.$route.path === '/Status') {
          this.myChart.resize()
        }
      }.bind(this))
    }
  },
  mounted () {
    this.myChart = this.$echarts.init(document.querySelector('.line1'))
    this.myChart.showLoading()
  }
}
</script>
<style scoped="scoped">
  .line-view,
  .line1 {
    width: 100%;
    height: 100%;
  }
</style>
