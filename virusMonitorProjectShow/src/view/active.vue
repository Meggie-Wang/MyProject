<style scoped>
  .active_container {
    color: #555555;
  }
  .active_top {
    border-bottom: 1px solid #ccc;
    height: 90px;
  }
  .active_nav {
    width: 80%;
    display: block;
    margin: 40px auto 0;
    position: relative;
  }
  .active_nav_logo {
    position: absolute;
    top: 30px;
    left: 10%;
  }
  .active_nav_logo a > img {
    border-right: 1px solid #ccc;
    padding-right: 20px;
    float: left;
  }
  .active_nav_logo span {
    font-size: 18px;
    color: #169275;
    margin: 8px auto auto 20px;
    float: right;
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
<template>
  <div class="active_container">
    <div class="active_top">
      <div class="active_nav">
        <div class="active_nav_logo">
          <router-link to="/"><img src="../../static/img/logo.png"></router-link>
          <span>Roarpanda用户服务条款</span>
        </div>
      </div>
    </div>
    <div class="active_body">
      <div class="imgTips"><img src="../../static/img/email_success.png" v-if="isSuccess"></div>
      <div class="imgTips"><img src="../../static/img/email_fail.png" v-if="isFail"></div>
      <p>{{ message }}</p>
      <p v-if="isSuccess">页面将在{{time}}秒后跳转到登录页面...</p>
      <p v-if="isSuccess">如未跳转，请<router-link to='/login'>点击这里</router-link></p>
      <p v-if="isFail">请到个人中心重新激活邮箱！点击进入<router-link to='/login'>登录页</router-link></p>
    </div>
  </div>
</template>
<script>
import api from '../api/ipApi'
export default {
  data() {
    return {
      message: '',
      time: 5,
      timer: {},
      isSuccess: false,
      isFail: false
    }
  },
  mounted() {
    api.getEamilActive(this.$route.query.para).then(res => {
      this.message = res.data.message
      if (res.data.status === 1) {
        this.timer = setInterval(() => {
          this.time -= 1
          if (this.time <= 0) {
            this.$router.push({path: '/login'})
          }
        }, 1000)
        this.isSuccess = true
      } else {
        this.isFail = true
      }
    })
  },
  beforeRouteLeave(to, from, next) {
    clearInterval(this.timer)
    next()
  }
}
</script>