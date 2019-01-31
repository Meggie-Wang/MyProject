<style scoped>
  .inforloophole {
    width: 80%;
    margin: 0 auto;
  }
  .inforloophole_input {
    display: flex;
    width: 65%;
    margin: 1% auto;
  }
  .inforloophole_input input {
    width: 85%;
    height: 16px;
    color: #1C7C5A;
    border: 1px solid #157150;
    border-right: none;
    border-radius: 25px 0 0 25px;
    padding: 1.5% 1%;
    user-select: none;
    outline: none;
    text-indent: 20px;
    font-size: 14px;
  }
  input::-webkit-input-placeholder {
    color: #1C7C5A;
  }
  /*去除IE下输入框右侧图标*/
  input::-ms-clear, input::-ms-reveal {
    display: none;
  }
  .inforloophole_input button {
    width: 10%;
    height: 18px;
    padding: 1.5% 1%;
    background: #0E6A55;
    border: none;
    border-radius: 0 25px 25px 0;
    outline: none;
    user-select: none;
    cursor: pointer;
    box-sizing: content-box;
  }
  .inforloophole_input button i {
    display: block;
    width: 20px;
    height: 20px;
    margin: 0 auto;
    background: url('../../../static/img/icon.png') -208px -103px no-repeat;
  }
  .inforloophole_body {
    margin: 10px 0;
    border: 1px solid #169175;
  }
  .inforloophole_body ul {
    display: flex;
  }
  .inforloophole_body ul > li {
    flex: 1;
    line-height: 40px;
    text-align: center;
    color: #606266;
    font-size: 14px;
    cursor: pointer;
  }
  .inforloophole_body ul > li > span,
  .inforloophole_body ul > li > div {
    display: block;
    height: 40px;
    margin: 5px auto;
    border-left: 2px solid #169275;
  }
  .inforloophole_body ul > li:first-of-type > span {
    border-left: none
  }
  .inforloophole_body ul > li > i {
    position: absolute;
    top: 25%;
    right: 20%;
  }
  .discoveryTime > i {
    display: inline-block;
    width: 16px;
    height: 24px;
    background: url('../../../static/img/icon.png') -1px -182px no-repeat;
    vertical-align: middle;
    margin-left: 5%;
  }
  .discoveryTime > i.active {
    transform: rotateX(180deg);
  }
  .change {
    border-bottom: 4px solid #169275;
  }
  .change > span {
    color: #169275;
  }
  .inforloophole_body_table {
    border-top: 5px solid #C9CACA;
    margin: -4px auto;
  }
  table {
    width: 100%;
  }
  table tr {
    border-bottom: 1px solid #169175;
  }
  table tr th {
    height: 40px; 
    border-bottom: 1px solid #169175;
    border-right: 1px solid #169175;
  }
  table th:first-of-type {
    width: 5%;
  }
  table th:nth-child(2) {
    width: 30%;
  }
  table th:nth-child(3) {
    position: relative;
    width: 10%;
  }
  table th:last-of-type {
    width: 25%;
    border-right: none;
  }
  table th i {
    position: absolute;
    top: 20%;
    right: 5px;
    width: 16px;
    height: 24px;
    background: url('../../../static/img/icon.png') -1px -182px no-repeat;
    cursor: pointer;
  }
  table th i.active {
    transform: rotateX(180deg);
  }
  table td {
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 14px;
    border-right: 1px solid #169175;
  }
  table td:last-of-type {
    border-right: none;
  }
  table td:nth-of-type(2) {
    text-align: left;
    padding-left: 1%;
    cursor: pointer;
  }
  .el-select-dropdown__item:hover,
  .el-select-dropdown__item.selected {
    color: #fff;
    background: #169275;
  }
  .page {
    text-align: right;
  }
</style>
<style type="text/css">
  .inforloophole_container .el-input__suffix {
    top: 38%;
    right: 10%;
    background: none;
  }
  .inforloophole_container .el-input__inner {
    border: none;
    text-align: center;
  }
  .inforloophole_container .el-input__inner::-webkit-input-placeholder {
    color: #606266 !important; 
  }
  .el-cascader-menu__item:hover,
  .el-cascader-menu__item.is-active{
    background: #169275;
    color: #fff;
  }
  .inforloophole_container .el-icon-arrow-down:before {
    content: "";
    display: block;
    width: 16px;
    height: 12px;
    background: url('../../../static/img/icon.png') -160px -196px no-repeat;
  }
  .inforloophole_container .el-select__caret {
    background: url('../../../static/img/icon.png') -160px -196px no-repeat;
  }
  .inforloophole_container .el-input__suffix .el-input__icon {
    transform: none;
  }
  .inforloophole_container .el-select__caret:before, .inforloophole_container .el-select__caret:after {
    display: none;
  }
  /*进度条*/
  .inforloophole_container .el-progress-bar__outer {
    background: #fff;
    border-radius: 0;
  }
  .inforloophole_container .el-progress-bar {
    margin: 0;
    padding: 0;
  }
  .inforloophole_container .el-progress {
    display: inline-block;
    width: 80%;
  }
  .inforloophole_container .el-progress-bar__inner {
    border-radius: 0;
    background: linear-gradient(to right,#0F7B65,#24D5B4)
  }
  .inforloophole_container .el-progress__text {
    display: none;
  }
  /*分页*/
  .inforloophole_container .el-pager .active {
    border-color: #0E6A55!important;
    background-color: #0E6A55!important;
  }
</style>
<template>
  <div class="inforloophole_container">
    <div class="inforloophole">
      <div class="inforloophole_input">
        <input
          v-model="searchMsg"
          :placeholder="$t('messages.securityInformation.securityInfoSearch')"
          class="inp"
          @keyup.enter="doSearch(path)">
        <button @click="doSearch(path)">
          <i></i>
        </button>
      </div>
      <div class="inforloophole_body">
        <!-- 菜单栏begin -->
        <ul>
          <li @click="choiceNum" :class="{'change':selected === 1}">
            <span @click="discoveryTimeSort" class="discoveryTime">
              {{ $t('messages.vulnerabilityInformation.vulnerDiscoverTime') }}
              <i :class="{active: discoveryTimeActive}"></i>
            </span>
          </li>
          <li :class="{'change':selected === 2}" v-if="$i18n.locale === 'zh'">
            <el-select
              placeholder="漏洞产品类型"
              v-model="selectedOptions_protype"
              @change="handleChange_protype">
              <el-option
                v-for="item in productType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </li>
          <li :class="{'change':selected === 3}" v-if="$i18n.locale === 'zh'">
            <el-cascader
              placeholder="漏洞危害对象"
              :options="jeopardizedOptions"
              v-model="jeopardized"
              @change="jeopardizedChange"
              expand-trigger="hover">
            </el-cascader>
          </li>
          <li :class="{'change':selected === 4}" v-if="$i18n.locale === 'zh'">
            <el-select
              placeholder="漏洞危害程度"
              v-model="degreeHarmValue"
              @change="selectValue(degreeHarmValue)">
              <el-option
                v-for="item in degreeHarm"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </li>
        </ul>
        <div class="inforloophole_body_table">
          <table>
            <tbody>
              <tr>
                <th>{{ $t('messages.safetyWords.serialNumber') }}</th>
                <th>{{ $t('messages.vulnerabilityInformation.vulnerName') }}</th>
                <th @click="entryTimeSort">
                  {{ $t('messages.safetyWords.entryTime') }}
                  <i :class="{active: entryTimeActive}" v-if="$i18n.locale === 'zh' && selected !== 1"></i>
                </th>
                <th v-if="$i18n.locale === 'zh'">{{ $t('messages.vulnerabilityInformation.damageLevel') }}</th>
              </tr>
              <tr v-for="loophole in loopholeDatas">
                <td>{{ loophole.index }}</td>
                <td @click="inforloopholeDetail(loophole.id)">{{ loophole.title }}</td>
                <td>{{ loophole.openTime }}</td>
                <td v-if="$i18n.locale === 'zh'">
                  <el-progress
                  v-if="loophole.serverityNum"
                  :percentage="loophole.serverityNum / 10"
                  :stroke-width="15"></el-progress>
                  <span class="hotNum">{{ loophole.serverity }}</span>
                </td>
              </tr>
              <tr v-if="!loopholeDatas.length">
                <td v-if="$i18n.locale === 'zh'" colspan="4" align="center">无对应数据</td>
                <td v-else colspan="4" align="center">No corresponding data</td>
              </tr>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 菜单栏end -->
      </div>
      <!-- 分页 -->
      <div class="page">
        <el-pagination
          v-if="loopholeDatas.length && loopholeDatas.length !== 1"
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="20"
          :pager-count="5"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import api from '../../api/ipApi'
export default {
  data() {
    return {
      searchMsg: '',
      loopholeDatas: [],
      selected: Number(this.$route.query.selected || 1),
      // 发现时间排序
      discoveryTimeActive: true,
      // 录入时间排序
      entryTimeActive: true,
      // 产品类型
      productType: [
        {
          value: 1,
          label: '工控系统'
        },
        {
          value: 2,
          label: '移动互联网'
        },
        {
          value: 3,
          label: '电信'
        },
        {
          value: 4,
          label: 'web应用漏洞'
        },
        {
          value: 5,
          label: '安全产品漏洞'
        },
        {
          value: 6,
          label: '操作系统漏洞'
        },
        {
          value: 7,
          label: '数据库漏洞'
        },
        {
          value: 8,
          label: '网络设备漏洞'
        },
        {
          value: 9,
          label: '应用程序漏洞'
        },
        {
          value: 10,
          label: '其他'
        },
        {
          value: 'all',
          label: '全部'
        }
      ],
      selectedOptions_protype: '',
      // 危害对象
      jeopardizedOptions: [
        {
          value: '行业漏洞',
          label: '行业漏洞',
          children: [
            {
              value: 'SSL',
              label: 'SSL'
            }, {
              value: 'CMS',
              label: 'CMS'
            }, {
              value: 'Intel',
              label: 'Intel'
            }, {
              value: 'Internet',
              label: 'Internet'
            }, {
              value: 'SQL',
              label: 'SQL'
            }, {
              value: 'App',
              label: 'App'
            }, {
              value: 'Net',
              label: 'Net'
            }, {
              value: 'Web',
              label: 'Web'
            }, {
              value: 'XSS',
              label: '跨站脚本'
            }
          ]
        },
        {
          value: '企业漏洞',
          label: '企业漏洞',
          children: [
            {
              value: 'Apple',
              label: 'Apple'
            }, {
              value: 'IBM',
              label: 'IBM'
            }, {
              value: 'Micro',
              label: 'Micro'
            }, {
              value: 'Google',
              label: 'Google'
            }, {
              value: 'Huawei',
              label: 'Huawei'
            }, {
              value: 'Oracle',
              label: 'Oracle'
            }, {
              value: 'Apache',
              label: 'Apache'
            }, {
              value: 'Linux',
              label: 'Linux'
            }, {
              value: 'Adobe',
              label: 'Adobe'
            }, {
              value: 'Red Hat',
              label: 'Red Hat'
            }
          ]
        },
        {
          value: 'all',
          label: '全部',
          children: [
            {
              value: 'all',
              label: '全部'
            }
          ]
        }
      ],
      jeopardized: [],
      // 危害程度
      degreeHarm: [
        {
          value: 'high',
          label: '高'
        },
        {
          value: 'medium',
          label: '中'
        },
        {
          value: 'low',
          label: '低'
        },
        {
          value: 'all',
          label: '全部'
        }
      ],
      degreeHarmValue: '',
      currentPage: 1,
      total: 0,
      path: localStorage.locale === 'zh' ? 'getInforLoophole' : 'getInforLoopholeEn'
    }
  },
  mounted() {
    if (Number(this.$route.query.selected) === 2) {
      for (let i in this.productType) {
        if (this.$route.query.choice === String(this.productType[i].value)) {
          this.selectedOptions_protype = this.productType[i].label
        }
      }
    } else if (Number(this.$route.query.selected) === 3) {
      for (let i in this.jeopardizedOptions) {
        for (let j in this.jeopardizedOptions[i].children) {
          if (this.$route.query.choice === this.jeopardizedOptions[i].children[j].value) {
            this.jeopardized.push(this.jeopardizedOptions[i].label, this.jeopardizedOptions[i].children[j].label)
          }
        }
      }
    } else if (Number(this.$route.query.selected) === 4) {
      for (let i in this.degreeHarm) {
        if (this.$route.query.choice === this.degreeHarm[i].value) {
          this.degreeHarmValue = this.degreeHarm[i].label
        }
      }
    }
    this.searchMsg = this.$route.query.search
    if (location.href.indexOf('?') === -1) {
      this.urlChange(1, 'time', 1, this.$route.query.search)
    }
    if (this.$i18n.locale === 'zh') {
      this.getData(this.$route.query.choice, Number(this.$route.query.page), '', this.$route.query.search)
    } else if (this.$i18n.locale === 'en') {
      this.getEnData(this.$route.query.choice)
    }
    // 判断排序三角方向
    if (Number(this.$route.query.selected) === 1 && this.$route.query.choice.split('_')[1] !== undefined) {
      this.discoveryTimeActive = false
    }
    if (Number(this.$route.query.selected) !== 1) {
      // 当search不为空
      if (this.$route.query.search !== '') {
        // 判断search是否有_r
        if (this.$route.query.search.split('_')[1] !== undefined) {
          // 有_r时
          this.entryTimeActive = false
          return
        }
      // 当search为空
      } else if (this.$route.query.search === '') {
        // 判断choice是否有_r
        if (this.$route.query.choice.split('_')[1] !== undefined) {
          this.entryTimeActive = false
          return
        }
      }
    }
  },
  computed: {
    ...mapGetters(['language'])
  },
  watch: {
    language (val) {
      if (val === 'zh') {
        this.getData(this.$route.query.choice, Number(this.$route.query.page), '', this.$route.query.search)
        this.path = 'getInforLoophole'
      } else if (val === 'en') {
        this.getEnData('time')
        this.path = 'getInforLoopholeEn'
      }
    },
    searchMsg (val) {
      let reg = new RegExp("[`~!@#$%^&*()=|{}':;',\\[\\].<>/?~！@#¥……&*（）——|{}【】‘；：”“'。，、？]")
      let rs = ""
      if (val) {
        for (let i = 0, l = val.length; i < val.length; i++) {
          rs = rs + val.substr(i, 1).replace(reg, '')
        }
        this.searchMsg = rs
      }
    }
  },
  methods: {
    // 获取中文数据
    getData (choice, page, id, search) {
      this.currentPage = Number(page)
      api.getInforLoophole(choice, page, id, search).then(res => {
        var that = this
        if (res.status === 200) {
          that.loopholeDatas = res.data.results
          that.total = res.data.count
          for (var i = 0; i < that.loopholeDatas.length; i++) {
            var index = i + 1
            that.loopholeDatas[i].index = index
            that.loopholeDatas[i].title = that.loopholeDatas[i].title.replace(/'/g, '')
            that.loopholeDatas[i].openTime = that.loopholeDatas[i].openTime.substr(0, 10)
            if (that.loopholeDatas[i].serverity === '低') {
              that.loopholeDatas[i].serverityNum = Math.ceil(Math.random() * 300)
            } else if (that.loopholeDatas[i].serverity === '中') {
              that.loopholeDatas[i].serverityNum = Math.ceil(Math.random() * 300 + 400)
            } else if (that.loopholeDatas[i].serverity === '高') {
              that.loopholeDatas[i].serverityNum = Math.ceil(Math.random() * 300 + 700)
            }
          }
        }
      })
    },
    // 获取英文数据
    getEnData (choice, search = '') {
      api.getInforLoopholeEn(choice, Number(this.$route.query.page), '', search).then(res => {
        var that = this
        if (res.status === 200) {
          that.total = res.data.count
          that.loopholeDatas = res.data.results
          for (var i = 0; i < that.loopholeDatas.length; i++) {
            var index = i + 1
            that.loopholeDatas[i].index = index
            that.loopholeDatas[i].openTime = that.loopholeDatas[i].modify_time
            that.loopholeDatas[i].serverity = that.loopholeDatas[i].description
          }
        }
      })
      return
    },
    // 改变url
    urlChange(selected, choice, page, search = '') {
      location.href = location.href.split('?')[0] + '?selected=' + selected + '&choice=' + choice + '&page=' + page + '&search=' + search
    },
    // 搜索
    doSearch () {
      var msg = this.searchMsg
      var that = this
      that.urlChange(this.$route.query.selected, this.$route.query.choice, 1, msg)
      if (this.$i18n.locale === 'zh') {
        this.getData(this.$route.query.choice, 1, '', msg)
      } else if (this.$i18n.locale === 'en') {
        this.getEnData('time', msg)
      }
      this.entryTimeActive = true
    },
    // 漏洞发现时间排序
    discoveryTimeSort (e) {
      // 中文状态下
      if (this.$i18n.locale === 'zh') {
        // 只在选择第一个选项卡时可以排序
        if (Number(this.$route.query.selected) === 1) {
          this.discoveryTimeActive = !this.discoveryTimeActive
        } else {
          this.discoveryTimeActive = this.discoveryTimeActive
        }
        // 英文状态下
      } else if (this.$i18n.locale === 'en') {
        this.discoveryTimeActive = !this.discoveryTimeActive
        e.stopPropagation()
        // 当search为空
        if (this.$route.query.search === '') {
          // 没有_r时 加上_r
          if (this.$route.query.choice.split('_')[1] === undefined) {
            this.urlChange(1, 'time_r', this.$route.query.page)
            this.getEnData('time_r')
          } else if (this.$route.query.choice.split('_')[1] !== undefined) {
            // 有_r时 去掉_r 正序
            let choice = this.$route.query.choice.split('_')[0]
            this.urlChange(1, 'time', this.$route.query.page)
            this.getEnData('time')
          }
        } else {
          // 当search不为空
          if (this.$route.query.search.split('_')[1] === undefined) {
            // 没有_r时 加上_r 倒序
            this.urlChange(1, 'time', this.$route.query.page, this.$route.query.search + '_r')
            this.getEnData('time', this.$route.query.search)
          } else if (this.$route.query.search.split('_')[1] !== undefined) {
            // 有_r时 去掉_r 正序
            let search = this.$route.query.search.split('_')[0]
            this.urlChange(1, 'time', this.$route.query.page, search)
            this.getEnData('time', search)
          }
        }
      }
    },
    // tab切换
    changeTab (selected, choice, search = '') {
      $('.inp').val('')
      this.selected = selected
      this.urlChange(selected, choice, 1, search)
      if (this.$i18n.locale === 'zh') {
        this.getData(choice, this.$route.query.page, '', search)
      } else if (this.$i18n.locale === 'en') {
        this.getEnData('time')
      }
    },
    // 点击搜索条件时候，清空search
    clearSearch () { this.searchMsg = '' },
    // 漏洞发现时间
    choiceNum() {
      this.clearSearch()
      this.urlChange(1, 'time', this.$route.query.page)
      if (this.discoveryTimeActive === false) {
        this.urlChange(1, 'time_r', 1)
      }
      this.changeTab(1, this.$route.query.choice)
      // 清空其他查询条件
      this.selectedOptions_protype = ''
      this.jeopardized = []
      this.degreeHarmValue = ''
    },
    // 漏洞产品类型
    handleChange_protype(value) {
      this.clearSearch()
      this.urlChange(2, value, Number(this.$route.query.page))
      this.changeTab(2, value)
      // 清空其他查询条件
      this.jeopardized = []
      this.degreeHarmValue = ''
    },
    // 漏洞危害对象
    jeopardizedChange(value) {
      this.clearSearch()
      this.urlChange(3, value[1], Number(this.$route.query.page))
      this.changeTab(3, value[1])
      // 清空其他查询条件
      this.selectedOptions_protype = ''
      this.degreeHarmValue = ''
    },
    // 漏洞危害程度
    selectValue(value) {
      this.clearSearch()
      this.urlChange(4, value, Number(this.$route.query.page))
      this.changeTab(4, value)
      // 清空其他查询条件
      this.selectedOptions_protype = ''
      this.jeopardized = []
    },
    // 录入时间排序
    entryTimeSort () {
      // 除了第一个选项卡 可以点击排序
      if (Number(this.$route.query.selected) !== 1) {
        this.entryTimeActive = !this.entryTimeActive
        // 当search为空
        if (this.$route.query.search === '') {
          if (this.$route.query.choice.split('_')[1] === undefined) {
            // 没有_r时 加上_r 倒序
            this.urlChange(this.$route.query.selected, this.$route.query.choice + '_r', this.$route.query.page)
            this.changeTab(Number(this.$route.query.selected), this.$route.query.choice)
          } else if (this.$route.query.choice.split('_')[1] !== undefined) {
            // 有_r时 去掉_r 正序
            let choice = this.$route.query.choice.split('_')[0]
            this.urlChange(this.$route.query.selected, choice, this.$route.query.page)
            this.changeTab(Number(this.$route.query.selected), this.$route.query.choice)
          }
        } else {
          // 当search不为空
          if (this.$route.query.search.split('_')[1] === undefined) {
            // 没有_r时 加上_r 倒序
            this.changeTab(Number(this.$route.query.selected), this.$route.query.choice, this.$route.query.search + '_r')
          } else if (this.$route.query.search.split('_')[1] !== undefined) {
            // 有_r时 去掉_r 正序
            let search = this.$route.query.search.split('_')[0]
            this.urlChange(this.$route.query.selected, this.$route.query.choice, this.$route.query.page, search)
            this.changeTab(Number(this.$route.query.selected), this.$route.query.choice, this.$route.query.search)
          }
        }
      }
    },
    // 分页
    handleCurrentChange(value) {
      this.urlChange(Number(this.$route.query.selected), this.$route.query.choice, value, this.$route.query.search)
      let apiPath = api[this.path]
      apiPath(this.$route.query.choice, value, '', this.$route.query.search).then(res => {
        var that = this
        if (res.status === 200) {
          that.loopholeDatas = res.data.results
          that.total = res.data.count
          for (var i = 0; i < that.loopholeDatas.length; i++) {
            var index = i + 1
            that.loopholeDatas[i].index = index
            if (that.loopholeDatas[i].serverity === '低') {
              that.loopholeDatas[i].serverityNum = Math.ceil(Math.random() * 300)
            } else if (that.loopholeDatas[i].serverity === '中') {
              that.loopholeDatas[i].serverityNum = Math.ceil(Math.random() * 300 + 400)
            } else if (that.loopholeDatas[i].serverity === '高') {
              that.loopholeDatas[i].serverityNum = Math.ceil(Math.random() * 300 + 700)
            }
            if (this.$i18n.locale === 'en') {
              that.loopholeDatas[i].openTime = that.loopholeDatas[i].modify_time
            }
          }
        }
      })
    },
    // 跳转详情页
    inforloopholeDetail(id) {
      this.$router.push({path: '/inforloopholeDetail', query: {id: id}})
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.path = vm.$i18n.locale === 'zh' ? 'getInforLoophole' : 'getInforLoopholeEn'
    })
  }
}
</script>