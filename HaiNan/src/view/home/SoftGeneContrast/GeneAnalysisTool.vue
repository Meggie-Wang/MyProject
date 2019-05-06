<template>
  <div class="GeneAnalysisTool">
    <router-intro content=""/>

    <div class="searchOption">
      <Select
        :optData="selectOpt"
        @initList="init"
        path="/GeneAnalysisTool"/>
      <Search
        :searchPlaceholder="searchPlaceholder"
        @initList="init"
        path="/GeneAnalysisTool"/>
    </div>
    <Table
      :tableTitle=tableTitle
      :tableData=tableData
      :total="total"
      :page="currentPage"
      ref="table"
      :handleClick="tabNumber"
      @selectList="selectList"
      @requestApi="init"/>
    <el-tabs
      v-model="activeName"
      tab-position="left"
      @tab-click="handleClick">
      <el-tab-pane
        label="聚类分析"
        name="first">
        <div>
          <div class="parameterAdjustment_container">
            <div class="parameter-option">
              <div class="option-select">
                <input
                  id="option-select-0"
                  class="_hide"
                  type="radio"
                  name="option-select"
                  value="0"
                  v-model="optionSelect"><label
                  :class="{
                    bg: Number(optionSelect) === 0,
                    grayBg: Number(optionSelect) !== 0
                  }"
                  for="option-select-0">自定义聚类比率</label><input
                  id="option-select-1"
                  class="_hide"
                  type="radio"
                  name="option-select"
                  value="1"
                  v-model="optionSelect"><label
                  :class="{
                    bg: Number(optionSelect) === 1,
                    grayBg: Number(optionSelect) !== 1
                  }"
                  for="option-select-1">自分类</label><input
                  id="option-select-2"
                  class="_hide"
                  type="radio"
                  name="option-select"
                  value="2"
                  v-model="optionSelect"><label
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
                  oninput="value=value.replace(/[^\d]/g,'')"
                  v-model="family_num">类
                </div>
              </div>
            </div>
            <!-- <div
            class="_text-center family_num_err"
            v-if="resCondition">{{family_res_err}}</div> -->
          </div>
          <div style="display: flex;justify-content: center;">
            <!-- <div class="borderColor gene-clustering-name" style="border: none;">
              <el-input
                v-model="analysisName"
                @change="analysisNameChange()"
                @blur="inputTst(analysisName)"
                placeholder="请输入本次检测名称，只能含有数字、英文、中文、下划线"
                ></el-input>
              <span v-if="iptTest">{{iptTestMsg}}</span>
              <span v-else></span>
            </div> -->
            <div class="GeneContrast-btn-con">
              <el-button
                @click="output()"
                :disabled="Arr.length > 1 ? false : true"
                style="border: none;box-shadow: box-shadow: 0px 1px 5px #001913;"
                ><i
                class="el-icon-loading"
                v-if="btnLoading0"></i>
                生成聚类关系
              </el-button>
            </div>
          </div>
          <!-- chech results -->
          <div class="clusteringResults" id="compare" >
            <div
            class="_text-center family_num_err"
            v-if="family_res_err.length !== 0">{{family_res_err}}</div>
            <div class="GeneContrast_header" v-if="clusteringResults">
              <h1>聚类结果预览</h1>
            </div>
            <div class="contrastImg" v-if="clusteringResults">
              <v-echart className="contrast" :options="contrastOption" />
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane
        label="基因对比"
        name="second">
        <div style="padding: .5rem 0;">
          <p>选择两个样本，基于软件基因技术，对漏洞样本进行基因对比。</p>
          <p>对比检测历史中查看正在检测的进程，和历史检测事件。</p>
        </div>
        <el-button
          @click="geneCompare()"
          :disabled="(Arr.length === 2 ? false : true) || isWaiting"
          style="border: none;box-shadow: box-shadow: 0px 1px 5px #001913;">生成基因对比图</el-button>
        <el-button
          @click="LookCompareQuene()"
          style="border: none;box-shadow: box-shadow: 0px 1px 5px #001913;">查看对比检测历史</el-button>
          <span
            v-for="(i, j) in compareList"
            :key="j"
            style="padding: 2px 5px;background-color: rgba(255, 255, 255, .3);margin: 0 5px;"
            @click="compareImgShow(i)">{{i}}</span>
        <div><img :src="compareImg" alt=""></div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default{
  name: 'GeneAnalysisTool',
  data () {
    return {
      searchPlaceholder: '文件MD5',
      searchVal: '',
      selectOpt: {
        select_2: {
          placeholder: '关联漏洞',
          option: [
            { value: '1', label: '是' },
            { value: '0', label: '否' }
          ]
        }
      },
      tableTitle: [
        {
          prop: 'fileMd5',
          label: '文件MD5'
        },
        {
          prop: 'fileType',
          label: '类型'
        },
        {
          prop: 'hasRelateBugGene',
          label: '关联漏洞'
        },
        {
          prop: 'detect_result',
          label: '含基因文件',
          width: '170'
        },
        {
          prop: 'inStoreTime',
          label: '入库时间'
        },
        {
          prop: 'belongSoftName',
          label: '所属软件名'
        }
      ],
      tableData: [],
      total: 0,
      currentPage: 1,
      Arr: [],
      contrastOption: {},
      optionSelect: 1,
      resCondition: false,
      iptTest: false,
      iptTestMsg: '',
      clusterRate: 80,
      family_num_Act: -1,
      family_num: '',
      family_res_err: '',
      analysisName: '',
      btnLoading0: false,
      clusteringResults: false,
      activeName: 'first',
      tabNumber: 1,
      compareImg: '',
      compareList: [],
      compareData: [],
      isWaiting: false
    }
  },
  watch: {
    analysisName (val) {
      this.inputTst(val)
    },
    optionSelect (val) {
      this.family_res_err = ''
    }
  },
  methods: {
    init (val) {
      let obj = {
        startTime: this.$route.query.startTime || '',
        endTime: this.$route.query.endTime || '',
        // hasRelateEnterFunc: this.$route.query.select_1Val || '',
        hasRelateBugGeneFile: this.$route.query.select_2Val || '',
        // is_gene: '1',
        searchName: this.$route.query.searchName || '',
        page: val || 1
      }
      this.$api.get('file_geneinfo', obj).then(res => {
        this.tableData = res.results.map(i => {
          i.detect_result = i.detect_result === -1 ? '否' : (i.detect_result === 1 ? '是' : '正在检测')
          if (this.Arr.indexOf(i.id) > -1) {
            i.Checked = true
          } else {
            i.Checked = false
          }
          i.hasRelateBugGene = i.hasRelateBugGene ? '是' : '否'
          return i
        })
        this.total = res.count || 0
        // 定义currentPage传入table组件中，目的是为了在数据点击选项或搜索后若数据未发生变化，即total未发生改变时触发watch跳到第一页
        this.currentPage = val
      })
    },
    selectList (val) {
      let ids = []
      for (let x in val) {
        ids = ids.concat(val[x])
      }
      this.Arr = ids
    },
    output () {
      var ids = this.Arr.join(',')
      this.family_res_err = ''
      // hide clusteringResults
      this.clusteringResults = false
      let conditions = []
      // 清楚聚类分析不够的情况
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
          this.$api.get('cluster_analysis', {
            user_name: window.localStorage.userName,
            id_list: ids,
            family_num: familyNum,
            noise_point: noisePoint,
            cluster_rate: clusterRate,
            analysis_name: 'aaaa'
          }).then((res) => {
            if (res.status && res.status === 201) {
              this.family_res_err = res.message
            }
            if (res && res.status === 200) {
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
            }
          })
        } else {
          this.resCondition = true
          this.family_res_err = '分类数量需小于等于选择样本数量, 并且大于1'
        }
      } else {
        this.resCondition = true
        this.family_res_err = '需要选择样本'
      }
    },
    draw (legendData, categories, linkData, mainData) {
      this.clusteringResults = true
      this.showContrastImg = true
      this.contrastOption = {
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
    handleClick () {
      if (this.activeName === 'first') {
        this.tabNumber = 1
      } else if (this.activeName === 'second') {
        this.tabNumber = 2
      }
    },
    geneCompare () {
      this.isWaiting = true
      this.$api.get('differAnalysis', {
        analysis_user: window.localStorage.userName,
        file_list: JSON.stringify(this.Arr.sort())
      }).then((res) => {
        if (res) {
          this.$message({
            message: res.message,
            type: 'success'
          })
        }
        this.isWaiting = false
      })
    },
    compareImgShow (val) {
      this.$api.get('image_show', {
        image_path: this.compareData[val][0]
      }).then((resp) => {
      })
    },
    LookCompareQuene () {
      this.$router.push({
        path: '/GeneCompareQuene',
        query: {submitUser: window.localStorage.userName}
      })
    }
  },
  mounted () {
    this.init(Number(this.$route.query.page))
  }
}
</script>
<style scoped lang="scss">
  .searchOption {
    display: flex;
  }
  .borderColor {
    border: 1px solid $greenLight;
  }
  ._hide {
    display: none;
  }
  .bg {
    background-color: $greenLight;
    color: #fff;
  }
  .grayBg {
    background-color: $geneToolSelectBg;
    color: #fff;
  }
  .option-select {
    font-size: 0;
  }
  .option-select label {
    font-size: 0.8rem;
    display: inline-block;
    height: 1.5rem;
    line-height: 1.5rem;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    padding-left: 10px;
    padding-right: 10px;
    border: 1px solid $greenLight;
    border-bottom: none;
    border-right: none;
  }
  .option-select label:last-child {
    border-right: 1px solid $greenLight;
  }
  .parameter-option .parameter-option-con {
    box-sizing: border-box;
    padding: 1rem .5rem;
  }
  .parameter-option .cluster-rate div {
    margin-left: 5px;
    width: 50%;
  }
  .parameter-option .parameter-option-auto {
    height: 38px;
    display: flex;
    align-items: center;
  }
  .gene-clustering-name {
    margin: 1rem 1rem 0 0;
    width: calc(100% - 10rem);
  }
  .GeneContrast-btn-con {
    margin-top: 1rem;
    text-align: center;
  }
  .contrastImg {
    background-color: $bgColor-opacity;
    height: 320px;
    margin-top: 1rem;
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
  .family_num_err {
    font-size: .8rem;
    color: red;
    margin-top: .5rem;
  }
</style>
<style lang="scss">
  .el-tabs__nav {
    width: 100%;
  }
  .el-tabs__item {
    width: 50%;
    text-align: center;
    font-size: 1rem;
    color: #fff;
  }
  .el-tabs__item:hover {
    color: #fff;
  }
  .el-tabs__active-bar {
    background-color: $bgColor;
  }
  .el-tabs__item.is-active {
    width: 100%;
    background-color: $tableTitleBg!important;
    color: $bgColor!important;
  }
</style>
