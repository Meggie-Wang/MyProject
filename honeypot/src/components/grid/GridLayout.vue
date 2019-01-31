<template>
  <div>

    <section class="statusTab-show">
      <StatusTab />
    </section>

    <ul class="get-back-item">
      <li
      v-for="(i, j) in layout"
      :key="j"
      v-if="!i.show"
      @click="addGridItem(i.id)">
        <img
        class="add-gridItem"
        :src="close">
        {{i.name}}
      </li>
    </ul>

    <div class="grid-layout">

      <GridLayout
      :layout="layout"
      :col-num="colNum"
      :row-height="30"
      :is-draggable="isEdit"
      :is-resizable="isEdit"
      :vertical-compact="true"
      :margin="[10, 10]"
      :use-css-transforms="true">

          <GridItem
          v-if="item.show"
          class="grid-item"
          v-for="(item, j) in layout"
          :key="j"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i"
          @moved="movedEvent"
          @resized="resizedEvent">

            <img
            class="close-gridItem"
            v-if="isEdit"
            :src="close"
            @click="closeThis(item.id, item.isAttackType)">

            <component
            :is="item.componentName"
            :resData="item.res"
            :initW="item.w"
            :initH="item.h"
            :winResize="winResize"
            :style="{height: '100%'}"></component>

            <footer class="grid-item-footer">

              <div v-if="item.isAttackType">
                <img :src="item.icon"/>
                <span>{{AttackTypeName(item.res)}}</span>
              </div>

              <div v-else>
                <img :src="item.icon"/>
                <span>{{ $t('messages.status.' + item.id) }}</span>
              </div>

            </footer>

          </GridItem>

      </GridLayout>

    </div>
  </div>
</template>
<script>
// 解释
// clo-num 必须是自然数，由于头部的攻击类型数字不固定，所以设置col-num为攻击类型的length
// 删除显示的项目，需要有个菜单可以再次添加进来
import { GridLayout, GridItem } from 'vue-grid-layout'
import { mapGetters, mapActions } from 'vuex'
// 组件
import StatusTab from '@/components/charts2/StatusTab'
import AttackType from '@/components/charts2/AttackType'
import Line1 from '@/components/charts2/Line1'
import Bar from '@/components/charts2/Bar'
import Pie from '@/components/charts2/Pie'
import Pie2 from '@/components/charts2/Pie2'
import Word1 from '@/components/charts2/Word1'
import Word2 from '@/components/charts2/Word2'
import Word3 from '@/components/charts2/Word3'
import Word4 from '@/components/charts2/Word4'
import Line2 from '@/components/charts2/Line2'
// img
import safetyMarking from '@/assets/img/safetyMarking.png'
import stutasEvent from '@/assets/img/stutasEvent.png'
import statusBar from '@/assets/img/statusBar.png'
import statusPie from '@/assets/img/statusPie.png'
import statusCloud from '@/assets/img/statusCloud.png'
import close from '@/assets/img/close.png'
export default{
  name: 'gridLayout',
  data () {
    return {
      isEdit: true,
      // img
      safetyMarking: safetyMarking,
      stutasEvent: stutasEvent,
      statusBar: statusBar,
      statusPie: statusPie,
      statusCloud: statusCloud,
      close: close,
      layout: [],
      colNum: 0
    }
  },
  props: ['winResize'],
  computed: {
    ...mapGetters(['statusData'])
  },
  watch: {
    statusData (res) {
      this.layout = []
      let AttackTypes = res.attackType
      this.colNum = AttackTypes.length
      AttackTypes.forEach((element, index) => {
        this.layout.push({
          x: index * 1,
          y: 0,
          w: 1,
          h: 4,
          i: index,
          icon: safetyMarking,
          id: element.name2,
          componentName: AttackType,
          isAttackType: true,
          name: this.AttackTypeName(element),
          show: true,
          res: element
        })
      })
      // add line1
      this.layout.push({
        x: 0,
        y: 4,
        w: this.colNum,
        h: 6,
        i: this.colNum + 1,
        icon: stutasEvent,
        id: 'attackTypeTime',
        componentName: Line1,
        isAttackType: false,
        name: this.$t('messages.status.attackTypeTime'),
        show: true,
        res: res.attackEvent
      })
    }
  },
  components: {
    GridLayout,
    GridItem,
    StatusTab,
    AttackType,
    Line1,
    Bar,
    Pie,
    Pie2,
    Word1,
    Word2,
    Word3,
    Word4,
    Line2
  },
  methods: {
    ...mapActions(['statusDataAct']),
    resizedEvent (_i, newH, newW) {
      this.layout.forEach((m, n) => {
        if (m.i === _i) {
          m.originW = newW
          m.originH = newH
        } else {
          m.originX = m.x
          m.originY = m.y
        }
      })
    },
    movedEvent (_i, newX, newY) {
      this.layout.forEach((m, n) => {
        if (m.i === _i) {
          m.originX = newX
          m.originY = m.y
        } else {
          m.originX = m.x
          m.originY = m.y
        }
      })
    },
    closeThis (_id, isAttackType) {
      // close act
      // close attacktype, visisble name is in vuex data
      // other's name is in lang
      if (isAttackType) {
        this.layout.forEach((i, j) => {
          if (i.id === _id) {
            i.show = false
            i.name = this.AttackTypeName(i.res)
          }
        })
      } else {
        this.layout.forEach((i, j) => {
          if (i.id === _id) {
            i.show = false
            i.name = this.$t('messages.status.' + i.id)
          }
        })
      }
    },
    addGridItem (id) {
      this.layout.forEach((i, j) => {
        if (i.id === id) {
          i.show = true
        }
      })
    },
    AttackTypeName (res) {
      if (this.$i18n.locale === 'zh') {
        return res.nameC
      } else {
        return res.name2
      }
    }
  },
  mounted () {
    this.statusDataAct({search: 'HP_USA_Western_47.254.45.254', section: 0})
  }
}
</script>
<style scoped="scoped">
  /*get back grid item*/
  .statusTab-show,
  .get-back-item {
    padding: 0 calc(1rem + 10px);
  }
  .get-back-item {
    margin-top: 1rem;
  }
  .get-back-item li{
    display: inline-block;
    box-sizing: border-box;
    border: 1px solid #018c6f;
    background-color: rgba(1, 68, 54, .5);
    color: #d8d8d8;
    padding: .5rem 1rem;
    margin-right: .5rem;
    margin-bottom: .5rem;
    cursor: pointer;
  }
  .add-gridItem{
    position: relative;
    display: inline-block;
    top: -2px;
    right: .3rem;
    transform: rotate(45deg);
    height: .8rem;
  }
  /*grid cotainer*/
  .grid-layout{
    padding: 0 1rem;
    /*height: 100%;*/
    /*overflow-y: scroll;*/
  }
  .grid-item{
    box-sizing: border-box;
    border: 1px solid #018c6f;
    background-color: rgba(1, 68, 54, .5);
  }
  .grid-item > header > i {
    cursor: pointer;
  }
  .close-gridItem{
    z-index: 9999;
    position: absolute;
    right: .5rem;
    top: .5rem;
    height: 1rem;
    cursor: pointer;
  }
  .grid-item-footer{
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 1.5rem 0 .5rem;
    color: #d8d8d8;
    background-color: #015241;
  }
  .grid-item-footer > div {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .grid-item-footer > div > img {
    height: 1.5rem;
  }
  .grid-item-footer > div > i{
    cursor: pointer;
  }
</style>
