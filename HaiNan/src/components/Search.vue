<template>
  <div class="Search">
    <input
      class="searchInput el-input__inner "
      v-model="searchName"
      :Placeholder="searchPlaceholder"
      @keyup.enter="search">
    <button class="searchBtn el-button" @click="search"><img :src="$img.Search"></button>
  </div>
</template>
<script>
export default {
  name: 'Search',
  data () {
    return {
      searchName: ''
    }
  },
  props: ['path', 'searchPlaceholder'],
  watch: {
    // 实时更新url中的参数值
    searchName (val) {
      let q = this.$common.inheritObj(this.$route.query)
      q.searchName = this.searchName
      this.$router.push({
        path: this.path,
        query: q
      })
    }
  },
  methods: {
    search () {
      // 输入框中内容传递给父组件，然后出发父组件中方法更新数据
      this.searchName = this.searchName.replace(/(^\s*)|(\s*$)/g, '')
      let q = this.$common.inheritObj(this.$route.query)
      q.searchName = this.searchName
      q.page = 1
      this.$router.push({
        path: this.path,
        query: q
      })
      this.$emit('initList', 1)
    }
  },
  mounted () {
    if (this.$route.query.searchName && this.$route.query.searchName !== '') {
      this.searchName = this.$route.query.searchName
    }
  }
}
</script>
<style scoped lang="scss">
  .Search {
    display: flex;
    align-items: flex-end;
    font-size: .7rem;
    width: calc((100% - 380px - 2rem) / 5 * 2);
    .el-input__inner {
      background: $bgColor-opacity;
      border-radius: 4px 0 0 4px;
      color: $textColor;
    }
    ::-webkit-input-placeholder {
      color: $textColor;
    }
    .searchBtn {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40px;
      border-radius: 0 4px 4px 0;
      border: none;
      padding: 0 15px;
      background: $tableTitleBg;
      img {
        height: 1.2rem;
      }
    }
  }
</style>
