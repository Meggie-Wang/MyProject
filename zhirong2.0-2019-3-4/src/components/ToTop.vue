<template>
  <div class="toTop" v-if="toTopFixed" @click="toTop"></div>
</template>
<script>
export default {
  data () {
    return {
      toTopFixed: false
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll () {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop >= 600) {
        this.toTopFixed = true
      } else {
        this.toTopFixed = false
      }
    },
    toTop () {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    }
  }
}
</script>
<style scoped>
  .toTop {
    position: fixed;
    right: 3%;
    bottom: 5%;
    background: red;
    background: url('../assets/img/top.png') center center / 100% 100% no-repeat;
    width: 50px;
    height: 50px;
    cursor: pointer;
  }
</style>
