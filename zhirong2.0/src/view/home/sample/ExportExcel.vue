<template>
  <div class="export-excel-con">
    <el-table
      ref="multipleTable"
      :data="tableDataLi"
      border
      fit
      show-overflow-tooltip
      :cell-style="{borderColor: '#3a537e', 'text-align': 'center'}"
      :header-cell-style="{borderColor: '#3a537e', textAlign: 'center', color: '#000'}"
      style="border: 1px solid #3a537e">
      <el-table-column prop="sample_md5" label="MD5"></el-table-column>
      <el-table-column prop="sample_sha1" label="SHA-1"></el-table-column>
      <el-table-column prop="sample_sha256" label="SHA-256"></el-table-column>

      <el-table-column prop="detect_finished_time" label="完成时间">
        <template slot-scope="scope">
          <span>{{$common.dateChange(scope.row.detect_finished_time)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="gene_family" label="家族组织"></el-table-column>
      <el-table-column prop="ip" label="IP">
        <template slot-scope="scope">
          <ul>
            <li v-for="(i, j) in scope.row.ip.split(',').slice(0, 5)" :key="j">{{i}}</li>
            <li v-if="scope.row.ip.split(',').length > 5">...</li>
          </ul>
        </template>
      </el-table-column>
      <el-table-column prop="dns" label="DNS">
        <template slot-scope="scope">
          <ul>
            <li v-for="(i, j) in scope.row.dns.split(',').slice(0, 5)" :key="j">{{i}}</li>
            <li v-if="scope.row.dns.split(',').length > 5">...</li>
          </ul>
        </template>
      </el-table-column>
      <el-table-column label="标签">
        <template slot-scope="scope">
          <Tags
            :id="scope.row.id"
            :md5="scope.row.sample_md5"
            :exist="scope.row.sample_label + ',' + Math.random()"
            :alltags="[]"/>
        </template>
      </el-table-column>
    </el-table>

    <div class="btn-container" v-if="tableData.length">
      <el-pagination
        class="__text-left"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="20"
        :pager-count="5"
        @current-change="pageChange"
        :current-page.sync="currentPage">
      </el-pagination>
      <div class="btn-con">
        <el-button
        type="primary"
        @click="exportExcel">导出</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'exportExcel',
  data () {
    return {
      legend: ['MD5', 'SHA1', 'SHA256', '时间', '家族组织', 'IP', 'DNS', '标签'],
      tableData: [],
      tableDataLi: [],
      currentPage: 1,
      total: 0
    }
  },
  methods: {
    pageChange (val) {
      this.currentPage = Number(val)
      this.tableDataSplit(this.currentPage)
    },
    init (page) {
      this.$api.get('export_detetion_result_list', {
        id_list: this.$route.query.ids,
        page: page
      }).then(res => {
        if (res.status === 200) {
          let d = res.data.length ? res.data : []
          d.forEach((i, j) => {
            this.tableData.push({
              id: i.id,
              ip: i.ip || '无',
              dns: i.dns || '无',
              sample_md5: i.sample_md5 || '无',
              sample_sha1: i.sample_sha1 || '无',
              sample_sha256: i.sample_sha256 || '无',
              detect_finished_time: i.detect_finished_time || '无',
              gene_family: i.gene_family || '无',
              sample_label: i.sample_label || '无'
            })
          })
          this.tableDataSplit(this.currentPage)
          this.total = res.data.length || 0
        }
      })
    },
    tableDataSplit (page) {
      let per = 20
      Number(page)
      this.tableDataLi = this.tableData.slice(page * per - per, page * per)
    },
    exportExcel () {
      let datas = []
      this.tableData.forEach(function (element, index) {
        datas.push([
          element.sample_md5,
          element.sample_sha1,
          element.sample_sha256,
          this.$common.dateChange(element.detect_finished_time),
          element.gene_family,
          element.ip,
          element.dns,
          element.sample_label.split(',')
        ])
      }.bind(this))
      // 导出excel
      this.$exportExcel('列表', datas, this.legend)
    },
    downloadList () {
      // @ 导出这些页的数据
      // * 根据total计算页数，相当于计算递归多少次
      // * 最后将统计的data导出excel
      let datas = []

      let pages = Math.ceil(this.total / 20)
      for (let i = 1; i <= pages; i++) {
        this.$api.get('export_detetion_result_list', {
          id_list: this.$route.query.ids,
          page: i
        }).then(res => {
          if (res.status === 200) {
            res.results.forEach(function (element, index) {
              datas.push([
                element.ip,
                element.dns,
                element.sample_md5,
                element.sample_sha1,
                element.sample_sha256,
                this.$common.dateChange(element.detect_finished_time),
                element.gene_family,
                element.sample_label.split(',')
              ])
            })
          }
        })
      }

      // 导出excel
      this.$exportExcel('列表', datas, this.legend)
    }
  },
  mounted () {
    this.init(1)
  }
}
</script>

<style scoped="scoped" lang="scss">
  .export-excel-con {
    margin: 0px auto;
    box-sizing: border-box;
    padding: 20px 10%;
    width: 100%;
    table {
      width: 100%;
      td, th {
        text-align: center;
        border: 1px solid $borderColor;
      }
    }
    .btn-container {
      margin-top: 15px;
      display: flex;
      justify-content: space-between;
      .btn-con {
        position: fixed;
        top: 100px;
        right: 20px;
      }
    }
    .null-data {
      padding: 15px 0;
      font-size: 1rem;
      color: #d8d8d8;
    }
  }
</style>
