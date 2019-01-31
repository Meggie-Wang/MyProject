<template>
  <div class="line"
    :style="{backgroundImage:'url(' + smallBg + ')'}">
    <div class="main"></div>
    <div class="lineTop">
      <ul>
        <!-- <li :style="{color: echartTitleColor}">
          <p :style="{fontSize: topSize1 + 'px'}">已入库样本总量</p>
          <p :style="{fontSize: topSize2 + 'px'}">{{ $common.numberChange(lineData.today_into_storage_amount,2)}}</p>
        </li>
        <li :style="{color: echartTitleColor}">
          <p :style="{fontSize: topSize1 + 'px'}">{{ echartTitledate }}检测总量</p>
          <p :style="{fontSize: topSize2 + 'px'}">{{ $common.numberChange(lineData.today_detection_total_amount,2) }}</p>
        </li> -->
        <li
        v-for="(i, j) in topBarData"
        :key="j"
        :style="{
          color: echartTitleColor,
          backgroundColor: colorPad[i.sort - 1]
        }">
          <p :style="{
            fontSize: 14 + 'px',
            color: fontColor
          }">{{i.name}}</p>
          <p :style="{
            fontSize: topSize2 + 'px',
            color: fontColor
          }">{{i.value}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import smallBg from '@/assets/img/smallBg.png'
export default {
  data () {
    return {
      smallBg: smallBg,
      myChart: {},
      lineData: [],
      dateList: [],
      legendName: ['恶意样本', '疑似样本', '安全文件'],
      interval: [],
      colorPad: ['#d34c5c', '#4d9cdb', '#4ee2df']
    }
  },
  props: ['winResize', 'echartTitle', 'myChartData', 'topBarData', 'echartTitleColor', 'echartTitledate', 'topSize1', 'topSize2', 'fontColor'],
  watch: {
    winResize (val, old) {
      if (old) this.myChart.resize()
    },
    myChartData (val) {
      this.lineData = val
      this.dateList = val.create_time
      this.interval = []
      for (let i in this.lineData) {
        if (i === 'maliciously_amount' || i === 'nonmaliciously_amount' || i === 'unknow_amount') {
          for (let j in this.lineData[i]) {
            this.interval.push(Math.max(this.lineData[i][j]))
          }
        }
      }
      this.drawEcharts(this.echartTitleColor)
    }
  },
  mounted () {
    this.myChart = echarts.init(document.querySelector('.line .main'))
  },
  methods: {
    drawEcharts (echartTitleColor) {
      var option = {
        color: this.colorPad,
        title: [
          {
            left: 'center',
            text: this.echartTitle,
            textStyle: {
              color: '#fff',
              fontWeight: 'normal',
              fontSize: 15,
              textShadowColor: '#000',
              textShadowBlur: 10
            }
          },
          {
            top: '40%',
            left: 'center',
            text: '样本分析动态',
            textStyle: {
              color: echartTitleColor,
              fontWeight: 'normal',
              fontFamily: '黑体',
              fontSize: 12
            }
          }
        ],
        legend: {
          show: false,
          left: 'center',
          top: '33%',
          icon: 'roundRect',
          data: this.legendName,
          textStyle: {
            color: echartTitleColor
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          // interval: this.dateList.length,
          axisLine: {
            lineStyle: {
              color: echartTitleColor
            }
          },
          axisTick: {
            show: false // 去除坐标轴上的刻度线
          },
          axisLabel: {
            textStyle: {
              color: echartTitleColor,
              fontSize: 10
            }
          },
          splitLine: {
            show: false
          },
          data: this.dateList
        },
        yAxis: {
          max: 'dataMax',
          interval: Math.ceil(Math.max(...this.interval) / 2) || 1,
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: echartTitleColor,
              width: 2
            }
          },
          axisLabel: {
            show: true,
            fontSize: 14,
            textStyle: {
              color: echartTitleColor
            }
          },
          axisTick: {
            show: false
          }
        },
        grid: {
          top: '50%',
          bottom: 30
        },
        series: [
          {
            name: '恶意样本',
            type: 'line',
            showSymbol: false,
            smooth: true,
            data: this.lineData.maliciously_amount
          },
          {
            name: '疑似样本',
            type: 'line',
            showSymbol: false,
            smooth: true,
            data: this.lineData.unknow_amount
          },
          {
            name: '安全文件',
            type: 'line',
            showSymbol: false,
            smooth: true,
            data: this.lineData.nonmaliciously_amount
          }
        ]
      }
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
  .line {
    position: relative;
    width: calc(100% / 3);
    height: calc(100% / 3);
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
  }
  .main {
    margin: 0 auto;
    width: 80%;
    height: 80%;
  }
  .lineTop {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    width: 70%;
  }
  .lineTop ul {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .lineTop ul li {
    /*flex: 1;*/
    width: 32%;
    box-sizing: border-box;
    padding: 2px 5px 0;
    /*background: url('../../../assets/img/lineTop.png') center center / cover no-repeat;*/
  }
  .lineTop ul li:first-of-type {
    /*margin-right: 10px;*/
  }
  .lineTop ul li p {
    line-height: 1.4rem;
    text-align: center;
  }
  /*.lineTop ul li p:first-of-type {
    font-size: 10px;
  }*/
  .lineTop ul li p:last-of-type {
    font-weight: bold;
  }
</style>
