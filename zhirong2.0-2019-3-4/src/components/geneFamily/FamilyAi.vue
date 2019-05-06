<template>
  <div class="FamilyAi">
    <table>
      <tr header>
        <td class="_text-center">文件名</td>
        <td class="_text-center">MD5</td>
        <td class="_text-center">完成时间</td>
        <td
        v-for="(i, j) in familyClassDom"
        :key="j">{{i}}</td>
        <td>
          <el-checkbox v-model="allchecked" @change="allCheck"></el-checkbox>
        </td>
      </tr>
      <tr body v-for="(i, j) in familyResult" :key="j" class="_text-center">
        <td>
          <FileName
          :name="i.sample_name"
          :length="20"/>
        </td>
        <td>{{i.sample_md5}}</td>
        <td>{{i.create_time}}</td>
        <!--
        @ 当某个文件只含有表头分类的其中几项时
        * 在表头的循环中判断，该文件是否含有此字段 i.tags[m] 空
        -->
        <td
        v-for="(m, n) in familyClassDom"
        :key="n">
          <span
          v-if="i.tags[m]"
          class="results-num"
          @mouseenter="showResultsNum(i.tags[m], $event)"
          @mouseleave="showResultsNum(i.tags[m], $event)"
          :style="{backgroundImage: backImg(i.tags[m])}">
            <i style="color: rgba(255, 255, 255, 0)">{{resultsNum(i.tags[m])}}</i>
          </span>
          <span v-else>无</span>
        </td>
        <td>
          <el-checkbox v-model="checked[j]" @click="checked[j]=!checked[j]"></el-checkbox>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
import FileName from '@/components/home/FileName'
export default {
  name: 'FamilyAi',
  props: ['familyClassDom', 'familyResult', 'AllCheck'],
  data () {
    return {
      checked: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      allchecked: false
    }
  },
  components: {
    FileName
  },
  watch: {
    AllCheck () {
      this.allchecked = false
      console.log(this.allchecked)
      this.allCheck()
    },
    checked (val) {
      this.allchecked = true
      for (var j in val) {
        if (val[j] === false) {
          this.allchecked = false
        }
      }
    },
    allchecked (val) {
      if (this.allchecked === true) {
        for (var i in this.checked) {
          this.checked[i] = true
        }
      }
    }
  },
  methods: {
    allCheck () {
      if (this.allchecked === true) {
        for (var i in this.checked) {
          this.checked[i] = true
        }
      } else {
        for (var j in this.checked) {
          this.checked[j] = false
        }
      }
    },
    showResultsNum (m, e) {
      void (
        e.target.firstChild.style.color === 'rgba(255, 255, 255, 0)'
          ? e.target.firstChild.style.color = '#fff'
          : e.target.firstChild.style.color = 'rgba(255, 255, 255, 0)'
      )
    },
    resultsNum (m) {
      // let mval = ''
      // void (
      //   mval = parseFloat(m) < 80
      //     ? (parseFloat(m) * 100 / 80).toFixed(2) + '%'
      //     : '99.99%'
      // )
      return m
    },
    backImg (m) {
      let num = this.resultsNum(m)
      if (m === '0%') {
        return 'linear-gradient(90deg, #315697 0%, #315697 1.00%, #999 1.00%, #999 100%)'
      } else {
        return 'linear-gradient(90deg, #315697 0%, #315697 ' + num + ', #999 ' + num + ', #999 100%)'
      }
    }
  }
}
</script>
<style scoped="scoped" lang="scss">
  .FamilyAi{
    td {
      font-size: 0;
      line-height: initial;
      padding: .3rem 1rem;
      font-size: 0.8rem;
      white-space: nowrap;
      border: 1px solid #c3c6cb;
      .results-num {
        font-size: .6rem;
        display: inline-table;
        margin-right: 0.1rem;
        width: 3rem;
        height: .8rem;
        line-height: .8rem;
        text-align: right;
        border: none;
      }
    }
  }
</style>
