<template>
  <div class="gene-compare">
    <div class="chart-con _row">

      <d3-graphviz
        className="d0"
        :dots="dot0"
        :label="label0"
        :tipCompare="compareRes[0]"
        @compareItem="compareItem"
        style="width: 50%; float: left;"/>

      <d3-graphviz
        className="d1"
        :dots="dot1"
        :label="label1"
        :tipCompare="compareRes[1]"
        @compareItem="compareItem"
        style="width: 50%; float: left;"/>

    </div>

    <div class="compare-item">
      <p>
        <i
          v-for="(i, j) in compareRes[0]"
          :key="j"
          :color="i.color"
          :style="{
            color: i.value
              ? '#fff'
              : 'red',
            backgroundColor: Boolean(i.value)
              ? compareColor(i.color)
              : '#fff',
            display: 'inline-block'
          }">{{i.name}}</i>
      </p>
      <hr>
      <p>
        <i
          v-for="(i, j) in compareRes[1]"
          :key="j"
          :color="i.color"
          :style="{
            color: i.value
              ? '#fff'
              : 'red',
            backgroundColor: Boolean(i.value)
              ? compareColor(i.color)
              : '#fff',
            display: 'inline-block'
          }">{{i.name}}</i>
      </p>
    </div>
  </div>
</template>

<script>
import diffTwoStr from '@/assets/js/diffTwoStr.js'
export default {
  data () {
    return {
      dot0: [],
      label0: [],
      dot1: [],
      label1: [],
      lineColor: '#3b547d',
      nodeSameColor: '#3b547d',
      nodeUnSameColor: '#a2251b',
      compareArr: [],
      compareRes: []
    }
  },
  methods: {
    init () {
      this.$api.get('function_pic_data', {
        id: this.$route.query.id
      }).then(r => {
        let d = r.data

        let gene = (g) => {
          if (g.length > 96) {
            return g.replace(/(.{32})/g, '$1\n').slice(0, 93) + '...'
          } else {
            return g.replace(/(.{32})/g, '$1\n')
          }
        }

        // 组装数据
        let f = (dot, label, index) => {
          let nodes = []
          let links = []
          Object.keys(d[index]).forEach(i => {
            nodes.push(` ${i}
              [shape = "doublecircle",
              color = "${d[index][i].same ? this.nodeSameColor : this.nodeUnSameColor}",
              label = "${i}\n${gene(d[index][i].gene)}"
              fontcolor = "#ffffff"]`)
            // a->{b;c;d} 一对多
            links.push(` ${i} -> {${d[index][i].next.join(';')}}`)

            this[label].push(d[index][i].gene)
          })
          this[dot] = [
            'digraph  {',
            ' edge [arrowhead = "curve", color = "' + this.lineColor + '"]',
            ' node [style="filled"]']
            .concat(nodes, links, ['}'])
        }

        f('dot0', 'label0', 0)
        f('dot1', 'label1', 1)
      })
    },
    compareItem (val) {
      if (Number(val[1].slice(1, 2)) === 0) {
        this.compareArr[0] = val[0]
      } else {
        this.compareArr[1] = val[0]
      }

      // 第一次比对
      if (this.compareArr[0] && this.compareArr[1]) {
        this.compareRes = diffTwoStr(this.compareArr[0], this.compareArr[1])
      }
    },
    compareColor (num) {
      let c = ['#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3']
      return c[Number(num) % c.length]
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped="scoped" lang="scss">
  .gene-compare {
    height: calc(100% - 80px);
    margin: 0 auto;
    .chart-con {
      height: 100%;
      div + div {
        box-sizing: border-box;
        border-left: 1px solid #666;
      }
    }
    .compare-item {
      position: absolute;
      width: 70%;
      left: 15%;
      bottom: 20px;
      background-color: #fff;
      // rgba(0, 0, 0, 0.5);
      border-radius: 5px;
      padding: 7px;
      border: 1px solid #fff;
      box-shadow: 0 0 10px 2px #666;
      font-size: 12px;
    }
  }
</style>
