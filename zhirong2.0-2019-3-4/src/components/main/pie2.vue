<template>
  <div class="pie2"
    :style="{backgroundImage:'url(' + smallBg + ')'}">
    <div class="main pie2-inner"></div>

    <!-- 无数据 -->
    <NoData v-if="hide" />
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
      smallBg: smallBg,
      hide: true
    }
  },
  props: ['winResize', 'echartTitle', 'myChartData'],
  watch: {
    winResize (val, old) {
      if (old) this.myChart.resize()
    },
    myChartData (val) {
      if (val.length) {
        this.hide = false
        // 由于空间小的问题，当val数量大于 7 时候，其他的数据都合并到‘其他’键名下
        let r = this.$common.compareAndSort(val)
        let r1 = r
        if (r.length > 7) {
          r1 = r.slice(0, 7)
          let r2 = () => {
            let sum = 0
            r.slice(8, r.length).forEach((i, j) => {
              sum += i.value
            })
            return sum
          }
          r1.push({
            name: '其他',
            value: r2()
          })
        }
        this.drawPie(r1)
        document.querySelector('.pie2-inner').className = 'main pie2-inner'
      }
    }
  },
  mounted () {
    this.myChart = echarts.init(document.querySelector('.pie2 .main'))
    if (Object.keys(this.myChart).length) {
      document.querySelector('.pie2-inner').className += ' __hide'
    }
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
