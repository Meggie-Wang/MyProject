<template>
  <div class="pie-component">
    <div class="pie"></div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  name: 'pie-component',
  data () {
    return {
      charts: {},
      opinion: [],
      opinionData: []
    }
  },
  props: ['resData', 'winResize'],
  computed: {
    ...mapGetters(['statusData'])
  },
  watch: {
    statusData (res) {
      let optionsName = this.opinion
      let resData = res.attackCountry
      this.opinionData = resData
      resData.forEach((i, j) => {
        optionsName.push(i.name)
      })
      this.$nextTick(() => {
        this.drawPie()
      })
    },
    winResize (val, old) {
      if (old) this.charts.resize()
    }
  },
  methods: {
    drawPie () {
      let option = {
        legend: {
          type: 'scroll',
          height: '90%',
          orient: 'vertical',
          top: 'middle',
          right: 0,
          textStyle: {
            color: '#fff'
          },
          pageTextStyle: {
            color: '#fff'
          },
          data: this.opinion
        },
        series: [{
          name: '访问来源',
          type: 'pie',
          radius: '55%',
          // roseType: 'radius',
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
          data: this.opinionData
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
    this.charts = this.$echarts.init(document.querySelector('.pie'))
    this.charts.showLoading()
  }
}
</script>
<style scoped="scoped">
  .pie-component,
  .pie{
    height: 100%;
    width: 100%;
  }
</style>
