<template>
  <div class="lineChart">
    <div class="lineTop" v-if="showLineTop">
      <ul>
        <li
        v-for="(i, j) in topBarData"
        :key="j">
          <p>{{ i.name }}</p>
          <p>{{ i.value }}</p>
        </li>
      </ul>
    </div>
    <Vechart
      className="line"
      :options="option"
      :winResize="winResize" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      myChart: {},
      lineData: [],
      option: {},
      dateList: [],
      legendName: ['恶意样本', '疑似样本', '安全文件'],
      interval: [],
      colorPad: ['#d34c5c', '#4d9cdb', '#4ee2df'],
      showLineTop: false
    }
  },
  props: ['winResize', 'myChartData', 'topBarData', 'echartTitledate', 'topSize1', 'topSize2', 'fontColor'],
  watch: {
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
      this.option = {
        color: this.colorPad,
        legend: {
          show: true,
          left: 'center',
          top: '37%',
          icon: 'roundRect',
          data: this.legendName,
          textStyle: {
            color: '#c2d3fc'
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          // interval: this.dateList.length,
          axisLine: {
            lineStyle: {
              color: '#c2d3fc'
            }
          },
          axisTick: {
            show: false // 去除坐标轴上的刻度线
          },
          axisLabel: {
            textStyle: {
              color: '#c2d3fc',
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
              color: '#c2d3fc',
              width: 2
            }
          },
          axisLabel: {
            show: true,
            fontSize: 14,
            textStyle: {
              color: '#c2d3fc'
            }
          },
          axisTick: {
            show: false
          }
        },
        grid: {
          top: '52%',
          bottom: 50
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
      this.showLineTop = true
    }
  }
}
</script>
<style scoped>
  .lineChart {
    position: relative;
    width: 20%;
    height: 50%;
  }
  .main {
    width: 90%;
    height: 90%;
    margin: 0 auto;
  }
  .lineTop {
    position: absolute;
    top: 15%;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
  }
  .lineTop ul {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .lineTop ul li {
    width: 32%;
    box-sizing: border-box;
    padding: 2px 5px 0;
  }
  .lineTop ul li p {
    color: #c2d3fc;
    line-height: 1.4rem;
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .lineTop ul li p:last-of-type {
    font-weight: bold;
  }
</style>
