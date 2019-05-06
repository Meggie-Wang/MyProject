<template>
  <div class="FreeUpload">
    <div class="FreeUpload-con">
      <div class="FreeUpload-img">
        <img :src="$img.searchBg">
      </div>
      <UploadAct
      apiPath="handleUpload"
      jumpPath="DetectionQueue"/>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FreeUpload'
}
</script>
<style scoped lang="scss">
  .FreeUpload {
    display: flex;
    justify-content: center;
    .FreeUpload-con {
      width: 100%;
      box-sizing: border-box;
      padding: 0 20%;
      margin: 0 auto;
      overflow: auto;
      .FreeUpload-img{
        width: 70%;
        margin: 0 auto;
        padding: 10% 0 5%;
        img {width: 100%;}
      }
    }
  }
</style>
