<template>
  <div class="search">
    <div class="search_container">
      <div class="searchImg">
        <img :src="$img.geneExtractBg">
      </div>
      <div class="searchInp">
        <el-select
          v-if="typeValue === 'APT组织' || typeValue === '样本标签'"
          class="searchSelector"
          v-model="searchValue"
          :placeholder="searchValue">
          <el-option
            v-for="(item, index) in searchSelector"
            :key="index"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        <input v-else type="text" placeholder="请输入查询信息" v-model="searchContent" @keyup.enter="doSearch">
        <el-select
          v-model="typeValue"
          placeholder="请选择"
          @change="changeSelect">
          <el-option
            v-for="item in typeSelector"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="tips">{{ tips }}</div>
      <button class="__btn-big __handCursor" @click="doSearch">开始检索</button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      searchSelector: [],
      searchValue: '',
      typeSelector: [
        {
          value: 'APT组织',
          label: 'APT组织'
        },
        {
          label: '样本标签',
          value: '样本标签'
        },
        {
          label: '恶意IP',
          value: '恶意IP'
        },
        {
          label: '恶意DNS',
          value: '恶意DNS'
        },
        {
          label: '恶意MD5',
          value: '恶意MD5'
        }
      ],
      typeValue: 'APT组织',
      searchContent: '',
      tips: '',
      map_numVal: '10',
      sample_numVal: '50',
      ip_numVal: '50'
    }
  },
  computed: {
    ...mapGetters(['aptFamily', 'sampleTags'])
  },
  watch: {
    aptFamily (val) {
      this.searchSelector = this.aptFamily
      this.searchValue = this.aptFamily[0]
    }
  },
  methods: {
    doSearch () {
      if (this.typeValue === 'APT组织' || this.typeValue === '样本标签') {
        this.$router.push({path: '/SearchDetail', query: {search: this.searchValue, type: this.typeValue, map_num: this.map_numVal, sample_num: this.sample_numVal, ip_num: this.ip_numVal}})
      } else {
        if (this.searchContent) {
          this.$router.push({path: '/SearchDetail', query: {search: this.searchContent, type: this.typeValue, map_num: this.map_numVal, sample_num: this.sample_numVal, ip_num: this.ip_numVal}})
        } else {
          this.tips = '请输入搜索内容'
          setTimeout(() => {
            this.tips = ''
          }, 2000)
        }
      }
    },
    changeSelect (val) {
      if (val === 'APT组织') {
        this.searchValue = this.aptFamily[0]
        this.searchSelector = this.aptFamily
      }
      if (val === '样本标签') {
        this.$store.dispatch('getAllLable')
        this.searchValue = this.sampleTags[0]
        this.searchSelector = this.sampleTags
      }
    }
  },
  mounted () {
    this.$store.dispatch('getAptFamily')
  }
}
</script>
<style scoped>
  .search_container {
    position: relative;
    width: 60%;
    margin: 0 auto;
  }
  .searchImg {
    width: 70%;
    margin: 0 auto;
    padding-top: 10%;
  }
  .searchImg img {
    width: 100%;
  }
  .searchInp {
    display: flex;
    padding-top: 5%;
  }
  .searchSelector {
    display: flex;
    flex: 1;
    margin-right: 10px;
  }
  .searchInp input {
    width: 90%;
    color: #fff;
    border: 1px solid #fff;
    background: transparent;
    text-indent: 20px;
    margin-right: 2%;
  }
  ::-webkit-input-placeholder {
    color: #fff;
  }
  :-moz-placeholder, ::-moz-placeholder {
    color: #fff;
    opacity: 1;
  }
  input[placeholder], [placeholder], *[placeholder] {
    color: #fff;
  }
  input:focus::-webkit-input-placeholder {
    color: transparent;
  }
  input:focus:-moz-placeholder, input:focus::-moz-placeholder {
    color: transparent;
  }
  .tips {
    position: absolute;
    bottom: -25px;
    left: 50%;
    transform: translateX(-50%);
    color: red;
    font-size: 14px;
  }
  button {
    position: absolute;
    bottom: -65px;
    left: 50%;
    transform: translateX(-50%);
    color: #243D63;
    font-weight: bold;
    border: none;
    border-radius: 5px;
  }
</style>
<style type="text/css" lang="scss">
  .search_container {
    .el-select {
      border-color: #fff;
    }
  }
</style>
