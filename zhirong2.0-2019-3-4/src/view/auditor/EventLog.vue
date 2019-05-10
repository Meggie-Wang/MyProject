<template>
  <div class="eventLog-con">
    <div class="UserLog-center">
      <div class="head-opt">
        <div class="block">
          <el-date-picker
            v-model="selectTime"
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            @change="init(1)">
          </el-date-picker>
        </div>
        <div class="output">
          <el-date-picker
            type="dates"
            v-model="selectDates"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="选择一个或多个日期">
          </el-date-picker>
          <el-button @click="exportLog">导出日志</el-button>
        </div>
      </div>
      <div class="ul-list-style">
        <ul>
          <li>发现时间</li>
          <!-- <li>文件名</li> -->
          <li>md5值</li>
          <li>协议</li>
          <li>源IP</li>
          <li>源端口</li>
          <li>目的IP</li>
          <li>目的端口</li>
          <li>病毒名称</li>
        </ul>
        <ul v-for="(item, index) in tableData" :key="index">
          <li><FileName :name="$common.dateChange(item.open_time)" :length="10" noEllipse="true"/></li>
          <!-- <li><FileName :name="item.file_name" :length="10"/></li> -->
          <li><FileName :name="item.sample_md5" :length="12"/></li>
          <li>{{item.protocol.toUpperCase()}}</li>
          <li><FileName :name="item.source_ip" :length="12"/></li>
          <li>{{item.source_port}}</li>
          <li><FileName :name="item.target_ip" :length="12"/></li>
          <li>{{item.target_port}}</li>
          <li>{{item.virus_name}}</li>
        </ul>
      </div>
      <div class="btn-container">
        <el-pagination
          v-if="total&&tableData.length!=0"
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
  name: 'eventLog-con',
  data () {
    return {
      userOptions: [],
      value: '',
      selectTime: '',
      realDate: '',
      start_time: '',
      end_time: '',
      total: 0,
      currentPage: 1,
      val: 0,
      selectDates: '',
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
      },
      tableData: []
    }
  },
  watch: {
    currentPage (page) {
      this.$router.push({
        path: '/EventLog',
        query: {
          pageNo: page || 1
        }
      })
    }
  },
  methods: {
    // 请求数据
    init (val) {
      this.$api.get('event_info', {
        day: this.selectTime,
        page: val || 1
      }).then(res => {
        if (res) {
          this.total = res.count
          this.tableData = res.results
        }
      })
    },
    // 翻页
    pageChange (val) {
      this.currentPage = val
      this.init(val)
    },
    exportLog () {
      var a = this.$api.apiPath + 'api/import_event/?days=' + this.selectDates.join(',') + '&token=' + localStorage[localStorage.tokenName + '_token']
      window.open(a, '_blank')
    }
  },
  mounted () {
    this.init(this.$route.query.pageNo)
  }
}
</script>
<style scoped="scoped" lang="scss">
  .eventLog-con {
    color: rgb(52,82,126);
    height: 100%;
  }
  .UserLog-center {
    box-sizing: border-box;
  }
  .head-opt {
    margin: 1rem auto 0;
    padding-left: 1px;
    display: flex;
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
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .output {
    display: flex;
    align-items: center;
  }
</style>
<style>
  .block .el-date-editor {
    border: 1px solid #3a537e!important;
    border-radius: 4px;
  }
  .output .el-date-editor {
    border: 1px solid #3a537e!important;
    border-radius: 4px 0 0 4px;
    border-right: none;
  }
  .output .el-button {
    border-radius: 0 4px 4px 0;
    height: 42px;
    margin-left: 0;
  }
</style>
