<template>
  <div class="AttackState">
    <NewGlobe />
  </div>
</template>
<script>
import NewGlobe from '@/components/main/NewGlobe'
export default {
  name: 'AttackState',
  components: {
    NewGlobe
  }
}
</script>
<style scoped="scoped">
  .AttackState {
    width: 100%;
    height: calc(100% - 5.5rem);
  }
</style>
