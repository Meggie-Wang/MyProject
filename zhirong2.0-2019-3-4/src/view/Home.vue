<template>
  <div id="home">
    <Sidebar/>
    <myHeader :title="$route.meta.title" />
    <keep-alive>
      <router-view
      v-if="$route.meta.keepAlive"
      class="home-router"
      :style="{'overflow-y': $route.meta.isBackground ? '' : 'auto'}"></router-view>
    </keep-alive>
    <router-view
    v-if="!$route.meta.keepAlive"
    class="home-router"
    :style="{'overflow-y': $route.meta.isBackground || $common.homePrintConOverflowY($route) ? '' : 'auto'}"></router-view>
  </div>
</template>

<script>
export default{
  name: 'home',
  data () {
    return {
    }
  }
}
</script>
<style scoped>
  .home-router {
    height: calc(100% - 80px);
  }
</style>
