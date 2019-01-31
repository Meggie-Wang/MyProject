<template>
  <div class="GeneHeatmap">
    <Loading v-if="is_unFinished"></Loading>
    <div class="GeneHeatmap_container">
      <SearchOptions
        :alltags="alltags"
        :load="loading"
        :currentPage="currentPage"
        path="/GeneHeatmap"
        :showGenePcap="false"
        @initList="init(1, 0)"
        @options="optionsAct"/>

      <section>
        <!-- 对比选择 -->
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
        <div style="display: flex;">
          <div class="borderColor gene-clustering-name">
            <input
            v-model="analysisName"
            @change="analysisNameChange()"
            @blur="inputTst(analysisName)"
            placeholder="请输入本次检测名称，只能含有数字、英文、中文、下划线，长度4-16位">
            <span v-if="iptTest">{{iptTestMsg}}</span>
            <span v-else></span>
          </div>
          <!-- contrast Btn -->
          <div class="GeneHeatmap-btn-con _text-right">
            <button
              class="handCursor"
              :class="Arr.length > 1 && iptTest === false ? 'solid_button': ''"
              :disabled="Arr.length > 1 && iptTest === false ? false : true"
              @click="detectionAct(1)">
            <i
            class="el-icon-loading"
            v-if="btnLoading1"></i>
            基因对比分析热力图</button>
            <p>
              <span>热力图谱样本数量需要大于等于2个小于等于30个</span>
            </p>
          </div>
        </div>

        <div class="parameterAdjustment" v-if="coutImg">
          <div
          class="GeneHeatmap_header"
          :class="{_hide: !showRes}"
          >
            <h1 id="compare">基因对比分析参数调整</h1>
          </div>
          <div class="">

            <!-- test echarts heat map -->
            <div class="test-echart-con">
              <Vechart :options="testOptions" className="test-heatmap" />
            </div>
            <p class="annotate heatmap-annotate" v-if="myChartLegendItem.length">
              <span v-if="!showTricolor">热力图说明：表示两两样本之间基因的相似性，颜色越深，表示相似性越高；颜色越浅表示相似性越低</span>
            </p>
            <ul class="myChart-legend">
              <li
              class="myChart-legend-item"
              v-for="(i, j) in myChartLegendItem"
              :key="j"
              :style="{borderColor: clinetColorThis}">
              {{i.label + ' : '}}
              <FileName :name="i.value" :length="32" />
              </li>
            </ul>
          </div>
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
      btnLoading1: false,
      showRes: false,
      loadingMore: false,
      allChecked: false,
      showTable: true,
      analysisName: '',
      iptTest: false,
      iptTestMsg: '',
      clinetColorThis: '',
      Arr: [],
      testOptions: {},
      myChartLegendItem: [],
      coutImg: false,
      is_unFinished: true
    }
  },
  computed: {
    ...mapGetters(['allLable'])
  },
  watch: {
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
    }
  },
  methods: {
    allCheck () {
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
            this.tableData = this.tableData.concat(res.results)
          }
          // tags exit 可能和上一次一样，导致无法触发watch
          this.tableData.forEach((i, j) => { i.sample_label += ',' + Math.random() })

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
    // 锚点跳转
    goAnchor () {
      this.$el.querySelector('#compare').scrollIntoView()
    },
    // analysisNameChange
    analysisNameChange () {
      let str = this.analysisName
      this.analysisName = this.$common.inputTest(str, 1)
    },
    detectionAct (num) {
      // 热力图
      if (this.Arr.length > 1 && num === 1) {
        this.btnLoading1 = true
        this.showTricolor = false
        this.coutImg = true
        // 热力图检测
        this.$api.get('tricolor', {
          user_name: localStorage.userName,
          id_list: JSON.stringify(this.Arr),
          hot_pic: '1',
          analysis_name: this.analysisName === '' ? '-1' : this.analysisName
        }).then(res => {
          this.btnLoading1 = false
          this.showRes = true
          this.showTable = false
          this.drawHchart(res)
          this.goAnchor()
        }).catch(() => {
          this.btnLoading1 = false
        })
      }
    },
    drawHchart (res) {
      // 1 show legend, iframe
      // document.querySelector('iframe').style.display = 'block'
      document.querySelector('.myChart-legend').style.display = 'block'
      // document.querySelector('.heatmap-annotate').style.display = 'block'

      // 2, use res
      // 2.1 x,y axle length
      let nameLength = res.ret.name.length

      // 3 config iframe style
      // let iframeCon = document.querySelector('iframe')
      let hchartsItemHeight = 20
      // let iframeConHeight = 120 + hchartsItemHeight * nameLength + 'px'
      // 3.1 set ifame height
      // iframeCon.style.height = iframeConHeight

      // 4, config hchart data
      let datas = []
      for (let i = 0; i < nameLength; i++) {
        for (let j = 0; j < nameLength; j++) {
          let m = String(res.ret.data[i][j]).length > 5 ? res.ret.data[i][j].toFixed(3) : res.ret.data[i][j]
          datas.push([i, j, m])
        }
      }

      // 4.1, serises data
      let data = datas.map(function (item) {
        return [item[1], item[0], item[2]]
      })
      let names = res.ret.name
      let optionName = []
      this.myChartLegendItem = []
      names.forEach((i, j) => {
        this.myChartLegendItem.push({
          label: j,
          value: i
        })
        optionName.push(j)
      })

      document.querySelector('.test-echart-con').style.height = 120 + hchartsItemHeight * nameLength + 'px'
      this.drawEchart(data, optionName, 120 + hchartsItemHeight * nameLength)

      // 5, init iframe
      // window.document.querySelector('iframe').contentWindow.initAct(optionName, data, iframeConHeight, this.clinetColorThis)
    },
    drawEchart (data, names, iframeConHeight) {
      this.testOptions = {
        tooltip: {
          position: 'top',
          formatter: function (res) {
            return '<b>X: ' + res.data[0] + '</b><b>, Y: ' + res.data[1] + '</b><b>, Rate: ' + (res.data[2] * 100).toFixed(2) + '%' + '</b>'
          }
        },
        animation: false,
        grid: {
          height: iframeConHeight - 25 + 'px',
          width: 'calc(100% - 25px)',
          y: '0',
          x: '25'
        },
        xAxis: {
          type: 'category',
          data: names,
          splitArea: {
            show: true
          }
        },
        yAxis: {
          type: 'category',
          data: names,
          splitArea: {
            show: true
          }
        },
        visualMap: {
          show: false,
          min: 0,
          max: 1,
          calculable: true,
          orient: 'horizontal',
          left: 'center',
          bottom: '15%',
          inRange: {
            color: ['#ffffff', this.clinetColorThis]
          }
        },
        series: [{
          name: '热力图分析',
          type: 'heatmap',
          data: data,
          label: {
            normal: {
              show: false
            }
          },
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      }
    }
  },
  mounted () {
    // 为了防止sibebar卡顿，使得加载数据在0.5（sidebar运行时间）后执行
    setTimeout(() => {
      // lable数据
      this.$store.dispatch('getAllLable')
      this.clinetColorThis = '#3a537e'
    }, 500)
  }
}
</script>
<style scoped="scoped" lang="scss">
  @import '@/assets/css/depth-analysis.scss';
  $color: #3a537e;
  .GeneHeatmap_container {
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
    .fileName {
      margin-top: 1rem;
      /*display: flex;*/
      input {
        width: 80%;
        height: 38px;
        line-height: 40px;
        border: 1px solid $color;
        border-radius: 4px;
        padding-right: 30px;
        padding-left: 15px;
        margin-right: .5rem;
      }
    }
    table tr td {
      box-sizing: border-box;
      border: 1px solid $color;
      vertical-align: middle;
      text-align: center;
    }
    .cout-img .gene-clustering-name {
      width: calc(100% - 4rem);
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
    .GeneHeatmap-btn-con {
      margin: 1rem 0;
      text-align: center;
      button {
        background: #ccc;
        color: #fff;
        border: none;
        border-radius: 5px;
        outline: none;
        padding: 0.5rem 0.8rem;
      }
      p{
        margin-top: .5rem;
        color: #999;
        font-size: .8rem;
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
    .GeneHeatmap_header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 1%;
      color: $color;
      margin-bottom: 2rem;
      border-bottom: 2px solid $color;
      i {
        width: 2rem;
        height: 1.2rem;
        background-position: center center;
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
    }
    .gene-clustering-name {
      margin-top: 1rem;
    }
    .parameterAdjustment {
      margin-top: 2%;
      button {
        font-size: .8rem;
        padding: 0.5rem 0.8rem;
      }
      .myChart-legend{
        margin-top: .5rem;
        li {
          display: inline-block;
          margin-bottom: .5rem;
          box-sizing: border-box;
          padding: 0.3rem 1rem;
          width: 49%;
          text-align: left;
          color: #454545;
          font-size: .8rem;
          border-width: 1px;
          border-style: solid;
          border-radius: 4px;
          border-color: $color
        }
        li:nth-child(2n){
          margin-left: 2%;
        }
      }
    }
  }
</style>
<style>
  .GeneHeatmap_container .tags-con .el-tag {
    margin: 0 .3rem .3rem 0;
  }
  .GeneHeatmap_container .tags-con {
    margin: .3rem 0;
  }
  .handCursor {
    cursor: pointer;
  }
  .annotate{
    font-size: .8rem;
    color: #999;
    margin-top: .5rem;
  }
</style>
