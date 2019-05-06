<style scoped>
  .inforloopholeDetail {
    width: 80%;
    margin: 10px auto;
    border: 1px solid #157150;
    padding: 20px;
  }
  .inforloopholeDetail_title {
    position: relative;
    border-bottom: 1px solid #157150;
    padding-bottom: 1%;
  }
  .inforloopholeDetail_title i {
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
    margin: 1% 0;
  }
  hr {
    margin: 10px 10px 10px 0;
  }
  table {
    width: 100%;
  }
  tr {
    height: 40px;
  }
  td {
    border: 1px solid #157150;
    line-height: 25px;
  }
  .tdClass1 {
    width: 200px;
    text-align: right;
    padding-right: 20px;
  }
  .tdClass2 {
    padding-left: 20px;
  }
  .relatedTrend {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    margin-top: 20px;
  }
  .mycharts {
    height: 300px;
  }
  .inforloopholeDetail_body {
    display: flex;
    border: 1px solid #ccc;
    margin-bottom: 20px;
  }
  .inforloopholeDetail_body_left {
    width: 180px;
    height: 180px;
    margin: 10px;
  }
  .inforloopholeDetail_body_left img {
    height: 180px;
  }
  .inforloopholeDetail_body_right {
    margin: 10px;
    padding: 20px;
  }
  .title {
    font-size: 17px;
    font-weight: bold;
  }
  .paragraph {
    height: 80px;
    padding-top: 20px;
    font-size: 15px;
    line-height: 25px;
  }
  .dateInfo {
    display: flex;
    justify-content: space-between;
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
    outline: none;
  }
  a {
    color: #157150;
    text-decoration: underline;
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
  .inforloopholeDetail_container .el-progress {
    display: inline-block;
    width: 100px;
  }
  .inforloopholeDetail_container .el-progress-bar__inner {
    border-radius: 0;
    background: linear-gradient(to right, #0F7B65, #24D5B4)
  }
  .inforloopholeDetail_container .el-progress__text {
    display: none;
  }
  .inforloopholeDetail_container .el-progress-bar__outer {
    background: #fff;
    border-radius: 0;
  }
  .inforloopholeDetail_container .el-progress-bar {
    margin: 0;
    padding: 0;
  }
  .inforloopholeDetail_container .el-tabs__nav {
    width: 100%;
  }
  .inforloopholeDetail_container .el-tabs__item {
    width: 25%;
  }
  .inforloopholeDetail_container .el-tabs__item:last-of-type {
    border-right: none;
  }
  .inforloopholeDetail_container .el-pager .active {
    border-color: #0E6A55!important;
    background-color: #0E6A55!important;
  }
</style>
<template>
  <div class="inforloopholeDetail_container">
    <div class="inforloopholeDetail">
      <div class="inforloopholeDetail_title">
        <h1 class="title">{{ res.title }}</h1>
        <i @click="back"></i>
      </div>
      <h3>{{ $t('messages.detail.essentialInfo') }}</h3>
      <table>
        <tbody>
          <tr>
            <td class="tdClass1">{{ $t('messages.inforloopholeDetail.title') }}</td>
            <td class="tdClass2">{{ res.number }}</td>
          </tr>
          <tr>
            <td class="tdClass1">{{ $t('messages.inforloopholeDetail.openDate') }}</td>
            <td class="tdClass2">{{ res.openTime }}</td>
          </tr>
          <tr v-if="res.bid != null">
            <td class="tdClass1">BIDS_NUM</td>
            <td class="tdClass2">{{ res.bid }}</td>
          </tr>
          <tr v-if="res.cve != null && $i18n.locale === 'zh'">
            <td class="tdClass1">CVES_NUM</td>
            <td class="tdClass2">{{ res.cve }}</td>
          </tr>
          <tr v-if="$i18n.locale === 'zh'">
            <td class="tdClass1">危害级别</td>
            <td class="tdClass2">
              <el-progress
              :text-inside="false"
              :stroke-width="20"
              :percentage="safeNum"></el-progress>
              {{ res.serverity }}
            </td>
          </tr>
          <tr v-if="$i18n.locale === 'zh'">
            <td class="tdClass1">影响产品</td>
            <td class="tdClass2">{{ res.products }}</td>
          </tr>
          <tr>
            <td class="tdClass1">{{ $t('messages.inforloopholeDetail.vulnerabilityDes') }}</td>
            <td class="tdClass2">{{ res.description }}</td>
          </tr>
          <tr v-if="$i18n.locale === 'zh'">
            <td class="tdClass1">参考链接</td>
            <td class="tdClass2"><a :href="res.referenceLink" target="_black" rel="noopener noreferrer nofollow">{{ res.referenceLink }}</a></td>
          </tr>
          <tr>
            <td class="tdClass1">{{ $t('messages.inforloopholeDetail.vulnerabilitySol') }}</td>
            <td class="tdClass2" v-html="res.formalWay"></td>
          </tr>
          <tr v-if="$i18n.locale === 'zh'">
            <td class="tdClass1">厂商补丁</td>
            <td class="tdClass2"><a :href="res.patchLink" target="_black" rel="noopener noreferrer nofollow">{{ res.patchName }}</a></td>
          </tr>
          <tr v-if="$i18n.locale === 'zh'">
            <td class="tdClass1">验证信息</td>
            <td class="tdClass2">{{ res.ver_info }}</td>
          </tr>
          <tr>
            <td class="tdClass1">{{ $t('messages.inforloopholeDetail.deliveryTime') }}</td>
            <td class="tdClass2">{{ res.submitTime }}</td>
          </tr>
          <tr>
            <td class="tdClass1">{{ $t('messages.inforloopholeDetail.collectionTime') }}</td>
            <td class="tdClass2">{{ coll_time }}</td>
          </tr>
          <tr>
            <td class="tdClass1">{{ $t('messages.inforloopholeDetail.updateTime') }}</td>
            <td class="tdClass2">{{ update_time }}</td>
          </tr>
          <tr v-if="$i18n.locale === 'zh'">
            <td class="tdClass1">漏洞附件</td>
            <td class="tdClass2">{{ res.attachment }}</td>
          </tr>
        </tbody>
      </table>
      <!-- <div class="relatedTrend">
        <h3>相关趋势</h3>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div id="mycharts" class="mycharts"></div>
      <h3>相关详情</h3>
      <hr> -->
      <!-- <div> -->
        <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="相关资讯" name="first">
            <div class="inforloopholeDetail_body">
              <div class="inforloopholeDetail_body_left">
                <img src="../../../static/img/safe_pt.png">
              </div>
              <div class="inforloopholeDetail_body_right">
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
          <el-tab-pane label="相关漏洞" name="second" class="eltab">
            <div class="inforloopholeDetail_body">
              <div class="inforloopholeDetail_body_left">
                <img src="../../../static/img/safe_pt.png">
              </div>
              <div class="inforloopholeDetail_body_right">
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
            <div class="inforloopholeDetail_body">
              <div class="inforloopholeDetail_body_left">
                <img src="../../../static/img/safe_pt.png">
              </div>
              <div class="inforloopholeDetail_body_right">
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
          <el-tab-pane label="相关基因" name="third" class="eltab">
            <div class="inforloopholeDetail_body">
              <div class="inforloopholeDetail_body_left">
                <img src="../../../static/img/safe_pt.png">
              </div>
              <div class="inforloopholeDetail_body_right">
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
          <el-tab-pane label="相关黑客&工具" name="fourth" class="eltab">
            <div class="inforloopholeDetail_body">
              <div class="inforloopholeDetail_body_left">
                <img src="../../../static/img/safe_pt.png">
              </div>
              <div class="inforloopholeDetail_body_right">
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
            <div class="inforloopholeDetail_body">
              <div class="inforloopholeDetail_body_left">
                <img src="../../../static/img/safe_pt.png">
              </div>
              <div class="inforloopholeDetail_body_right">
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
        </el-tabs> -->
        <!-- 分页 -->
        <!-- <div class="page">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="50"
            :page-size="20"
            :pager-count="5"
            @current-change="handleCurrentChange"
            ></el-pagination>
        </div> -->
      <!-- </div> -->
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
      activeName: 'first',
      isSave: false,
      options: [{
        value: '选项1',
        label: '近十日趋势'
      }, {
        value: '选项2',
        label: '近一年趋势'
      }, {
        value: '选项3',
        label: '近一个月趋势'
      }],
      value: '',
      res: [],
      safeNum: 0,
      coll_time: '',
      update_time: ''
    }
  },
  mounted() {
    if (this.$i18n.locale === 'zh') {
      api.getInforLoophole('', '', this.$route.query.id).then(res => {
        if (res.status === 200) {
          for (var i = 0; i < res.data.results.length; i++) {
            this.res = res.data.results[0]
            if (this.res.serverity === '低') {
              this.safeNum = Math.ceil(Math.random() * 30)
            } else if (this.res.serverity === '中') {
              this.safeNum = Math.ceil(Math.random() * 30 + 40)
            } else if (this.res.serverity === '高') {
              this.safeNum = Math.ceil(Math.random() * 30 + 70)
            }
            this.coll_time = this.res.coll_time.substr(0, 10)
            this.update_time = this.res.update_time.substr(0, 10)
          }
          return
        }
      })
    } else {
      api.getInforLoopholeEn('', '', this.$route.query.id).then(res => {
        if (res.status === 200) {
          for (var i = 0; i < res.data.results.length; i++) {
            this.res = res.data.results[0]
            this.res.number = this.res.cve_id
            this.res.openTime = this.res.modify_time
            if (this.res.reference !== 'None') {
              let reference = JSON.parse(this.res.reference.replace(/'/g, '"'))
              let referenceArr = []
              for (var j in reference) {
                referenceArr.push(j)
              }
              this.res.formalWay = ''
              referenceArr.forEach(res => {
                this.res.formalWay += (res + '<br />')
              })
            }
            this.res.submitTime = this.res.publish_time
            this.coll_time = this.res.create_time.split('T').join(' ')
            this.update_time = this.res.update_time.split('T').join(' ')
          }
          return
        }
      })
    }
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
  },
  methods: {
    back () {
      this.$router.go(-1)
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
    handleCurrentChange() {},
    drawLine() {
      window.addEventListener('resize', function() {
        this.myLine.resize()
      }.bind(this))
    }
  },
  destroyed () {
    // this.myLine.clear()
  }
}
</script>