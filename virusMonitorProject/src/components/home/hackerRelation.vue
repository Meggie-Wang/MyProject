<!-- 层叠柱状图 -->
<style lang="stylus" scoped>
  .hackerRelation {
    background: url('../../../static/img/dashboard/frame.png') no-repeat;
    background-size: 100% 100%;
  }
  .main{
    width: 70%;
    height: 76%;
    margin-left: 15%;
    margin-top: 3.5%;
  }
  .active .main{
    width: 70%;
    margin-top: 1.4%;
  }
</style>

<template>
  <div class="hackerRelation">
    <v-header :name="$t('messages.dashboard.hackerTrack')" :legendArr="legendArr" :myChart="myChart"></v-header>
    <div class="main"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import header from 'components/header/header'
import api from '../../api/ipApi'

export default {
  data() {
    return {
      legendArr: [],
      myChart: {},
      timer: {}
    }
  },
  props: ['styleActive', 'winResize'],
  components: {
    'v-header': header
  },
  mounted() {
    api.formatData().then((res) => {
      var chartData = res.data.hacker_tracking.nodes;
      var linkData = res.data.hacker_tracking.edges;
      var dataResult = [];
      var lineResult = [];
      chartData.forEach(function(ele) {
        var dataArr = {};
        dataArr.name = ele.id;
        dataArr.category = ele.type;
        dataArr.x = ele.x;
        dataArr.y = ele.y;
        dataArr.symbolSize = ele.size;
        dataArr.symbol = ele.image;
        dataArr.display = ele.display;
        dataResult.push(dataArr);
      });
      linkData.forEach(function(ele) {
        var lineArr = {};
        lineArr.source = ele.from;
        lineArr.target = ele.to;
        lineResult.push(lineArr);
      });
      this.myChart = echarts.init(document.querySelector('.hackerRelation .main'));
      var option = {
        tooltip: {
          formatter: function(params) {
            if (params.data.display) {
              var str = '<p>' + params.name + '</p>';
              str += '<p style="white-space:normal;word-break:break-all;word-wrap:break-word;max-width:400px;padding:10px;text-align: left">' + params.data.display + '</p>';
              return str;
            } else {
              return params.name;
            }
          },
          confine: true
        },
        animationDuration: 1000,
        animationEasingUpdate: 'quinticInOut',
        symbol: 'circle',
        series: [{
          type: 'graph',
          layout: 'force',
          force: {
            repulsion: 200,
            edgeLength: 50
          },
          data: dataResult,
          edges: lineResult,
          draggable: true,
          roam: true,
          label: {
            normal: {
              show: false,
              formatter: ''
            }
          },
          lineStyle: {
            normal: {
              color: '#fff'
            }
          }
        }]
      };
      this.myChart.setOption(option);
      // 组件20s刷新
      // this.timer = setInterval(() => {
      //   $('.main').css('height', '76%')
      //   $('.active .main').css('height', '76%')
      //   this.myChart.resize();
      // }, 20000);
      this.init()
    })
  },
  methods: {
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
      $('.main').css('height', '105%')
      $('.active .main').css('height', '55%')
      this.myChart.resize()
      $('.main').css('height', '')
    },
    winResize (val, old) {
      if (old) this.myChart.resize()
    }
  }
}
</script>