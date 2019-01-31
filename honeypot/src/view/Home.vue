<template>
  <div id="home">
    <Header />
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import Header from '@/components/home/Header'
export default{
  name: 'home',
  data () {
    return {}
  },
  components: {
    Header
  }
}
</script>
