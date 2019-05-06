<template>
  <div class="FamilyAi">
    <template>
      <el-table
        :data="familyResult"
        fit
        highlight-current-row
        border
        @selection-change="selsChange"
        :cell-style="{borderColor: '#315697', textAlign: 'center'}"
        :header-cell-style="{borderColor: '#315697', textAlign: 'center'}"
        style="border: 1px solid #315697;">
        <el-table-column
          label="文件名"
          :width="widthAuto? '' : 220"
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
          :width="widthAuto? '' : 320"
          :resizable="false">
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="完成时间"
          :width="widthAuto? '' : 180"
          :resizable="false">
        </el-table-column>
        <el-table-column
          v-if="!widthAuto"
          v-for="(item, domIndex) in familyClassDom"
          :key="domIndex"
          :label="item"
          :resizable="false">
          <template slot-scope="scope">
            <span
              v-if="scope.row.tags[familyClassDom[domIndex]]"
              class="results-num"
              @mouseenter="showResultsNum(scope.row.tags[familyClassDom[domIndex]], $event)"
              @mouseleave="showResultsNum(scope.row.tags[familyClassDom[domIndex]], $event)"
              :style="{backgroundImage: backImg(scope.row.tags[familyClassDom[domIndex]])}">
              <i style="color: rgba(255, 255, 255, 0)">{{resultsNum(scope.row.tags[familyClassDom[domIndex]])}}</i>
            </span>
            <span
              v-else
              class="results-num"
              @mouseenter="showResultsNum('0%', $event)"
              @mouseleave="showResultsNum('0%', $event)"
              :style="{backgroundImage: backImg('0%')}">
              <i style="color: rgba(255, 255, 255, 0)">{{resultsNum('0%')}}</i>
            </span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="$tokenName !== 'gtd'"
          type="selection"
          width="55"
          :resizable="false">
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>
<script>
export default {
  name: 'FamilyAi',
  props: ['familyClassDom', 'familyResult'],
  data () {
    return {
      sels: [],
      check: [],
      widthAuto: true
    }
  },
  watch: {
    familyClassDom (val) {
      if (val.length === 0) {
        this.widthAuto = true
      } else {
        this.widthAuto = false
      }
    }
  },
  methods: {
    // sels记录选择项
    selsChange (sels) {
      this.sels = sels
      if (this.check.length <= this.sels.length) {
        for (var i = 0; i < this.sels.length; i++) {
          this.check[i] = this.sels[i].id
        }
      } else {
        this.check = []
        for (var j = 0; j < this.sels.length; j++) {
          this.check[j] = this.sels[j].id
        }
      }
    },
    showResultsNum (m, e) {
      if (e.target.firstChild.style.color === 'rgba(255, 255, 255, 0)') {
        e.target.firstChild.style.color = '#fff'
        e.target.firstChild.style.textShadow = '0 0 5px #ddd'
      } else {
        e.target.firstChild.style.color = 'rgba(255, 255, 255, 0)'
        e.target.firstChild.style.textShadow = '0 0 0 transparent'
      }
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
        return 'linear-gradient(90deg, #315697 0%, #315697 1.00%, #d8d8d8 1.00%, #d8d8d8 100%)'
      } else {
        return 'linear-gradient(90deg, #315697 0%, #315697 ' + num + ', #d8d8d8 ' + num + ', #d8d8d8 100%)'
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
