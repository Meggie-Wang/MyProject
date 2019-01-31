<template>
  <div class="bar-view">
    <div class="bar"></div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'bar-view',
  data () {
    return {
      myChart: {}
    }
  },
  props: ['winResize'],
  computed: {
    ...mapGetters(['statusData'])
  },
  watch: {
    statusData (val) {
      val.attackBar.Series.forEach(i => {
        i.stack = 'bar'
        i.barWidth = 20
        i.barGap = 20
      })
      this.$nextTick(() => {
        this.drawBar(val.attackBar)
      })
    },
    winResize (val, old) {
      if (old) this.myChart.resize()
    }
  },
  methods: {
    drawBar (data) {
      let options = {
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
          }
        },
        xAxis: {
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
          // offset: -20,
          // nameGap: 100,
          axisLine: {
            lineStyle: {
              color: '#028D70',
              width: 10
            },
            symbol: 'rect',
            symbolSize: [10, 10]
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
          }
        },
        series: data.Series
      }
      this.myChart.clear()
      this.myChart.setOption(options)
      this.myChart.hideLoading()
      window.addEventListener('resize', function () {
        if (this.$route.path === '/Status') {
          this.myChart.resize()
        }
      }.bind(this))
    }
  },
  mounted () {
    this.myChart = this.$echarts.init(document.querySelector('.bar'))
    this.myChart.showLoading()
  }
}
</script>
<style scoped="scoped">
  .bar-view,
  .bar {
    height: 100%;
    width: 100%;
  }
</style>
