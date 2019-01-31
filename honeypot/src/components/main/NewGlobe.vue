<template>
  <div class="new-globe">
    <iframe src="./static/missile/copy.html" frameborder="0" scrolling="no"></iframe>
  </div>
</template>
<script>
export default {
  name: 'new-globe'
}
</script>
<style scoped="scoped">
  .new-globe{
    position: relative;
    top: -5.5rem;
    z-index: 1;
    width: 100%;
    height: calc(100% + 5.5rem);
  }
  iframe{
    height: 100%;
    width: 100%;
  }
</style>
