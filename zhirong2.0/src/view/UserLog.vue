<template>
  <div class="UserLog">
    <myHeader :title="$route.meta.title"></myHeader>
    <div class="UserLog-center">
      <div class="head-opt">
        <el-select
          v-model="value"
          clearable
          placeholder="请选择"
          @change="init(currentPage = 1)">
          <el-option
            v-for="item in userOptions"
            :key="item.value"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>
        <div class="block">
          <el-date-picker
            v-model="selectTime"
            type="datetimerange"
            range-separator=""
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']"
            @change="selectDate(selectTime); currentPage=1"
            >
          </el-date-picker>
        </div>
      </div>
      <div class="ul-list-style">
        <ul>
          <li>用户名</li>
          <li>时间</li>
          <li>操作</li>
        </ul>
        <ul v-for="(item,index) in UserList" :key="index">
          <li>{{item.user_name}}</li>
          <li>{{$common.dateChange(item.action_time)}}</li>
          <li>{{dic[item.action]}}</li>
        </ul>
      </div>
      <div class="btn-container">
        <el-pagination
          v-if="total&&UserList.length!=0"
          class="__text-left"
          background
          layout="prev, pager, next"
          :total="total"
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
      userOptions: [],
      value: '',
      selectTime: '',
      start_time: '',
      end_time: '',
      total: 0,
      currentPage: 1,
      val: 0,
      dic: {
        '10001': '用户登录',
        '10002': '用户登出',
        '10003': '用户修改密码',
        '10004': '用户注册',
        '10005': '查看日志',
        '10006': '用户查看和管理',
        '10007': '重置密码',
        '20001': '手动上传检测样本',
        '20002': '检测队列搜索',
        '20003': '样本设置优先',
        '20004': '查看检测历史',
        '20005': '查看检测详情',
        '20006': '导出检测样本',
        '20007': '检测详情导出',
        '20008': '导出检测结果列表',
        '20009': '导出分析报告',
        '20010': '给样本添加标签',
        '30001': '基因提取上传样本',
        '30002': '基因提取队列搜索',
        '30003': '家族分析结果搜索',
        '30004': '导入家族模型',
        '30005': '基因模型删除',
        '40001': '查看分析报告',
        '40002': '分析报告导出打印',
        '40003': '威胁信息搜索搜索',
        '40004': '查看apt列表',
        '40005': '查看标签列表',
        '50001': '查看系统基本状态',
        '50002': '查看沙箱状态',
        '50003': '查看存储节点运行状态',
        '50004': '查看系统存储状态',
        '50005': '检测结果恶意性过滤',
        '50007': '存储清理',
        '50008': '设置系统时间',
        '50009': '重启设备',
        '50010': '关闭设备',
        '50011': '网卡设置',
        '50012': 'Dns设置',
        '50013': '定时发送统计报表'
      }
    }
  },
  watch: {
    currentPage (page) {
      this.$router.push({
        path: '/UserLog',
        query: {
          pageNo: page || 1
        }
      })
    }
  },
  methods: {
    // 请求用户列表
    userlist () {
      this.$api.get('loguser').then(res => {
        this.userOptions = res
      })
    },
    // 请求数据
    init (val) {
      this.$api.get('userlogshow', {
        page: val || 1,
        start_time: this.start_time,
        end_time: this.end_time,
        user_name: this.value
      }).then(res => {
        if (res) {
          this.UserList = res.results
          this.total = res.count
          /*
          @ 更新当前页码
          * 需要在本地数据total有意义后才能生效
          */
          this.currentPage = Number(this.$route.query.pageNo)
        }
      })
    },
    // 翻页
    pageChange (val) {
      this.currentPage = val
      this.init(val)
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
    }
  },
  mounted () {
    this.init(this.$route.query.pageNo)
    this.userlist()
  }
}
</script>
<style scoped="scoped">
  .UserLog {
    color: rgb(52,82,126);
    height: 100%;
  }
  .UserLog-center {
    overflow-y: scroll;
    box-sizing: border-box;
    height: calc(100% - 80px);
  }
  .head-opt {
    width: 80%;
    margin: 1rem auto 0;
    padding-left: 1px;
    display: flex;
    justify-content: space-between;
  }
  .select {
    margin-right: 1rem;
  }
  .ul-list-style {
    width: 80%;
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
    width: 80%;
    margin: 1rem auto 0;
  }
</style>
