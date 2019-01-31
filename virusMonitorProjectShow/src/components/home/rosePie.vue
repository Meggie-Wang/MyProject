<style lang="stylus" scoped>
  .rosePie {
    background: url('../../../static/img/dashboard/frame1.png') no-repeat;
    background-size: 100% 100%;
  }
  .main {
    width: 100%;
    height: 80%;
    margin-top: 3%;
  }
  .active .main {
    margin-top: 0;
  }
</style>

<template>
  <div class="rosePie">
    <v-header :name="$t('messages.dashboard.sample')" :legendArr="$t('messages.dashboard.sampleTotal')" :total="total" :myChart="myChart"></v-header>
    <div class="main"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import echarts from 'echarts'
import header from 'components/header/header1'
import api from '../../api/ipApi'
export default {
  data() {
    return {
      myChart: {},
      pieData: {},
      total: 0
    }
  },
  props: ['styleActive', 'winResize'],
  computed: {
    ...mapGetters(['language'])
  },
  watch: {
    styleActive: function() {
      $('.main').css('height', '97%')
      $('.active .main').css('height', '53%')
      this.myChart.resize()
      $('.main').css('height', '')
    },
    language () {
      this.drawPie()
    },
    winResize (val, old) {
      if (old) this.myChart.resize()
    }
  },
  components: {
    'v-header': header
  },
  mounted() {
    this.myChart = echarts.init(document.querySelector('.rosePie .main'))
    this.drawPie()
  },
  methods: {
    drawPie () {
      api.pie().then((res) => {
        this.total = res.data.data.numbers[1].samples_amount
        this.pieData = res.data.data.tools
        for (let j = 0; j < this.pieData.length; j++) {
          this.pieData[j].name = this.$t('messages.dashboard.pieToolsArr')[j].name
        }
        var option = {
          color: ['rgba(218,120,205,0.7)', 'rgba(111,163,202,0.7)', 'rgba(143,38,43,0.7)', 'rgba(216,187,132,0.7)', 'rgba(131,132,75,0.7)'],
          tooltip: {
            trigger: 'item',
            formatter: "{b}: {c} ({d}%)",
            textType: {
              fontSize: 15
            }
          },
          series: [{
            type: 'pie',
            selectedMode: 'single',
            roseType: 'radius',
            radius: [50, 130],
            avoidLabelOverlap: true,
            label: {
              normal: {
                formatter: '{b|{b}：} {c} \n{per|{d}%}',
                fontSize: 20,
                fontWeight: 'bold',
                rich: {
                  // 国家
                  b: {
                    fontSize: 20,
                    fontWeight: 'bold'
                  },
                  // 百分比
                  per: {
                    fontSize: 20,
                    fontWeight: 'bold'
                  }
                }
              }
            },
            labelLine: {
              normal: {
                smooth: true,
                show: true,
                length2: 20
              }
            },
            data: this.pieData
          }]
        }
        this.myChart.clear()
        this.myChart.setOption(option)
        this.init()
      })
    },
    init() {
      this.$root.charts.push(this.myChart)
      api.windowResize(this)
    }
  }
}
</script>