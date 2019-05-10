<template>
  <div class="SystemManagemant">
    <div class="SystemSelfCheck">
      <div>
        <h2>自检功能</h2>
        <el-button @click="loading ? '' : startDetect()">{{loading ? '自检中' : '开始检测'}}
          <i class="el-icon-loading" v-if="loading" style="margin-left: 2px;"></i>
        </el-button>
        <div style="margin-top: 1rem;" class="selfCheck">
          <el-tooltip
            class="item"
            effect="light"
            content="程序自检：设备重要应用程序运行状态检测"
            placement="bottom-start">
            <span
              label="process"
              :class="checkList.indexOf('process') > -1 ? 'detectFinished' : ''"
              :style="{'background-color': checkList.indexOf('process') > -1 ? (programLoaclDataShow && programRemoteDataShow ? '#d34c5c' : '#315697') : '', 'boeder-color': checkList.indexOf('process') > -1 ? (programLoaclDataShow && programRemoteDataShow ? '#d34c5c' : '#315697') : ''}">
              程序自检<i class="el-icon-loading" v-if="processLoading" style="margin-left: 2px;"></i>
            </span>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="light"
            content="硬件自检：设备硬件健康状态检测"
            placement="bottom-start">
            <span
              label="hardware"
              :class="checkList.indexOf('hardware') > -1 ? 'detectFinished' : ''"
              :style="{'background-color': checkList.indexOf('hardware') > -1 ? (hw_checkInterfaceDataShow ? '#d34c5c' : '#315697') : '', 'border-color': checkList.indexOf('hardware') > -1 ? (hw_checkInterfaceDataShow ? '#d34c5c' : '#315697') : ''}">
              硬件自检<i class="el-icon-loading" v-if="hardwareLoading" style="margin-left: 2px;"></i>
            </span>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="light"
            content="配置文件自检：系统重要配置项检测"
            placement="bottom-start">
            <span
              label="config"
              :class="checkList.indexOf('config') > -1 ? 'detectFinished' : ''"
              :style="{'background-color': checkList.indexOf('config') > -1 ? (configDataShow ? '#d34c5c' : '#315697') : '', 'border-color': checkList.indexOf('config') > -1 ? (configDataShow ? '#d34c5c' : '#315697') : ''}">
              配置文件自检<i class="el-icon-loading" v-if="configLoading" style="margin-left: 2px;"></i>
            </span>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="light"
            content="License自检：系统License信息检测"
            placement="bottom-start">
            <span
              label="license"
              :class="checkList.indexOf('license') > -1 ? 'detectFinished' : ''"
              :style="{'background-color': checkList.indexOf('license') > -1 ? (licenseDataShow ? '#d34c5c' : '#315697') : '', 'border-color': checkList.indexOf('license') > -1 ? (licenseDataShow ? '#d34c5c' : '#315697') : ''}">
              License自检<i class="el-icon-loading" v-if="licenseLoading" style="margin-left: 2px;"></i>
            </span>
          </el-tooltip>
        </div>
      </div>
      <el-collapse v-model="activeNames" v-if="checkList.length > 0">
        <el-collapse-item
          title="本地程序检测"
          name="1"
          v-if="programLoaclData && programLoaclData.length !== 0 && programLoaclDataShow">
          <table>
            <tr>
              <th width="180px" style="font-weight: bold;">名称</th>
              <th style="font-weight: bold;">描述</th>
              <th width="180px" style="font-weight: bold;">状态</th>
            </tr>
            <tr v-for="(item, key) in programLoaclData" :key="key" v-if="item[Object.keys(programLoaclData[key])[0]].status !== 'OK'">
              <td>{{Object.keys(programLoaclData[key])[0]}}</td>
              <td>{{item[Object.keys(programLoaclData[key])[0]].description}}</td>
              <td>{{item[Object.keys(programLoaclData[key])[0]].status}}</td>
            </tr>
          </table>
        </el-collapse-item>
        <el-collapse-item
          title="远程程序检测"
          name="2"
          v-if="programRemoteData && programRemoteData.length !== 0 && programRemoteDataShow">
          <table>
            <tr>
              <th width="180px" style="font-weight: bold;">名称</th>
              <th style="font-weight: bold;">描述</th>
              <th width="180px" style="font-weight: bold;">状态</th>
            </tr>
            <tr v-for="(item, key) in programRemoteData" :key="key" v-if="item[Object.keys(programRemoteData[key])[0]].status !== 'OK'">
              <td>{{Object.keys(programRemoteData[key])[0]}}</td>
              <td>{{item[Object.keys(programRemoteData[key])[0]].description}}</td>
              <td>{{item[Object.keys(programRemoteData[key])[0]].status}}</td>
            </tr>
          </table>
        </el-collapse-item>
        <el-collapse-item
          title="硬件自检"
          name="3"
          v-if="hw_checkData && hw_checkData.length !== 0 && (hw_checkDiskDataShow || hw_checkInterfaceDataShow || hw_checkData.cpu_status !== 'OK' || hw_checkData.memery_status !== 'OK')">
          <table>
            <tr>
              <th width="50%" style="font-weight: bold;">硬件</th>
              <th style="font-weight: bold;">状态</th>
            </tr>
            <tr v-if="hw_checkData.cpu_status !== 'OK'">
              <td>处理器</td>
              <td>{{hw_checkData.cpu_status}}</td>
            </tr>
            <tr class="hw" v-if="hw_checkDiskDataShow">
              <td style="padding: 0">
                <ul>
                  <li>硬盘</li>
                  <li>
                    <ul>
                      <li v-for="(item, index) in hw_checkData.disk_health" :key="index" v-if="item !== 'OK'">{{index}}</li>
                    </ul>
                  </li>
                </ul>
              </td>
              <td>
                <ul>
                  <li v-for="(item, index) in hw_checkData.disk_health" :key="index" v-if="item !== 'OK'">{{item}}</li>
                </ul>
              </td>
            </tr>
            <tr class="hw" v-if="hw_checkInterfaceDataShow">
              <td style="padding: 0">
                <ul>
                  <li>网卡</li>
                  <li>
                    <ul>
                      <li v-for="(item, index) in hw_checkData.interface_status" :key="index" v-if="item !== 'OK'">{{index}}</li>
                    </ul>
                  </li>
                </ul>
              </td>
              <td>
                <ul>
                  <li v-for="(item, index) in hw_checkData.interface_status" :key="index" v-if="item !== 'OK'">{{item}}</li>
                </ul>
              </td>
            </tr>
            <tr v-if="hw_checkData.memery_status !== 'OK'">
              <td>内存</td>
              <td>{{hw_checkData.memery_status}}</td>
            </tr>
          </table>
        </el-collapse-item>
        <el-collapse-item
          title="配置文件检测"
          name="4"
          v-if="configData && configData.length !== 0 && configDataShow">
          <table>
            <tr>
              <th width="350px" style="font-weight: bold;">文件名</th>
              <!-- <th>配置项</th> -->
              <th style="font-weight: bold;">状态</th>
            </tr>
            <tr v-for="(item, key) in configData" :key="key" v-if="item[Object.keys(configData[key])[0]].status !== 'OK'">
              <td><FileName :name="Object.keys(configData[key])[0]" :length="50" /></td>
              <!-- <td>{{item[Object.keys(configData[key])[0]].config}}</td> -->
              <td>{{item[Object.keys(configData[key])[0]].status}}</td>
            </tr>
          </table>
        </el-collapse-item>
        <el-collapse-item
          title="license检测"
          name="5"
          v-if="licenseData && licenseData.length !== 0 && licenseDataShow">
          <table>
            <tr>
              <th style="font-weight: bold;">检测状态</th>
              <th style="font-weight: bold;">开始时间</th>
              <th style="font-weight: bold;">过期时间</th>
            </tr>
            <tr>
              <td>{{licenseData[0] === 0 ? '成功' : '失败'}}</td>
              <td>{{licenseData[1].split(',')[0]}}</td>
              <td>{{licenseData[1].split(',')[1]}}</td>
            </tr>
          </table>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="deviceSetting">
      <h2>设备设置</h2>
      <div class="deviceSettingSetup">
        <div class="setup">
          <div>
            设置系统时间
            <div class="deviceSetting-function">
              <el-date-picker
                v-model="sys_time"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
              <button class="deviceSetting-btn .deviceSetting-btn1" @click="SetupTime"><img :src="$img.setupBtn" alt=""></button>
            </div>
          </div>
          <div>
            设备重启
            <div class="deviceSetting-function">
              <button class="deviceSetting-btn" @click="reset"><img :src="$img.resetBtn" alt=""></button>
            </div>
          </div>
          <div>
            关闭设备
            <div class="deviceSetting-function">
              <button class="deviceSetting-btn" @click="close"><img :src="$img.closeBtn" alt=""></button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="UpDate">
      <h2>系统升级</h2>
      <el-button @click="update()">病毒库升级<i class="el-icon-loading" v-if="uploadLoading" style="margin-left: 2px;"></i></el-button>
    </div>
    <div class="licenseManagement">
      <h2>授权管理</h2>
      <div>
        <div>
          开始：<span>{{licenseStartTime}}</span>
        </div>
        <div>
          结束：<span>{{licenseEndTime}}</span>
        </div>
      </div>
      <div>
        授权状态：<span>{{licenseStateList[licenseState]}}</span>
      </div>
      <div>
        <el-popover
          placement="right"
          width="200"
          v-model="resultMethod">
          <div>
            <div>请与戎磐销售人员联系</div>
            <div><el-button size="mini" @click="dialogVisible = !dialogVisible">
            {{licenseState === '1' ? '已获取授权' : '更新授权'}}</el-button></div>
          </div>
          <el-button v-if="licenseState !== '0'" size="mini" slot="reference" @click="resultMethod = !resultMethod">{{licenseState === '1' ? '激活方法' : '解决方法'}}</el-button>
        </el-popover>
        <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="30%">
          <div class="LicenseUpload">
            <div>
              <span>License授权码：</span>
              <UploadFile
                :uploadApi="uploadApiList.License"
                multiple="false"
                webkitdirectory="false"
                ids="1"
                @callback="uploadFunc"/>
            </div>
            <div>
              <span>用户指纹：</span>
              <UploadFile
                :uploadApi="uploadApiList.userCode"
                multiple="false"
                ids="2"
                webkitdirectory="false"
                @callback="uploadFunc"/>
            </div>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SystemManagemant',
  data () {
    return {
      activeNames: [],
      detectModel: '',
      checkList: [],
      licenseData: [],
      configData: [],
      programLoaclData: [],
      programRemoteData: [],
      hw_checkData: [],
      loading: false,
      sys_time: '',
      uploadLoading: false,
      licenseLoading: false,
      processLoading: false,
      configLoading: false,
      hardwareLoading: false,
      licenseStartTime: '',
      licenseEndTime: '',
      licenseState: '',
      licenseStateList: {'0': 'License正常', '1': 'License过期', '-1': 'License异常'},
      dialogVisible: false,
      resultMethod: false,
      uploadApiList: {
        License: 'license_upload',
        userCode: 'user_code_upload'
      },
      programLoaclDataShow: false,
      programRemoteDataShow: false,
      hw_checkDiskDataShow: false,
      hw_checkInterfaceDataShow: false,
      configDataShow: false,
      licenseDataShow: false
    }
  },
  methods: {
    startDetect () {
      if (localStorage.userClass === '2') {
        this.programLoaclDataShow = false
        this.programRemoteDataShow = false
        this.hw_checkDiskDataShow = false
        this.hw_checkInterfaceDataShow = false
        this.configDataShow = false
        this.licenseDataShow = false
        this.checkList = []
        var obj = {}
        obj.license = '1'
        obj.process = '1'
        obj.config = '1'
        obj.hardware = '1'
        this.loading = true
        this.processLoading = true
        this.$api.get('self_check', obj).then((res) => {
          if (res.status === 200) {
            setTimeout(() => {
              this.programLoaclData = res.data.process_check.local_error_process
              this.programLoaclData.forEach((i, j) => {
                if (i[Object.keys(this.programLoaclData[j])[0]].status !== 'OK') {
                  this.programLoaclDataShow = true
                }
              })
              this.programRemoteData = res.data.process_check.remote_error_process
              this.programRemoteData.forEach((m, n) => {
                if (m[Object.keys(this.programRemoteData[n])[0]].status !== 'OK') {
                  this.programRemoteDataShow = true
                }
              })
              this.checkList.push('process')
              this.processLoading = false
              this.hardwareLoading = true
              setTimeout(() => {
                this.hw_checkData = res.data.hw_check
                for (var o in this.hw_checkData.disk_health) {
                  if (this.hw_checkData.disk_health[o] !== 'OK') {
                    this.hw_checkDiskDataShow = true
                  }
                }
                for (var p in this.hw_checkData.interface_status) {
                  if (this.hw_checkData.interface_status[p] !== 'OK') {
                    this.hw_checkInterfaceDataShow = true
                  }
                }
                this.checkList.push('hardware')
                this.hardwareLoading = false
                this.configLoading = true
                setTimeout(() => {
                  this.configData = res.data.config_check
                  this.configData.forEach((e, f) => {
                    if (e[Object.keys(this.configData[f])[0]].status !== 'OK') {
                      this.configDataShow = true
                    }
                  })
                  this.checkList.push('config')
                  this.configLoading = false
                  this.licenseLoading = true
                  setTimeout(() => {
                    this.licenseData = res.data.license_check
                    if (this.licenseData[0] !== 0) {
                      this.licenseDataShow = true
                    }
                    this.checkList.push('license')
                    this.licenseLoading = false
                    this.loading = false
                  }, 1000)
                }, 1000)
              }, 1000)
            }, 1000)
          } else {
            this.$message.error(res.message)
          }
        })
      } else {
        this.$message.warning('您没有此项权限！')
      }
    },
    // 重启设备
    reset () {
      if (localStorage.userClass === '2') {
        this.$confirm('此操作将重启设备, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.post('machine_power', {
            signal: 1
          }).then(res => {
            if (res.status === 200) {
              this.$message({
                message: '重启设备成功',
                type: 'success'
              })
            } else {
              this.$message.error(res.message)
            }
          })
        }).catch(() => {})
      } else {
        this.$message.warning('您没有此项权限！')
      }
    },
    // 设置系统时间
    SetupTime () {
      if (localStorage.userClass === '2') {
        this.$api.post('machine_sys_time', {
          time: this.$common.dateChange(this.sys_time)
        }).then(res => {
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
    // 关闭设备
    close () {
      if (localStorage.userClass === '2') {
        this.$confirm('此操作将关闭设备, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.post('machine_power', {
            signal: 0
          }).then(res => {
            if (res.status === 200) {
              this.$message({
                message: res.message,
                type: 'success'
              })
            } else {
              this.$message.error(res.message)
            }
          })
        }).catch(() => {})
      } else {
        this.$message.warning('您没有此项权限！')
      }
    },
    // 获取数据
    init () {
      this.$api.get('machine_sys_time').then(res => {
        this.sys_time = res.data.time
      })
    },
    // 系统升级
    update () {
      if (localStorage.userClass === '2') {
        this.uploadLoading = true
        setTimeout(() => {
          this.$api.get('vdb_update').then((res) => {
            if (res) {
              if (res.status === 200) {
                this.$message.success(res.msg)
              } else {
                this.$message.warning(res.msg)
              }
            }
            this.uploadLoading = false
          })
        }, 0)
      } else {
        this.$message.warning('您没有此项权限！')
      }
    },
    licenseTime () {
      this.$api.get('license_auth').then((res) => {
        this.licenseStartTime = res.data.time.split(',')[0]
        this.licenseEndTime = res.data.time.split(',')[1]
        this.licenseState = res.auth_status.toString()
      })
    },
    uploadFunc (res) {
      if (res.status === 200) {
        this.$message.success('上传成功')
        this.licenseTime()
      } else {
        this.$message.error(res.msg)
      }
    }
  },
  mounted () {
    this.init()
    this.licenseTime()
  }
}
</script>
<style scoped="scoped" lang="scss">
  .SystemManagemant {
    color: $textColor;
    > div {
      margin-bottom: 1rem;
    }
    h2 {
      margin-bottom: .5rem;
      font-size: 1.5rem;
      border-bottom: 2px solid $borderColor;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: .2rem 0;
      th, td {
        font-size: 0;
        padding: .3rem 1rem;
        font-size: 0.8rem;
        white-space: nowrap;
        border: 1px solid $borderColor;
        > ul {
          height: 100%;
          display: flex;
          > li {
            width: 50%;
            display: flex;
            align-items: center;
            border-left: 1px solid $borderColor;
            > ul {
              width: 100%;
              > li {
                height: 29px;
                line-height: 29px;
                border-bottom: 1px solid $borderColor;
                padding: 0 1rem;
              }
              > li:last-of-type {
                border-bottom: none;
              }
            }
          }
          > li:first-of-type {
            border-left: none;
            padding: 0 1rem;
          }
        }
      }
      .hw td:last-of-type {
        padding: 0;
        > ul {
          height: 100%;
          display: block;
          overflow: hidden;
          > li {
            width: 100%;
            height: 29px;
            line-height: 29px;
            border-bottom: 1px solid $borderColor;
            align-items: center;
            border-left: none;
            padding: 0 1rem;
          }
          > li:last-of-type {
            border-bottom: none;
          }
        }
      }
    }
    .setup > div {
      font-weight: bolder;
      display: flex;
      width: 30rem;
      height: 40px;
      margin:.5rem 0;
      justify-content: flex-end;
      align-items: center;
    }
    .deviceSetting-function {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 1rem;
      height: 40px;
      width: 20rem;
      border: 1px solid rgb(52,82,126);
      border-radius: 5px;
    }
    .deviceSetting-btn {
      background-color: white;
      border: none;
      height: calc(80% - 2px);
    }
    .deviceSetting-btn img {
      max-height: 100%;
      max-width: 100%;
      height: auto;
      width: auto;
    }
    .deviceSetting-btn1 {
      background-color: white;
      border: none;
      margin-left: 2rem;
      height: calc(80% - 2px);
    }
    .Detectionbtn {
      height: 38px;
    }
    .selfCheck {
      margin-bottom: 2rem;
      > span {
        border: 1px solid $bgColor;
        border-radius: 5px;
        padding: 5.5px 12px;
        font-size: 14px;
        margin-right: 10px;
        text-align: center;
      }
    }
    .licenseManagement {
      > div {
        display: flex;
        > div:last-of-type {
          margin-left: 2rem;
        }
      }
    }
    .LicenseUpload {
      > div {
        display: flex;
        /*height: 2rem;*/
        align-items: center;
        margin-bottom: .5rem;
        span {
          display: flex;
          width: 7rem;
        }
      }
    }
  }
  .SystemManagemant .selfCheck .detectFinished {
    background-color: $bgColor;
    color: white;
  }
</style>
<style lang="scss">
  .SystemSelfCheck .el-checkbox-button.is-disabled .el-checkbox-button__inner {
    background-color: #fff;
    color: $textColor;
    cursor: default;
  }
  .SystemSelfCheck  .el-collapse-item__wrap {
    border-bottom: none;
  }
  .SystemSelfCheck .el-collapse {
    border-bottom: none;
    border-top: none;
  }
  .SystemSelfCheck .el-collapse-item__header {
    background: #d34c5c;
  }
</style>
