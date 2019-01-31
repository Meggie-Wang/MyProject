<template>
  <div class="wordList"
    :style="{backgroundImage:'url(' + smallBg + ')'}">
    <div class="main"></div>
  </div>
</template>

<script>
import smallBg from '@/assets/img/smallBg.png'
import echarts from 'echarts'
require('echarts-wordcloud')

export default {
  data () {
    return {
      myChart: {},
      smallBg: smallBg,
      wordData: []
    }
  },
  props: ['winResize', 'echartTitle', 'myChartData', 'sizeRange'],
  watch: {
    winResize (val, old) {
      if (old) this.myChart.resize()
    },
    myChartData (val) {
      this.drawEcharts(val)
    }
  },
  mounted () {
    this.myChart = echarts.init(document.querySelector('.wordList .main'))
  },
  methods: {
    drawEcharts (data) {
      let that = this
      var option = {
        title: {
          text: that.echartTitle,
          textStyle: {
            color: '#fff',
            fontWeight: 'normal',
            fontSize: 15,
            textShadowColor: '#000',
            textShadowBlur: 10
          },
          left: 'center'
        },
        tooltip: {
          position: 'right',
          formatter: function (params) {
            return '<div style="white-space: normal; word-break: break-all; word-wrap: break-word; width: 300px; padding: 10px;"><p>' + params.data.name + '：' + params.data.value + '</p>' + (params.data.description ? params.data.description : '') + '</div>'
          },
          textStyle: {
            width: '100px'
          }
        },
        series: {
          type: 'wordCloud',
          gridSize: 2,
          sizeRange: this.sizeRange,
          // center: ['50%', '70%'],
          rotationRange: [0, 0],
          textStyle: {
            normal: {
              color: function (params) {
                return that.chartColor[Math.abs(parseInt((Math.random() * 10 - 5)))]
              }
            },
            emphasis: {
              shadowBlur: 10,
              shadowColor: '#333'
            }
          },
          data: data
        }
      }
      this.myChart.clear()
      this.myChart.setOption(option)
      window.addEventListener('resize', function () {
        this.myChart.resize()
      // eslint-disable-next-line
      }.bind(this))
    }
  }
}
</script>
<style scoped>
  .wordList {
    height: calc(100% / 3);
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
  }
  .main {
    width: 100%;
    height: 80%;
  }
</style>
