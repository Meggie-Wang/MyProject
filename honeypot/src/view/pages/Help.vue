<template>
  <div class="help-view">
    <div class="help_container">
      <img :src="languageState === 'zh' ? zhImg : enImg">
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import zhImg from '@/assets/img/building.png'
import enImg from '@/assets/img/buildingEn.png'
export default {
  name: 'helpView',
  data () {
    return {
      languageState: localStorage.locale,
      zhImg,
      enImg
    }
  },
  computed: {
    ...mapGetters(['language'])
  },
  watch: {
    language (val) {
      this.languageState = val
    }
  }
}
</script>
<style scoped>
  .help-view {
    width: 100%;
    height: calc(100% - 5.5rem);
  }
  .help_container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
