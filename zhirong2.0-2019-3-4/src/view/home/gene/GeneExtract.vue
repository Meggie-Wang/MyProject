<template>
  <div class="GeneExtract">
    <div class="GeneExtract-con">
      <div class="GeneExtract-img">
        <img :src="$img.searchBg">
      </div>
      <UploadAct
      apiPath="gene_analysis"
      jumpPath="GeneQueue"/>
    </div>
  </div>
</template>
<script>
export default {
  name: 'GeneExtract'
}
</script>
<style scoped="scoped" lang="scss">
  .GeneExtract {
    display: flex;
    justify-content: center;
    .GeneExtract-con {
      width: 100%;
      box-sizing: border-box;
      padding: 0 20%;
      margin: 0 auto;
      overflow: auto;
      .GeneExtract-img{
        width: 70%;
        margin: 0 auto;
        padding: 10% 0 5%;
        img {width: 100%;}
      }
    }
  }
</style>
