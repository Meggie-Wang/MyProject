<template>
  <div class="special-model">
    <div class="special-model-con">

      <!-- 名称 -->
      <header>
        <p class="module-title">新建特马模型名称</p>
        <input
        class="el-input"
        v-model="modelName"
        type="text"
        name="modelName"
        placeholder="输入特马名称，不允许存在特殊字符和空格" />
      </header>

      <!-- 对比选择 -->
      <div class="sample-choose">
        <p class="module-title">特马样本、对比样本选择</p>

        <div
        class="depth-analysis-table-header-con"
        :style="{'width': tableData.length > 10 ? 'calc(100% - ' + detectionTableThW + ')' : 'auto'}">
          <table>
            <tr>
              <td width="25%">样本名称</td>
              <td width="25%">MD5</td>
              <td width="25%">完成时间</td>
              <td width="15%" class="__text-center">
                <span>特马样本</span>
                <span
                  class="__handCursor selectIcon"
                  :style="{'backgroundImage': selectAllBoo ? 'url(' + selectAll + ')' : ''}"
                  @click="selectAllAct()"></span>
              </td>
              <td width="10%" class="__text-center">对比样本</td>
            </tr>
          </table>
        </div>

        <div
        class="depth-analysis-table-con"
        :style="{
          'height': tableData.length > 10 ? '400px' : 'auto',
          'overflow-y': tableData.length > 10 ? 'scroll' : 'auto'
        }">
          <p v-if="tableData.length === 0" class="data-null">无数据</p>
          <table>
            <tr v-for="(i, index) in tableData" :key="index">
              <td width="25%">
                <FileName
                :name="i.sample_name"
                :length="32" />
              </td>
              <td width="25%">{{ i.sample_md5 }}</td>
              <td width="25%">{{ $common.dateChange(i.create_time) }}</td>
              <td width="15%">
                  <span
                  class="__handCursor selectIcon"
                  :style="{'backgroundImage': i.specialChecked ? 'url(' + selectAll + ')' : ''}"
                  @click="selectSingleAct(i.id, 0)"></span>
              </td>
              <td width="10%">
                  <span
                  class="__handCursor selectIcon"
                  :style="{'backgroundImage': i.contrastChecked ? 'url(' + selectAll + ')' : ''}"
                  @click="selectSingleAct(i.id, 1)"></span>
              </td>
            </tr>
          </table>
        </div>

        <div class="__text-center operate-con" v-if="tableData.length">
          <button class="loadingMore __handCursor" @click="loadingMoreAct()">
            <span v-if="!loadingMore">
              <span v-if="page < Math.ceil(total / 20)">加载更多</span>
              <span v-if="page >= Math.ceil(total / 20) && tableData.length > 19">没有更多了</span>
            </span>
            <span v-if="loadingMore"><i class="el-icon-loading"></i>加载中</span>
          </button>

          <!-- 对比操作按钮 -->
          <div class="build-con __text-center">
            <button class="__handCursor" @click="buildModel">
              <i class="el-icon-loading" v-if="buildLoading"></i>
              生成特马模型
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import selectAll from '@/assets/img/selectAll.png'
export default {
  name: 'SpecialModel',
  data () {
    return {
      selectAll: selectAll,
      modelName: '',
      tableData: [],
      selectAllBoo: false,
      page: 1,
      total: 0,
      loadingMore: false,
      buildLoading: false
    }
  },
  watch: {
    modelName (val) {
      this.modelName = this.$common.inputTest(val, 1)
    }
  },
  methods: {
    changeStyle (style) {
      if (style) {
        return 'backgroundImage: url(' + selectAll + ')'
      }
    },
    selectSingleAct (id, num) {
      // 选择样本
      this.tableData.forEach((i, j) => {
        if (i.id === id) {
          if (num) {
            i.specialChecked = false
            i.contrastChecked = !i.contrastChecked
          } else {
            i.contrastChecked = false
            i.specialChecked = !i.specialChecked
          }
        }
      })
    },
    selectAllAct () {
      this.tableData.forEach((i, j) => {
        if (this.selectAllBoo) {
          i.specialChecked = false
          i.contrastChecked = false
        } else {
          i.specialChecked = true
          i.contrastChecked = false
        }
      })
      this.selectAllBoo = !this.selectAllBoo
    },
    init (page) {
      // fake data
      // let fake = []
      // for (let i = 0; i < 21; i++) {
      //   fake.push({
      //     sample_name: this.$common.randomWord(true, 6, 32),
      //     sample_md5: this.$common.randomWord(false, 32),
      //     create_time: new Date(),
      //     specialChecked: false,
      //     contrastChecked: false
      //   })
      // }
      // this.total = 21
      // this.tableData = fake
      this.loadingMore = !this.loadingMore
      this.$api.get('analysis_history', {
        page: page || 1,
        md5: '',
        start_time: '',
        end_time: ''
      }).then(res => {
        if (res && res.results.length) {
          this.loadingMore = false
          // 加载数据
          this.total = res.count
          res.results.forEach((i, j) => {
            i.specialChecked = false
            i.contrastChecked = false
          })
          this.tableData = this.tableData.concat(res.results)
        }
      })
    },
    loadingMoreAct () {
      if (this.page < Math.ceil(this.total / 20)) {
        this.page = this.page + 1
        this.init(this.page)
      }
    },
    buildModel () {
      this.buildLoading = true
      setTimeout(() => {
        this.buildLoading = false
      }, 2000)
    }
  },
  mounted () {
    this.init(this.$route.query.page)
  }
}
</script>
<style scoped="scoped" lang="scss">
  @import '@/assets/css/depth-analysis.scss';
  $color: #3a537e;
  .special-model {
    .special-model-con {
      width: 80%;
      margin: 0 auto;
      .module-title {
        margin: 1rem 0;
        font-size: 1rem;
        border-bottom: 1px solid $color;
      }
      header > .el-input {
        height: 40px;
        line-height: 40px;
        box-sizing: border-box;
        padding-left: 7px;
        border: 1px solid $color;
      }
      .operate-con {position: relative;}
      .build-con {
        position: absolute;
        right: 0;
        top: 0;
        button {
          margin-top: 15px;
          background-color: $color;
          height: 30px;
          box-sizing: border-box;
          border: 1px solid $color;
          padding: 0 20px;
          color: #fff;
          font-size: 0.8rem;
          border-radius: 5px;
        }
      }
    }
  }
  .selectIcon {
    position: relative;
    top: 3px;
    display: inline-block;
    width: 1rem;
    height: 1rem;
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center;
    border: 1px solid $color;
  }
  .loadingMore {
    margin-top: 15px;
    background-color: transparent;
    height: 30px;
    box-sizing: border-box;
    border: 1px solid $color;
    padding: 0 20px;
    color: #333;
    font-size: 0.8rem;
    border-radius: 5px;
  }
</style>
