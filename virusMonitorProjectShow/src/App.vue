<style lang="stylus" rel="stylesheet/stylus">
  #app
    position absolute
    height 100%
    width 100%
    
  * 
    margin: 0;
    padding: 0;
    font-family: 'Adobe黑体';

  .fl 
    float: left !important;
  
  .fr 
    float: right;

  .clearfix:after 
    content: "";
    display: block;
    clear: both;
</style>
<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keeplive"></router-view>
    </keep-alive>
    
    <router-view v-if="!$route.meta.keeplive" class="router-view"></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {}
    }
  }
</script>