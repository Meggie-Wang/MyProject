<template>
  <div
    class="header"
    :style="{
      'backgroundColor': $route.path === '/Main' ? '' : '#315697',
      'lineHeight': $route.path === '/Main' ? '' : '80px',
      'padding': userClass === '1' || userClass === '2' ? '0' : '0 2.5%',
      'box-shadow': userClass === '1' || userClass === '2' ? '1px 1px 5px #000' : 'none',
      'z-index': userClass === '1' || userClass === '2' ? '101' : ''
    }">

    <div
      class="logo __handCursor"
      @click="goMain"
      :style="{
        'width': userClass === '1' || userClass === '2' ? '200px' : '25%',
        'left': $route.path === '/Main' || (userClass === '1' || userClass === '2') ? '' : '7.5%',
        'justify-content': $route.path === '/Main' || (userClass === '1' || userClass === '2') ? 'center' : 'flex-start',
        'align-items': $route.path === '/Main' ? 'flex-end' : 'center'
      }">
      <img
        :src="$img.logo"
        :style="{height: $tokenName === 'zhirong' ? '57%' : '45%'}">
    </div>

    <div
      class="title"
      :style="{
        'position': $route.path !== '/Main' ? 'absolute' : '',
        'width': $route.path !== '/Main' ? '95%' : '75%',
        'align-items': $route.path === '/Main' ? 'flex-end' : 'center'
      }"
      v-if="userClass === '3' || userClass === '4'">
      <h1 v-if="$route.path === '/Main'" style="font-size: 1.6rem;">{{$projectCnName}}</h1>
      <h1 v-else>{{ title }}</h1>
    </div>

    <div
      class="title"
      v-if="userClass === '1' || userClass === '2'"
      style="width: calc(100% - 200px)">
      <h1>{{ title}}</h1>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      userClass: localStorage.userClass,
      userName: localStorage.userName
    }
  },
  props: ['title'],
  methods: {
    goMain () {
      this.$router.push({path: '/Main'})
    },
    logout () {
      this.$api.post('logout').then(res => {
        // 清理localStorage
        localStorage.setItem(localStorage.tokenName + '_token', 'undefined')
        localStorage.setItem('session_id', 'undefined')
        localStorage.setItem('userName', 'undefined')
        // 清理cookie
        // 跳转login
        this.$router.push({path: '/Login'})
      })
    }
  }
}
</script>
<style scoped="scoped">
  .header {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    height: 80px;
    overflow: hidden;
  }
  @media print {
    .header {display: none;}
  }
  .logo,
  .title{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .logo {
    position: relative;
    z-index: 3;
  }
  .title {
    text-align: center;
  }
  .title h1 {
    font-size: 1.5rem;
    color: #fff;
  }
  .logo img,
  .title img {
    position: relative;
  }
  .logo img {height: 45%;}
  .title img {height: 35%;}
  .logout-con{
    position: relative;
    right: 5%;
    display: flex;
    justify-content: space-between;
    width: calc(100% - 25% - 7.5%);
    height: 100%;
  }
  .logout-con span{
    color: #fff;
  }
  .logout-con img {
    height: 1.5rem;
  }
</style>
<style lang="scss">
  .logout-con {
    .el-menu {
      width: 80%;
      display: flex;
      justify-content: space-between;
      border-bottom: none;
      background: transparent;
      .el-menu-item {
        flex: 1;
        color: #fff;
        height: 80px;
        line-height: 80px;
        border-bottom: none;
        padding: 0;
        text-align: center;
      }
      .el-menu-item:hover {
        color: $bgColor!important;
        background-color: #fff!important;
      }
      .el-menu-item.is-active {
        color: $bgColor;
        background-color: #fff;
        font-weight: bold;
      }
      .el-submenu {
        flex: 1;
        text-align: center;
        .el-submenu__title {
          height: 80px;
          line-height: 80px;
          color: #fff;
        }
      }
      .el-submenu.is-active .el-submenu__title {
        background-color: #fff!important;
        color: $bgColor!important;
        border-bottom: none;
      }
    }
    .el-menu--horizontal > .el-menu--popup > .is-active {
      color: #fff!important;
      background-color: $bgColor;
    }
    .el-dropdown {
      height: 60%;
    }
    .el-dropdown-link {
      cursor: pointer;
    }
  }
  .el-menu--horizontal .el-menu--popup .el-submenu .el-submenu__title {
    text-indent: 10px;
  }
  .el-menu--horizontal .el-menu--popup .el-submenu.is-active .el-submenu__title {
    border-bottom: none;
  }
</style>
