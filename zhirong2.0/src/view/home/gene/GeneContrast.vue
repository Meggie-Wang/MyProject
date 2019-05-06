<template>
  <div class="GeneContrast">
    <Loading v-if="is_unFinished"></Loading>
    <div class="GeneContrast_container">
      <SearchOptions
        :alltags="alltags"
        :load="loading"
        :currentPage="currentPage"
        path="/GeneContrast"
        :showGenePcap="false"
        @initList="init(1, 0)"
        @options="optionsAct"/>

      <section>
        <div class="sample-choose">
          <el-table
            :data="tableData"
            fit
            max-height="500"
            highlight-current-row
            border
            :cell-style="{borderColor: '#315697', textAlign: 'center'}"
            :header-cell-style="{borderColor: '#315697', textAlign: 'center'}"
            style="border: 1px solid #315697;">
            <el-table-column
              label="测试文件名"
              :resizable="false">
              <template slot-scope="scope">
                <FileName
                :name="scope.row.sample_name"
                :length="20"/>
              </template>
            </el-table-column>
            <el-table-column
              prop="sample_md5"
              label="MD5"
              :resizable="false">
            </el-table-column>
            <el-table-column
              label="完成"
              :resizable="false">
              <template slot-scope="scope">
                <span>{{ $common.dateChange(scope.row.detect_finished_time) }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="create_time"
              label="检测结果"
              width="120"
              :resizable="false">
              <template slot-scope="scope">
                <span>{{$detectionResult(scope.row.is_malicious)}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="标签"
              :resizable="false">
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
              width="40"
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

          <div class="__text-center" v-if="tableData.length" style="margin-top: 1rem">
            <el-button class="loadingMore __handCursor" @click="loadingMoreAct()">
              <span v-if="!loadingMore">
                <span v-if="currentPage < Math.ceil(total / 20)">加载更多</span>
                <span v-if="currentPage >= Math.ceil(total / 20)">没有更多了</span>
              </span>
              <span v-if="loadingMore"><i class="el-icon-loading"></i>加载中</span>
            </el-button>
          </div>

        </div>
      </section>

      <section class="cout-img">
        <!-- analysis_name -->
        <div class="parameterAdjustment_container">
          <div class="parameter-option">
            <div class="option-select">
              <input
                id="option-select-0"
                class="_hide"
                type="radio"
                name="option-select"
                value="0"
                v-model="optionSelect">
              <label
                :class="{
                  bg: Number(optionSelect) === 0,
                  grayBg: Number(optionSelect) !== 0
                }"
                for="option-select-0">自定义聚类比率</label>
              <input
                id="option-select-1"
                class="_hide"
                type="radio"
                name="option-select"
                value="1"
                v-model="optionSelect">
              <label
                :class="{
                  bg: Number(optionSelect) === 1,
                  grayBg: Number(optionSelect) !== 1
                }"
                for="option-select-1">自分类</label>
              <input
                id="option-select-2"
                class="_hide"
                type="radio"
                name="option-select"
                value="2"
                v-model="optionSelect">
              <label
                :class="{
                  bg: Number(optionSelect) === 2,
                  grayBg: Number(optionSelect) !== 2
                }"
                for="option-select-2">自定义分类</label>
            </div>
            <div class="borderColor parameter-option-con">
              <div class="cluster-rate" v-if="Number(optionSelect) === 0">
                <div>
                  <el-slider
                  v-model="clusterRate"
                  :format-tooltip="(val) => {return val / 100}"></el-slider>
                </div>
              </div>
              <div class="parameter-option-auto" v-if="Number(optionSelect) === 1">
                <input
                id="parameter-option-auto"
                type="radio"
                name="classify"
                value="-1"
                v-model="family_num_Act"><label for="parameter-option-auto">自分类(算法自然分类，不强制制定)</label>
              </div>
              <div
                class="parameter-option-custom"
                v-if="Number(optionSelect) === 2"
                style="line-height: 38px;">
                <input
                class="_hide"
                type="radio"
                name="classify"
                value="1"
                v-model="family_num_Act">分
                <input
                type="text"
                step="0.01"
                class="borderColor"
                placeholder="输入分类数量"
                v-model="family_num">类
              </div>
            </div>
          </div>
          <div
          class="_text-center family_num_err"
          v-if="resCondition">{{family_num_err}}</div>
        </div>
        <div style="display: flex;">
          <div class="borderColor gene-clustering-name" style="border: none;">
            <input
            v-model="analysisName"
            @change="analysisNameChange()"
            @blur="inputTst(analysisName)"
            placeholder="请输入本次检测名称，只能含有数字、英文、中文、下划线">
            <span v-if="iptTest">{{iptTestMsg}}</span>
            <span v-else></span>
          </div>
          <div class="GeneContrast-btn-con">
            <button
            class="handCursor"
            :class="Arr.length > 1 && iptTest === false ? 'solid_button': ''"
            :disabled="Arr.length > 1 && iptTest === false ? false : true"
            @click="creatGeneFamily()">
            <i
            class="el-icon-loading"
            v-if="btnLoading0"></i>
            生成聚类关系</button>
          </div>
        </div>
        <!-- chech results -->
        <div class="clusteringResults" id="compare">
          <div
          class="_text-center family_num_err"
          v-if="family_res_err.length !== 0">{{family_res_err}}</div>
          <div class="GeneContrast_header" v-if="clusteringResults">
            <h1>聚类结果预览</h1>
          </div>
          <div
          class="charts"
          :class="{borderColor: clusteringResults}"></div>
        </div>
      </section>
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
      currentPage: 1,
      alltags: [],
      loading: false,
      loadingMore: false,
      allChecked: false,
      Arr: [],
      analysisName: '',
      iptTest: false,
      iptTestMsg: '',
      optionSelect: 1,
      clusterRate: 80,
      family_num_Act: -1,
      family_num: '',
      family_res_err: '',
      clusteringResults: false,
      btnLoading0: false,
      resCondition: false,
      family_num_err: '',
      is_unFinished: true
    }
  },
  computed: {
    ...mapGetters(['allLable'])
  },
  watch: {
    family_num (val) {
      if (val.length) {
        let arr = val.split('')
        arr.forEach((i, j) => {
          if (!/[0-9]/.test(i)) {
            arr.splice(j, 1, 'N')
          }
        })
        this.family_num = arr.join('').replace(/N/g, '')
      }
    },
    allLable (res) {
      this.alltags = this.$common.inheritObj(res)
    },
    analysisName (val) {
      this.inputTst(val)
    },
    /*
    # Arr 存储选择项id
    - 1.数据长度小于30条时，选择长度与数据长度相等且大于0即为全选
    - 2.数据长度大于等于30条时，选择长度等于30条即为全选
    */
    Arr (val) {
      if (val.length === 30 || (val.length === this.tableData.length && val.length > 0)) {
        this.allChecked = true
      } else {
        this.allChecked = false
      }
    },
    // 搜索tab切换
    optionSelect () {
      this.family_num_err = ''
      this.family_res_err = ''
    }
  },
  methods: {
    allCheck () {
      // 点击全选时先将用于存储id的数组和数据中的字段全部置为初始值防止添加重复
      this.Arr = []
      for (var x in this.tableData) {
        this.tableData[x].Checked = false
      }
      // 点击后全选状态为true做数量限制
      if (this.allChecked === true) {
        if (this.tableData.length < 30) {
          for (var i = 0; i < this.tableData.length; i++) {
            this.tableData[i].Checked = true
            let a = this.tableData[i].id
            this.Arr[i] = a
          }
        } else {
          for (var j = 0; j < 30; j++) {
            this.tableData[j].Checked = true
            let a = this.tableData[j].id
            this.Arr[j] = a
          }
        }
      } else {
        // 点击后全选状态为false，将数据中的选择字段全部改为false
        for (var k in this.tableData) {
          this.tableData[k].Checked = false
        }
      }
    },
    singleCheck (i) {
      if (this.Arr.length < 30) {
        if (this.Arr.indexOf(i.id) > -1) {
          // 若所选行id存在于arr数组中则去除
          this.Arr.splice(this.Arr.indexOf(i.id), 1)
        } else {
          // 不存在则加入
          this.Arr.push(i.id)
        }
      } else if (this.Arr.length === 30) {
        if (this.Arr.indexOf(i.id) > -1) {
          this.Arr.splice(this.Arr.indexOf(i.id), 1)
        } else {
          // 如果达到选择上限后续增加均无效
          i.Checked = !i.Checked
        }
      }
    },
    optionsAct (data) {
      this.options = data
    },
    init (page, e) {
      // @ 刷新页面 & 检索
      // => url上pageNo是之前页码
      // => 但是组件上绑定 initlist = init(1, 0) 更新了page = 1
      // @ 加载更多
      // => 更新currentPage -> 更新serachOptions urlSync() page
      // => 本页数据concat
      this.loading = true
      this.options.page = this.currentPage = Number(page) || 1
      // 后去选择的标签
      this.chooseTags = this.options.tags ? JSON.parse(this.options.tags) : ''

      // table数据
      this.$api.get('sample_geneinfo', this.options).then((res) => {
        this.loading = false

        this.family_num_err = ''
        this.family_res_err = ''

        if (res) {
          // this.loadingMore = false
          // 加载数据
          this.total = res.count
          res.results.forEach((i, j) => {
            i.Checked = false
          })
          if (e === 0) {
            this.Arr = []
            this.allChecked = false
            this.tableData = res.results
          } else {
            // tags exit 可能和上一次一样，导致无法触发watch
            res.results.forEach((i, j) => { i.sample_label += ',' + Math.random() })
            this.tableData = this.tableData.concat(res.results)
          }

          this.is_unFinished = false
        }
      })
    },
    loadingMoreAct () {
      if (this.currentPage < Math.ceil(this.total / 20)) {
        this.currentPage = this.currentPage + 1
        this.init(this.currentPage)
      }
    },
    inputTst (val) {
      var reg = /^[A-Za-z0-9_\u4e00-\u9fa5]{4,16}$/
      if (val === '') {
        this.iptTest = false
      } else {
        if (!reg.test(val)) {
          this.iptTest = true
          this.iptTestMsg = '请检查输入内容，只能含有数字、英文、中文、下划线，长度4-16位'
        } else {
          this.iptTest = false
        }
      }
    },
    analysisNameChange () {
      let str = this.analysisName
      this.analysisName = this.$common.inputTest(str, 1)
    },
    // 锚点跳转
    goAnchor () {
      this.$el.querySelector('#compare').scrollIntoView()
    },
    creatGeneFamily () {
      let conditions = []
      // 清楚聚类分析不够的情况
      this.family_res_err = ''
      // hide clusteringResults
      this.clusteringResults = false
      /*
        @ 聚类家族数据
          中心link
          直系数据
      */
      let linkData = []
      let mainData = []
      let legendData = []
      let categories = []
      /*
        @ 生成聚类家族
          获取样本id组合
      */
      conditions.push(Boolean(this.Arr.length))
      let optionSelect = Number(this.optionSelect)
      let familyNum = -1
      let noisePoint = -1
      let clusterRate = -1
      switch (optionSelect) {
        case 0:
          clusterRate = this.clusterRate === 0 ? -1 : this.clusterRate / 100
          familyNum = -1
          noisePoint = -1
          conditions.push(familyNum <= this.Arr.length)
          break
        case 1:
          clusterRate = -1
          familyNum = -1
          noisePoint = -1
          conditions.push(familyNum <= this.Arr.length && this.Arr.length > 1)
          break
        case 2:
          clusterRate = -1
          familyNum = this.family_num || -1
          noisePoint = this.noise_point || -1
          conditions.push(familyNum <= this.Arr.length && familyNum > 1)
      }
      if (conditions[0]) {
        if (conditions[1]) {
          this.btnLoading0 = true
          this.myChart.clear()
          this.$api.get('cluster_analysis', {
            user_name: localStorage.userName,
            id_list: JSON.stringify(this.Arr),
            family_num: familyNum,
            noise_point: noisePoint,
            cluster_rate: clusterRate,
            analysis_name: this.analysisName === '' ? '-1' : this.analysisName
          }).then(res => {
            if (res.status && res.status === 201) {
              this.family_res_err = res.message
            }
            if (res) {
              this.btnLoading0 = false
              this.resCondition = false
              this.family_num_err = ''
              let response = res.ret.data
              for (let i in response) {
                let cateName = i.length >= 32 ? i.slice(0, 32) + '...' : i
                legendData.push(cateName)
                categories.push({name: cateName})
                let familyNumLinkFlag = ''
                response[i].forEach((m, n) => {
                  if (familyNum === -1 && clusterRate === -1) {
                    linkData.push({
                      'source': i,
                      'target': m
                    })
                  } else {
                    linkData.push({
                      'source': familyNumLinkFlag || m,
                      'target': m
                    })
                    familyNumLinkFlag = m
                  }
                  mainData.push({
                    'name': m,
                    'symbolSize': 15,
                    'category': cateName,
                    'draggable': 'true'
                  })
                })
              }
              this.draw(legendData, categories, linkData, mainData)
              this.geneExtractData = {
                legendData: legendData,
                categories: categories,
                linkData: linkData,
                mainData: mainData
              }
              this.showTable = false
              this.goAnchor()
            }
          }).catch(() => {
            this.resCondition = false
            this.family_num_err = ''
            this.btnLoading0 = false
          })
        } else {
          this.resCondition = true
          this.myChart.clear()
          this.family_num_err = '分类数量需小于等于选择样本数量, 并且大于1'
        }
      } else {
        this.resCondition = true
        this.myChart.clear()
        this.family_num_err = '需要选择样本'
      }
    },
    draw (legendData, categories, linkData, mainData) {
      this.clusteringResults = true
      this.myChart.clear()

      let option = {
        legend: [{
          type: 'scroll',
          tooltip: {
            show: false
          },
          selectedMode: 'false',
          orient: 'vertical',
          left: 20,
          data: legendData
        }],
        animationDuration: 3000,
        animationEasingUpdate: 'quinticInOut',
        series: [{
          type: 'graph',
          layout: 'force',
          height: 100,
          force: {
            repulsion: 100
          },
          data: mainData,
          links: linkData,
          categories: categories,
          focusNodeAdjacency: true,
          roam: true,
          label: {
            normal: {
              show: false,
              position: 'bottom'
            }
          },
          lineStyle: {
            normal: {
              color: 'source',
              curveness: 0,
              type: 'solid'
            }
          }
        }]
      }
      this.myChart.setOption(option, false)
      window.addEventListener('resize', function () {
        this.myChart.resize()
      }.bind(this))
    }
  },
  mounted () {
    // 为了防止sibebar卡顿，使得加载数据在0.5（sidebar运行时间）后执行
    setTimeout(() => {
      // lable数据
      this.$store.dispatch('getAllLable')
      this.myChart = this.$echarts.init(document.querySelector('.charts'))
    }, 500)
  }
}
</script>
<style scoped="scoped" lang="scss">
  @import '@/assets/css/depth-analysis.scss';
  $color: #3a537e;
  .GeneContrast_container {
    width: 80%;
    margin: 0 auto;
    padding-bottom: 1rem;
    .operate-con {
      margin: 1rem 0;
      box-sizing: border-box;
      padding: 1rem 1rem 2rem;
      border: 1px solid #d8d8d8;
      .el-select {
        flex: 1;
        width: calc(20% - 2px);
        margin-right: 5px;
      }
      > div {
        margin-top: 1rem;
      }
      .md5-search {
        border: 1px solid #3a537e;
        border-radius: 5px;
        width: auto;
      }
      .el-tag{
        margin: 0 .7rem .5rem 0;
      }
      h3 {
        border-bottom: 1px solid #3a537e;
        margin-bottom: .7rem;
      }
      .unthreaten-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        img{
          cursor: pointer;
          width: 16px;
          height: 9px;
        }
      }
      .no-tag {color: #999;}
      .add-tag {
        position: relative;
        top: 2px;
        padding: 0px 1rem;
        height: 32px;
        line-height: 32px;
        p {
          display: inline-block;
          height: 32px;
          width: 32px;
          cursor: pointer;
        }
        img {
          position: relative;
          top: -2px;
          height: .7rem;
        }
        input {
          position: relative;
          top: -1px;
          font-size: 0.8rem;
          padding: 0 7px;
          width: 210px;
        }
      }
    }
    .special-model {
      .special-model-con {
        width: 80%;
        margin: 0 auto;
        .module-title {
          margin: 1rem 0;
          font-size: 1rem;
          border-bottom: 1px solid $color;
        }
        header > .el-input {
          height: 40px;
          line-height: 40px;
          box-sizing: border-box;
          padding-left: 7px;
          border: 1px solid $color;
        }
        .operate-con {position: relative;}
        .build-con {
          position: absolute;
          right: 0;
          top: 0;
          button {
            margin-top: 15px;
            background-color: $color;
            height: 30px;
            box-sizing: border-box;
            border: 1px solid $color;
            padding: 0 20px;
            color: #fff;
            font-size: 0.8rem;
            border-radius: 5px;
          }
        }
      }
      .selectIcon {
        position: relative;
        top: 3px;
        display: inline-block;
        width: 1rem;
        height: 1rem;
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center;
        border: 1px solid $color;
      }
      .loadingMore {
        margin-top: 15px;
        background-color: transparent;
        height: 30px;
        box-sizing: border-box;
        border: 1px solid $color;
        padding: 0 20px;
        color: #333;
        font-size: 0.8rem;
        border-radius: 5px;
      }
    }
    .cout-img {
      .gene-clustering-name {
        margin: 1rem 1rem 0 0;
        width: calc(100% - 10rem);
        input {
          border: 1px solid $color;
          width: calc(100% - 30px);
          height: 2.5rem;
          line-height: 2.5rem;
          padding: 0 15px;
        }
        span {
          font-size: .8rem;
          color: red;
          padding-left: 15px;
        }
      }
      .parameterAdjustment_container {
        .parameter-option{
          padding-top: 1rem;
          font-size: .8rem;
          .cluster-rate {
            div{
              margin-left: 5px;
              width: 50%;
            }
          }
          input[type=radio]{margin-right: .5rem;}
          input[type=number] {
            margin: 0 .5rem;
            text-align: center;
            padding: 0.5rem 0;
            font-size: 0.8rem;
          }
          input[type=number] {-moz-appearance:textfield;}
          .option-select{
            font-size: 0;
            label{
              font-size: 0.8rem;
              display: inline-block;
              height: 1.5rem;
              line-height: 1.5rem;
              box-sizing: border-box;
              margin: 0;
              padding: 0;
              padding-left: 10px;
              padding-right: 10px;
              border: 1px solid $borderColor;
              border-bottom: none;
              border-right: none;
            }
            label:last-child {
              border-right: 1px solid $borderColor;
            }
          }
          .parameter-option-con {
            box-sizing: border-box;
            padding: 1rem .5rem;
          }
          .parameter-option-auto {
            margin: .5rem 0;
          }
          .parameter-option-custom > label{margin-left: 0rem;}
        }
        .family_num_err {
          font-size: .8rem;
          color:red;
          margin-top: .5rem;
        }
      }
      .GeneContrast-btn-con{
        margin-top: 1rem;
        text-align: center;
        button {
          background: #ccc;
          color: #fff;
          border: none;
          border-radius: 5px;
          outline: none;
          padding: 0.5rem 0.8rem;
        }
        .solid_button {
          background: $color;
          color: #fff;
          border: none;
          border-radius: 5px;
          outline: none;
          padding: .5rem .8rem;
        }
      }
      ._hide {
        display: none;
      }
      .bg {
        background-color: $color;
        color: #fff;
      }
      .borderColor {
        border: 1px solid $color;
      }
      .clusteringResults {
        margin: 2% auto;
        .charts{
          height: 20rem;
        }
        .family_num_err {
          font-size: .8rem;
          color:red;
          margin-top: .5rem;
          text-align: center;
        }
      }
    }
    table tr td {
      box-sizing: border-box;
      border: 1px solid $color;
      vertical-align: middle;
      text-align: center;
    }
    .grayBg {
      background-color: #ccc;
      color: #fff;
    }
  }
</style>
<style>
  .GeneContrast_container .tags-con .el-tag {
    margin: 0 .3rem .3rem 0;
  }
  .GeneContrast_container .tags-con {
    margin: .3rem 0;
  }
  .handCursor {
    cursor: pointer;
    margin-top: .2rem;
  }
  .el-slider__button-wrapper {
    z-index: 90;
  }
</style>
