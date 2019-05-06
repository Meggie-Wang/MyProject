<template>
  <div class="MapView">
    <div id="MapView"></div>
  </div>
</template>
<script>
import 'echarts/map/js/world'
import { mapGetters } from 'vuex'
export default{
  name: 'MapView',
  data () {
    return {
      myChart: {},
      time: 0
    }
  },
  props: ['winResize'],
  computed: {
    ...mapGetters(['mapData'])
  },
  watch: {
    mapData (val) {
      this.$nextTick(() => {
        this.init(val)
      })
    },
    winResize (val, old) {
      if (old) this.myChart.resize()
    }
  },
  methods: {
    init (res) {
      let _this = this
      let lineColor = ['#ee634c', '#e37f49', '#e39549', '#e3bd49', '#e3e349']
      let series = []
      let legendArr = []
      res.forEach(function (item, i) {
        legendArr.push(item[0][0])
        // 攻击者数据
        let toCoord = item.map(function (dataItem) {
          return {
            value: [dataItem[1].longitude, dataItem[1].latitude].concat([dataItem[1].value])
          }
        })
        // 给蜜罐加气泡
        toCoord.push({
          value: item[0][0]['attackGeo'].concat([170, item[0][0]['count']])
        })
        // 配置series
        series.push({
          name: item[0][0]['name'],
          type: 'lines',
          tooltip: {
            formatter: (params) => {
              return params.data.fromName + ': ' + params.data.ip
            }
          },
          zlevel: 2,
          effect: {
            show: true,
            period: 4,
            trailLength: 0.1,
            symbol: 'arrow',
            color: '',
            symbolSize: 3
          },
          lineStyle: {
            normal: {
              color: (obj) => { // 个性化攻击颜色
                if (obj.data.val < 2) { return lineColor[4] }
                if (obj.data.val < 4 && obj.data.val >= 2) { return lineColor[3] }
                if (obj.data.val < 6 && obj.data.val >= 4) { return lineColor[2] }
                if (obj.data.val < 9 && obj.data.val >= 6) { return lineColor[1] }
                if (obj.data.val >= 9) { return lineColor[0] }
              },
              width: 1,
              opacity: 0.1,
              curveness: 0.5
            }
          },
          data: _this.convertData(item)
        },
        {
          name: item[0][0]['name'],
          type: 'effectScatter',
          coordinateSystem: 'geo',
          zlevel: 2,
          tooltip: {
            formatter: (params) => {
              return params.seriesName + ': ' + params.value[3]
            }
          },
          showEffectOn: 'render',
          animation: false,
          rippleEffect: {
            brushType: 'stroke',
            period: 10
          },
          symbolSize: function (val) {
            if (val[2] === 170) {
              return val[2] / 8
            } else {
              return 0
            }
          },
          itemStyle: {
            normal: {
              color: '#ed4956',
              opacity: '0.2'
            }
          },
          data: toCoord
        })
      })
      let option = {
        legend: {
          textStyle: {
            color: '#fff'
          },
          orient: 'vertical',
          x: 'left',
          top: 'middle',
          left: '40',
          data: legendArr
        },
        tooltip: {
          trigger: 'item'
        },
        geo: {
          map: 'world',
          showEffectOn: 'render',
          roam: false,
          zoom: 1,
          itemStyle: {
            normal: {
              areaColor: 'rgba(3, 177, 134, 0.8)',
              borderColor: 'rgba(3, 177, 134, 0.2)'
            },
            emphasis: {
              areaColor: 'rgba(3, 177, 134, 0.8)'
            }
          }
        },
        series: series
      }
      this.myChart.setOption(option)
      window.addEventListener('resize', function () {
        if (this.$route.path === '/Main') {
          this.myChart.resize()
        }
      }.bind(this))
    },
    convertData (data) {
      var res = []
      for (var i = 0; i < data.length; i++) {
        var dataItem = data[i]
        var fromCoord = [dataItem[1].longitude, dataItem[1].latitude]
        var toCoord = dataItem[0].attackGeo
        if (fromCoord && toCoord) {
          res.push({
            fromName: dataItem[1].name,
            toName: dataItem[0].name,
            coords: [fromCoord, toCoord],
            val: dataItem[1].value,
            ip: dataItem[1].ip
          })
        }
      }
      return res
    }
  },
  mounted () {
    this.myChart = this.$echarts.init(document.getElementById('MapView'))
  }
}
</script>
<style>
  .MapView{
    width: 100%;
    height: 90%;
    box-sizing: border-box;
    padding-top: 3%;
  }
  #MapView {
    width: 100%;
    height: 100%;
  }
</style>
