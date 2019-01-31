<template>
  <div class="search-options">
    <section
      class="operate-con">
      <div class="operate-con-select-con"
      :style="{
        'display': alltags.length ? 'flex' : '',
        'justify-content': alltags.length ? 'space-between' : ''
      }">

        <el-select
          v-if="userClass !== 4"
          v-model="threatenVal"
          placeholder="恶意性"
          class="el-select-50"
          @change="urlSync(1)">
          <template slot="prefix" v-if="threatenVal">
            <i class="el-icon-error el-icon-error-custom" @click="clearUrlSingle('threatenVal')"></i>
          </template>
          <el-option
            v-if="$tokenName === 'gtd' || $tokenName === 'zhirong'
              ? true
              : j < 3"
            v-for="(item, j) in $threatenOptions()"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>

        <el-select
          v-model="aptVal"
          placeholder="APT"
          filterable
          class="el-select-50"
          @change="urlSync(2)">
          <template slot="prefix" v-if="aptVal">
            <i class="el-icon-error el-icon-error-custom" @click="clearUrlSingle('aptVal')"></i>
          </template>
          <el-option
            v-for="(item, j) in aptOptions"
            :key="j"
            :label="item"
            :value="item">
          </el-option>
        </el-select>

        <el-select
          v-if="alltags[3] && $tokenName !== 'gtd'"
          v-model="fileType"
          placeholder="文件类型"
          class="el-select-50"
          @change="urlSync(2)">
          <template slot="prefix" v-if="fileType">
            <i class="el-icon-error el-icon-error-custom" @click="clearUrlSingle('fileType')"></i>
          </template>
          <el-option
            v-for="(i, j) in alltags[3].fileType"
            :key="j"
            :label="i.cn_name"
            :value="i.cn_name">
          </el-option>
        </el-select>

        <el-select
          v-if="alltags[4] && $tokenName !== 'gtd'"
          v-model="platform"
          placeholder="平台"
          class="el-select-50"
          @change="urlSync(2)">
          <template slot="prefix" v-if="platform">
            <i class="el-icon-error el-icon-error-custom" @click="clearUrlSingle('platform')"></i>
          </template>
          <el-option
            v-for="(i, j) in alltags[4].platform"
            :key="j"
            :label="i.cn_name"
            :value="i.cn_name">
          </el-option>
        </el-select>

        <el-select
          v-if="alltags[5] && userClass !== 4 && $tokenName !== 'gtd'"
          v-model="cpu"
          placeholder="CPU架构"
          class="el-select-50"
          @change="urlSync(2)">
          <template slot="prefix" v-if="cpu">
            <i class="el-icon-error el-icon-error-custom" @click="clearUrlSingle('cpu')"></i>
          </template>
          <el-option
            v-for="(i, j) in alltags[5].cpu"
            :key="j"
            :label="i.cn_name"
            :value="i.cn_name">
          </el-option>
        </el-select>

        <el-select
          v-if="$tokenName === 'gtd' ||
            $tokenName === 'zhirong' &&
            path === '/DetectionHistory'"
          v-model="importantLevelVal"
          placeholder="低等级"
          class="el-select-50"
          @change="urlSync('importantLevel')">
          <template slot="prefix" v-if="importantLevelVal">
            <i class="el-icon-error el-icon-error-custom" @click="clearUrlSingle('importantLevelVal')"></i>
          </template>
          <el-option
            v-for="(item, j) in importantLevel"
            :key="j"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>

        <el-select
          v-if="$tokenName === 'gtd'"
          v-model="processStatusVal"
          placeholder="处理状态"
          class="el-select-50"
          @change="urlSync('processStatus')">
          <template slot="prefix" v-if="processStatusVal">
            <i class="el-icon-error el-icon-error-custom" @click="clearUrlSingle('processStatusVal')"></i>
          </template>
          <el-option
            v-for="(item, j) in processStatus"
            :key="j"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>

        <el-select
          v-if="$tokenName === 'gtd' ||
            $tokenName === 'zhirong' &&
            path === '/DetectionHistory'"
          v-model="is_read"
          placeholder="阅读状态"
          class="el-select-50"
          @change="urlSync('readStatus')">
          <template slot="prefix" v-if="is_read">
            <i class="el-icon-error el-icon-error-custom" @click="clearUrlSingle('is_read')"></i>
          </template>
          <el-option
            v-for="(item, j) in readStatus"
            :key="j"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>

      <div class="operate-con-select-con-two">
        <div class="date-con" v-if="$tokenName === 'gtd' ||
          $tokenName === 'zhirong' &&
          path === '/DetectionHistory'">
          <el-date-picker
            v-model="searchTimes"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']"
            @change="dateAct(searchTimes); urlSync(3)">
          </el-date-picker>
          <el-select
            v-model="time_style"
            placeholder="请选择"
            @change="urlSync('time')">
            <el-option label="提交时间" value="submit"></el-option>
            <el-option label="完成时间" value="detect"></el-option>
          </el-select>
        </div>
        <el-date-picker
          v-else
          v-model="searchTimes"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['12:00:00']"
          @change="dateAct(searchTimes); urlSync(3)">
        </el-date-picker>
        <el-select
          v-if="showGenePcap && $tokenName !== 'gtd'"
          v-model="fileContainVal"
          multiple
          placeholder="包含基因、pcap文件"
          class="el-select-50"
          :style="{
            width: '250px'
          }"
          @change="urlSync('fileType')">
          <el-option
            v-for="item in fileContain"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>

        <!-- 文本搜索 -->
        <div
          class="md5-search"
          :style="{
            borderColor: userClass!== 4 ? '#3a537e' : '#64A5D4',
            width: $tokenName === 'gtd' ||
              $tokenName === 'zhirong' &&
              path === '/DetectionHistory'
                ? '400px'
                : '200px'
          }">
          <input
            type="text"
            name="userName"
            class="el-input__inner"
            v-model="hash_value"
            :placeholder="$tokenName === 'gtd' ||
              $tokenName === 'zhirong' &&
              path === '/DetectionHistory'
                ? '请选择搜索内容，并输入信息'
                : '请输入MD5'"
            :disabled="hash_style.length === 0 && $tokenName === 'gtd'"
            :style="{
              width: $tokenName === 'gtd' ||
                $tokenName === 'zhirong' &&
                path === '/DetectionHistory'
                  ? 'calc(400px - 120px - 2px)'
                  : '200px'
              }"
            @change="urlSync(4)" />
          <el-select
            v-if="$tokenName === 'gtd' ||
              $tokenName === 'zhirong' &&
              path === '/DetectionHistory'"
            v-model="hash_style"
            slot="prepend"
            placeholder="请选择"
            @change="urlSync(5)">
            <el-option
              v-for="(x, y) in hashStyle"
              :key="y"
              :label="x.label"
              :value="x.value"></el-option>
          </el-select>
        </div>
      </div>

      <div
      class="tags-con"
      v-for="(m, n) in alltags"
      :key="n"
      v-if="userClass !== 4">
        <section v-if="m.enName === 'custom' || m.enName === 'threaten'">

          <!-- 标题 -->
          <h3>
            <span>{{m.name}}</span>
            <!-- 删除自定义标签组件， gtd -->
            <DelCustomTags
              v-if="m.enName === 'custom' && alltags.length"
              :tags="alltags[2].custom"
              @initList="initList(currentPage)" />
          </h3>

          <!-- 没有标签 -->
          <span class="no-tag" v-if="alltags[n][m.enName].length === 0">无</span>

          <!-- 有标签 -->
          <el-tag
            v-for="(i, j) in alltags[n][m.enName]"
            :key="j"
            @click="i.show = !i.show; urlSync(5)"
            :style="{'background-color': i.show ? '#3a537e' : '#999'}">
              <span @click="i.show = !i.show; urlSync(6)">{{i.cn_name}}</span>
            </el-tag>

          <!-- 增加新自定义标签 -->
          <span
            v-if="m.enName === 'custom' && alltags.length"
            class="__btn __btn-primary add-tag">
            <img
              :src="$img.add"
              :style="{transform: addTagCon ? 'rotate(45deg)' : 'rotate(0deg)'}"
              @click="addTagCon = !addTagCon" />
            <span v-if="addTagCon">
              <input
                type="text"
                name="newTag"
                v-model="newTag"
                maxlength="10"
                minlength="0"
                placeholder="汉字,英文字母,数字,英文下划线,1<长度<11">
              <span
                class="__handCursor"
                @click="addTagAct()">添加</span>
            </span>
          </span>
        </section>

        <!-- 行为标签折叠显示 -->
        <section v-if="m.enName === 'unthreaten'">
          <!-- 标题 -->
          <h3
            class="unthreaten-title"
            @click="showUnthreaten = !showUnthreaten">
            <span>{{m.name}}</span>
            <img
              :src="$img.searchSelect"
              :style="{transform: showUnthreaten ? 'rotate(180deg)' : 'rotate(90deg)'}">
          </h3>
          <p v-if="showUnthreaten">
            <!-- 没有标签 -->
            <span
              class="no-tag"
              v-if="alltags[n][m.enName].length === 0">无</span>
            <!-- 有标签 -->
            <el-tag
              v-for="(i, j) in alltags[n][m.enName]"
              :key="j"
              @click="i.show = !i.show; urlSync(5)"
              :style="{'background-color': i.show ? '#3a537e' : '#999'}">
                <span @click="i.show = !i.show; urlSync(6)">{{i.cn_name}}</span>
              </el-tag>
          </p>
        </section>

        <!-- 物联网特征标签 -->
        <section
          class="iot-con"
          v-if="m.enName === 'iot' && JSON.stringify(alltags[6].iot) !== '{}'">
          <h3>选择物联网特征标签</h3>
          <el-tabs
            v-model="tagTabActive"
            type="card">
            <el-tab-pane
              v-for="(i, j) in alltags[6].iot"
              :key="String(j.length === 2 ? j.slice(1, j.length) : j)"
              :label="String(j.length === 2 ? j.slice(1, j.length) : j)"
              :name="String(j.length === 2 ? j.slice(1, j.length) : j)">
                <el-tag
                  v-for="(m, n) in i"
                  :key="n"
                  :style="{'background-color': m.show ? '#3a537e' : '#999'}">
                    <span @click="m.show = !m.show; urlSync(6)">{{m.cn_name}}</span>
                  </el-tag>
            </el-tab-pane>
          </el-tabs>
        </section>

      </div>

      <!-- 搜索，清除按钮 -->
      <div class="__text-center search-btn-con">
        <el-button
          v-if="alltags.length"
          type="primary"
          :loading="false"
          @click="initList(1)">
          <i class="el-icon-loading" v-if="loading"></i>
          检索结果
        </el-button>
        <el-button
          v-if="alltags.length"
          type="warning"
          plain
          :loading="false"
          @click="clearChoose()">清除选项</el-button>
      </div>

    </section>
  </div>
</template>
<script type="text/javascript">
// mounted: 加载 allLabel数据 & $route
// watch -> allLable -> initList -> init
/*
@ url同步问题
* 选择条件和页码变化时候，同步url参数
* select, time, input, tags, pageChange
*/
// alltags: 由于Tags组件 也需要使用 所以alltags在父组件加载，并不是只在serachOptions
import { mapGetters } from 'vuex'
export default {
  name: 'search-options',
  data () {
    return {
      threatenVal: '',
      processStatusVal: '',
      processStatus: [
        {value: '0', label: '未处理'},
        {value: '1', label: '已处理'}
      ],
      is_read: '',
      readStatus: [
        {value: '-1', label: '未读'},
        {value: '1', label: '已读'}
      ],
      aptVal: '',
      aptOptions: [],
      fileType: '',
      platform: '',
      cpu: '',
      searchTimes: [],
      start_time: '',
      end_time: '',
      time_style: '',
      md5Str: '',
      hash_value: '',
      hash_style: '',
      hashStyle: [
        {label: '文件名', value: 'file_name'},
        {label: 'MD5', value: 'md5'},
        {label: 'SHA-1', value: 'sha1'},
        {label: 'SHA-256', value: 'sha256'}
      ],
      fileContain: [
        {value: 'gene', label: '含基因文件'},
        {value: 'pcap', label: '含pcap文件'}
      ],
      fileContainVal: [],
      importantLevelVal: '',
      importantLevel: [
        {value: '0', label: '低级'},
        {value: '1', label: '中级'},
        {value: '2', label: '高级'}
      ],
      tagTabActive: '',
      chooseTags: [],
      addTagCon: false,
      newTag: '',
      showUnthreaten: true,
      loading: false,
      userClass: 0
    }
  },
  computed: {
    ...mapGetters(['aptFamily'])
  },
  props: ['alltags', 'apt', 'load', 'currentPage', 'path', 'showGenePcap'],
  watch: {
    alltags (res) {
      // 根据url，同步标签显示
      this.alltags.forEach((element, index) => {
        if (element.enName !== 'iot') {
          element[element.enName].forEach((i, j) => {
            if (this.$route.query.tags) {
              if (this.$route.query.tags.indexOf(i.cn_name) > -1) {
                i.show = true
              }
            }
          })
        } else {
          // 响应iot的tab is-active
          let iotKeys = Object.getOwnPropertyNames(element.iot)
          this.tagTabActive = iotKeys[0]

          // 高亮iot的tags
          if (this.$route.query.tags) {
            let tagArr = JSON.parse(this.$route.query.tags)
            for (let i in element.iot) {
              element.iot[i].forEach((m, n) => {
                if (this.$route.query.tags) {
                  if (tagArr.indexOf(m.cn_name) > -1 && tagArr[tagArr.indexOf(m.cn_name)].length === m.cn_name.length) {
                    m.show = true
                  }
                }
              })
            }
          }
        }
      })
      // 高亮其他选项
      if (this.$route.query.fileType) {
        this.fileType = this.$route.query.fileType
      }
      if (this.$route.query.platform) {
        this.platform = this.$route.query.platform
      }
      if (this.$route.query.cpu) {
        this.cpu = this.$route.query.cpu
      }
      this.initList(this.$route.query.pageNo)
    },
    load (val) {
      this.loading = val
    },
    currentPage (page) {
      // console.log(page)
      this.urlSync(6)
    },
    newTag (val) {
      this.newTag = this.$common.inputTest(val, 1)
    },
    addTagCon (bol) {
      if (!bol) {
        this.newTag = ''
      }
    },
    aptFamily (arr) {
      this.aptOptions = arr
    }
  },
  methods: {
    clearChoose () {
      // 清除选择
      // selector
      this.aptVal = ''
      this.threatenVal = ''
      this.processStatusVal = ''
      this.is_read = ''
      this.searchTimes = ''
      this.start_time = ''
      this.end_time = ''
      this.md5Str = ''
      // this.hash_style = ''
      this.hash_value = ''
      // this.time_style = ''
      this.fileType = ''
      this.platform = ''
      this.cpu = ''
      this.fileContainVal = []
      this.importantLevelVal = ''
      // tags
      this.alltags.forEach((element, index) => {
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
      // 清除url
      this.urlSync()
    },
    clearUrlSingle (val) {
      let q = this.$common.inheritObj(this.$route.query)
      q[val] = ''
      this[val] = ''
      this.$router.push({
        path: this.path,
        query: q
      })
    },
    urlSync (val) {
      // 更新url上pageNo
      // 携带选择条件
      // 携带标签
      let tags = []
      this.alltags.forEach((element, index) => {
        if (element.enName !== 'iot') {
          element[element.enName].forEach((i, j) => {
            if (i.show) {
              tags.push(i.cn_name)
            }
          })
        } else {
          for (let i in element.iot) {
            element.iot[i].forEach((m, n) => {
              if (m.show) {
                tags.push(m.cn_name)
              }
            })
          }
        }
      })
      let obj = {}
      obj = {
        pageNo: this.currentPage || 1,
        tags: JSON.stringify(tags),
        hash_value: this.hash_value,
        hash_style: this.hash_style,
        time_style: this.time_style,
        aptVal: this.aptVal,
        threatenVal: this.threatenVal,
        processStatusVal: this.processStatusVal,
        is_read: this.is_read,
        fileType: this.fileType,
        platform: this.platform,
        cpu: this.cpu,
        start_time: this.start_time,
        end_time: this.end_time,
        gene_path: this.fileContainVal.indexOf('gene') > -1 ? 'gene' : '',
        pcap_path: this.fileContainVal.indexOf('pcap') > -1 ? 'pcap' : '',
        importantLevelVal: this.importantLevelVal
      }
      this.$router.push({
        path: this.path,
        query: obj
      })
    },

    dateAct (str) {
      if (str === null) {
        this.searchTimes = ''
        this.start_time = ''
        this.end_time = ''
      } else {
        this.start_time = this.$common.dateChange(str[0])
        this.end_time = this.$common.dateChange(str[1])
      }
    },
    addTagAct () {
      if (this.newTag.length >= 2) {
        this.$api.get('add_label', {
          user_id: localStorage.session_id || '3',
          label_name: this.newTag
        }).then(res => {
          if (res.status === 200) {
            this.$message({
              message: res.message,
              type: 'success'
            })
            this.addTagCon = false
            this.$store.dispatch('getAllLable')
          } else {
            this.$message({
              message: res.message,
              type: 'warning'
            })
          }
        })
      }
    },
    initList (page) {
      this.chooseTags = []
      this.alltags.forEach((element, index) => {
        if (element.enName !== 'iot') {
          element[element.enName].forEach((i, j) => {
            if (i.show &&
              element.enName !== 'fileType' &&
              element.enName !== 'platform' &&
              element.enName !== 'cpu') {
              this.chooseTags.push(i.cn_name)
            }
          })
        } else {
          for (let i in element.iot) {
            element.iot[i].forEach((m, n) => {
              if (m.show) {
                this.chooseTags.push(m.cn_name)
              }
            })
          }
        }
      })
      // 由于新增了三个搜索条件，需要加在chooseTags数组中
      if (this.fileType) this.chooseTags.push(this.fileType)
      if (this.platform) this.chooseTags.push(this.platform)
      if (this.cpu) this.chooseTags.push(this.cpu)

      let data = {
        md5: this.hash_value,
        hash_value: this.hash_value,
        hash_style: this.hash_style,
        time_style: this.time_style,
        apt: this.aptVal,
        process_status: this.processStatusVal,
        is_read: this.is_read,
        tags: JSON.stringify(this.chooseTags),
        malicious: this.threatenVal,
        start_time: this.start_time,
        end_time: this.end_time,
        gene_path: this.fileContainVal.indexOf('gene') > -1 ? 1 : 0,
        pcap_path: this.fileContainVal.indexOf('pcap') > -1 ? 1 : 0,
        important_level: this.importantLevelVal
      }

      this.$emit('options', data)
      this.$emit('initList', page)
    }
  },
  mounted () {
    if (Number(localStorage.userClass) === 4) {
      this.userClass = 4
    } else {
      this.userClass = 0
    }
    // aptlist
    this.$store.dispatch('getAptFamily')
    // 从url上更新搜索信息
    // md5
    // this.md5Str = this.$route.query.md5Str || ''
    this.hash_style = this.$route.query.hash_style || 'md5'
    this.hash_value = this.$route.query.hash_value || ''
    // 时间选择
    this.time_style = this.$route.query.time_style || 'detect' // 检测完成时间
    // apt
    if (this.$route.query.aptVal) {
      this.aptVal = this.$route.query.aptVal
    }

    // 恶意性
    if (this.$route.query.threatenVal) {
      this.threatenVal = this.$route.query.threatenVal
    }

    // 处理
    if (this.$route.query.processStatusVal) {
      this.processStatusVal = this.$route.query.processStatusVal
    }

    // 阅读
    if (this.$route.query.is_read) {
      this.is_read = this.$route.query.is_read
    }

    // 时间
    this.searchTimes.push(this.$route.query.start_time || '')
    this.searchTimes.push(this.$route.query.end_time || '')
    this.start_time = this.$route.query.start_time || ''
    this.end_time = this.$route.query.end_time || ''

    // 重要性
    if (this.$route.query.importantLevelVal) {
      this.importantLevelVal = this.$route.query.importantLevelVal
    }

    // 文件包含基因和pcap
    if (this.$route.query.gene_path) { this.fileContainVal.push('gene') }
    if (this.$route.query.pcap_path) { this.fileContainVal.push('pcap') }
  }
}
</script>
<style type="text/css" scoped="scoped" lang="scss">
  .search-options{
    .operate-con {
      margin: 1rem 0;
      box-sizing: border-box;
      padding: 1rem 1rem 2rem;
      border: 1px solid #d8d8d8;
    }
    .operate-con > div {
      margin-top: 1rem;
    }
    h3 {
      border-bottom: 1px solid #3a537e;
      margin-bottom: .7rem;
    }
    .unthreaten-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .unthreaten-title img{
      cursor: pointer;
      width: 16px;
      height: 9px;
    }
    .no-tag {color: #999;}
    .add-tag {
      position: relative;
      top: 1px;
      display: inline-block;
      padding: 0 1rem;
      height: 32px;
      line-height: 30px;
    }
    .add-tag img {
      position: relative;
      height: .7rem;
      cursor: pointer;
    }
    .add-tag input {
      position: relative;
      font-size: 0.8rem;
      padding: 0 7px;
      width: 250px;
    }
    .md5-search {
      position: relative;
      top: -1px;
      display: inline-block;
      box-sizing: border-box;
      border: 1px solid;
      border-radius: 5px;
      width: 400px;
      font-size: 0;
      input {
        font-size: 14px;
        background-color: transparent;
      }
    }
    .el-icon-error-custom {
      line-height: 40px;
    }
    .date-con {
      display: inline-flex;
      width: 470px;
      box-sizing: border-box;
      border: 1px solid $borderColor;
      border-radius: 5px;
    }
  }
</style>
<style type="text/css" lang="scss">
.operate-con {
  .tags-con {
    .el-tag {
      padding: 0;
      span {
        display: inline-block;
        height: inherit;
        padding: 0 10px;
      }
    }
  }
  .iot-con {
    .el-tag {
      color: #fff!important;
    }
    .el-tabs__item {
      color: #999;
    }
    .el-tabs__item.is-active {
      color: $bgColor;
      font-weight: bold;
    }
  }
  .operate-con-select-con {
    .el-select {
      flex: 1;
      width: calc(20% - 2px);
      margin-right: 5px;
    }
  }
  .operate-con-select-con-two {
    .el-tag {
      color: #333;
    }
    .date-con {
      .el-date-editor {
        margin: 0;
        width: 350px;
      }
      .el-date-editor--datetimerange .el-range-input {
        border: none;
      }
      input,
      .el-date-editor,
      .el-select {
        height: 40px;
      }
      .el-select {
        width: 120px;
        border-radius: 0;
        border: none;
        border-left: 1px solid $borderColor;
      }
    }
    .md5-search {
      .el-select {
        display: inline-block;
        box-sizing: border-box;
        border: 0;
        width: 120px;
        border-left: 1px solid $borderColor;
        border-radius: 0;
        margin: 0!important;
      }
    }
  }
}
</style>
