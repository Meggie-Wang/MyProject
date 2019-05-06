<template>
  <div class="mainPage">
    <div class="swiper">
      <HackerList :listData="detectionResult" :winResize="winResize"/>
    </div>
    <div class="charts">
      <Pie :winResize="winResize" :myChartData="geneFamily" />
      <Point :winResize="winResize" :myChartData="point" />
      <myLine
        :winResize="winResize"
        :myChartData="sampleAnalysis"
        :topBarData="sampleDetection" />
    </div>
    <!-- attackType -->
    <div
      v-if="Object.getOwnPropertyNames(attackTypeData).length"
      id="attack-type"
      class="attack-type MaliciousInvasion_view">
      <div class="MaliciousInvasion_title">
        <span>当日恶意样本总量</span>
      </div>
      <ul>
        <li v-for="(attackType, index) in attackTypeData.lines" :key="index">
          <div>
            <span>
              <i icon></i>
              <span>{{ attackType.name }}</span>
            </span>
            <p>{{ attackType.value }}</p>
          </div>
        </li>
        <li>
          <div>
            <p>{{ attackTypeData.nonmaliciously_amount || 0 }}</p>
          </div>
        </li>
      </ul>
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
      timer: {}
    }
  },
  computed: {
    ...mapGetters(['detectionResult', 'geneFamily', 'point', 'sampleAnalysis', 'sampleDetection', 'attackTypeData'])
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
      this.$store.dispatch('getDetectionResult', 1)
      this.$store.dispatch('getGeneFamily')
      this.$store.dispatch('getPoint')
      this.$store.dispatch('getSampleAnalysis')
      this.$store.dispatch('getSampleDetection')
      this.$store.dispatch('getAttackType')
      this.timer = setInterval(() => {
        this.$store.dispatch('getSampleDetection')
        this.$store.dispatch('getSampleAnalysis')
        this.$store.dispatch('getAttackType')
      }, 1000 * 20)
    }, 500)
    window.addEventListener('resize', () => {
      this.winResize = window.innerHeight + '/' + window.innerWidth
    })
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.winResize = window.innerHeight + '/' + window.innerWidth
    })
  },
  beforeRouteLeave (to, from, next) {
    clearInterval(this.timer)
    next()
  }
}
</script>
<style scoped>
  .mainPage {
    width: calc(100% - 40px);
    margin: 0 auto;
  }
  .swiper {
    height: 20%;
    overflow: hidden;
    padding: 1% 0;
    box-sizing: border-box;
  }
  .charts {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 63%;
    margin: 0 auto;
  }
  .attack-type {
    position: relative;
    width: 100%;
    height: calc(17% - 20px);
    /*max-height: 8rem;*/
    font-size: 1vh;
  }
  .MaliciousInvasion_title {
    position: absolute;
    top: -30%;
    right: 0;
  }
  .MaliciousInvasion_title span {
    color: #fff;
    font-size: 1rem;
  }
  .MaliciousInvasion_view ul {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    background: rgba(58, 83, 126, .8);
    margin:0;
    padding:0;
    box-sizing: border-box;
    border-top: 10px solid #4e6ea6;
    font-size: 2em;
  }
  .MaliciousInvasion_view ul li {
    flex: 1;
    border: 5px solid transparent;
    border-image-source: url('../../../assets/img/line.png');
    border-image-slice: 0 100% 0 0;
    border-image-repeat: stretch;
    white-space: nowrap;
  }
  .MaliciousInvasion_view ul li:last-of-type {
    flex: 1;
    text-align: center;
    border: 5px solid transparent;
  }
  .MaliciousInvasion_view ul li > div {
    width: 100%;
    height: 100%;
    color: #fff;
    box-sizing: border-box;
    padding: .5em .2em;
  }
  .MaliciousInvasion_view ul li > div p {
    height: calc(100% - 20px);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    font-size: 3em;
    font-weight: bold;
    text-shadow: 2px 2px 10px #000;
    text-align: center;
  }
  .MaliciousInvasion_view ul li > div > span {
    font-size: 1rem;
  }
  .MaliciousInvasion_view ul li > div > span span {
    font-size: 0.8em;
  }
  .MaliciousInvasion_view ul li > div span i {
    display: inline-block;
    width: 1em;
    height: 1em;
    background: url(../../../assets/img/safetyMarking.png) center center / cover no-repeat;
    vertical-align: middle;
  }
  .MaliciousInvasion_view ul li:last-child div {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
  }
</style>
