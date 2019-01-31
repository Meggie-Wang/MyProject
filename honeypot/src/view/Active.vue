<template>
  <div class="active-container">
    <div class="active_top">
      <div class="active_nav">
        <router-link to="/"><img src="../assets/img/logo.png"></router-link>
        <span>Roarpanda用户服务条款</span>
      </div>
    </div>
    <div class="active_body">
      <div class="imgTips"><img src="../assets/img/email_success.png" v-if="isSuccess"></div>
      <div class="imgTips"><img src="../assets/img/email_fail.png" v-if="isFail"></div>
      <p>{{ message }}</p>
      <p v-if="isSuccess">页面将在{{time}}秒后跳转到登录页面...</p>
      <p v-if="isSuccess">如未跳转，请<router-link to='/'>点击这里</router-link></p>
      <p v-if="isFail">请到个人中心重新激活邮箱！点击进入<router-link to='/'>登录页</router-link></p>
    </div>
  </div>
</template>
<script>
import api from '@/api/api'
export default {
  data () {
    return {
      message: '',
      time: 5,
      timer: {},
      isSuccess: false,
      isFail: false
    }
  },
  mounted () {
    api.getEamilActive(this.$route.query.para).then(res => {
      this.message = res.data.message
      if (res.data.status === 1) {
        this.timer = setInterval(() => {
          this.time -= 1
          if (this.time <= 0) {
            this.$router.push({path: '/'})
          }
        }, 1000)
        this.isSuccess = true
      } else {
        this.isFail = true
      }
    })
  },
  beforeRouteLeave (to, from, next) {
    clearInterval(this.timer)
    next()
  }
}
</script>
<style scoped>
  .active-container {
    color: #169275;
  }
  .active_top {
    padding: 5rem 10rem 1rem;
    border-bottom: 1px solid #ccc;
  }
  .active_nav {
    display: flex;
    align-items: center;
    width: 70%;
    margin: 0 auto;
  }
  .active_nav a {
    text-align: center;
  }
  .active_nav a img {
    width: 60%;
  }
  .active_nav span {
    border-left: 1px solid #ccc;
    padding-left: 20px;
    font-size: 18px;
  }
  .active_body {
    width: 50%;
    margin: 10% auto;
    border: 1px solid #ccc;
    background: #F2FEE6;
  }
  .imgTips {
    width: 100%;
    text-align: center;
  }
  .active_body p {
    font-size: 14px;
    line-height: 40px;
    text-align: center;
  }
  .active_body p:first-of-type {
    font-size: 15px;
    font-weight: bold;
  }
  .active_body p > a {
    text-decoration: underline;
  }
</style>
