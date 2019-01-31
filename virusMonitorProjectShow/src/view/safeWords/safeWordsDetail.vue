<style scoped>
  .safeWordsDetail {
    width: 80%;
    margin: 10px auto;
    border: 1px solid #157150;
    padding: 10px;
    box-sizing: border-box;
  }
  .safeWordsDetail > div {
    margin-top: 2%;
  }
  .safeWordsDetail_title {
    position: relative;
    border-bottom: 1px solid #157150;
    padding-bottom: 1%;
  }
  .safeWordsDetail_title i {
    position: absolute;
    top: 0;
    right: 5%;
    display: inline-block;
    width: 40px;
    height: 30px;
    background: url(../../../static/img/icon.png) -250px 0 no-repeat;
    cursor: pointer;
  }
  h3 {
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 10px;
  }
  p {
    line-height: 30px;
  }
  .mycharts {
    height: 300px;
  }
  .safeWordsDetail_body {
    display: flex;
    border: 1px solid #ccc;
    margin-bottom: 20px;
  }
  .safeWordsDetail_body_left {
    width: 180px;
    height: 180px;
    margin: 10px;
  }
  .safeWordsDetail_body_left img {
    height: 180px;
  }
  .safeWordsDetail_body_right {
    margin: 10px;
    padding: 20px;
  }
  .title {
    color: #1C7C5A;
    font-size: 17px;
    font-weight: bold;
    cursor: pointer;
  }
  .paragraph {
    height: 50px;
    margin-top: 1%;
    font-size: 15px;
    line-height: 25px;
    cursor: pointer;
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
    align-items: center;
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
    position: relative;
    border-bottom: 1px solid #ddd;
    padding: 12px;
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
  .page {
    text-align: right;
  }
</style>
<style>
  .safeWordsDetail_container .el-tabs__nav {
    width: 100%;
  }
  .safeWordsDetail_container .el-tabs__item {
    width: 25%;
    text-align: center;
  }
  .safeWordsDetail_container .el-tabs__active-bar {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 2px;
    background-color: #157150;
    z-index: 1;
    list-style: none;
  }
  .safeWordsDetail_container .el-tabs__item.is-active,
  .safeWordsDetail_container .el-tabs__item:hover {
    color: #157150;
  }
  .safeWordsDetail_container .pagination {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    line-height: 30px;
    margin-bottom: 20px;
  }
  .safeWordsDetail_container .pagination li {
    margin-left: 1rem;
  }
  .safeWordsDetail_container .pagination li a {
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
  .safeWordsDetail_container .page-item.active a {
    background: #017d63;
    color: #fff;
  }
  .safeWordsDetail_container .pagination li a:hover {
    color: #017d63;
  }
  .safeWordsDetail_container .page-item.active a:hover {
    color: #fff;
  }
</style>
<template>
  <div class="safeWordsDetail_container">
    <div class="safeWordsDetail">
      <div class="safeWordsDetail_title">
        <h1 class="title">{{ name }}</h1>
        <i @click="back"></i>
      </div>
      <!-- <div>
        <h3>{{ $t('messages.detail.essentialInfo') }}</h3>
        <p>{{ $t('messages.detectionQueue.nothing') }}</p>
      </div>
      <div>
        <h3>{{ $t('messages.safeWordsDetail.relatedTrend') }}</h3>
        <div id="mycharts" class="mycharts">{{ $t('messages.detectionQueue.nothing') }}</div>
        <h3>{{ $t('messages.safeWordsDetail.relatedDetail') }}</h3>
      </div> -->
      <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <!-- <el-tab-pane label="相关资讯" name="first">
            <div class="safeWordsDetail_body">
              <div class="safeWordsDetail_body_left">
                <img src="../../../static/img/safe_pt.png">
              </div>
              <div class="safeWordsDetail_body_right">
                <router-link to="/safeInforDetail">
                  <h1 class="title">这里是安全信息标题</h1>
                  <div class="paragraph">这是段落这是段落这是段落这是段落这是段落这是段落这是段落这是段落这是段落这是段落这是段落这是段落这是段落这是段落这是段落这是段落这是段落这是段落这是段落这是段落这是段落这是段落这是段落这是段落</div>
                </router-link>
                <div class="dateInfo">
                  <p class="date">2018-3-13</p>
                  <div class="heatDegree">
                    <span><i></i>123</span>
                    <span><i></i>234</span>
                    <span><i @click="Share"></i>345</span>
                    <span id="collection">
                      <i @click="save"></i><span id="share">789</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane> -->
          <el-tab-pane :label="$t('messages.safeWordsDetail.relatedLoophole')" name="first">
            <div class="safeWordsDetail_body" v-for="(safeWordsDetailData, index) in safeWordsDetailDatas" :key="index">
              <div class="safeWordsDetail_body_left">
                <img src="../../../static/img/safe_pt.png">
              </div>
              <div class="safeWordsDetail_body_right">
                <div @click="inforloopholeDetail(safeWordsDetailData.id)">
                  <h1 class="title">{{safeWordsDetailData.title}}</h1>
                  <div class="paragraph">{{safeWordsDetailData.description}}</div>
                </div>
                <div class="dateInfo">
                  <p class="date">{{safeWordsDetailData.opentime}}</p>
                  <!-- <div class="heatDegree">
                    <span><i></i>123</span>
                    <span><i></i>234</span>
                    <span><i @click="Share"></i>345</span>
                    <span id="collection">
                      <i @click="save"></i><span id="share">789</span>
                    </span>
                  </div> -->
                </div>
              </div>        
            </div>
          </el-tab-pane>
          <!-- <el-tab-pane label="相关基因" name="third">
            <div class="safeWordsDetail_body">
              <div class="safeWordsDetail_body_left">
                <img src="../../../static/img/safe_pt.png">
              </div>
              <div class="safeWordsDetail_body_right">
                <router-link to="/safeInforDetail">
                  <h1 class="title">这里是安全信息标题</h1>
                  <div class="paragraph">这是段落这是段落这是段落这是段落这是段落这是段落这是段落这是段落这是段落这是段落这是段落这是段落这是段落这是段落这是段落这是段落这是段落这是段落这是段落这是段落这是段落这是段落这是段落这是段落</div>
                </router-link>
                <div class="dateInfo">
                  <p class="date">2018-3-13</p>
                  <div class="heatDegree">
                    <span><i></i>123</span>
                    <span><i></i>234</span>
                    <span><i @click="Share"></i>345</span>
                    <span id="collection">
                      <i @click="save"></i><span id="share">789</span>
                    </span>
                  </div>
                </div>
              </div>        
            </div>
          </el-tab-pane>
          <el-tab-pane label="相关黑客&工具" name="fourth">
            <div class="safeWordsDetail_body">
              <div class="safeWordsDetail_body_left">
                <img src="../../../static/img/safe_pt.png">
              </div>
              <div class="safeWordsDetail_body_right">
                <router-link to="/safeInforDetail">
                  <h1 class="title">这里是安全信息标题</h1>
                  <div class="paragraph">这是段落这是段落这是段落这是段落这是段落这是段落这是段落这是段落这是段落这是段落这是段落这是段落这是段落这是段落这是段落这是段落这是段落这是段落这是段落这是段落这是段落这是段落这是段落这是段落</div>
                </router-link>
                <div class="dateInfo">
                  <p class="date">2018-3-13</p>
                  <div class="heatDegree">
                    <span><i></i>123</span>
                    <span><i></i>234</span>
                    <span><i @click="Share"></i>345</span>
                    <span id="collection">
                      <i @click="save"></i><span id="share">789</span>
                    </span>
                  </div>
                </div>
              </div>        
            </div>
            <div class="safeWordsDetail_body">
              <div class="safeWordsDetail_body_left">
                <img src="../../../static/img/safe_pt.png">
              </div>
              <div class="safeWordsDetail_body_right">
                <router-link to="/safeInforDetail">
                  <h1 class="title">这里是安全信息标题</h1>
                  <div class="paragraph">这是段落这是段落这是段落这是段落这是段落这是段落这是段落这是段落这是段落这是段落这是段落这是段落这是段落这是段落这是段落这是段落这是段落这是段落这是段落这是段落这是段落这是段落这是段落这是段落</div>
                </router-link>
                <div class="dateInfo">
                  <p class="date">2018-3-13</p>
                  <div class="heatDegree">
                    <span><i></i>123</span>
                    <span><i></i>234</span>
                    <span><i @click="Share"></i>345</span>
                    <span id="collection">
                      <i @click="save"></i><span id="share">789</span>
                    </span>
                  </div>
                </div>
              </div>        
            </div>
          </el-tab-pane> -->
        </el-tabs>
        <!-- 分页 -->
        <div class="page">
          <paginate
            v-if="total"
            :page-count="Math.ceil(total / 20)"
            :page-range="5"
            :margin-pages="1"
            :click-handler="handleCurrentChange"
            :prev-text="'<'"
            :next-text="'>'"
            :container-class="'pagination'"
            :page-class="'page-item'"
            :initial-page="Number((this.$route.query.page || 1) - 1)"></paginate>
        </div>
      </div>
    </div>
    <div class="build">
      <img src="../../../static/img/building.png">
    </div>
  </div>
</template>
<script>
import api from '../../api/ipApi'
import echarts from 'echarts'
export default {
  data() {
    return {
      name: this.$route.query.name,
      activeName: 'first',
      safeWordsDetailDatas: [],
      total: 0,
      isSave: false
    }
  },
  mounted() {
    // 图表
    // this.myLine = echarts.init(document.getElementById("mycharts"))
    // var option = {
    //   title: {
    //     text: 'Step Line'
    //   },
    //   tooltip: {
    //     trigger: 'axis'
    //   },
    //   legend: {
    //     data: ['Step Start', 'Step Middle', 'Step End']
    //   },
    //   grid: {
    //     left: '3%',
    //     right: '4%',
    //     bottom: '3%',
    //     containLabel: true
    //   },
    //   toolbox: {
    //     feature: {
    //       saveAsImage: {}
    //     }
    //   },
    //   xAxis: {
    //     type: 'category',
    //     data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    //   },
    //   yAxis: {
    //     type: 'value'
    //   },
    //   series: [
    //     {
    //       name: 'Step Start',
    //       type: 'line',
    //       step: 'start',
    //       data: [120, 132, 101, 134, 90, 230, 210]
    //     },
    //     {
    //       name: 'Step Middle',
    //       type: 'line',
    //       step: 'middle',
    //       data: [220, 282, 201, 234, 290, 430, 410]
    //     },
    //     {
    //       name: 'Step End',
    //       type: 'line',
    //       step: 'end',
    //       data: [450, 432, 401, 454, 590, 530, 510]
    //     }
    //   ]
    // }
    // this.myLine.setOption(option, true)
    // this.drawLine()
    // 相关详情
    this.getData(this.$route.query.name, this.$route.query.page)
  },
  methods: {
    getData (name, page = 1) {
      if (this.$i18n.locale === 'zh') {
        api.wordListDetail(name, page).then(res => {
          if (res.status === 200) {
            this.total = res.data[0].count
            this.safeWordsDetailDatas = res.data.slice(1)
          }
        })
      } else if (this.$i18n.locale === 'en') {
        api.wordListDetailEn(name, page).then(res => {
          if (res.status === 200) {
            this.total = res.data[0].count
            this.safeWordsDetailDatas = res.data.slice(1)
          }
        })
      }
    },
    back () {
      this.$router.push({path: '/safeWords'})
    },
    drawLine() {
      window.addEventListener('resize', function() {
        this.myLine.resize()
      }.bind(this))
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
    save() {
      $('#collection i').toggleClass('collect')
      this.isSave = !this.isSave
      var num = document.getElementById('share')
      if (this.isSave) {
        num.innerText = parseInt(num.innerText) + 1
      } else {
        num.innerText = parseInt(num.innerText) - 1
      }
    },
    // 标签页
    handleClick(tab, event) {},
    // 分页
    handleCurrentChange(val) {
      this.urlChange(this.$route.query.name, val)
      this.getData(this.$route.query.name, val)
    },
    // 改变url
    urlChange(name, page) {
      location.href = location.href.split('?')[0] + '?name=' + name + '&page=' + page
    },
    inforloopholeDetail (id) {
      this.$router.push({path: '/inforloopholeDetail', query: {id: id}})
    }
  }
}
</script>