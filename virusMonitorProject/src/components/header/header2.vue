<style lang="stylus" scoped>
  .active h1 {
    line-height: 0.8em;
    white-space: nowrap;
  }
  .active li {
    line-height:4.7em;
  }
  .title {
    position: relative;
    display: flex;
    height: 2em;
    line-height: 1em;
    color: white;
    width: 100%;
    padding: 0 ;
  }
  h1 {
    flex: 0 0 18%;
    font-size: 1.5em;
    font-weight: bold;
    padding-top: 1%;
    color: #BFFDE4;
    margin: 0 auto;
    line-height: 1.7em;
    white-space: nowrap;
  }
  ul {
    display: flex;
    justify-content: space-between;
    position: absolute;
    left: 50%;
    margin-left: -29%;
    padding-top: 1%;
    width: 60%;
    box-sizing: border-box;
  }
  li {
    display: inline-block;
    color: #B8D9D0;
    width: 30%;
    font-size: 0.8em;
    line-height: 8.2em;
    cursor: pointer;
  }
</style>

<template lang="html">
  <div class="title">
    <h1 style="">{{ name }}</h1>
    <div class="legend-wrapper">
      <ul>
        <li 
        v-for="(legend, index) in legendArr" 
        v-on:mouseout="donwplay(index)" 
        v-on:mouseover="highlight(index)" 
        :style="styleArr[index]" 
        @click="legendToggle(legend)">
          {{ legend.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      styleArr: []
    }
  },
  props: {
    legendArr: Array,
    myChart: Object,
    name: String
  },
  watch: {
    language (val) {
      if (val === 'en') {
        $('.active h1').css('font-size', '1.1vw')
      } else {
        $('.active h1').css('font-size', '')
      }
    }
  },
  computed: {
    ...mapGetters(['language'])
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
  },
  mounted () {
    if (this.$i18n.locale === 'en') {
      $('.active h1').css('font-size', '1.1vw')
    } else {
      $('.active h1').css('font-size', '')
    }
  }
}
</script>