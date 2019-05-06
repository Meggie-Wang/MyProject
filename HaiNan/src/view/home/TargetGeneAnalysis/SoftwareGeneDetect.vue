<template>
  <div class="SoftwareGeneDetect">
    <div class="SoftwareGeneDetectHead">
      <div class="Title">软件基因检测</div>
      <div class="content">使用软件技术，提取指定漏洞软件的相关基因信息。利用软件基因的大数据处理和自动化处理能力，对漏洞信息形成基于软件基因的漏洞描述，最终转换为软件漏洞基因。为软件漏洞提供技术支撑。</div>
      <div class="upload">

        <div class="upload_left">
          <UploadFile
            :btnImg="$img.upload"
            uploadApi="uploadsoftware"
            @progress="listenProgress"
            @callback="uploadFile" />
          <el-progress
            v-if="progress"
            :percentage="progress"></el-progress>
          <span>支持扩展名：RAR,ZIP或目录</span>
        </div>

        <div class="upload_right">
          <p>人工上传待检测软件，软件当是安装后的文件包（可以是目录或压缩文件）</p>
          <p>注意如果安装过程中有些资源安装到其他的目录位置，需要手动导入到检测文件包中</p>
        </div>
      </div>
    </div>
    <div class="searchOption">
      <Select
        :optData="selectOpt"
        @initList="init"
        @options="optionsAct"
        path="/SoftwareGeneDetect"/>
      <Search
        :searchPlaceholder="searchPlaceholder"
        @initList="init"
        @searchAct="searchAct"
        path="/SoftwareGeneDetect"/>
    </div>
    <Table :tableTitle=tableTitle :tableData=tableData operation="检测" />
  </div>
</template>

<script>
export default{
  name: 'SoftwareGeneDetect',
  data () {
    return {
      searchVal: '',
      searchPlaceholder: '请输入检索的软件名、漏洞名',
      selectOpt: {
        select_1: {
          placeholder: '是否关联漏洞',
          option: [
            { value: 'yes', label: '是' },
            { value: 'no', label: '否' },
            { value: 'unknown', label: '未知' }
          ]
        },
        select_2: {
          placeholder: '是否关联漏洞基因文件',
          option: [
            { value: 'yes', label: '是' },
            { value: 'no', label: '否' },
            { value: 'unknown', label: '未知' }
          ]
        },
        select_3: {
          placeholder: '软件类型',
          option: [
            { value: 'yes', label: '安全' },
            { value: 'no', label: '恶意' },
            { value: 'unknown', label: '未知' },
            { value: '-1', label: '未检测' }
          ]
        }
      },
      tableTitle: [
        {
          prop: 'softNo',
          label: '序号'
        },
        {
          prop: 'softName',
          label: '软件名'
        },
        {
          prop: 'softType',
          label: '类型'
        },
        {
          prop: 'hasRelateBug',
          label: '是否关联漏洞'
        },
        {
          prop: 'hasRelateBugGene',
          label: '是否关联漏洞基因'
        },
        {
          prop: 'inStoreTime',
          label: '入库时间'
        }
      ],
      tableData: [
        {
          softNo: '2016-05-02',
          softName: '王小虎',
          softType: '2019-2-27',
          hasRelateBug: '低',
          hasRelateBugGene: '2019-2-27',
          inStoreTime: '低'
        },
        {
          softNo: '2016-05-04',
          softName: '王小虎',
          softType: '2019-2-27',
          hasRelateBug: '低',
          hasRelateBugGene: '2019-2-27',
          inStoreTime: '低'
        },
        {
          softNo: '2016-05-01',
          softName: '王小虎',
          softType: '2019-2-27',
          hasRelateBug: '低',
          hasRelateBugGene: '2019-2-27',
          inStoreTime: '低'
        },
        {
          softNo: '2016-05-03',
          softName: '王小虎',
          softType: '2019-2-27',
          hasRelateBug: '低',
          hasRelateBugGene: '2019-2-27',
          inStoreTime: '低'
        }
      ],
      hasRelateBug: '',
      hasRelateBugGeneFile: '',
      softType: '',
      startTime: '',
      endTime: '',
      progress: 0
    }
  },
  methods: {
    init () {
      console.log('aaa')
    },
    optionsAct (val) {
      this.hasRelateBug = val.select_1Val
      this.hasRelateBugGeneFile = val.select_2Val
      this.softType = val.select_3Val
      this.startTime = val.start_time
      this.endTime = val.end_time
    },
    searchAct (val) {
      this.searchVal = val
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
    }
  }
}
</script>
<style scoped lang="scss">
  .searchOption {
    display: flex;
  }
  .SoftwareGeneDetectHead {
    .Title {
      color: $textColor;
      background: $bgColor-opacity;
      font-size: 1rem;
      font-weight: bold;
      border-radius: 2px 2px 0 0;
      padding: 8px 1rem;
    }
    .content {
      color: $tableTitleText;
      background: $tableTitleBg;
      font-size: .8rem;
      font-weight: normal;
      padding: 8px 1rem;
    }
    .upload {
      color: $textColor;
      background: $bgColor-opacity;
      font-size: .8rem;
      font-weight: normal;
      border-radius: 0 0 2px 2px;
      padding: 8px 1rem;
      display: flex;
      justify-content: space-between;
      margin-bottom: .5rem;
      .upload_left {
        width: 40%;
        vertical-align: center;
        img {
          width: 30%;
        }
      }
      .upload_right {
        width: 60%;
      }
    }
  }
</style>
