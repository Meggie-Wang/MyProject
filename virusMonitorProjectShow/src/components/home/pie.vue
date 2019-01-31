<style lang="stylus" scoped>
  .pie {
    background: url('../../../static/img/dashboard/frame1.png') no-repeat;
    background-size: 100% 100%;
  }
  .main {
    width: 100%;
    height: 80%;
    margin-top: 8%
  }
  .active .main {
    margin-top: 0;
  }
</style>

<template>
  <div class="pie">
    <v-header :name="$t('messages.dashboard.gene')" :legendArr="$t('messages.dashboard.geneTotal')" :total="total" :myChart="myChart"></v-header>
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
  components: {
    'v-header': header
  },
  mounted() {
    this.myChart = echarts.init(document.querySelector('.pie .main'))
    this.drawPie()
  },
  methods: {
    drawPie () {
      api.pie().then((res) => {
        this.total = res.data.data.numbers[0].gene_amount
        this.pieData = res.data.data.gene
        for (let i = 0; i < this.pieData.length; i++) {
          this.pieData[i].name = this.$t('messages.dashboard.pieGeneArr')[i].name
        }
        var option = {
          color: ['rgba(219,199,102,0.7)', 'rgba(27,168,210,0.7)', 'rgba(196,40,43,0.7)'],
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
            radius: [0, '60%'],
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
                length2: 50
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