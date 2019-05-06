<template>
  <div
    id="app"
    v-if="showApp"
    :style="{
      'background': $route.name === 'Login' ? 'url(' + loginBg + ') center center / cover no-repeat' : 'url(' + mainBg + ') center center / cover no-repeat',
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
      loginBg: '',
      mainBg: ''
    }
  },
  mounted () {
    let backImg = new Image()
    backImg.src = this.loginBg = this.$img.loginBg
    backImg.src = this.mainBg = this.$img.mainBg
    backImg.onload = () => {
      this.showApp = true
    }
  }
}
</script>

<style>
#app {
  height: 100%;
  overflow: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
