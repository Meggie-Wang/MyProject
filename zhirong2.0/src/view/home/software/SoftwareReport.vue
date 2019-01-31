<template>
<div class="software-report">
  <div class="software-report-container">
    <div class="function-description">
      <div>
        <h2>功能说明</h2>
        <el-button
        class="addBtn"
        @click="centerDialogVisibleShow"
        v-if="!$store.state.editAuth">添加申请</el-button>
      </div>
      <p>国家互联网响应中为促进、拓展新业务，加大对恶意代码安全厂商的汇聚力度，使用软件技术，开展杀毒引擎benchmark测评。利用基因分析技术对恶意代码的同源性和一致性进行检测，生成涵盖不同家族、不同类型等属性的benchmark样本测试集，进而向各类杀毒引擎提供标准的性能测试服务。</p>
    </div>
    <div class="use-description">
      <h2>使用说明</h2>
      <p>1.提交检测需求</p>
      <p>2.生成检测样本库</p>
      <p>3.等待中心检测，并生成检测报告</p>
    </div>
    <div class="platform-state">
      <h2>平台状态</h2>
      <table>
        <tr>
          <td>恶意样本数量</td>
          <td>软件基因数量</td>
          <td>操作系统</td>
        </tr>
        <tr
          v-for="(item, index) in system_total"
          :key="index">
          <td>{{item.virus_nums}}</td>
          <td>{{item.gene_nums}}</td>
          <td>{{item.system}}</td>
        </tr>
      </table>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane
          label="评测申请"
          name="first">
          <table>
            <tr>
              <td>评测对象名称</td>
              <td>评测对象版本</td>
              <td>申请时间</td>
              <td>申请人</td>
              <td>操作</td>
            </tr>
            <tr
              v-for="(item, index) in evalutation_application"
              :key="index">
              <td>{{item.evalutation}}</td>
              <td>{{item.version}}</td>
              <td>{{item.use_time}}</td>
              <td>{{item.user_info.name}}</td>
              <td>
                <el-button type="small" @click="applyDetail(item.id)">详情</el-button><el-button
                type="small"
                @click="report(item.id)"
                v-if="$store.state.editAuth">处理</el-button>
              </td>
            </tr>
            <tr v-if="!evalutation_application.length">
              <td colspan="5" style="height: 3rem; color: #909399">暂无数据</td>
            </tr>
          </table>
          <el-pagination
            v-if="evalutation_application.length"
            class="__text-left"
            background
            layout="prev, pager, next"
            :total="applytotal"
            :page-size="10"
            :pager-count="5"
            @current-change="applyPageChange"
            :current-page.sync="applycurrentPage">
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane
          label="评测结果"
          name="second">
          <table>
            <tr>
              <td>评测对象名称</td>
              <td>评测对象版本</td>
              <td>评测时间</td>
              <td>评测人</td>
              <td>查杀率</td>
              <td>操作</td>
            </tr>
            <tr
              v-for="(item, index) in evalutation_result"
              :key="index">
              <td>{{item.evalutation}}</td>
              <td>{{item.version}}</td>
              <td>{{$common.dateChange(item.evalutation_time).split(' ')[0]}}</td>
              <td>adminuser</td>
              <td>{{item.kill_rate}}</td>
              <td>
                <el-button
                  type="small"
                  @click="applyDetail(item.id)">
                  详情
                </el-button>
                <el-button
                  type="small"
                  @click="report(item.id, 'done', tabNumber)">
                  报告
                </el-button>
              </td>
            </tr>
            <tr v-if="!evalutation_result.length">
              <td colspan="5" style="height: 3rem; color: #909399">暂无数据</td>
            </tr>
          </table>
          <el-pagination
            v-if="evalutation_result.length"
            class="__text-left"
            background
            layout="prev, pager, next"
            :total="resulttotal"
            :page-size="10"
            :pager-count="5"
            @current-change="resultPageChange"
            :current-page.sync="resultcurrentPage">
          </el-pagination>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
  <el-dialog
    :visible.sync="centerDialogVisible"
    width="70%"
    :before-close="handleClose">
    <div class="add-application-box">
      <div class="add-application-container">
        <div class="evaluation-object">
          <h2>评测对象</h2>
          <div class="evaluation-object_firstrow">
            <div>
              <div>
                <span>评测对象名称：</span>
                <el-input
                  placeholder="（只能输入中、英文、数字字符）"
                  v-model="objName"
                  :disabled="disabled"
                  @blur="objNameChk(objName)">
                </el-input>
              </div>
              <span v-if="objNameCheck">{{objNameCheckMsg}}</span>
              <span v-else></span>
            </div>
            <div>
              <div>
                <span>评测对象版本：</span>
                <el-input
                  placeholder="请输入测评对象版本"
                  v-model="objVersion"
                  :disabled="disabled"
                  @blur="objVersionChk(objVersion)">
                </el-input>
              </div>
              <span v-if="objVersionCheck">{{objVersionCheckMsg}}</span>
              <span v-else></span>
            </div>
          </div>
          <div class="evaluation-object_lastrow">
            <div>
              <span>测评对象链接：</span>
                <el-input
                  placeholder="（例：www.baidu.com）"
                  v-model="objUrl"
                  :disabled="disabled"
                  @blur="urlChk(objUrl)"
                  >
                </el-input>
            </div>
            <span v-if="urlCheck">{{urlCheckMsg}}</span>
            <span v-else></span>
          </div>
        </div>
        <div class="sample-library-selection">
          <div>
            <h2>样本库选择</h2>
            <span v-if='selectCheck'>{{selectCheckMsg}}</span>
            <span v-else></span>
          </div>
          <table>
            <tr>
              <td>样本库生产时间</td>
              <td>恶意样本数量</td>
              <!-- <td>安全样本数量</td> -->
              <td>包含基因数量</td>
              <td width="40" v-if="description">
                <el-checkbox
                  v-model="allchecked"
                  :disabled="disabled"
                  @change="allCheck">
                </el-checkbox>
              </td>
            </tr>
            <tr
              v-for="(item, index) in sample_data"
              :key="index">
              <td>{{item.create_time}}</td>
              <td>{{item.virus_sample_nums}}</td>
              <!-- <td>{{item.norm_sample_nums}}</td> -->
              <td>{{item.gene_nums}}</td>
              <td v-if="description">
                <el-checkbox
                  v-model="checked[index]"
                  :disabled="disabled"
                  @click="checked[index] = !checked[index]">
                </el-checkbox>
              </td>
            </tr>
          </table>
          <el-pagination
            v-if="sample_data.length"
            class="__text-left"
            background
            layout="prev, pager, next"
            :total="sampletotal"
            :page-size="20"
            :pager-count="5"
            @current-change="samplePageChange"
            :current-page.sync="samplecurrentPage">
          </el-pagination>
        </div>
        <div class="contact-information">
          <h2>联系方式</h2>
          <div>
            <div>
              <div>
                <span>联系人单位：</span>
                <el-input
                  placeholder="请输入联系人单位"
                  v-model="company"
                  :disabled="disabled"
                  @blur="companyChk(company)">
                </el-input>
              </div>
              <span v-if="companyCheck">{{companyCheckMsg}}</span>
              <span v-else></span>
            </div>
            <div>
              <div>
                <span>联系人姓名：</span>
                <el-input
                  width="100px"
                  placeholder="（只能输入中、英文、数字字符）"
                  v-model="Name"
                  :disabled="disabled"
                  @blur="NameChk(Name)">
                </el-input>
              </div>
              <span v-if="NameCheck">{{NameCheckMsg}}</span>
              <span v-else></span>
            </div>
            <div>
              <div>
                <span>联系人邮箱：</span>
                <el-input
                  placeholder="（例：88886666@qq.com）"
                  v-model="email"
                  :disabled="disabled"
                  @blur="emailChk(email)">
                </el-input>
              </div>
              <span v-if="emailCheck">{{emailCheckMsg}}</span>
              <span v-else></span>
            </div>
          </div>
        </div>
        <div class="BTN">
          <el-button
            @click="submit"
            :disabled="disabled">
            提交
          </el-button>
          <el-button @click="centerDialogVisibleClose">
            取消
          </el-button>
        </div>
      </div>
    </div>
  </el-dialog>
</div>
</template>
<script type="text/javascript">
export default {
  name: 'SoftwareReport',
  data () {
    return {
      userClass: localStorage.userClass,
      activeName: 'first',
      allchecked: false,
      centerDialogVisible: false,
      checked: [],
      objName: '',
      objVersion: '',
      objUrl: '',
      Name: '',
      email: '',
      company: '',
      disabled: true,
      applytotal: 0,
      resulttotal: 0,
      sampletotal: 0,
      applycurrentPage: 1,
      resultcurrentPage: 1,
      samplecurrentPage: 1,
      system_total: [],
      sample_data: [],
      evalutation_application: [],
      evalutation_result: [],
      sample_dataPage: false,
      description: true,
      objNameCheck: false,
      objNameCheckMsg: '',
      objVersionCheck: false,
      objVersionCheckMsg: '',
      urlCheck: false,
      urlCheckMsg: '',
      companyCheck: false,
      companyCheckMsg: '',
      NameCheck: false,
      NameCheckMsg: '',
      emailCheck: false,
      emailCheckMsg: '',
      selectCheck: false,
      selectCheckMsg: '',
      dataArr: [],
      tabNumber: 1
    }
  },
  watch: {
    checked (val) {
      let a = true
      for (var i in val) {
        if (val[i] === false) {
          a = false
        }
      }
      if (a) {
        this.allchecked = true
      } else {
        this.allchecked = false
      }
    }
  },
  methods: {
    urlSync () {
      this.$router.push({
        path: '/SoftwareReport',
        query: {
          pageNo1: this.applycurrentPage || 1,
          pageNo2: this.resultcurrentPage || 1,
          type: this.tabNumber
        }
      })
    },

    // 平台状态
    systemTotal () {
      this.$api.get('system_total').then(res => {
        this.system_total = res
      })
    },

    // 样本库
    init (val) {
      this.$api.get('sample_data', {
        page: val || 1
      }).then(res => {
        if (res) {
          this.dataArr = res.results
          this.sampletotal = res.count
          for (var i in this.dataArr) {
            this.checked[i] = false
          }
          /*
          @ 更新当前页码
          * 需要在本地数据total有意义后才能生效
          */
          this.samplecurrentPage = Number(this.$route.query.pageNo)
        }
      })
    },

    // 评测申请
    evalutationApp (val) {
      this.flag = 0
      this.$api.get('evalutation_application', {
        page: val || 1
      }).then(res => {
        if (res) {
          this.evalutation_application = res.results
          this.applytotal = res.count
          this.applycurrentPage = Number(this.$route.query.pageNo)
        }
      })
    },

    // 评测结果列表
    evalutationResultList (val) {
      this.$api.get('evalutation_list', {
        page: val || 1
      }).then(res => {
        if (res) {
          this.evalutation_result = res.results
          this.resulttotal = res.count
          this.resultcurrentPage = Number(this.$route.query.pageNo)
        }
      })
    },

    // 提交申请
    submit () {
      this.$confirm(('确认提交?'), '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var a = []
        for (var i in this.checked) {
          if (this.checked[i] === true) {
            a.push(this.sample_data[i].id)
          }
        }
        if (!this.objNameCheck && this.objName && !this.objVersionCheck && this.objVersion && !this.urlCheck && this.objUrl && !this.NameCheck && this.Name && !this.companyCheck && this.company && !this.emailCheck && this.email && a.length) {
          this.$api.post('add_application', {
            user_id: window.localStorage.session_id,
            evalutation_objects: JSON.stringify({
              name: this.objName,
              version: this.objVersion,
              url: this.objUrl
            }),
            sampledata: a.toString(),
            user_info: JSON.stringify({
              name: this.Name,
              company: this.company,
              email: this.email
            })
          }).then(res => {
            if (res.status === 200) {
              this.$message({
                message: res.message,
                type: 'success'
              })
              this.centerDialogVisibleClose()
              this.evalutationApp()
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          if (a.length === 0) {
            this.selectCheck = true
            this.selectCheckMsg = '请选择样本库'
          } else {
            this.selectCheck = false
            this.selectCheckMsg = ''
          }
          this.objNameChk(this.objName)
          this.objVersionChk(this.objVersion)
          this.urlChk(this.objUrl)
          this.NameChk(this.Name)
          this.companyChk(this.company)
          this.emailChk(this.email)
        }
      }).catch(() => {
      })
    },

    // 多选
    allCheck () {
      if (this.allchecked === true) {
        for (var i in this.checked) {
          this.checked[i] = true
        }
      } else {
        for (var j in this.checked) {
          this.checked[j] = false
        }
      }
    },

    // 添加申请显示
    centerDialogVisibleShow () {
      this.reset()
      this.resetTip()
      this.sample_data = this.dataArr
      this.centerDialogVisible = true
      this.disabled = false
    },

    // 取消按钮
    centerDialogVisibleClose () {
      this.centerDialogVisible = false
    },

    // 详情
    applyDetail (val) {
      this.resetTip()
      this.centerDialogVisible = true
      this.disabled = true
      this.$api.get('application_description', {
        id: val
      }).then(res => {
        this.objName = res.data.evalutation_objects.name
        this.objVersion = res.data.evalutation_objects.version
        this.objUrl = res.data.evalutation_objects.url
        this.Name = res.data.user_info.name
        this.email = res.data.user_info.email
        this.company = res.data.user_info.company
        this.sample_data = res.data.sampledata_list
        this.description = false
      })
    },

    // 报告
    report (id, done) {
      this.$router.push({path: 'SoftwareReportDetail', query: {id: id, done: done, type: this.tabNumber}})
    },

    // 重置输入内容
    reset () {
      for (var i in this.checked) {
        this.checked[i] = false
      }
      this.objName = ''
      this.objVersion = ''
      this.objUrl = ''
      this.Name = ''
      this.email = ''
      this.company = ''
      this.description = true
      this.allchecked = false
    },

    // 重置提示
    resetTip () {
      this.objNameCheck = false
      this.objNameCheckMsg = ''
      this.objVersionCheck = false
      this.objVersionCheckMsg = ''
      this.urlCheck = false
      this.urlCheckMsg = ''
      this.companyCheck = false
      this.companyCheckMsg = ''
      this.NameCheck = false
      this.NameCheckMsg = ''
      this.emailCheck = false
      this.emailCheckMsg = ''
      this.selectCheck = false
      this.selectCheckMsg = ''
    },

    // 弹窗关闭前取消所选项
    handleClose (done) {
      done()
    },

    // tab的点击事件点击时记录当前选项位置
    handleClick () {
      if (this.activeName === 'first') {
        this.tabNumber = 1
      } else if (this.activeName === 'second') {
        this.tabNumber = 2
      }
      this.urlSync()
    },

    // 页面跳转刷新
    applyPageChange (val) {
      this.applycurrentPage = val
      this.evalutationApp(val)
    },

    resultPageChange (val) {
      this.resultcurrentPage = val
      this.evalutationResultList(val)
    },

    samplePageChange (val) {
      this.samplecurrentPage = val
      this.init(val)
    },

    // 对象名称检测
    objNameChk (val) {
      let Namec = /^[A-Za-z0-9\u4e00-\u9fa5]+$/
      if (val === '') {
        this.objNameCheck = true
        this.objNameCheckMsg = '请输入测评对象名称'
      } else {
        if (!Namec.test(val)) {
          this.objNameCheck = true
          this.objNameCheckMsg = '请输入正确格式的名称（只能输入中、英文、数字字符）'
        } else {
          this.objNameCheck = false
        }
      }
    },

    // 对象名称检测
    objVersionChk (val) {
      if (val === '') {
        this.objVersionCheck = true
        this.objVersionCheckMsg = '请输入测评对象版本'
      } else {
        this.objVersionCheck = false
      }
    },

    // 对象链接检测
    urlChk (val) {
      // let url = '(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]'
      let urlc = /^(?=^.{3,255}$)(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*$/
      if (val === '') {
        this.urlCheck = true
        this.urlCheckMsg = '请输入测评对象链接'
      } else {
        if (!urlc.test(val)) {
          this.urlCheck = true
          this.urlCheckMsg = '请输入正确格式的链接（如：www.baidu.com）'
        } else {
          this.urlCheck = false
        }
      }
    },

    // 联系人单位检测
    companyChk (val) {
      if (val === '') {
        this.companyCheck = true
        this.companyCheckMsg = '请输入联系人单位'
      } else {
        this.companyCheck = false
      }
    },

    // 联系人姓名检测
    NameChk (val) {
      let Namec = /^[A-Za-z0-9\u4e00-\u9fa5]+$/
      if (val === '') {
        this.NameCheck = true
        this.NameCheckMsg = '请输入联系人姓名'
      } else {
        if (!Namec.test(val)) {
          this.NameCheck = true
          this.NameCheckMsg = '请输入正确格式的联系人姓名（只能输入中、英文、数字字符）'
        } else {
          this.NameCheck = false
        }
      }
    },

    // 联系人邮箱检测
    emailChk (val) {
      let emailc = /^[a-zA-Z0-9_.-]+@[a-z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-z]{2,5}$/
      if (val === '') {
        this.emailCheck = true
        this.emailCheckMsg = '请输入联系人邮箱'
      } else {
        if (!emailc.test(val)) {
          this.emailCheck = true
          this.emailCheckMsg = '请输入正确格式的邮箱（如：88886666@qq.com）'
        } else {
          this.emailCheck = false
        }
      }
    }
  },
  mounted () {
    this.tabNumber = this.$route.query.type || 1
    switch (Number(this.tabNumber)) {
      case 1:
        this.activeName = 'first'
        break
      case 2:
        this.activeName = 'second'
        break
    }
    this.init()
    this.systemTotal()
    this.evalutationApp()
    this.evalutationResultList()
  }
}
</script>
<style scoped="scoped" lang="scss">
$color: #315679;
.software-report {
  h2 {
    color: $color;
    line-height: 3rem;
    font-size: 1.5rem;
    border-bottom: 1px solid $color;
    margin-bottom: 1rem;
  }
  p {
    color: $color;
    text-indent: 2rem;
  }
  span {
    color: $color;
  }
  .software-report-container {
    width: 80%;
    height: calc(100% - 40px);
    margin: 20px auto;
    position: relative;
    .function-description {
      position: relative;
      .addBtn {
        position: absolute;
        top: 0;
        right: 0;
      }
    }
  }
  .add-application-box{
    position: relative;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    > span {
      position: absolute;
      top: 10px;
      right: 10px;
      cursor: pointer;
    }
    .add-application-container {
      width: 90%;
      .sample-library-selection {
        > div {
          position: relative;
          > span {
            position: absolute;
            right: 0;
            bottom: 0;
            color: red
          }
        }
      }
      .evaluation-object {
        .el-input {
          border: 1px solid $color;
          border-radius: 5px;
        }
        span {
          min-width: 7rem;
        }
        .evaluation-object_firstrow {
          display: flex;
          flex-wrap: wrap;
          .el-input {
            min-width: 15rem;
          }
          > div {
            margin: 0rem 1rem;
            flex: 1;
            > div {
              display: flex;
              align-items: center;
            }
            > span {
              margin-left: 7rem;
              color: red;
            }
          }
        }
        .evaluation-object_lastrow {
          margin: 0rem 1rem;
          > div {
            display: flex;
            align-items: center;
          }
          > span {
            color: red;
            margin-left: 7rem;
          }
        }
      }
      .contact-information {
        span {
          min-width: 6rem;
        }
        .el-input {
          width: calc(50% - 9rem);
          min-width: 15rem;
        }
        > div {
          display: flex;
          flex-wrap: wrap;
          > div {
            flex: 1;
            margin: 0rem 1rem;
            > div {
              display: flex;
              align-items: center;
              .el-input {
                border: 1px solid $color;
                border-radius: 5px;
              }
            }
            > span {
              display: flex;
              height: 1.5rem;
              margin-left: 6rem;
              color: red;
            }
          }
        }
      }
      .BTN {
        width: 100%;
        margin-top: 1.5rem;
        display: flex;
        justify-content: center;
      }
    }
  }
  table {
    width: 100%;
    background: transparent;
    text-align: center;
    color: $color;
    table-layout: fixed;
    font-size: 1rem;
    margin-bottom: 1rem;
  }
  table tr td {
    box-sizing: border-box;
    border: 1px solid $color;
    vertical-align: middle;
    padding: 2px 0;
    line-height: 1.5rem;
  }
  table tr td table tr td {
    padding: 0;
    box-sizing: border-box;
    border: 1px solid $color;
  }
  table tr td table tr:first-child td {
    border-top-width: 0;
  }
  table tr td table tr:last-child td {
    border-bottom-width: 0;
  }
  table tr td table tr td:first-child {
    border-left-width: 0;
  }
  table tr td table tr td:last-child {
    border-right-width: 0;
  }
}
</style>
