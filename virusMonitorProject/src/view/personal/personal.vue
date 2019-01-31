<style scoped>
  .person {
    color: #169275;
  }
  .personal {
    width: 80%;
    margin: 1% auto;
  }
  .personal h1 {
    line-height: 40px;
    text-indent: 20px;
    font-size: 16px;
    font-weight: bold;
  }
  .personal_body {
    width: 100%;
    border: 2px solid #169275;
  }
  .portrait {
    margin: 1% auto;
    width: 100%;
    text-align: center;
  }
  .portrait div > img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    cursor: pointer;
  }
  .portrait span > img {
    width: 16px;
    height: 16px;
    margin-right: 10px;
  }
  .portrait h3 {
    font-size: 17px;
    font-weight: bold;
  }
  .personal_edit {
    width: 98%;
    margin: 0 auto;
    padding: 3px 0;
    border-top: 2px solid #169275;
  }
  .personal_edit span {
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
  }
  .personal_edit:last-child {
    border-bottom: 2px solid #169275;
    margin-bottom: 30px;
  }
  .personal_edit div {
    display: inline-block;
    line-height: 60px;
  }
  .personal_edit div:first-child {
    font-size: 16px;
    font-weight: bold;
    background: #D4EFEA;
    width: 24%;
    text-align: center;
  }
  .personal_edit div:first-child > img {
    width: 16px;
    height: 16px;
    margin-right: 10px;
    vertical-align: -2px;
  }
  .personal_edit div:nth-child(2) {
    width: 25%;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
  }
  .personal_edit div:nth-child(3) {
    width: 25%;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
  }
  .personal_edit div:last-child {
    width: 24%;
    text-align: center;
  }
  .personal_edit div:last-child > img {
    width: 16px;
    height: 16px;
    margin-right: 10px;
    vertical-align: -2px;
  }
  /* 半透明层 */
  .hyaline {
    position:fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: gray;
    opacity: 0.5;
    display: none;
  }
  /* 弹窗_修改密码 */
  .modify_password {
    position:fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index:9999;
    min-width:500px;
    background-color: #fff;
    border-radius: 20px;
    text-align: center;
    display: none;
  }
  .modify_password p {
    display: flex;
    align-items: center;
    line-height: 50px;
    font-size: 15px;
    margin-top: 20px;
    padding: 2% 5%;
    box-sizing: border-box;
  }
  .modify_password p > span {
    flex: 1;
    font-weight: bold;
    text-align: right;
    line-height: 30px;
    white-space: nowrap;
  }
  .modify_password p > span.en {
    flex: 1.5;
  }
  .modify_password input {
    flex: 2;
    border: 1px solid #ccc;
    height: 25px;
  }
  .modify_password button {
    margin: 20px 0;
    font-weight: bold;
    font-size: 16px;
    color: #fff;
    background: #0D6954;
    border-radius: 7px;
  }
  /* 弹窗_修改手机号 */
  .modify_phone {
    z-index:9999;
    position:fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width:500px;
    background-color: #fff;
    border-radius: 20px;
    text-align: center;
    display: none;
  }
  .modify_phone p {
    display: flex;
    align-items: center;
    line-height: 30px;
    font-size: 15px;
    margin-top: 30px;
    padding: 2% 5%;
  }
  .modify_phone p > span {
    font-weight: bold;
    text-align: right;
    line-height: 30px;
    width: 100px;
    margin-right: 10px;
  }
  .modify_phone p > b {
    display: inline-block;
    width: 300px;
    text-align: left;
  }
  .modify_phone p:nth-child(2) > input {
    border: 1px solid #ccc;
    width: 300px;
    height: 25px;
  }
  .modify_phone p:nth-child(3) > input {
    border: 1px solid #ccc;
    width: 180px;
    height: 25px;
  }
  .modify_phone p:last-of-type {
    justify-content: center;
  }
  .el-button {
    padding: 10px 20px;
  }
  .modify_phone p:nth-child(3) > button {
    margin-left: 10px;
    color: #fff;
    background: #0D6954;
    border-radius: 7px;
  }
  .modify_phone p:last-child > button {
    margin: 10px 0;
    padding: 14px 20px;
    font-weight: bold;
    font-size: 16px;
    color: #fff;
    background: #0D6954;
    border-radius: 7px;
  }
  /* 激活邮箱 */
  .activate {
    z-index:9999;
    position:fixed;
    top: calc(50% - 50px);
    left: calc(50% - 250px);
    width:500px;
    height: 100px;
    background-color: #fff;
    border-radius: 20px;
    text-align: center;
    display: none;
  }
  .activate p {
    line-height: 50px;
  }
  .activate button {
    font-weight: bold;
    font-size: 16px;
    color: #fff;
    background: #0D6954;
    border-radius: 7px;
  }
  /* 修改邮箱 */
  .modify_email {
    z-index:9999;
    position:fixed;
    top: calc(50% - 100px);
    left: calc(50% - 250px);
    width: 500px;
    background-color: #fff;
    border-radius: 20px;
    text-align: center;
    display: none;
  }
  .modify_email p {
    display: flex;
    justify-content: space-around;
    line-height: 30px;
    font-size: 15px;
    text-align: center;
    margin-top: 30px;
    padding-right: 20px;
  }
  .modify_email p > span {
    flex: 1;
    font-weight: bold;
    text-align: right;
    line-height: 30px;
  }
  .modify_email p > b {
    flex: 2;
    text-align: left;
  }
  .modify_email p > input {
    flex: 2;
    border: 1px solid #ccc;
    height: 25px;
  }
  .modify_email button {
    margin: 10px 0;
    padding: 14px 20px;
    font-weight: bold;
    font-size: 16px;
    color: #fff;
    background: #0D6954;
    border-radius: 7px;
  }
</style>
<style>
  .person .el-upload {
    text-decoration: underline;
    line-height: 40px;
  }
  .person .el-upload--picture-card:hover, .el-upload:focus {
    color: #169275;
  }
</style>
<template>
  <div class="person">
    <div class="personal">
      <h1>{{ $t('messages.nav.personalCenter') }}</h1>
      <div class="personal_body">
        <div class="portrait">
          <div><img src="../../../static/img/portrait.png"></div>
          <!-- <p>
            <el-upload
              class="upload"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :show-file-list="false"
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList">
              <div>
                <span>
                  <img src="../../../static/img/personal_edit.png">
                </span>
                {{ $t('messages.personal.reviseHeadImg') }}
              </div>
            </el-upload>
          </p> -->
          <h3>{{ $t('messages.personal.userName') }}：{{userName}}</h3>
        </div>
        <div class="personal_edit">
          <div><img src="../../../static/img/personal_success.png">{{ $t('messages.personal.setUp') }}</div>
          <div>{{ $t('messages.personal.password') }}</div>
          <div>********</div>
          <div v-if="this.userName !== 'guest'"><img src="../../../static/img/personal_edit.png"><span @click="modifyPassword">{{ $t('messages.personal.modify') }}</span></div>
        </div>
        <!-- <div class="personal_edit">
          <div><img src="../../../static/img/personal_success.png">{{ $t('messages.personal.setUp') }}</div>
          <div>{{ $t('messages.personal.tel') }}</div>
          <div>18945612852</div>
          <div><img src="../../../static/img/personal_edit.png"><span @click="modifyPhone">{{ $t('messages.personal.modify') }}</span></div>
        </div> -->
        <div class="personal_edit">
          <div v-if="isActive">
            <img src="../../../static/img/personal_success.png">{{ $t('messages.personal.setUp') }}
          </div>
          <div v-if="!isActive">
            <img src="../../../static/img/personal_fail.png">{{ $t('messages.personal.notSet') }}
          </div>
          <div>{{ $t('messages.personal.email') }}</div>
          <div>{{userEamil}}</div>
          <div><img src="../../../static/img/personal_edit.png" v-if="!isActive"><span @click="activate" v-if="!isActive" style="margin-right: 20px;">{{ $t('messages.personal.reactivation') }}</span><img src="../../../static/img/personal_edit.png" v-if="!isActive"><span @click="modifyEmail" v-if="!isActive">{{ $t('messages.personal.modify') }}</span></div>
        </div>
      </div>
    </div>
    <div class="hyaline" @click="closeModifyDiv"></div>
    <div class="modify_password">
      <p><span>{{ $t('messages.personal.oldCipher') }}：</span><input type="password" class="old_password" @keyup.enter="confirmPassword"></p>
      <p><span>{{ $t('messages.personal.newPwd') }}：</span><input type="password" class="new_password" @keyup.enter="confirmPassword"></p>
      <p><span>{{ $t('messages.personal.confirmNewPwd') }}：</span><input type="password" class="new_password_confirm" @keyup.enter="confirmPassword"></p>
      <el-button @click="confirmPassword">{{ $t('messages.personal.confirmModify') }}</el-button>
    </div>
    <!-- <div class="modify_phone">
      <p><span>{{ $t('messages.personal.currentTel') }}：</span><b>18945612852</b></p>
      <p><span>{{ $t('messages.personal.newTel') }}：</span><input type="text"></p>
      <p><span>{{ $t('messages.personal.verificationCode') }}：</span><input type="text"><el-button>{{ $t('messages.personal.getVerifyCode') }}</el-button></p>
      <p><el-button>{{ $t('messages.personal.confirmModify') }}</el-button></p>
    </div> -->
    <div class="activate">
      <p>{{ $t('messages.personal.confirmActivation') }}</p>
      <el-button @click="emailActivateAgain">{{ $t('messages.personal.confirm') }}</el-button>
      <el-button @click="closeModifyDiv">{{ $t('messages.personal.cancel') }}</el-button>
    </div>
    <div class="modify_email">
      <p><span>{{ $t('messages.personal.currentMail') }}：</span><b>{{userEamil}}</b></p>
      <p><span>{{ $t('messages.personal.newMail') }}：</span><input type="text" class="newEmail"></p>
      <el-button @click="confirmModifyEmail">{{ $t('messages.personal.confirmModify') }}</el-button>
    </div>
  </div>
</template>
<script>
import api from '../../api/ipApi'
export default {
  data() {
    return {
      fileList: [],
      userName: '',
      userEamil: '',
      isActive: false
    }
  },
  mounted() {
    var userLoginData = JSON.parse(localStorage.userLoginData)
    this.userName = userLoginData.name
    this.userEamil = userLoginData.email
    this.isActive = userLoginData.is_active
  },
  methods: {
    getCookie(name) {
      var cookieValue = null
      if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';')
        for (var i = 0; i < cookies.length; i++) {
          var cookie = jQuery.trim(cookies[i]);
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
            break
          }
        }
      }
      return cookieValue
    },
    isCheckPass (para) {
      if (/^[\w@-]{8,18}$/.test(para)) {
        return true
      } else {
        return false
      }
    },
    isEmail(str) {
      var reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
      return reg.test(str)
    },
    // sha256加密
    setSha(value) {
      let sha256 = require("js-sha256").sha256
      return sha256(value)
    },
    // 修改密码
    confirmPassword () {
      var oldPassword = $('.old_password').val()
      var newPassword = $('.new_password').val()
      var newPasswordTwo = $('.new_password_confirm').val()
      if (oldPassword === '') {
        this.$message({
          message: this.$t('messages.personal.originalPwd'),
          type: 'warning'
        })
      } else {
        if (newPassword === '') {
          this.$message({
            message: this.$t('messages.personal.enterNewPwd'),
            type: 'warning'
          })
        } else {
          if (!this.isCheckPass(newPassword)) {
            this.$message({
              message: this.$t('messages.register.pwdTip'),
              type: 'info'
            })
          } else {
            if (newPassword !== newPasswordTwo) {
              if (newPasswordTwo === '') {
                this.$message({
                  message: this.$t('messages.personal.enterConfirmNewPwd'),
                  type: 'warning'
                })
              } else {
                this.$message({
                  message: this.$t('messages.register.diffPwd'),
                  type: 'warning'
                })
              }
            } else {
              var that = this
              var shaOldPassword = that.setSha(oldPassword)
              var shaNewPassword = that.setSha(newPassword)
              var loginData = {'username': that.userName, 'oldPassword': shaOldPassword, 'newPassword': shaNewPassword}
              api.postmodifyPassword(loginData).then(function (res) {
                if (res.data.status === 1) {
                  that.$message({
                    message: that.$t('messages.personal.modifyPwdSuccess'),
                    type: 'success'
                  })
                  document.cookie = 'token_virus=' + escape('')
                  let datas = {username: that.userName, password: ''}
                  localStorage.setItem('userData', JSON.stringify(datas))
                  that.$router.push({path: '/login'})
                } else if (res.data.status === 21) {
                  that.$message({
                    message: that.$t('messages.personal.noUser'),
                    type: 'error'
                  })
                } else if (res.data.status === 22) {
                  that.$message({
                    message: that.$t('messages.personal.oldPwdErr'),
                    type: 'error'
                  })
                }
              })
            }
          }
        }
      }
    },
    // 激活邮箱
    emailActivateAgain () {
      var that = this
      var token = this.getCookie('token_virus')
      var data = {'email': this.userEamil, 'token': token}
      api.postEamilActivate(data).then(res => {
        switch (res.data.status) {
          case 1:
            that.$message({
              message: that.$t('messages.personal.emailPostSuccess'),
              type: 'success'
            })
            that.closeModifyDiv()
            break
          case 21:
            that.$message({
              message: that.$t('messages.personal.unauthorizedUser'),
              type: 'error'
            })
            break
          case 22:
            that.$message({
              message: that.$t('messages.personal.reLogin'),
              type: 'error'
            })
            break
          case 23:
            that.$message({
              message: that.$t('messages.personal.serverBusy'),
              type: 'error'
            })
            break
          case 3:
            that.$message({
              message: that.$t('messages.personal.activated'),
              type: 'error'
            })
            break
        }
      })
    },
    // 修改邮箱
    confirmModifyEmail () {
      var that = this
      var newEmail = $('.newEmail').val()
      if (that.isEmail(newEmail)) {
        var token = this.getCookie('token_virus')
        var data = {'email': newEmail, 'token': token}
        api.postEamilActivate(data).then(res => {
          switch (res.data.status) {
            case 1:
              that.$message({
                message: that.$t('messages.personal.emailPostSuccess'),
                type: 'success'
              })
              that.closeModifyDiv()
              $('.newEmail').val('')
              break
            case 21:
              that.$message({
                message: that.$t('messages.personal.unauthorizedUser'),
                type: 'error'
              })
              break
            case 22:
              that.$message({
                message: that.$t('messages.personal.reLogin'),
                type: 'error'
              })
              break
            case 23:
              that.$message({
                message: that.$t('messages.register.regTipSix'),
                type: 'error'
              })
              break
            case 3:
              that.$message({
                message: that.$t('messages.personal.activated'),
                type: 'error'
              })
              break
          }
        })
      } else {
        that.$message({
          message: that.$t('messages.register.regTipFour'),
          type: 'error'
        })
      }
    },
    // 关闭弹窗
    closeModifyDiv () {
      $('.modify_password').hide()
      $('.modify_phone').hide()
      $('.activate').hide()
      $('.modify_email').hide()
      $('.hyaline').hide()
    },
    modifyPassword () {
      if (localStorage.locale === 'en') {
        $('.modify_password p > span').addClass('en')
      } else {
        $('.modify_password p > span').removeClass('en')
      }
      $('.hyaline').show()
      $('.modify_password').show()
    },
    modifyPhone () {
      $('.hyaline').show()
      $('.modify_phone').show()
    },
    activate () {
      $('.hyaline').show()
      $('.activate').show()
    },
    modifyEmail () {
      $('.hyaline').show()
      $('.modify_email').show()
    },
    handleRemove(file, fileList) {},
    handlePreview(file) {},
    handleExceed(files, fileList) {
      // this.$message.warning('当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件');
    },
    beforeRemove(file, fileList) {
      // return this.$confirm('确定移除 ${ file.name }？');
    },
    checkPortrait() {
      this.activeName = 'second'
    },
    handleClick(tab, event) {}
  }
}
</script>