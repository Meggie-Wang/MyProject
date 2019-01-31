<template>
  <div class="header-view">
    <div>
      <div>
        <img :src="logoChange === 'zh' ? zhLogo : enLogo">
      </div>
      <div>
        <ul>
          <li
          v-for="(i, j) in $t('messages.nav.navData')"
          :key="j"
          @click="jumpTo(i.component)"
          class="handCursor"
          :class="{isSelectClass: i.component === isSelect}">{{i.name}}</li></ul>
      </div>
      <div class="login_container">
        <div class="languageIcon">
          <i @click="changeLanguage" class="changeLanguage handCursor"></i>
        </div>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link handCursor">
            <img :src="headerPic">
            {{userName}}
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logout">
              <span>{{ $t('messages.nav.exit') }}</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import api from '@/api/api'
import {Dropdown, DropdownMenu, DropdownItem} from 'element-ui'
// img
import zhLogo from '@/assets/img/logo.png'
import enLogo from '@/assets/img/enLogo.png'
import headerPic from '@/assets/img/headerPic.png'
export default {
  name: 'headerView',
  data () {
    return {
      userName: api.getCookie('userName'),
      showI: false,
      isSelect: 'Main',
      logoChange: localStorage.locale,
      // img,
      zhLogo: zhLogo,
      enLogo: enLogo,
      headerPic: headerPic
    }
  },
  components: {
    elDropdown: Dropdown,
    elDropdownMenu: DropdownMenu,
    elDropdownItem: DropdownItem
  },
  methods: {
    ...mapMutations(['setLang']),
    jumpTo (val) {
      this.$router.push({path: '/' + val})
      let componentName = location.href.split('#/')[1].split('?')[0]
      this.isSelect = componentName
    },
    changeLanguage () {
      let lang = this.$i18n.locale === 'zh' ? 'en' : 'zh'
      this.$i18n.locale = lang
      if (lang === 'en') {
        document.querySelector('.changeLanguage').classList.add('active')
      } else {
        document.querySelector('.changeLanguage').classList.remove('active')
      }
      this.setLang()
      this.logoChange = localStorage.locale
      // 改变iframe
      window.document.querySelector('iframe') ? window.document.querySelector('iframe').contentWindow.changeLang(lang) : console.log('cant catch iframe')
    },
    handleCommand (command) {
      if (command === 'logout') {
        api.setCookie('token_honeypot', '')
        api.setCookie('token_refresh_exp', '')
        api.setCookie('token_exp', '')
        this.$router.push({path: '/Login'})
      }
    }
  },
  mounted () {
    if (localStorage.locale === 'en') {
      document.querySelector('.changeLanguage').classList.add('active')
    } else if (localStorage.locale === 'zh') {
      document.querySelector('.changeLanguage').classList.remove('active')
    }
    let componentName = location.href.split('#/')[1].split('?')[0]
    this.isSelect = componentName
  }
}
</script>
<style scoped="scoped">
  .header-view {
    position: relative;
    padding: 1rem 0;
    z-index: 999;
  }
  .header-view > div {
    display: flex;
    position: relative;
    justify-content: space-between;
    align-items: center;
    width: 85%;
    line-height: 3rem;
    margin: 0 auto;
  }
  .header-view > div > div {
    flex: 1
  }
  .header-view > div > div:nth-child(1) > img {
    position: relative;
    top: -.2rem;
    height: 3.5rem;
  }
  .header-view > div > div:nth-child(2) {
    flex: 3
  }
  .header-view > div > div:nth-child(3) {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .header-view > div > div > ul {
    display: flex;
  }
  .header-view > div > div > ul > li{
    flex: 1;
    text-align: center;
    font-size: 1.2rem;
    line-height: 2rem;
    color: #128b71;
    white-space: nowrap;
  }
  .header-view > div > div > ul > li:last-of-type {
    margin-right: 0;
  }
  .isSelectClass{
    color: #02ddb6 !important;
    border-bottom: .2rem solid #02ddb6;
    font-weight: bold;
  }
  .login_container {
    color: #128b71;
    white-space: nowrap;
  }
  .changeLanguage {
    display: block;
    width: 28px;
    height: 28px;
    background: url('../../assets/img/en.png') center center / cover no-repeat;
  }
  .changeLanguage.active {
    background: url('../../assets/img/ch.png') center center / cover no-repeat;
  }
  .login_container > div {
    margin-right: 2rem;
  }
  .login_container > div:last-of-type {
    margin-right: 0;
  }
  .login_container img {
    width: 2rem;
    height: 2rem;
    margin-right: 1rem;
  }
  .login_container > div > span{
    white-space: nowrap;
    color: #128b71;
  }
</style>
