<template>
  <div class="loading">
    <div class="loading-con">
      <div>
        <i class="el-icon-loading"></i>
        <span>加载中，请稍等...</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'loading'
}
</script>
<style scoped="scoped" lang="scss">
  .loading-con {
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 5;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    div {
      background: rgba(36, 67, 123, .8);
      box-sizing: border-box;
      padding: 30px 50px;
      border-radius: 10px;
      color: #fff;
    }
  }
</style>
