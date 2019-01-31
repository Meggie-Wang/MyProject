<template>
  <div
    class="side-bar"
    :class="{'act-in': sidebarShow, 'act-out': sidebarHide}">
    <div class="sideBar-container">
      <el-menu
        class="el-menu-vertical-demo"
        router
        @select="sidebarShow = false; sidebarHide = true"
        background-color="#315697"
        text-color="#ddd"
        active-text-color="#fff"
        :unique-opened=true
        :default-active="$route.path">
        <el-menu-item index="/DetectionHistory">
          <span slot="title">IOT病毒库</span>
        </el-menu-item>
        <el-menu-item index="/FreeUpload">
          <span slot="title">手动检测</span>
        </el-menu-item>
        <el-menu-item index="/DetectionQueue">
          <span slot="title">检测队列</span>
        </el-menu-item>
        <el-menu-item index="/VirusEncyclopedia">
          <span slot="title">病毒百科</span>
        </el-menu-item>
      </el-menu>
      <button
      @click="sidebarShow = !sidebarShow; if (!sidebarShow) { sidebarHide = true } else { sidebarHide = false }"
      class="handleButton __handCursor"
      :class="{'is-reverse': sidebarShow}"
      :style="{
        backgroundImage: `url(${$route.meta.isBackground ? $img.sideBarA : (sidebarShow ? $img.sideBarA : $img.sideBarB)})`
      }"></button>

      <div class="logout-con">
        <label class="__handCursor">
          <span>{{userName}}</span>
          <img :src="$img.userLog">
        </label>
        <label
        class="__handCursor"
        @click="logout">
          <span>退出</span>
          <img :src="$img.logout">
        </label>
      </div>
    </div>
    <div
      class="sidebar-overlay"
      v-if="sidebarShow"
      @click="sidebarShow = false; sidebarHide = true"></div>
  </div>
</template>
<script>
export default {
  name: 'side-bar',
  data () {
    return {
      sidebarShow: false,
      sidebarHide: false,
      isBackground: false,
      userName: localStorage.userName
    }
  },
  methods: {
    logout () {
      this.$api.post('logout').then(res => {
        // 清理localStorage
        localStorage.setItem(localStorage.tokenName + '_token', 'undefined')
        localStorage.setItem('session_id', 'undefined')
        localStorage.setItem('userName', 'undefined')
        // 跳转login
        this.$router.push({path: '/Login'})
      })
    }
  }
}
</script>
<style scoped lang="scss">
  .side-bar {
    position: fixed;
    top: 0;
    left: -200px;
    width: 200px;
    height: 100%;
    opacity: 1;
    z-index: 100;
  }
  /*动画*/
  .act-in {
    animation: act-in .5s ease;
    animation-fill-mode: forwards;
  }
  @keyframes act-in {
    0% {
      left: -50%;
    }
    100% {
      left: 0;
    }
  }
  .act-out {
    animation: act-out .5s ease;
    animation-fill-mode: forwards;
  }
  @keyframes act-out {
    0% {
      left: 0;
    }
    100% {
      left: -200px;
    }
  }
  /*动画结束*/
  .side-bar {
    left: -200px;
    background: #315697;
  }
  .sideBar-container {
    position: relative;
    z-index: 999;
    height: 100%;
    width: 100%;
  }
  .sideBar-container > .el-menu {
    padding-top: 30%;
  }
  .sideBar-container > .el-menu > li > span,
  .sideBar-container > .el-menu > li > .el-submenu__title > span {
    font-size: 18px;
  }
  button {
    position: absolute;
    top: 50%;
    right: -20px;
    width: 20px;
    height: 40px;
    transition: transform .3s,-webkit-transform .3s;
    transform: rotateZ(180deg);
    border: none;
    background-color: transparent;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
  button.is-reverse {
    transform: rotateZ(0);
    right: 0;
  }
  .logout-con{
    position: absolute;
    bottom: 1rem;
    right: 15%;
    width: 85%;
    text-align: right;
    label{
      display: block;
      margin-top: 10px;
    }
    span{
      color: #fff;
    }
    img {
      width: 1.5rem;
    }
  }
  .sidebar-overlay {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    background: rgba(0, 0, 0, 0);
    width: 100%;
    height: 100%;
  }
</style>
<style type="text/css">
  .side-bar > .sideBar-container > .el-menu {
    height: 100%!important;
    width: 100%!important;
    box-sizing: border-box!important;
    padding: 20% 15% 0!important;
  }
</style>
