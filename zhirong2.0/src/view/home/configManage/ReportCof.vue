<template>
  <div class="ReportCof">
    <div>
      <h3>定期发送统计报表</h3>
      <div class="send-center">
        <div>
          <div class="send-email">
            <span @click="checkout()" :style="{backgroundImage:'url(' + checkOrNocheck + ')'}"></span>使用电子邮件发送统计报表
          </div>
          <div class="SMTP">
            <p>发送SMTP设置:</p>
            <div class="SMTP-setup span-style">
              <div>
                <span>服务器</span>
                <input type="text" v-model="smtpServer">
              </div>
              <div>
                <span>端口</span>
                <input type="text" class="port-input" v-model="smtpPortnum">
                <el-select v-model="smtpEncrypt" @change="selectGet(smtpEncrypt)" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div class="account">
            <p>账户设置:</p>
            <div class="account-setup span-style" >
              <div>
                <span>发送账户</span>
                <div>
                  <input type="text" v-model="emailSender">
                  <h5><h6 v-if="SendCheck">账户格式错误请重新输入</h6></h5>
                </div>
              </div>
              <div>
                <span>密码</span>
                <div>
                  <input type="password" v-model="emailPassword">
                  <h5><h6 v-if="PasswordCheck">密码格式错误请重新输入</h6></h5>
                </div>
              </div>
            </div>
          </div>
          <div class="account">
            <p>接收邮箱:</p>
            <div class="account-setup acceptEmail" >
              <div class="email-check" v-for="(item,index) in emailAddressee" :key="index">
                <input type="text" v-model="emailAddressee[index]">
                <h5><h6 v-if="checkEmailAddress[index]">邮箱格式错误请重新输入</h6></h5>
              </div>
              <div class="add-down-btn">
                <button class="addEmail" @click="addEmail">+</button><button class="addEmail" @click="downEmail">-</button>
              </div>
            </div>
          </div>
          <div class="timing">
            <p>定时发送：</p>
            <div class="timing-send">
              <el-time-select
                v-model="sendTiming"
                :picker-options="{
                  start: '08:30',
                  step: '00:15',
                  end: '18:30'
                }"
                placeholder="选择时间">
              </el-time-select>
            </div>
          </div>
          <div class="report-btn">
            <el-button @click="SetUpTest ()" :disabled="isDisabled">
              <i class="el-icon-loading" v-if="loading"></i>测试设置</el-button>
            <el-button @click="save" :disabled="isDisabled">保存</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ReportCof',
  data () {
    return {
      checked: false,
      options: [
        {value: 'SSL', label: 'SSL'}, {value: 'NO', label: '不使用'}
      ],
      checkOrNocheck: '',
      SetupMsg: '',
      smtpEncrypt: '',
      smtpServer: '',
      smtpPortnum: '',
      emailSender: '',
      emailPassword: '',
      emailAddressee: [],
      checkEmailAddress: [],
      checkEmailboolean: true,
      SendCheck: false,
      PasswordCheck: false,
      receiveEmailCount: 1,
      sendTiming: '',
      isDisabled: true,
      selectvalue: '',
      loading: false
    }
  },
  methods: {
    // 勾选框红对勾
    checkout () {
      if (this.checkOrNocheck === '') {
        this.checkOrNocheck = this.$img.selectAll
        this.isDisabled = false
      } else {
        this.checkOrNocheck = ''
        this.isDisabled = true
      }
    },
    // 增加接收邮箱 上限5个
    addEmail () {
      if (this.receiveEmailCount === 5) {
        this.$message.error('邮箱数量已达上限')
      }
      if (this.receiveEmailCount < 5) {
        this.emailAddressee.push('')
        this.receiveEmailCount++
      }
    },
    // 减少接收邮箱 下限1个
    downEmail () {
      if (this.receiveEmailCount > 1) {
        this.emailAddressee.pop()
        this.receiveEmailCount--
      }
    },
    // 保存
    /*
      遍历接收邮箱数组对数组元素做格式验证，正确传false，错误传true，将得出的布尔值按对应的index传到数组checkemailaddress里，v-if遍历checkemailaddress拿到对应index的布尔值控制错误提示的显隐。
    */
    save () {
      // 是否使用电子邮件发送
      var a = ''
      if (this.checkOrNocheck === '') {
        a = 'yes'
      } else {
        a = 'no'
      }
      // 账户密码邮箱验证
      var accountCheck = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/ // /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
      var pwdCheck = /^[A-Za-z0-9_\u4e00-\u9fa5]+$/
      // 发送账户判断
      if (!accountCheck.test(this.emailSender)) {
        this.SendCheck = true
      } else {
        this.SendCheck = false
      }

      // 密码判断
      if (!pwdCheck.test(this.emailPassword) && !this.emailPassword) {
        this.PasswordCheck = true
      } else {
        this.PasswordCheck = false
      }

      // 接收邮箱判断
      this.checkEmailAddress = []
      for (var i = 0; i < this.emailAddressee.length; i++) {
        // let haha = !accountCheck.test(this.emailAddressee[i]) // true, 错了加入提示
        if (!accountCheck.test(this.emailAddressee[i])) {
          // 加入提示错了
          this.checkEmailAddress.push(true)
          this.checkEmailboolean = false
        } else {
          // 证确
          this.checkEmailAddress.push(false)
        }
      }
      if (accountCheck.test(this.emailSender) && pwdCheck.test(this.emailPassword) && this.checkEmailboolean) {
        this.$api.post('report_setting', {
          user_id: localStorage.session_id,
          if_use: a,
          smtp_server: this.smtpServer,
          smtp_portnum: this.smtpPortnum,
          smtp_encrypt: this.smtpEncrypt,
          email_sender: this.emailSender,
          email_password: this.emailPassword,
          email_addressee: [this.emailAddressee],
          send_timing: this.sendTiming
        }).then(response => {
          if (response.status === 200) {
            this.$message({
              message: response.message,
              type: 'success'
            })
          } else {
            this.$message.error(response.message)
          }
        })
      }
    },
    selectGet (val) {
      let obj = {}
      obj = this.options.filter(item => {
        return item.value === val
      })
      this.selectvalue = obj[0].value
    },
    // 测试设置
    SetUpTest () {
      this.loading = true
      this.$api.post('report_test', {
        smtp_server: this.smtpServer,
        smtp_portnum: this.smtpPortnum,
        smtp_encrypt: this.selectvalue,
        email_sender: this.emailSender,
        email_password: this.emailPassword,
        email_addressee: this.emailAddressee
      }).then(res => {
        this.loading = false
        if (res.status === 200) {
          this.$message({
            message: res.message,
            type: 'success'
          })
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 获取报表默认数据
    init () {
      this.$api.get('report_setting', {
        user_id: localStorage.session_id
      }).then(res => {
        if (res.status === 200) {
          this.SetupMsg = res.data
          this.smtpServer = this.SetupMsg.smtp_server
          this.smtpEncrypt = this.SetupMsg.smtp_encrypt
          this.smtpPortnum = this.SetupMsg.smtp_portnum
          this.emailSender = this.SetupMsg.email_sender
          this.emailPassword = this.SetupMsg.email_password
          this.emailAddressee = this.SetupMsg.email_addressee
          this.sendTiming = this.SetupMsg.send_timing
          this.selectvalue = this.smtpEncrypt
          this.receiveEmailCount = this.emailAddressee.length
        } else {
          this.$message.info(res.message)
        }
      })
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<style scoped="scoped">
  .ReportCof {
    color: rgb(52,82,126);
    font-weight: bolder;
  }
  .ReportCof > div{
    width: 80%;
    margin: 0 auto;
  }
  .ReportCof h3 {
    font-size: 1.5rem;
    margin-top: 1rem;
    border-bottom: 2px solid rgb(52,82,126)
  }
  .ReportCof h5 {
    display: block;
    height: .5rem;
    width: calc(100% - .25rem - 1px) ;
    font-size: .5rem;
    color: red;
    text-align: center;
  }
  .send-center {
    width: 100%;
    height: 100%;
  }
  .send-center > div {
    width: 90%;
    margin: 15% auto auto;
  }
  .send-center > div > div > div {
    display: flex;
    align-items: center;
  }
  .send-center input {
    border: 1px solid rgb(52,82,126);
    border-radius: 5px;
    height: 40px;
    line-height: 40px;
    width: 15rem;
    text-indent: 2rem;
    margin-right: calc(.25rem + 1px);
    color: rgb(52,82,126);
  }
  .send-center .port-input {
    width: 6rem;
  }
  .port-input {
    margin-right: 1rem;
  }
  .send-center p {
    display: block;
    height: 40px;
    line-height: 40px;
    margin-top: 0.2rem;
    width: auto;
    min-width: 7.5rem;
  }
  .SMTP,
  .account,
  .timing,
  .report-btn {
    display: flex;
    align-items: flex-start;
    margin-top: .5rem;
  }
  .send-email,
  .SMTP-setup,
  .account-setup,
  .timing-send {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  .send-email,
  .report-btn {
    margin: 1rem auto auto 7.5rem;
  }
  .send-email span {
    display: block;
    width: 1rem;
    height: 1rem;
    margin-right: .5rem;
    border: 1px solid rgb(52,82,126);
    border-radius: 3px;
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center;
  }
  .span-style > div {
    display: flex;
    margin: .2rem 1.5rem 0.2rem 0;
    /*align-items: center;*/
  }
  .span-style span {
    display: block;
    width: 5rem;
    height: 40px;
    line-height: 40px;
    margin-right: .1rem;
    text-align: center;
    border: 1px solid rgb(52,82,126);
    border-radius: 5px;
  }
  .acceptEmail input {
  }
  .email-check {
    margin-bottom: .5rem;
  }
  .email-check input {
    display: block;
  }
  .add-down-btn {
    height: 100%;
    padding-bottom: 1rem;
  }
  .addEmail {
    height: 2rem;
    width: 2rem;
    text-align: center;
    line-height: 2rem;
    margin: calc(0.25rem + 1px);
    background-color: rgb(52,82,126);
    border-radius: 50%;
    border: none;
    color: white;
    font-size: 1.5rem;
  }
  .timing-send {
    height: 2.5rem;
    width: 10rem;
    border: 1px solid rgb(52,82,126);
    border-radius: 5px;
  }
</style>
