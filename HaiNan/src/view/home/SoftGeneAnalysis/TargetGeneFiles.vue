<template>
  <div class="targetGeneFile">
    <DetailTitle :title="$route.query.name"/>

    <Table
      v-if="total"
      :tableTitle=tableTitle
      :tableData=tableData
      :total="total"
      :page="currentPage"
      @requestApi="targetGeneFile">

        <template slot="geneAnalysis" slot-scope="props">
          <!-- 根据对比完成的状态，按钮执行不同动作 -->
          <!-- 未对比0；对比中 loading 2; 对比完成 1 查看 difcompare_status-->
          <el-button
            v-if="props.params.difcompare_status !== 1"
            size="mini"
            :disabled="props.params.difcompare_status !== 0"
            @click="geneAnalysis(props.params)">
            {{ props.params.difcompare_status === 2 ? '对比中' : '对比' }}</el-button>
          <el-button
            v-else
            size="mini"
            type="success"
            style="background: #0aa090;"
            @click="checkResult(props.params)">查看</el-button>
        </template>
      </Table>
  </div>
</template>

<script>
export default{
  name: 'targetGeneFile',
  data () {
    return {
      Title: '',
      basicInfoData: {},
      tableTitle: [
        {
          prop: 'own_file_name',
          label: '文件名'
        },
        {
          prop: 'file_name',
          label: '对比文件名'
        },
        {
          prop: 'create_date',
          label: '入库时间'
        },
        {
          prop: 'similarity',
          label: '相似度',
          width: 100
        },
        {
          prop: 'id',
          label: '操作',
          width: 180
        }
      ],
      tableData: [],
      total: 0,
      currentPage: 1,
      bugNo: 0,
      timer: null
    }
  },
  methods: {
    targetGeneFile (page) {
      this.currentPage = page

      this.$api.get('file_two_similar', {
        queue_id: this.$route.query.queue_id,
        bugNo: this.$route.query.bugNo,
        page: page
      }).then(r => {
        if (r.results.length) {
          this.total = r.count
          this.tableData = r.results.map(i => {
            i.similarity = (Number(i.similarity) * 100).toFixed(2) + ' %'
            i.create_date = this.$common.dateChange(i.create_date)
            i.file_name = i.file_name ? i.file_name : '未录入'
            i.own_file_name = i.own_file_name ? i.own_file_name : '未录入'
            return i
          })
        }
      })
    },
    geneAnalysis (params) {
      this.$api.get('differAnalysis', {
        analysis_user: localStorage.userName,
        file_list: JSON.stringify([params.own_file_id, params.file_id]),
        compare_style: '1',
        similar_queue: params.queue_id
      }).then((res) => {
        if (res) {
          this.$message({
            message: res.message,
            type: 'success'
          })
        }

        this.targetGeneFile(this.$route.query.page || 1)
      })
    },
    checkResult (val) {
      this.$router.push({
        path: 'GeneCompareResult',
        query: {
          id: val.dif_queue_id,
          file1Md5: val.own_file_name || val.own_md5,
          file2Md5: val.file_name || val.file_md5,
          lastPage: this.$route.query.page || 1
        }
      })
    }
  },
  mounted () {
    this.targetGeneFile(this.$route.query.page || 1)
    this.timer = setInterval(() => {
      this.targetGeneFile(Number(this.$route.query.page) || 1)
    }, 3000)
  },
  beforeRouteLeave (to, path, next) {
    clearInterval(this.timer)
    next()
  }
}
</script>
