<template>
  <div class="mainPage">
    <div class="charts">
      <div class="left-charts">
        <HackerList />
        <WordList :winResize="winResize" :echartTitle="'威胁类型热度'" :myChartData="wordList" :sizeRange="worldSizeRange"/>
        <Pie2 :winResize="winResize" :echartTitle="'基因家族分类'" :myChartData="geneFamily" />
      </div>
      <div class="right-charts">
        <Point :winResize="winResize" :echartTitle="'威胁来源全球地理分布态势'" :myChartData="point" pointSize="6" pointRange="10"/>
        <Bar :winResize="winResize" :echartTitle="'威胁源国家统计'" :myChartData="point" echartTitleColor="#c2d3fc" lableColor="#fff"/>
        <myLine
        :winResize="winResize"
        :echartTitle="['当日分析结果统计']"
        :myChartData="sampleAnalysis"
        echartTitleColor="#fff"
        :topBarData="sampleDetection" />
        <Pie :winResize="winResize" :echartTitle="'威胁数据总量'" :myChartData="threatData" echartTitleColor="#c2d3fc" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default{
  name: 'mainPage',
  data () {
    return {
      winResize: 0,
      worldSizeRange: [18, 30],
      timer: {},
      timers: {}
    }
  },
  computed: {
    ...mapGetters(['wordList', 'geneFamily', 'point', 'sampleDetection', 'sampleAnalysis', 'threatData'])
  },
  watch: {
    sampleAnalysis (val) {
      let date = []
      val.create_time.forEach((i) => {
        date.push(i.split(' ')[1].split(':')[0] + ':' + i.split(' ')[1].split(':')[1])
      })
      val.create_time = date
    }
  },
  mounted () {
    // 为了防止sibebar卡顿，使得加载数据在0.5（sidebar运行时间）后执行
    setTimeout(() => {
      this.$store.dispatch('getWordList')
      this.$store.dispatch('getGeneFamily')
      this.$store.dispatch('getPoint')
      this.$store.dispatch('getSampleDetection')
      this.$store.dispatch('getSampleAnalysis')
      this.$store.dispatch('getThreat')
      this.timer = setInterval(() => {
        this.$store.dispatch('getSampleDetection')
      }, 10000)
      this.timers = setInterval(() => {
        this.$store.dispatch('getSampleAnalysis')
      }, 1000 * 20)
    }, 500)
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.winResize = window.innerHeight + '/' + window.innerWidth
    })
  },
  beforeRouteLeave (to, from, next) {
    clearInterval(this.timer)
    clearInterval(this.timers)
    next()
  },
  // 由于上一步概率出现定时器清除失败问题，若未成功清除则再清除一次
  beforeDestroy () {
    if (this.timer) {
      clearInterval(this.timer)
    }
    if (this.timers) {
      clearInterval(this.timers)
    }
  }
}
</script>
<style scoped>
  .charts {
    display: flex;
    justify-content: space-between;
    width: 95%;
    height: 100%;
    margin: 0 auto;
  }
  .left-charts {
    width: 25%;
    box-sizing: border-box;
  }
  .right-charts {
    width: 75%;
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    /*gtd pie组件不知为何在ie11下换行了，加了box-sinzing border*/
    border: 1px solid transparent;
  }
  .left-charts > div, .right-charts > div {
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
  }
</style>
