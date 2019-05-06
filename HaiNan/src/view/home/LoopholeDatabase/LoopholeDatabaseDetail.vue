<template>
  <div class="LoopholeDatabaseDetail">
    <Loading v-if="is_unFinished"></Loading>
    <DetailTitle :title="Title" :status="analyse_status"/>
    <BasicInfor :basicInfo="basicInfoData" />
    <DetailTable
      title="关联软件"
      :tableTitle="relateSoftTitle"
      :tableData="relateSoftData"
      operation="详情"
      @operat="operat">
        <template slot="hasBugCode" slot-scope="props">
          <div style="height: 100%; display: flex; align-items: center;justify-content: center;">
            <el-progress
              v-if="progress"
              type="circle"
              color="#199a8c"
              :width="20"
              :stroke-width="10"
              :show-text=false
              :percentage="progress"></el-progress>

            <!-- 漏洞代码上传 -->
            <UploadFile
              v-if="!props.hasBugCode"
              class="upload-code"
              style="height: 1.5rem; line-height: 1.5rem;"
              btnName="上传漏洞利用代码"
              uploadApi="upload_cve_using_code"
              :params="{
                'bugNo': basicInfoData.cve_number,
                'soft_id': props.id
              }"
              @progress="listenProgress"
              @callback="uploadFile" />
            <button
              v-else
              class="upload-code"
              @click="checkoutCode(props.id, basicInfoData.cve_number)">查看</button>

          </div>
        </template>
      </DetailTable>
    <DetailTable
      :title="relateSoftTableTitle + '相关文件基因'"
      :tableTitle="relateFileGeneTitle"
      :tableData="relateFileGeneData"/>
    <!-- <div class="exploitCode" v-if="this.basicInfoData.hasBugCode === 1">
      <h1>{{ this.basicInfoData.cve_number }}软件漏洞利用代码</h1>
      <div v-html="exploitCode"></div>
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default{
  name: 'LoopholeDatabaseDetail',
  data () {
    return {
      is_unFinished: true,
      Title: '',
      analyse_status: '',
      basicInfoData: [],
      relateSoftTitle: [
        {
          prop: 'softName',
          label: '软件名称'
        },
        {
          prop: 'version',
          label: '版本号'
        },
        {
          prop: 'supplier',
          label: '供应商'
        },
        {
          prop: 'hasBugCode',
          label: '是否包含漏洞利用代码'
        }
      ],
      relateSoftData: [],
      relateSoftTableTitle: '',
      relateFileGeneTitle: [
        {
          prop: 'relateFileMd5',
          label: '软件相关文件（MD5）'
        }, {
          prop: 'relateGeneCount',
          label: '基因文件',
          width: 120
        }, {
          prop: 'fileType',
          label: '文件类型'
        }, {
          prop: 'fileName',
          label: '文件名'
        }, {
          prop: 'discoverTime',
          label: '发现时间'
        }, {
          prop: 'hasBugCode',
          label: '是否包含漏洞利用代码'
        }
      ],
      relateFileGeneData: [],
      progress: 0
    }
  },
  computed: {
    ...mapGetters(['exploitCode'])
  },
  watch: {
    exploitCode (obj) {
      let s = null
      if (obj.status === 200) {
        s = obj.data
      } else {
        s = obj.message
      }
      let nwin = window.open('')
      nwin.document.write('<pre>' + s + '</pre>')
      nwin.focus()
      nwin.document.title = this.basicInfoData.cve_name
    }
  },
  methods: {
    init () {
      this.$api.get('bugStoreDetail', {cve_id: this.$route.query.id}).then((res) => {
        if (res) {
          this.is_unFinished = false
          this.basicInfoData = res.data.basicInfo
          this.basicInfoData.attack_type = this.$bugTypeDic(this.basicInfoData.attack_type)
          this.basicInfoData.hole_type = this.$harmWhoDic(this.basicInfoData.hole_type)
          this.basicInfoData.create_date = this.$common.dateChange(this.basicInfoData.create_date)

          if (this.basicInfoData.analyse_date) {
            this.basicInfoData.analyse_date = this.$common.dateChange(this.basicInfoData.analyse_date)
          }

          this.Title = this.basicInfoData.cve_name
          this.analyse_status = this.basicInfoData.analyse_status === 0 ? '未分析' : '已分析'

          this.relateSoftData = res.data.relateSoft
          this.relateSoftData.forEach((res) => {
            res.version = res.version ? res.version : '无'
            res.supplier = res.supplier ? res.supplier : '无'
          })
          if (this.relateSoftData && this.relateSoftData.length) {
            this.relateSoftTableTitle = this.relateSoftData[0].softName
            console.log(this.relateSoftTableTitle)
          }
          if (this.basicInfoData.hasBugCode === 1) {
            this.$store.dispatch('getExploitCode', this.basicInfoData.cve_number)
          }
        }
      })
    },
    operat (val) {
      this.relateSoftData.forEach((i, j) => {
        if (i.id === val) {
          if (i.file_data.length) {
            this.relateFileGeneData = i.file_data
            this.relateFileGeneData.forEach((res) => {
              res.discoverTime = res.discoverTime ? this.$common.dateChange(res.discoverTime) : '无'
              res.fileType = res.fileType ? res.fileType : '无'
              switch (res.relateGeneCount) {
                case -1: res.relateGeneCount = '无'
                  break
                case 0: res.relateGeneCount = '正在检测'
                  break
                case 1: res.relateGeneCount = '有'
                  break
              }
            })
          } else {
            this.$message({
              type: 'warning',
              message: '无相关文件'
            })
          }
        }
      })
    },
    listenProgress (progress) {
      this.progress = progress
    },
    uploadFile (e) {
      this.$message({
        type: e.status === 200 ? 'success' : 'warning',
        message: e.message
      })
      this.progress = 0
      this.init()
    },
    checkoutCode (softId, bugNo) {
      this.$store.dispatch('getExploitCode', {
        bugNo: bugNo,
        soft_id: softId
      })
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<style scoped lang="scss">
  .exploitCode {
    margin-top: 5px;
    h1 {
      color: $tableTitleText;
      background: $tableTitleBg;
      text-indent: 1rem;
      font-size: 0.9rem;
      font-weight: normal;
      border-radius: 2px;
      margin-bottom: 2px;
      padding: 8px 0;
    }
    > div {
      padding: 1rem;
      font-size: 0.8rem;
      background: $bgColor-opacity;
    }
  }
  .upload-code {
    display: inline-block;
    height: 23px;
    line-height: 23px;
    font-size: 12px;
    color: #fff;
    background-color: $bgColor;
    text-indent: 0;
    box-sizing: border-box;
    padding: 0px 7px;
    border-radius: 3px;
    border: none;
    box-shadow: 0px 1px 5px #001913;
    cursor: pointer;
  }
</style>
