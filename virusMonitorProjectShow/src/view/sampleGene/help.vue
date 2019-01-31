<template>
	<div class="sample_container">
    <section class="search-option">
      <!-- :prefix-icon="errMd5 ? 'el-icon-error' : ''" -->
      <el-input
        v-model="md5"
        placeholder="搜索MD5"
        @keyup.enter.native="type = 'start'; init(currentPage = 1)">
        <el-button
          slot="append"
          :style="{backgroundColor: errMd5 ? 'red' : '#0E6A55'}"
          @click="type = 'start'; init(currentPage = 1)">
            <img src="../../../static/img/search.png">
        </el-button>
      </el-input>
    </section>

    <section class="table-con">
      <el-table
        :data="tableData"
        border
        fit
        highlight-current-row
        :cell-style="{borderColor: 'rgb(20, 143, 115)', textAlign: 'center'}"
        :header-cell-style="{borderColor: 'rgb(20, 143, 115)', textAlign: 'center', color: '#000'}"
        style="border: 1px solid rgb(20, 143, 115)">
        <el-table-column prop="sample_md5" label="MD5"></el-table-column>
        <el-table-column prop="sample_time" label="时间" width="180"></el-table-column>
        <el-table-column prop="sample_gene" label="含基因" width="90"></el-table-column>
        <el-table-column label="查看" width="60">
          <template slot-scope="scope">
            <img
            class="check-report-icon"
            src="../../../static/img/view.png"
            @click="checkReport(scope.row.id)">
          </template>
        </el-table-column>
        <el-table-column
          width="90"
          :resizable="false">
          <template slot="header" slot-scope="header">操作</template>
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.checked" @change="singleClick(scope.row.checked)"></el-checkbox>
          </template>
        </el-table-column>
      </el-table>
      </el-table>
    </section>

    <!--
      |-- 不显示
      |--|-- tabledata 空
      |--|-- tabledata.length !== 1 即搜索项目时候，显示一条
    -->
    <section class="page-con">
      <div>
        <el-pagination
          v-if="tableData.length && tableData.length !== 1"
          class="__text-left"
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="20"
          :pager-count="5"
          @current-change="pageChange"
          :current-page.sync="currentPage">
        </el-pagination>
      </div>
      <div style="font-size: 0;">
        <el-button
          v-if="!chooseAllTag"
          type="primary"
          size="mini"
          @click="chooseAll">全选</el-button>
        <el-button
          v-else
          type="primary"
          size="mini"
          @click="chooseAll">取消全选</el-button>
        <el-button
          type="primary"
          size="mini"
          @click="downloadFiles">导出样本</el-button>
      </div>
    </section>

  </div>
</template>
<script>
import api from '../../api/ipApi'
import { Loading } from 'element-ui'
export default {
  data() {
    return {
      md5: '',
      errMd5: false,
      tableData: [],
      total: 0,
      currentPage: 1,
      chooseAllTag: false,
      type: 'start',
      page: 1,
      mountain: 100
    }
  },
  watch: {
    md5 (val) {
      if (val.length <= 32 && val.length >= 0) {
        this.errMd5 = false
        val.split('').forEach((i, j) => {
          if (!/[a-fA-F0-9]/.test(i)) {
            this.errMd5 = true
          }
        })
      } else {
        this.errMd5 = true
      }
    }
  },
  methods: {
    pageChange (val) {
      this.currentPage = Number(val)
      let mountain = this.mountain

      if (val <= mountain) {
        this.type = 'start'
        this.page = Number(val)
      } else if (val > mountain && val <= Math.ceil(this.total / 20) - mountain) {
        this.type = ''
        this.page = Number(val)
      } else if (val > Math.ceil(this.total / 20) - mountain) {
        this.type = 'end'
        this.page = mountain - (Math.ceil(this.total / 20) - Number(val))
      }
      this.init(this.page)
    },
    init (val) {
      if (!this.errMd5 || this.md5.length === 0) {
        Loading.service()
        this.tableData = []
        let urlOption = {
          md5: this.md5,
          type: this.type,
          page: val || 1
        }
        // 同步url
        this.$router.push({path: '/help', query: urlOption})
        // 请求数据
        api.getSample(urlOption).then(res => {
          Loading.service().close()
          // this.total = res.data.count

          let d = res.data.results
          let _this = this
          d.forEach((i, j) => {
            _this.tableData.push({
              id: i.id,
              sample_md5: i.sample_md5,
              sample_gene: i.have_gene ? '有' : '无',
              sample_time: i.create_time.split('T')[0] + ' ' + i.create_time.split('T')[1],
              checked: false
            })
          })
        }).catch((err) => {
          Loading.service().close()
          alert(err)
        })
      }
    },
    checkReport (id) {
      this.$router.push({path: '/GeneDetail', query: {id: id}})
    },
    chooseAll () {
      let _this = this
      this.tableData.forEach(function (i, j) {
        if (!_this.chooseAllTag) {
          i.checked = true
        } else {
          i.checked = false
        }
      })
      this.chooseAllTag = !this.chooseAllTag
    },
    singleClick (bol) {
      if (!bol) {
        this.chooseAllTag = false
      } else {
        let flag = 0
        this.tableData.forEach(function (i, j) {
          if (i.checked) {
            flag++
          }
        })
        if (flag === this.tableData.length) {
          this.chooseAllTag = true
        }
      }
    },
    downloadFiles () {
      // 上传选中的ids
      let ids = []
      this.tableData.forEach(function (i, j) {
        if (i.checked) {
          ids.push(i.id)
        }
      })
      if (ids.length) {
        api.downloadSample(ids).then(res => {
          if (res.status === 200) {
            let d = res.data.data
            console.log(d)
            d.forEach(function (element, index) {
              console.log(element)
              try {
                let elemIF = document.createElement('iframe')
                elemIF.src = api.requestUrl + element
                elemIF.style.display = 'none'
                document.body.appendChild(elemIF)
              } catch (e) {
                alert('下载异常!')
              }
            })
          }
        })
      } else {
        this.$message({
          type: 'warning',
          message: '请先选择样本！'
        })
      }
    }
  },
  mounted () {
    // 同步url参数
    // this.md5 = this.$route.query.md5 || ''
    this.type = this.$route.query.type || 'start'

    api.getSampleCount().then(res => {
      this.total = Number(res.data.sample_count)
      // 判断type 当end时候，页码需要在mountan之内
      // start和‘’ 页码正常
      if (this.type === 'end') {
        this.currentPage = Math.ceil(this.total / 20) - 100 + (Number(this.$route.query.page) || 1)
        this.page = Number(this.$route.query.page) || 1
      } else {
        this.currentPage = this.page = Number(this.$route.query.page) || 1
      }
      this.init(this.page)
    })
  }
}
</script>
<style scoped>
  .sample_container {
    width: 80%;
    margin: 0 auto;
    text-align: center;
    font-size: 30px;
  }
  .search-option {
    display: flex;
    width: 65%;
    margin: 1% auto;
  }
  .check-report-icon {
    position: relative;
    top: 3px;
    height: 1rem;
    cursor: pointer;
  }
  .page-con {
    margin: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
<style>
  .sample_container .el-input__inner{
    border-top-left-radius: 40px;
    border-bottom-left-radius: 40px;
    border-right-width: 0;
  }
  .sample_container .el-input .el-input__prefix {
    top: 1px;
    left: -25px;
  }
  .sample_container .el-input-group__append {
    font-size: 0;
    border-width: 0;
    background-color: transparent;
  }
  .sample_container .el-input-group__append .el-button {
    position: relative;
    top: 0px;
    -webkit-top: 2px;
    padding: calc(20px - .5rem) 30px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    border-top-right-radius: 40px;
    border-bottom-right-radius: 40px;
    border: 0px solid red;
    font-size: 0;
  }
  .sample_container .el-input .el-input__icon {
    color: red;
  }
  .sample_container .el-input-group__append .el-button img {
    height: 1rem;
  }
  .sample_container .table-con table tr:last-child td {
    border-bottom-width: 0; 
  }
  .sample_container .page-con .el-pager .active,
  .sample_container .page-con .el-button{
    border-color: #0E6A55!important;
    background-color: #0E6A55!important;
  }
</style>
