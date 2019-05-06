<template>
  <div class="GeneModel">
    <div class="gene-model-con">
      <section class="upload-model">
        <div class="__text-right">
        <label for="uploadAct" class="__handCursor __btn __btn-big __btn-primary">导入家族模型</label>
        <form id="form">
          <input
          type="file"
          id="uploadAct"
          directory
          multiple="multiple"
          hidden
          @change="uploadBtn($event)"/>
        </form>
        </div>
        <div>
        <el-progress
        v-if="progress !== 0 && progress !== 100"
        :percentage="progress"
        color="#315697"></el-progress>
        </div>
      </section>
      <section>
        <el-table
          :data="tableData3"
          fit
          highlight-current-row
          border
          @selection-change="selsChange"
          :cell-style="{borderColor: '#315697', textAlign: 'center'}"
          :header-cell-style="{borderColor: '#315697', textAlign: 'center'}"
          style="border: 1px solid #315697;">
          <el-table-column
            prop="model_name"
            label="模型名称">
            <template slot-scope="scope">
              <el-popover
                placement="right-start"
                :title="scope.row.model_name + ':'"
                width="300"
                trigger="hover"
                :content="scope.row.model_introduce || '无'">
                <span slot="reference">{{scope.row.model_name}}</span>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            label="创建时间">
            <template slot-scope="scope">{{ $common.dateChange(scope.row.create_time) }}</template>
          </el-table-column>
          <el-table-column
            label="评分">
            <template slot-scope="scope">
              <el-rate
              disabled
              text-color="#ff9900"
              v-model="scope.row.score"></el-rate>
            </template>
          </el-table-column>
          <el-table-column
            v-if="$store.state.editAuth && $tokenName !== 'guoan'"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <span
              class="__handCursor"
              @click="delTree(scope.row.id)">删除</span>
            </template>
          </el-table-column>
          <el-table-column
          type="selection"
          v-if="$store.state.editAuth && $tokenName === 'cncert'">
          </el-table-column>
        </el-table>
      </section>

      <div class="btn-container" v-if="tableData3.length">
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
        <div class="btn-con" v-if="$store.state.editAuth && $tokenName === 'cncert'">
          <el-button
          type="primary"
          size="mini"
          @click="downloadFiles">导出模型</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// 删除操作：都有
// 导出模型只有cncert的admin有
export default {
  name: 'GeneModel',
  data () {
    return {
      tableData3: [],
      total: 0,
      progress: 0,
      currentPage: 1,
      sels: [],
      check: []
    }
  },
  watch: {
    currentPage (page) {
      this.$router.push({
        path: '/GeneModel',
        query: {
          pageNo: page || 1
        }
      })
    }
  },
  methods: {
    // 获取当前选中行
    selsChange (sels) {
      this.sels = sels
      this.check = []
      for (var i = 0; i < this.sels.length; i++) {
        this.check[i] = this.sels[i].id
      }
      console.log(this.check)
    },
    uploadBtn (e) {
      let files = e.target.files
      console.log(files)
      for (let i in files) {
        if (!isNaN(i)) {
          if (files[i].size <= 5242880) {
            let fd = new FormData()
            fd.append('file', files[i])
            fd.append('token', localStorage[localStorage.tokenName + '_token'])
            fd.append('user_id', localStorage.session_id)
            // fd.append('submit_user', localStorage.userName)
            let config = {
              onUploadProgress: progressEvent => {
                let complete = (progressEvent.loaded / progressEvent.total * 100 | 0)
                this.progress = Number(complete)
              }
            }
            this.$api.upload('model_import', fd, config).then((res) => {
              document.getElementById('form').reset()
              if (res.status === 200) {
                this.$message({
                  message: res.message,
                  type: 'success'
                })
                this.init(this.currentPage)
              } else {
                this.$message({
                  message: res.message,
                  type: 'warning'
                })
              }
            })
          } else {
            this.$message({
              message: '文件需要小于5M!',
              type: 'warning'
            })
          }
        }
      }
    },
    init (val) {
      this.$api.get('tree_list', {
        page: val || 1
      }).then(res => {
        if (res) {
          res.results.forEach((i, j) => {
            i.score = Number(i.score) / 2
          })
          this.tableData3 = res.results
          this.total = res.count
          /*
          @ 更新当前页码
          * 需要在本也数据total有意义后才能生效
          */
          this.currentPage = Number(this.$route.query.pageNo)
        }
      })
    },
    pageChange (val) {
      this.currentPage = val
      this.init(val)
    },
    delTree (val) {
      this.$confirm('确定删除此决策树吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.get('tree_delete', {
          id: val
        }).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.init(this.currentPage)
        })
      }).catch(() => {})
    },
    // 导出模型
    downloadFiles () {
      let token = localStorage[localStorage.tokenName + '_token']
      if (this.check.length) {
        for (var i = 0; i < this.check.length; i++) {
          let a = this.check[i]
          this.$api.get('download_analysis_model', {
            id: a,
            username: window.localStorage.userName
          }).then(res => {
            this.$common.downloadFile('api/download_analysis_model/?id=' + a + '&username=' + window.localStorage.userName + '&token=' + token)
          })
        }
      } else {
        this.$message({
          type: 'warning',
          message: '请先选择模型！'
        })
      }
    }
  },
  mounted () {
    this.init(this.$route.query.pageNo)
  }
}
</script>
<style scoped="scoped" lang="scss">
  .GeneModel{
    .gene-model-con {
      margin: 0 auto;
      height: 100%;
      width: 80%;
      .upload-model{
        padding: 1rem 0;
      }
      .btn-container {
        position: relative;
        margin-top: 1rem;
        text-align: end;
      }
      .btn-con {
        position: absolute;
        right: 0;
        top: 0;
      }
    }
  }
</style>
