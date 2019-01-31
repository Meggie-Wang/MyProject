<style scoped>
  .safeInforDetail {
    width: 80%;
    margin: 0 auto;
  }
  .title {
    margin: 5% 0 2%;
    font-weight: bold;
    font-size: 22px;
    text-align: center;
  }
  .title i {
    position: absolute;
    left: 20%;
    display: inline-block;
    width: 40px;
    height: 30px;
    background: url(../../../static/img/icon.png) -250px 0 no-repeat;
    cursor: pointer;
  }
  .time {
    display: block;
    color: #1C7C5A;
    font-weight: bold;
    text-align: center;
  }
  .safeDetail_body {
    margin: 3% 0 2%;
    padding: 0 5%;
  }
  .safeDetail_body p {
    line-height: 30px;
    font-size: 15px;
    text-indent: 30px;
  }
  .heatDegree {
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
    color: #0088DB;
    text-decoration:none;
  }
  a:hover {
    color:#2A5E8E
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
  .Share {
    width: 22px;
    height: 22px;
  }
  .comment {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    line-height: 30px;
  }
  .comment p {
    color: #1C7C5A;
    font-weight: bold;
  }
  .line {
    width: 95%;
    height: 0;
  }
  .saySth {
    margin: 20px 0;
    text-align: center;
  }
  textarea {
    width: 90%;
    border-color: #1C7C5A;
    border-radius: 5px;
    padding: 1%;
    outline: none;
    resize: none;
  }
  .submit {
    width: 90%;
    margin: 0 auto;
    text-align: end;
  }
  .submit button {
    width: 60px;
    height: 30px;
    background-color: #1C7C5A;
    color: #fff;
    margin-bottom: 10px;
    border: none;
    outline: none;
    cursor: pointer;
  }
  .message {
    margin-bottom: 30px;
  }
  .someone {
    width: 90%;
    margin: 2% auto 0;
  }
  .someone_top div {
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    vertical-align: middle;
  }
  .someone_top div img {
    width: 100%;
    height: 100%;
  }
  .someone_name {
    display: inline-block;
    margin: 10px auto 10px 10px;
    font-weight: bold;
    font-size: 15px;
  }
  .someone_say_body {
    margin: auto 10px auto 40px;
  }
  .someone_say_body p {
    line-height: 22px;
    margin-bottom: 10px;
    font-size: 14px;
    text-indent: 28px;
  }
  .date {
    color: #1C7C5A;
    font-size: 14px;
    font-weight: bold;
  }
</style>
<template>
  <div>
    <div class="safeInforDetail">
      <h1 class="title">{{safeInforDetailDatas.article_name}}<i @click="back"></i></h1>
      <span class="time">{{safeInforDetailDatas.article_time}}</span>
      <div class="safeDetail_body">
        <p v-for="content in contents" v-html="content"></p>
      </div>
      <!-- <div class="heatDegree">
        <span><i></i>123</span>
        <span><i></i>234</span>
        <span><i @click="Share" class="Share"></i>345</span>
        <span id="collection">
          <i @click="save"></i>
          <span id="share">789</span>
        </span>
      </div>
      <div class="comment"><p>评论</p><hr class="line"></div>
      <div class="saySth">
        <textarea rows="5" placeholder="说点什么……"></textarea>
      </div>
      <div class="submit">
        <button>发布</button>
      </div>
      <div class="message">
        <div class="someone">
          <div class="someone_top">
            <div>
              <img src="../../../static/img/safe_pt.png">
            </div>
            <p class="someone_name">戎磐网络</p>
          </div>
          <div class="someone_say_body">
            <p>根据Imperva的说法，被命名为RedisWannaMine的恶意攻击活动，已经将目标瞄准数据库服务器和应用服务器。较之于无论是复杂性和攻击能力均颇为有限的第一代加密技术（通常是植入恶意代码，在下载加密矿工可执行文件后，使用某种基本逃避技术或根本不适用任何规避技术来运行该文件），这一波的威胁截然不同。就规避技术和能力而言，RedisWannaMine的复杂度更高，它有类似蠕虫的行为，同时还结合使用了先进的漏洞利用工具来增加攻击者的感染率。</p>
            <span class="date">2018-3-14</span>
          </div>
        </div>
        <div class="someone">
          <div class="someone_top">
            <div>
              <img src="../../../static/img/safe_pt.png">
            </div>
            <p class="someone_name">戎磐网络</p>
          </div>
          <div class="someone_say_body">
            <p>根据Imperva的说法，被命名为RedisWannaMine的恶意攻击活动，已经将目标瞄准数据库服务器和应用服务器。较之于无论是复杂性和攻击能力均颇为有限的第一代加密技术（通常是植入恶意代码，在下载加密矿工可执行文件后，使用某种基本逃避技术或根本不适用任何规避技术来运行该文件），这一波的威胁截然不同。就规避技术和能力而言，RedisWannaMine的复杂度更高，它有类似蠕虫的行为，同时还结合使用了先进的漏洞利用工具来增加攻击者的感染率。</p>
            <span class="date">2018-3-14</span>
          </div>
        </div>
      </div> -->
    </div>
    <div class="build">
      <img src="../../../static/img/building.png">
    </div>
  </div>
</template>
<script>
import api from '../../api/ipApi'
export default {
  data() {
    return {
      isSave: false,
      id: this.$route.query.id,
      safeInforDetailDatas: [],
      contents: []
    }
  },
  mounted() {
    api.safeArticle(this.id, '', '').then((res) => {
      res.data.article_time = res.data.article_time.split('T').join(' ')
      if (res) {
        this.safeInforDetailDatas = res.data
        var data = JSON.parse(this.safeInforDetailDatas.content)
        for (var i = 0; i < data.length; i++) {
          if (data[i].type !== 'img') {
            this.contents.push(data[i].value)
          } else {
            var img = '<img style="max-width: 100%;display: block;margin: 2% auto;" src=' + api.securityHeadPic + data[i].value + ' />'
            this.contents.push(img)
          }
        }
      }
    })
  },
  methods: {
    back() {
      this.$router.push({path: '/safeInfor'})
    },
    save() {
      $('#collection i').toggleClass('collect')
      this.isSave = !this.isSave;
      var num = document.getElementById('share')
      if (this.isSave) {
        num.innerText = parseInt(num.innerText) + 1
      } else {
        num.innerText = parseInt(num.innerText) - 1
      }
    },
    Share() {
      $('.Share').click(function() {
        $('.build').slideDown(200)
      })
      $(document).mouseup(function(e) {
        var _con = $('.build')
        if (!_con.is(e.target) && _con.has(e.target).length === 0) {
          $('.build').slideUp(200)
        }
      })
    }
  }
}
</script>