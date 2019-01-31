<template>
  <div
  id="app"
  v-if="showApp"
  :style="{
    'background': $route.meta.isBackground ? 'url(' + mainBg + ') center center / cover no-repeat' : '#fff',
    'overflow': $route.meta.isBackground ? 'hidden' : 'auto',
    'height': $common.printConHeight($route)
  }">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      showApp: false,
      mainBg: ''
    }
  },
  mounted () {
    let backImg = new Image()
    backImg.src = this.mainBg = this.$img.mainBg
    backImg.onload = () => {
      this.showApp = true
    }
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
