<template>
  <div id="home">
    <el-header />
    <keep-alive>
      <router-view
        v-if="$route.meta.keepAlive"
        class="home-router"></router-view>
    </keep-alive>
    <router-view
      v-if="!$route.meta.keepAlive"
      class="home-router"></router-view>
    <!-- <GeneGroupChart style="width: 80%; height: calc(100% - 3rem); margin: 0 auto;"/> -->
  </div>
</template>

<script>
import GeneGroupChart from '@/components/GeneGroupChart'
export default{
  name: 'home',
  data () {
    return {}
  },
  components: {
    GeneGroupChart
  }
}
</script>
<style scoped>
  .home-router {
    height: calc(100% - 3rem);
    margin: 0 auto;
    box-sizing: border-box;
    padding: 0.5rem 10%;
    overflow-y: auto;
  }
</style>
