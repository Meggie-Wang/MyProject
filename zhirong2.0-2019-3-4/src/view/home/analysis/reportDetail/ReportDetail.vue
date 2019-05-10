<template>
  <div class="ReportDetail" id="pdfDom">
    <div v-if="is_unFinished">
      <template>
        <Loading></Loading>
      </template>
    </div>
    <div class="ReportDetail_container">
      <div>
        <el-button class="print-btn" @click="goPrint()">导出/打印</el-button>
        <div class="title">
          <h1 v-if="Number($route.query.type) === 1">{{ $route.query.title }}分析报告</h1>
          <h1 v-else>{{ $route.query.title.split('-->')[0] }}至{{ $route.query.title.split('-->')[1] }}分析报告</h1>
        </div>
        <table>
          <tr>
            <td>测试样本总数</td>
            <td>恶意样本</td>
            <td>安全文件</td>
            <td>疑似样本</td>
          </tr>
          <tr v-for="(item, index) in sampleTrendData" :key="index">
            <td>{{item.sample_total_amount}}</td>
            <td>{{item.maliciously_amount}}</td>
            <td>{{item.nonmaliciously_amount}}</td>
            <td>{{item.unknow_amount}}</td>
          </tr>
        </table>
      </div>
      <div>
        <div class="title" v-if="attackSource">
          <h2>恶意攻击源分布</h2>
        </div>
        <div class="attackSource" v-if="attackSource">
          <Point2 v-if="$tokenName === 'guoan'" :winResize="winResize" :myChartData="reportDetailtData.map_data" pointSize="3" pointRange="12"/>
          <Point v-else :winResize="winResize" :myChartData="reportDetailtData.map_data" pointSize="3" pointRange="12"/>
        </div>
      </div>
      <div>
        <div class="title"  v-if="attackSource">
          <h2>威胁数据统计</h2>
        </div>
        <div class="stateAnalysis"  v-if="attackSource">
          <Bar :winResize="winResize" :myChartData="reportDetailtData.map_data" echartTitleColor="#315697" />
        </div>
      </div>
      <div>
        <div class="title" v-if="family">
          <h2>样本家族分析</h2>
        </div>
        <div class="familyAnalysis" v-if="family">
          <Pie2
          v-if="$tokenName === 'guoan'"
          :winResize="winResize"
          :myChartData="reportDetailtData.gene_family"
          echartTitleColor="#315697"
          legend="false"/>
          <Pie
          v-else
          :winResize="winResize"
          :myChartData="reportDetailtData.gene_family"
          echartTitleColor="#315697"
          legend="false"/>
        </div>
      </div>
      <div>
        <div class="title" v-if="typeFever">
          <h2>样本类型热度</h2>
        </div>
        <div class="typeFever" v-if="typeFever">
          <WordList :winResize="winResize" :myChartData="reportDetailtData.word_cloud" :sizeRange="worldSizeRange"/>
        </div>
      </div>
      <div>
        <div class="title" v-if="dynamicAnalysis">
          <h2>样本动态分析</h2>
        </div>
        <div class="dynamicAnalysis" v-if="dynamicAnalysis">
          <systemLine
          v-if="$tokenName === 'guoan'"
          :echartTitle="['']"
          :winResize="winResize"
          :myChartData="reportDetailtData.sample_trend"
          :topBarData="reportDetailtData.detection_count"
          echartTitleColor="#315697"
          :echartTitledate="echartTitledate"
          topSize1="12"
          topSize2="16"
          fontColor="#fff"/>
          <myLine
          v-else
          :echartTitle="['']"
          :winResize="winResize"
          :myChartData="reportDetailtData.sample_trend"
          :topBarData="reportDetailtData.detection_count"
          echartTitleColor="#315697"
          :echartTitledate="echartTitledate"
          topSize1="12"
          topSize2="16"
          fontColor="#fff"/>
        </div>
      </div>
      <div v-if="isNormalData(reportDetailtData, reportDetailtData.apt28)">
        <div class="title">
          <h2>家族样本详情</h2>
        </div>
        <div>
          <h3>最新发现APT28家族样本详情</h3>
          <div class="familyTable">
            <table>
              <tr>
                <td class="printHide" style="width: 30%">测试文件名</td>
                <td style="width: 50%">MD5</td>
                <td style="width: 20%">完成时间</td>
                <td style="width: 15%">检测结果</td>
                <td style="width: 20%">标签</td>
                <td class="printHide" style="width: 20%">结果查看</td>
              </tr>
              <tr v-for="(item,index) in apt28" :key="index">
                <td class="printHide"><template>
                  <FileName :name="item.sample_name" :length="29" />
                </template></td>
                <td>{{item.sample_md5}}</td>
                <td>{{$common.typeTime(item.detect_finished_time, $route.query.type)}}</td>
                <td><template>
                  <span>{{ $detectionResult(item.is_malicious) }}</span>
                </template></td>
                <td><template>
                  <Tags
                    :id="item.id"
                    :md5="item.sample_md5"
                    :exist="item.sample_label + ',' + Math.random()"
                    :alltags="alltags"
                    :chooseTags="[]"
                    @initList="init()"/>
                </template></td>
                <td class="printHide"><template>
                  <img
                  class="check-report-icon __handCursor"
                  :src="$img.view"
                  @click="CheckReport(item.sample_md5, item.is_malicious, item.id, item.important_level)">
                </template></td>
              </tr>
            </table>
          </div>
        </div>
        <el-pagination
          v-if="reportDetailtData.apt28.length"
          class="__text-left"
          background
          layout="prev, pager, next"
          :total="reportDetailtData.apt28.length"
          :page-size="10"
          :pager-count="5"
          @current-change="apt28_pageChange"
          :current-page.sync="apt28_page">
        </el-pagination>
      </div>
      <div>
        <div class="title" v-if="threatTitle">
          <h2>威胁信息详情</h2>
        </div>
        <div class="detailTable">
          <div v-if="isNormalData(reportDetailtData, reportDetailtData.ip)">
            <h3>访问IP</h3>
            <table>
              <tr>
                <td width="100">IP地址</td>
                <td width="120">最新发现时间</td>
                <td width="70">端口</td>
                <td width="70">归属地</td>
                <td width="50">访问次数</td>
              </tr>
              <tr
              v-for="(i, j) in ip"
              :key="j">
                <td>{{i.ip}}</td>
                <td>{{$common.typeTime(i.create_time, $route.query.type)}}</td>
                <td>{{i.port}}</td>
                <td>{{i.country}}</td>
                <td>{{i.count}}</td>
              </tr>
            </table>
            <el-pagination
              v-if="reportDetailtData.ip.length"
              class="__text-left"
              background
              layout="prev, pager, next"
              :total="reportDetailtData.ip.length"
              :page-size="20"
              :pager-count="5"
              @current-change="ip_pageChange"
              :current-page.sync="ip_page">
            </el-pagination>
          </div>
          <div v-if="isNormalData(reportDetailtData, reportDetailtData.udp)">
            <h3>UDP信息</h3>
            <table>
              <tr>
                <td width="100">源IP地址</td>
                <td width="120">最新发现时间</td>
                <td width="70">源端口</td>
                <td width="100">目的IP</td>
                <td width="70">目的端口</td>
                <td width="50">访问次数</td>
              </tr>
              <tr
              v-for="(i, j) in udp"
              :key="j">
                <td>{{i.src_ip}}</td>
                <td>{{$common.typeTime(i.create_time, $route.query.type)}}</td>
                <td>{{i.src_port}}</td>
                <td>{{i.target_ip}}</td>
                <td>{{i.target_port}}</td>
                <td>{{i.count}}</td>
              </tr>
            </table>
            <el-pagination
              v-if="reportDetailtData.udp.length"
              class="__text-left"
              background
              layout="prev, pager, next"
              :total="reportDetailtData.udp.length"
              :page-size="20"
              :pager-count="5"
              @current-change="udp_pageChange"
              :current-page.sync="udp_page">
            </el-pagination>
          </div>
          <div v-if="isNormalData(reportDetailtData, reportDetailtData.tcp)">
            <h3>TCP信息</h3>
            <table>
              <tr>
                <td width="100">源IP地址</td>
                <td width="120">最新发现时间</td>
                <td width="70">源端口</td>
                <td width="100">目的IP</td>
                <td width="70">目的端口</td>
                <td width="50">访问次数</td>
              </tr>
              <tr
              v-for="(i, j) in tcp"
              :key="j">
                <td>{{i.src_ip}}</td>
                <td>{{$common.typeTime(i.create_time, $route.query.type)}}</td>
                <td>{{i.src_port}}</td>
                <td>{{i.target_ip}}</td>
                <td>{{i.target_port}}</td>
                <td>{{i.count}}</td>
              </tr>
            </table>
            <el-pagination
              v-if="reportDetailtData.tcp.length"
              class="__text-left"
              background
              layout="prev, pager, next"
              :total="reportDetailtData.tcp.length"
              :page-size="20"
              :pager-count="5"
              @current-change="tcp_pageChange"
              :current-page.sync="tcp_page">
            </el-pagination>
          </div>
          <div v-if="isNormalData(reportDetailtData, reportDetailtData.icmp)">
            <h3>ICMP信息</h3>
            <table>
              <tr>
                <td width="100">源IP地址</td>
                <td width="120">最新发现时间</td>
                <td width="70">目的IP</td>
                <td width="50">访问次数</td>
              </tr>
              <tr
              v-for="(i, j) in icmp"
              :key="j">
                <td>{{i.src_ip}}</td>
                <td>{{$common.typeTime(i.create_time, $route.query.type)}}</td>
                <td>{{i.target_ip}}</td>
                <td>{{i.count}}</td>
              </tr>
            </table>
            <el-pagination
              v-if="reportDetailtData.icmp.length"
              class="__text-left"
              background
              layout="prev, pager, next"
              :total="reportDetailtData.icmp.length"
              :page-size="20"
              :pager-count="5"
              @current-change="icmp_pageChange"
              :current-page.sync="icmp_page">
            </el-pagination>
          </div>
          <div v-if="isNormalData(reportDetailtData, reportDetailtData.dns)">
            <h3>DNS信息</h3>
            <table>
              <tr>
                <td width="100">域名</td>
                <td width="120">最新发现时间</td>
                <td width="70">状态</td>
                <td width="50">访问次数</td>
              </tr>
              <tr
              v-for="(i, j) in dns"
              :key="j">
                <td>{{i.dns}}</td>
                <td>{{$common.typeTime(i.create_time, $route.query.type)}}</td>
                <td>{{i.status}}</td>
                <td>{{i.count}}</td>
              </tr>
            </table>
            <el-pagination
              v-if="reportDetailtData.dns.length"
              class="__text-left"
              background
              layout="prev, pager, next"
              :total="reportDetailtData.dns.length"
              :page-size="20"
              :pager-count="5"
              @current-change="dns_pageChange"
              :current-page.sync="dns_page">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      is_unFinished: true,
      htmlTitle: this.$route.query.type === 1 ? this.$route.query.title + '分析报告' : this.$route.query.title.split('-->')[0] + '至' + this.$route.query.title.split('-->')[1] + '分析报告',
      winResize: 0,
      worldSizeRange: [12, 25],
      reportDetailtData: {},
      sampleTrendData: [],
      alltags: [],
      attackSource: true,
      family: true,
      stateAnalysis: true,
      typeFever: true,
      dynamicAnalysis: true,
      echartTitledate: '当天',
      threatTitle: false,
      apt28: [],
      apt28_page: 1,
      ip: [],
      ip_page: 1,
      udp: [],
      udp_page: 1,
      tcp: [],
      tcp_page: 1,
      icmp: [],
      icmp_page: 1,
      dns: [],
      dns_page: 1
    }
  },
  computed: {
    ...mapGetters(['analysisReportDetailData', 'allLable', 'sampleDetection'])
  },
  watch: {
    analysisReportDetailData (val) {
      if (val.status === 200) {
        this.reportDetailtData = val.result
        this.paging(this.apt28, this.reportDetailtData.apt28, 10)
        this.paging(this.ip, this.reportDetailtData.ip, 20)
        this.paging(this.udp, this.reportDetailtData.udp, 20)
        this.paging(this.tcp, this.reportDetailtData.tcp, 20)
        this.paging(this.icmp, this.reportDetailtData.icmp, 20)
        this.paging(this.dns, this.reportDetailtData.dns, 20)
        if (Object.getOwnPropertyNames(this.reportDetailtData).length) {
          if (!this.isNormalData(this.reportDetailtData, this.reportDetailtData.gene_family)) {
            this.family = false
          }
          if (!this.isNormalData(this.reportDetailtData.map_data, this.reportDetailtData.map_data.country_data)) {
            this.attackSource = false
          }
          if (!this.isNormalData(this.reportDetailtData, this.reportDetailtData.detection_count)) {
            this.stateAnalysis = false
          }
          if (!this.isNormalData(this.reportDetailtData, this.reportDetailtData.word_cloud)) {
            this.typeFever = false
          }
          if (!this.isNormalData(this.reportDetailtData.sample_trend, this.reportDetailtData.sample_trend.create_time)) {
            this.dynamicAnalysis = false
          }
        }
        let sampleTrend = this.reportDetailtData.sample_trend
        this.sampleTrendData = [{
          'maliciously_amount': this.getSum(sampleTrend.maliciously_amount),
          'nonmaliciously_amount': this.getSum(sampleTrend.nonmaliciously_amount),
          'unknow_amount': this.getSum(sampleTrend.unknow_amount),
          'sample_total_amount': this.reportDetailtData.sample_trend.today_detection_total_amount
        }]
        this.is_unFinished = false

        // 判断威胁信息详情的title显示
        let threatTitleArr = [val.ip, val.udp, val.tcp, val.icmp, val.dns]
        threatTitleArr.forEach(function (element, index) {
          if (this.isNormalData(val, element)) {
            this.threatTitle = true
          }
        }.bind(this))
      } else {
        this.$notify({
          title: '警告',
          type: 'warning',
          message: val.message,
          duration: 2000,
          onClose: function () {
            history.go(-1)
          }
        })
      }
    },
    allLable (res) {
      this.alltags = this.$common.inheritObj(res)
    },
    sampleDetection (res) {
      console.log(res)
    }
  },
  methods: {
    goPrint () {
      if (localStorage.userClass === '3') {
        this.$message.warning('您没有此项权限！')
      } else {
        this.$common.print()
      }
    },
    handleSelectionChange () {},
    CheckReport (md5, malicious, id, importLevel) {
      if (this.$tokenName === 'gtd' || this.$tokenName === 'zhirong') {
        window.open(window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '') + '/#/SampleReport?md5=' + md5 + '&id=' + id + '&malicious=' + malicious + '&importLevel=' + importLevel)
      } else {
        this.$router.push({
          'path': '/SampleReport',
          query: {
            md5: md5,
            malicious: malicious,
            id: id,
            importLevel: importLevel
          }
        })
      }
    },
    getSum (arr) {
      let sum = 0
      if (arr) {
        arr.forEach((i) => {
          sum += i
        })
      }
      return sum
    },
    init () {
      this.$store.dispatch('getAnalysisReportDetail', this.$route.query.id)
    },
    isNormalData (obj, arr) {
      if (Object.getOwnPropertyNames(obj).length && arr && arr.length) {
        return true
      }
    },
    apt28_pageChange (val) {
      this.apt28 = []
      this.pagechange(this.apt28, this.reportDetailtData.apt28, val, 10)
    },
    ip_pageChange (val) {
      this.ip = []
      this.pagechange(this.ip, this.reportDetailtData.ip, val, 20)
    },
    udp_pageChange (val) {
      this.udp = []
      this.pagechange(this.udp, this.reportDetailtData.udp, val, 20)
    },
    tcp_pageChange (val) {
      this.tcp = []
      this.pagechange(this.tcp, this.reportDetailtData.tcp, val, 20)
    },
    icmp_pageChange (val) {
      this.icmp = []
      this.pagechange(this.icmp, this.reportDetailtData.icmp, val, 20)
    },
    dns_pageChange (val) {
      this.dns = []
      this.pagechange(this.dns, this.reportDetailtData.dns, val, 20)
    },
    // 第一次进入页面触发的事件 data为存储当前页数据的数组 e为总数据 pageSize为每页条数
    paging (data, e, pageSize) {
      if (e && e.length) {
        if (e.length > pageSize) {
          for (var i = 0; i < pageSize; i++) {
            data[i] = e[i]
          }
        } else {
          for (var j = 0; j < e.length; j++) {
            data[j] = e[j]
          }
        }
      }
    },
    // 翻页事触发的事件 data为存储当前页数据的数组 e为总数据 val为页码 pageSize为每页条数
    pagechange (data, e, val, pageSize) {
      if (e && e.length) {
        if (val > (e.length / pageSize)) {
          for (var i = (val - 1) * pageSize; i < e.length; i++) {
            data.push(e[i])
          }
        } else {
          for (var j = (val - 1) * pageSize; j < val * pageSize; j++) {
            data.push(e[j])
          }
        }
      }
    }
  },
  mounted () {
    this.$store.dispatch('getAnalysisReportDetail', this.$route.query.id)
    switch (this.$route.query.type) {
      case (1):
        this.echartTitledate = '当天'
        break
      case (2):
        this.echartTitledate = '本周'
        break
      case (3):
        this.echartTitledate = '当月'
        break
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.winResize = window.innerHeight + '/' + window.innerWidth
    })
  }
}
</script>
<style scoped="scoped">
  .ReportDetail_container {
    width: 80%;
    margin: 20px auto;
  }
  .ReportDetail_container > div {
    margin-top: 20px;
  }
  .print-btn {
    position: absolute;
    top: 100px;
    right: 20px;
  }
  .title {
    position: relative;
    border-bottom: 1px solid #3a537e;
    margin-bottom: 10px;
  }
  .title .el-button {
    position: absolute;
    top: 5px;
    right: 0;
    padding: 8px 15px;
  }
  .title h1, h2, h3 {
    color: #3a537e;
  }
  .title h1 {
    font-size: 22px;
    text-align: center;
  }
  .title h2 {
    font-size: 18px;
    text-align: left;
  }
  .attackSource,
  .stateAnalysis,
  .typeFever,
  .dynamicAnalysis {
    width: 100%;
    height: 300px;
    border: 1px solid #3a537e;
  }
  .familyAnalysis {
    height: 250px;
    width: 100%;
    border: 1px solid #3a537e;
  }
  .stateAnalysis,
  .typeFever {
    height: 250px;
  }
  .attackSource .point,
  .stateAnalysis .bar,
  .familyAnalysis .pie,
  .typeFever .wordList,
  .dynamicAnalysis .line {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    background-image: none !important;
  }
  .dynamicAnalysis /deep/ .line .lineTop ul li {
    background: none;
  }
  .check-report-icon {
    height: 1rem;
  }
  .detailTable > div {
    margin-top: 10px;
  }
  #pdfDom {
    margin: 0 auto;
    width: 700px;
  }
  table {
    width: 100%;
    background: transparent;
    text-align: center;
    color: #3a537e;
    table-layout: fixed;
    font-size: 0.8rem;
  }
  table tr td {
    box-sizing: border-box;
    border: 1px solid #3a537e;
  }
  table tr td table tr td {
    padding: 0;
    box-sizing: border-box;
    border: 1px solid #3a537e;
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
  .familyTable {
    width: calc(100% - 2px);
    border: 1px solid #3a537e;
    overflow-x: auto;
  }
  .familyTable table {
    width: 120%;
  }
  .familyTable table tr:first-of-type td {
    border-top: none;
  }
  .familyTable table tr td:first-of-type {
    border-left: none;
  }
  .familyTable table tr td:last-of-type {
    border-right: none;
  }
  @media print {
    .stateAnalysis,
    .dynamicAnalysis {
      page-break-after: always;
    }
    .familyTable {
      border: none;
      border-top: 1px solid #3a537e;
    }
    .familyTable table {
      width: 100%;
    }
    .familyTable table td {
      width: auto;
    }
    .printHide {
      display: none;
    }
  }
</style>
