<template>
  <div class="mainPage">
    <Broadcast
    :wakeSwiper="wakeSwiper"/>
    <!-- <NewSwiper /> -->
    <MapView :winResize="winResize"/>
    <!-- <NewGlobe /> -->
    <MaliciousInvasion />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import MapView from '@/components/main/MapView'
// import NewGlobe from '@/components/main/NewGlobe'
import Broadcast from '@/components/main/Broadcast'
// import NewSwiper from '@/components/main/NewSwiper'
import MaliciousInvasion from '@/components/main/MaliciousInvasion'
export default{
  name: 'mainPage',
  data () {
    return {
      refreshMapAct: {},
      refreshAttackAct: {},
      winResize: 0,
      wakeSwiper: 0
    }
  },
  components: {
    MapView,
    // NewGlobe,
    Broadcast,
    // NewSwiper,
    MaliciousInvasion
  },
  computed: {
    ...mapGetters(['mapData'])
  },
  watch: {
    mapData () {
      clearInterval(this.refreshMapAct)
      this.refreshMapAct = setInterval(() => {
        this.mainDataAct()
      }, 1000 * 60)
    }
  },
  methods: {
    ...mapActions(['mainDataAct', 'attackType']),
    init () {
      this.mainDataAct()
      this.attackType()
    }
  },
  mounted () {
    this.init()
    // window.addEventListener('resize', () => {
    //   this.winResize = window.innerHeight + '/' + window.innerWidth
    // })
  },
  beforeRouteLeave (to, from, next) {
    clearInterval(this.refreshMapAct)
    clearInterval(this.refreshAttackAct)
    next()
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.winResize = window.innerHeight + '/' + window.innerWidth
      vm.wakeSwiper++
      /*
      * 主页数据定时刷新
      * braodcast 定时配合切掉‘漏斗’多余数据arr
      * 刷新时间间隔T = 60s
      * bradcast 时间间隔t = 6s
      * 漏斗数据 arrLength = T / t
      */
      vm.refreshAttackAct = setInterval(() => {
        vm.attackType()
      }, 1000 * 10)
    })
  }
}
</script>
<style scoped>
  .mainPage {
    position: relative;
    height: calc(100% - 5.5rem);
  }
</style>
