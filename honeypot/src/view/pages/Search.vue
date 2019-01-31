<template>
  <div class="search-view">
    <div class="search_container">
      <div class="searchImg">
        <img src="../../assets/img/searchBg.png">
      </div>
      <div class="searchInp">
        <input :placeholder="$t('messages.search.input')" v-model="searchContent" @keyup.enter="doSearch" @focus="getSearchHistory" v-clickoutside="handleClose">
        <button class="handCursor" @click="doSearch"></button>
      </div>
      <ul v-show="showSerachHistory" class="serachHistory">
        <li v-for="(search, index) in serachHistory" :key="index" class="handCursor" @click="doSearchHistory(search)">{{ search }}</li>
      </ul>
      <p class="tip" v-if="isTrue">{{ $t('messages.search.searchTip') }}</p>
      <p class="tip" v-if="this.$route.params.tip">{{ tip }}</p>
    </div>
  </div>
</template>
<script>
const clickoutside = {
  // 初始化指令
  bind (el, binding, vnode) {
    function documentHandler (e) {
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target)) {
        return false
      }
      // 判断指令中是否绑定了函数
      if (binding.expression) {
        // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
        binding.value(e)
      }
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.__vueClickOutside__ = documentHandler
    document.addEventListener('click', documentHandler)
  },
  unbind (el, binding) {
    // 解除事件监听
    document.removeEventListener('click', el.__vueClickOutside__)
    delete el.__vueClickOutside__
  }
}
export default {
  data () {
    return {
      searchContent: '',
      showSerachHistory: false,
      serachHistory: [],
      isTrue: false,
      tip: ''
    }
  },
  directives: {
    clickoutside
  },
  methods: {
    doSearch () {
      var searchArr = this.idmVer(this.searchContent)
      if (searchArr[0] === undefined || searchArr[1] === undefined) {
        this.isTrue = true
        setTimeout(() => {
          this.isTrue = false
        }, 3000)
      } else {
        this.$router.push({
          path: '/SearchDetail',
          query: {
            searchInterface: searchArr[0],
            searchType: searchArr[1],
            searchValue: this.searchContent
          }
        })
        this.searchHistory()
        this.searchContent = ''
        this.handleClose()
      }
    },
    // 判断搜索类型
    idmVer (idm) {
      let interfaceName, key
      if (idm) {
        if (/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(idm)) {
          // 验证ip
          interfaceName = 'checkip'
          key = 'ip'
        } else if (/^([0-9a-fA-F]{32})$/.test(idm)) {
          // 验证MD5
          interfaceName = 'checkmd5'
          key = 'md5'
        } else if (/^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*([\\?&]\w+=\w*)*$/.test(idm)) {
          interfaceName = 'checkdns'
          key = 'dns'
        }
      }
      return [interfaceName, key]
    },
    // 保存搜索记录
    searchHistory () {
      // 获取local中的内容
      let searchKeywordListJSON = window.localStorage.getItem('SearchKeywords')
      // 如果local中有数据 拿数据 如果没有 设为空数组
      let searchLocal = JSON.parse(searchKeywordListJSON) != null ? JSON.parse(searchKeywordListJSON) : []
      if (searchKeywordListJSON === null) {
        searchLocal.unshift(this.searchContent)
        localStorage.setItem('SearchKeywords', JSON.stringify(searchLocal))
      } else {
        // localStorage里没有本次搜索内容时
        if (searchKeywordListJSON.indexOf(this.searchContent) === -1) {
          searchLocal.unshift(this.searchContent)
          localStorage.setItem('SearchKeywords', JSON.stringify(searchLocal))
        } else {
          // localStorage里有本次搜索内容时 移出之前的内容 将新搜索的内容添加进数组
          searchLocal.splice(searchLocal.indexOf(this.searchContent), 1)
          searchLocal.unshift(this.searchContent)
          localStorage.setItem('SearchKeywords', JSON.stringify(searchLocal))
        }
      }
      // 只保留十条记录
      if (searchLocal.length > 10) {
        searchLocal.pop()
        localStorage.setItem('SearchKeywords', JSON.stringify(searchLocal))
      }
    },
    // input聚焦，显示搜索历史
    getSearchHistory () {
      this.tip = ''
      this.serachHistory = JSON.parse(window.localStorage.getItem('SearchKeywords'))
      if (this.serachHistory) {
        this.showSerachHistory = true
      }
    },
    // 选择搜索历史搜索
    doSearchHistory (val) {
      this.handleClose()
      this.searchContent = val
    },
    // 隐藏搜索历史框
    handleClose () {
      this.showSerachHistory = false
    }
  },
  mounted () {
    if (this.$route.params.tip) {
      this.tip = this.$route.params.tip
      setTimeout(() => {
        this.tip = ''
      }, 3000)
    }
  }
}
</script>
<style scoped>
  .search-view {
    height: calc(100% - 5.5rem);
    padding: 5% 0;
    box-sizing: border-box;
  }
  .search_container {
    position: relative;
    width: 100%;
  }
  .search_container > div {
    margin-top: 5%;
  }
  .searchImg {
    width: 35%;
    margin: 0 auto;
  }
  .searchImg img {
    width: 100%;
  }
  .searchInp {
    display: flex;
    width: 55%;
    height: 3rem;
    margin: 0 auto;
  }
  .searchInp input {
    width: 92%;
    height: calc(100% - 2px);
    color: #288770;
    border: 1px solid #288770;
    border-radius: 1.5rem 0 0 1.5rem;
    background: transparent;
    text-indent: 20px;
  }
  ::-webkit-input-placeholder {
    color: #288770;
  }
  :-moz-placeholder, ::-moz-placeholder {
    color: #288770;
    opacity: 1;
  }
  input[placeholder], [placeholder], *[placeholder] {
    color: #288770;
  }
  input:focus::-webkit-input-placeholder {
    color:transparent;
  }
  input:focus:-moz-placeholder, input:focus::-moz-placeholder {
    color:transparent;
  }
  .serachHistory {
    scrollbar-arrow-color: rgba(30, 30, 30, 0.2); /*滚动条方向箭头的颜色 */
    scrollbar-shadow-color: rgba(125, 125, 125, 0.5); /*滚动框的和滚动条箭头右下边缘的颜色*/
    scrollbar-base-color: rgba(125, 125, 125, 0.5); /*滚动条主要构成部分的颜色*/
    scrollbar-track-color: rgba(30, 30, 30, 0.2); /*滚动条轨迹组成部分的颜色*/
  }
  .searchInp button {
    width: 8%;
    height: 100%;
    background: #288770 url('../../assets/img/search.png') center center / 30% no-repeat;
    border: none;
    border-radius: 0 1.5rem 1.5rem 0;
  }
  .serachHistory {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    width: 55%;
    height: 10rem;
    background: rgba(40, 135, 112, .5);
    overflow-y: scroll;
  }
  .serachHistory li {
    color: #fff;
    padding: 0.2rem 2rem;
  }
  .tip {
    position: absolute;
    bottom: -15%;
    left: 50%;
    transform: translate(-50%);
    color: red;
  }
</style>
