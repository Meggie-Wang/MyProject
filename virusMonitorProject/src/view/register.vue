<style scoped>
  .register {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    background: url('../../static/img/login_bg.jpg')  center center / cover no-repeat;
  }
  .register_container {
    width: 35%;
    margin: 0 auto;
    background: #fff;
    border-radius: 20px;
    box-shadow: 0 0 20px rgba(9, 9, 9, .6);
    overflow: hidden;
  }
  .register_body {
    width: 85%;
    margin: 0 auto;
  }
  .register_head {
    padding: 2% 0;
    text-align: center;
  }
  .register_head img {
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
  table > span {
    color: red;
    font-size: 12px;
  }
  td {
    position: relative;
  }
  .register_content input {
    width: 100%;
    height: 45px;
    line-height: 45px;
    border-radius: 5px;
    margin: 5% auto 0;
    outline: none;
    border: 1px solid #179075;
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
  td i {
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
  .email_icon {
    background: url('../../static/img/icon.png') -260px -104px no-repeat;
  }
  button {
    display: block;
    width: 100%;
    height: 50px;
    margin: 5% auto 0 auto;
    border: none;
    border-radius: 5px;
    background: #179075;
    color: #fff;
    cursor: pointer;
    font-size: 18px;
  }
  .register_container .isShow {
    display: block;
    color: red;
    font-size: 12px;
    text-align: center;
    margin: 5px auto;
  }
  .register_content > p {
    text-align: right;
  }
  label {
    display: inline-block;
    padding: 5% 0;
    color: #7B7B7B;
    user-select: none;
  }
  .end .selectTips {
    display: block;
    color: red;
    font-size: 14px;
    text-align: center;
    padding-bottom: 2%;
  }
  .register_content > p > a,
  .end a {
    color: #00A6FF;
  }
</style>
<template>
  <div class="register">
    <div class="register_container">
      <div class="register_body">
        <div class="register_head">
          <img src="../../static/img/logo.png">
        </div>
        <div class="register_content">
          <div class="languageBox">
            <i class="changeLanguage" @click="changeLanguage"></i>
          </div>
          <table>
            <tr>
              <td>
                <i class="user_icon"></i>
                <input
                  type="text"
                  :placeholder="$t('messages.register.enterUserName')"
                  maxLength="16"
                  minLength="6"
                  id="username"
                  @keyup.enter='register'
                  @focus="UserTips = ''">
              </td>
            </tr>
            <span>{{ UserTips }}</span>
            <tr>
              <td>
                <i class="password_icon"></i>
                <input
                  type="password"
                  :placeholder="$t('messages.register.enterPwd')"
                  maxLength="18"
                  minLength="8"
                  id="passwordOne"
                  @keyup.enter='register'
                  @focus="PassTipsOne = ''">
              </td>
            </tr>
            <span>{{ PassTipsOne }}</span>
            <tr>
              <td>
                <i class="password_icon"></i>
                <input
                  type="password"
                  :placeholder="$t('messages.register.confirmPwd')"
                  maxLength="18"
                  minLength="8"
                  id="passwordTwo"
                  @keyup.enter='register'
                  @focus="PassTipsTwo = ''">
              </td>
            </tr>
            <span>{{ PassTipsTwo }}</span>
            <tr>
              <td>
                <i class="email_icon"></i>
                <input
                  type="text"
                  :placeholder="$t('messages.register.enterEmail')"
                  id="email"
                  @keyup.enter='register'
                  @focus="EmailTips = ''">
              </td>
            </tr>
            <span>{{ EmailTips }}</span>
          </table>
          <button @click='register'>{{ $t('messages.register.register') }}</button>
          <span class="isShow">{{ message }}</span>
          <p>{{ $t('messages.register.accountNum') }}<router-link to="/login">{{ $t('messages.login.loginNow') }}</router-link></p>
        </div>
        <div class="end">
          <span>
            <label>
            <input type="checkbox" v-model="CheckStrategy" @click="doCheckStrategy($event)">&emsp;{{ $t('messages.register.agree') }}<router-link to="/userService" target="_blank">{{ $t('messages.register.clause') }}</router-link>{{ $t('messages.register.and') }}<router-link to="/userPolicy" target="_blank">{{ $t('messages.register.strategy') }}</router-link>
          </label>
          </span>
          <span class="selectTips" v-if="!CheckStrategy">{{ $t('messages.register.checkOut') }}“{{ $t('messages.register.clause') }}”！</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import api from '../api/ipApi'
export default {
  name: 'register',
  data() {
    return {
      CheckStrategy: true,
      UserTips: '',
      PassTipsOne: '',
      PassTipsTwo: '',
      EmailTips: '',
      message: ''
    }
  },
  methods: {
    ...mapMutations(['setLang']),
    // sha256加密
    setSha(value) {
      let sha256 = require("js-sha256").sha256
      return sha256(value)
    },
    changeLanguage () {
      $('.changeLanguage').toggleClass('active')
      let lang = this.$i18n.locale === 'zh' ? 'en' : 'zh'
      this.$i18n.locale = lang
      this.setLang()
    },
    doCheckStrategy(event) {
      this.CheckStrategy = !this.CheckStrategy
    },
    isCheckUser (para) {
      if (/^[a-zA-Z0-9][\w@-]{5,16}$/.test(para)) {
        return true
      } else {
        return false
      }
    },
    isCheckPass (para) {
      if (/^[\w@-]{8,18}$/.test(para)) {
        return true
      } else {
        return false
      }
    },
    IsEmail(str) {
      var reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
      return reg.test(str)
    },
    register () {
      var username = $('#username').val()
      var passwordOne = $('#passwordOne').val()
      var passwordTwo = $('#passwordTwo').val()
      var email = $('#email').val()
      if (username === '') {
        this.UserTips = this.$t('messages.register.userNameEmpty')
      } else {
        this.UserTips = ''
      }
      if (passwordOne === '') {
        this.PassTipsOne = this.$t('messages.register.pwdEmpty')
      } else {
        this.PassTipsOne = ''
      }
      if (passwordTwo === '') {
        this.PassTipsTwo = this.$t('messages.register.confirmPwdEmpty')
      } else {
        this.PassTipsTwo = ''
      }
      if (email === '') {
        this.EmailTips = this.$t('messages.register.emailEmpty')
      } else {
        this.EmailTips = ''
      }
      var that = this
      if (username !== '' && email !== '' && passwordOne !== '' && passwordTwo !== '') {
        if (!that.IsEmail(email)) {
          this.EmailTips = this.$t('messages.register.enterCorrectEmail')
        }
        if (!that.isCheckUser(username)) {
          this.UserTips = this.$t('messages.register.userNameTip')
        }
        if (!that.isCheckPass(passwordOne)) {
          this.PassTipsOne = this.$t('messages.register.pwdTip')
        } else {
          if (passwordOne !== passwordTwo) {
            this.PassTipsTwo = this.$t('messages.register.diffPwd')
          }
        }
        if (that.isCheckUser(username) && that.isCheckPass(passwordOne) && that.IsEmail(email) && passwordOne === passwordTwo) {
          var shaPassword = that.setSha(passwordOne)
          that.data = {'username': username, 'password': shaPassword, 'email': email}
          if (that.CheckStrategy) {
            api.postRegister(that.data).then(function (response) {
              switch (response.data.status) {
                case 1:
                  that.$message({
                    message: that.$t('messages.register.succeRegister'),
                    type: 'success'
                  })
                  that.$router.push({path: '/login', query: {username: username}})
                  break
                case 21:
                  that.message = that.$t('messages.register.regTipOne')
                  break
                case 22:
                  that.message = that.$t('messages.register.regTipTwo')
                  break
                case 23:
                  that.message = that.$t('messages.register.regTipThree')
                  break
                case 24:
                  that.message = that.$t('messages.register.regTipFour')
                  break
                case 25:
                  that.message = that.$t('messages.register.regTipFive')
                  break
                case 26:
                  that.message = that.$t('messages.register.regTipSix')
                  break
              }
            })
          }
        }
      }
    }
  },
  mounted () {
    if (localStorage.locale === 'en') {
      $('.changeLanguage').addClass('active')
    } else if (localStorage.locale === 'zh') {
      $('.changeLanguage').removeClass('active')
    }
  }
}
</script>