<template>
  <div class="pieChart">
    <Vechart
      className="pie"
      :options="option"
      :winResize="winResize" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      myChart: {},
      option: {}
    }
  },
  props: ['winResize', 'myChartData'],
  watch: {
    myChartData (val) {
      this.option = {
        color: this.chartColor,
        tooltip: {
          position: 'top',
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)',
          textType: {
            fontSize: 12
          }
        },
        series: {
          type: 'pie',
          selectedMode: 'single',
          center: ['50%', '50%'],
          radius: ['50%', '75%'],
          label: {
            normal: {
              formatter: (res) => {
                if (window.innerWidth < 2000) {
                  if (res.data.name.length > 6) {
                    // let s = res.data.name.split('')
                    // let ia = []
                    // s.forEach((i, j) => {
                    //   ia.push(i)
                    //   if ((j + 1) % 6 === 0) {
                    //     ia.push('-\n')
                    //   }
                    // })
                    // return ia.join('')
                    return res.data.name.slice(0, 5) + '...'
                  } else {
                    return res.data.name
                  }
                } else {
                  return res.data.name
                }
              }
            }
          },
          labelLine: {
            normal: {
              length: 5
            }
          },
          avoidLabelOverlap: true,
          data: val
        }
      }
    }
  }
}
</script>
<style scoped>
  .pieChart {
    width: 20%;
    height: 50%;
  }
  .main {
    width: 90%;
    height: 90%;
    margin: 0 auto;
  }
</style>
