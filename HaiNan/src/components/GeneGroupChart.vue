<template>
  <div class="gene-group-chart-con">
    <v-echart
      className="gene-group-chart"
      :options="option"
      @chart="chart" />
  </div>
</template>

<script>
import genetics from '@/assets/img/genetics.png'
import jiyinsuanfa from '@/assets/img/webBg.png'
export default {
  name: 'GeneGroupChart',
  data () {
    return {
      option: {}
    }
  },
  props: ['res'],
  watch: {
    res (r) {}
  },
  methods: {
    draw (d) {
      // 数据包装
      let l = 100
      let timeData = []
      for (let i = l; i--;) { // 倒叙，使得纵轴显示是从上到下递增
        timeData.push(i)
      }
      let md5Data1 = timeData.map(i => {
        return {
          name: 'haha',
          value: 1,
          symbolSize: [Math.random() * 250, 4],
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [{
                offset: 0, color: 'red' // 0% 处的颜色
              }, {
                offset: 0.45, color: 'transparent' // 45% 处的颜色
              }, {
                offset: 0.55, color: 'transparent' // 45% 处的颜色
              }, {
                offset: 1, color: 'blue' // 100% 处的颜色
              }],
              global: false // 缺省为 false
            }
          }
        }
      })
      let md5Data2 = timeData.map(i => {
        return {
          name: 'haha',
          value: 2,
          symbolSize: [Math.random() * 250, 4],
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [{
                offset: 0, color: 'red' // 0% 处的颜色
              }, {
                offset: 0.45, color: 'transparent' // 45% 处的颜色
              }, {
                offset: 0.55, color: 'transparent' // 45% 处的颜色
              }, {
                offset: 1, color: 'blue' // 100% 处的颜色
              }],
              global: false // 缺省为 false
            }
          }
        }
      })

      // 基因组的背景纹理
      let img = new Image()
      img.src = genetics
      img.onload = () => {
        let bg = new Image()
        bg.src = jiyinsuanfa
        bg.onload = () => {
          this.option = {
            backgroundColor: {
              image: bg
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                animation: false
              }
            },
            axisPointer: {
              link: { yAxisIndex: 'all' }
            },
            grid: {
              top: '3%',
              left: '3%',
              right: '3%',
              bottom: '3%',
              containLabel: true
            },
            dataZoom: [{
              type: 'inside',
              start: 20,
              end: 70,
              yAxisIndex: 0,
              orient: 'vertical'
            }, {
              yAxisIndex: 0,
              orient: 'vertical',
              handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
              handleSize: '80%',
              handleStyle: {
                color: '#fff',
                shadowBlur: 3,
                shadowColor: 'rgba(0, 0, 0, 0.6)',
                shadowOffsetX: 2,
                shadowOffsetY: 2
              }
            }],
            yAxis: [
              {
                type: 'category',
                boundaryGap: false,
                data: timeData
              }
            ],
            xAxis: [
              {
                type: 'value',
                max: 3,
                axisLine: {
                  show: false
                },
                axisLabel: {
                  show: false
                },
                splitLine: {
                  show: false
                },
                axisTick: {
                  show: false
                }
              }
            ],
            itemStyle: {
              color: '#fff'
            },
            emphasis: {
              itemStyle: {
                color: 'black',
                borderWidth: 15,
                borderColor: 'black'
              }
            },
            series: [
              {
                name: 'md5-1',
                type: 'line',
                symbol: 'rect',
                symbolSize: [20, 4],
                showAllSymbol: true,
                lineStyle: {
                  width: 200,
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0.1,
                    y2: 1,
                    colorStops: [{
                      offset: 0, color: 'teal' // 0% 处的颜色
                    }, {
                      offset: 1, color: '#02b886' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                  }
                  // color: {
                  //   image: img,
                  //   repeat: 'repeat'
                  // }
                },
                hoverAnimation: false,
                data: md5Data1
              },
              {
                name: 'md5-2',
                type: 'line',
                symbol: 'rect',
                symbolSize: [250, 4],
                showAllSymbol: true,
                lineStyle: {
                  width: 200,
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0.1,
                    y2: 1,
                    colorStops: [{
                      offset: 0, color: 'teal' // 0% 处的颜色
                    }, {
                      offset: 1, color: '#02b886' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                  }
                  // color: {
                  //   image: img,
                  //   repeat: 'repeat'
                  // }
                },
                hoverAnimation: false,
                data: md5Data2
              }
            ]
          }
        }
      }
    },
    chart (p) {
      p.on('mousedown', p => {
        console.log(p)
      })
    }
  },
  mounted () {
    this.draw()
  }
}
</script>

<style scoped="scoped" lang="scss">
  .gene-group-chart-con {
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, .5);
  }
</style>
