<template>
  <div class="EmailSetting">
    <div>
      <h3>邮件设置</h3>
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
          <div class="report-btn">
            <el-button @click="SetUpTest()" :disabled="checkOrNocheck === ''">
              <i class="el-icon-loading" v-if="loading"></i>测试设置</el-button>
            <el-button @click="save">保存</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="SysLog">
      <h2>SysLog服务配置</h2>
      <div class="useChange">
        <el-radio-group v-model="if_use">
          <el-radio-button label="1">启用</el-radio-button>
          <el-radio-button label="0">禁用</el-radio-button>
        </el-radio-group>
      </div>
      <div class="SysLogConfig">
        <div>
          <span>应用场所：</span>
          <el-select
            v-model="localVal"
            :disabled="if_use === '0'"
            placeholder="请选择">
            <template slot="prefix" v-if="localVal">
              <i
                class="el-icon-error el-icon-error-custom"
                @click="localVal = ''"
                style="line-height: 40px;"></i>
            </template>
            <el-option
              v-for="item in localOpt"
              :key="item.label"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <span>告警级别：</span>
          <el-select
            v-model="levelVal"
            :disabled="if_use === '0'"
            placeholder="请选择">
            <template slot="prefix" v-if="levelVal">
              <i
                class="el-icon-error el-icon-error-custom"
                @click="levelVal = ''"
                style="line-height: 40px;"></i>
            </template>
            <el-option
              v-for="item in levelOpt"
              :key="item.label"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <span>IP：</span>
          <input v-model="ipInput" :disabled="if_use === '0'">
        </div>
        <div>
          <span>端口：</span>
          <input v-model="portInput" :disabled="if_use === '0'">
        </div>
        <el-button
          style="margin-top: 1rem;"
          :disabled="if_use === '1' && (localVal === '' || levelVal === '' || ipInput === '' || portInput === '')"
          @click="SysLogSave()">保存设置</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'EmailSetting',
  data () {
    return {
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
      loading: false,
      if_use: '0',
      ipInput: '',
      portInput: '',
      localVal: '',
      localOpt: [{
        label: '本地0',
        value: 'local0'
      }, {
        label: '本地1',
        value: 'local1'
      }, {
        label: '本地2',
        value: 'local2'
      }, {
        label: '本地3',
        value: 'local3'
      }, {
        label: '本地4',
        value: 'local4'
      }, {
        label: '本地5',
        value: 'local5'
      }, {
        label: '本地6',
        value: 'local6'
      }, {
        label: '本地7',
        value: 'local7'
      }],
      levelVal: '',
      levelOpt: [{
        label: '调试',
        value: 'debug'
      }, {
        label: '信息',
        value: 'info'
      }, {
        label: '无',
        value: 'none'
      }, {
        label: '提醒',
        value: 'notice'
      }, {
        label: '预警',
        value: 'warning'
      }, {
        label: '错误',
        value: 'err'
      }, {
        label: '重要',
        value: 'crit'
      }, {
        label: '警告',
        value: 'alert'
      }, {
        label: '紧急',
        value: 'emerg'
      }]
    }
  },
  methods: {
    // 勾选框红对勾
    checkout () {
      if (this.checkOrNocheck === '') {
        this.checkOrNocheck = this.$img.selectAll
      } else {
        this.checkOrNocheck = ''
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
      if (localStorage.userClass === '2') {
        // 是否使用电子邮件发送
        var a = ''
        if (this.checkOrNocheck === '') {
          a = 'no'
        } else {
          a = 'yes'
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
      } else {
        this.$message.warning('您没有此项权限！')
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
      if (localStorage.userClass === '2') {
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
      } else {
        this.$message.warning('您没有此项权限！')
      }
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
          this.checkOrNocheck = this.SetupMsg.if_use === 'yes' ? this.$img.selectAll : ''
        } else {
          this.$message.info(res.message)
        }
      })
    },
    SysLog () {
      this.$api.get('syslog_config').then((res) => {
        if (res) {
          this.localVal = res.data.facility
          this.levelVal = res.data.level
          this.portInput = res.data.port
          this.ipInput = res.data.host
          this.if_use = res.data.if_use.toString()
        }
      })
    },
    SysLogSave () {
      if (localStorage.userClass === '2') {
        this.$api.post('syslog_config', {
          port: this.portInput,
          facility: this.localVal,
          host: this.ipInput,
          level: this.levelVal,
          if_use: Number(this.if_use)
        }).then((res) => {
          if (res && res.status === 200) {
            this.$message.success('设置保存成功')
          } else {
            this.$message.warning(res.msg)
          }
          this.SysLog()
        })
      } else {
        this.$message.warning('您没有此项权限！')
      }
    }
  },
  mounted () {
    this.init()
    this.SysLog()
  }
}
</script>
<style scoped="scoped">
  .EmailSetting {
    color: rgb(52,82,126);
    font-weight: bolder;
  }
  .EmailSetting h3 {
    font-size: 1.5rem;
    border-bottom: 2px solid rgb(52,82,126)
  }
  .EmailSetting h5 {
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
    /*margin: 15% auto auto;*/
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
    padding: 0 20px;
    overflow: hidden;
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
<style scoped lang="scss">
  .SysLog {
    .SysLogConfig {
      > div {
        display: flex;
        margin: .2rem 0;
        > span {
          display: block;
          width: 5rem;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          margin-right: .5rem;
        }
        > input {
          width: 200px;
        }
      }
    }
    .useChange {
      margin: 1rem 0 .5rem;
    }
    h2 {
      font-size: 1.5rem;
      color: $textColor;
      border-bottom: 2px solid rgb(52,82,126);
    }
    input {
      height: 38px;
      line-height: 38px;
      border: 1px solid $borderColor;
      border-radius: 4px;
      margin: 0 .5rem ;
      text-align: center;
      color: $textColor;
    }
    input:disabled {
      background-color: #f5f7fa;
      border: 1px solid #3a537e;
      color: #c0c4cc;
      cursor: not-allowed;
    }
  }
</style>
<style lang="scss">
  .SysLog .el-select {
    margin: 0 .5rem;
  }
  .SysLog .el-radio-button__inner {
    padding: 8px 12px;
    box-shadow: none;
  }
  .SysLog .el-radio-button__orig-radio:checked+.el-radio-button__inner {
    box-shadow: none;
  }
  .SysLog .el-select .el-input input {
    width: 198px;
  }
</style>
