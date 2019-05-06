<template>
  <div class="register">
    <div class="register_container">
      <div class="register_head">
        <img :src="logoChange === 'zh' ? zhLogo : enLogo">
      </div>
      <div class="register_content">
        <!-- <div class="languageBox">
          <i class="changeLanguage handCursor" @click="changeLanguage"></i>
        </div> -->
        <table>
          <tr>
            <td>
              <i class="user_icon"></i>
              <input
                type="text"
                :placeholder="$t('messages.register.enterUserName')"
                maxlength="12"
                id="username"
                v-model="userName"
                @keyup.enter="register"
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
                maxlength="18"
                id="passwordOne"
                v-model="passwordOne"
                @keyup.enter="register"
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
                maxlength="18"
                id="passwordTwo"
                v-model="passwordTwo"
                @keyup.enter="register"
                @focus="PassTipsTwo = ''">
            </td>
          </tr>
          <span>{{ PassTipsTwo }}</span>
          <tr>
            <td>
              <i class="email_icon"></i>
              <input type="text" :placeholder="$t('messages.register.enterEmail')" id="email" v-model="email" @keyup.enter="register" @focus="EmailTips = ''">
            </td>
          </tr>
          <span>{{ EmailTips }}</span>
        </table>
        <button id="receive" @click='register'>{{ $t('messages.register.register') }}</button>
        <span style="text-align:center;display:block;margin-top:10px;font-size:14px;">{{ message }}</span>
        <p style="text-align: right">{{ $t('messages.register.accountNum') }}<router-link to="/Login">{{ $t('messages.login.loginNow') }}</router-link></p>
      </div>
      <div class="end">
        <span>
          <label>
            <input type="checkbox" v-model="receive" @click="agree">&emsp;{{ $t('messages.register.agree') }}<router-link to="/UserService" target="_blank">{{ $t('messages.register.clause') }}</router-link>{{ $t('messages.register.and') }}<router-link to="/UserPolicy" target="_blank">{{ $t('messages.register.strategy') }}</router-link>
          </label>
        </span>
        <span class="selectTips" v-if="!receive">{{ $t('messages.register.checkOut') }}“{{ $t('messages.register.clause') }}”！</span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import api from '@/api/api'
import zhLogo from '@/assets/img/logo.png'
import enLogo from '@/assets/img/enLogo.png'
export default {
  name: 'register',
  data () {
    return {
      receive: true,
      UserTips: '',
      PassTipsOne: '',
      PassTipsTwo: '',
      EmailTips: '',
      message: '',
      userName: '',
      passwordOne: '',
      passwordTwo: '',
      email: '',
      logoChange: localStorage.locale,
      zhLogo: zhLogo,
      enLogo: enLogo
    }
  },
  watch: {
    userName (val) {
      this.delSpace('userName', val)
    },
    passwordOne (val) {
      this.delSpace('passwordOne', val)
    },
    email (val) {
      this.delSpace('email', val)
    }
  },
  methods: {
    ...mapMutations(['setLang']),
    // 删除输入的空格
    delSpace (obj, val) {
      this[obj] = val.replace(/(^\s*)|(\s*$)/g, '')
    },
    agree () {
      this.receive = !this.receive
      if (!this.receive) {
        document.getElementById('receive').disabled = 'disabled'
        document.getElementById('receive').style.background = '#ccc'
      } else {
        document.getElementById('receive').disabled = ''
        document.getElementById('receive').style.background = ''
      }
      this.UserTips = ''
      this.PassTipsOne = ''
      this.PassTipsTwo = ''
      this.EmailTips = ''
    },
    isCheckUser (str) {
      if (/^[a-zA-Z0-9]{6,12}$/.test(str)) {
        return true
      }
      return false
    },
    isCheckPass (str) {
      if (/^[\w@-]{8,18}$/.test(str)) {
        return true
      } else {
        return false
      }
    },
    IsEmail (str) {
      var reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
      return reg.test(str)
    },
    register () {
      let sha256 = require('js-sha256').sha256
      this.message = ''
      var that = this
      if (that.userName === '') {
        that.UserTips = that.$t('messages.register.userNameEmpty')
      } else {
        that.UserTips = ''
      }
      if (that.passwordOne === '') {
        that.PassTipsOne = that.$t('messages.register.pwdEmpty')
      } else {
        that.PassTipsOne = ''
      }
      if (that.passwordTwo === '') {
        that.PassTipsTwo = that.$t('messages.register.confirmPwdEmpty')
      } else {
        that.PassTipsTwo = ''
      }
      if (that.email === '') {
        that.EmailTips = that.$t('messages.register.emailEmpty')
      } else {
        that.EmailTips = ''
      }
      if (that.userName !== '' && that.email !== '' && that.passwordOne !== '' && that.passwordTwo !== '') {
        if (!that.IsEmail(that.email)) {
          that.EmailTips = that.$t('messages.register.enterCorrectEmail')
        }
        if (!that.isCheckUser(that.userName)) {
          that.UserTips = that.$t('messages.register.userNameTip')
        }
        if (!that.isCheckPass(that.passwordOne)) {
          that.PassTipsOne = that.$t('messages.register.pwdTip')
        } else {
          if (that.passwordOne !== that.passwordTwo) {
            that.PassTipsTwo = that.$t('messages.register.diffPwd')
          }
        }
        // 同意条款
        if (that.isCheckUser(that.userName) && that.isCheckPass(that.passwordOne) && that.IsEmail(that.email) && that.passwordOne === that.passwordTwo) {
          that.data = {'username': that.userName, 'password': sha256(that.passwordOne), 'email': that.email}
          api.post('register', that.data).then(function (response) {
            switch (response.status) {
              case 1:
                alert(that.$t('messages.register.succeRegister'))
                that.$router.push({path: '/Login', query: {userName: that.userName}})
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
    },
    // 切换语言
    changeLanguage () {
      if (!document.querySelector('.changeLanguage').classList.contains('active')) {
        document.querySelector('.changeLanguage').classList.add('active')
      } else {
        document.querySelector('.changeLanguage').classList.remove('active')
      }
      let lang = this.$i18n.locale === 'zh' ? 'en' : 'zh'
      this.$i18n.locale = lang
      this.setLang()
      this.logoChange = localStorage.locale
      this.UserTips = ''
      this.PassTipsOne = ''
      this.PassTipsTwo = ''
      this.EmailTips = ''
    }
  },
  mounted () {
    if (localStorage.locale === 'en') {
      document.querySelector('.changeLanguage').classList.add('active')
    } else if (localStorage.locale === 'zh') {
      document.querySelector('.changeLanguage').classList.remove('active')
    }
  }
}
</script>
<style scoped>
  .register {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    width: 40%;
    background: #fff;
    border-radius: 20px;
  }
  .register_container {
    width: 80%;
    margin: 0 auto;
  }
  .register_head {
    text-align: center;
  }
  .register_head img {
    height: 4rem;
    margin: 5% 0;
  }
  .register_content span {
    font-size: 12px;
    color: red;
  }
  .languageBox {
    text-align: right;
  }
  .changeLanguage {
    display: inline-block;
    width: 30px;
    height: 30px;
    background:url('../assets/img/en.png') center center / 100% 100% no-repeat;
  }
  .changeLanguage.active {
    background:url('../assets/img/ch.png') center center / 100% 100% no-repeat;
  }
  table {
    width: 100%;
  }
  td {
    position: relative;
  }
  .register_content input {
    width: 100%;
    height: 45px;
    line-height: 45px;
    border-radius: 5px;
    margin-top: 5%;
    outline: none;
    border: 1px solid #179075;
    text-indent: 40px;
    font-size: 16px;
  }
  input::-webkit-input-placeholder {
    color: #989898 !important;
  }
  td > i {
    position: absolute;
    left: 3%;
    top: 55%;
    width: 16px;
    height: 16px;
  }
  .user_icon {
    background: url('../assets/img/user.png') center center / cover no-repeat;
  }
  .password_icon {
    background: url('../assets/img/password.png') center center / cover no-repeat;
  }
  .email_icon {
    background: url('../assets/img/email.png') center center / cover no-repeat;
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
  .register_content > p {
    color: #7B7B7B;
  }
  label {
    display: inline-block;
    padding: 5% 0 2%;
    color: #7B7B7B;
  }
  .end .selectTips {
    display: block;
    color: red;
    font-size: 14px;
    text-align: center;
    padding-bottom: 2%;
  }
  .register_content a, .end a {
    color: #00A6FF;
  }
</style>
