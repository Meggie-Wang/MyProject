<template>
  <div class="pie2"
    :style="{backgroundImage:'url(' + smallBg + ')'}">
    <div class="main"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import smallBg from '@/assets/img/smallBg.png'
export default {
  data () {
    return {
      myChart: {},
      pieData: [],
      nameArr: [],
      smallBg: smallBg
    }
  },
  props: ['winResize', 'echartTitle', 'myChartData'],
  watch: {
    winResize (val, old) {
      if (old) this.myChart.resize()
    },
    myChartData (val) {
      this.drawPie(val)
    }
  },
  mounted () {
    this.myChart = echarts.init(document.querySelector('.pie2 .main'))
  },
  methods: {
    drawPie (data) {
      var option = {
        color: this.chartColor,
        title: {
          text: this.echartTitle,
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
          position: 'top',
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)',
          textType: {
            fontSize: 12
          }
        },
        series: {
          type: 'pie',
          selectedMode: 'single',
          center: ['50%', '60%'],
          radius: ['40%', '60%'],
          label: {
            normal: {
              formatter: (res) => {
                if (window.innerWidth < 1600) {
                  if (res.data.name.length > 6) {
                    // echart 根据label占用的面积自动引线，只能两行
                    // let s = res.data.name.split('')
                    // let ia = []
                    // s.forEach((i, j) => {
                    //   ia.push(i)
                    //   if ((j + 1) % 6 === 0) {
                    //     ia.push('-\n')
                    //   }
                    // })
                    // return ia.join('')
                    return res.data.name.slice(0, 5) + '...'
                  } else {
                    return res.data.name
                  }
                } else {
                  return res.data.name
                }
              }
            }
          },
          labelLine: {
            normal: {
              length: 5
            }
          },
          avoidLabelOverlap: true,
          data: data
        }
      }
      this.myChart.clear()
      this.myChart.setOption(option)
      window.addEventListener('resize', function () {
        this.myChart.resize()
      }.bind(this))
    }
  }
}
</script>
<style scoped>
  .pie2 {
    height: calc(100% / 3);
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
  }
  .main {
    width: 80%;
    height: 80%;
  }
</style>
