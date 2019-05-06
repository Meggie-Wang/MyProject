<style scoped>
  .download_button {
    border: none;
    color: #fff;
    background: #148F73;
    padding: 0.5% 1%;
    box-shadow: 1px 1px 2px #0E6955;
  }
  h3 {
    font-weight: bold;
    padding: 1% 0;
  }
  .body {
    width: 80%;
    margin: 2% auto;
  }
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #148F73;
  }
  .top i {
    width: 40px;
    height: 30px;
    cursor: pointer;
    background: url(../../../static/img/icon.png) -250px 0 no-repeat;
  }
  .title {
    line-height: 55px;
  }
  .title span {
    font-weight: bold;
  }
  .title span:first-of-type {
    color: #148F73;
  }
  /**
   * 基本信息
  */
  .inform h3 {
    color: #148F73;
  }
  .inform_body {
    text-indent: 1em;
    line-height: 30px;
    font-size: 14px;
  }
  .el-collapse {
    border: none;
  }
  .el-collapse-item {
    margin-top: 1%;
  }
  /**
   * 基因分析报告
  */
  .report_top {
    display: flex;
    justify-content: space-between;
    margin: 2%;
  }
  .report_top > div {
    width: 49%;
    text-align: center;
  }
  .report_top > div > div:first-of-type {
    height: 400px;
    overflow: hidden;
  }
  sup {
    vertical-align: super;
    font-size: smaller;
    cursor: pointer;
  }
  a {
    color: blue;
  }
  .imgBox {
    padding-top: 3%;
  }
  .pngImg.active .imgBox {
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, .8);
    width: 100%;
    height: 97%;
    z-index: 1000;
    overflow-y: scroll;
  }
  .pngImg.active .imgBox img {
    width: 60%;
    margin: 2% auto 5%;
  }
  .pngImg.active .close {
    position: fixed;
    display: block;
  }
  .pngImg img {
    width: 50%;
    cursor: pointer;
  }
  .svgImg.active .imgBox {
    background: rgba(0, 0, 0, .8);
    width: 100%;
    height: 97%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
    overflow-y: scroll;
  }
  .svgImg.active .imgBox img {
    margin: 2% auto 5%;
  }
  .svgImg.active .close {
    position: fixed;
    display: block;
  }
  .svgImg img {
    width: 70%;
    cursor: pointer;
  }
  .close {
    position: absolute;
    top: 5%;
    right: 10%;
    display: none;
    width: 30px;
    height: 30px;
    background: url('../../../static/img/icon.png') -153px -149px no-repeat;
    cursor: pointer;
  }
  .report_bottom {
    padding: 1% 2% 0;
    margin-bottom: 1%;
  }
  .report_bottom h3 {
    color: #148F73;
  }
  .report_bottom_body {
    border:1px solid #148F73;
  }
  .button_box {
    text-align: center;
    margin-top: 2%;
  }
  button {
    border: 1px solid #148F73;
    color: #148F73;
    background: #fff;
    padding: 0.5% 1%;
    margin: 1% 3%;
    border-radius: 5px;
    cursor: pointer;
    outline: none;
  }
  /**
   * 威胁分析报告
  */
  .threatRP {
    padding: 1% 2%;
  }
  .threatRP h4 {
    font-weight: bold;
    color: #0e6955;
    padding-bottom: 1%;
  }
  .threatRP .download_button {
  }
  .threatRP_container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1% 1% 0;
  }
  .threatRP_left.red {
    color: #E64846;
  }
  .threatRP_left.green {
    color: #0e6955;
  }
  /**
   * 关键字符串
  */ 
  .key_string {
    padding: 1% 2%;
  }
  /**
   * 行为分析
  */
  .behavior_analysis {
    padding: 1%;
  }
  .behavior_analysis button {
    border: 1px solid #148F73;
    border-radius: 5px;
    background: #fff;
    color: #148F73;
    margin: 5px;
    padding: 8px 15px;
    outline: none;
    cursor: pointer;
  }
  button.active {
    background: #148F73;
    color: #fff;
  }
  .behavior_analysis button:hover {
    background: #148F73;
    color: #fff;
    border-color: #148F73;
  }
  .behaviorInfo {
    border: 1px solid #148F73;
    margin-top: 1%;
    padding: 1%;
  }
  /**
   * 抗分析
  */
  .resistance_analysis {
    padding: 1% 2%;
  }
  .analysisTitle {
    font-size: 16px;
    color: #148F73;
  }
  li ul li {
    text-indent: 20px;
    line-height: 25px;
  }
  /**
   * 网络通联关系
  */
  .communication_relationship {
    padding: 1%;
  }
  .communication_relationship p {
    color: #148F73;
    font-weight: bold;
    border-bottom: 1px solid #148F73;
    line-height: 50px;
  }
  .communication_relationship .download_button {
    margin-top: 1%;
  }
  .el-collapse-item__content {
    padding-bottom: 0;
  }
  /**
   * 其他文件分析
  */
  .other_files {
    padding: 0 1% 1%;
  }
  .other_files .el-button {
    color: #148F73;
    border: 1px solid #148F73;
    padding: 10% 15%;
  }
  .toTopBtn {
    position: fixed;
    right: 3%;
    bottom: 10%;
    width: 40px;
    height: 40px;
    background: url('../../../static/img/icon.png') -197px -175px no-repeat;
    cursor: pointer;
  }
</style>
<style>
  .el-collapse-item__header {
    color: #fff;
    background: #148F73;
    font-weight: bold;
    font-size: 16px;
    padding: 0 1%;
  }
  .el-collapse-item__header i:before {
    display: block;
    content: '';
    width: 30px;
    height: 30px;
    background: url('../../../static/img/icon.png') -140px 5px no-repeat;
    margin-top: 10px;
  }
  thead tr th .cell {
    color: #148F73;
    font-weight: bold;
  }
  .el-table td, .el-table th.is-leaf {
    border-bottom: 1px solid #148F73;
  }
  .el-table::before, .el-table__fixed-right::before, .el-table__fixed::before {
    display: none;
  }
  .el-collapse-item__content {
    padding-bottom: 0 !important;
  }
  .el-collapse-item__wrap {
    border: 1px solid #148F73 !important;
  }
</style>
<template>
  <div class="container">
    <div class="body">
      <div v-if="geneticData.pretreatment_result">
        <div class="top">
          <i @click="back"></i>
          <el-button class="download_button" @click="downloadReport">{{ $t('messages.geneReport.downloadReport') }}</el-button>
        </div>
        <!-- 基本信息 begin -->
        <div class="inform">
          <h3>{{ $t('messages.detail.essentialInfo') }}</h3>
          <div class="inform_body">
            <p>{{ $t('messages.geneReport.fileName') }}：<span>{{geneticData.pretreatment_result.filename}}</span></p>
            <p>{{ $t('messages.geneReport.fileSize') }}：<span>{{geneticData.pretreatment_result.Size}}</span></p>
            <p>MD5：<span>{{geneticData.pretreatment_result.md5}}</span></p>
            <p>SHA-1：<span>{{geneticData.pretreatment_result.sha1}}</span></p>
            <p>SHA-256：<span>{{geneticData.pretreatment_result.sha256}}</span></p>
            <p>{{ $t('messages.geneReport.latestAnalysisTime') }}：<span>{{finishTime}}</span></p>
          </div>        
        </div>
      </div>
      <el-collapse v-model="activeNames">
        <!-- 基因分析报告 -->
        <el-collapse-item :title="$t('messages.geneReport.geneAnalysisReport')" name="1">
          <div class="report_top" v-if="geneticData.decide_result !== '0'">
            <div class="report_top_left">
              <div class="pngImg">
                <span>{{ $t('messages.geneReport.neSequenceArrangement') }}</span>
                <sup>
                  <a :title="$t('messages.geneReport.tipOne')">{{ $t('messages.geneReport.note') }}1</a>
                </sup>
                <div class="imgBox">
                  <i class="close"></i>
                  <img v-lazy="pngImgSrc" @click="bigPngImg">
                </div>
              </div>
              <div class="button_box">
                <button @click="bigPngImg">{{ $t('messages.geneReport.bigPicture') }}</button>
                <button class="download_button" @click="downloadPngImg">{{ $t('messages.geneReport.fileDownload') }}</button>
              </div>
            </div>
            <div class="report_top_right">
              <div class="svgImg">
                <span>{{ $t('messages.geneReport.geneLogicDiagram') }}</span>
                <sup>
                  <a :title="$t('messages.geneReport.tipTwo')">{{ $t('messages.geneReport.note') }}2</a>
                </sup>
                <div class="imgBox">
                  <i class="close"></i>
                  <img v-lazy="svgImgSrc" @click="bigSvgImg">
                </div>
              </div>
              <div class="button_box">
                <button @click="bigSvgImg">{{ $t('messages.geneReport.bigPicture') }}</button>
                <button class="download_button" @click="downloadSvgImg">{{ $t('messages.geneReport.fileDownload') }}</button>
              </div>
            </div>
          </div>
          <div class="report_bottom" v-if='false'>
            <h3>{{ $t('messages.geneReport.threatRelated') }}</h3>
            <div class="report_bottom_body"></div>
          </div>
        </el-collapse-item>
        <!-- 威胁分析报告 -->
        <el-collapse-item :title="$t('messages.geneReport.threatAnalysisReport')" name="2">
          <div class="threatRP">
            <h4>{{ $t('messages.geneReport.maliciousJudgment') }}</h4>
            <hr />
            <div class="threatRP_container">
              <div class="threatRP_left"></div>
              <button class="download_button" @click="yaraDownload">{{ $t('messages.geneReport.yaraRule') }}</button>
            </div>
          </div>
        </el-collapse-item>
        <!-- 行为分析总结 -->
        <el-collapse-item :title="$t('messages.geneReport.behaviorAnalysis')" name="3">
          <div class="behavior_analysis">
            <div class="behaviorButtons" v-if="buttonNames">
              <button v-for="(buttonName,index) in buttonNames" @click="tabsSwitch(index)" v-bind:class="{active}" v-if="$i18n.locale === 'zh'">{{buttonName.name}}</button>
              <button v-for="(buttonName,index) in buttonNames" @click="tabsSwitch(index)" v-bind:class="{active}" v-if="$i18n.locale === 'en'">{{buttonName.nameEn}}</button>
            </div>
            <div class="behaviorInfo" v-if="behaviorData">
              <div v-for="behaviorInfo in behaviorData">{{behaviorInfo}}</div>
            </div>
          </div>
        </el-collapse-item>
        <!-- 抗分析检测 -->
        <el-collapse-item :title="$t('messages.geneReport.antiAnalysisDetection')" name="4">
          <div class="resistance_analysis" v-for="(analysisList,index) in analysisData" v-if="index !== 'status'">
            <ul>
              <li class="analysisTitle">{{analSwitch(index)}}</li>
              <li>
                <ul v-for="(analysis,index1) in analysisList">
                    <li v-if="analysis.length !== 0">{{index1}}：
                      <span v-for="an in analysis">{{an}}</span>
                    </li>
                    <li v-else>{{index1}}：{{ $t('messages.detectionQueue.nothing') }}</li>
                </ul>
              </li>
            </ul>
          </div>
        </el-collapse-item>
        <!-- 网络通联关系 -->
        <el-collapse-item :title="$t('messages.geneReport.generalConnection')" name="5">
          <div class="communication_relationship">
            <p>IP：</p>
            <p>DNS：
            </p>
            <el-table :data="communicationData" style="width: 100%">
              <el-table-column prop="ip" label="IP" width="260"></el-table-column>
              <el-table-column prop="type" :label="$t('messages.geneReport.type')" width="260"></el-table-column>
              <el-table-column prop="request" :label="$t('messages.geneReport.demand')"></el-table-column>
            </el-table>
            <el-button class="download_button" @click="downloadPcap">{{ $t('messages.geneReport.downPcap') }}</el-button>
          </div>
        </el-collapse-item>
        <!-- <el-collapse-item :title="$t('messages.geneReport.geneticRelation')" name="6">
          <div class="genetic_relationship" v-for="genetic in geneticData.Cluster_Result">
            <p v-if="JSON.stringify(geneticData.Cluster_Result) === '{}'">无</p>
            <p v-else>{{genetic}}</p>
          </div>
        </el-collapse-item> -->
        <!-- 关键字符串 -->
        <el-collapse-item :title="$t('messages.geneReport.keyString')" name="7">
          <div class="key_string" v-if='geneticData.strings'>
            <div v-for="(geneticString, index) in geneticData.strings.strings" :key="index">
              <pre>{{geneticString}}</pre>
            </div>
          </div>
        </el-collapse-item>
        <!-- <el-collapse-item title="其他文件分析结果" name="8">
          <div class="other_files">
            <el-table :data="otherData" style="width: 100%">
              <el-table-column prop="name" label="文件名称" width="260"></el-table-column>
              <el-table-column prop="MD5" label="文件名称"></el-table-column>
              <el-table-column prop="grade" label="安全等级" width="280"></el-table-column>
              <el-table-column fixed="right" label="分析报告" width="120">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-collapse-item> -->
      </el-collapse>
    </div>
    <div class="toTopBtn" v-if="toTopFixed" @click="toTop"></div>
  </div>
</template>
<script>
import api from '../../api/ipApi'
import {Loading} from 'element-ui'

export default {
  data() {
    return {
      activeNames: ['1', '2', '3', '4', '5', '6', '7', '8'],
      active: false,
      pngImgSrc: '',
      svgImgSrc: '',
      geneticData: {},
      buttonNames: [
        {
          name: '文件删除',
          nameEn: 'File deleted',
          value: 'file_deleted'
        },
        {
          name: '目录遍历',
          nameEn: 'Directory traversal',
          value: 'directory_enumerated'
        },
        {
          name: '动态链接库加载',
          nameEn: 'DLL loaded',
          value: 'dll_loaded'
        },
        {
          name: '文件创建',
          nameEn: 'File created',
          value: 'file_created'
        },
        {
          name: '文件打开',
          nameEn: 'File opened',
          value: 'file_opened'
        },
        {
          name: '文件操作失败',
          nameEn: 'File operation error',
          value: 'file_failed'
        },
        {
          name: '文件读取',
          nameEn: 'File read',
          value: 'file_read'
        },
        {
          name: '文件写入',
          nameEn: 'File written',
          value: 'file_written'
        },
        {
          name: '判断文件存在操作',
          nameEn: 'File edited',
          value: 'file_exists'
        },
        {
          name: '注册表打开',
          nameEn: 'Registry Key opened',
          value: 'regkey_opened'
        },
        {
          name: '注册表查阅',
          nameEn: 'Registry read',
          value: 'regkey_read'
        },
        {
          name: '注册表写入',
          nameEn: 'Registry written',
          value: 'regkey_written'
        },
        {
          name: '连接主机',
          nameEn: 'Connecting host',
          value: 'connects_host'
        },
        {
          name: '获取URL',
          nameEn: 'URL obtained',
          value: 'fetches_url'
        },
        {
          name: '命令执行操作',
          nameEn: 'Command execution',
          value: 'command_line'
        }
      ],
      behaviorData: [],
      analysisData: [],
      analyNames: [
        {
          name: '抗分析工具',
          nameEn: 'Anti-analysis tool',
          value: 'anti_analysis_tool_results'
        },
        {
          name: '抗调试工具',
          nameEn: 'Anti-debugging tool',
          value: 'anti_debug_results'
        },
        {
          name: '抗沙箱工具',
          nameEn: 'Anti-sandbox tool',
          value: 'anti_sandbox_results'
        },
        {
          name: '抗杀软工具',
          nameEn: 'Anti-antivirus software',
          value: 'anti_sharuan_results'
        },
        {
          name: 'Qemu',
          nameEn: 'Qemu',
          value: 'qemu_results'
        },
        {
          name: 'Virtualbox',
          nameEn: 'Virtualbox',
          value: 'virtualbox_results'
        },
        {
          name: 'Vmware',
          nameEn: 'Vmware',
          value: 'vmware_results'
        }
      ],
      noData: {},
      communicationData: [],
      // otherData: [
      //   {
      //     name: 'gzgrgf',
      //     MD5: 'shtxthtfgjytjyxjfjtgkugkyu',
      //     grade: 'A'
      //   },
      //   {
      //     name: 'gzgrgf',
      //     MD5: 'shtxthtfgjytjyxjfjtgkugkyu',
      //     grade: 'A'
      //   },
      //   {
      //     name: 'gzgrgf',
      //     MD5: 'shtxthtfgjytjyxjfjtgkugkyu',
      //     grade: 'A'
      //   },
      //   {
      //     name: 'gzgrgf',
      //     MD5: 'shtxthtfgjytjyxjfjtgkugkyu',
      //     grade: 'A'
      //   }
      // ],
      fileId: this.$route.query.id,
      fileName: this.$route.query.fileName,
      finishTime: this.$route.query.finishTime,
      loading: {},
      toTopFixed: false
    }
  },
  props: ['language'],
  watch: {
    language (val) {
      $('.el-table__empty-text').text(this.$t('messages.detectionQueue.nothing'))
    }
  },
  mounted() {
    this.loading = Loading.service()
    api.getGenetic(this.fileId, this.fileName).then((res) => {
      this.loading = Loading.service().close()
      if (res.data.status === 0) {
        this.$router.push({path: '/login'})
        document.cookie = 'token_virus=' + escape('')
      } else if (res.data.status === 301) {
        alert(this.$t('messages.login.incorrectErr'))
        this.back()
      } else if (res.data.code === 1) {
        this.geneticData = res.data;
        // 抗分析检测
        if (this.geneticData.evasion_report) {
          this.analysisData = this.geneticData.evasion_report;
        }
        // 网络通联
        if (this.geneticData.pcap_json) {
          var pacpData = this.geneticData.pcap_json.dns
          if (pacpData) {
            pacpData.forEach((pacpRes) => {
              this.communicationData.push(pacpRes)
            })
          }
        }
        // 基因关系
        if (this.geneticData.Cluster_Result) {
          // console.log(this.geneticData.Cluster_Result)
        }
      }
    }).catch(() => {
      this.loading = Loading.service().close()
    })
    this.pngImgSrc = api.requestUrl + 'api/GENE_projectInfo/id=' + this.fileId + '/filename=' + this.fileName + '/PNG/'
    this.svgImgSrc = api.requestUrl + 'api/GENE_projectInfo/id=' + this.fileId + '/filename=' + this.fileName + '/SVG/'
    window.addEventListener('scroll', this.handleScroll)
    $('.el-table__empty-text').text(this.$t('messages.detectionQueue.nothing'))
  },
  updated() {
    setTimeout(function() {
      if ($('.behaviorButtons').children().hasClass('active') === false) {
        $($('.behaviorButtons').children()[0]).click()
      }
    }, 1000)
    // 恶意性判定
    switch (this.geneticData.decide_result) {
      case '0':
        $('.threatRP_left').text(this.$t('messages.detectionQueue.maliciousTwo')).addClass('green')
        break;
      case '1':
        $('.threatRP_left').text(this.$t('messages.detectionQueue.maliciousOne')).addClass('red')
        break;
      case '2':
        $('.threatRP_left').text(this.$t('messages.detectionQueue.maliciousThree')).addClass('red')
        break;
      case '3':
        $('.threatRP_left').text(this.$t('messages.detectionQueue.maliciousFour')).addClass('red')
        break;
    }
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    downloadReport() {
      var reportUrl = api.requestUrl + 'api/GENE_getReport/id=' + this.fileId + '/filename=' + this.fileName + '/'
      window.open(reportUrl)
    },
    bigPngImg() {
      $('.pngImg').addClass('active')
      $('.pngImg .close').click(function() {
        $('.pngImg').removeClass('active')
      })
    },
    bigSvgImg() {
      $('.svgImg').addClass('active')
      $('.svgImg .close').click(function() {
        $('.svgImg').removeClass('active')
      })
    },
    downloadPngImg() {
      var pngImgUrl = api.requestUrl + 'api/GENE_projectInfo/id=' + this.fileId + '/filename=' + this.fileName + '/png/'
      window.open(pngImgUrl)
    },
    downloadSvgImg() {
      var svgImgUrl = api.requestUrl + 'api/GENE_projectInfo/id=' + this.fileId + '/filename=' + this.fileName + '/svg/'
      window.open(svgImgUrl)
    },
    yaraDownload() {
      var yarUrl = api.requestUrl + 'api/GENE_projectInfo/id=' + this.fileId + '/filename=' + this.fileName + '/yar/'
      window.open(yarUrl)
    },
    downloadPcap() {
      var pcapUrl = api.requestUrl + 'api/GENE_projectInfo/id=' + this.fileId + '/filename=' + this.fileName + '/pcap/'
      window.open(pcapUrl)
    },
    tabsSwitch(tabIndex) {
      var key = this.buttonNames[tabIndex].value;
      this.behaviorData = this.geneticData.summary[key];
      $($('.behaviorButtons').children()[tabIndex]).addClass('active').siblings().removeClass('active');
    },
    analSwitch(analIndex) {
      for (var analRes in this.analyNames) {
        if (analIndex === this.analyNames[analRes].value) {
          if (this.$i18n.locale === 'zh') {
            return this.analyNames[analRes].name
          } else {
            return this.analyNames[analRes].nameEn
          }
        }
      }
    },
    handleClick(row) {},
    handleScroll() {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop >= 600) {
        this.toTopFixed = true
      } else {
        this.toTopFixed = false
      }
    },
    toTop() {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.path !== '/dashboard') {
      this.loading = Loading.service().close()
    }
    next()
  }
}
</script>