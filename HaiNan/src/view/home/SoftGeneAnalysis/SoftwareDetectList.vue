<template>
  <div class="SoftwareDetectList">
    <router-intro content="队列进程展示，每次只进行一个检测任务，故队列的第一个为最新检测的目标。" />

    <div class="searchOption">
      <Select
        :optData="selectOpt"
        @initList="init"
        path="/SoftwareDetectList"/>
      <Search
        :searchPlaceholder="searchPlaceholder"
        @initList="init"
        path="/SoftwareDetectList"/>
    </div>
    <Table
      :tableTitle=tableTitle
      :tableData=tableData
      :total="total"
      :page="currentPage"
      @requestApi="init" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default{
  name: 'SoftwareDetectList',
  data () {
    return {
      searchVal: '',
      searchPlaceholder: '软件名',
      selectOpt: {
        select_1: {
          placeholder: '检测方式',
          option: [
            { value: '1', label: '基于漏洞基因' },
            { value: '0', label: '基于漏洞' }
          ]
        },
        select_2: {
          placeholder: '提交用户',
          option: [
            { value: '', label: '' }
          ]
        },
        select_3: {
          placeholder: '命中漏洞',
          option: [
            { value: '1', label: '有' },
            { value: '0', label: '无' }
          ]
        }
      },
      tableTitle: [
        {
          prop: 'software_name',
          label: '软件名'
        },
        {
          prop: 'detect_status',
          label: '检测状态',
          width: 140
        },
        {
          prop: 'is_target',
          label: '命中漏洞'
        },
        {
          prop: 'create_date',
          label: '入库时间'
        },
        {
          prop: 'submit_user',
          label: '提交用户',
          width: 140
        }
      ],
      tableData: [],
      total: 0,
      currentPage: 1,
      softType: '',
      timer: {}
    }
  },
  computed: {
    ...mapGetters(['userList'])
  },
  watch: {
    userList (o) {
      this.selectOpt.select_2.option = o.map(i => {
        return {
          value: i,
          label: i
        }
      })
    }
  },
  methods: {
    init (val) {
      let obj = {
        startTime: this.$route.query.startTime || '',
        endTime: this.$route.query.endTime || '',
        analysis_style: this.$route.query.select_1Val || '',
        submit_user: this.$route.query.select_2Val || '',
        has_result: this.$route.query.select_3Val || '',
        searchName: this.$route.query.searchName || '',
        page: val || 1
      }
      this.$api.get('detectList', obj).then((res) => {
        this.tableData = res.results
        this.tableData.forEach((res) => {
          res.create_date = this.$common.dateChange(res.create_date)
          res.detect_status = res.detect_status === 1 ? '正在检测' : '检测完成'
          res.is_target = res.detect_status === '正在检测'
            ? '正在检测'
            : (res.is_target === 1 ? '命中' : '未命中')
        })
        this.total = res.count || 0
      })
      this.currentPage = val
    }
  },
  mounted () {
    // 请求用户列表
    this.$store.dispatch('getUserList')

    this.init(Number(this.$route.query.page))
    this.timer = setInterval(() => {
      this.init(Number(this.$route.query.page))
    }, 3000)
  },
  beforeRouteLeave (to, path, next) {
    clearInterval(this.timer)
    next()
  }
}
</script>
<style scoped>
  .searchOption {
    display: flex;
  }
</style>
