<template>
  <div class="state-con">
    <section class="state-left">
      <figure></figure>
      <figure></figure>
      <figure></figure>
    </section>
    <section class="state-center">
      <figure></figure>
    </section>
    <section class="state-right">
      <figure></figure>
      <figure></figure>
      <figure></figure>
    </section>
  </div>
</template>
<script>
export default {
  name: 'State'
}
</script>
<style scoped="scoped" lang="scss">
  .state-con {
    box-sizing: border-box;
    padding: 1rem;
    height: calc(100% - 3rem);
    section {
      width: calc((100% - 20px) / 3);
      height: 100%;
    }
    .state-left figure,
    .state-right figure {
      margin-bottom: 10px;
    }
    .state-left figure:last-child,
    .state-right figure:last-child {
      margin-bottom: 0px;
    }
  }
</style>
