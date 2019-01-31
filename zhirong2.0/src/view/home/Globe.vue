<template>
  <div class="globe">
    <iframe src="./static/missile/index.html" frameborder="0" scrolling="no"></iframe>
  </div>
</template>
<script>
export default {
  name: 'globe'
}
</script>
<style scoped="scoped">
  .globe{
    position: relative;
    top: 0px;
    z-index: 1;
    width: 100%;
    height: calc(100% - 80px);
  }
  iframe{
    height: 100%;
    width: 100%;
  }
</style>
