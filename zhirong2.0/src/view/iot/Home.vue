<template>
  <div id="home" class="iotHome">
    <div class="sideBar">
      <el-menu
        :default-active="$route.path"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        text-color="#ddd"
        active-text-color="skyblue"
        router>
        <el-menu-item index="/index">首页</el-menu-item>
        <el-menu-item index="/maliceSample">恶意样本库</el-menu-item>
        <el-menu-item index="/specialVirus">特种病毒库</el-menu-item>
      </el-menu>
      <div class="logout">
        <label
        class="__handCursor"
        @click="logout">
          <span>退出</span>
          <img :src="$img.logout">
        </label>
      </div>
    </div>
    <keep-alive>
      <router-view
      v-if="$route.meta.keepAlive"
      class="home-router"
      :style="{'overflow-y': $route.meta.isBackground ? '' : 'auto'}"></router-view>
    </keep-alive>
    <router-view
    v-if="!$route.meta.keepAlive"
    class="home-router"
    :style="{'overflow-y': $route.meta.isBackground || $common.homePrintConOverflowY($route) ? '' : 'auto'}"></router-view>
  </div>
</template>

<script>
export default{
  name: 'home',
  data () {
    return {
      activeIndex: '1',
      userName: localStorage.userName
    }
  },
  methods: {
    handleSelect (key, keyPath) {
    },
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
  },
  mounted () {
  }
}
</script>
<style scoped>
  .home-router {
    height: calc(100% - 61px);
  }
  .iotHome .el-menu {
    width: 80% !important;
    margin: 0 auto;
    background: none;
    opacity: 1;
    border-right: none;
  }
  .iotHome .el-menu-item, .el-submenu__title {
    width: 100px;
    text-align: center;
    border-bottom: 1px solid #c2d3fc;
    padding: 0 !important;
    min-width: 0 !important;
  }
  .iotHome .el-menu-item.is-active:hover, .el-menu-item:hover, .el-submenu__title:hover {
    color: skyblue !important;
    background: none !important;
  }
  .iotHome .el-submenu__icon-arrow:before {
    content: '';
  }
  .iotHome .el-submenu__icon-arrow {
    right: 0;
    width: 20px;
    height: 12px;
    background: none;
  }
  .sideBar {
    position: relative;
  }
  @media print {
    .sideBar {display: none;}
  }
  .logout {
    position: absolute;
    top: 25%;
    right: 10%;
  }
</style>
