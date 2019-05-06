<template>
  <div class="line-view">
    <div class="line2"></div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'line-view',
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
      this.$nextTick(() => {
        this.drawLine2(val.attackCountryLine)
      })
    },
    winResize (val, old) {
      if (old) this.myChart.resize()
    }
  },
  methods: {
    drawLine2 (data) {
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
          }
          // interval: data.DataY / 2 || 1,
          // max: 'dataMax'
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
    this.myChart = this.$echarts.init(document.querySelector('.line2'))
    this.myChart.showLoading()
  }
}
</script>
<style scoped="scoped">
  .line-view,
  .line2 {
    width: 100%;
    height: 100%;
  }
</style>
