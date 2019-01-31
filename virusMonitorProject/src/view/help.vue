<style scoped>
  .help {
    width: 80%;
    margin: 5% auto 0;
    text-align: center;
    font-size: 30px;
  }
</style>
<template>
	<div class="help_container">
    <div class="help">
      <img :src="languageState === 'zh' ? zhImg : enImg">
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import zhImg from '../../static/img/building.png'
import enImg from '../../static/img/buildingEn.png'
export default {
  data() {
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