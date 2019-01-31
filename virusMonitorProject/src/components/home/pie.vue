<style lang="stylus" scoped>
  .pie{
    background: url('../../../static/img/dashboard/frame3.png') no-repeat;
    background-size:100% 100%;
  }
  .main{
    width: 100%;
    height: 80%;
    margin-top: 8%
  }
  .active .main {
    width: 100%;
    margin-top: 4%;
  }
</style>

<template>
  <div class="pie">
    <v-header :name="$t('messages.dashboard.totalData')" :legendArr="legendArr" :myChart="myChart"></v-header>
    <div class="main"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import echarts from 'echarts'
import header from 'components/header/header3'
import api from '../../api/ipApi'
export default {
  data() {
    return {
      legendArr: this.$t('messages.dashboard.pieLegendArr'),
      myChart: {},
      pieData: {}
    }
  },
  props: ['styleActive', 'winResize'],
  computed: {
    ...mapGetters(['language'])
  },
  components: {
    'v-header': header
  },
  mounted() {
    this.myChart = echarts.init(document.querySelector('.pie .main'))
    this.drawPie()
  },
  methods: {
    drawPie () {
      var colors1 = ['rgba(219,199,102,0.7)', 'rgba(27,168,210,0.7)', 'rgba(196,40,43,0.7)']
      var colors2 = ['rgba(218,120,205,0.7)', 'rgba(111,163,202,0.7)', 'rgba(143,38,43,0.7)', 'rgba(216,187,132,0.7)', 'rgba(131,132,75,0.7)']
      var colors3 = ['rgba(167,174,96,0.7)', 'rgba(171,104,175,0.7)', 'rgba(125,171,125,0.7)', 'rgba(114,166,203,0.7)', 'rgba(165,117,141,0.7)', 'rgba(154,58,62,0.7)']
      api.pie().then((res) => {
        this.pieData = res.data.data
        for (let i = 0; i < this.pieData.gene.length; i++) {
          this.pieData.gene[i].name = this.$t('messages.dashboard.pieGeneArr')[i].name
        }
        for (let j = 0; j < this.pieData.tools.length; j++) {
          this.pieData.tools[j].name = this.$t('messages.dashboard.pieToolsArr')[j].name
        }
        var option = {
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)",
            textType: {
              fontSize: 15
            }
          },
          series: [
            {
              color: colors1,
              name: this.$t('messages.dashboard.pieLegendArr[0].name') + ': ' + this.pieData.numbers[0].gene_amount,
              type: 'pie',
              selectedMode: 'single',
              radius: [0, '30%'],
              avoidLabelOverlap: true,
              label: {
                normal: {
                  position: 'inner',
                  fontSize: 15
                }
              },
              labelLine: {
                normal: {
                  show: true
                }
              },
              data: this.pieData.gene
            },
            {
              color: colors2,
              name: this.$t('messages.dashboard.pieLegendArr[1].name') + ': ' + this.pieData.numbers[1].samples_amount,
              type: 'pie',
              selectedMode: 'single',
              radius: ['40%', '55%'],
              label: {
                normal: {
                  position: 'inner',
                  fontSize: 15
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: this.pieData.tools
            },
            {
              color: colors3,
              name: this.$t('messages.dashboard.pieLegendArr[2].name') + ': ' + this.pieData.numbers[2].ip_amount,
              type: 'pie',
              selectedMode: 'single',
              radius: ['65%', '80%'],
              label: {
                normal: {
                  formatter: '{b|{b}：} {c} \n{per|{d}%}  ',
                  fontSize: 16,
                  fontWeight: 'bold',
                  rich: {
                    // 国家
                    b: {
                      fontSize: 16,
                      fontWeight: 'bold'
                    },
                    // 百分比
                    per: {
                      fontSize: 16,
                      fontWeight: 'bold'
                    }
                  }
                }
              },
              labelLine: {
                normal: {
                  smooth: true,
                  show: true,
                  length2: 50
                }
              },
              data: this.pieData.country
            }
          ]
        }
        this.myChart.clear()
        this.myChart.setOption(option)
        this.init()
      })
    },
    init() {
      this.legendArr = this.myChart.getOption().series
      this.legendArr.forEach((data) => {
        data.selected = true
      })
      this.$root.charts.push(this.myChart)
      api.windowResize(this)
    }
  },
  watch: {
    styleActive: function() {
      $('.main').css('height', '110%')
      $('.active .main').css('height', '55%')
      this.myChart.resize()
      $('.main').css('height', '')
    },
    language () {
      this.drawPie()
    },
    winResize (val, old) {
      if (old) this.myChart.resize()
    }
  }
}
</script>