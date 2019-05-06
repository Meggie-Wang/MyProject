<template>
  <div class="LoopholeGeneDetail">
    <Loading v-if="is_unFinished"></Loading>
    <DetailTitle :title="Title"/>
    <BasicInfor :basicInfo="basicInfo" />
    <DetailTable
      v-if="relateBugRes && relateBugRes.length"
      title='相关漏洞'
      :tableTitle=relateBugTitle
      :tableData=relateBugRes>
      <!-- 点击行跳转 -->
        <template slot="jump" slot-scope="props">
          <el-button
            size="mini"
            @click="jump('LoopholeGeneAnalysisDetail', props.id)">查看</el-button>
        </template>
      </DetailTable>

    <!-- <DetailTable
      v-if="relateFileGeneRes && relateFileGeneRes.length"
      title='相关文件基因'
      :tableTitle=relateFileGeneTitle
      :tableData=relateFileGeneRes /> -->

    <DetailTable
      v-if="belongSoftRes && belongSoftRes.length"
      title='所属软件'
      :tableTitle=belongSoftTitle
      :tableData=belongSoftRes>
      <template slot="jump" slot-scope="props">
          <el-button
            size="mini"
            @click="jump('LoopholeSoftwareDatabaseDetail', props.id)">查看</el-button>
        </template>
      </DetailTable>
  </div>
</template>

<script>
export default{
  name: 'LoopholeGeneDetail',
  data () {
    return {
      is_unFinished: true,
      Title: '',
      basicInfo: {},
      relateBugTitle: [
        {prop: 'bugTitle', label: '漏洞名'},
        {prop: 'bugNo', label: '漏洞号'},
        {prop: 'bugIssueTime', label: '公布时间'},
        {prop: 'bugThreatenLevel', label: '级别'},
        {prop: 'relateSoftCount', label: '相关程序数量'},
        {prop: 'id', label: '操作'}
      ],
      relateBugRes: [],
      relateFileGeneTitle: [
        {prop: 'relateFileMd5', label: '相关文件（MD5）'},
        {prop: 'fileName', label: '文件名'},
        {prop: 'fileType', label: '文件类型'},
        {prop: 'discoverTime', label: '发现时间'},
        {prop: 'hasBugGene', label: '含漏洞基因'},
        {prop: 'relateGeneCount', label: '基因文件'},
        {prop: 'relateSoftCount', label: '相关软件'}
      ],
      relateFileGeneRes: [],
      belongSoftTitle: [
        {prop: 'softName', label: '软件名称'},
        {prop: 'bugTitle', label: '关联漏洞'},
        {prop: 'softType', label: '软件类型'},
        {prop: 'inStoreTime', label: '入库时间'},
        {prop: 'hasRelateBugGene', label: '含漏洞基因'},
        {prop: 'id', label: '操作'}
      ],
      belongSoftRes: []
    }
  },
  methods: {
    init () {
      this.$api.get('bugGeneStoreDetail', {
        gene_id: this.$route.query.id
      }).then(res => {
        if (res.status && res.status === 200) {
          this.is_unFinished = false
          let r = res.data

          this.Title = r.basicInfo.file_md5

          this.basicInfo = r.basicInfo
          this.basicInfo.detect_result = this.basicInfo.detect_result === 1 ? '有' : '无'
          this.basicInfo.create_date = this.$common.dateChange(this.basicInfo.create_date)
          this.basicInfo.detect_finished_date = this.$common.dateChange(this.basicInfo.detect_finished_date)
          this.basicInfo.hasRelateBugGene = this.basicInfo.hasRelateBugGene === true ? '有' : '无'
          this.basicInfo.attack_type = this.$bugTypeDic(this.basicInfo.attack_type)
          this.basicInfo.hole_type = this.$harmWhoDic(this.basicInfo.hole_type)

          if (r.relateBug) {
            r.relateBug.relateSoftCount = String(r.relateBug.relateSoftCount)
            r.relateBug.bugThreatenLevel = !r.relateBug.bugThreatenLevel
              ? '未知'
              : r.relateBug.bugThreatenLevel
            this.relateBugRes = [r.relateBug]
          }

          // this.relateFileGeneRes = r.relateFileGene
          // this.relateFileGeneRes.forEach((res) => {
          //   res.discoverTime = this.$common.dateChange(res.discoverTime)
          //   res.relateGeneCount = res.relateGeneCount === 1 ? '有' : '无'
          //   res.hasBugGene = res.hasBugGene ? '有' : '无'
          // })

          this.belongSoftRes = r.belongSoft.map(i => {
            i.bugTitle = i.bugTitle.length
              ? i.bugTitle.join(',')
              : '无'
            i.softType = i.softType ? i.softType : '无'
            i.inStoreTime = this.$common.dateChange(i.inStoreTime)
            return i
          })
        }
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
    let jumpArr = JSON.parse(localStorage.jumpArr)
    if (jumpArr[jumpArr.length - 2].path === 'LoopholeSoftwareDatabaseDetail') {
      this.belongSoftTitle.pop()
    }
  }
}
</script>
<style scoped></style>
