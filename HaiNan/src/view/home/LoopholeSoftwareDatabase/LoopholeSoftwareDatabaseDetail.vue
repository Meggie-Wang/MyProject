<template>
  <div class="SoftwareDatabaseDetail">
    <Loading v-if="is_unFinished"></Loading>
    <DetailTitle :title="Title"/>
    <BasicInfor :basicInfo="basicInfoData" />
    <DetailTable
      title="相关漏洞"
      :tableTitle="relateBugTitle"
      :tableData="relateBugData">
        <!-- 点击行跳转 -->
        <template slot="jump" slot-scope="props">
          <el-button
            size="mini"
            @click="jump('LoopholeGeneAnalysisDetail', props.id)">查看</el-button>
        </template>
      </DetailTable>

    <Table
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
            path="/LoopholeSoftwareDatabaseDetail"/>
        </template>

        <template slot="jump" slot-scope="props">
          <el-button
            size="mini"
            @click="jump('LoopholeGeneDetail', props.id)">查看</el-button>
        </template>
      </Table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default{
  name: 'SoftwareDatabaseDetail',
  data () {
    return {
      is_unFinished: true,
      Title: '',
      basicInfoData: [],
      relateBugTitle: [
        {
          prop: 'bugTitle',
          label: '漏洞名称'
        },
        {
          prop: 'bugNo',
          label: '漏洞号'
        },
        {
          prop: 'bugIssueTime',
          label: '漏洞公布时间'
        },
        {
          prop: 'bugThreatenLevel',
          label: '漏洞级别',
          width: 120
        },
        {
          prop: 'relateSoftCount',
          label: '相关程序数量'
        },
        {
          prop: 'id',
          label: '操作',
          width: 90
        }
      ],
      relateBugData: [],
      relateFileGeneTitle: [
        {
          prop: 'fileName',
          label: '文件名'
        },
        {
          prop: 'relateFileMd5',
          label: '相关文件（MD5）'
        },
        {
          prop: 'relateGeneCount',
          label: '基因文件',
          width: 100
        },
        {
          prop: 'fileType',
          label: '文件类型'
        },
        {
          prop: 'discoverTime',
          label: '发现时间'
        },
        {
          prop: 'hasBugGene',
          label: '含漏洞基因',
          width: 120
        },
        {
          prop: 'id',
          label: '操作',
          width: 90
        }
      ],
      relateFileGeneData: [],
      total: 0,
      fileName: ''
    }
  },
  computed: {
    ...mapGetters(['relateBugGene'])
  },
  watch: {
    relateBugGene (r) {
      if (r.results.length) {
        this.total = r.count

        r.results.map((res) => {
          switch (res.relateGeneCount) {
            case -1: res.relateGeneCount = '无'
              break
            case 0: res.relateGeneCount = '正在检测'
              break
            case 1: res.relateGeneCount = '有'
              break
          }
          res.fileType = res.fileType ? res.fileType : '无'
          res.discoverTime = res.discoverTime ? res.discoverTime : '无'
          res.discoverTime = this.$common.dateChange(res.discoverTime)
          res.hasBugGene = res.hasBugGene ? '有' : '无'
          return res
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
      this.$api.get('softStoreDetail', {soft_id: this.$route.query.id}).then((res) => {
        if (res) {
          this.is_unFinished = false

          this.basicInfoData = res.data.basicInfo
          this.Title = this.basicInfoData.software_name
          this.basicInfoData.create_date = this.$common.dateChange(this.basicInfoData.create_date)
          this.basicInfoData.complete_date = this.$common.dateChange(this.basicInfoData.complete_date)
          this.basicInfoData.hasRelateBugGene = this.basicInfoData.hasRelateBugGene === true ? '有' : '无'
          this.basicInfoData.hasBugCode = this.basicInfoData.hasBugCode === 1 ? '有' : '无'
          this.basicInfoData.detect_status = this.basicInfoData.detect_status === 1 ? '提取完成' : '正在提取'
          this.basicInfoData.attack_type = this.$bugTypeDic(this.basicInfoData.attack_type)
          this.basicInfoData.hole_type = this.$harmWhoDic(this.basicInfoData.hole_type)
          let predictStatus = ''
          switch (Number(this.basicInfoData.predict_status)) {
            case 0: predictStatus = '未检测'; break
            case 1: predictStatus = '检测完成'; break
            case 2: predictStatus = '检测中'; break
          }
          this.basicInfoData.predict_status = predictStatus

          if (res.data.basicInfo.hasRelateBug) {
            this.basicInfoData.hasRelateBug = res.data.basicInfo.hasRelateBug ? '有' : '无'
          }

          this.relateBugData = res.data.relateBug
          if (this.relateBugData.length && this.relateBugData[0].bugThreatenLevel === '') {
            this.relateBugData[0].bugThreatenLevel = '未知'
          }
        }
      })
    },
    operat (page) {
      this.$store.dispatch('getRelateBugGene', {
        soft_id: this.basicInfoData.id,
        searchName: this.$route.query.searchName,
        page: page || 1
      })
    },
    jump (path, id) {
      this.$router.push({
        path: path,
        query: {id: id}
      })
    }
  },
  mounted () {
    this.init()
    this.$store.dispatch('getRelateBugGene', {
      soft_id: this.$route.query.id,
      page: this.$route.query.page || 1
    })

    let jumpArr = JSON.parse(localStorage.jumpArr)
    if (jumpArr[jumpArr.length - 2].path === 'LoopholeGeneDetail') {
      this.relateFileGeneTitle.pop()
    }
  }
}
</script>
<style scoped></style>
