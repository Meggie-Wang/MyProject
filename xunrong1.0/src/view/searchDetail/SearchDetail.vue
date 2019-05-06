<template>
  <div class="searchDetail-view">
    <div class="searchDetail_container">
      <div class="searchDetail_title">
        <span v-if="searchType === 'ip'">IP: {{ $route.query.searchValue }}</span>
        <span v-if="searchType === 'dns'">DNS: {{ $route.query.searchValue }}</span>
        <span v-if="searchType === 'md5'">{{ $route.query.searchValue }}</span>
        <i class="handCursor" @click="back"></i>
      </div>
      <div class="searchDetail_content">
        <!-- <div class="essentialInformation" v-if="searchType === 'ip'">
          <h3>基本信息</h3>
          <div>
            <ul>
              <li>
                IP地址：
                <span>{{ searchData.name }}</span>
              </li>
              <li>
                操作系统：
                <span>fdgdfg</span>
              </li>
              <li>
                组织：
                <span>dfgdfg</span>
              </li>
              <li>
                设备类型：
                <span>hgjghjc</span>
              </li>
              <li class="port">
                端口/服务：
                <div>
                  <button>sdgnkdg</button>
                  <button>sdgnkdg</button>
                </div>
              </li>
              <li>
                自治系统名称：
                <span>dzhdfg</span>
              </li>
              <li>
                自治系统号：
                <span>dfzhzdfh</span>
              </li>
            </ul>
          </div>
        </div> -->
        <div class="essentialInformation" v-if="searchType === 'md5' && Object.getOwnPropertyNames(searchData.Informations).length">
          <h3>{{ $t('messages.searchDetail.essentialInfo')}}</h3>
          <div>
            <ul>
              <li>
                <span>MD5:</span>
                <p>{{ searchData.name }}</p>
              </li>
              <li v-if="searchData.Informations.sha_1">
                <span>SHA-1:</span>
                <p>{{ searchData.Informations.sha_1 }}</p>
              </li>
              <li v-if="searchData.Informations.Authentihash">
                <span>Authentihash:</span>
                <p>{{ searchData.Informations.Authentihash }}</p>
              </li>
              <li v-if="searchData.Informations.Imphash">
                <span>Imphash:</span>
                <p>{{ searchData.Informations.Imphash }}</p>
              </li>
              <li v-if="searchData.Informations.File_Type">
                <span>File Type:</span>
                <p>{{ searchData.Informations.File_Type }}</p>
              </li>
              <li v-if="searchData.Informations.Magic">
                <span>Magic:</span>
                <p>{{ searchData.Informations.Magic }}</p>
              </li>
              <li v-if="searchData.Informations.SSDeep">
                <span>SSDeep:</span>
                <p>{{ searchData.Informations.SSDeep }}</p>
              </li>
              <li v-if="searchData.Informations.TRiD">
                <span>TRiD:</span>
                <p>
                  <ul>
                    <li v-for="(TRiD, index) in searchData.Informations.TRiD" :key="index">{{ TRiD.file_type }} ({{ TRiD.probability }}%)</li>
                  </ul>
                </p>
              </li>
              <li v-if="searchData.Informations.File_Size">
                <span>File Size:</span>
                <p>{{ (searchData.Informations.File_Size / 1024).toFixed(1) }}KB</p>
              </li>
              <li v-if="searchData.Informations.have_sample !== undefined">
                <span>样本文件</span>
                <p>{{searchData.Informations.have_sample ? '有' : '无'}}</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="maliceJudgment">
          <h3>{{ $t('messages.searchDetail.maliceJudgment') }}</h3>
          <div>
            <span>{{ searchData.malicious }}</span>
          </div>
        </div>
        <div class="md5Label" v-if="searchType === 'md5' && softLabelStatus">
          <h3>{{ $t('messages.searchDetail.softLabel') }}</h3>
          <div>
            <ul>
              <li v-for="(softLabel, index) in softLabelData" :key="index">
                <span><img :src="softLabel.img" alt=""></span>
                <span>
                  <i></i>
                  {{ softLabel.result }}
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div class="md5Packer" v-if="searchType === 'md5' && searchData.Informations.packers">
          <h3>{{ $t('messages.searchDetail.packer') }}</h3>
          <div>
            <ul v-if="searchData.Informations.packers">
              <li v-for="(packer, index) in searchData.Informations.packers" :key="index">
                {{ index }}：{{ packer }}
              </li>
            </ul>
          </div>
        </div>
        <div class="positionInformation" v-if="searchType === 'ip' && searchData.base">
          <h3>{{ $t('messages.searchDetail.positionInfo') }}</h3>
          <ul>
            <li>
              {{ $t('messages.searchDetail.country') }}：{{ searchData.base.location.country }}
            </li>
            <li>
              {{ $t('messages.searchDetail.provinceAndState') }}：{{ searchData.base.location.province }}
            </li>
            <li>
              {{ $t('messages.searchDetail.city') }}：{{ searchData.base.location.city }}
            </li>
            <li>
              {{ $t('messages.searchDetail.coordinate') }}：{{ searchData.base.location.latitude }}&emsp;{{ searchData.base.location.longitude }}
            </li>
          </ul>
          <baidu-map class="bm-view" :center="center" :zoom="zoom" @ready="handler">
            <bm-marker :position="center " :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
            </bm-marker>
          </baidu-map>
        </div>
        <div class="whoLookup" v-if="searchType === 'dns' && Object.getOwnPropertyNames(searchData.Informations).length && searchData.Informations.count && searchData.Informations.count.wholookup_count">
          <h3>Whois Lookup</h3>
          <div>
            <p v-html="wholookup"></p>
          </div>
        </div>
        <div v-if="(searchType === 'ip' || searchType === 'dns') && (Object.getOwnPropertyNames(searchData.Informations).length && searchData.Informations.count && searchData.Informations.count.resolutions_count)" class="dns">
          <h3 v-if="searchType === 'ip'">{{ $t('messages.searchDetail.relatedDNS') }}</h3>
          <h3 v-if="searchType === 'dns'">{{ $t('messages.searchDetail.relatedIP') }}</h3>
          <div>
            <table class="dns_tab">
              <thead>
                <th v-if="searchType === 'ip'">DNS</th>
                <th v-if="searchType === 'dns'">IP</th>
                <th>{{ $t('messages.searchDetail.time') }}</th>
              </thead>
              <tbody>
                <tr v-for="(dns, index) in searchData.Informations.resolutions" :key="index">
                  <td>{{ dns.domain }}</td>
                  <td>{{ transTime(dns.resolve_time) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div v-if="(searchType === 'ip' || searchType === 'dns') && (Object.getOwnPropertyNames(searchData.Informations).length && searchData.Informations.count && searchData.Informations.count.urls_count) && searchData.Informations.urls" class="urls">
          <h3>{{ $t('messages.searchDetail.relatedURLs') }}</h3>
          <div>
            <table class="urls_tab">
              <thead v-if="searchType === 'ip'">
                <th>Url</th>
                <th>{{ $t('messages.searchDetail.time') }}</th>
              </thead>
              <thead v-if="searchType === 'dns'">
                <th style="text-align: left;">{{ $t('messages.searchDetail.urlInfo') }}</th>
              </thead>
              <tr v-for="(urls, index) in searchData.Informations.urls" :key="index">
                <td v-if="searchType === 'ip'">{{ urls.url }}</td>
                <td v-if="searchType === 'ip'">{{ transTime(urls.resolve_time) }}</td>
                <td v-if="searchType === 'dns'" style="text-align: left;">{{ urls.domain_id }}</td>
              </tr>
            </table>
          </div>
        </div>
        <div class="sha" v-if="(searchType === 'ip' || searchType === 'dns') && (Object.getOwnPropertyNames(searchData.Informations).length && searchData.Informations.count && searchData.Informations.count.downloaded_count)">
          <h3>{{ $t('messages.searchDetail.relatedSha') }}</h3>
          <div>
            <table class="sha_tab">
              <thead>
                <th>Sha256</th>
                <th>{{ $t('messages.searchDetail.time') }}</th>
                <th>{{ $t('messages.searchDetail.fileType') }}</th>
              </thead>
              <tr v-for="(sha, index) in searchData.Informations.download_files" :key="index">
                <td>{{ sha.file_sha }}</td>
                <td>{{ transTime(sha.resolve_time) }}</td>
                <td>{{ sha.file_type }}</td>
              </tr>
            </table>
          </div>
        </div>
        <div class="MD5StaticInfo" v-if="searchType === 'md5' && searchData.Informations.protable_executable_info">
          <h3>{{ $t('messages.searchDetail.staticInfo') }}</h3>
          <div>
            <div>
              <h4 class="subTitle">{{ $t('messages.searchDetail.section') }}</h4>
              <table>
                <tr>
                  <th>{{ $t('messages.searchDetail.fileName') }}</th>
                  <th>{{ $t('messages.searchDetail.adress') }}</th>
                  <th>{{ $t('messages.searchDetail.virtualSize') }}</th>
                  <th>{{ $t('messages.searchDetail.rawSize') }}</th>
                  <th>{{ $t('messages.searchDetail.entropy') }}</th>
                  <th>MD5</th>
                </tr>
                <tr v-for="(sections, index) in searchData.Informations.protable_executable_info.sections" :key="index">
                  <td>{{ sections.name }}</td>
                  <td>{{ sections.virtual_address }}</td>
                  <td>{{ sections.raw_size }}</td>
                  <td>{{ sections.entropy }}</td>
                  <td>{{ sections.virtual_size }}</td>
                  <td>{{ sections.md5 }}</td>
                </tr>
              </table>
            </div>
            <div>
              <h4 class="subTitle">{{ $t('messages.searchDetail.imports') }}</h4>
              <el-collapse v-model="activeNames" v-if="searchData.Informations.protable_executable_info">
                <el-collapse-item title="KERNEL32.dll" name="1">
                  <ul class="protableInfo">
                    <li v-for="(KERNEL32, index) in searchData.Informations.protable_executable_info.imports['KERNEL32.dll']" :key="index">{{ KERNEL32 }}</li>
                  </ul>
                </el-collapse-item>
                <el-collapse-item title="MSVCRT.dll" name="2">
                  <ul class="protableInfo">
                    <li v-for="(MSVCRT, index) in searchData.Informations.protable_executable_info.imports['MSVCRT.dll']" :key="index">{{ MSVCRT }}</li>
                  </ul>
                </el-collapse-item>
                <el-collapse-item title="WININET.dll" name="3">
                  <ul class="protableInfo">
                    <li v-for="(WININET, index) in searchData.Informations.protable_executable_info.imports['WININET.dll']" :key="index">{{ WININET }}</li>
                  </ul>
                </el-collapse-item>
              </el-collapse>
            </div>
            <div>
              <h4 class="subTitle">{{ $t('messages.searchDetail.exifTool') }}</h4>
              <ul>
                <li v-for="(exiftool_file_metadata, index) in searchData.Informations.exiftool_file_metadata" :key="index">
                  <p>{{ index }}{{ exiftool_file_metadata }}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="MD5DynamicInfo" v-if="searchType === 'md5' && searchData.base.network_communication">
          <h3>{{ $t('messages.searchDetail.dynamicInfo') }}</h3>
          <div>
            <div>
              <h4 class="subTitle">{{ $t('messages.searchDetail.netWorkCommunicat') }}</h4>
              <ul>
                <li v-for="(network_communication, index) in searchData.base.network_communication" :key="index">
                  <p>{{ index }}</p>
                  <p>{{ network_communication[0] }}</p>
                </li>
              </ul>
            </div>
            <div>
              <h4 class="subTitle">{{ $t('messages.searchDetail.fileSystemAction') }}</h4>
              <ul>
                <li v-for="(file_system_actions, index) in searchData.base.file_system_actions" :key="index">
                  <p>{{ index }}</p>
                  <p v-for="(file_system_action, i) in file_system_actions" :key="i">{{ file_system_action.path }}</p>
                </li>
              </ul>
            </div>
            <div>
              <h4 class="subTitle">{{ $t('messages.searchDetail.processService') }}</h4>
              <ul>
                <li v-for="(process_and_service_actions, index) in searchData.base.process_and_service_actions" :key="index">
                  <p>{{ index }}</p>
                  <p v-for="(process_and_service_action, i) in process_and_service_actions" :key="i">{{ process_and_service_action }}</p>
                </li>
              </ul>
            </div>
            <div>
              <h4 class="subTitle">{{ $t('messages.searchDetail.syncMechanisms') }}</h4>
              <ul>
                <li v-for="(synchronization_mechanisms, index) in searchData.base.synchronization_mechanisms" :key="index">
                  <p>{{ index }}</p>
                  <p v-for="(synchronization_mechanism, i) in synchronization_mechanisms" :key="i">{{ synchronization_mechanism.mutex }}</p>
                </li>
              </ul>
            </div>
            <div>
              <h4 class="subTitle">{{ $t('messages.searchDetail.moduleLoad') }}</h4>
              <ul>
                <li v-for="(modules_loaded, index) in searchData.base.modules_loaded" :key="index">
                  <p>{{ modules_loaded.file }}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="MD5RelationInfo" v-if="searchType === 'md5' && MD5RelationInfoData.length">
          <h3>{{ $t('messages.searchDetail.relationshipInfo') }}</h3>
          <div>
            <table>
              <tr>
                <th>{{ $t('messages.searchDetail.scanneDate') }}</th>
                <th>{{ $t('messages.searchDetail.fileType') }}</th>
                <th>{{ $t('messages.searchDetail.fileName') }}</th>
              </tr>
              <tr v-for="(MD5RelationInfo, index) in MD5RelationInfoData" :key="index">
                <td>{{ MD5RelationInfo.strfdate }}</td>
                <td>{{ MD5RelationInfo.file_type }}</td>
                <td>
                  <span v-for="(name, i) in MD5RelationInfo.name" :key="i">{{ name }}</span>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import api from '@/api/api'
import { Collapse, CollapseItem } from 'element-ui'
import McAfee from '@/assets/img/McAfee.png'
import Microsoft from '@/assets/img/Microsoft.png'
import Symantec from '@/assets/img/Symantec.png'
import Kaspersky from '@/assets/img/Kaspersky.png'
export default {
  data () {
    return {
      center: {lng: 0, lat: 0},
      longitude: '',
      latitude: '',
      zoom: 3,
      activeNames: ['1', '2', '3'],
      searchType: this.$route.query.searchType,
      searchData: {
        base: '',
        Informations: '',
        malicious: '',
        name: ''
      },
      wholookup: '',
      // MD5杀软标签
      softLabelData: [
        {
          engine_name: 'McAfee',
          img: McAfee,
          result: ''
        },
        {
          engine_name: 'Microsoft',
          img: Microsoft,
          result: ''
        },
        {
          engine_name: 'Symantec',
          img: Symantec,
          result: ''
        },
        {
          engine_name: 'Kaspersky',
          img: Kaspersky,
          result: ''
        }
      ],
      softLabelStatus: false,
      // MD5关系信息
      MD5RelationInfoData: []
    }
  },
  computed: {
    ...mapGetters(['language'])
  },
  components: {
    elCollapse: Collapse,
    elCollapseItem: CollapseItem
  },
  watch: {
    language (val) {
      this.malicious(this.searchData.malicious)
    }
  },
  mounted () {
    let requstData = {}
    requstData[this.$route.query.searchType] = this.$route.query.searchValue
    api.get(this.$route.query.searchInterface, requstData).then(res => {
      if (res.status === 0) {
        api.setCookie('token_honeypot', '')
        this.$router.push({path: '/Login', query: {isLogin: true}})
      } else if (res.status === 301) {
        this.$router.push({name: 'Search', params: {tip: this.$t('messages.login.incorrectErr')}})
      } else {
        this.searchData.name = this.$route.query.searchValue
        // 当搜索类型为ip时
        if (this.$route.query.searchType === 'ip') {
          if (!Array.isArray(res[0].base)) {
            this.searchData.base = res[0].base
            // 地图
            this.longitude = this.searchData.base.location.longitude
            this.latitude = this.searchData.base.location.latitude
          }
        }
        // 当搜索类型为dns或ip时
        if (this.$route.query.searchType !== 'md5') {
          if (Object.getOwnPropertyNames(res[0].Informations).length) {
            this.searchData.Informations = res[0].Informations
            if (this.searchData.Informations.resolutions.length === 0) {
              this.searchData.Informations.resolutions = 0
            }
            if (this.searchData.Informations.urls.length === 0) {
              this.searchData.Informations.urls = 0
            }
            if (this.searchData.Informations.download_files.length === 0) {
              this.searchData.Informations.download_files = 0
            }
            if (res[0].Informations.wholookup && res[0].Informations.wholookup.length) {
              var whoisData = this.searchData.Informations.wholookup[0].whois
              let reg = new RegExp('\\n', 'g')
              let whoisStr = whoisData.replace(reg, '<br />')
              this.wholookup = whoisStr
            }
          } else {
            this.searchData.Informations = 0
          }
          // 恶意性判定
          this.searchData.malicious = res[0].malicious.is_malicious
          this.malicious(this.searchData.malicious)
        } else {
          // 当搜索类型为MD5时
          this.searchData.Informations = res[0]
          this.MD5Malicious(this.$route.query.searchValue)
          if (res[0].status !== '0') {
            this.getMalicious(this.$route.query.searchValue)
          }
        }
      }
    })
  },
  methods: {
    // MD5恶意性判定
    MD5Malicious (md5) {
      api.get('MD5Malicious', {'md5': md5}).then(res => {
        this.malicious(res[0].malicious)
      })
    },
    // 恶意性判定中英文切换
    malicious (data) {
      this.searchData.malicious = data
      if (this.searchData.malicious === 'True') {
        this.searchData.malicious = this.$t('messages.searchDetail.malice')
      } else if (this.searchData.malicious === 'False') {
        this.searchData.malicious = this.$t('messages.searchDetail.nonMaliciously')
      } else {
        this.searchData.malicious = this.$t('messages.searchDetail.unknow')
      }
    },
    // MD5数据
    getMalicious (md5) {
      // MD5动态信息
      api.get('MD5Behavior', {'md5': md5}).then(res => {
        this.searchData.base = res[0]
        // 杀软标签
        api.get('MD5Detection', {'md5': md5}).then(res => {
          for (var i = 0; i < this.softLabelData.length; i++) {
            for (var j = 0; j < res.length; j++) {
              if (res[j].engine_name === this.softLabelData[i].engine_name) {
                this.softLabelData[i].result = res[j].result
                if (this.softLabelData[i].result) {
                  this.softLabelStatus = true
                }
                break
              }
            }
          }
          // MD5关系信息
          api.get('MD5Relations', {'md5': md5}).then(res => {
            this.MD5RelationInfoData = res
          })
        })
      })
    },
    handler ({BMap, map}) {
      this.center.lng = this.longitude
      this.center.lat = this.latitude
      this.zoom = 15
    },
    back () {
      this.$router.go(-1)
    },
    // 时间戳转日期格式
    transTime (obj) {
      var datetime = new Date(parseInt(obj) * 1000)
      var year = datetime.getFullYear()
      var month = datetime.getMonth() + 1 < 10 ? '0' + (datetime.getMonth() + 1) : datetime.getMonth() + 1
      var date = datetime.getDate() < 10 ? '0' + datetime.getDate() : datetime.getDate()
      var hour = datetime.getHours() < 10 ? '0' + datetime.getHours() : datetime.getHours()
      var minute = datetime.getMinutes() < 10 ? '0' + datetime.getMinutes() : datetime.getMinutes()
      var second = datetime.getSeconds() < 10 ? '0' + datetime.getSeconds() : datetime.getSeconds()
      return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
    }
  }
}
</script>
<style scoped>
  .searchDetail-view {
    height: calc(100% - 5.5rem);
    overflow-y: scroll;
    background: #fff;
    padding-top: 1rem;
    box-sizing: border-box;
  }
  .searchDetail_container {
    position: relative;
    width: 80%;
    margin: 0 auto;
    border: 1px solid #288770;
    padding: 1rem;
    box-sizing: border-box;
    border-radius: 5px;
  }
  .searchDetail_title {
    border-bottom: 1px solid #288770;
  }
  .searchDetail_title span {
    font-weight: bold;
    color: #288770;
  }
  .searchDetail_title i {
    position: absolute;
    top: 1rem;
    right: 2%;
    display: block;
    width: 2rem;
    height: 1rem;
    background: url('../../assets/img/back.png') center center / cover no-repeat;
  }
  h3 {
    font-size: 1.1rem;
    font-weight: bold;
    padding: 0 0.5rem;
  }
  .searchDetail_content > div {
    margin-top: 1rem;
  }
  .subTitle {
    font-size: 0.9rem;
    font-weight: bold;
    border-bottom: 2px solid #288770;
    padding: 0.5rem 1rem;
    margin-top: 1rem;
  }
  /*基本信息*/
  /*.essentialInformation > div {
    display: flex;
    justify-content: space-between;
  }*/
  /*.port {
    display: flex;
  }
  .port > div {
    margin-left: 1rem;
  }
  .port > div button {
    display: block;
    border: 1px solid #288770;
    background: transparent;
    padding: 5px 10px;
    margin-bottom: 0.5rem;
  }
  .port button:last-child {
    margin-bottom: 0;
  }*/
  .essentialInformation > div > ul {
    padding: 0 2rem;
  }
  .essentialInformation > div > ul li {
    display: flex;
    justify-content: space-between;
  }
  .essentialInformation > div > ul li span {
    color: #288770;
    font-weight: bold;
    flex: 1;
  }
  .essentialInformation > div > ul li p {
    flex: 3;
  }
  .positionInformation ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0.5rem 1.5rem;
  }
  .positionInformation ul li {
    width: 50%;
    line-height: 2rem;
  }
  /*恶意性判定*/
  .maliceJudgment div {
    padding: 0.5rem 1.5rem;
  }
  /*MD5杀软标签*/
  .md5Label > div,
  .md5Packer > div,
  .MD5StaticInfo > div,
  .MD5DynamicInfo > div,
  .MD5RelationInfo > div {
    padding: 0 1rem;
    border: 1px solid #288770;
    border-radius: 5px;
  }
  .md5Label > div ul li {
    display: flex;
    align-items: center;
    padding: 0.5rem 2rem;
    border-bottom: 1px solid #288770;
  }
  .md5Label > div ul li:last-of-type {
    border-bottom: none;
  }
  .md5Label > div ul li span:last-of-type {
    margin-left: 5rem;
  }
  .md5Label > div ul li span:last-of-type > i {
    display: inline-block;
    width: 14px;
    height: 14px;
    margin-right: 0.5rem;
    background: url('../../assets/img/warning.png') center center / 100% 100% no-repeat;
    vertical-align: middle;
  }
  /*位置信息*/
  .bm-view {
    width: 100%;
    height: 300px;
    border: 1px solid #288770;
    border-radius: 5px;
    overflow: hidden;
  }
  /*相关DNS*/
  .whoLookup div, .dns div, .urls div, .sha div {
    border: 1px solid #288770;
    border-radius: 5px;
    padding: 1rem;
  }
  table {
    width: 100%;
  }
  table thead {
    border-bottom: 1px solid #D8D8D8;
  }
  table thead th {
    font-weight: bold;
  }
  table tr:nth-of-type(2n) {
    background: #FBFBFB;
  }
  .dns_tab thead, .urls_tab thead, .dns_tab tr, .urls_tab tr {
    line-height: 3rem;
  }
  .dns_tab th:first-of-type, .urls_tab th:first-of-type, .dns_tab tr td:first-of-type, .urls_tab tr td:first-of-type {
    width: 70%;
  }
  .dns_tab th:last-of-type, .urls_tab th:last-of-type, .dns_tab tr td:last-of-type, .urls_tab tr td:last-of-type {
    text-align: center;
    width: 30%;
  }
  .sha_tab tr {
    line-height: 3rem;
  }
  .sha_tab th:nth-of-type(2), .sha_tab th:last-of-type {
    text-align: center;
  }
  .sha_tab td:nth-of-type(2), .sha_tab td:last-of-type {
    text-align: center;
  }
  /*MD5静态信息*/
  .MD5StaticInfo > div > div > ul, .protableInfo {
    padding: 0.5rem 2rem;
  }
  .MD5StaticInfo > div > div table tr th, .MD5StaticInfo > div > div table tr td {
    padding: 0.5rem 1rem;
  }
  .MD5StaticInfo >  div > div > table tr, .MD5RelationInfo > div table tr {
    border-bottom: 1px solid #288770;
  }
  /*MD5动态信息*/
  .MD5DynamicInfo > div > div > ul {
    padding: 0.5rem 1rem;
  }
  .MD5DynamicInfo > div ul li {
    padding-left: 1rem;
  }
  .MD5DynamicInfo > div ul li p {
    padding-left: 1rem;
  }
  .MD5DynamicInfo > div ul li p:first-of-type {
    padding-left: 0;
  }
  /*MD5关系信息*/
  .MD5RelationInfo > div table {
    margin-bottom: 2rem;
  }
  .MD5RelationInfo > div table tr th, .MD5RelationInfo > div table tr td {
    padding: 0.5rem 1rem;
    text-align: center;
  }
  .MD5RelationInfo > div table tr th:last-of-type, .MD5RelationInfo > div table tr td:last-of-type {
    text-align: left;
  }
</style>
