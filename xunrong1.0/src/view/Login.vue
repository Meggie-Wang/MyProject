<template>
  <div id="login" class="login">
    <div class="login_container">
      <div class="login_head">
        <img :src="logoChange === 'zh' ? zhLogo : enLogo">
      </div>
      <div class="login_content">
        <!-- <div class="languageBox">
          <i class="changeLanguage handCursor" @click="changeLanguage"></i>
        </div> -->
        <table>
          <tr>
            <td>
              <i class="user_icon"></i>
              <input
                id="user"
                type="text"
                :placeholder="$t('messages.register.enterUserName')"
                maxlength="12"
                autocomplete="off"
                v-model="userName"
                @keyup.enter="submit"
                @focus="error = ''">
            </td>
          </tr>
          <tr>
            <td>
              <i class="password_icon"></i>
              <input
                id="password"
                type="password"
                oncut="return false"
                oncopy="return false"
                onpaste="return false"
                :placeholder="$t('messages.register.enterPwd')"
                maxlength="18"
                v-model="password"
                autocomplete="new-password"
                @keyup.enter="submit"
                @keydown="uppercaseLocking"
                @focus="error = ''">
              <span id="capslock">{{ $t('messages.login.lockTip') }}</span>
            </td>
          </tr>
        </table>
      </div>
      <p class="tip" v-if="status !== 1">{{ error }}</p>
      <p class="tip" v-if="this.$route.query.isLogin">{{ $t('messages.login.reLogin') }}</p>
      <button @click='submit'>
        <span v-if="!login">
          <span>{{ $t('messages.login.login') }}</span>
        </span>
        <span v-if="login"><i class="el-icon-loading"></i>{{ $t('messages.login.logged') }}</span>
      </button>
      <!-- <button @click='guestLogin'>{{ $t('messages.login.guestLogin') }}</button> -->
      <div class="end">
        <span>
          <label>
            <input type="checkbox" v-model="rememberPassword" @click="doRemeberPassword($event)">&emsp;{{ $t('messages.login.rememberPwd') }}
          </label>
        </span>
        <span class="register">
          {{ $t('messages.login.noAccountNum') }}
          <router-link to="/Register">{{ $t('messages.register.register') }}</router-link>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import api from '@/api/api'
import zhLogo from '@/assets/img/logo.png'
import enLogo from '@/assets/img/enLogo.png'

let sha256 = require('js-sha256').sha256
export default {
  data () {
    return {
      status: 0,
      error: '',
      userName: '',
      password: '',
      rememberPassword: api.getCookie('rememberPassword') !== 'undefined' ? Number(api.getCookie('rememberPassword')) : 1,
      capital: false,
      capitalTip: {},
      logoChange: localStorage.locale,
      zhLogo: zhLogo,
      enLogo: enLogo,
      login: false
    }
  },
  watch: {
    userName (val) {
      this.userName = val.replace(/(^\s*)|(\s*$)/g, '')
    },
    password (val) {
      this.password = val.replace(/(^\s*)|(\s*$)/g, '')
    }
  },
  methods: {
    ...mapMutations(['setLang']),
    isCheckUser (str) {
      if (/^[a-zA-Z0-9][\w@-]{5,16}$/.test(str)) {
        return true
      } else {
        return false
      }
    },
    isCheckPass (str) {
      if (/^[\w@-]{8,18}$/.test(str)) {
        return true
      } else {
        return false
      }
    },
    submit () {
      if (this.userName.length >= 6 && this.password.length >= 6) {
        // 判断输入合法
        if (this.isCheckUser(this.userName) && this.isCheckPass(this.password)) {
          let password
          if (api.getCookie('NNSSPID').indexOf(this.password) !== -1) {
            password = api.getCookie('NNSSPID')
          } else {
            password = sha256(this.password)
          }
          this.login = !this.login
          api.post('login', {
            username: this.userName,
            password: password,
            csrfmiddlewaretoken: 'APgpK82XxarwQUW36i5QaHq1SCGrEryuukTzBE1GuUZIa2lOxS6Jol8jx2ONvmOl'
          }).then((res) => {
            this.login = false
            this.status = res.status
            switch (res.status) {
              case 1:
                api.setCookie('token_honeypot', res.token)
                // 刷新过期时间（7.5天）   返回的初始时间 + 7.5天
                api.setCookie('token_refresh_exp', res.token_orig_iat + 7.5 * 24 * 3600)
                // 过期时间 （1天）
                api.setCookie('token_exp', res.token_exp)
                api.setCookie('userName', this.userName)
                // 判断是否记住密码
                if (Number(api.getCookie('rememberPassword'))) {
                  api.setCookie('NNSSPID', password)
                } else {
                  api.setCookie('NNSSPID', '')
                }
                this.$router.push({path: '/Main'})
                break
              case 21:
                this.error = this.$t('messages.register.regTipTwo')
                break
              case 22:
                this.error = this.$t('messages.register.regTipThree')
                break
              case 23:
                this.error = this.$t('messages.register.regTipOne')
                break
              case 24:
                this.error = this.$t('messages.login.loginTip')
                break
              case 27:
                this.error = this.$t('messages.login.loginTipOne')
                break
              case 28:
                this.error = this.$t('messages.login.loginTipTwo')
                break
              case 0:
                this.error = this.$t('messages.login.loginTip')
                break
            }
          })
        } else {
          this.error = this.$t('messages.login.formatError')
        }
      } else if (this.userName === '') {
        this.error = this.$t('messages.register.enterUserName')
      } else if (this.password === '') {
        this.error = this.$t('messages.register.enterPwd')
      } else {
        this.error = this.$t('messages.login.loginTip')
      }
      setTimeout(() => {
        this.error = ''
      }, 2000)
    },
    guestLogin () {
      this.$message({
        message: '功能维护，暂不开放！',
        type: 'warning'
      })
      // api.get('guestLogin', {}).then(res => {
      //   if (res.status === 1) {
      //     api.setCookie('userName', res.data.name)
      //     api.setCookie('NNSSPID', '')
      //     api.setCookie('token_honeypot', res.token)
      //     // 刷新过期时间（7.5天）   返回的初始时间 + 7.5天
      //     api.setCookie('token_refresh_exp', res.token_orig_iat + 7.5 * 24 * 3600)
      //     // 过期时间 （1天）
      //     api.setCookie('token_exp', res.token_exp)
      //     this.$router.replace('/Main')
      //   }
      // })
    },
    doRemeberPassword () {
      // 把记住密码状态存入cookie
      if (Number(api.getCookie('rememberPassword')) === 1) {
        this.rememberPassword = 0
        api.setCookie('rememberPassword', this.rememberPassword)
      } else {
        this.rememberPassword = 1
        api.setCookie('rememberPassword', this.rememberPassword)
      }
    },
    // 大写锁定提示
    uppercaseLocking (event) {
      let el = document.getElementById('capslock')
      this.capitalTip = {
        $elem: el,
        toggle: function (s) {
          if (s === 'none') {
            this.$elem.style.display = 'none'
          } else if (s === 'block') {
            this.$elem.style.display = 'block'
          } else if (this.$elem.style.display === 'none') {
            this.$elem.style.display = 'block'
          } else {
            this.$elem.style.display = 'none'
          }
        }
      }
      // 聚焦初始化，防止刚聚焦时点击Caps按键提示信息显隐错误
      // 获取大写提示的标签，并提供大写提示显示隐藏的调用接口
      let psw = document.getElementById('password')
      psw.onkeydown = e => {
        if (e.keyCode === 20 && this.capital) {
          // 点击Caps大写提示显隐切换
          this.capitalTip.toggle()
        }
      }
      psw.onfocus = e => {
        this.capital = false
      }
      psw.onkeypress = e => {
        this.capsLock(e)
      }
      psw.onblur = e => {
        this.capitalTip.toggle('none')
      }
    },
    capsLock (e) {
      let keyCode = e.keyCode || e.which // 按键的keyCode
      let isShift = e.shiftKey || keyCode === 16 || false // shift键是否按住
      if (keyCode === 9) {
        this.capitalTip.toggle('none')
      } else {
        // 指定位置的字符的 Unicode编码,通过与shift键对于的keycode，就可以判断capslock是否开启了
        // 90 Caps Lock 打开，且没有按住shift键
        if (((keyCode >= 65 && keyCode <= 90) && !isShift) || ((keyCode >= 97 && keyCode <= 122) && isShift)) {
          // 122 Caps Lock打开，且按住shift键
          this.capitalTip.toggle('block') // 大写开启时弹出提示框
          this.capital = true
        } else {
          this.capitalTip.toggle('none')
          this.capital = true
        }
      }
    },
    // 切换语言
    changeLanguage () {
      this.error = ''
      if (!document.querySelector('.changeLanguage').classList.contains('active')) {
        document.querySelector('.changeLanguage').classList.add('active')
      } else {
        document.querySelector('.changeLanguage').classList.remove('active')
      }
      let lang = this.$i18n.locale === 'zh' ? 'en' : 'zh'
      this.$i18n.locale = lang
      this.setLang()
      this.logoChange = localStorage.locale
    }
  },
  mounted () {
    api.setCookie('rememberPassword', this.rememberPassword)
    if (localStorage.locale === 'en') {
      document.querySelector('.changeLanguage').classList.add('active')
    } else if (localStorage.locale === 'zh') {
      document.querySelector('.changeLanguage').classList.remove('active')
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from.path === '/Register') {
        if (vm.$route.query.userName) {
          vm.userName = vm.$route.query.userName
          vm.password = ''
          return
        }
      } else {
        vm.userName = api.getCookie('userName') === 'undefined' || api.getCookie('userName') === 'guest' ? '' : api.getCookie('userName')
      }
      if (api.getCookie('rememberPassword') !== 'undefined' && api.getCookie('rememberPassword') !== '0') {
        vm.password = api.getCookie('NNSSPID') === 'undefined' ? '' : api.getCookie('NNSSPID').slice(0, 18)
      }
    })
  }
}
</script>
<style scoped>
  .login {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    width: 40%;
    background: #fff;
    border-radius: 10px;
  }
  .login_container {
    width: 80%;
    margin: 0 auto;
  }
  .login_head {
    text-align: center;
  }
  .login_head img {
    height: 4rem;
    margin: 5% 0;
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
  .login_content input {
    width: 100%;
    height: 45px;
    line-height: 45px;
    margin-top: 5%;
    outline: none;
    border: 1px solid #179075;
    border-radius: 5px;
    text-indent: 40px;
  }
  input::-webkit-input-placeholder {
    color: #989898 !important;
  }
  #capslock {
    display: none;
    position: absolute;
    font-size: 14px;
    color: red;
  }
  td > i {
    position: absolute;
    left: 3%;
    top: 55%;
    display: block;
    width: 16px;
    height: 16px;
  }
  .user_icon {
    background: url('../assets/img/user.png') center center / cover no-repeat;
  }
  .password_icon {
    background: url('../assets/img/password.png') center center / cover no-repeat;
  }
  .tip {
    text-align: center;
    color: red;
  }
  button {
    display: block;
    width: 100%;
    height: 50px;
    margin: 5% 0;
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
  }
  .end {
    display: flex;
    flex-flow: nowrap;
    justify-content: space-between;
    align-items: center;
  }
  .end > span {
    flex: 1;
  }
  .end > span:last-of-type {
    text-align: right;
  }
  .register {
    color: #7B7B7B;
  }
  .register a {
    color: #00A6FF;
  }
</style>
