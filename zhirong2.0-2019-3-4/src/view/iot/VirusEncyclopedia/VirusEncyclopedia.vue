<template>
  <div class="VirusEncyclopedia">
    <div class="VirusEncyclopedia_container">
      <h1>{{$route.query.name}}</h1>
      <p style="text-indent: 2rem; margin-top: 1rem;">{{$route.query.dis}}</p>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '',
      text: ''
    }
  }
}
</script>
<style scoped>
  .VirusEncyclopedia {
  }
  .VirusEncyclopedia_container {
    width: 80%;
    margin: 1rem auto 0;
    padding-bottom: 1rem;
  }
  h1 {
    text-align: center;
    font-size: 26px;
  }
  .VirusEncyclopedia > ul > li {
    margin-bottom: 20px;
  }
  h2 {
    font-size: 20px;
    margin-bottom: 20px;
  }
  .paragraph p {
    text-indent: 3vw;
  }
  .el-table {
    margin-top: 10px;
  }
</style>
