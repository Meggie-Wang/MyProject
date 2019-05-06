<template>
  <div class="table">
    <header v-if="title" style="display: flex; justify-content: space-between;">
      <span>{{title}}</span>
      <slot name="search" />
    </header>

    <el-table
      :data="tableData"
      border
      :cell-style="{borderColor: '#3a537e', 'text-align': 'center'}"
      :header-cell-style="{borderColor: '#3a537e', textAlign: 'center', color: '#000'}"
      style="border: 1px solid #3a537e"
      @row-click="getDataDetail"
      @sort-change="sortAct">

      <el-table-column
        v-for="(i, j) in tableTitle" :key="j"
        :prop="i.prop"
        :label="i.label"
        :width="i.width"
        :show-overflow-tooltip="true"
        :sortable="$route.name === 'GeneCompareResult' &&
          i.prop === 'value'
            ? 'custom'
            : false"
        align="center">

        <template slot-scope="scope">

          <span v-if="i.prop !== 'id'">{{ scope.row[i.prop]}}</span>

          <slot
            name="detect"
            v-if="i.prop === 'id'"
            :id="scope.row.id"
            :detect_status="scope.row.detect_status"
            :predict_status="scope.row.predict_status"
            :softName="scope.row.softName" />

          <slot
            name="analysis"
            v-if="i.prop === 'id'"
            :id="scope.row.id"/>

          <slot
            name="lookCompare"
            v-if="i.prop === 'id'"
            :params="scope.row"/>

          <slot
            v-if="i.prop === 'id'"
            name="ensureBugGene"
            :id="scope.row.id"
            :hasRelateBugGene="scope.row.hasRelateBugGene" />

          <slot
            v-if="i.prop === 'id'"
            name="targetGeneFile"
            :bugNo="scope.row.cve_number"
            :title="scope.row.cve_name"/>

          <slot
            v-if="i.prop === 'id'"
            name="geneAnalysis"
            :params="scope.row"/>

          <slot
            v-if="i.prop === 'id'"
            name="jump"
            :id="scope.row.id"/>

        </template>

      </el-table-column>

      <el-table-column
        width="40"
        v-if="this.$router.history.current.path.split('/')[1] === 'GeneAnalysisTool'"
        :resizable="false">

        <template slot="header" slot-scope="header">
          <el-checkbox v-model="allChecked" @change="allCheck">
          </el-checkbox>
        </template>

        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.Checked" @change="singleCheck(scope.row)">
          </el-checkbox>
        </template>

      </el-table-column>

    </el-table>

    <div class="__text-left">
      <el-pagination
        v-if="total"
        background
        layout="prev, pager, next"
        :page-size="20"
        prev-text="上一页"
        next-text="下一页"
        :total="total"
        :current-page.sync="currentPage"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>

  </div>
</template>
<script>
// 页码操作中：记录当前页码；请求table数据
// 刷新页面：获取当前页面请求table数据
export default {
  name: 'Table',
  data () {
    return {
      currentPath: this.$router.history.current.path.split('/')[1],
      currentPage: 1,
      tableEles: [],
      unChooseAllEles: false,
      Selection: [],
      allChecked: '',
      Arr: []
    }
  },
  props: ['tableTitle', 'tableData', 'operation', 'total', 'page', 'handleClick', 'title'],
  watch: {
    total () {
      this.currentPage = Number(this.$route.query.page) || 1
    },
    page (val) {
      this.currentPage = val || 1
    },
    currentPage (val) {
      if (this.tableEles[this.currentPage]) {
        if (this.tableEles[this.currentPage].length === this.tableData.length) {
          this.allChecked = true
        } else {
          this.allChecked = false
        }
      } else {
        this.allChecked = false
      }
    },
    Arr (val) {
      if (val.length === 30 || (val.length === this.tableData.length && val.length > 0)) {
        this.allChecked = true
      } else {
        this.allChecked = false
      }
    },
    handleClick (val) {
      this.tableEles = []
      this.tableEles[this.currentPage] = this.tableEles[this.currentPage]
        ? this.tableEles[this.currentPage]
        : []
      this.Arr = []
      for (var k in this.tableData) {
        this.tableData[k].Checked = false
      }
      this.$emit('selectList', this.tableEles)
    }
  },
  methods: {
    allCheck () {
      // 点击全选时先将用于存储id的数组和数据中的字段全部置为初始值防止添加重复
      this.tableEles[this.currentPage] = []
      for (var x in this.tableData) {
        this.tableData[x].Checked = false
      }
      // 点击后全选状态为true做数量限制
      if (this.allChecked === true) {
        for (var i = 0; i < this.tableData.length; i++) {
          this.tableData[i].Checked = true
        }
        let ids = []
        this.tableData.forEach((m, n) => {
          ids.push(m.id)
        })
        this.tableEles[this.currentPage] = ids
        this.$emit('selectList', this.tableEles)
      } else {
        // 点击后全选状态为false，将数据中的选择字段全部改为false
        for (var k in this.tableData) {
          this.tableData[k].Checked = false
        }
        this.tableEles[this.currentPage] = []
        this.$emit('selectList', this.tableEles)
      }
    },
    singleCheck (val) {
      if (!this.tableEles[this.currentPage]) {
        this.tableEles[this.currentPage] = []
      }
      let ind = this.tableEles[this.currentPage]
        ? this.tableEles[this.currentPage].indexOf(val.id)
        : -1
      if (this.handleClick === 2) {
        var num = 0
        this.tableEles.forEach((i, j) => {
          num += i.length
        })
        if (num < 2) {
          if (ind > -1) {
            this.tableEles[this.currentPage].splice(ind, 1)
          } else {
            this.tableEles[this.currentPage].push(val.id)
          }
        } else if (num === 2) {
          if (ind > -1) {
            this.tableEles[this.currentPage].splice(ind, 1)
          } else {
            val.Checked = false
          }
        } else {
          val.Checked = false
        }
      } else {
        if (ind > -1) {
          this.tableEles[this.currentPage].splice(ind, 1)
        } else {
          this.tableEles[this.currentPage].push(val.id)
        }
      }
      this.$emit('selectList', this.tableEles)
    },
    handleCurrentChange (val) {
      let o = this.$common.inheritObj(this.$route.query)
      o.page = val
      this.currentPage = val // 在漏洞库详情页面时候，点击后props-page没有传递进俩触发watch
      this.$emit('requestApi', val)
      this.$router.push({
        path: this.$route.currentPath,
        query: o
      })
    },
    getDataDetail (val) {
      var id = ''
      if (this.currentPath === 'LoopholeDatabase' ||
        this.currentPath === 'LoopholeGene') {
        id = val.id
      } else if (this.currentPath === 'LoopholeSoftwareDatabase') {
        id = val.id
      }

      // 跳转
      // 需要改为switch
      if (this.currentPath === 'SoftwareDetectList') { // 软件基因检测列表
        if (val.detect_status === '正在检测') return
        this.$router.push({
          path: 'SoftwareDetectResult',
          query: {
            id: val.id,
            target: val.is_target
          }
        })
      } else if (this.currentPath === 'LoopholeDatabase') { // 漏洞库也跳转到漏洞分析页面
        this.$router.push({
          path: 'LoopholeGeneAnalysisDetail',
          query: {id: id}
        })
      } else if (this.currentPath === 'GeneCompareResult') {
        this.$emit('showImg', val)
      } else if (this.currentPath !== 'SoftwareGeneDetect' &&
        this.currentPath !== 'LoopholeGeneAnalysis' &&
        this.currentPath !== 'GeneAnalysisTool' &&
        this.currentPath !== 'GeneCompareQuene' &&
        this.currentPath !== 'LoopholeGeneAnalysisDetail' &&
        this.currentPath !== 'SoftwareDetectResult' &&
        this.currentPath !== 'TargetGeneFiles' &&
        this.currentPath !== 'LoopholeSoftwareDatabaseDetail') {
        this.$router.push({
          path: this.currentPath + 'Detail',
          query: {id: id}
        })
      }
    },
    sortAct (val) {
      this.$emit('sort')
    }
  },
  mounted () {
    // @ 案例：在基因检测详情页的命中漏洞基因中
    // 非第一页刷新页面页码变成第一页
    // page的prop传递失效
    // 故此处增加currentPage的赋值
    this.currentPage = Number(this.$route.query.page) || 1

    this.tableEles[this.currentPage] = this.tableEles[this.currentPage]
      ? this.tableEles[this.currentPage]
      : []
  }
}
</script>
<style lang="scss">
  .table {
    margin-top: .5rem;
    header {
      height: 40px;
      line-height: 40px;
      text-indent: 1rem;
      margin-bottom: 1px;
      width: calc(100% - 3px);
      position: relative;
      left: 1px;
      border-radius: 4px;
      color: $tableTitleText;
      font-size: 0.9rem;
      background-color: $tableTitleBg;
    }
    .el-table {
      background: transparent;
      tr, th, td {
        // border-radius: 3px
      }
      tr {
        background: transparent;
      }
      th, td {
        padding: 8px 0;
      }
      .el-table__body tr {
        cursor: pointer;
        background-color: $bgColor-opacity!important;
      }
      button {
        border: none;
        box-shadow: 0px 1px 5px #001913;
        margin-bottom: 2px;
      }
      button:hover {
        color: $greenLight;
      }
    }
    .el-pagination {
      text-align: right;
      margin-top: .5rem;
      padding-right: 0;
      .el-pagination__total {
        padding: 0 4px;
        border-radius: 2px;
        color: $tableTitleText;
        background-color: $selectBg;
      }
      .el-pager {
        margin: 0 1px;
        li {
          margin: 0 1px;
          border-radius: 2px;
        }
        li:hover, li.active {
          background: #fff;
        }
      }
      button {
        border-radius: 2px;
      }
    }
  }
</style>
