<template>
  <div class="adminHeader">
    <div>
      <div class="btn-con" v-if="userClass === '2' || userClass === '5'">
        <el-button v-for="(router, index) in routers" :key="index" @click="changeTab(router.path, index)" :class="currentPath === router.path ? 'is_Active' : ''">{{ router.label }}</el-button>
      </div>
      <router-view :class="routers.length === 0 ? 'adminHeader-con-noheader' : 'adminHeader-con'" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'adminHeader',
  data () {
    return {
      userClass: localStorage.userClass,
      currentPath: ''
    }
  },
  props: ['routers'],
  watch: {
    routers (val) {
      if (this.$route.path === '/ReportInfo') {
        this.currentPath = '/ReportSetting'
      } else {
        this.currentPath = this.$route.path
      }
    }
  },
  methods: {
    changeTab (path, index) {
      let q = this.$common.inheritObj(this.$route.query)
      this.$router.push({
        path: path,
        query: q
      })
      this.currentPath = path
    }
  },
  mounted () {
    this.changeTab(this.$route.path, 0)
  }
}
</script>
<style scoped lang="scss">
  .adminHeader {
    > div {
      width: 95%;
      min-height: calc(100% - 2rem);
      margin: 1rem auto;
      .adminHeader-con {
        padding: .5rem 5%;
        margin-top: 1rem;
        background: #fff;
        min-height: calc(100vh - 120px - 4rem);
      }
      .adminHeader-con-noheader {
        padding: .5rem 5%;
        margin-top: 1rem;
        background: #fff;
        min-height: 100%;
        min-height: calc(100vh - 80px - 3rem);
      }
    }
  }
  .el-button.active {
    background-color: #fff;
    border-color: #fff;
    color: $textColor;
  }
  .btn-con .el-button:focus {
    color: $textColor;
    background: white;
    border-color: $borderColor;
  }
</style>
<style lang="scss">
  .is_Active {
    background-color: white!important;
    color: $textColor!important;
  }
</style>
