<template>
  <div class="sample-report-con">
    <section class="handle-bar">
      <div v-if="$route.query.importLevel !== undefined &&
        $route.query.importLevel !== 'undefined'">
        <ul>
          <li>重要性处理：</li>
          <li
            v-for="(i, j) in importLevel"
            :key="j"
            @click="importLevelAct(j)">
            <span :style="{
              backgroundColor: i.bol ? i.value : '#ddd',
              border: i.bol ? `1px solid ${i.value}` : `1px solid #ddd`
            }"></span>
            <label
              :style="{color: i.value}">{{i.name}}</label>
          </li>
        </ul>
      </div>
      <el-select
        v-if="$tokenName === 'gtd'"
        v-model="sandBox"
        placeholder=""
        class="el-select-50"
        @change="changeBox">
        <el-option
          v-for="item in sandBoxData"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <button class="el-button print-btn el-button--default" @click="goPrint()">导出/打印</button>
    </section>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'sampleReport',
  data () {
    return {
      indexJ: 0,
      importLevel: [
        {bol: true, name: '低', value: 'green'},
        {bol: false, name: '中', value: 'orange'},
        {bol: false, name: '高', value: 'red'}
      ],
      sandBox: '',
      sandBoxData: [
        {value: 'all', label: '全部沙箱'},
        {value: 'antiy', label: '安天'},
        {value: 'shield', label: '零盾'},
        {value: 'chenxing', label: '辰星'}
      ]
    }
  },
  props: ['path'],
  computed: {
    ...mapGetters(['setFileImportLevel'])
  },
  watch: {
    setFileImportLevel (res) {
      if (res.status === 200) {
        // 同步url
        let q = this.$common.inheritObj(this.$route.query)
        q['importLevel'] = this.indexJ
        this.$router.push({path: '/' + this.path, query: q})
        this.importLevel.forEach((x, y) => {
          if (y === this.indexJ) {
            x.bol = true
          } else {
            x.bol = false
          }
        })
      }
    }
  },
  methods: {
    goPrint () {
      if (localStorage.userClass === '3') {
        this.$message.warning('您没有此项权限！')
      } else {
        this.$common.print()
      }
    },
    importLevelAct (j) {
      if (localStorage.userClass === '3') {
        this.$message.warning('您没有此项权限！')
      } else {
        this.indexJ = Number(j)
        this.$store.dispatch('setFileImportLevel', {
          important_level: this.indexJ,
          id: this.$route.query.id
        })
      }
    },
    changeBox (val) {
      // 更新url
      let q = this.$common.inheritObj(this.$route.query)
      q.sandBox = this.sandBox
      this.$router.push({path: '/SampleReport', query: q})
      // 更新数据
      this.init()
    },
    init () {
      this.$store.dispatch('getSampleReportGtd', {
        sandbox: this.sandBox,
        id: this.$route.query.id
      })
    }
  },
  mounted () {
    // 显示重要性
    if (this.$route.query.importLevel && this.$route.query.importLevel !== 'undefined') {
      // -1, 0, 1, 2
      this.importLevel.forEach((i, j) => {
        if (j === Number(this.$route.query.importLevel)) {
          i.bol = true
        } else {
          i.bol = false
        }
        if (Number(this.$route.query.importLevel) === -1) {
          this.importLevel[0].bol = true
        }
      })
    }
    // 显示默认沙箱
    this.sandBox = this.$route.query.sandBox || 'all'
    this.init()
  }
}
</script>
<style scoped="scoped" lang="scss">
  .sample-report-con {
    width: 100%;
    margin: 0px auto;
    .handle-bar {
      display: flex;
      justify-content: flex-end;
      div {
        display: flex;
        align-items: center;
        ul {
          display: flex;
          font-size: 0;
          li:first-child {
            font-size: 1rem;
            cursor: auto;
          }
          li {
            display: flex;
            align-items:center;
            margin-right: 10px;
            cursor: pointer;
            line-height: 1;
            span {
              display: inline-block;
              width: 25px;
              height: 15px;
              border-radius: 4px;
              margin-right: 4px;
            }
            label {
              display: inline-block;
              font-size: 15px;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
</style>
<style type="text/css" lang="scss">
  .sample-report-con .el-select {
    margin: 0 1rem!important;
    .el-tag {color: #333;}
  }
</style>
