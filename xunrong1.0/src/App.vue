<template>
  <div id="app" :style="{backgroundImage: 'url(' + backImgo + ')'}">
    <router-view v-if="showApp"/>
  </div>
</template>

<script>
import bgimg from '@/assets/img/bgimg.png'
export default {
  name: 'App',
  data () {
    return {
      backImgo: {},
      showApp: false
    }
  },
  mounted () {
    let backImg = new Image()
    backImg.src = bgimg
    backImg.onload = () => {
      this.backImgo = bgimg
      this.showApp = true
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
