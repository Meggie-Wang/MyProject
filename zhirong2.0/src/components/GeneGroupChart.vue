<template>
  <div
    class="gene-group-chart-con"
    :style="{
      backgroundImage: 'url(' + $img.echartBg + ')',
      backgroundRepeat: 'repeat'
    }">

    <header
      v-if="endPercent"
      class="title __handCursor">
      <!-- 样本基因组对比图 -->
      <el-popover
        placement="right"
        width="300"
        trigger="click">
        <ol>
          <li>1. 左侧纵向刻度表示文件上基因组的位置</li>
          <li>2. 中央两条柱状图表示两个对比文件；文件上的横向白色条纹表示基因组；白色条纹的长度表示此基因组的所含基因数</li>
          <li>3. 紧邻着图谱的滚动条，可以调节所查看的文件区域，并同步屏幕又下脚的mini图谱</li>
        </ol>
        <span slot="reference">样本基因组对比图 <i class="el-icon-info" style="color: #315697;" /></span>
      </el-popover>

      </header>

    <section class="chart-con">
      <figure
        v-if="endPercent"
        class="big">
        <v-echart
          className="gene-group-chart"
          :options="option"
          @chart="chart" />
      </figure>

      <figure
        v-if="endPercent"
        class="small">
        <div class="intro-con">
          <div class="legend">
            <figure>
              <i></i>
              <label>完全相似</label>
            </figure>

            <figure>
              <i></i>
              <label>非完全相似</label>
            </figure>
          </div>
          <!-- <el-switch
            v-model="similar"
            active-text="完全相似"
            inactive-text="非完全相似"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch> -->

          <!-- <header>使用说明：</header>
          <ol>
            <li>1. 左侧纵向刻度表示文件上基因组的位置</li>
            <li>2. 中央两条柱状图表示两个对比文件；文件上的横向白色条纹表示基因组；白色条纹的长度表示此基因组的所含基因数</li>
            <li>3. 紧邻着图谱的滚动条，可以调节所查看的文件区域，并同步屏幕又下脚的mini图谱</li>
          </ol> -->
        </div>

        <div class="small-con">
          <v-echart
            className="gene-group-chart-small"
            :options="optionSmall"/>

          <p
            class="eye"
            :style="{
              height: Math.abs(startPercent - endPercent) + '%',
              top: 100 - endPercent + '%'
            }"></p>
        </div>
      </figure>
    </section>
  </div>
</template>

<script>
export default {
  name: 'GeneGroupChart',
  data () {
    return {
      res: [],
      originMd5: this.$route.query.originMd5,
      tarMd5: this.$route.query.tar_md5,
      option: {},
      optionSmall: {},
      startPercent: 0,
      endPercent: 0,
      symbolBigSize: [200, 4],
      symbolSmallSize: [50, 1],
      similar: true
    }
  },
  props: ['optionData'],
  watch: {
    optionData (r) {
      this.res = r
      this.dataHandle(r, true)
    },
    similar (bol) {
      if (bol) { // 完全相似
      }
      this.dataHandle(this.res, bol)
    }
  },
  methods: {
    dataHandle (d, similar) {
      let l = d.length

      let maxFirstView = 54 // 文件的基因组的位数最低
      let dataZoom = [20, 70] // 初始化时候看到的基因组范围
      this.startPercent = 20
      this.endPercent = 70
      if (l > maxFirstView * 2) {
        dataZoom = [100 - Math.floor(maxFirstView / l * 100), 100]
        this.startPercent = 100 - Math.floor(maxFirstView / l * 100)
        this.endPercent = 100
      }

      // 数据包装
      let timeData = [] // 纵坐标
      let md5Data1 = [] // 文件1
      let md5Data2 = [] // 文件2
      let md5Data1s = [] // s文件1
      let md5Data2s = [] // s文件2

      // 基因数最大值
      let maxCountArr1 = [] // 基因组含基因数的数组
      let maxCountArr2 = [] // 基因组含基因数的数组
      for (let i = l; i--;) { // 倒叙，使得纵轴显示是从上到下递增
        timeData.push(i)
        // 先知道基因的最大值, 取两个文件的综合最大值为基数
        maxCountArr1.push(d[i].own_gene_count)
        maxCountArr2.push(d[i].file_gene_count)
      }
      // 基因组的最大值
      let maxCount1 = Math.max(...maxCountArr1)
      let maxCount2 = Math.max(...maxCountArr2)

      timeData.forEach(i => {
        let f = (val, countName, max, symbol) => {
          let s = []
          if (symbol[0] === 50 && d[i].similarity !== '100.00%') { // 小图
            s = [d[i][countName] / max * symbol[0] + 10, 2]
          } else {
            s = [d[i][countName] / max * symbol[0], symbol[1]]
          }
          return {
            value: val,
            symbolSize: s,
            itemStyle: {
              normal: {
                color: d[i].similarity === '100.00%'
                  ? (similar ? '#fff' : 'rgba(255, 255, 255, .3)')
                  : 'red'
              }
            },
            id: d[i].id,
            gene_count: d[i][countName],
            similarity: d[i].similarity
          }
        }
        md5Data1.push(f(1, 'own_gene_count', maxCount1, this.symbolBigSize))
        md5Data1s.push(f(1, 'own_gene_count', maxCount1, this.symbolSmallSize))
        md5Data2.push(f(2, 'file_gene_count', maxCount2, this.symbolBigSize))
        md5Data2s.push(f(2, 'file_gene_count', maxCount2, this.symbolSmallSize))
      })

      this.drawBig(dataZoom, timeData, md5Data1, md5Data2)
      this.drawSmall(timeData, md5Data1s, md5Data2s)
    },
    drawBig () {
      let _this = this
      // 图例样式
      let lineColor = '#315697' // 线色

      this.option = {
        grid: {
          top: '20',
          left: '20',
          right: '0',
          bottom: '35',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            animation: false
          },
          formatter: (e) => {
            return `<p>${e[0].name}位, 相似度: ${e[0].data.similarity}</p>
              <p>(左)${e[0].seriesName}基因数: ${e[0].data.gene_count}</p>
              <p>(右)${e[1].seriesName}基因数: ${e[1].data.gene_count}</p>`
          }
        },
        axisPointer: {
          link: { yAxisIndex: 'all' }
        },
        dataZoom: [{
          type: 'inside',
          start: arguments[0][0],
          end: arguments[0][1],
          yAxisIndex: 0,
          orient: 'vertical'
        }, {
          yAxisIndex: 0,
          orient: 'vertical',
          handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
          handleSize: '80%',
          handleStyle: {
            color: '#666',
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 1)',
            shadowOffsetX: 2,
            shadowOffsetY: 2
          }
        }],
        emphasis: {
          itemStyle: {
            normal: {
              color: 'black',
              borderWidth: 15,
              borderColor: 'black'
            }
          }
        },
        yAxis: [
          {
            name: '基因组(位)',
            nameTextStyle: {
              color: '#555',
              fontStyle: 'italic',
              padding: [0, 0, 0, 20]
            },
            type: 'category',
            boundaryGap: false,
            data: arguments[1]
          }
        ],
        xAxis: [
          {
            type: 'value',
            max: 3,
            position: 'top',
            axisLine: {
              show: false
            },
            axisLabel: {
              show: true,
              formatter: function (value, index) {
                let text = ''
                switch (Number(value)) {
                  case 1:
                    text = _this.originMd5
                    break
                  case 2:
                    text = _this.tarMd5
                    break
                }
                return text
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          }
        ],
        itemStyle: {
          color: '#fff'
        },
        series: [
          {
            name: this.originMd5,
            type: 'line',
            symbol: 'rect',
            symbolSize: this.symbolBigSize,
            showAllSymbol: true,
            lineStyle: {
              normal: {
                width: this.symbolBigSize[0],
                color: lineColor
              }
            },
            hoverAnimation: false,
            data: arguments[2]
          },
          {
            name: this.tarMd5,
            type: 'line',
            symbol: 'rect',
            symbolSize: this.symbolBigSize,
            showAllSymbol: true,
            lineStyle: {
              normal: {
                width: this.symbolBigSize[0],
                color: lineColor
              }
            },
            hoverAnimation: false,
            data: arguments[3]
          }
        ]
      }
    },
    drawSmall () {
      // 图例样式
      let lineColor = '#315697' // 线色

      this.optionSmall = {
        yAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: arguments[0],
            axisLine: {
              show: true
            },
            axisLabel: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          }
        ],
        xAxis: [
          {
            type: 'value',
            max: 3,
            position: 'top',
            axisLine: {
              show: true
            },
            axisLabel: {
              show: true,
              formatter: function (value, index) {
                let text = ''
                switch (Number(value)) {
                  case 1:
                    text = 'md5-1'
                    break
                  case 2:
                    text = 'md5-2'
                    break
                }
                return text
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          }
        ],
        grid: {
          top: '0%',
          left: '0%',
          right: '0%',
          bottom: '0%',
          containLabel: false
        },
        itemStyle: {
          color: '#fff'
        },
        series: [
          {
            name: '',
            type: 'line',
            symbol: 'rect',
            symbolSize: this.symbolSmallSize,
            showAllSymbol: true,
            lineStyle: {
              normal: {
                width: this.symbolSmallSize[0],
                color: lineColor
              }
            },
            hoverAnimation: false,
            data: arguments[1]
          },
          {
            name: '',
            type: 'line',
            symbol: 'rect',
            symbolSize: this.symbolSmallSize,
            showAllSymbol: true,
            lineStyle: {
              normal: {
                width: this.symbolSmallSize[0],
                color: lineColor
              }
            },
            hoverAnimation: false,
            data: arguments[2]
          }
        ]
      }
    },
    chart (p) {
      // 监听滑块的开始和结束，相应的鹰眼
      p.on('datazoom', pa => {
        if (pa.batch) {
          this.startPercent = pa.batch[0].start
          this.endPercent = pa.batch[0].end
        } else {
          this.startPercent = pa.start
          this.endPercent = pa.end
        }
      })
      p.on('mousedown', pa => {
        // 跳转
        this.$router.push({
          path: '/GeneCompare',
          query: {id: pa.data.id}
        })
      })
    }
  }
}
</script>

<style scoped="scoped" lang="scss">
  .gene-group-chart-con {
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, .5);
    .title {
      text-align: center;
      font-size: 20px;
      line-height: 50px;
      font-weight: bold;
    }
    .chart-con {
      display: flex;
      height: calc(100% - 50px);
    }
    .big {
      width: 90%;
      max-width: calc(100% - 200px);
      height: 100%;
    }
    .small {
      width: 200px;
      height: 100%;
      position: relative;
      .intro-con {
        box-sizing: border-box;
        padding-top: 20px;
        padding-left: 20px;
        color: #555;
        font-size: .9rem;
        .legend {
          i {
            height: 10px;
            width: 40px;
            display: inline-block;
            box-shadow: 0 0 5px 1px #999;
          }
          figure:first-child {
            i {
              background-color: #fff;
            }
          }
          figure:last-child {
            i {
              background-color: red;
            }
          }
        }
      }
      .small-con {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 250px;
        box-shadow: 0 0 10px 2px #666;
        .eye {
          position: absolute;
          width: 80%;
          left: 10%;
          box-sizing: border-box;
          border: 2px solid red;
          // background-color: red;
          opacity: .5;
        }
      }
    }
  }
</style>
<style lang="scss">
  .gene-group-chart-con {
    .el-switch__label.is-active {
      color: #315697;
    }
  }
</style>
