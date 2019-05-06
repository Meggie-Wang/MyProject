<template>
  <div class="UserList ">
    <div class="ul-list-style">
      <div v-if="$tokenName === 'gtd' || $tokenName === 'zhirong'" style="display: flex;justify-content: space-between;margin-bottom: .5rem;">
        <el-select
          v-model="userRight"
          placeholder="请选择用户"
          @change="userRightChange(userRight)">
          <template slot="prefix" v-if="userRight">
            <i class="el-icon-error el-icon-error-custom" @click="clearUrlSingle('userRight')"></i>
          </template>
          <el-option
            v-for="item in userRightOptions"
            :key="item.label"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button @click="dialogTableVisible2 = !dialogTableVisible2">添加用户</el-button>
      </div>
      <ul>
        <li>用户名</li>
        <li>创建时间</li>
        <li>到期时间</li>
        <li>用户类型</li>
        <li>读写权限</li>
        <li>在线状态</li>
        <li v-if="$tokenName === 'gtd' || $tokenName === 'zhirong'" style="min-width: 430px;">用户操作</li>
      </ul>
      <ul v-for="(item, index) in userData" :key="index">
        <li>{{item.name}}</li>
        <li>{{$common.dateChange(item.create_time).split(' ')[0]}}</li>
        <li>{{item.end_time ? $common.dateChange(item.end_time).split(' ')[0] : '无限制'}}</li>
        <li>{{item.user_group}}</li>
        <li>{{item.user_right.length === 2 ? '读写' : '只读'}}</li>
        <li>
          <span v-if="item.is_online">在线</span>
          <span v-else>离线</span>
        </li>
        <li v-if="$tokenName === 'gtd' || $tokenName === 'zhirong'" style="min-width: 430px;">
          <el-button size="mini" @click="dialogTableVisibleChangeGroup = !dialogTableVisibleChangeGroup; currentUser = item.name" class="resetPassword"><span>权限修改</span></el-button>
          <el-button size="mini" class="resetPassword" @click="getUserLimitTime(item.name);dialogTableVisibleLimitTime = !dialogTableVisibleLimitTime; currentUser = item.name"><span>期限修改</span></el-button>
          <el-button size="mini" class="resetPassword" @click="dialogTableVisibleChangePwd = !dialogTableVisibleChangePwd; currentUser = item.name"><span>重置密码</span></el-button>
          <el-button size="mini" class="resetPassword" @click="deleteUser(item.name)"><span>删除用户</span></el-button>
        </li>
      </ul>
      <el-pagination
        v-if="userData.length!=0"
        class="__text-left"
        background
        layout="prev, pager, next"
        :total="LogList.length"
        :page-size="20"
        :pager-count="5"
        @current-change="pageChange"
        :current-page.sync="currentPage">
      </el-pagination>
    </div>
    <el-dialog v-if="$tokenName === 'gtd' || $tokenName === 'zhirong'" title="添加用户" :visible.sync="dialogTableVisible2" style="text-align: center;">
      <div class="addDiv">
        <span>用户名</span>
        <div class="addinput" style="margin-left: 1rem">
          <input
            type="text"
            class="el-input__inner"
            v-model="username"
            @blur="userNameCheck(username)"
            placeholder="(可输入a-zA-Z0-9及- 6-16位字符)"
            style="width:300px"/>
        </div>
      </div>
      <div class="passwordCheck">
        <span v-if="usernameLengthError">请输入6-16位字符的用户名</span>
        <span v-if="usernameAlive">{{usernameAliveMsg}}</span>
      </div>
      <div class="addDiv">
        <span>生成密码方式</span>
        <el-select v-model="passwordStyle" placeholder="请选择" style="margin-left: 1rem;width:300px">
          <el-option
            v-for="item in passwordOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="passwordCheck">
      </div>
      <div class="addDiv" v-if="passwordStyle === '0'">
        <span>随机密码</span>
        <div class="addinput" style="margin-left: 1rem">
          <input
            type="text"
            :disabled="true"
            class="el-input__inner"
            v-model="userpwd"
            placeholder="(可输入a-zA-Z0-9及- 长度8-18位)"
            style="width:300px"/>
        </div>
      </div>
      <div class="passwordCheck" v-if="passwordStyle === '0'">
        <span>请记住密码</span>
      </div>
      <div v-if="passwordStyle !== '0'">
        <div class="addDiv">
          <span>输入密码</span>
          <div class="addinput" style="margin-left: 1rem">
            <input
              type="text"
              class="el-input__inner"
              v-model="userpwd"
              @blur="passwordLengthError = userpwd.length < 8 || userpwd.length > 18"
              placeholder="(可输入a-zA-Z0-9及- 长度8-18位)"
              style="width:300px"/>
          </div>
        </div>
        <div class="passwordCheck">
          <span v-if="passwordLengthError">请输入长度为8-18位的密码</span>
        </div>
        <div
          class="addDiv">
          <span>确认密码</span>
          <div class="addinput" style="margin-left: 1rem">
            <input
              type="text"
              class="el-input__inner"
              v-model="userpwd2"
              placeholder="请再次输入密码"
              @blur="passwordCheck()"
              style="width:300px"/>
          </div>
        </div>
        <div class="passwordCheck">
          <span v-if="passwordCheckErr">两次输入不一致</span>
        </div>
      </div>
      <div class="addDiv">
        <span>用户组</span>
        <el-select v-model="uservalue" placeholder="请选择" style="margin-left: 1rem;width:300px">
          <el-option
            v-for="item in groupList"
            :key="item.id"
            :label="groupDic[item.name]"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="passwordCheck">
      </div>
      <div class="addDiv">
        <span>期限设置</span>
        <el-select v-model="timeStyle" placeholder="请选择" style="margin-left: 1rem;width:300px">
          <el-option
            v-for="item in timeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="passwordCheck">
      </div>
      <div v-if="timeStyle === '1'">
        <div class="addDiv">
          <span>选择时间期限</span>
          <el-date-picker
            style="margin-left: 1rem"
            v-model="end_time"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </div>
      </div>
      <div style="margin: 2rem 0">
        <el-button
          size="small"
          :disabled="(username === '' || username.length < 6 || username.length > 16) || (passwordStyle === '' && (userpwd === '' || userpwd.length < 8 || userpwd.length > 18 || userpwd2 === '' || userpwd !== userpwd2)) || uservalue === '' || (timeStyle === '1' && end_time === '') || usernameAlive"
          @click="adduser()">确认</el-button>
        <el-button
          size="small"
          @click="dialogTableVisible2 = false">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改用户权限" :visible.sync="dialogTableVisibleChangeGroup" style="text-align: center;">
      <div class="addDiv">
        <span>用户组</span>
        <el-select v-model="groupValue" placeholder="请选择" style="margin-left: 1rem;width:300px">
          <el-option
            v-for="item in groupList"
            :key="item.id"
            :label="groupDic[item.name]"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div style="margin: 2rem 0">
        <el-button
          size="small"
          :disabled="groupValue === ''"
          @click="changeGroup()">确认</el-button>
        <el-button
          size="small"
          @click="dialogTableVisibleChangeGroup = false">取消</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改用户到期时间" :visible.sync="dialogTableVisibleLimitTime" style="text-align: center;">
      <div class="addDiv">
        <span>期限设置</span>
        <el-select v-model="singleTimeStyle" placeholder="请选择" style="margin-left: 1rem;width:300px">
          <el-option
            v-for="item in timeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="passwordCheck">
      </div>
      <div class="addDiv" v-if="singleTimeStyle === '1'">
        <span>选择时间期限</span>
        <el-date-picker
          style="margin-left: 1rem"
          v-model="singleEnd_time"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </div>
      <div style="margin: 2rem 0">
        <el-button
          size="small"
          :disabled="singleTimeStyle === '1' && singleEnd_time === ''"
          @click="changeTimeLimit()">确认</el-button>
        <el-button
          size="small"
          @click="dialogTableVisibleLimitTime = false">取消</el-button>
      </div>
    </el-dialog>

    <el-dialog title="重置密码" :visible.sync="dialogTableVisibleChangePwd" style="text-align: center;">
      <div class="addDiv">
        <span>输入密码</span>
        <div class="addinput" style="margin-left: 1rem">
          <input
            type="text"
            class="el-input__inner"
            v-model="singleUserpwd"
            @blur="passwordLengthError = singleUserpwd.length < 8 || singleUserpwd.length > 18"
            placeholder="(可输入a-zA-Z0-9及- 长度8-18位)"
            style="width:300px"/>
        </div>
      </div>
      <div class="passwordCheck">
        <span v-if="passwordLengthError">请输入长度为8-18位的密码</span>
      </div>
      <div
        class="addDiv">
        <span>确认密码</span>
        <div class="addinput" style="margin-left: 1rem">
          <input
            type="text"
            class="el-input__inner"
            v-model="singleUserpwd2"
            placeholder="请再次输入密码"
            @blur="singlePasswordCheck()"
            style="width:300px"/>
        </div>
      </div>
      <div class="passwordCheck">
        <span v-if="singlePasswordCheckErr">两次输入不一致</span>
      </div>
      <div style="margin: 2rem 0">
        <el-button
          size="small"
          :disabled="singleUserpwd === '' || singleUserpwd.length < 8 || singleUserpwd.length > 18 || singleUserpwd2 === '' || singleUserpwd !== singleUserpwd2"
          @click="changePwd()">确认</el-button>
        <el-button
          size="small"
          @click="dialogTableVisibleChangePwd = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'UserList',
  data () {
    return {
      LogList: [],
      userData: [],
      visible2: false,
      setInterval: null,
      dialogTableVisible: false,
      dialogTableVisible2: false,
      groupList: [],
      groupDic: {
        audit: '审计员(读写)',
        admin_write: '管理员(读写)',
        user_read: '操作员(只读)',
        user_write: '操作员(读写)',
        admin_read: '管理员(只读)'
      },
      passwordStyle: '',
      passwordOptions: [{
        value: '',
        label: '手动填写'
      }, {
        value: '0',
        label: '随机生成'
      }],
      timeStyle: '0',
      timeOptions: [{
        value: '0',
        label: '无期限'
      }, {
        value: '1',
        label: '有期限'
      }],
      username: '',
      userpwd: '',
      userpwd2: '',
      uservalue: '',
      selectTimes: [],
      start_time: '',
      end_time: '',
      passwordCheckErr: false,
      dialogTableVisibleChangeGroup: false,
      dialogTableVisibleLimitTime: false,
      dialogTableVisibleChangePwd: false,
      GroupList: [],
      singleTimeStyle: '0',
      singleUserpwd: '',
      singleUserpwd2: '',
      groupValue: '',
      singleStart_time: '',
      singleEnd_time: '',
      singlePasswordCheckErr: false,
      currentUser: '',
      userRight: '',
      userRightOptions: [],
      currentPage: 1,
      path: '/UserList',
      usernameLengthError: false,
      passwordLengthError: false,
      usernameAlive: false,
      usernameAliveMsg: ''
    }
  },
  watch: {
    passwordStyle (val) {
      this.userpwd = ''
      this.userpwd2 = ''
      this.passwordLengthError = false
      this.passwordCheckErr = false
      if (val === '0') {
        this.$api.get('genenate_password').then((res) => {
          this.userpwd = res.data
        })
      }
    },
    username (val) {
      this.username = this.$common.inputTest(val, 0)
    },
    userpwd (val) {
      this.userpwd = this.$common.inputTest(val, 0)
    },
    userpwd2 (val) {
      this.userpwd2 = this.$common.inputTest(val, 0)
    },
    dialogTableVisible2 (val) {
      if (!val) {
        this.username = ''
        this.uservalue = ''
        this.passwordStyle = ''
        this.userpwd = ''
        this.userpwd2 = ''
        this.timeStyle = '0'
        this.selectTimes = []
        this.start_time = ''
        this.end_time = ''
        this.passwordCheckErr = false
        this.usernameLengthError = false
        this.passwordLengthError = false
        this.usernameAlive = false
        this.usernameAliveMsg = ''
      }
    },
    dialogTableVisibleChangeGroup (val) {
      if (!val) {
        this.groupValue = ''
      }
    },
    dialogTableVisibleLimitTime (val) {
      if (!val) {
        this.singleTimeStyle = '0'
        this.singleSelectTimes = []
        this.singleStart_time = ''
        this.singleEnd_time = ''
      }
    },
    dialogTableVisibleChangePwd (val) {
      if (!val) {
        this.passwordStyle = ''
        this.singleUserpwd = ''
        this.singleUserpwd2 = ''
        this.singlePasswordCheckErr = false
        this.passwordLengthError = false
      }
    },
    timeStyle (val) {
      if (val === '0') {
        this.selectTimes = []
        this.start_time = ''
        this.end_time = ''
      }
    },
    singleUserpwd (val) {
      this.singleUserpwd = this.$common.inputTest(val, 0)
    },
    singleUserpwd2 (val) {
      this.singleUserpwd2 = this.$common.inputTest(val, 0)
    }
  },
  methods: {
    userNameCheck (val) {
      this.usernameLengthError = val.length < 6 || val.length > 16
      if (!this.usernameLengthError) {
        this.$api.get('useralive', {
          username: val
        }).then((res) => {
          if (res.status === 200) {
            this.usernameAlive = false
          } else if (res.status === 400) {
            this.usernameAlive = true
            this.usernameAliveMsg = res.message
          }
        })
      }
    },
    userRightChange (val) {
      let q = this.$common.inheritObj(this.$route.query)
      q.userGroup = val
      this.$router.push({
        path: this.path,
        query: q
      })
      this.init()
    },
    clearUrlSingle (val) {
      let q = this.$common.inheritObj(this.$route.query)
      q.userGroup = ''
      this[val] = ''
      this.$router.push({
        path: this.path,
        query: q
      })
      this.init()
    },
    pageChange (val) {
      this.userData = []
      this.$common.pagechange(this.userData, this.LogList, val, 20)
    },
    // 添加用户
    adduser () {
      let obj = {}
      obj.username = this.username
      obj.password = this.$sha256(this.userpwd)
      obj.group = this.uservalue
      obj.end_time = this.timeStyle === '1' ? this.$common.dateChange(this.end_time) : ''
      this.$api.post('register', obj).then((res) => {
        if (res.status === 200) {
          this.$message({
            message: res.message,
            type: 'success'
          })
        } else {
          this.$message.error(res.message)
        }
        this.init()
      })
      this.dialogTableVisible2 = false
      // this.$confirm('此操作将添加用户, 是否继续?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
      // }).catch(() => {
      //   this.dialogTableVisible2 = false
      // })
    },
    userDetail (val) {
      this.$router.push({'path': '/UserDetail', query: {id: val.name, creatTime: val.create_time}})
    },
    // 请求数据
    init () {
      this.$api.get('userstatus', {
        search_group: this.userRight
      }).then(webkitDep => {
        this.userData = []
        this.LogList = webkitDep.result
        this.$common.pagechange(this.userData, this.LogList, 1, 20)
      })
    },
    // 请求用户组
    userGroup () {
      this.$api.get('grouplist').then((res) => {
        this.groupList = res
      })
    },
    changeTime (str) {
      if (str === null) {
        this.searchTimes = ''
        this.start_time = ''
        this.end_time = ''
      } else {
        this.start_time = this.$common.dateChange(str[0])
        this.end_time = this.$common.dateChange(str[1])
      }
    },
    passwordCheck () {
      if (this.userpwd !== '') {
        if (this.userpwd2 !== this.userpwd) {
          this.passwordCheckErr = true
        } else {
          this.passwordCheckErr = false
        }
      }
    },
    deleteUser (val) {
      this.$confirm('此操作将删除用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.post('delete_user', {
          username: val
        }).then(res => {
          if (res.status === 200) {
            this.$message({
              message: res.message,
              type: 'success'
            })
          } else {
            this.$message.error(res.message)
          }
          this.init()
        })
      }).catch(() => {
      })
    },
    changePwd () {
      var obj = {}
      obj.username = this.currentUser
      obj.new_password = this.$sha256(this.singleUserpwd)
      this.$api.post('admin_changepassword', obj).then(res => {
        if (res.status === 200) {
          this.$message({
            message: res.message,
            type: 'success'
          })
        } else {
          this.$message.error(res.message)
        }
      })
      this.dialogTableVisibleChangePwd = false
      // this.$confirm('此操作将修改用户密码, 是否继续?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
      // }).catch(() => {
      //   this.dialogTableVisibleChangePwd = false
      // })
    },
    changeTimeLimit () {
      var obj = {}
      obj.username = this.currentUser
      obj.end_time = this.singleTimeStyle === '1' ? this.$common.dateChange(this.singleEnd_time) : ''
      this.$api.post('change_endtime', obj).then(res => {
        if (res.status === 200) {
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.init()
        } else {
          this.$message.error(res.message)
        }
      })
      this.dialogTableVisibleLimitTime = false
      // this.$confirm('此操作将修改用户到期时间, 是否继续?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
      // }).catch(() => {
      //   this.dialogTableVisibleLimitTime = false
      // })
    },
    getUserLimitTime (val) {
      this.$api.get('change_endtime', {
        username: val
      }).then(res => {
        if (res.data.end_time === null) {
          this.singleTimeStyle = '0'
        } else {
          this.singleTimeStyle = '1'
          this.singleEnd_time = (res.data.end_time + '.000Z')
        }
      })
    },
    singlePasswordCheck () {
      if (this.singleUserpwd !== '') {
        if (this.singleUserpwd2 !== this.singleUserpwd) {
          this.singlePasswordCheckErr = true
        } else {
          this.singlePasswordCheckErr = false
        }
      }
    },
    changeGroup () {
      this.$api.post('changegroup', {
        username: this.currentUser,
        group: this.groupValue
      }).then(res => {
        if (res.status === 200) {
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.init()
        } else {
          this.$message.error(res.message)
        }
      })
      this.dialogTableVisibleChangeGroup = false
      // this.$confirm('此操作将修改用户权限, 是否继续?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
      // }).catch(() => {
      //   this.dialogTableVisibleChangeGroup = false
      // })
    }
  },
  mounted () {
    this.userRight = this.$route.query.userGroup ? this.$route.query.userGroup : ''
    this.init()
    this.userGroup()
    if (localStorage.userName === 'adminuser') {
      this.userRightOptions = [{
        label: '操作员(只读)',
        value: '3'
      }, {
        label: '操作员(读写)',
        value: '4'
      }, {
        label: '管理员(只读)',
        value: '5'
      }, {
        label: '审计员(读写)',
        value: '1'
      }]
    } else {
      this.userRightOptions = [{
        label: '操作员(只读)',
        value: '3'
      }, {
        label: '操作员(读写)',
        value: '4'
      }]
    }
  }
}
</script>
<style scoped="scoped" lang="scss">
  .UserList {
    color: rgb(52,82,126);
    .el-icon-error-custom {
      line-height: 40px;
    }
  }
  .ul-list-style ul {
    height: 2.8rem;
    width: 100%;
    font-weight: bolder;
    color: rgb(52,82,126);
    display: flex;
    text-align: center;
    overflow: hidden;
  }
  .ul-list-style ul:first-of-type {
    font-size: 1.1rem;
  }
  .ul-list-style ul li {
    float: left;
    line-height: 2.5rem;
    width: calc((100% - .2rem - 300px) / 6);
    margin: .1rem .1rem;
    border:1px solid rgb(52,82,126);
    border-radius: 5px;
  }
  .ul-list-style ul li:last-of-type {
    width: 400px;
  }
  .ul-list-style ul li:last-of-type span {
    margin: 0 .5rem;
  }
  .resetPassword:hover {
    cursor:pointer;
  }
  .addinput {
    border: 1px solid $borderColor;
    border-radius: 5px;
  }
  .addDiv {
    display: flex;
    align-items: center;
    margin: 0 5%;
    >span {
      width: 6rem;
    }
  }
  .addDiv span {
    text-align: left;
  }
  .check-report-icon {
    height: 1.2rem;
  }
  .passwordCheck {
    display: block;
    font-size: .8rem;
    margin-left: 5%;
    color: red;
    height: 1.2rem;
    text-align: left;
    >span {
      margin-left: 7rem;
    }
  }
</style>
<style>
  .UserList .el-dialog {
    width: 700px;
  }
  .UserList .addDiv .el-date-editor.el-input {
    border: 1px solid #3a537e;
    border-radius: 4px;
    width: 300px;
  }
  .UserList .el-picker-panel{
    /*padding-left: 15px !important;
    padding-right: 15px;*/
    width: 500px;
  }
  .UserList .ul-list-style .el-select .el-input input {
    max-width: 198px;
  }
  .UserList .el-button--mini {
    padding: 7px 10px;
  }
</style>
