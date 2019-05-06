<template>
  <div class="status-con">
    <section class="status-left">
      <figure class="line-con">
        <header>近七日漏洞录入数据</header>
        <v-echart className="line" :options="lineOption" />
      </figure>
      <figure>
        <header>近七日漏洞数据分析</header>
        <v-echart className="bar1" :options="bar1Option" />
      </figure>
      <figure>
        <header>攻击类型分析</header>
        <v-echart className="pie" :options="pieOption" />
      </figure>
    </section>

    <section class="status-center">
      <figure>
        <header>漏洞类型分析</header>
        <v-echart
          className="radar"
          :options="radarOption"
          :legendName="legendName"/>
      </figure>
      <footer>
        <ul>
          <li
            v-for="(i, j) in radarData"
            :key="j"
            @click="legendNameAct(i.name, j)">
            <span :style="{'background-color': i.show ? radarColor[j] : '#999'}">{{i.value}}</span>
            <span>{{i.name}}</span>
          </li>
        </ul>
      </footer>
    </section>

    <section class="status-right">
      <figure>
        <header>近七日漏洞软件及基因数据</header>
        <v-echart className="bar2" :options="bar2Option" />
      </figure>
      <figure>
        <header>近期漏洞热词</header>
        <v-echart className="words" :options="wordsOption" />
      </figure>
      <figure>
        <header>今日录入漏洞</header>
        <el-carousel
          indicator-position="none"
          :interval="5000"
          arrow="never"
          @change="change">
          <el-carousel-item v-for="i in total" :key="i">
            <ul>
              <li v-for="(item, index) in example2" :key="index">
                <div>
                  <p>
                    <span>{{ item.cve_number}}</span>
                    <span>{{ $common.dateChange(item.create_date) }}</span>
                  </p>
                  <p>{{ item.cve_name }}</p>
                </div>
              </li>
            </ul>
          </el-carousel-item>
        </el-carousel>
      </figure>
    </section>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Status',
  data () {
    return {
      lineOption: {},
      bar1Option: {},
      pieOption: {},
      radarOption: {},
      radarData: [
        {value: 0, name: '已分析', show: true},
        {value: 0, name: '未分析', show: true},
        {value: 0, name: '漏洞基因', show: true}
      ],
      radarColor: ['#e2df02', '#02a5e2', '#199a8c'],
      legendName: '',
      bar2Option: {},
      wordsOption: {},
      colors: {
        'xyAxis': '#004941',
        'xyAxisLabel': '#ffffff',
        'yAxisSplitLine': 'rgba(255, 255, 255, .5)',
        'defaultColor': '#01af9c',
        'colorPlate': ['#01af9c', '#017a6d', '#005c52', '#019383', '#66dcbc', '#006358'],
        'wordColor': '#04dfc7'
      },
      // 今日录入漏洞
      bugList: [],
      total: 1,
      example: [],
      example2: []
    }
  },
  computed: {
    ...mapGetters(['cveTrend', 'analysisTrend', 'cveStyleAttack', 'softGeneTrend', 'wordCloud', 'indexCveresult', 'radarRes'])
  },
  watch: {
    cveTrend (val) {
      val.create_time = this.$common.dateFormat(val.create_time)
      this.lineAct(val)
    },
    analysisTrend (val) {
      val.create_time = this.$common.dateFormat(val.create_time)
      this.bar1Act('bar1Option', val)
    },
    cveStyleAttack (val) {
      this.pieAct(val)
    },
    softGeneTrend (val) {
      val.create_time = this.$common.dateFormat(val.create_time)
      this.bar1Act('bar2Option', val)
    },
    wordCloud (val) {
      this.wordsAct(val)
    },
    indexCveresult (val) {
      this.getBugs(val)
    },
    radarRes (val) {
      if (val.status && val.status === 200) {
        this.radarAct(val)
      }
    }
  },
  methods: {
    lineAct (cveTrend) {
      this.lineOption = {
        color: this.colors.defaultColor,
        xAxis: {
          type: 'category',
          data: cveTrend.create_time,
          axisLine: {
            lineStyle: {
              color: this.colors.xyAxis,
              width: 2
            }
          },
          axisLabel: {
            color: this.colors.xyAxisLabel
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: this.colors.xyAxis,
              width: 2
            }
          },
          axisLabel: {
            color: this.colors.xyAxisLabel
          },
          splitLine: {
            lineStyle: {
              color: this.colors.yAxisSplitLine,
              type: 'dashed'
            }
          }
        },
        grid: {
          top: '10%',
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        tooltip: {
          show: true,
          trigger: 'axis'
        },
        series: [{
          showSymbol: false,
          lineStyle: {
            color: this.colors.defaultColor,
            width: 4
          },
          data: cveTrend.trend_amount,
          type: 'line'
        }]
      }
    },
    bar1Act (optionName, data) {
      let s = []
      switch (optionName) {
        case 'bar1Option':
          s = [
            {
              name: '漏洞数',
              type: 'bar',
              stack: '总量',
              barMaxWidth: '40%',
              label: {
                normal: {
                  show: false,
                  position: 'insideRight'
                }
              },
              itemStyle: {
                color: this.colors.defaultColor
              },
              data: data.trend_analysis_amount
            }
          ]
          break
        case 'bar2Option':
          s = [
            {
              name: '漏洞基因数',
              type: 'bar',
              stack: '总量',
              barMaxWidth: '40%',
              label: {
                normal: {
                  show: false,
                  position: 'insideRight'
                }
              },
              itemStyle: {
                color: this.colors.defaultColor
              },
              data: data.trend_analysis_amount
            },
            {
              name: '漏洞软件数',
              type: 'bar',
              stack: '总量',
              label: {
                normal: {
                  show: false,
                  position: 'insideRight'
                }
              },
              itemStyle: {
                color: this.colors.colorPlate[4]
              },
              data: data.trend_soft_amount
            }
          ]
          break
      }

      this[optionName] = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          top: '10%',
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: this.colors.xyAxis,
              width: 2
            }
          },
          axisLabel: {
            color: this.colors.xyAxisLabel
          },
          splitLine: {
            lineStyle: {
              color: this.colors.yAxisSplitLine,
              type: 'dashed'
            }
          }
        },
        xAxis: {
          type: 'category',
          data: data.create_time,
          axisLine: {
            lineStyle: {
              color: this.colors.xyAxis,
              width: 2
            }
          },
          axisLabel: {
            color: this.colors.xyAxisLabel
          }
        },
        series: s
      }
    },
    pieAct (cveStyleAttack) {
      let r = this.$common.compareAndSort(cveStyleAttack.cve_type_list)
      let r1 = r
      if (r.length > 7) {
        r1 = r.slice(0, 7)
        let r2 = () => {
          let sum = 0
          r.slice(8, r.length).forEach((i, j) => {
            sum += i.value
          })
          return sum
        }
        r1.push({
          name: '其他',
          value: r2()
        })
      }

      this.pieOption = {
        title: {
          text: cveStyleAttack.cve_total_amount,
          textStyle: {
            color: '#fff',
            fontWeight: 'normal',
            fontSize: 25,
            textShadowColor: '#000',
            textShadowBlur: 10
          },
          top: 'center',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        series: [{
          name: '漏洞类型',
          type: 'pie',
          radius: ['50%', '70%'],
          color: this.colors.colorPlate,
          avoidLabelOverlap: true,
          label: {
            show: true,
            color: this.colors.defaultColor,
            emphasis: {
              show: false
            }
          },
          labelLine: {
            normal: {
              show: true,
              length: 5
            }
          },
          data: r1
        }]
      }
    },
    radarAct (o) {
      let getSum = (arr) => {
        let sum = arr.reduce(function (prev, curr, idx, arr) {
          return prev + curr
        })
        return sum
      }
      this.radarData[0].value = getSum(o.data.cve_analysis_end_list)
      this.radarData[1].value = getSum(o.data.cve_analysis_before_list)
      this.radarData[2].value = getSum(o.data.cve_gene_amount)

      // 雷达最大值
      let m = []
      m = m.concat(o.data.cve_analysis_before_list, o.data.cve_analysis_end_list, o.data.cve_gene_amount)
      let max = Math.max.apply(null, m)

      this.radarOption = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          show: false
        },
        radar: [{
          indicator: o.data.name_list.map(i => {
            return {
              name: i,
              color: '#ddd',
              max: max
            }
          }),
          radius: 200,
          center: ['50%', '60%'],
          splitArea: {
            show: false
          },
          splitNumber: 3,
          splitLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.5)',
              width: 2,
              shadowColor: 'rgba(0, 0, 0, 1)',
              shadowBlur: 10
            }
          },
          name: {
            fontSize: 14,
            fontWeight: 'bolder'
          }
        }],
        series: [{
          type: 'radar',
          // symbol: 'none',
          lineStyle: {
            width: 0
          },
          data: [
            {
              value: o.data.cve_analysis_end_list,
              name: '已分析',
              areaStyle: {
                color: this.radarColor[0]
              }
            },
            {
              value: o.data.cve_analysis_before_list,
              name: '未分析',
              areaStyle: {
                color: this.radarColor[1]
              }
            },
            {
              value: o.data.cve_gene_amount,
              name: '漏洞基因',
              areaStyle: {
                color: this.radarColor[2]
              }
            }
          ]
        }]
      }
    },
    legendNameAct (name, show) {
      // legend显示灰色与否
      this.radarData[show].show = !this.radarData[show].show
      // 将legendName 传入v-echart
      this.legendName = name + ',' + Math.random()
    },
    wordsAct (wordCloud) {
      let _this = this
      let maskImage = new Image()
      maskImage.src = this.$img.maskImage
      maskImage.onload = () => {
        _this.wordsOption = {
          tooltip: {
            show: true
          },
          series: {
            type: 'wordCloud',
            gridSize: 1, // 字符间距
            sizeRange: [11, 30],
            rotationRange: [0, 0], // 旋转
            maskImage: maskImage, // 图形占比有关系
            textStyle: {
              normal: {
                color: _this.colors.wordColor
              },
              emphasis: {
                shadowBlur: 10,
                shadowColor: '#333'
              }
            },
            data: wordCloud
          }
        }
      }
    },
    // 今日录入漏洞
    getBugs (val) {
      this.bugList = val
      if (val[0].results) {
        this.total = Math.ceil(val[0].count / 3)
        if (val[0].results.length === 0) {
          this.example2 = this.example
        } else {
          this.example2 = val[0].results
        }
      }
    },
    change (val) {
      this.$store.dispatch('getIndexCveresult', val + 1)
      this.example2 = this.bugList.length
        ? this.bugList[1].results
        : []
    }
  },
  mounted () {
    this.$store.dispatch('getCveTrend')
    this.$store.dispatch('getAnalysisTrend')
    this.$store.dispatch('getCveStyleAttack')
    this.$store.dispatch('getSoftGeneTrend')
    this.$store.dispatch('getWordCloud')
    this.$store.dispatch('getIndexCveresult', 1)
    this.$store.dispatch('getRadarData')
  }
}
</script>
<style scoped="scoped" lang="scss">
  .status-con {
    display: flex;
    box-sizing: border-box;
    padding: .5rem;
    overflow: hidden;
    section {
      width: calc(100% / 3);
      height: 100%;
      margin-right: .5rem;
      figure {
        background-color: $bgColor-opacity;
        height: calc(( 100% - 1rem ) / 3);
        margin-bottom: .5rem;
        header {
          height: 1.5rem;
          line-height: 1.5rem;
          text-align: left;
          box-sizing: border-box;
          padding-left: .7rem;
          font-size: .7rem;
          font-weight: bold;
          color: $tableTitleText;
          background-color: $selectBg;
        }
        div {
          height: calc(100% - 1.5rem);
          ul {
            box-sizing: border-box;
            padding: 0 2rem;
            li {
              display: flex;
              align-items: center;
              height: calc(100% / 3);
              box-sizing: border-box;
              border-bottom: 2px solid $bgColor;
              div {
                width: 100%;
                height: auto;
              }
              p {
                color: $statusText;
                font-size: .6rem;
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              p:first-child {
                font-size: .7rem;
                span:first-child {
                  font-size: 1rem;
                  font-weight: bold;
                }
              }
              p:last-child { font-size: .9rem; }
            }
            li:last-child { border: none; }
          }
        }
      }
      figure:last-child { margin-bottom: 0; }
    }
    section:last-child { margin-right: 0; }
    .status-left,
    .status-right { width: calc(100% * .27) }
    .status-center {
      width: calc(100% * .46);
      background-color: $bgColor-opacity;
      figure {
        height: 80%;
        background-color: transparent;
      }
      footer {
        ul {
          text-align: center;
          li {
            cursor: pointer;
            position: relative;
            display: inline-block;
            margin-right: 5rem;
            span:first-child {
              display: inline-block;
              padding: 0 .7rem;
              border-radius: 3px;
            }
            span:last-child {
              position: absolute;
              right: -10.5rem;
              top: 0.25rem;
              width: 10rem;
              text-align: left;
              font-size: .7rem;
            }
          }
          li:last-child { margin-right: 0; }
        }
      }
    }
  }
</style>
<style lang="scss">
  .el-carousel__container,
  .el-carousel__item,
  .el-carousel__item > ul { height: 100%!important; }
</style>
