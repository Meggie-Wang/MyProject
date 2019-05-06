<template>
  <div class="v-echart">
    <div :class="className" style="width: 100%; height: 100%;"></div>
  </div>
</template>
<style type="text/css" scoped="scoped">
  .v-echart {
    height: 100%;
    width: 100%;
  }
</style>
<script type="text/javascript">
import echarts from 'echarts'
// eslint-disable-next-line
import world from 'echarts/map/js/world'
export default {
  name: 'v-echart',
  props: ['className', 'options'],
  data () {
    return {
      vEchart: {}
    }
  },
  watch: {
    options (op) {
      this.draw(op)
    }
  },
  methods: {
    draw (op) {
      this.vEchart.clear()
      this.vEchart.setOption(op)
      // 监听chart实例渲染了options之后，将chart对象传递给父组件做进一步操作
      this.$emit('chart', this.vEchart)
      if (this.$route.path === '/GeneHeatmap') {
        this.vEchart.resize() // 渲染时没有动画,所以暂时注释
      }
      window.addEventListener('resize', function () {
        this.vEchart.resize()
      }.bind(this))
    }
  },
  mounted () {
    this.vEchart = echarts.init(document.querySelector('.' + this.className))
    this.draw(this.options)
  }
}
</script>
