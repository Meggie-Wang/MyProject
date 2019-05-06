<template>
  <div class="pie2-component">
    <div class="pie2"></div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  name: 'pie2-component',
  data () {
    return {
      charts: {},
      pieData: {},
      opinionData: {}
    }
  },
  props: ['resData', 'winResize'],
  computed: {
    ...mapGetters(['statusData', 'LineMaliciousInvasion', 'language'])
  },
  watch: {
    statusData (res) {
      this.pieData = res.attackType
      let opinionData = JSON.parse(JSON.stringify(res.attackType))
      for (let i in opinionData) {
        if (opinionData[i].name === this.LineMaliciousInvasion[i].key) {
          opinionData[i].name = this.LineMaliciousInvasion[i].key2
          if (this.$i18n.locale === 'zh') {
            opinionData[i].name = this.LineMaliciousInvasion[i].name
          }
        }
      }
      this.$nextTick(() => {
        this.drawPie(opinionData)
      })
    },
    winResize (val, old) {
      if (old) this.charts.resize()
    },
    language (val) {
      this.opinionData = JSON.parse(JSON.stringify(this.pieData))
      for (let i in this.opinionData) {
        if (this.opinionData[i].name === this.LineMaliciousInvasion[i].key) {
          this.opinionData[i].name = this.LineMaliciousInvasion[i].key2
          if (val === 'zh') {
            this.opinionData[i].name = this.LineMaliciousInvasion[i].name
          }
        }
      }
      this.drawPie(this.opinionData)
    }
  },
  methods: {
    drawPie (data) {
      let option = {
        legend: {
          orient: 'vertical',
          top: 'middle',
          right: 0,
          textStyle: {
            color: '#fff'
          },
          data: data.opinion
        },
        series: [{
          type: 'pie',
          radius: '55%',
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '30',
                fontWeight: 'blod'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: function (idx) {
            return Math.random() * 200
          },
          itemStyle: {
            normal: {
              shadowBlur: 200,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          data: data
        }]
      }
      this.charts.clear()
      this.charts.setOption(option)
      this.charts.hideLoading()
      window.addEventListener('resize', function () {
        if (this.$route.path === '/Status') {
          this.charts.resize()
        }
      }.bind(this))
    }
  },
  mounted () {
    this.charts = this.$echarts.init(document.querySelector('.pie2'))
    this.charts.showLoading()
  }
}
</script>
<style scoped="scoped">
  .pie2-component,
  .pie2{
    height: 100%;
    width: 100%;
  }
</style>
