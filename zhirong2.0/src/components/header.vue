<template>
  <div class="header" :style="{'backgroundColor': $route.path === '/Main' ? '' : '#315697', 'lineHeight': $route.path === '/Main' ? '' : '80px'}">

    <div
    class="logo"
    @click="goMain()"
    :style="{
      'left': $route.path === '/Main' ? '' : '7.5%',
      'justify-content': $route.path === '/Main' ? 'center' : 'flex-start',
      'align-items': $route.path === '/Main' ? 'flex-end' : 'center'
    }">
      <img :src="$img.logo">
    </div>

    <div
    class="title"
    :style="{
      'position': $route.path !== '/Main' ? 'absolute' : '',
      'width': $route.path !== '/Main' ? '95%' : '75%',
      'align-items': $route.path === '/Main' ? 'flex-end' : 'center'
    }">
      <!-- <img
      src="../../assets/img/title.png"
      v-if="$route.path === '/Main'"
      :style="{
        'bottom': $route.path === '/Main' ? '5px' : ''
      }"> -->
      <h1 v-if="$route.path === '/Main'" style="font-size: 1.6rem;">{{$projectCnName}}</h1>
      <h1 v-else>{{title}}</h1>
    </div>

    <div
    v-if="$route.path === '/UserList' || $route.path === '/UserLog'"
    class="logout-con">
      <label
      class="__handCursor"
      @click="logout">
        <span>退出</span>
        <img :src="$img.logout">
      </label>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
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
    /*display: flex;*/
    /*justify-content: space-between;*/
    /*align-items: flex-end;*/
    height: 80px;
    overflow: hidden;
    padding: 0 2.5%;
  }
  @media print {
    .header {display: none;}
  }
  .logo,
  .title{
    float: left;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .logo {
    position: relative;
    z-index: 3;
    width: 25%;
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
    text-align: right;
  }
  .logout-con span{
    color: #fff;
  }
  .logout-con img {
    height: 1.5rem;
  }
</style>
