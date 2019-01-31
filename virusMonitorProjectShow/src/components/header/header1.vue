<style lang="stylus" scoped>
  .active h1 {
    line-height: 1em;
    font-size: 1.5vw;
  }
  .active li {
    line-height: 18px;
  }
  .title {
    position:relative;
    display: flex;
    height: 3em;
    line-height: 3em;
    color: white;
    width: 100%;
    padding: 0;
  }  
  h1 {
    flex: 0 0 17%;
    font-size: 1.5em;
    font-weight: bold;
    padding-top: 1%;
    color: #BFFDE4;
    margin-left: 19%;
    white-space: nowrap;
  }
  ul {
    position: absolute;
    right: 0;
    padding-top: 1.5%;
    width: 60%;
  }
  li {
    display: inline-block;
    color: #B8D9D0;
    font-size: 0.8em;
    line-height: 6em;
    cursor: pointer;
  }
</style>

<template lang="html">
  <div class="title">
    <h1>{{ name }}</h1>
    <div class="legend-wrapper">
      <ul>
        <li v-for="(legend, index) in legendArr" v-on:mouseout="donwplay(index)" v-on:mouseover="highlight(index)" :style="styleArr[index]" @click="legendToggle(legend)">
          {{ legend.name + ' ： ' + total }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      styleArr: []
    }
  },
  props: {
    legendArr: Array,
    myChart: Object,
    name: String,
    total: Number
  },
  methods: {
    highlight(index) {
      this.myChart.dispatchAction({
        type: 'highlight',
        seriesIndex: index
      });
    },
    donwplay(index) {
      this.myChart.dispatchAction({
        type: 'downplay',
        seriesIndex: index
      })
    },
    legendToggle(legend) {
      legend.selected = !legend.selected
      this.myChart.dispatchAction({
        type: 'legendToggleSelect',
        name: legend.name
      })
    }
  }
}
</script>