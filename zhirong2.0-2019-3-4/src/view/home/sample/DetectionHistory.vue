<template>
  <div class="detectionHistory">
    <div class="detectionHistory_container">
      <SearchOptions
        ref="SearchOptions"
        :alltags="alltags"
        :load="loading"
        :currentPage="currentPage"
        path="/DetectionHistory"
        :showGenePcap="true"
        @initList="init"
        @options="optionsAct"/>

      <section class="table-con">
        <el-table
          ref="multipleTable"
          :data="tableData"
          border
          fit
          highlight-current-row
          :cell-style="{borderColor: '#3a537e', 'text-align': 'center'}"
          :header-cell-style="{borderColor: '#3a537e', textAlign: 'center', color: '#000'}"
          style="border: 1px solid #3a537e"
          @select="tableSingleSelect"
          @select-all="tableAllselect"
          @selection-change="handleSelectionChange">

            <el-table-column
              label="标记"
              v-if="$tokenName === 'gtd' || $tokenName === 'zhirong'"
              width="50">
              <template slot-scope="scope">
                <el-popover
                  placement="right"
                  trigger="click"
                  :disabled="$tokenName === 'zhirong'
                    ? true
                    : false">
                  <el-radio-group
                    v-model="scope.row.important_level"
                    @change="important_levelSelect(scope.row.id, scope.row.important_level, scope.$index)">
                    <el-radio :label="0" style="color: #dcdcdc">低级</el-radio>
                    <el-radio :label="1" style="color: orange">中级</el-radio>
                    <el-radio :label="2" style="color: red">高级</el-radio>
                  </el-radio-group>
                  <img
                    slot="reference"
                    class="check-report-icon __handCursor"
                    :style="{'height': scope.row.is_read === 1 ? '1.1rem' : '1rem'}"
                    :src="$img[scope.row.signImg]">
                </el-popover>
              </template>
            </el-table-column>

            <el-table-column label="文件名" width="215">
              <template slot-scope="scope">
                <FileName :name="scope.row.sample_name" :length="20" />
              </template>
            </el-table-column>

            <el-table-column prop="sample_md5" label="MD5" width="215">
              <template slot-scope="scope">
                <FileName :name="scope.row.sample_md5" :length="20" />
              </template>
            </el-table-column>

            <el-table-column
              v-if="$tokenName === 'gtd' || $tokenName === 'zhirong'"
              label="提交时间" width="100">
              <template slot-scope="scope">
                <span>{{$common.dateChange(scope.row.submit_time).split(' ')[0]}}</span><br>
                <span>{{$common.dateChange(scope.row.submit_time).split(' ')[1]}}</span>
              </template>
            </el-table-column>

            <el-table-column
              label="完成时间" width="100">
              <template slot-scope="scope">
                <span>{{$common.dateChange(scope.row.detect_finished_time).split(' ')[0]}}</span><br>
                <span>{{$common.dateChange(scope.row.detect_finished_time).split(' ')[1]}}</span>
              </template>
            </el-table-column>

            <el-table-column
              label="检测结果" width="80">
              <template slot-scope="scope">
                <span>{{$detectionResult(scope.row.is_malicious)}}</span>
              </template>
            </el-table-column>

            <el-table-column
              v-if="$tokenName === 'gtd'"
              label="家族归属"
              width="125">
              <template slot-scope="scope">
                <span
                  class="custom-tag"
                  v-if="scope.row.gene_family">
                  {{scope.row.gene_family}}
                </span>
                <span v-else>无</span>
              </template>
            </el-table-column>

            <el-table-column
              min-width="100"
              prop="sample_label"
              label="标签">
              <template slot-scope="scope">
                <Tags
                  :id="scope.row.id"
                  :md5="scope.row.sample_md5"
                  :exist="scope.row.sample_label"
                  :chooseTags="chooseTags"
                  :alltags="alltags"
                  @initList="init(currentPage)"/>
              </template>
            </el-table-column>

            <el-table-column
              v-if="$tokenName === 'gtd'"
              label="处理"
              width="80">
              <template slot-scope="scope">
                <span
                  v-if="scope.row.process_status === '0'"
                  class="custom-tag"
                  @click="Deal(scope.row.id)">未处理</span>
                <span v-else style="color: #315697; padding: 0px 5px;font-size: 12px; display: inline-block;">已处理</span>
              </template>
            </el-table-column>

            <el-table-column
              v-if="$tokenName === 'gtd'"
              label="深度分析"
              width="80">
              <template slot-scope="scope">
                <span
                  v-if="Number(scope.row.is_detect) !== 2"
                  class="custom-tag"
                  @click="reDynamicDetect(scope.row.id)">深度分析</span>
                <span v-else style="font-size: 12px;">深度分析</span>
              </template>
            </el-table-column>

            <!-- 智戎9800系统新加，勿删 -->
            <el-table-column
              v-if="$tokenName === 'zhirong'"
              label="检测结果状态"
              width="120">
              <template slot-scope="scope">
                <span
                  v-if="Number(scope.row.is_detect) === 3 || Number(scope.row.is_detect) === 4 || Number(scope.row.is_detect) === -1"
                  class="custom-tag"
                  @click="re_dynamic_detect(scope.row)">{{(Number(scope.row.is_detect) === 3 || Number(scope.row.is_detect) === 4) ? '重新检测' : (Number(scope.row.is_detect) === -1 ? '深度分析' : '')}}</span>
                <span style="font-size: 12px;" v-else>{{isDetectDic[scope.row.is_detect]}}</span>
              </template>
            </el-table-column>

            <el-table-column
              label="查看"
              width="50">
              <template slot-scope="scope">
                <img
                class="check-report-icon __handCursor"
                :src="$img.view"
                @click="checkReport(scope.row.sample_md5, scope.row.is_malicious, scope.row.id, scope.row.important_level)">
              </template>
            </el-table-column>

            <el-table-column
              v-if="userClass!== '3'"
              type="selection"
              width="40">
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
          <div class="btn-con" v-if="userClass!== '3'">
            <el-button
            v-if="$tokenName === 'gtd' || $tokenName === 'zhirong'"
            type="primary"
            size="mini"
            @click="chooseAllEles">
              <span v-if="unChooseAllEles">取消</span>
              <span>全选第{{currentPage}}页</span></el-button>
            <el-button
            type="primary"
            size="mini"
            @click="downloadFiles">导出样本</el-button>
            <el-button
            type="primary"
            size="mini"
            @click="downloadListShow">导出列表</el-button>
          </div>
        </div>

      </section>

      <Loading v-show="loading" />

      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%">
        <span>确定进行深度分析？</span>
        <span slot="footer" class="dialog-footer">
          <div class="dialog-footer-inner">
            <el-checkbox v-model="reFirst">不在提示</el-checkbox>
            <span>
              <el-button
                size="mini"
                @click="ensureDeepAnalysis(0)">取 消</el-button>
              <el-button
                size="mini"
                type="primary"
                @click="ensureDeepAnalysis(1)">确 定</el-button>
            </span>
          </div>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      options: {},
      chooseTags: [],
      tableData: [],
      total: 0,
      alltags: [],
      currentPage: 1,
      selectFile: [],
      loading: false,
      tableEles: {},
      unChooseAllEles: false,
      row: 1,
      reFirst: sessionStorage.re_dynamic_detect_first,
      dialogVisible: false,
      deepAnalaysisId: 0,
      isDetectDic: {
        '-1': '未检测',
        '0': '深度分析',
        '1': '深度分析',
        '2': '深度分析',
        '3': '分析异常',
        '4': '分析异常',
        '5': '预分析'
      },
      userClass: localStorage.userClass
    }
  },
  computed: {
    ...mapGetters(['allLable', 'setFileImportLevel'])
  },
  watch: {
    allLable (res) {
      // 接收allLabel
      // 由于Tags组件 也需要使用 所以alltags在这里加载，并不是只在serachOptions
      this.alltags = this.$common.inheritObj(res)
    },
    setFileImportLevel (res) {
      if (res.status === 200) {
        let d = this.$common.inheritObj(this.tableData)
        if (d[this.row].important_level === 2) {
          d[this.row].signImg = 'redfileIsread'
        } else if (d[this.row].important_level === 1) {
          this.$nextTick(() => {
            d[this.row].signImg = 'orangefileIsread'
          })
        } else if (d[this.row].important_level === 0) {
          d[this.row].signImg = 'greenfileIsread'
        }
        this.tableData = d
      }
    }
  },
  methods: {
    // 更改样本重要性
    important_levelSelect (id, val, rowIndex) {
      this.row = rowIndex
      this.$store.dispatch('setFileImportLevel', {
        important_level: Number(val),
        id: id
      })
    },
    optionsAct (data) {
      this.options = data
      // 清空存储的eles
      this.tableEles = {}
      this.unChooseAllEles = false
    },
    pageChange (val) {
      this.currentPage = Number(val)
      this.init(val)
      // options 同步到搜索组件
      // this.$refs.SearchOptions.urlSync(this.options)
    },
    // 关于el-table的func------- start
    // table-tr的选中状态
    toggleSelection (indexs) {
      let _this = this
      if (!indexs.length) _this.$refs.multipleTable.clearSelection()
      indexs.forEach(index => {
        _this.$refs.multipleTable.toggleRowSelection(_this.tableData[index])
      })
    },
    /*
    # tableEles 存储选择的ids
    - 单选
    - 多选
    */
    // 单选触发
    tableSingleSelect (val, row) {
      // 2, 获取选中的id是否存储过
      // - 有删除，无则添加
      // 3, 全选按钮的取消状态
      // - 当元素取消时，隐藏取消
      // - 选中，显示取消

      // 2-1
      let ind = this.tableEles[this.currentPage]
        ? this.tableEles[this.currentPage].indexOf(row.id)
        : -1
      // 2-2
      if (ind > -1) {
        this.tableEles[this.currentPage].splice(ind, 1)
      } else {
        this.tableEles[this.currentPage].push(row.id)
      }

      // 3，取消当页全选
      this.unChooseAllEles = this.tableEles[this.currentPage].length === this.tableData.length
    },
    // 全选触发
    tableAllselect (val) {
      // table的全选触发
      // 1,tableEles存储全部的id
      // 2,全选
      // - 当元素取消时，隐藏取消
      // - 选中，显示取消

      // 1
      let ids = []
      if (val.length) {
        val.forEach((i, j) => {
          ids.push(i.id)
        })
      }
      this.tableEles[this.currentPage] = ids

      // 2，取消当页全选
      this.unChooseAllEles = this.tableEles[this.currentPage].length === this.tableData.length
    },
    // checkbox触发
    handleSelectionChange (val) {
      // **翻页会触发这里**
      // 重新高亮会触发多次
      this.selectFile = val
    },
    // 关于el-table的func------- end
    // 收集的样本id
    collectSelectIds () {
      // tableEles按照页面去存储ids
      // 因为存在：全部选中当页所有数据，和取消当页所有
      // 减少查询比对
      let ids = []
      let eles = this.tableEles
      for (let x in eles) {
        ids = ids.concat(eles[x])
      }
      return ids
    },
    /*
    # 全选本页
    **全选按钮显示取消
      - 单选 =>unChooseAllEles      |
      - 全选 =>unChooseAllEles      | -> 判断存储id.length === tableData.length
      - init=>unChooseAllEles      |
      - optionsAct()=>unChooseAllEles重置
    **存储id
    **控制显示checkBox
    */
    chooseAllEles () {
      /*
      # situation:
      - 0
        * tableData全存
      - 1
        * 0, this.tableEles[this.currentPage] === undefined
        * 0，本页存储的id.length === 0
        * 1，本页存储的id < 全部id的数量, 此时unChooseAllEles === false, 本事件是要全选
        * 2，本页存储的id === 全部id的数量, unChooseAllEles === true, 全取消
      */
      let hasId = [] // 存储的id
      let ind = [] // table的checked的index存储

      let l = this.tableEles[this.currentPage].length === 0
        ? 0
        : (this.tableEles[this.currentPage].length < this.tableData.length ? 1 : 2)
      switch (l) {
        case 0:
          this.tableData.forEach((i, j) => {
            hasId.push(i.id)
            ind.push(j)
          })
          break
        case 1: // unChooseAllEles === false, 全选
          this.tableData.forEach((i, j) => {
            if (this.tableEles[this.currentPage].indexOf(i.id) === -1) { ind.push(j) }
            hasId.push(i.id)
          })
          break
        case 2:
          this.tableData.forEach((i, j) => {
            if (this.tableEles[this.currentPage].indexOf(i.id) === -1) { ind.push(j) }
          })
          break
      }

      this.tableEles[this.currentPage] = hasId
      this.toggleSelection(ind)

      this.unChooseAllEles = !this.unChooseAllEles
    },
    init (page) {
      this.loading = true
      this.currentPage = Number(page) || 1

      // 后去选择的标签
      this.chooseTags = this.options.tags ? JSON.parse(this.options.tags) : ''
      // this.chooseTags.sort()
      let a = this.options
      a.page = page || 1
      a.submit_user = localStorage.userClass === 4 ? localStorage.userName : ''

      this.$api.get('detection_history', a).then((res) => {
        this.loading = false
        if (res) {
          this.total = res.count
          this.tableData = res.results || []

          // 全选标记
          this.tableEles[this.currentPage] = this.tableEles[this.currentPage]
            ? this.tableEles[this.currentPage]
            : []
          this.unChooseAllEles = this.tableEles[this.currentPage].length === this.tableData.length

          // 重要性标记
          for (var i = 0; i < this.tableData.length; i++) {
            // exist 每次搜索的时候，值可能是一样的，这样在组件内就不会触发watch，所以此处加了一个random()以保证没次触发
            this.tableData[i].sample_label += ',' + Math.random()
            if (this.tableData[i].is_read === -1) {
              this.tableData[i].important_level = -1
              this.tableData[i].signImg = 'grayfileUnread'
            } else {
              if (this.tableData[i].important_level === 2) {
                this.tableData[i].signImg = 'redfileIsread'
              } else if (this.tableData[i].important_level === 1) {
                this.tableData[i].signImg = 'orangefileIsread'
              } else if (this.tableData[i].important_level === 0) {
                this.tableData[i].signImg = 'greenfileIsread'
              }
            }
          }

          /*
          @ 更新当前页码
          * 需要在本也数据total有意义后才能生效
          */
          this.currentPage = Number(this.$route.query.pageNo) || 1
        }
      }).then(() => {
        // 疑点：tableData的dom加载，貌似存在异步，在这个then中才起作用
        // 1，选中当页存储的ids的行
        // 2，当存在tableEles，此时用搜索搜索条件查询时候tableData的对应的就不是tableEles的页码数据了
        let thisPageIds = this.collectSelectIds() || []
        let hasId = []
        this.tableData.forEach((i, j) => {
          if (thisPageIds.indexOf(i.id) > -1) {
            hasId.push(j)
          }
        })
        if (this.$tokenName === 'gtd' || this.$tokenName === 'zhirong') {
          this.toggleSelection(hasId)
        }
      }).catch(() => {
        this.init(1)
      })
    },
    Deal (id) {
      this.$api.get('process_status_sign', {id: id, process_status: 1}).then(res => {
        if (res.status === 200) {
          this.init(this.currentPage)
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    },
    /*
    # 没有家族归属，进行深度分析
    1，第一次点击，出现confirm提示
    2，判断checkBox的reFirst
      - sessionStorage存储这个第一次
      - 不存
    */
    deepAnalaysis (id) {
      this.$api.get('re_dynamic_detect', {
        id: id
      }).then(res => {
        let type = ''
        if (res.status === 200) {
          this.init(this.currentPage)
          type = 'success'
        } else {
          type = 'warning'
        }
        this.$message({
          type: type,
          message: res.message
        })
      })
    },
    ensureDeepAnalysis (val) {
      if (val) { // 提交深度分析
        this.deepAnalaysis(this.deepAnalaysisId)
        // 判断checkBox的reFirst
        if (this.reFirst) {
          sessionStorage.setItem('re_dynamic_detect_first', this.reFirst)
        }
      }
      this.dialogVisible = false
    },
    reDynamicDetect (id) {
      if (!this.reFirst) {
        this.dialogVisible = true
        this.deepAnalaysisId = id
      } else {
        this.deepAnalaysis(id)
      }
    },
    // 深度分析----end
    // -------------
    checkReport (md5, malicious, id, importLevel) {
      if (this.$tokenName === 'gtd' || this.$tokenName === 'zhirong') {
        window.open(window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '') + '/#/SampleReport?md5=' + md5 + '&id=' + id + '&importLevel=' + importLevel)
      } else {
        this.$router.push({'path': '/SampleReport', query: {md5: md5, id: id}})
      }
    },
    downloadFiles () {
      // 上传选中的ids
      let ids = []

      if (this.$tokenName === 'gtd' || this.$tokenName === 'zhirong') { // 导出跨页的
        ids = this.collectSelectIds() || []
      } else { // 导出当页的
        this.selectFile.forEach(function (i, j) {
          ids.push(i.id)
        })
      }

      // gtd2019一月需求，下载的文件格式
      // 一个文件时候返回正常数据格式
      // 多个文件时候是文件流，无status
      if (ids.length === 1 ||
          ((this.$tokenName !== 'gtd' &&
              this.$tokenName !== 'zhirong') &&
                ids.length > 0)) {
        this.loading = true
        this.$api.get('sample_download', {
          sample_list: JSON.stringify(ids),
          user: localStorage.userName
        }).then(res => {
          this.loading = false
          if (res.status === 200) {
            res.data.forEach(function (element, index) {
              this.$common.downloadFile(element)
            }.bind(this))
            this.$message({
              message: '文件导出成功',
              type: 'success'
            })
          } else {
            this.$message.error(res.message)
          }
        })
      } else if (ids.length > 1) {
        this.loading = true
        this.$api.blob('sample_download', {
          sample_list: JSON.stringify(ids),
          user: localStorage.userName
        }).then(res => {
          this.loading = false
          let url = window.URL.createObjectURL(new Blob([res]))
          let link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', '多个检测文件.tar.gz')
          document.body.appendChild(link)
          link.click()
        })
      } else {
        this.$message({
          type: 'warning',
          message: '请先选择样本！'
        })
      }
    },
    downloadListShow () {
      if (this.$tokenName === 'gtd' || this.$tokenName === 'zhirong') {
        // 导出跨页的
        let ids = this.collectSelectIds() || []
        // 重新请求接口：根据ids获取新的列表，导出
        if (ids.length) {
          this.$router.push({path: '/ExportExcel', query: {ids: JSON.stringify(ids)}})
        } else {
          this.$message({
            type: 'warning',
            message: '请先选择列表！'
          })
        }
      } else {
        this.downloadList()
      }
    },
    /*
    # 导出列表
    - gtd可以选择跨页数据的id，另外请求接口得到总的列表数据
    - 但是其他项目就不行了：跨页保存的是ids，不包含下面func的字段
      * 所以只下载当页数据
      * ？跨页多选还在
    */
    downloadList () {
      let headerName = ['测试文件名', 'MD5', '完成时间', '检测结果', '标签']
      let datas = []
      let _this = this
      this.selectFile.forEach(function (element, index) {
        datas.push([
          element.sample_name,
          element.sample_md5,
          element.detect_finished_time,
          _this.$detectionResult(element.is_malicious),
          element.sample_label.split(',')
        ])
      })

      // 导出excel
      if (datas.length) {
        this.$exportExcel('列表', datas, headerName)
      } else {
        this.$message({
          type: 'warning',
          message: '请先选择列表！'
        })
      }
    },
    re_dynamic_detect (val) {
      this.$api.get('re_dynamic_detect', {
        id: val.id,
        is_detect: val.is_detect
      }).then((res) => {
        if (res && res.status === 200) {
          this.$message.success(res.message)
        } else {
          this.$message.warning(res.message)
        }
        this.init(this.$route.query.pageNo)
      })
    }
  },
  mounted () {
    // 为了防止sibebar卡顿，使得加载数据在0.5（sidebar运行时间）后执行
    setTimeout(() => {
      // lable数据
      this.$store.dispatch('getAllLable')
    }, 500)
  }
}
</script>
<style scoped>
  .detectionHistory_container {
    width: 85%;
    margin: 0 auto;
    padding-bottom: 1rem;
  }
  .table-con {
    margin-top: 1rem;
  }
  .tags-con .el-tag{
    margin: 0 .7rem .5rem 0;
  }
  .check-report-icon {
    height: 1rem;
  }
  .search-btn-con button {
    margin-top: 1rem;
    width: auto;
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
  .custom-tag {
    display: inline-block;
    height: 20px;
    line-height: 19px;
    padding: 0px 5px;
    color: #fff;
    font-size: 12px;
    cursor: pointer;
    background-color: #315697;
    border-radius: 4px;
  }
  .dialog-footer-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
<style type="text/css" lang="scss">
  .detectionHistory_container {
    .el-dialog__body {
      padding: 10px 20px;
    }
  }
  .el-table__header {
    border-collapse: separate;
  }
</style>
