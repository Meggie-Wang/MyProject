<template>
  <div class="LoopholeGeneAnalysisDetail">
    <Loading v-if="is_unFinished"></Loading>
    <DetailTitle :title="Title" :status="analyse_status"/>
    <BasicInfor :basicInfo="basicInfoData" @init="init"/>

    <DetailTable
      title="关联软件"
      :tableTitle="relateSoftTitle"
      :tableData="relateSoftData">

        <template slot="header">
          <el-button size="mini" class="upload-code" @click="uploadShow = true">添加软件</el-button>
        </template>

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
            <el-button
              v-if="!props.hasBugCode"
              size="mini"
              style="padding: 0;">
              <UploadFile
                style="height: 28px; line-height: 28px; padding: 0 7px;"
                btnName="上传漏洞利用代码"
                uploadApi="upload_cve_using_code"
                :params="{
                  'bugNo': basicInfoData.cve_number,
                  'soft_id': props.id
                }"
                @progress="listenProgress"
                @callback="uploadFile" />
              </el-button>
            <el-button
              v-else
              size="mini"
              @click="checkoutCode(props.id, basicInfoData.cve_number)">查看</el-button>

          </div>
        </template>

        <template slot="checkSoftDetail" slot-scope="props">
          <el-button
            size="mini"
            @click="checkGeneFile(props.id)">详情</el-button>
        </template>

      </DetailTable>

    <!-- 上传软件 -->
    <Upload
      v-if="uploadShow"
      router="right"
      idStr="upload-code"
      :params="{
        'bugNo': basicInfoData.cve_number
      }"
      @hideUpd="uploadShow = false; init()"/>

    <Table
      v-if="total"
      title="相关文件基因"
      :tableTitle="relateFileGeneTitle"
      :tableData="relateFileGeneData"
      :total="total"
      @requestApi="operat">
        <template slot="search">
          <Search
            style="background-color: #0a6450; border-radius: 4px;"
            searchPlaceholder="请输入文件名"
            @initList="operat"
            path="/LoopholeGeneAnalysisDetail"/>
        </template>

        <template slot="ensureBugGene" slot-scope="props">
          <el-button
            v-if="props.hasRelateBugGene === '无'"
            class="upload-code"
            @click="ensureFileGene(1, props.id)">确定漏洞基因</el-button>
          <el-button
            v-else
            class="upload-code"
            @click="ensureFileGene(-1, props.id)">取消</el-button>
        </template>

      </Table>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default{
  name: 'LoopholeGeneAnalysisDetail',
  data () {
    return {
      is_unFinished: true,
      Title: '',
      basicInfoData: [],
      relateSoftTitle: [
        {
          prop: 'softName',
          label: '名称'
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
          label: '含漏洞利用代码'
        },
        {
          prop: 'id',
          label: '操作'
        }
      ],
      relateSoftData: [],
      relateFileGeneTitle: [
        {
          prop: 'fileName',
          label: '文件名'
        }, {
          prop: 'relateFileMd5',
          label: '文件MD5'
        }, {
          prop: 'relateGeneCount',
          label: '基因文件',
          width: 100
        }, {
          prop: 'fileType',
          label: '文件类型'
        }, {
          prop: 'discoverTime',
          label: '发现时间'
        }, {
          prop: 'hasRelateBugGene',
          label: '含漏洞基因',
          width: 120
        },
        {
          prop: 'id',
          label: '操作',
          width: 180
        }
      ],
      relateFileGeneData: [],
      analyse_status: '',
      progress: 0,
      uploadShow: false,
      softDetailFileId: null,
      total: 0
    }
  },
  computed: {
    ...mapGetters(['exploitCode', 'relateBugGene'])
  },
  watch: {
    exploitCode (obj) {
      // 第一版本是返回txt内容
      // let s = null
      // if (obj.status === 200) {
      //   s = obj.data
      // } else {
      //   s = obj.message
      // }
      // let nwin = window.open('')
      // nwin.document.write('<meta charset="utf-8"><pre>' + s + '</pre>')
      // nwin.focus()
      // nwin.document.title = this.basicInfoData.cve_name

      // 第二版本，返沪txt路径
      let name = obj.data.cve_using_code_path.split('/')
      name = name[name.length - 1]
      let path = this.$api.apiPath + obj.data.cve_using_code_path
      // window.open 第二个参数的确是name ,浏览器标签的title，但是可能是因为是直接读取文件的缘故，title设置不上
      let nwin = window.open('')
      // 故，此处利用iframe读取文件，title数空标签的
      nwin.document.write('<iframe src="' + path + '" frameborder="0" style="width: 100%; height: calc(100% - 16px);"></iframe>')
      nwin.focus()
      // 这时候title就能设置上了
      nwin.document.title = name
    },
    relateBugGene (r) {
      if (r.results.length) {
        this.total = r.count
        r.results.map(i => {
          i.discoverTime = this.$common.dateChange(i.discoverTime)
          i.hasRelateBugGene = i.hasRelateBugGene ? '有' : '无'
          i.fileType = i.fileType ? i.fileType : '无'
          switch (i.relateGeneCount) {
            case -1: i.relateGeneCount = '无'
              break
            case 0: i.relateGeneCount = '正在检测'
              break
            case 1: i.relateGeneCount = '有'
              break
          }
          return i
        })
      } else {
        this.total = 0
        // 清空url search
        let q = this.$common.inheritObj(this.$route.query)
        delete q.searchName
        this.$router.push({
          path: this.$route.name,
          query: q
        })
        this.$message({
          type: 'warning',
          message: '无相关文件'
        })
      }
      this.relateFileGeneData = r.results
    }
  },
  methods: {
    init () {
      return this.$api.get('bugStoreDetail', {cve_id: this.$route.query.id}).then((res) => {
        if (res) {
          this.relateSoftData = res.data.relateSoft
          this.relateSoftData.forEach((result) => {
            result.version = result.version ? result.version : '无'
            result.supplier = result.supplier ? result.supplier : '无'
          })

          this.basicInfoData = res.data.basicInfo
          this.basicInfoData.hole_type = this.$harmWhoDic(this.basicInfoData.hole_type)
          this.basicInfoData.attack_type = this.$bugTypeDic(this.basicInfoData.attack_type)
          this.basicInfoData.create_date = this.$common.dateChange(this.basicInfoData.create_date)
          this.basicInfoData.hasBugCode = this.basicInfoData.hasBugCode === 1 ? '有' : '无'
          this.basicInfoData.hasRelateBugGeneFile = this.basicInfoData.hasRelateBugGeneFile ? '有' : '无'
          this.basicInfoData.hasRelateSoft = this.basicInfoData.hasRelateSoft ? '有' : '无'
          this.basicInfoData.analyse_status = this.basicInfoData.analyse_status === 1 ? '已分析' : '未分析'

          if (this.basicInfoData.analyse_date) {
            this.basicInfoData.analyse_date = this.$common.dateChange(this.basicInfoData.analyse_date)
          }

          this.Title = this.basicInfoData.cve_name

          this.analyse_status = this.basicInfoData.analyse_status === 0 ? '未检测' : '已检测'
          this.is_unFinished = false
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
    },
    checkGeneFile (val) {
      this.softDetailFileId = val
      // 查看软件详情文件
      // 显示第一页
      // table中pager 没有变化？
      let o = this.$common.inheritObj(this.$route.query)
      o.page = 1
      this.$router.push({
        path: this.$route.currentPath,
        query: o
      })

      this.operat(1)
    },
    operat (page) {
      this.$store.dispatch('getRelateBugGene', {
        soft_id: this.softDetailFileId,
        searchName: this.$route.query.searchName,
        page: page || 1
      })
    },
    ensureFileGene (style, id) {
      this.$api.get('softGeneDetectionAct', {
        analysis_style: style,
        analysis_user: localStorage.userName,
        cve_id: this.basicInfoData.id,
        gene_id: id
      }).then(e => {
        this.$message({
          type: e.status === 200 ? 'success' : 'warning',
          message: e.message
        })

        this.operat()
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
</style>
