<template>
  <div class="words-view">
    <div class='word3'></div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import 'echarts-wordcloud'
export default {
  name: 'word3',
  data () {
    return {
      charts: {}
    }
  },
  props: ['winResize'],
  watch: {
    wordcloudData (val) {
      let obj = {}
      obj.name = 'Dionaea'
      obj.data = val.Dionaea
      this.$nextTick(() => {
        this.drawWord3(obj)
      })
    },
    winResize (val, old) {
      if (old) this.charts.resize()
    }
  },
  computed: {
    ...mapGetters(['wordcloudData'])
  },
  methods: {
    drawWord3 (data) {
      let option = {
        series: [{
          type: 'wordCloud',
          gridSize: 20,
          sizeRange: [12, 50],
          rotationRange: [0, 0],
          shape: 'circle',
          textStyle: {
            normal: {
              color: function () {
                return 'rgb(' + [
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160)
                ].join(',') + ')'
              }
            },
            emphasis: {
              shadowBlur: 10,
              shadowColor: '#333'
            }
          },
          data: data.data.key_login
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
    this.charts = this.$echarts.init(document.querySelector('.word3'))
    this.charts.showLoading()
  }
}
</script>
<style scoped="scoped">
  .words-view,
  .word3{
    width: 100%;
    height: 100%;
  }
</style>
