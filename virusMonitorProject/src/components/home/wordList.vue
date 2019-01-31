<style lang="stylus" scoped>
  .wordList {
    background: url('../../../static/img/dashboard/frame.png') no-repeat;
    background-size: 100% 100%;
  }
  .main {
    width: 100%;
    height: 65%;
    margin-top: 5%;
  }
  .active .main {
    width: 100%;
    height: 85%;
    margin-top: -3%;
  }
</style>

<template>
  <div class="wordList">
    <v-header :name="$t('messages.dashboard.hotSpotAnalysis')" :legendArr="legendArr" :myChart="myChart"></v-header>
    <div class="main">
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import echarts from 'echarts'
import header from 'components/header/header'
import api from '../../api/ipApi'
require('echarts-wordcloud')

export default {
  data() {
    return {
      legendArr: [],
      myChart: {},
      wordListData: []
    }
  },
  components: {
    'v-header': header
  },
  props: ['winResize'],
  computed: {
    ...mapGetters(['language'])
  },
  watch: {
    language (val) {
      this.drawEcharts()
    },
    winResize (val, old) {
      if (old) this.myChart.resize()
    }
  },
  mounted() {
    this.myChart = echarts.init(document.querySelector('.wordList .main'))
    this.drawEcharts()
  },
  methods: {
    drawEcharts () {
      var option = {
        tooltip: {
          show: true
        },
        series: [{
          type: 'wordCloud',
          sizeRange: [16, 66],
          textRotation: [0, 90],
          rotationRange: [-90, 90],
          rotationStep: 90,
          textPadding: 0,
          autoSize: {
            enable: true,
            minSize: 6
          },
          textStyle: {
            normal: {
              color: function(params) {
                var colorList = ['#b63d3d', '#828331', '#3453b2', '#137d72', '#0C7368']
                return colorList[Math.abs(parseInt((Math.random() * 10 - 5)))]
              }
            },
            emphasis: {
              shadowBlur: 10,
              shadowColor: '#333'
            }
          },
          data: []
        }]
      }
      if (this.$i18n.locale === 'zh') {
        api.wordList(28).then((res) => {
          /*
          * author yhy
          * 将得到的数据截取到28个样本
          * end yhy
          */
          this.wordListData = res.data
          for (var i = 0; i < this.wordListData.length; i++) {
            this.wordListData[i].value = this.wordListData[i].hot
          }
          option.series[0].data = this.wordListData
          this.myChart.clear()
          this.myChart.setOption(option)
          this.init()
        })
      } else if (this.$i18n.locale === 'en') {
        api.wordListEn(28).then((res) => {
          this.wordListData = res.data
          for (var j = 0; j < this.wordListData.length; j++) {
            this.wordListData[j].value = this.wordListData[j].hot
          }
          option.series[0].data = this.wordListData
          this.myChart.clear()
          this.myChart.setOption(option)
          this.init()
        })
      }
    },
    init() {
      this.$root.charts.push(this.myChart)
      api.windowResize(this)
    }
  }
}
</script>