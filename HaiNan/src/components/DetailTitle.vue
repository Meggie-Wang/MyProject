<template>
  <div class="DetailTitle">
    <div>
      <span>{{ $route.meta.title + '——' + title }}</span>
    </div>
    <span class="back __handCursor" @click="goback">
      <img width="70%" :src="$img.goback">
    </span>
  </div>
</template>
<script>
export default {
  name: 'DetailTitle',
  data () {
    return {
      currentPath: this.$router.history.current.path.split('/')[1]
    }
  },
  props: ['title', 'status'],
  methods: {
    goback () {
      // if (this.currentPath === 'GeneCompareResult') {
      //   this.$router.push({
      //     path: '/GeneCompareQuene',
      //     query: {submitUser: localStorage.userName, page: this.$route.query.lastPage}
      //   })
      // } else {
      // history.go(-1)
      // }

      let jumpArr = JSON.parse(localStorage.jumpArr)
      let thisJump = this.$common.inheritObj(jumpArr[jumpArr.length - 2]) // 跳转倒数第二层

      jumpArr.pop() // 删除本层
      localStorage.setItem('jumpArr', JSON.stringify(jumpArr)) // 存储当前链

      this.$router.push(thisJump)
    }
  }
}
</script>
<style scoped lang="scss">
  .DetailTitle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: $bgColor-opacity;
    padding: 8px 1rem;
    > div {
      display: flex;
      align-items: center;
    }
  }
</style>
<style>
  .DetailTitle button {
    border: none;
    box-shadow: 0px 1px 5px #001913;
  }
</style>
