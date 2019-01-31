<style lang="stylus" scoped>
  .active h1{
    line-height: 20px;
    white-space: nowrap;
    font-size: 1.6vw;
  }
  .active li {
    line-height:50px;
  }
  .title {
    position: relative;
    display: flex;
    height: 70px;
    line-height: 50px;
    color: white;
    width: 100%;
  }  
  h1 {
    flex: 0 0 200px;
    font-size: 1.5em;
    font-weight: bold;
    padding-top: 1%;
    color:#BFFDE4;
    margin: 0 auto;
    white-space: nowrap;
  }
</style>

<template lang="html">
  <div class="title">
    <h1>{{ name }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    name: String
  }
}
</script>