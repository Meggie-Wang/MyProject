<template>
  <div class="SoftwareDetectResult">
    <DetailTitle :title="Title"/>
    <BasicInfor :basicInfo="basicInfoData" />

    <Table
      v-if="total"
      title="命中漏洞"
      :tableTitle=tableTitle
      :tableData=tableData
      :total="total"
      :page="currentPage"
      @requestApi="targetBug">

        <template slot="targetGeneFile" slot-scope="props">
          <el-button
            size="mini"
            @click="rememberBugNo(props.bugNo, props.title)">命中漏洞基因</el-button>
        </template>

      </Table>
  </div>
</template>

<script>
export default{
  name: 'SoftwareDetectResult',
  data () {
    return {
      Title: '',
      basicInfoData: {},
      tableTitle: [
        {
          prop: 'cve_number',
          label: '漏洞号'
        },
        {
          prop: 'cve_name',
          label: '漏洞名'
        },
        {
          prop: 'create_date',
          label: '完成时间'
        },
        {
          prop: 'similarity',
          label: '相似度',
          width: 100
        },
        {
          prop: 'id',
          label: '操作'
        }
      ],
      tableData: [],
      total: 0,
      currentPage: 1,
      bugNo: 0
    }
  },
  methods: {
    init () {
      this.$api.get('detectResult', {queue_id: this.$route.query.id}).then((res) => {
        if (res.status === 200) {
          this.basicInfoData = res.data.basic_info
          this.Title = this.basicInfoData.software_name
          this.basicInfoData.analysis_style = this.basicInfoData.analysis_style === 0
            ? '基于漏洞'
            : '基于漏洞基因'
          this.basicInfoData.complete_date = this.$common.dateChange(this.basicInfoData.complete_date)
          this.basicInfoData.analysis_rate = (this.basicInfoData.analysis_rate * 100).toFixed(2) + ' %'
        }
      }).then(() => {
        this.targetBug(this.$route.query.page || 1)
      })
    },
    targetBug (page) {
      this.currentPage = page

      this.$api.get('cve_one_similar', {
        queue_id: this.$route.query.id,
        soft_id: this.basicInfoData.software_id,
        page: page
      }).then(r => {
        if (r.results.length) {
          this.total = r.count
          this.tableData = r.results.map(i => {
            i.similarity = (Number(i.similarity) * 100).toFixed(2) + ' %'
            i.create_date = this.$common.dateChange(i.create_date)
            return i
          })
        }
      })
    },
    rememberBugNo (bn, name) {
      // 跳转查看
      this.$router.push({
        path: 'TargetGeneFiles',
        query: {
          queue_id: this.$route.query.id,
          bugNo: bn,
          name: name
        }
      })
    }
  },
  mounted () {
    this.init()
  }
}
</script>
