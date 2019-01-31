<template>
  <div class="pie"
    :style="{backgroundImage:'url(' + smallBg + ')'}">
    <div :style="{
      height: echartTitle ? '80%' : '100%',
      width: '100%'
    }">
      <p>{{echartTitle}}</p>
      <div class="main"></div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import smallBg from '@/assets/img/smallBg.png'
export default {
  data () {
    return {
      myChart: {},
      pieData: {},
      legendName: [],
      smallBg: smallBg
    }
  },
  props: ['winResize', 'echartTitle', 'myChartData', 'echartTitleColor', 'legend'],
  watch: {
    winResize (val, old) {
      if (old) this.myChart.resize()
    },
    myChartData (val) {
      this.pieData = val
      // 比对接收数据中value大小进行排序
      let arr = this.$common.inheritObj(this.pieData)
      // start
      let compare = function (obj1, obj2) {
        let val1 = obj1.value
        let val2 = obj2.value
        if (val1 > val2) {
          return -1
        } else if (val1 < val2) {
          return 1
        } else {
          return 0
        }
      }
      arr.sort(compare)
      for (let i in arr) {
        arr[i].name = arr[i].name.toUpperCase()
        this.legendName.push(arr[i].name)
      }
      this.drawPie(arr, this.echartTitleColor)
    }
  },
  mounted () {
    this.myChart = echarts.init(document.querySelector('.pie .main'))
  },
  methods: {
    drawPie (data, echartTitleColor) {
      var option = {
        color: this.chartColor,
        title: [
          {
            show: false,
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
          {
            text: '威胁信息提取自恶意样本',
            top: 'bottom',
            left: 'center',
            textStyle: {
              color: echartTitleColor,
              fontWeight: 'normal',
              fontSize: 12
            }
          }
        ],
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)',
          textType: {
            fontSize: 12
          }
        },
        legend: {
          show: !this.legend,
          orient: 'vertical',
          right: 0,
          top: 0,
          data: this.legendName,
          itemWidth: 15,
          itemGap: 5,
          textStyle: {
            color: [],
            fontSize: 12
          }
        },
        series: {
          type: 'pie',
          selectedMode: 'single',
          label: {
            normal: {
              formatter: (res) => {
                if (this.echartTitle) {
                  if (window.innerWidth < 1600) {
                    return [res.name, res.value, res.percent + '%'].join('\n')
                  } else {
                    return [res.name, res.value + ' (' + res.percent + '%)'].join('\n')
                  }
                } else {
                  return `${res.name}: ${res.value}, ${res.percent}%`
                }
              }
            }
          },
          labelLine: {
            normal: {
              length: 5
            }
          },
          center: ['50%', '55%'],
          radius: [0, '50%'],
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
<style scoped lang="scss">
  .pie {
    position: relative;
    width: calc(100% / 3);
    height: calc(100% / 3);
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    p {
      position: relative;
      color: #fff;
      font-size: 15px;
      text-align: center;
      text-shadow: 0 0 10px #000;
    }
  }
  .main {
    width: 80%;
    height: calc(100% - 25px);
    margin: 0 auto;
  }
</style>
