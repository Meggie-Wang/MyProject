<template>
  <div class="d3-graphviz" :class="[className]">

    <!-- <input type="text" name=""> -->

    <div
      class="g"
      ref="g"></div>

    <figure
      class="tooltip"
      ref="tooltip"
      :style="Object.assign(tooltipStyle, {
        background: !tipCompare
          ? 'rgba(0, 0, 0, 0.5)'
          : '#fff'
        })">
      <span v-if="!tipCompare">{{geneContent}}</span>
      <span v-else>
        <i
          v-for="(i, j) in tipCompare"
          :key="j"
          :color="i.color + '-' + i.value"
          :style="{
            color: i.value
              ? '#fff'
              : 'red',
            backgroundColor: Boolean(i.value)
              ? compareColor(i.color)
              : '#fff',
            display: 'inline-block'
          }">{{i.name}}</i>
        </span>
    </figure>

    <!-- 鹰眼 -->
    <figure class="eagle-eye-con">
      <canvas></canvas>
    </figure>
  </div>
</template>

<script>
// 2019-4-11 需求
// 1，节点对比颜色
// 2，节点tooltip

// 2019-4-22 需求
// 1, 禁止鼠标滚轮放大，缩小（当节点数量大于20）
// 2，鹰眼拖动显示局部（当节点数量大于20）
// 3，只监听红色节点的不同
// 4，取消tootip，在底部显示对比
// 5，连接线加粗

/* eslint-disable*/
export default {
  data () {
    return {
      tooltipStyle: {
        top: '-999px'
      },
      geneContent: '',
      graphviz: {},
      g: null,
      tooltip: null
    }
  },
  props: ['className', 'dots', 'label', 'tipCompare'],
  watch: {
    dots (r) {
      this.render(true)
    }
  },
  methods: {
    init () {
      let that = this

      this.graphviz = d3.select(that.g).graphviz()
        .on('initEnd', that.render)
      console.log(this.graphviz)
    },
    attributer (datum, index, nodes) {
      // console.log(datum)
      if (datum.tag == "svg") {
        datum.attributes.width = this.g.offsetWidth
        datum.attributes.height = this.g.offsetHeight
      } else if (datum.tag == 'polygon') {
        datum.attributes.fill = 'transparent' // 生成的图片的背景颜色
      } else if (datum.tag == 'g' && datum.parent.tag === 'g') {
        datum.attributes.width = datum.attributes.height = '50'
      }
    },
    render (bol) {
      console.log('rendering...')
      let that = this

      let dotLines = this.dots
      let dot = dotLines.join(' ')
      if (bol) {
        this.graphviz
          .zoom(false)
          .tweenShapes(false) // 防止动画时候的背景填充(动画卡顿)
          .attributer(that.attributer)
          .transition(function () {
            return d3.transition()
              .delay(0)
              .duration(500)
          })
          .renderDot(dot)
          .on('end', that.interactive)
      } else {
        this.graphviz
          .zoom(true)
          .attributer(that.attributer)
          .tweenShapes(false)
          .renderDot(dot)
          .on('end', that.interactive)
      }
    },
    interactive () {
      // 生成鹰眼图
      this.svgToImg()

      this.tooltipAct()

      // 测试放大缩小

    },
    tooltipAct () {
      let that = this

      // 防止鼠标悬停时候出现title提示
      // selectAll('.graph,.edge') 会扰乱节点获取
      // 分开获取才能正常，**待探究**
      d3.selectAll('.graph')
        .on('mouseover', function (e) {
          this.querySelector('title').innerHTML = ''
        })
      d3.selectAll('.edge')
        .on('mouseover', function (e) {
          this.querySelector('title').innerHTML = ''
        })

      // 拖拽时候消失tooltip
      // - 放大或者缩小，不需要消失
      // - polygon移动位置，<g>的transform属性会改变
      // - 监听在<g>上的鼠标动作
      d3.selectAll('.' + this.className + ' .graph').on('mousedown', function () {
        that.removeTooltip()
      })

      let nodes = d3.selectAll('.' + this.className + ' .node')
      nodes
        .on('mouseover', function () { // function 封闭作用域，不继承this
          // tooltip显示gene文字
          this.querySelector('title').innerHTML = ''
          let nodeId = d3.select(this).attr('id')
          let labelIndex = nodeId.slice(4, nodeId.length) - 1
          that.geneContent = that.label[labelIndex]
          // d3.select(this).selectAll('text').text()
          // 递交给父级显示
          that.$emit('compareItem', [that.label[labelIndex], that.className])

          // 获取容器的高度
          let wh = that.g.offsetHeight

          // 获取鼠标在节点上的位置
          let nodeT = this.getBoundingClientRect().top
          let nodeL = this.getBoundingClientRect().left
          let nodeW = this.getBoundingClientRect().width
          let nodeH = this.getBoundingClientRect().height

          // 假设tooltip的高度是50，切基因文字都在同一行
          // 当tooltip触底时候，向上偏移50
          // 触顶时候，向下偏移50
          let tooltipTop = ''
          if ((nodeT + nodeH / 2) > wh + that.g.getBoundingClientRect().top - 50) { // 触底
            tooltipTop = wh - 50
          } else if ((nodeT + nodeH / 2) < 50) { // 触顶
            tooltipTop = 10
          } else {
            tooltipTop = (nodeT + nodeH / 2) - that.g.getBoundingClientRect().top
          }

          // 触及svg边界,（ node与svg边界的宽度 > tooltip的宽度）
          let tooltipW = that.tooltip.offsetWidth
          // g距离屏幕左侧的距离 + g的宽度
          let glGw = that.g.getBoundingClientRect().left + that.g.offsetWidth
          if (glGw - (nodeL + nodeW + 10) < tooltipW) { // node触及右侧边界
            that.tooltipStyle = {
              top: tooltipTop + 'px',
              right: glGw - nodeL + 10 + 'px'
            }
          } else {
            that.tooltipStyle = {
              top: tooltipTop + 'px',
              left: nodeL + nodeW + 10 - that.g.getBoundingClientRect().left + 'px'
            }
          }
          // tooltip触边贴紧
          // if (!that.tooltipStyle.rigtht &&
          //   that.tooltip.getBoundingClientRect().right === 0) { // t 触及右边
          //   that.tooltipStyle = {
          //     top: tooltipTop + 'px',
          //     rigtht: '0px'
          //   }
          // }
          // if (!that.tooltipStyle.left &&
          //   that.tooltip.getBoundingClientRect().left === 0) { // t 触及左边时候
          //   that.tooltipStyle = {
          //     top: tooltipTop + 'px',
          //     left: '0px'
          //   }
          // }
        })
        .on('mouseleave', () => {
          // this.removeTooltip()
        })
    },
    removeTooltip () {
      this.tooltipStyle = {
        top: -999 + 'px'
      }
    },
    compareColor (num) {
      let c = ['#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3']
      return c[Number(num) % c.length]
    },
    svgToImg () {
      var svg = document.querySelector('.' + this.className + ' .g').innerHTML
      var canvas = document.querySelector('.' + this.className + ' canvas')
      var c = canvas.getContext('2d')

      var img = new Image()
      //svg编码成base64
      img.src = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(svg))) // svg内容中可以有中文字符

      //图片初始化完成后调用
      img.onload = function() {
        //将canvas的宽高设置为图像的宽高
        canvas.width = img.width
        canvas.height = img.height

        //canvas画图片
        c.drawImage(img, 0, 0)
        canvas.style.width = '200px'
        canvas.style.height = (canvas.height * 200) / canvas.width + 'px'
      }
    }
  },
  mounted () {
    this.g = this.$refs.g
    this.tooltip = this.$refs.tooltip
    this.init()

    // 响应式
    // 拖拽上下位置不会改变
    /**函数的去抖动**/
    function debounce (method, delay) {
      var timer = null
      return function () {
        var context = this, args = arguments
        clearTimeout(timer)
        timer = setTimeout(function () {
          method.apply(context, args)
        }, delay)
      }
    }
    this.$nextTick(function() {
      window.addEventListener('resize', debounce(this.render, 500))
    })
  }
}
</script>

<style scoped="scoped" lang="scss">
  .d3-graphviz {
    position: relative;
    width: 100%;
    height: 100%;
    cursor: move;
    .g {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    .tooltip {
      position: absolute;
      background-color: rgba(0, 0, 0, 0.5);
      color: #fff;
      border-radius: 5px;
      padding: 7px;
      border: 1px solid #fff;
      box-shadow: 0 0 10px 2px #666;
      font-size: 12px;
      max-width: 400px;
    }
    canvas {
      position: absolute;
      left: 10px;
      bottom: 10px;
      border: 1px solid;
    }
  }
</style>
