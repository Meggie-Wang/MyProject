<style scoped>
  .safeWords {
    width: 80%;
    margin: 0 auto;
    text-align: center;
  }
  .safeWords_input {
    display: flex;
    width: 65%;
    margin: 1% auto 0;
  }
  .safeWords_input input {
    width: 85%;
    height: 16px;
    color: #1C7C5A;
    border: 1px solid #157150;
    border-right: none;
    border-radius: 25px 0 0 25px;
    padding: 1.5% 1%;
    user-select: none;
    outline: none;
    text-indent: 20px;
    font-size: 14px;
  }
  input::-webkit-input-placeholder {
    color: #1C7C5A;
  }
  /*去除IE下输入框右侧图标*/
  input::-ms-clear, input::-ms-reveal {
    display: none;
  }
  .safeWords_input button {
    width: 10%;
    height: 18px;
    padding: 1.5% 1%;
    background: #0E6A55;
    border: none;
    border-radius: 0 25px 25px 0;
    outline: none;
    user-select: none;
    cursor: pointer;
    box-sizing: content-box;
  }
  .safeWords_input button i {
    display: block;
    width: 20px;
    height: 20px;
    margin: 0 auto;
    background: url('../../../static/img/icon.png') -208px -103px no-repeat;
  }
  .tip {
    color: red;
    text-align: center;
    font-size: 12px;
    margin: 2%;
  }
  .safeWords_body {
    border: 1px solid #169175;
  }
  .safeWords_body_table {
    border-top: 1px solid #169175;
  }
  table {
    width: 100%;
  }
  table tr {
    border-bottom: 1px solid #169175;
  }
  table tr:last-of-type {
    border-bottom: none;
  }
  table th {
    width: 12.5%;
    height: 40px;    
    border-right: 1px solid #169175;
  }
  table th:last-of-type {
    width: 25%;
    border-right: none;
  }
  table td {
    height: 30px;
    border-right: 1px solid #169175;
    border-bottom: 1px solid #169175;
    text-align: center;
  }
  table td:last-of-type {
    border-right: none;
    text-align: left;
    padding: 0 2%;
  }
  .hotNum {
    display: inline-block;
    width: 15%;
  }
  a {
    color: #000;
    text-decoration: none;
  }
</style>
<style>
  .safeWords .el-tabs__nav {
    float: none;
  }
  .safeWords .el-tabs__item {
    width: 50%;
    border-right: 2px solid #157150;
  }
  .safeWords .el-tabs__item:last-of-type {
    border-right: none;
  }
  .safeWords .el-tabs__item.is-active,
  .safeWords .el-tabs__item:hover {
    color: #157150;
  }
  .safeWords .el-tabs__active-bar {
    background-color: #157150;
  }
  .safeWords .el-tabs__header {
    margin: 0;
  }
  .safeWords .el-progress-bar__outer {
    background: #fff;
    border-radius: 0;
  }
  .safeWords .el-progress-bar {
    margin: 0;
    padding: 0;
  }
  .safeWords .el-progress {
    display: inline-block;
    width: 80%;
  }
  .safeWords .el-progress-bar__inner {
    border-radius: 0;
    background: linear-gradient(to right, #0F7B65, #24D5B4)
  }
  .safeWords .el-progress__text {
    display: none;
  }
  .safeWords .el-pagination {
    text-align: right;
    padding-right: 0;
    margin-top: 10px;
  }
  .safeWords .el-pager li.active, .safeWords .el-pager li:hover {
    background: #157150 !important;
    color: #fff !important;
  }
  .safeWords .btn-next, .safeWords .btn-prev, .safeWords .el-pager li {
    background: #f4f4f5;
  }
</style>
<template>
  <div class="safeWords">
    <div class="safeWords_input">
      <input
        v-model="searchMsg"
        :placeholder="$t('messages.securityInformation.securityInfoSearch')"
        class="inp"
        @keyup.enter="doSearch"
        @focus="tip = ''">
      <button @click="doSearch">
        <i></i>
      </button>
    </div>
    <p class="tip">{{ tip }}</p>
    <div class="safeWords_body">
      <div class="safeWords_body_select">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane :label="$t('messages.safetyWords.hotWordsList')" name="first">
            <div class="safeWords_body_table">
              <table>
                <tbody>
                  <tr>
                    <th>{{ $t('messages.safetyWords.ranking') }}</th>
                    <th>{{ $t('messages.safetyWords.hotWords') }}</th>
                    <th>{{ $t('messages.safetyWords.entryTime') }}</th>
                    <th>{{ $t('messages.safetyWords.degreeHeat') }}</th>
                  </tr>
                  <tr v-for="(safeWordData, index) in safeWordDatas" :key="index">
                    <td>{{safeWordData.order}}</td>
                    <td @click="getSafeWordDetail(safeWordData.name)" style="cursor: pointer">{{safeWordData.name}}</td>
                    <td>{{safeWordData.update_time}}</td>
                    <td>
                      <el-progress
                        v-if="safeWordData.hot"
                        :percentage="safeWordData.hot / maxSafeWordHot * 100"
                        :stroke-width="15"></el-progress>
                      <span>{{safeWordData.hot}}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </el-tab-pane>
          <el-tab-pane :label="$t('messages.safetyWords.newHotWords')" name="second">
            <div class="safeWords_body_table">
              <table>
                <tbody>
                  <tr>
                    <th>{{ $t('messages.safetyWords.serialNumber') }}</th>
                    <th>{{ $t('messages.safetyWords.hotWords') }}</th>
                    <th>{{ $t('messages.safetyWords.entryTime') }}</th>
                    <th>{{ $t('messages.safetyWords.degreeHeat') }}</th>
                  </tr>
                  <tr v-for="(newSafeWordData, index) in newSafeWordDatas" :key="index">
                    <td>{{index + 1}}</td>
                    <td @click="getSafeWordDetail(newSafeWordData.name)" style="cursor: pointer">{{newSafeWordData.name}}</td>
                    <td>{{newSafeWordData.update_time}}</td>
                    <td>
                      <el-progress
                        v-if="newSafeWordData.hot"
                        :percentage="newSafeWordData.hot / maxNewSafeWordHot * 100"
                        :stroke-width="15"></el-progress>
                      <span>{{newSafeWordData.hot}}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <el-pagination
      background
      v-if="total"
      background
      layout="prev, pager, next"
      :total="total"
      :page-count="5"
      :page-size="20"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage">
    </el-pagination>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import api from '../../api/ipApi'
export default {
  data() {
    return {
      searchMsg: '',
      tip: '',
      activeName: this.$route.query.activeName,
      safeWordDatas: [],
      newSafeWordDatas: [],
      total: 0,
      currentPage: 1,
      maxSafeWordHot: 0,
      maxNewSafeWordHot: 0
    }
  },
  computed: {
    ...mapGetters(['language'])
  },
  watch: {
    language (val) {
      this.tip = ''
      if (this.$i18n.locale === 'zh') {
        this.searchMsg = ''
        this.urlChange(this.$route.query.activeName, this.$route.query.page, '')
        this.getData(this.$route.query.activeName, this.$route.query.page, this.$route.query.search)
      } else if (this.$i18n.locale === 'en') {
        this.searchMsg = ''
        this.urlChange(this.$route.query.activeName, this.$route.query.page, '')
        this.getEnData(this.$route.query.activeName, this.$route.query.page, this.$route.query.search)
      }
    },
    searchMsg (val) {
      let reg = new RegExp("[`~!@#$%^&*()=|{}':;',\\[\\].<>/?~！@#¥……&*（）——|{}【】‘；：”“'。，、？]")
      let rs = ""
      if (val) {
        for (let i = 0, l = val.length; i < val.length; i++) {
          rs = rs + val.substr(i, 1).replace(reg, '')
        }
        this.searchMsg = rs
      }
    }
  },
  mounted () {
    this.searchMsg = this.$route.query.search
    if (location.href.indexOf('?') === -1) {
      this.urlChange('first', 1)
    }
    this.currentPage = Number(this.$route.query.page)
    if (this.$i18n.locale === 'zh') {
      this.getData(this.$route.query.activeName, this.$route.query.page, this.$route.query.search)
    } else if (this.$i18n.locale === 'en') {
      this.getEnData(this.$route.query.activeName, this.$route.query.page, this.$route.query.search)
    }
  },
  methods: {
    // 中文状态下获取数据
    getData (activeName, page, search) {
      if (activeName === 'first') {
        this.activeName = 'first'
        api.safeWords(page, search).then(res => {
          if (res.status === 200) {
            this.safeWordDatas = res.data.results
            this.total = res.data.count
            let SafeWordHotArr = []
            for (var i = 0; i < this.safeWordDatas.length; i++) {
              this.safeWordDatas[i].order = Number(page - 1) * 20 + i + 1
              SafeWordHotArr.push(this.safeWordDatas[i].hot)
            }
            this.maxSafeWordHot = Math.max.apply(null, SafeWordHotArr)
          }
        })
      } else if (activeName === 'second') {
        api.safeWords(page, search, 1).then(res => {
          if (res.status === 200) {
            this.newSafeWordDatas = res.data.results
            this.total = res.data.count
            let newSafeWordArr = []
            for (var i = 0; i < this.newSafeWordDatas.length; i++) {
              this.newSafeWordDatas[i].order = Number(page - 1) * 20 + i + 1
              newSafeWordArr.push(this.newSafeWordDatas[i].hot)
            }
            this.maxNewSafeWordHot = Math.max.apply(null, newSafeWordArr)
          }
        })
      }
    },
    // 英文状态下获取数据
    getEnData (activeName, page, search) {
      if (activeName === 'first') {
        this.activeName = 'first'
        api.safeWordsEn(page, search).then(res => {
          if (res.status === 200) {
            this.safeWordDatas = res.data.results
            this.total = res.data.count
            let SafeWordHotArr = []
            for (var i = 0; i < this.safeWordDatas.length; i++) {
              this.safeWordDatas[i].order = Number(page - 1) * 20 + i + 1
              SafeWordHotArr.push(this.safeWordDatas[i].hot)
            }
            this.maxSafeWordHot = Math.max.apply(null, SafeWordHotArr)
          }
        })
      } else if (activeName === 'second') {
        api.safeWordsEn(page, search, 1).then(res => {
          if (res.status === 200) {
            this.newSafeWordDatas = res.data.results
            this.total = res.data.count
            let newSafeWordArr = []
            for (var i = 0; i < this.newSafeWordDatas.length; i++) {
              this.newSafeWordDatas[i].order = Number(page - 1) * 20 + i + 1
              newSafeWordArr.push(this.newSafeWordDatas[i].hot)
            }
            this.maxNewSafeWordHot = Math.max.apply(null, newSafeWordArr)
          }
        })
      }
    },
    // 改变url
    urlChange(tabName, page, search = '') {
      location.href = location.href.split('?')[0] + '?activeName=' + tabName + '&page=' + page + '&search=' + search
    },
    // tab切换
    handleClick(tab) {
      this.searchMsg = ''
      this.currentPage = 1
      this.urlChange(tab.name, 1, '')
      if (this.$i18n.locale === 'zh') {
        this.getData(tab.name, 1, '')
      } else if (this.$i18n.locale === 'en') {
        this.getEnData(tab.name, 1, '')
      }
    },
    // 搜索
    doSearch() {
      if (this.searchMsg) {
        this.urlChange(this.$route.query.activeName, 1, this.searchMsg)
        if (this.$i18n.locale === 'zh') {
          this.getData(this.$route.query.activeName, 1, this.searchMsg)
        } else if (this.$i18n.locale === 'en') {
          this.getEnData(this.$route.query.activeName, 1, this.searchMsg)
        }
      } else {
        this.tip = this.$t('messages.search.searchTip')
      }
    },
    // 分页
    handleCurrentChange(val) {
      this.urlChange(this.$route.query.activeName, val, this.$route.query.search)
      if (this.$i18n.locale === 'zh') {
        this.getData(this.$route.query.activeName, val, this.$route.query.search)
      } else if (this.$i18n.locale === 'en') {
        this.getEnData(this.$route.query.activeName, val, this.$route.query.search)
      }
    },
    // 跳转详情
    getSafeWordDetail (name) {
      this.$router.push({path: '/safeWordsDetail', query: {name: name}})
    }
  }
}
</script>