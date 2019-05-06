<template>
  <div class="software-report-detail">

    <div class="software-report-detail-con">

      <div class="report-method">
        <h4 class="report-li-title">测试方法说明</h4>

        <p class="report-method-intro">
          国家互联网响应中为促进、拓展新业务，加大对恶意代码安全厂商的汇聚力度，使用软件技术，开展杀毒引擎benchmark测评。利用基因分析技术对恶意代码的同源性和一致性进行检测，生成涵盖不同家族、不同类型等属性的benchmark样本测试集，进而向各类杀毒引擎提供标准的性能测试服务。
        </p>
        <div class="report-method-list">

          <div class="report-method-list-li">
            <p class="report-method-list-li-title">测试对象</p>
            <figure>
              <label>测试对象名称：</label>
              <span>{{evaluation_name}}</span>
            </figure>
            <figure>
              <label>测试对象版本：</label>
              <span>{{evaluation_version}}</span>
            </figure>
            <figure>
              <label>测试对象链接：</label>
              <span>{{evaluation_url}}</span>
            </figure>
          </div>
          <div class="report-method-list-li">
            <p class="report-method-list-li-title">样本库生成</p>
            <figure>
              <label>恶意样本数量：</label>
              <span>{{sampledata_virus_nums}}</span>
            </figure>
            <!-- <figure>
              <label>安全样本数量：</label>
              <span>{{sampledata_norm_nums}}</span>
            </figure> -->
          </div>
          <div class="report-method-list-li">
            <p class="report-method-list-li-title">联系方式</p>
            <figure>
              <label>联系人单位：</label>
              <span>{{user_info_company}}</span>
            </figure>
            <figure>
              <label>联系人姓名：</label>
              <span>{{user_info_name}}</span>
            </figure>
            <figure>
              <label>联系人邮箱：</label>
              <span>{{user_info_email}}</span>
            </figure>
          </div>

        </div>
      </div>

      <div class="report-result">

        <h4 class="report-li-title">测试结果</h4>

        <figure>
          <label>测评时间：</label>
          <span>{{testDate}}</span>
        </figure>
        <figure>
          <label>查杀率：</label>
          <span>
            <span v-if="editAuth">{{killRate}}</span>
            <input
            v-else
            type="tel"
            name="killRate"
            max="100"
            min="0"
            v-model="killRate"
            placeholder="请输入查杀率">%
          </span>
        </figure>
        <!-- <figure>
          <label>误杀率：</label>
          <span>
            <span v-if="editAuth">{{falseRate}}</span>
            <input
            v-else
            type="number"
            name="falseRate"
            max="100"
            min="0"
            v-model="falseRate"
            placeholder="请输入查杀率">%
          </span>
        </figure> -->

      </div>

      <div class="report-detail">

        <h4 class="report-li-title">测评详情</h4>

        <div class="el-collapse-con">
          <el-collapse v-model="activeNames">

            <el-collapse-item
            v-for="(i, j) in collapseData"
            :key="j"
            :title="i.title"
            :name="j">
              <template slot="title">
                <p>{{i.title}}</p>
              </template>
              <div class="table-con">
                <header>样本库详情</header>
                <table>
                  <tr>
                    <th>样本生成时间</th>
                    <th>恶意样本数量</th>
                    <!-- <th>安全样本数量</th> -->
                    <th>包含基因数量</th>
                  </tr>
                  <tr>
                    <td>{{i.table.time}}</td>
                    <td>{{i.table.threat}}</td>
                    <!-- <td>{{i.table.safe}}</td> -->
                    <td>{{i.table.gene}}</td>
                  </tr>
                  <tr>
                    <td colspan="4">
                      <br>
                      <div class="__row __text-center">
                        <div class="__col-50" style="height: 250px;">
                          <Vechart
                          :className="'echart' + j + '0'"
                          :options="i.charts.chart1"
                          :winResize="winResize" />
                        </div>
                        <div
                          class="__col-50"
                          style="height: 250px;"
                          v-if="i.charts.chart2">
                          <Vechart
                          :className="'echart' + j + '1'"
                          :options="i.charts.chart2"
                          :winResize="winResize" />
                        </div>
                      </div>
                      <br>
                    </td>
                  </tr>
                </table>
              </div>

              <div class="tab-con platform-state">
                <header>查杀结果</header>
                <!-- <el-tabs value="first">
                  <el-tab-pane label="恶意样本检测详情" name="first"> -->
                    <br>
                    <table>
                      <tr>
                        <th width="50%">样本名</th>
                        <th>查杀状态</th>
                      </tr>
                      <tr
                      v-for="(m, n) in i.list.threat"
                      :key="n">
                        <td>{{m.sample_name}}</td>
                        <td>
                          <!-- <ul class="select-ul" @click="collapseData[j].list.threat[n].Checked = !collapseData[j].list.threat[n].Checked">
                            <li v-if="m.kill_status === ''" style="color: #999;">点击选择处理结果</li>
                            <li v-if="m.kill_status === '1'" style="color: #F56C6C;">病毒</li>
                            <li v-if="m.kill_status === '2'" style="color: #E6A23C;">未识别</li>
                            <li v-if="collapseData[j].list.threat[n].Checked === true" class="select-li" @click="m.kill_status=''">点击选择处理结果</li>
                            <li v-if="collapseData[j].list.threat[n].Checked === true" class="select-li" @click="m.kill_status='1'">病毒</li>
                            <li v-if="collapseData[j].list.threat[n].Checked === true" class="select-li" @click="m.kill_status='2'" style="border-bottom: 1px solid $color">未识别</li>
                          </ul> -->
                          <select
                          v-model="m.kill_status"
                          :disabled="editAuth"
                          :style="{color: Number(m.kill_status) === 2 ? '#F56C6C' : (m.kill_status === '' ? '#999' : '#E6A23C')}">
                            <option value="">点击选择处理结果</option>
                            <option value="2">病毒</option>
                            <option value="1">未识别</option>
                          </select>
                        </td>
                      </tr>
                    </table>
                  <!-- </el-tab-pane>
                  <el-tab-pane label="安全样本检测详情" name="second">
                    <table>
                      <tr>
                        <th width="50%">样本名</th>
                        <th>查杀状态</th>
                      </tr>
                      <tr
                      v-for="(m, n) in i.list.safe"
                      :key="n">
                        <td>{{m.sample_name}}</td>
                        <td>
                          <select
                          v-model="m.kill_status"
                          :disabled="editAuth"
                          :style="{color: m.kill_status === '安全' ? '#67C23A' : (m.kill_status === '' ? '#999' : '#909399')}">
                            <option value="">点击选择处理结果</option>
                            <option value="安全">安全</option>
                            <option value="误杀">误杀</option>
                          </select>
                        </td>
                      </tr>
                      <tr v-if="!i.list.safe.length">
                        <td colspan="2" style="height: 3rem; color: #909399">暂无数据</td>
                      </tr>
                    </table>
                  </el-tab-pane>
                </el-tabs> -->
              </div>

            </el-collapse-item>

          </el-collapse>
        </div>
      </div>

    </div>

    <div
    class="save-con"
    v-if="!this.$route.query.done">
      <button @click="save">提交处理</button>
    </div>

    <Loading v-if="loading"/>
  </div>
</template>
<script type="text/javascript">
export default {
  name: 'SoftwareReportDetail',
  data () {
    return {
      evaluation_name: '',
      evaluation_version: '',
      evaluation_url: '',
      sampledata_virus_nums: '',
      sampledata_norm_nums: '',
      user_info_company: '',
      user_info_name: '',
      user_info_email: '',
      editAuth: 0,
      winResize: 0,
      activeNames: [],
      testDate: '',
      killRate: 0,
      falseRate: 0,
      collapseData: [],
      sampledata_list: '',
      evalutation_description: [],
      loading: false
    }
  },
  watch: {
    killRate (val) {
      if (val <= 100 && val >= 0) {
        this.killRate = val
      } else {
        this.killRate = 0
      }
    },
    falseRate (val) {
      if (val <= 100 && val >= 0) {
        this.falseRate = val
      } else {
        this.falseRate = 0
      }
    }
  },
  methods: {
    handleChange (val) {
      console.log(val)
    },
    init () {
      let sampleOption = (data) => {
        let r = []
        let d = JSON.parse(JSON.stringify(data))
        for (let i in d) {
          r.push({
            name: i,
            value: d[i]
          })
        }
        return {
          color: this.chartColor,
          title: {
            text: '恶意样本类型分布',
            textStyle: {
              color: '#333',
              fontSize: 16
            },
            left: 'center',
            bottom: '0'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
          },
          series: [{
            name: '',
            type: 'pie',
            radius: '60%',
            center: ['50%', '50%'],
            data: r,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }]
        }
      }
      let linearColor = {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
          offset: 0,
          color: '#0986e8'
        },
        {
          offset: 1,
          color: '#4cd8f4'
        }]
      }
      let geneOption = (val) => {
        return {
          backgroundColor: '',
          title: {
            text: '基因覆盖率',
            textStyle: {
              color: '#333',
              fontSize: 16
            },
            left: 'center',
            bottom: '0'
          },
          series: [{ // 最外层
            type: 'pie',
            radius: ['60%', '60%'],
            silent: true,
            data: [{
              value: 1,
              labelLine: {
                normal: {
                  show: false
                }
              },
              itemStyle: {
                normal: {
                  color: '#050f58',
                  borderColor: '#162abb',
                  borderWidth: 2
                }
              }
            }]
          },
          { // 第二层线
            type: 'pie',
            radius: ['45%', '45%'],
            silent: true,
            data: [{
              value: 1,
              labelLine: {
                normal: {
                  show: false
                }
              },
              itemStyle: {
                normal: {
                  color: '#050f58',
                  borderColor: '#162abb',
                  borderWidth: 2
                }
              }
            }]
          },
          { // 虚线
            type: 'pie',
            radius: ['35%', '35%'],
            silent: true,
            data: [{
              value: 1,
              labelLine: {
                normal: {
                  show: false
                }
              },
              itemStyle: {
                normal: {
                  color: '#1ebef5',
                  borderColor: '#1ebef5',
                  borderWidth: 2,
                  borderType: 'dashed',
                  barBorderRadius: 5
                }
              }
            }]
          },
          { // 文字
            name: '占比',
            type: 'pie',
            radius: ['52%', '52%'],
            hoverAnimation: false,
            data: [{
              value: val, // 显示数据
              show: false,
              label: {
                normal: {
                  formatter: '{d}%',
                  position: 'center',
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'normal',
                    color: '#3dd4de'
                  }
                }
              },
              itemStyle: {
                normal: {
                  color: linearColor,
                  borderWidth: 10,
                  borderColor: linearColor
                }
              }
            },
            {
              value: 100 - val,
              show: false,
              itemStyle: {
                normal: {
                  barBorderRadius: 300,
                  color: 'rgba(10,9,86,0)',
                  // 未完成的圆环的颜色
                  label: {
                    show: false
                  },
                  labelLine: {
                    show: false
                  }
                }
              }
            }]
          }]
        }
      }

      // 数据
      this.loading = true
      this.$api.get('evalutation_result', {
        id: this.$route.query.id
      }).then(res => {
        this.loading = false
        // 基本信息
        let d = res.data
        this.evaluation_name = d.evalutation.name
        this.evaluation_version = d.evalutation.version
        this.evaluation_url = d.evalutation.url
        this.sampledata_virus_nums = d.sampledata.virus_nums
        this.sampledata_norm_nums = d.sampledata.norm_nums
        this.sampledata_list = d.sampledata.sampledata_list
        this.user_info_company = d.user_info.company
        this.user_info_name = d.user_info.name
        this.user_info_email = d.user_info.email

        // 测试结果
        this.testDate = d.result.evalutation_time
        this.killRate = d.result.kill_rate || '0'
        this.falseRate = d.result.mistake_rate || '0'

        // 测评详情
        this.evalutation_description = d.evalutation_description
        let s = d.evalutation_description
        // let ksv = ['1', '2']
        // let ksn = ['安全', '误杀']
        if (s.length) {
          s.forEach((i, j) => {
            // i.description.virus_sample.forEach((m, n) => {
            //   m.kill_status = ksv[Math.floor(Math.random() * 2)]
            // })
            // i.description.norm_sample.forEach((m, n) => {
            //   m.kill_status = ksn[Math.floor(Math.random() * 2)]
            // })
            let c = {
              title: '样本库' + (j + 1) + '：' + i.create_time,
              table: {
                time: i.create_time,
                threat: i.virus_sample_nums,
                safe: i.norm_sample_nums,
                gene: i.gene_nums
              },
              charts: {
                chart1: sampleOption(i.threaten_rate),
                chart2: i.gene_rate ? geneOption((i.gene_rate * 100).toFixed(0)) : 0
              },
              list: {
                threat: i.description.virus_sample,
                safe: i.description.norm_sample
              }
            }
            this.collapseData.push(c)
            // for (var p = 0; p < this.collapseData[0].list.threat.length; p++) {
            //   if (Math.random() * 2 > 1) {
            //     this.collapseData[0].list.threat[p].kill_status = '2'
            //   } else {
            //     this.collapseData[0].list.threat[p].kill_status = '1'
            //   }
            // }
          })
        }

        // collapseData 标签展开
        for (let i in this.collapseData) {
          this.activeNames.push(Number(i))
        }
      })
    },
    save () {
      let list = []
      this.collapseData.forEach((i, j) => {
        let threat = i.list.threat
        let safe = i.list.safe
        threat.forEach((m, n) => {
          list.push({
            id: m.id,
            kill_status: m.kill_status
          })
        })
        safe.forEach((x, y) => {
          list.push({
            id: x.id,
            kill_status: x.kill_status
          })
        })
      })
      this.$api.post('deal_application', {
        id: this.$route.query.id,
        data: JSON.stringify({
          result: {
            evalutation_time: this.testDate,
            kill_rate: this.killRate,
            mistake_rate: this.falseRate
          },
          sampledata_list: this.sampledata_list,
          evalutation: {
            name: this.evaluation_name,
            version: this.evaluation_version,
            url: this.evaluation_url
          },
          user_info: {
            name: this.user_info_name,
            email: this.user_info_email,
            company: this.user_info_company
          },
          evalutation_description: this.evalutation_description,
          description_list: list
        })
      }).then(res => {
        // 提示操作
        if (res.status === 200) {
          this.$message({
            type: 'success',
            message: res.message
          })
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
        if (res.data.status !== 0) {
          this.$router.push({path: '/SoftwareReport'})
        }
      })
    }
  },
  created () {
    // 由于不知道 collapse 子集数量，需要根据数据遍历
    // 又，echarts的挂载需要获取dom
    // collapse在没有默认activeNames情况下是display:none
    // 所以，需要在created钩子下，打开collapse
    this.init()
    // 获取更改权限
    if (this.$route.query.done) {
      this.editAuth = 'disabled'
    } else {
      this.editAuth = false
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.winResize = window.innerHeight + '/' + window.innerWidth
    })
  }
}
</script>
<style scoped="scoped" lang="scss">
$color: #315697;
.software-report-detail {
  .software-report-detail-con {
    width: 80%;
    margin: 0 auto 20px;
    > div {
      margin-top: 20px;
      font-size: .9rem;
    }
    .report-li-title {
      font-weight: bold;
      color: $color;
      border-bottom: 1px solid $color;
      font-size: 1rem;
      line-height: 2rem;
    }
    .report-method-intro {
      text-indent: 2em;
    }
    .report-method-list {
      border: 1px solid $color;
      box-sizing: border-box;
      margin-top: 15px;
      padding: 15px;
      .report-method-list-li-title {
        font-weight: bold;
        color: $color;
        font-size: 1rem;
        line-height: 1.8rem;
        border-bottom: 1px solid $color;
      }
    }
    figure{
      display: inline-block;
      margin-right: 1rem;
      margin-bottom: .5rem;
      box-sizing: border-box;
      padding: 5px 15px;
      label {
        color: $color;
        font-weight: bold;
      }
    }
    .report-result {
      figure{
        display: block;
        margin: 0;
        label {
          display: inline-block;
          width: 100px;
          text-align: right;
        }
        input {
          text-align: center;
          background: transparent;
          border: 1px solid $color;
        }
      }
    }
    .report-detail {
      .report-li-title {
        border: none;
      }
      .el-collapse-con {
        box-sizing: border-box;
        padding: 15px;
        border: 1px solid $color;
        .table-con {
          margin-top: 15px;
          header {
            color: $color;
            font-weight: bold;
          }
        }
        .tab-con {
          margin-top: 15px;
          header {
            line-height: 2rem;
            color: $color;
            font-weight: bold;
            border-bottom: 1px solid $color;
          }
          .select-ul {
            height: 100%;
            width: 100%;
            cursor: pointer;
            >li {
              height: 40px;
              line-height: 40px;
              font-weight: bold;
            }
            .select-li {
              display: block;
              border-left: 1px solid $color;
              border-right: 1px solid $color;
              font-size: 13px;
            }
            li:nth-of-type(2):hover {
              background-color: #1E90FF;
              color: white;
            }
            li:nth-of-type(3):hover {
              background-color: #1E90FF;
              color: white;
            }
            li:nth-of-type(4):hover {
              background-color: #1E90FF;
              color: white;
            }
          }
          select {
            height: 40px;
            text-align-last: center;
            background: transparent;
            font-weight: bold;
            box-sizing: border-box;
            padding-left: 10px;
            padding-right: 10px;
            padding: 0 2%;
            text-align: center;
            text-align-last: center;
            option {
              color: #333;
            }
          }
        }
      }
    }
    table {
      width: 100%;
      th {
        color: $color;
        font-weight: bold;
      }
      tr {
        th, td {
          border: 1px solid $color;
          text-align: center;
          height: 40px;
        }
      }
    }
  }
}
.save-con {
  position: fixed;
  bottom: 20px;
  right: 40px;
  button {
    border: none;
    background: $color;
    color: #fff;
    padding: 5px 15px;
    border-radius: 5px;
  }
}
</style>
<style type="text/css">
  .software-report-detail-con .el-collapse-item__header {
    height: 35px;
    line-height: 35px;
    font-weight: normal;
    font-size: .9rem;
  }
  .software-report-detail-con .el-collapse-item__arrow {
    height: 35px;
    line-height: 35px;
  }
  .software-report-detail-con .el-select {
    width: 100%;
    border-width: 0;
  }
  .software-report-detail-con .el-input__inner {text-align: center;}
</style>
