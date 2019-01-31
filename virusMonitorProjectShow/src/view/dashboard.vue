<style lang="stylus" scoped>
  * {
    box-sizing: border-box;
  }
  .dashboard {
    height: 100%;
    padding-top: 3%;
    background: url('../../static/img/dashboard/background.jpg') center center / 100% 100%;
  }
  .dashboard-title {
    height: 5em;
  }
  .dashboard-title .left-box {
    float: left;
    width: 25%;
    height: 100%;
  }
  .dashboard-title .right-box {
    position: relative;
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: space-around;
    background: url('../../static/img/dashboard/title.png') no-repeat 50% 0;
    background-size: 80% 100%;
  }
  .dashboard-title .right-box span {
    color: #90D1BD;
    letter-spacing: 0.6em;
    font-size: 1.8vw;
    font-weight: bold;
  }
  .dashboard-title .right-box p img {
    width: 55vw;
  }
  .el-dropdown-menu {
    background: url('../../static/img/dashboard/floordown.png');
    background-size: 100% 100%;
    border: none;
    padding: 1%;
  }
  .dropdown {
    position: absolute;
    top: 60%;
    left: 90%;
    width: 6%;
    z-index: 10;
  }
  .more {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .more button {
    background-color: transparent;
    border: none;
    color: #2BC9A6;
    outline: none;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
  }
  .arrow {
    position: absolute;
    right: 2%;
    width: 20px;
    height: 20px;
    background: url('../../static/img/icon.png') -53px -101px no-repeat;
    cursor: pointer;
  }
  .click-img {
    width: 100%;
    height: 100%;
    margin: 2%;
    text-align: center;
    cursor: pointer;
  }
  .click-img img {
    width: 60%;
  }
  .click-img:last-of-type img {
    margin-top: 5%;
  }
  .click-img:hover {
    background-color: rgba(255,255,255,.5);
  }
  .dashboardMoreBtnLogout {
    position: relative;
  }
  .dashboardMoreBtnLogout ul {
    position: absolute;
    right: 100%;
    display: flex;
    flex-wrap: wrap;
  }
  .dashboardMoreBtnLogout ul > li {
    flex: 1;
    color: #fff;
    opacity: .7;
    background: #01a684;
    padding: 5px;
    margin-bottom: 5px;
    font-size: 10px;
    border-radius: 10px;
    white-space: nowrap;
  }
  .changeLanguage {
    cursor: pointer;
  }
  .flex-container {
    position: relative;
    height: 88%;
    width: 96%;
    margin: 0 auto;
  }
  .item {
    position: absolute;
    width: 75%;
    height: 95%;
    text-align: center;
    transform: scale(0.33);
    transition: all 0.8s;
  }
  .point, .rosePie, .columnChart, .pie, .dynamicChart, .wordList, .hackerList {
    width: 100%;
    height: 100%;
  }
  .active {
    width: 75.7%;
    height: 65%;
  }
</style>

<template lang="html">
  <div class="dashboard">
    <div class="dashboard-title" >
      <!--左边-->
      <div class="left-box">
        <img src="../../static/img/dashboard/logo.png" style="height:100%;width: 80%;margin-left: 16%;padding-top: 1%">
      </div>
      <!--右边-->
      <div class="right-box">
        <p>
          <span v-if="language === 'zh'">数戎-软件基因全球网络安全数据综合服务平台</span>
          <img v-else src="../../static/img/enLogo.png">
        </p>
        <div class="more" @click="sanjiao">
          <button>{{ $t('messages.dashboard.more') }}</button>
          <i class="arrow"></i>
        </div>
        <ul
          class="el-dropdown-menu dropdown"
          v-if="showhide"
          @mouseleave="showhide = false">
          <li
          class="click-img dashboardMoreBtnLogout"
          @mouseover="logoutShow = true"
          @mouseout="logoutShow = false">
            <ul>
              <li
              class="logoutShow"
              v-if="logoutShow" @click="dashboardMoreBtn('/personal')">{{ $t('messages.nav.personalCenter') }}</li>
              <li
              class="logoutShowTwo"
              v-if="logoutShow" @click="dashboardMoreBtn('/login')">{{ $t('messages.nav.exit') }}</li>
            </ul>
            <img src="../../static/img/dashboard/personal.png">
          </li>
          <li class="click-img" @click="dashboardMoreBtn('/Home')">
            <img src="../../static/img/dashboard/detail.png">
          </li>
          <li class="click-img">
            <img @click="changeLanguage" class="changeLanguage" v-if="isChange" src="../../static/img/ch.png">
            <img @click="changeLanguage" class="changeLanguage" v-else src="../../static/img/en.png">
          </li>
        </ul>
      </div>
    </div>
    <div class="flex-container">
      <div class="item one" @click="clickChart('1')" style="transform: translate(-33.4%,-31.6%) scale(0.33);">
        <pie :styleActive="isItemActive[0] ? activeStyle : deactiveStyle" :winResize="winResize"></pie>
      </div>
      <div class="item two" @click="clickChart('2')" style="transform: translate(-33.4%,2.9%) scale(0.33)">
        <wordList :styleActive="isItemActive[1] ? activeStyle : deactiveStyle" :winResize="winResize"></wordList>
      </div>
      <div class="item three" @click="clickChart('3')" style="transform: translate(-33.4%,37.5%) scale(0.33)">
        <hackerList :styleActive="isItemActive[2] ? activeStyle : deactiveStyle"></hackerList>
      </div>
      <div class="item three" @click="clickChart('4')" style="transform: translate(0%,37.5%) scale(0.33)">
        <dynamicChart :styleActive="isItemActive[3] ? activeStyle : deactiveStyle" :winResize="winResize"></dynamicChart>
      </div>
      <div class="item three" @click="clickChart('5')" style="transform: translate(33.5%,37.5%) scale(0.33)">
        <rosePie :styleActive="isItemActive[4] ? activeStyle : deactiveStyle" :winResize="winResize"/>
      </div>
      <div class="item three" @click="clickChart('6')" style="transform: translate(67%,37.5%) scale(0.33)">
        <column :styleActive="isItemActive[5] ? activeStyle : deactiveStyle" :winResize="winResize"></column>
      </div>
      <div class="item four active" @click="clickChart('7')" style="transform: translate(32.9%, 2%) scale(0.99);">
        <point :styleActive="isItemActive[6] ? activeStyle : deactiveStyle" :winResize="winResize"></point>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import api from '../api/ipApi'
import pie from 'components/home/pie'
import wordList from 'components/home/wordList'
import hackerList from 'components/home/hackerList'
import dynamicChart from 'components/home/dynamicChart'
import rosePie from 'components/home/rosePie'
import column from 'components/home/column'
import point from 'components/home/point'

export default {
  data() {
    return {
      language: localStorage.locale,
      showhide: false,
      items: [],
      isItemActive: [false, false, false, false, false, false, true],
      activeStyle: "transform: translate(0,0) scale(1, 1)",
      deactiveStyle: "transform: translate(0,0) scale(1, 0.99)",
      logoutShow: false,
      isChange: false,
      winResize: 0
    }
  },
  components: {
    pie,
    wordList,
    hackerList,
    dynamicChart,
    rosePie,
    column,
    point
  },
  mounted() {
    if (this.$i18n.locale === 'en') {
      this.isChange = true
    } else {
      this.isChange = false
    }
    this.init()
  },
  methods: {
    ...mapMutations(['setLang']),
    sanjiao() {
      this.showhide = !this.showhide
    },
    init() {
      this.items = document.querySelectorAll('.flex-container .item')
      for (let i = 0; i < this.items.length; i++) {
        this.items[i].dataset.order = i + 1;
      }
    },
    clickChart(clickIndex) {
      let activeItem = document.querySelector('.flex-container .active')
      let activeIndex = activeItem.dataset.order
      let clickItem = this.items[clickIndex - 1]
      if (activeIndex === clickIndex) {
        return
      }
      this.updateItemScale(activeIndex - 1, clickIndex - 1)
      activeItem.classList.remove('active')
      clickItem.classList.add('active')
      this._setStyle(clickItem, activeItem)
    },
    _setStyle(el1, el2) {
      let transform1 = el1.style.transform
      let transform2 = el2.style.transform
      el1.style.transform = transform2
      el2.style.transform = transform1
    },
    updateItemScale(activeIndex, clickIndex) {
      this.$set(this.isItemActive, activeIndex, false)
      this.$set(this.isItemActive, clickIndex, true)
    },
    // 更多按钮li的点击事件
    dashboardMoreBtn(comName) {
      if (comName === '/login' || comName === '/personal') {
        this.logoutShow = false
      }
      if (comName === '/login') {
        api.setCookie('token_virus', '', 0)
      }
      this.$router.push({path: comName})
      this.showhide = !this.showhide
    },
    // 中英文切换
    changeLanguage () {
      this.isChange = !this.isChange
      let lang = this.$i18n.locale === 'zh' ? 'en' : 'zh'
      this.$i18n.locale = lang
      this.setLang()
      this.language = localStorage.locale
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.winResize = window.innerHeight + '/' + window.innerWidth
      vm.language = localStorage.locale
      if (vm.$i18n.locale === 'zh') {
        vm.isChange = false
      } else {
        vm.isChange = true
      }
    })
  }
}
</script>