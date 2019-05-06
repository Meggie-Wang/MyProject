<style scoped>
  .safeInfor {
    width: 80%;
    margin: 0 auto;
  }
  .safeInfor_input {
    display: flex;
    width: 65%;
    margin: 1% auto;
  }
  .safeInfor_input input {
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
  .safeInfor_input button {
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
  .safeInfor_input button i {
    display: block;
    width: 20px;
    height: 20px;
    margin: 0 auto;
    background: url('../../../static/img/icon.png') -208px -103px no-repeat;
  }
  .safeInfortip {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    color: red;
    font-size: 12px;
  }
  .el-tabs {
    margin-top: 3%;
  }
  .safeInfor_body {
    display: flex;
    border: 1px solid #ccc;
    margin-bottom: 20px;
  }
  .safeInfor_body_left {
    display: flex;
    align-items: center;
    width: 180px;
    margin: 10px;
  }
  .safeInfor_body_left img {
    width: 100%;
  }
  .safeInfor_body_right {
    width: 100%;
    padding: 2% 2% 1%;
  }
  .title {
    font-size: 17px;
    font-weight: bold;
    color: #1C7C5A;
    cursor: pointer;
  }
  .paragraph {
    height: 50px;
    padding-top: 1%;
    font-size: 15px;
    line-height: 25px;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    /* autoprefixer: off */
    -webkit-box-orient: vertical;
    /* autoprefixer: on */
  }
  .dateInfo {
    display: flex;
    justify-content: space-between;
    margin-top: 2%;
  }
  .date {
    color: #1C7C5A;
    font-weight: bold;
  }
  .heatDegree {
    width: 80%;
    text-align: end;
    user-select: none;
    font-size: 14px;
    line-height: 20px;
  }
  .heatDegree span {
    color: #1C7C5A;
    margin-right: 2%;
  }
  .heatDegree span:last-of-type {
    margin-right: 0;
  }
  .heatDegree span i {
    display: inline-block;
    width: 20px;
    height: 20px;
    vertical-align: sub;
    margin-right: 1%;
    cursor: pointer;
  }
  .heatDegree span:first-of-type i {
    background: url(../../../static/img/icon.png) -208px -5px no-repeat;
  }
  .heatDegree span:nth-of-type(2) i {
    background: url(../../../static/img/icon.png) -155px -55px no-repeat;
  }
  .heatDegree span:nth-of-type(3) i {
    background: url(../../../static/img/icon.png) -155px -102px no-repeat;
  }
  #collection i {
    background: url(../../../static/img/icon.png) -102px -55px no-repeat;
  }
  #collection i.collect {
    background: url(../../../static/img/icon.png) -53px -55px no-repeat;
  }
  /*分享弹出css*/
  a:focus {
    outline:none
  }
  a {
    color: #333;
    text-decoration: none;
  }
  .build {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 600px;
    margin: -180px 0 0 -330px;
    background-color: #fff;
    z-index: 9999;
    display: none;
  }
  /*弹出标题下划线*/
  .build-poptit {
    border-bottom:1px solid #ddd;
    padding:12px;
    position: relative;
  }
  /*X样式*/
  .build-poptit .close {
    float: right;
    color: #999;
    padding: 5px;
    margin: -2px -5px -5px;
    font: bold 14px/14px simsun;
    text-shadow: 0 1px 0 #ddd
  }
  /*X颜色*/
  .build-poptit .close:hover {
    color: #444;
  }
  .build img {
    border: 0; 
  }
</style>
<style>
  .safeInfor .el-tabs__nav {
    float: none;
  }
  .safeInfor .el-tabs__item {
    width: 50%;
    border-right: 2px solid #157150;
    text-align: center;
  }
  .safeInfor .el-tabs__item:last-of-type {
    border-right: none;
  }
  .safeInfor .el-tabs__item.is-active,
  .safeInfor .el-tabs__item:hover {
    color: #157150;
  }
  .safeInfor .el-tabs__active-bar {
    background-color: #157150;
  }
  .safeInfor .pagination {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    line-height: 30px;
    margin-bottom: 20px;
  }
  .safeInfor .pagination li {
    margin-left: 1rem;
  }
  .safeInfor .pagination li a {
    display: flex;
    justify-content: space-around;
    align-items: center;
    min-width: 30px;
    height: 28px;
    background: #f4f4f5;
    white-space: nowrap;
    border-radius: 2px;
    outline: none;
    user-select: none;
  }
  .safeInfor .page-item.active a {
    background: #017d63;
    color: #fff;
  }
  .safeInfor .pagination li a:hover {
    color: #017d63;
  }
  .safeInfor .page-item.active a:hover {
    color: #fff;
  }
</style>
<template>
  <div>
    <div class="safeInfor">
      <div class="safeInfor_input">
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
      <p class="safeInfortip">{{ tip }}</p>
      <el-tabs v-model="urlActive.activeName" @tab-click="handleClick">
        <el-tab-pane label="安全文章" name="first" v-if="$i18n.locale === 'zh'">
          <div
            class="safeInfor_body"
            v-for="(articleData, index) in articleDatas"
            :key="index">
            <div class="safeInfor_body_left" @click="getSafeInforDetail(articleData.article_id)">
              <img :src="articleData.img_src" @error="imgErr(index)">
            </div>
            <div class="safeInfor_body_right">
              <div @click="getSafeInforDetail(articleData.article_id)">
                <h1 class="title">{{articleData.article_name}}</h1>
                <div class="paragraph">{{articleData.summary}}</div>
              </div>
              <div class="dateInfo">
                <p class="date">{{articleData.article_time}}</p>
                <!-- <div class="heatDegree">
                  <span><i></i>123</span>
                  <span><i></i>234</span>
                  <span><i @click="Share"></i>345</span>
                  <span id="collection">
                    <i @click="save($event, index)"></i><span id="share">789</span>
                  </span>
                </div> -->
              </div>
            </div>
          </div>
          <paginate
            v-if="articleTotal"
            :page-count="Math.ceil(articleTotal / 20)"
            :page-range="5"
            :margin-pages="1"
            :click-handler="articleChange"
            :prev-text="'<'"
            :next-text="'>'"
            :container-class="'pagination'"
            :page-class="'page-item'"
            :initial-page="Number(this.$route.query.page1 - 1)"></paginate>
        </el-tab-pane>
        <el-tab-pane :label="$t('messages.securityInformation.securityInfo')" name="second">
          <div class="safeInfor_body" v-for="inforData in inforDatas">
            <a :href="inforData.link" target="_black" rel="noopener noreferrer nofollow" class="safeInfor_body_right">
              <h1 class="title">{{inforData.title}}</h1>
              <div class="paragraph">{{inforData.summary}}</div>
              <div class="dateInfo">
                <p class="date">{{inforData.published}}</p>
                <div class="heatDegree">
                  {{ $t('messages.securityInformation.source') }}：
                  <span>{{inforData.link}}</span>
                </div>
              </div>
            </a>
          </div>
          <paginate
            v-if="inforTotal"
            :page-count="Math.ceil(inforTotal / 20)"
            :page-range="5"
            :margin-pages="1"
            :click-handler="inforChange"
            :prev-text="'<'"
            :next-text="'>'"
            :container-class="'pagination'"
            :page-class="'page-item'"
            :initial-page="Number(this.$route.query.page2 - 1)"></paginate>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="build">
      <img src="../../../static/img/building.png">
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import api from '../../api/ipApi'
import replaceImg from '../../../static/img/safe_pt.png'
export default {
  data() {
    return {
      searchMsg: '',
      tip: '',
      isSave: false,
      articleDatas: [],
      inforDatas: [],
      articleTotal: 0,
      inforTotal: 0,
      urlActive: {
        activeName: 'first',
        page1: 1,
        page2: 1
      },
      replaceImg: replaceImg
    }
  },
  updated () {
    if (this.$i18n !== null) {
      if (this.$i18n.locale === 'en') {
        this.urlActive.activeName = 'second'
      }
    }
  },
  computed: {
    ...mapGetters(['language'])
  },
  watch: {
    language () {
      this.tip = ''
      this.searchMsg = ''
      this.safeArticle('', this.$route.query.page1 || 1, '')
      this.safeInfor(this.$route.query.page2 || 1, '')
      this.urlActive.activeName = this.$route.query.activeName
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
  mounted() {
    this.searchMsg = this.$route.query.search
    if (this.$route.query.activeName) {
      this.urlActive = {
        activeName: this.$route.query.activeName,
        page1: this.$route.query.page1,
        page2: this.$route.query.page2
      }
    }
    this.urlChange(this.urlActive.activeName, this.urlActive.page1 || 1, this.urlActive.page2 || 1, this.$route.query.search)
    this.safeArticle('', this.$route.query.page1 || 1, this.$route.query.search)
    this.safeInfor(this.$route.query.page2 || 1, this.$route.query.search)
  },
  methods: {
    // 安全文章
    safeArticle (id, page, search) {
      var that = this
      // 安全文章
      api.safeArticle(id, page, search).then(articleRes => {
        if (articleRes.status === 200 && articleRes.data.results.length > 0) {
          // 分页页数
          that.articleTotal = articleRes.data.count
          that.articleDatas = articleRes.data.results
          for (let i = 0; i < that.articleDatas.length; i++) {
            if (that.articleDatas[i].img_src.split('.')[1]) {
              that.articleDatas[i].img_src = api.securityHeadPic + that.articleDatas[i].article_id + '/' + that.articleDatas[i].img_src
            } else {
              that.articleDatas[i].img_src = this.replaceImg
            }
            that.articleDatas[i].article_time = that.articleDatas[i].article_time.split('T').join(' ')
          }
        } else {
          this.tip = '请输入正确的搜索内容'
          that.articleDatas = []
          that.articleTotal = 0
        }
      })
      this.tip = ''
    },
    // 安全信息
    safeInfor (page, search) {
      var that = this
      api.safeInfor(page, search).then(inforRes => {
        if (inforRes.status === 200 && inforRes.data.results.length > 0) {
          // 分页页数
          that.inforTotal = inforRes.data.count
          that.inforDatas = inforRes.data.results
          for (var i = 0; i < that.inforDatas.length; i++) {
            that.inforDatas[i].published = that.inforDatas[i].published.split(' -')[0]
          }
        } else {
          this.tip = this.$t('messages.securityInformation.searchTip')
          that.inforDatas = []
          that.inforTotal = 0
        }
      })
      this.tip = ''
    },
    imgErr (index) {
      this.articleDatas[index].img_src = this.replaceImg
    },
    doSearch() {
      var that = this
      var msg = this.searchMsg
      if (!msg) {
        this.tip = this.$t('messages.search.searchTip')
        return
      }
      that.urlChange(this.$route.query.activeName, 1, 1, msg)
      if (that.$i18n.locale === 'zh') {
        if (this.$route.query.activeName === 'first') {
          this.safeArticle('', 1, msg)
        } else if (this.$route.query.activeName === 'second') {
          this.safeInfor(1, msg)
        }
      } else if (that.$i18n.locale === 'en') {
        this.safeInfor(1, msg)
      }
    },
    getSafeInforDetail(id) {
      if (id > 0) {
        this.$router.push({name: 'safeInforDetail', query: {id: id}})
      }
    },
    Share() {
      $('.build').slideDown(200)
      $(document).mouseup(function(e) {
        var _con = $('.build')
        if (!_con.is(e.target) && _con.has(e.target).length === 0) {
          $('.build').slideUp(200)
        }
      })
    },
    save(event, index) {
      // $('#collection i').toggleClass('collect');
      // this.isSave = !this.isSave;
      // var num = document.getElementById('share');
      // if (this.isSave) {
      //   num.innerText = parseInt(num.innerText) + 1;
      // } else {
      //   num.innerText = parseInt(num.innerText) - 1;
      // }
    },
    // tab切换
    handleClick(tab, event) {
      if (this.$i18n.locale === 'zh') {
        this.searchMsg = ''
        this.tip = ''
        this.urlChange(tab.name, this.$route.query.page1 || 1, this.$route.query.page2 || 1, '')
        this.safeArticle('', this.$route.query.page1 || 1, '')
        this.safeInfor(this.$route.query.page2 || 1, '')
      }
    },
    // 安全文章分页
    articleChange(val) {
      if (val) {
        this.urlChange('first', val, this.$route.query.page2 || 1, this.$route.query.search)
        this.safeArticle('', val, this.$route.query.search)
      }
    },
    // 安全信息分页
    inforChange(val) {
      if (val) {
        this.urlChange('second', this.$route.query.page1 || 1, val, this.searchMsg)
        this.safeInfor(val, this.searchMsg)
      }
    },
    urlChange(tabName, page1, page2, search = '') {
      this.urlActive = {
        activeName: tabName,
        page1: 1,
        page2: 1
      }
      location.href = location.href.split('?')[0] + '?activeName=' + tabName + '&page1=' + page1 + '&page2=' + page2 + '&search=' + search
    }
  }
}
</script>