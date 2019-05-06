<template>
  <div id="header">
    <div>
      <!-- <img :src="$img.logo" class="program-logo __handCursor"> -->
      <el-menu
        :default-active="'/' + $route.meta.highLight"
        class="el-menu-demo"
        mode="horizontal"
        menu-trigger="hover"
        :unique-opened=true
        router>
        <el-menu-item index="/Status">态势</el-menu-item>
        <el-submenu index="/SoftwareGeneDetect">
          <template slot="title">目标基因分析</template>
          <el-menu-item index="/SoftwareGeneDetect">软件基因检测</el-menu-item>
          <el-menu-item index="/SoftwareDetectList">软件检测历史</el-menu-item>
          <el-menu-item index="/GeneAnalysisTool">基因分析工具</el-menu-item>
          <el-menu-item index="/GeneCompareQuene">对比检测历史</el-menu-item>
        </el-submenu>
        <el-submenu index="/LoopholeGeneAnalysis">
          <template slot="title">平台数据库</template>
          <el-menu-item index="/LoopholeGeneAnalysis">漏洞基因分析</el-menu-item>
          <el-menu-item index="/LoopholeDatabase">漏洞库</el-menu-item>
          <el-menu-item index="/LoopholeSoftwareDatabase">漏洞软件库</el-menu-item>
          <el-menu-item index="/LoopholeGene">漏洞基因库</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>

    <div>
      <span class="program-title">{{$projectCnName}} V.1.0</span>
      <el-dropdown @command="dropdownAct">
        <span class="el-dropdown-link user-option">
          <img :src="$img.user" class="__handCursor">
        </span>
        <el-dropdown-menu slot="dropdown">
          <!-- <el-dropdown-item command="userCenter">个人中心</el-dropdown-item> -->
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Header',
  data () {
    return {
      activeIndex: '/' + location.href.split('/#/')[1].split('?')[0]
    }
  },
  methods: {
    dropdownAct (val) {
      switch (val) {
        case 'userCenter':
          this.$router.push({path: '/Login'})
          break
        case 'logout':
          // 清理localStorage
          localStorage.setItem(localStorage.tokenName + '_token', 'undefined')
          localStorage.setItem('session_id', 'undefined')
          localStorage.setItem('userName', 'undefined')
          this.$router.push({path: '/Login'})
          break
      }
    }
  }
}
</script>
<style scoped="scoped" lang="scss">
  #header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 3rem;
    box-sizing: border-box;
    padding: 0 10%;
    background-color: $headerBgColor;
    div {
      display: flex;
      align-items: center;
    }
    .program-logo {
      height: 2rem;
    }
    .program-title {
      font-size: 1.1rem;
      text-shadow: 0 2px 5px #333;
    }
    .program-logo,
    .program-title { margin-right: 10px; }
    .user-option {
      font-size: 0;
      img {
        position: relative;
        top: .1rem;
        height: 1.4rem;
      }
    }
  }
</style>
<style lang="scss">
  #header {
    .el-menu {
      height: 3rem;
      background-color: transparent!important;
    }
    .el-menu.el-menu--horizontal { border-bottom: none; }

    .el-menu--horizontal >
    .el-menu-item {
      color: #fff!important;
    }

    .el-menu--horizontal >
    .el-menu-item:hover { color: #333!important; }

    .el-menu--horizontal >
    .el-menu-item.is-active {
      color: $bgColor!important;
      background-color: #fff!important;
      border-bottom: none;
      font-weight: bold;
    }

    .el-menu--horizontal >
    .el-submenu.is-active {
      background-color: #fff;
    }
    .el-menu--horizontal >
    .el-submenu .el-submenu__title {
      color: #fff!important;
    }
    .el-menu--horizontal >
    .el-submenu:hover .el-submenu__title {
      color: #333!important;
    }
    .el-menu--horizontal >
    .el-submenu.is-active .el-submenu__title {
      border-bottom: none;
      color: $bgColor!important;
      font-weight: bold;
    }
    .el-menu,
    .el-menu-item,
    .el-submenu,
    .el-submenu__title {
      height: 3rem;
      line-height: 3rem!important;
    }
  }
  .el-menu--horizontal > .el-menu--popup > .is-active {
    color: #fff!important;
    background-color: $bgColor;
  }
</style>
