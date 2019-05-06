<template>
  <div class="Select">
    <div>
      <el-date-picker
        v-model="searchTimes"
        type="datetimerange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-time="['12:00:00']"
        @change="changeTime(searchTimes); urlSync(3)">
      </el-date-picker>
    </div>
    <el-select
      v-model="select_1"
      v-if="optData.select_1"
      :placeholder="optData.select_1.placeholder"
      class="el-select-50"
      @change="urlSync(1)">
      <template slot="prefix" v-if="select_1">
        <i class="el-icon-error el-icon-error-custom" @click="clearUrlSingle('select_1')"></i>
      </template>
      <el-option
        v-for="item in optData.select_1.option"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-select
      v-model="select_2"
      v-if="optData.select_2"
      :placeholder="optData.select_2.placeholder"
      class="el-select-50"
      @change="urlSync(2)">
      <template slot="prefix" v-if="select_2">
        <i class="el-icon-error el-icon-error-custom" @click="clearUrlSingle('select_2')"></i>
      </template>
      <el-option
        v-for="item in optData.select_2.option"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-select
      v-model="select_3"
      v-if="optData.select_3"
      :placeholder="optData.select_3.placeholder"
      class="el-select-50"
      @change="urlSync(3)">
      <template slot="prefix" v-if="select_3">
        <i class="el-icon-error el-icon-error-custom" @click="clearUrlSingle('select_3')"></i>
      </template>
      <el-option
        v-for="item in optData.select_3.option"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-select
      v-model="select_4"
      v-if="optData.select_4"
      :placeholder="optData.select_4.placeholder"
      class="el-select-50"
      @change="urlSync(3)">
      <template slot="prefix" v-if="select_4">
        <i class="el-icon-error el-icon-error-custom" @click="clearUrlSingle('select_4')"></i>
      </template>
      <el-option
        v-for="item in optData.select_4.option"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>
<script>
export default {
  name: 'Select',
  data () {
    return {
      select_1: '',
      select_2: '',
      select_3: '',
      select_4: '',
      searchTimes: [],
      start_time: '',
      end_time: ''
    }
  },
  props: ['optData', 'path'],
  methods: {
    urlSync () {
      /* select_1Val为第一个el-select对应的option数据，后面同理
      ** 选项数据打包添加到router上后传给父组件，同时触发initList绑定的事件刷新数据
      */
      let obj = {}
      obj = {
        select_1Val: this.select_1,
        select_2Val: this.select_2,
        select_3Val: this.select_3,
        select_4Val: this.select_4,
        startTime: this.start_time,
        endTime: this.end_time
      }
      this.$router.push({
        path: this.path,
        query: obj
      })
      this.$emit('initList', 1)
    },
    clearUrlSingle (val) {
      // 选择后出现的×，点击清除内容同时从router中将对应项清空
      let q = this.$common.inheritObj(this.$route.query)
      q[val] = ''
      this[val] = ''
      this.$router.push({
        path: this.path,
        query: q
      })
      this.urlSync()
    },
    changeTime (str) {
      if (str === null) {
        this.searchTimes = ''
        this.start_time = ''
        this.end_time = ''
      } else {
        this.start_time = this.$common.dateChange(str[0])
        this.end_time = this.$common.dateChange(str[1])
      }
    }
  },
  mounted () {
    this.searchTimes.push(this.$route.query.startTime || '')
    this.searchTimes.push(this.$route.query.endTime || '')
    if (this.$route.query.select_1Val && this.$route.query.select_1Val !== '') {
      this.select_1 = this.$route.query.select_1Val
    }
    if (this.$route.query.select_2Val && this.$route.query.select_2Val !== '') {
      this.select_2 = this.$route.query.select_2Val
    }
    if (this.$route.query.select_3Val && this.$route.query.select_3Val !== '') {
      this.select_3 = this.$route.query.select_3Val
    }
    if (this.$route.query.select_4Val && this.$route.query.select_4Val !== '') {
      this.select_4 = this.$route.query.select_4Val
    }
  }
}
</script>

<style scoped lang="scss">
  .Select {
    width: 100%;
    display: flex;
    align-items: flex-end;
    color: $headerBgColor;
    > div {
      margin-right: .5rem;
    }
  }
</style>
<style lang="scss">
  .el-range-editor.el-input__inner {
    width: 380px;
  }
  .el-select {
    width: calc((100% - 380px - 1.5rem) / 3);
  }
  .el-date-editor .el-range-input {
    color: $tableTitleText;
    background-color: transparent;
  }
  .el-icon-arrow-up:before {
    content: '';
    background: url('../assets/img/selectOption.png') center center / cover no-repeat;
    width: 20px;
    height: 10px;
  }
  .el-select .el-input .el-select__caret {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .el-input__prefix {
    display: flex;
    align-items: center;
  }
</style>
