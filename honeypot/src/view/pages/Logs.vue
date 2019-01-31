<template>
  <div class="logs-view" v-if="logShow">
    <div class="searchBar">
      <input type="" name="" v-model="searchInfo" :placeholder="$t('messages.logs.searchCont')" @keyup.enter="doSearch">
      <button class="handCursor" @click="doSearch"></button>
    </div>
    <div class="logsList">
      <div v-if="searchWord">
        <p class="searchWord">{{ searchWord }}</p>
        <i class="handCursor" @click="reSearch"></i>
      </div>
      <table>
        <tr>
          <th>
            <span>{{ $t('messages.searchDetail.time') }}</span>
            <span @click="sort($event)">
              <i :class="{'green': isSelect, 'grey': !isSelect}"></i>
              <i :class="{'green': !isSelect, 'grey': isSelect}"></i>
            </span>
          </th>
          <th>{{ $t('messages.logs.resources') }}</th>
        </tr>
        <tbody v-if="logDatas.length">
          <tr v-for="(logData, index) in logDatas" :key="index">
            <td>{{ logData.timestamp }}</td>
            <td>
              <pre v-html="logData.source" ref="source"></pre>
              <span class="handCursor" @click="showSource(index, $event)">
                <i></i><p>{{ $t('messages.logs.detail') }}</p>
              </span>
            </td>
          </tr>
        </tbody>
        <tbody v-else>{{ $t('messages.logs.noResult') }}</tbody>
      </table>
    </div>
    <el-pagination
      v-if="total"
      layout="prev, pager, next"
      prev-text="<"
      next-text=">"
      :page-size="20"
      :total="total"
      :current-page="currentPage"
      @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { Loading } from 'element-ui'
import api from '@/api/api'
export default {
  data () {
    return {
      logShow: false,
      isSelect: false,
      logDatas: [],
      searchInfo: '',
      searchWord: '',
      total: 0,
      currentPage: Number(this.$route.query.page) || 1
    }
  },
  computed: {
    ...mapGetters(['language'])
  },
  watch: {
    language (val) {
      if (this.searchWord !== '') {
        this.searchWord = this.$t('messages.logs.logSearchTip')
      }
    }
  },
  mounted () {
    this.urlChange(this.$route.query.page || 1, this.$route.query.search)
    this.getData((this.$route.query.page || 1), this.$route.query.search)
    this.searchWord = this.$route.query.search
  },
  methods: {
    // 获取数据
    getData (from, search = null, sort = 'desc') {
      Loading.service({
        background: 'rgba(0, 0, 0, 0)'
      })
      api.get('log', {from: Number(from), search: search, sort: sort}).then(resData => {
        Loading.service().close()
        this.logShow = true
        this.total = 0
        if (document.querySelector('.logs-view')) document.querySelector('.logs-view').scrollTop = 0
        if (resData.res.hits) this.total = resData.res.hits.total >= 998 * 20 ? 998 * 20 : resData.res.hits.total
        this.logDatas = []
        var datas = resData.res.hits.hits
        for (var i = 0; i < datas.length; i++) {
          var timeData = datas[i]._source['@timestamp'].split('T').join(' ').split('Z')[0].split('.')[0]
          this.logDatas.push({'timestamp': timeData, 'source': datas[i]})
        }
      }).then(() => {
        if (search) {
          let content = document.getElementsByTagName('pre')
          for (var j = 0; j < content.length; j++) {
            content[j].innerHTML = this.search_do(content[j].innerHTML, search)
          }
        }
      }).catch(() => {
        Loading.service().close()
      })
    },
    // 搜索内容高亮显示
    search_do (content, keyWord) {
      var keyWordArr = keyWord.replace(/[\s]+/g, ' ').split(' ')
      var re
      for (var n = 0; n < keyWordArr.length; n++) {
        re = new RegExp('' + keyWordArr[n] + '', 'gmi')
        if (content) {
          let contents = content.replace(re, '<span style="color:#fff;background-color:#288770">' + keyWordArr[n] + '</span>')
          return contents
        }
      }
    },
    // 搜索
    doSearch () {
      if (this.searchInfo !== '') {
        this.urlChange(1, this.searchInfo)
        this.getData(1, this.searchInfo)
        this.searchWord = this.searchInfo
        this.searchInfo = ''
      } else {
        this.searchWord = this.$t('messages.logs.logSearchTip')
        setTimeout(() => {
          this.searchWord = ''
        }, 3000)
      }
    },
    // 改变url
    urlChange (page, search) {
      if (!search) {
        search = ''
      }
      location.href = location.href.split('?')[0] + '?page=' + page + '&search=' + search
      this.currentPage = Number(page)
    },
    // 展开折叠
    showSource (index, e) {
      if (this.$refs.source[index].getAttribute('class') !== 'autoHeight') {
        this.$refs.source[index].className = 'autoHeight'
        e.currentTarget.firstChild.className = 'fold'
        e.currentTarget.lastChild.innerText = this.$t('messages.logs.fold')
      } else {
        this.$refs.source[index].className = ''
        e.currentTarget.firstChild.className = ''
        e.currentTarget.lastChild.innerText = this.$t('messages.logs.detail')
      }
    },
    // 分页
    handleCurrentChange (val) {
      this.urlChange(val, this.$route.query.search)
      this.getData(val, this.$route.query.search)
    },
    // 排序
    sort (e) {
      if (e.target.parentNode.firstChild.getAttribute('class') === 'green') {
        // 正序
        this.isSelect = false
        this.urlChange(1, this.$route.query.search)
        this.getData(1, this.$route.query.search, 'desc')
      } else {
        // 倒序
        this.isSelect = true
        this.urlChange(1, this.$route.query.search)
        this.getData(1, this.$route.query.search, 'asc')
      }
    },
    // 重新搜索
    reSearch () {
      this.urlChange(1, '')
      this.getData(1)
      this.searchWord = ''
    }
  }
}
</script>
<style scoped>
  .logs-view {
    height: calc(100% - 5.5rem);
    overflow-y: scroll;
  }
  .searchBar {
    display: flex;
    width: 55%;
    height: 2.5rem;
    margin: 0 auto 2%;
  }
  .searchBar input {
    width: 92%;
    height: calc(100% - 2px);
    color: #fff;
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
  .searchBar button {
    width: 8%;
    height: 100%;
    background: #288770 url('../../assets/img/search.png') center center / 30% no-repeat;
    border: none;
    border-radius: 0 1.5rem 1.5rem 0;
  }
  .logsList {
    width: 100%;
    color: #01c59c;
    padding: 0 2rem 2rem;
    box-sizing: border-box;
  }
  .logsList > div {
    display: flex;
    justify-content: space-between;
  }
  .searchWord {
    font-size: 1.2rem;
    font-weight: bold;
  }
  .logsList > div > i {
    display: inline-block;
    width: 3rem;
    height: 2rem;
    background: url('../../assets/img/back.png') center center / 100% no-repeat;
  }
  .logsList table {
    width: 100%;
  }
  tr {
    position: relative;
    border-bottom: 1px solid #017d63;
  }
  th {
    font-size: 1.2rem;
    padding: 1rem 0;
  }
  th span {
    display: inline-block;
    vertical-align: middle;
    margin-right: 0.5rem;
  }
  th span i {
    display: block;
    width: 10px;
    height: 5px;
    margin-left: 5%;
    cursor: pointer;
    background-position:  center center;
    background-size: cover;
    background-repeat: no-repeat;
  }
  th span i:last-child {
    margin-top: 3px;
    transform: rotate(180deg);
  }
  .green {
    background-image: url('../../assets/img/greenTriangle.png');
  }
  .grey {
    background-image: url('../../assets/img/greyTriangle.png');
  }
  td {
    padding: 1rem 0;
    font-size: 0.8rem;
  }
  td:first-of-type {
    width: 20%;
    min-width: 150px;
    text-align: center;
  }
  td:last-of-type {
    position: relative;
    width: 80%;
    line-height: 1rem;
  }
  td pre {
    width: calc(100% - 10rem);
    height: 10rem;
    white-space: pre-wrap;
    white-space: -moz-pre-wrap;
    white-space: -pre-wrap;
    white-space: -o-pre-wrap;
    word-wrap: break-word;
    overflow: hidden;
  }
  td pre.autoHeight {
    height: auto;
  }
  td > span {
    position: absolute;
    right: 0;
    bottom: 1rem;
    display: flex;
    align-items: center;
  }
  td > span i {
    display: inline-block;
    width: 1rem;
    height: 0.6rem;
    background: url('../../assets/img/open.png') center center / cover no-repeat;
  }
  td > span i.fold {
    transform: rotateZ(180deg);
    transition: transform .3s,-webkit-transform .3s;
  }
  td > span > p {
    padding: 0 1rem;
  }
</style>
