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
      // 由于空间小的问题，当val数量大于 7 时候，其他的数据都合并到‘其他’键名下
      let r = this.$common.compareAndSort(val)
      let r1 = r
      if (r.length > 7) {
        r1 = r.slice(0, 7)
        let r2 = () => {
          let sum = 0
          r.slice(8, r.length).forEach((i, j) => {
            sum += i.value
          })
          return sum
        }
        r1.push({
          name: '其他',
          value: r2()
        })
      }

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
          data: r1
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
