<style scoped>
  .login {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    background: url('../../static/img/login_bg.jpg')  center center / cover no-repeat;
  }
  .login_container {
    width: 35%;
    margin: 0 auto;
    background: #fff;
    border-radius: 20px;
    box-shadow: 0 0 20px rgba(9, 9, 9, .6);
    overflow: hidden;
  }
  .login_body {
    width: 85%;
    margin: 0 auto;
  }
  .login_head {
    padding: 2% 0;
    text-align: center;
  }
  .login_head img {
    width: 50%;
    margin: 5%;
  }
  .languageBox {
    text-align: right;
  }
  .changeLanguage {
    display: inline-block;
    width: 30px;
    height: 30px;
    background: url('../../static/img/icon.png') -97px -149px no-repeat;
    cursor: pointer;
  }
  .changeLanguage.active {
    background: url('../../static/img/icon.png') -48px -149px no-repeat;
  }
  table {
    width: 100%;
  }
  td {
    position: relative;
  }
  .login_content input {
    width: 100%;
    height: 45px;
    line-height: 45px;
    margin: 5% auto 0;
    outline: none;
    border: 1px solid #179075;
    border-radius: 5px;
    text-indent: 40px;
    font-size: 14px;
  }
  input::-webkit-input-placeholder {
    color: #989898 !important;
  }
  /*去除IE下输入框右侧图标*/
  input::-ms-clear, input::-ms-reveal {
    display: none;
  }
  td > i {
    position: absolute;
    left: 3%;
    top: 55%;
    width: 16px;
    height: 14px;
  }
  .user_icon {
    background: url('../../static/img/icon.png') -2px -157px no-repeat;
  }
  .password_icon {
    background: url('../../static/img/icon.png') -2px -106px no-repeat;
  }
  button {
    display: block;
    width: 100%;
    height: 50px;
    margin: 2% auto;
    border: none;
    border-radius: 5px;
    background: #179075;
    color: #fff;
    cursor: pointer;
    font-size: 18px;
  }
  label {
    display: inline-block;
    padding: 5% 0;
    color: #7B7B7B;
    user-select: none;
  }
  .login_container .isShow {
    text-align: center;
    color: red;
    font-size: 13px;
    margin: 5px auto;
  }
  .guest {
    text-align: right;
  }
  .guest > span {
    color: #989898;
    font-size: 16px;
    cursor: pointer;
  }
  .end {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .end > span {
    color: #989898;
    flex: 1;
  }
  .end > span a {
    color: #00A6FF;
  }
  .end > span:last-of-type {
    text-align: right;
  }
</style>
<template>
  <div class="login">
    <div class="login_container">
      <div class="login_body">
        <div class="login_head">
          <img src="../../static/img/logo.png">
        </div>
        <div class="login_content">
          <div class="languageBox">
            <i class="changeLanguage" @click="changeLanguage"></i>
          </div>
          <table>
            <tr>
              <td>
                <i class="user_icon"></i>
                <input type="text" :placeholder="$t('messages.register.enterUserName')" id="user" maxlength="16" @keyup.enter="submit">
              </td>
            </tr>
            <tr>
              <td>
                <i class="password_icon"></i>
                <input type="password" autocomplete="new-password" :placeholder="$t('messages.register.enterPwd')" id="password" maxlength="18" @keyup.enter="submit">
              </td>
            </tr>
          </table>
        </div>
        <span class="isShow" v-if='isLogin'>{{ $t('messages.login.pleaseLogin') }}</span>
        <button @click='submit'>
          <span v-if="!login">
            <span>{{ $t('messages.login.login') }}</span>
          </span>
          <span v-if="login"><i class="el-icon-loading"></i>{{ $t('messages.login.logged') }}</span>
        </button>
        <div class="guest">
          <span @click="guestLogin">{{ $t('messages.login.guest') }}</span>
        </div>
        <div class="end">
          <span>
            <label>
              <input type="checkbox" v-model="rememberPassword" @click="doRemeberPassword($event)">&emsp;{{ $t('messages.login.rememberPwd') }}
            </label>
          </span>
          <span>
            {{ $t('messages.login.noAccountNum') }}
            <router-link to="/register">{{ $t('messages.register.register') }}</router-link>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import api from '../api/ipApi'
export default {
  name: 'login',
  data() {
    return {
      data: [],
      rememberPassword: api.getCookie('rememberPassword') !== null ? Number(api.getCookie('rememberPassword')) : 1,
      csrfmiddlewaretoken: '{{ csrf_token }}',
      isLogin: false,
      login: false
    }
  },
  mounted() {
    api.setCookie('rememberPassword', this.rememberPassword)
    if (localStorage.locale === 'en') {
      $('.changeLanguage').addClass('active')
    } else if (localStorage.locale === 'zh') {
      $('.changeLanguage').removeClass('active')
    }
    this.isLogin = this.$route.query.isLogin
    if (this.$route.query.username) {
      document.getElementById('user').value = this.$route.query.username
    } else if (localStorage.hasOwnProperty('userData')) {
      this.data = JSON.parse(localStorage.userData)
      document.getElementById('user').value = this.data.username
      if (this.data.password.length === 64) {
        document.getElementById('password').value = this.data.password.substr(0, 18)
      }
    }
    this.enterKeyAct()
  },
  methods: {
    ...mapMutations(['setLang']),
    doRemeberPassword(event) {
      // 把记住密码状态存入cookie
      if (Number(api.getCookie('rememberPassword')) === 1) {
        this.rememberPassword = 0
        api.setCookie('rememberPassword', this.rememberPassword)
      } else {
        this.rememberPassword = 1
        api.setCookie('rememberPassword', this.rememberPassword)
      }
    },
    // 用户名正则
    isCheckUser (para) {
      if (/^[a-zA-Z0-9][\w@-]{5,16}$/.test(para)) {
        return true
      } else {
        return false
      }
    },
    // 密码正则
    isCheckPass (para) {
      if (/^[\w@-]{8,18}$/.test(para)) {
        return true
      } else {
        return false
      }
    },
    // sha256加密
    setSha(value) {
      let sha256 = require("js-sha256").sha256
      return sha256(value)
    },
    guestLogin () {
      this.$message({
        message: '功能维护，暂不开放！',
        type: 'warning'
      })
      // api.getGuest().then(res => {
      //   var that = this
      //   if (res.data.status === 1) {
      //     var userLoginData = res.data.data
      //     localStorage.setItem('userLoginData', JSON.stringify(userLoginData))
      //     api.setCookie('token_virus', res.data.token, 1)
      //     that.$router.replace('/dashboard')
      //   }
      // })
    },
    submit () {
      var that = this
      var user = $('#user').val()
      var password = $('#password').val()
      if (that.isCheckUser(user)) {
        if (localStorage.hasOwnProperty('userData')) {
          if (that.data.password.length === 64) {
            if (that.data.password.search(password) === 0) {
              that.data = {'username': user, 'password': that.data.password}
              that.postLogin(that.data)
            } else {
              if (that.isCheckPass(password)) {
                var shaPassword = that.setSha(password)
                that.data = {'username': user, 'password': shaPassword}
                that.postLogin(that.data)
              } else {
                that.$message({
                  message: that.$t('messages.register.regTipThree'),
                  type: 'warning'
                })
              }
            }
          } else {
            if (that.isCheckPass(password)) {
              shaPassword = that.setSha(password)
              that.data = {'username': user, 'password': shaPassword}
              that.postLogin(that.data)
            } else {
              that.$message({
                message: that.$t('messages.register.regTipThree'),
                type: 'warning'
              })
            }
          }
        } else {
          if (that.isCheckPass(password)) {
            shaPassword = that.setSha(password)
            that.data = {'username': user, 'password': shaPassword}
            that.postLogin(that.data)
          } else {
            that.$message({
              message: that.$t('messages.register.regTipThree'),
              type: 'warning'
            })
          }
        }
      } else {
        that.$message({
          message: that.$t('messages.register.regTipTwo'),
          type: 'warning'
        })
      }
    },
    postLogin(data) {
      var that = this
      that.login = !that.login
      api.postLogin(data).then(function (response) {
        that.login = false
        switch (response.data.status) {
          case 1:
            var userLoginData = response.data.data
            localStorage.setItem('userLoginData', JSON.stringify(userLoginData))
            api.setCookie('token_virus', response.data.token, 1)
            if (that.rememberPassword) {
              localStorage.setItem('userData', JSON.stringify(data))
              data = JSON.parse(localStorage.userData)
            }
            if (!that.rememberPassword) {
              localStorage.removeItem("userData")
            }
            that.$router.push({path: '/dashboard'})
            break
          case 21:
            that.$message({
              message: that.$t('messages.register.regTipTwo'),
              type: 'warning'
            })
            break
          case 22:
            that.$message({
              message: that.$t('messages.register.regTipThree'),
              type: 'warning'
            })
            break
          case 23:
            that.$message({
              message: that.$t('messages.register.regTipOne'),
              type: 'warning'
            })
            break
          case 24:
            that.$message({
              message: that.$t('messages.login.loginTip'),
              type: 'warning'
            })
            break
          case 27:
            that.$message({
              message: that.$t('messages.login.loginTipOne'),
              type: 'warning'
            })
            break
          case 28:
            that.$message({
              message: that.$t('messages.login.loginTipTwo'),
              type: 'warning'
            })
            break
        }
      })
    },
    enterKeyAct() {
      document.querySelector('body').onkeydown = () => {
        if (window.event.keyCode === 13 && location.href.split('#')[1] === '/') {
          this.submit()
        }
      }
    },
    changeLanguage () {
      $('.changeLanguage').toggleClass('active')
      let lang = this.$i18n.locale === 'zh' ? 'en' : 'zh'
      this.$i18n.locale = lang
      this.setLang()
    }
  }
}
</script>