<template>
  <div class="status-view">
    <!-- <GridLayout :winResize="winResize"/> -->
    <FixedGrid :winResize="winResize"/>
  </div>
</template>
<script>
// import GridLayout from '@/components/grid/GridLayout'
import FixedGrid from '@/components/grid/FixedGrid'
export default {
  name: 'statusView',
  data () {
    return {
      winResize: 0
    }
  },
  components: {
    // GridLayout
    FixedGrid
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.winResize = window.innerHeight + '/' + window.innerWidth
    })
  }
}
</script>
<style scoped="scoped">
  .status-view {
    position: relative;
    height: calc(100% - 5.5rem);
    overflow-y: scroll;
  }
</style>
