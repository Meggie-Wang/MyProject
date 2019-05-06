<!-- * 注意事项 * 父亲组件调用allLable全部标签, 并watch后以allTags传递给本组件 * 传递prop参数 -->
<template>
  <div class="tags-con">
    <section class="tags-con">
      <span
      v-if="existTags.length"
      v-for="(tag, index) in existTags"
      :key="index">
        <el-tag
          v-if="Number(index) < num"
          :closable="false"
          type="info"
          size="mini"
          :style="{
            'background-color': chooseTags !== undefined && chooseTags[index] === tag ? '#5187b7' : ''
          }">{{tag}}</el-tag>
      </span>

      <span v-if="!existTags.length">无</span>
      <img
      src="../assets/img/moretag.png"
      @click="dialogVisible = true"
      class="more-tag __handCursor">
    </section>

    <section class="detect-history">
      <el-dialog
        title=""
        :show-close="false"
        :visible.sync="dialogVisible"
        :width="$route.path === '/DetectionHistory' ? '70%' : '30%'">

        <header class="dialog-header">
          <span>{{'MD5: ' + md5}}</span>
          <div class="eidt-btn-con">
            <el-button
              v-if="canEdit"
              type="primary"
              size="mini"
              @click="changeTags(); dialogVisible = false">提交</el-button>
            <el-button
            v-if="$route.path === '/DetectionHistory' && userClass !== '3'"
            size="mini"
            type="primary"
            @click="canEdit = !canEdit">
              <img src="../assets/img/edit.png" style="height: 10px;">
              <span>修改</span>
            </el-button>

            <el-button
            size="mini"
            type="primary"
            @click="dialogVisible = false">
              <span>关闭</span>
            </el-button>
          </div>
        </header>

        <!-- 现在有得tags -->
        <div class="exist-tags">
          <el-tag
            v-if="existTags.length"
            v-for="(tag, index) in existTags"
            :key="index"
            :closable="canEdit"
            :disable-transitions="false"
            type="info"
            @close="removeTag(index, tag)">
            {{tag}}
          </el-tag>
        </div>

        <!-- 全部得tags -->
        <div
        v-if="canEdit"
        v-for="(m, n) in allLable"
        :key="n">
          <h3 v-if="tagShow(m.enName)">{{m.name}}</h3>
          <h4
            v-if="allLable[n][m.enName].length === 0 && tagShow(m.enName)">无</h4>
          <el-tag
            v-if="tagShow(m.enName)"
            v-for="(i, j) in allLable[n][m.enName]"
            :key="j">
              <div @click="editTag(i.cn_name); i.show = !i.show">
                <span>{{i.cn_name}}</span>
                <span class="tag-select">
                  <img
                    src="../assets/img/whiteselect.png"
                    v-if="i.show">
                  <img
                    src="../assets/img/edit.png"
                    v-if="!i.show">
                </span>
              </div>
            </el-tag>

          <!-- iot -->
          <el-tabs
            v-if="m.enName === 'iot'"
            v-model="tagTabActive" type="card">
            <el-tab-pane
              v-for="(i, j) in allLable[n][m.enName]"
              :key="String(j.length === 2 ? j.slice(1, j.length) : j)"
              :label="String(j.length === 2 ? j.slice(1, j.length) : j)"
              :name="String(j.length === 2 ? j.slice(1, j.length) : j)">
                <el-tag
                  v-for="(x, y) in i"
                  :key="y"
                  :style="{'background-color': '#fff'}">
                  <div @click="editTag(x.cn_name); x.show = !x.show">
                    <span>{{x.cn_name}}</span>
                    <span
                    class="tag-select">
                      <img
                      src="../assets/img/whiteselect.png"
                      v-if="x.show">
                      <img
                      src="../assets/img/edit.png"
                      v-if="!x.show">
                    </span>
                  </div>

                </el-tag>
              </el-tab-pane>
          </el-tabs>
        </div>
      </el-dialog>
    </section>
  </div>
</template>
<script>
export default {
  name: 'tags',
  props: ['id', 'md5', 'exist', 'chooseTags', 'alltags'],
  data () {
    return {
      dialogVisible: false,
      canEdit: false,
      existTags: [],
      allLable: [],
      tagTabActive: '',
      highLightNum: 0,
      chooseTagsHere: [],
      num: 0,
      userClass: localStorage.userClass
    }
  },
  watch: {
    // 每次加载显示时候加载
    dialogVisible (boolean) {
      if (boolean) {
        let _this = this
        this.existTags.forEach(function (m, n) {
          _this.allLable.forEach((element, index) => {
            if (element.enName !== 'iot') {
              element[element.enName].forEach((i, j) => {
                if (m === i.cn_name) {
                  i.show = true
                }
              })
            } else {
              // tag Tab active
              let iotKeys = Object.getOwnPropertyNames(element.iot)
              _this.tagTabActive = iotKeys[0]

              for (let i in element.iot) {
                element.iot[i].forEach((m, n) => {
                  if (_this.existTags.indexOf(m.cn_name) > -1) {
                    m.show = true
                  }
                })
              }
            }
          })
        })
      } else {
        // 关闭修改label
        this.canEdit = false
        // 恢复原数据值
        this.highLightTagsAct()
        // 全部标签库恢复show false
        this.allLable.forEach((element, index) => {
          if (element.enName !== 'iot') {
            element[element.enName].forEach((i, j) => {
              i.show = false
            })
          } else {
            for (let i in element.iot) {
              element.iot[i].forEach((m, n) => {
                m.show = false
              })
            }
          }
        })
      }
    },
    alltags (res) {
      this.allLable = this.$common.inheritObj(res)
    },
    exist (res) {
      // 新列表的标签数据不同触发这里
      if (res.length) {
        this.highLightTagsAct()
      }
    }
  },
  methods: {
    /*
    # 根据项目、控制enName的显示
    */
    tagShow (val) {
      let bol = false
      switch (this.$tokenName) {
        case 'gtd':
          bol = val !== 'iot' &&
            val !== 'cpu' &&
            val !== 'platform' &&
            val !== 'fileType'
          break
        default:
          bol = true
          break
      }
      return bol
    },
    removeTag (index, name) {
      this.existTags.splice(index, 1)
      // 删除name 所在的tags内的显示
      this.allLable.forEach((element, index) => {
        if (element.enName !== 'iot') {
          element[element.enName].forEach((i, j) => {
            if (i.cn_name === name) {
              i.show = false
            }
          })
        } else {
          for (let i in element.iot) {
            element.iot[i].forEach((m, n) => {
              if (m.cn_name === name) {
                m.show = false
              }
            })
          }
        }
      })
    },
    editTag (name) {
      if (this.existTags.indexOf(name) === -1) {
        this.existTags.push(name)
      } else {
        this.existTags.splice(this.existTags.indexOf(name), 1)
      }
    },
    changeTags () {
      /*
      # 提交规则
      - 当字符串不相等时候，提交
      */
      let exist = this.exist.split(',')
      exist = exist.slice(0, exist.length - 1).join(',')
      if (exist !== this.existTags.join(',')) {
        this.$api.get('add_sample_label', {
          id: this.id,
          md5: this.md5,
          label_list: JSON.stringify(this.existTags)
        }).then(res => {
          if (res.status === 200) {
            this.$message({
              message: res.message,
              type: 'success'
            })
            // 通知父亲组件刷新列表
            this.$emit('initList')
          } else {
            this.$message({
              message: res.message,
              type: 'warning'
            })
          }
        })
      }
    },
    // 数组去除指定元素
    delArrEle (arr, val) {
      if (arr.indexOf(val) > -1) {
        arr.splice(arr.indexOf(val), 1)
      }
    },
    highLightTagsAct () {
      /*
      * @ 高亮、提前搜索条件标签
      * 新列表数据进来，同步选择的标签数量
      * 找到选项tags的index
      * 在逐次删除
      */
      this.existTags = this.formatExist(this.exist)
      if (Number(localStorage.userClass) === 4) {
        this.delArrEle(this.existTags, 'Windows')
        this.delArrEle(this.existTags, 'Linux')
        this.delArrEle(this.existTags, 'Dos')
        this.delArrEle(this.existTags, 'x86-64')
        this.delArrEle(this.existTags, 'ARM')
        this.delArrEle(this.existTags, 'MIPS')
      }
      // 标签提前在iot中会导致标签将首位标签覆盖，故做判断
      if (this.chooseTags) {
        // 将选择的标签提前
        // 前提existTags 和 chooseTags 元素排序是一致的，
        // 但是，宇翔检测入库时候是按照顺序的
        // 当自定义标签时候，是按照提交额id的顺序存储的
        // 所以需要在此排序
        // this.chooseTags是经过sort()的
        // this.existTags将选择的标签提前后，替换成chooseTags即可
        if (Number(localStorage.userClass) === 4 &&
            (this.chooseTags.indexOf('Windows') > -1 ||
              this.chooseTags.indexOf('Linux') > -1 ||
                this.chooseTags.indexOf('Dos') > -1)) {
        } else {
          this.existTags.forEach((i, j) => {
            if (this.chooseTags.indexOf(i) > -1) {
              this.existTags.splice(this.existTags.indexOf(i), 1)
              this.existTags.unshift(i)
            }
          })
          this.existTags = this.chooseTags.concat(this.existTags.slice(this.chooseTags.length, this.existTags.length))
        }
      }
    },
    formatExist (val) {
      // console.log(val)
      if (val) {
        let aaa = val.split(',0.')[0]
        let thisArr = this.$common.inheritObj(aaa.split(','))
        if (thisArr.length > 1 && thisArr[0]) {
          return thisArr.slice(0, thisArr.length)
        } else {
          return []
        }
      } else {
        return []
      }
    }
  },
  mounted () {
    if (Number(localStorage.userClass) === 4 && this.$tokenName === 'iot') {
      this.num = 3
    } else {
      this.num = 5
    }
    if (this.chooseTags) { this.chooseTags.sort() }
    // 第一次加载时候录入
    this.highLightTagsAct()
    this.allLable = this.$common.inheritObj(this.alltags)
  }
}
</script>
<style scoped="scoped" lang="scss">
  .more-tag {
    position:relative;
    top: -1px;
    height: 19px;
  }
  h3 {
    color: #fff;
    border-bottom: 1px solid #fff;
    margin-bottom: .7rem;
  }
  h4{color: #999;}
  .tag-select {
    position: relative;
    display: inline-block;
    top: 0;
    right: -10px;
    height: 30px;
    width: 30px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    background-color: #1f2e47;
    text-align: center;
  }
  .tag-select img {
    position: relative;
    height: 16px;
  }
</style>
<style type="text/css">
  .tags-con .el-tabs__item {
    color: #fff;
  }
  .tags-con .el-tabs__item.is-active {
    background-color: #fff;
    color: #333;
  }
</style>
