<template>
  <div class="UserLog">
    <div class="UserLog-center">
      <div class="head-opt">
        <div class="dateSelete">
          <!-- <el-select
            v-model="dateSort"
            clearable
            placeholder="请选择"
            @change="dayList()">
            <el-option
              v-for="item in sortOpt"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select> -->
          <el-date-picker
            v-model="dateRange"
            type="daterange"
            clearable
            range-separator=""
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            @change="dateRangeChange(); dayList()">
          </el-date-picker>
          <el-select
            v-model="daySelect"
            clearable
            placeholder="请选择日期"
            @change="daySeleteChange()">
            <el-option
              v-for="(item, index) in daySelectOpt"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-time-picker
            is-range
            clearable
            v-model="timeSelect"
            range-separator=""
            value-format="HH:mm:ss"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
            @change="timeSelectChange">
          </el-time-picker>
        </div>
        <div class="userSelectStyle">
          <el-select
            v-model="value"
            placeholder="请选择用户"
            @change="userSelect(value)">
            <template slot="prefix" v-if="value">
              <i class="el-icon-error el-icon-error-custom" @click="clearUrlSingle('value')"></i>
            </template>
            <el-option
              v-for="item in userOptions"
              :key="item.value"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="ul-list-style">
        <ul>
          <li>用户名</li>
          <li>时间</li>
          <li>操作</li>
          <li>ip</li>
        </ul>
        <ul v-for="(item,index) in UserData" :key="index">
          <li>{{item.username}}</li>
          <li>{{$common.dateChange(item.record_time)}}</li>
          <li>{{dic[item.log_act]}}</li>
          <li>{{item.ip}}</li>
        </ul>
      </div>
      <div class="btn-container">
        <el-pagination
          v-if="UserList.length!=0"
          class="__text-left"
          background
          layout="prev, pager, next"
          :total="UserList.length"
          :page-size="20"
          :pager-count="5"
          @current-change="pageChange"
          :current-page.sync="currentPage">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'UserLog',
  data () {
    return {
      UserList: [],
      UserData: [],
      userOptions: [],
      value: '',
      selectTime: '',
      start_time: '',
      end_time: '',
      total: 0,
      currentPage: 1,
      val: 0,
      timeSelect: ['00:00:00', '23:59:59'],
      dic: {
        '10001': '用户管理/用户登录',
        '10002': '用户管理/用户登出',
        '10003': '用户管理/用户修改密码',
        '10004': '用户管理/用户注册',
        '10005': '用户管理/查看日志',
        '10006': '用户管理/用户查看和管理',
        '10007': '用户管理/重置密码',
        '10008': '用户管理/删除用户',
        '10009': '用户管理/修改用户权限',
        '10010': '用户管理/修改用户过期时间',
        '10011': '用户管理/后台用户重置密码',
        '10012': '用户管理/用户简介',
        '10013': '用户管理/日志日期查看',
        '20001': '样本分析/手动上传检测样本',
        '20002': '样本分析/检测队列搜索',
        '20003': '样本分析/样本设置优先',
        '20004': '样本分析/查看检测历史',
        '20005': '样本分析/查看检测详情',
        '20006': '样本分析/导出检测样本',
        '20007': '样本分析/检测详情导出',
        '20008': '样本分析/导出检测结果列表',
        '20009': '样本分析/导出分析报告',
        '20010': '样本分析/给样本添加标签',
        '20011': '样本分析/下载检测样本',
        '20012': '样本分析/添加标签',
        '20014': '样本分析/重新检测',
        '20015': '样本分析/样本重要性标记',
        '20016': '样本分析/样本处理状态标记',
        '20017': '样本分析/下载检测历史',
        '20018': '样本分析/设置上传文件大小',
        '20019': '样本分析/重新动态检测',
        '30001': '基因分析/基因提取上传样本',
        '30002': '基因分析/基因提取队列搜索',
        '30003': '基因分析/家族分析结果搜索',
        '30004': '基因分析/导入家族模型',
        '30005': '基因分析/基因模型删除',
        '30006': '基因分析/下载家族模型',
        '30007': '基因分析/基因文件下载',
        '40001': '报表管理/查看分析报告',
        '40002': '报表管理/分析报告导出打印',
        '40003': '报表管理/威胁信息搜索',
        '40004': '报表管理/查看apt列表',
        '40005': '报表管理/查看标签列表',
        '50001': '设备管理/检测引擎调度控制',
        '50002': '设备管理/更新调度机状态',
        '50003': '设备管理/查看存储节点运行状态',
        '50004': '设备管理/沙箱开/关',
        '50005': '设备管理/批量删除样本',
        '50006': '设备管理/设置系统时间',
        '50007': '设备管理/重启设备',
        '50008': '设备管理/网卡设置',
        '50009': '设备管理/Dns设置',
        '50010': '设备管理/定时发送统计报表',
        '50011': '设备管理/报表测试',
        '60001': '检测管理/下载报表',
        '60002': '检测管理/下载事件记录',
        '60005': '检测管理/设置bro信息',
        '60006': '检测管理/检测功能设置',
        '60007': '检测管理/报表功能设置',
        '60008': '检测管理/生成报表信息',
        '60009': '检测管理/添加白名单',
        '60010': '检测管理/添加自定义检测类型',
        '60011': '检测管理/开启自检功能',
        '60012': '检测管理/删除白名单',
        '60013': '检测管理/白名单状态开/关',
        '70001': '设备管理/主机信息管理',
        '70002': '设备管理/告警等级管理',
        '70003': '设备管理/告警动作类型管理',
        '70004': '设备管理/监控项目管理',
        '70005': '设备管理/触发器管理'
      },
      selectDay: '',
      dateSort: '1',
      sortOpt: [{
        value: '1',
        label: '倒序'
      }, {
        value: '',
        label: '正序'
      }],
      daySelect: '',
      daySelectOpt: [],
      dateStart_time: '',
      dateEnd_time: '',
      dateRange: [],
      currentDay: '',
      path: '/UserLog'
    }
  },
  watch: {
    dateSort (val) {
      if (val === '1') {
        this.currentDay = this.daySelectOpt[0]
      }
    }
  },
  methods: {
    userSelect (val) {
      let q = this.$common.inheritObj(this.$route.query)
      q.username = val
      q.page = 1
      this.$router.push({
        path: this.path,
        query: q
      })
      this.init()
    },
    clearUrlSingle (val) {
      let q = this.$common.inheritObj(this.$route.query)
      q.username = ''
      this[val] = ''
      this.$router.push({
        path: this.path,
        query: q
      })
      this.init()
    },
    // 请求用户列表
    userlist () {
      this.$api.get('loguser').then(res => {
        this.userOptions = res
      })
    },
    dayList () {
      this.$api.get('logdaylist', {
        sort_style: this.dateSort,
        start_time: this.dateStart_time,
        end_time: this.dateEnd_time
      }).then(res => {
        this.daySelectOpt = res.data.log_list
        if (res.data.log_list.length > 0) {
          if (this.dateSort === '1') {
            this.currentDay = this.daySelectOpt[0]
            this.daySelect = this.daySelect === '' ? this.daySelectOpt[0] : this.daySelete
          } else {
            this.currentDay = this.daySelectOpt[this.daySelectOpt.length - 1]
            this.daySelect = this.daySelectOpt[this.daySelectOpt.length - 1]
          }
          this.init()
        }
      })
    },
    // 请求数据
    init (val) {
      if (this.daySelect !== '') {
        this.$api.get('logshow', {
          record_time: this.daySelect,
          start_time: (!this.start_time || this.start_time === '') ? '' : (this.daySelect + ' ' + this.start_time),
          end_time: (!this.end_time || this.end_time === '') ? '' : (this.daySelect + ' ' + this.end_time),
          username: this.value,
          act_url: ''
        }).then(res => {
          if (res.status === 200) {
            this.UserList = res.data.result
            this.UserData = []
            this.$common.pagechange(this.UserData, this.UserList, this.$route.query.page || 1, 20)
            // @ 更新当前页码
            // * 需要在本地数据total有意义后才能生效
            this.currentPage = Number(this.$route.query.page)
          }
        })
      }
    },
    // 翻页
    pageChange (val) {
      let q = this.$common.inheritObj(this.$route.query)
      q.page = val
      this.$router.push({
        path: this.path,
        query: q
      })
      this.UserData = []
      this.$common.pagechange(this.UserData, this.UserList, val, 20)
    },
    timeSelectChange () {
      this.start_time = this.timeSelect[0] ? this.timeSelect[0] : ''
      this.end_time = this.timeSelect[1] ? this.timeSelect[1] : ''
      let q = this.$common.inheritObj(this.$route.query)
      q.start_time = this.start_time
      q.end_time = this.end_time
      q.timeSelect = this.timeSelect
      q.page = 1
      this.$router.push({
        path: this.path,
        query: q
      })
      this.init()
    },
    // 获取时间项同时更新返回的数据
    selectDate (str) {
      if (this.selectTime === null) {
        this.selectTime = ''
        this.start_time = ''
        this.end_time = ''
      } else {
        this.start_time = this.$common.dateChange(str[0])
        this.end_time = this.$common.dateChange(str[1])
      }
      this.init(this.currentPage = 1)
    },
    dateRangeChange () {
      this.dateStart_time = this.dateRange[0]
      this.dateEnd_time = this.dateRange[1]
      let q = this.$common.inheritObj(this.$route.query)
      q.dateStart_time = this.dateStart_time
      q.dateEnd_time = this.dateEnd_time
      q.dateRange = this.dateRange
      this.$router.push({
        path: this.path,
        query: q
      })
    },
    daySeleteChange () {
      let q = this.$common.inheritObj(this.$route.query)
      q.daySelete = this.daySelete
      q.page = 1
      this.$router.push({
        path: this.path,
        query: q
      })
      this.init()
    }
  },
  mounted () {
    this.value = this.$route.query.username ? this.$route.query.username : ''
    this.currentPage = this.$route.query.page ? Number(this.$route.query.page) : 1
    this.dateStart_time = this.$route.query.dateStart_time ? this.$route.query.dateStart_time : ''
    this.dateEnd_time = this.$route.query.dateEnd_time ? this.$route.query.dateEnd_time : ''
    this.dateRange = this.$route.query.dateRange ? this.$route.query.dateRange : ''
    this.start_time = this.$route.query.start_time ? this.$route.query.start_time : ''
    this.end_time = this.$route.query.end_time ? this.$route.query.end_time : ''
    this.timeSelect = this.$route.query.timeSelect ? this.$route.query.timeSelect : ['00:00:00', '23:59:59']
    this.daySelete = this.$route.query.daySelete ? this.$route.query.daySelete : ''
    this.userlist()
    this.dayList()
  }
}
</script>
<style scoped="scoped" lang="scss">
  .UserLog {
    color: rgb(52,82,126);
    height: 100%;
    .el-icon-error-custom {
      line-height: 40px;
    }
  }
  .UserLog-center {
    box-sizing: border-box;
    height: calc(100% - 80px);
  }
  .head-opt {
    margin: 1rem auto 0;
    padding-left: 1px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .select {
    margin-right: 1rem;
  }
  .ul-list-style {
    margin: 1rem auto 0;
  }
  .ul-list-style ul {
    height: 2.5rem;
    width: 100%;
    font-weight: bolder;
    color: rgb(52,82,126);
    display: flex;
    text-align: center;
    overflow: hidden;
  }
  .ul-list-style ul li {
    float: left;
    line-height: 2.5rem;
    width: calc(100% / 3 - 4px);
    margin: .05rem .1rem;
    border:1px solid rgb(52,82,126);
    border-radius: 5px;
  }
  .btn-container {
    margin: .5rem auto .5rem;
  }
</style>
<style lang="scss">
  .UserLog {
    .el-date-editor {
      border: 1px solid rgb(52,82,126);
      border-radius: 5px;
      overflow: hidden;
    }
    .el-date-editor:hover {
      border-color: rgb(52,82,126);
    }
    .el-date-editor.el-input {
      width: 200px;
    }
    .dateSelete {
      display: flex;
      align-items: center;
    }
    .dateSelete .el-date-editor {
      border-radius: 5px 0 0 5px;
      height: 42px;
      border-right: none;
      width: 320px;
    }
    .dateSelete .el-select {
      border-radius: 0 5px 5px 0;
      width: 160px;
    }
    .dateSelete .el-range-editor.is-active {
      border-color: rgb(52,82,126);
    }
    .el-date-editor .el-range-input {
      border: none;
    }
    .userSelectStyle .el-select .el-input input {
      max-width: 198px;
    }
  }
</style>
