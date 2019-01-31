<template>
  <div class="index">
    <div class="index_container">
      <div class="MD5">
        <div class="md5-input">
          <div class="el-input el-input--prefix md5-search">
            <input
            type="text"
            name="userName"
            class="el-input__inner"
            autocomplete="off"
            placeholder="请输入由数字和字母组成的32位MD5名称"
            v-model="md5Str"
            @blur="checkMD5(md5Str)">
          </div>
          <span v-if="checkerror">{{errorMsg}}</span>
          <span v-else></span>
        </div>
        <el-button :disabled="disabled" @click="search">搜索</el-button>
        <label for="uploadAct" class="__handCursor __btn __btn-big __btn-primary">上传文件</label>
        <form id="form">
          <input
          type="file"
          id="uploadAct"
          directory
          multiple="multiple"
          hidden
          @change="uploadBtn($event)"/>
        </form>
      </div>
      <div class="Statistics">
        <div id="animated-number-demo">
          <p>本系统共计收录物联网恶意样本<span>{{badSample}}</span>个</p>
          <p>特种病毒<span>{{specialVirus}}</span>个</p>
        </div>
      </div>
      <div class="charts">
        <Pie2 :winResize="winResize" :echartTitle="'家族分布'" :myChartData="geneFamily" />
        <iotPie :winResize="winResize" :echartTitle="'行为属性分布'" :myChartData="pieData"/>
        <Pie3 :winResize="winResize" :echartTitle="'平台分布'" :myChartData="platData"/>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import {TweenLite} from 'gsap'
export default {
  data () {
    return {
      winResize: 0,
      md5Str: '',
      checkerror: false,
      errorMsg: '',
      badSampleNumber: 0,
      badSamplechange: 0,
      specialVirusNumber: 0,
      specialViruschange: 0,
      pieData: [],
      platData: [],
      progress: 0,
      disabled: true
    }
  },
  computed: {
    ...mapGetters(['geneFamily']),
    badSample () {
      return this.badSamplechange.toFixed(0)
    },
    specialVirus () {
      return this.specialViruschange.toFixed(0)
    }
  },
  watch: {
    md5Str (val) {
      if (val === '') {
        this.disabled = true
      } else {
        this.disabled = false
      }
    },
    // 数字滚动加载
    badSampleNumber (newValue) {
      TweenLite.to(this.$data, 0.5, { badSamplechange: newValue })
    },
    specialVirusNumber (newValue) {
      TweenLite.to(this.$data, 0.5, { specialViruschange: newValue })
    }
  },
  methods: {
    uploadBtn (e) {
      this.$message({
        message: '上传成功，系统正在分析处理',
        type: 'success'
      })
      // let files = e.target.files
      // for (let i in files) {
      //   if (!isNaN(i)) {
      //     if (files[i].size <= 5242880) {
      //       let fd = new FormData()
      //       fd.append('file', files[0])
      //       fd.append('session_id', localStorage.session_id)
      //       fd.append('submit_user', localStorage.userName)
      //       fd.append('token', localStorage[localStorage.tokenName + '_token'])
      //       let config = {
      //         onUploadProgress: progressEvent => {
      //           let complete = (progressEvent.loaded / progressEvent.total * 100 | 0)
      //           this.progress = Number(complete)
      //         }
      //       }
      //       this.$api.upload('handleUpload', fd, config).then((res) => {
      //         document.getElementById('form').reset()
      //         // if (res.status === 200) {
      //         // } else {
      //         //   this.$message({
      //         //     message: res.message,
      //         //     type: 'warning'
      //         //   })
      //         // }
      //       })
      //     } else {
      //       this.$message({
      //         message: '文件需要小于5M!',
      //         type: 'warning'
      //       })
      //     }
      //   }
      // }
    },
    search () {
      if (this.checkerror === true) {
        this.$message({
          message: '请检查输入框内容',
          type: 'warning'
        })
      } else {
        this.$router.push({'path': '/iotSampleReport', query: {id: this.md5Str}})
      }
    },
    checkMD5 (val) {
      let checkstr = /^([a-fA-F0-9]{32})$/
      if (val === '') {
        this.checkerror = true
        this.errorMsg = '请输入MD5'
      } else {
        if (!checkstr.test(val)) {
          this.checkerror = true
          this.errorMsg = '请输入由数字和字母组成的32位MD5'
        } else {
          this.checkerror = false
        }
      }
    },
    init () {
      this.$api.get('malicious_amount').then(res => {
        this.badSampleNumber = res.data
        this.specialVirusNumber = 20
      })
      this.$api.get('malicious_act').then(res => {
        this.pieData = res.data
        let arr = this.pieData.sort(this.compare('value'))
        this.pieData = arr.slice(0, 8)
      })
    },
    compare (property) {
      return function (a, b) {
        let value1 = a[property]
        let value2 = b[property]
        return value2 - value1
      }
    }
  },
  mounted () {
    this.init()
    // 为了防止sibebar卡顿，使得加载数据在0.5（sidebar运行时间）后执行
    setTimeout(() => {
      // lable数据
      this.$store.dispatch('getGeneFamily')
      this.platData = [{name: 'MIPS R3000', value: 0.21259843}, {name: 'Intel X86', value: 0.31889764}, {name: 'ARM', value: 0.16929134}, {name: 'PowerPC', value: 0.1496063}, {name: 'Renesas', value: 0.06692913}, {name: 'Sparc', value: 0.03543307}, {name: 'MC68000', value: 0.04330709}]
    }, 500)
  }
}
</script>
<style scoped="scoped" lang="scss">
  @import '@/assets/css/color.scss';
  .index_container {
    width: 80%;
    margin: 0 auto;
    padding-bottom: 1rem;
  }
  .MD5 {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    text-align: center;
    margin-top: 3rem;
  }
  .md5-input {
    margin-right: 1rem;
    span {
      display: block;
      font-size: .8rem;
      color: red;
      height: 1rem;
      line-height: 1rem;
      margin-top: .5rem;
    }
    input {
      width: 20rem;
    }
  }
  .md5-search {
    border: 1px solid $iotColor;
    border-radius: 5px;
    width: auto;
  }
  .Statistics {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
  }
  .Statistics p {
    width: auto;
    color: $iotColor;
    font-size: 2rem;
    text-align: right;
    span {
      color: orange;
      margin: 0 1rem;
    }
  }
  .charts {
    margin-top: 1rem;
    width: 100%;
    height: 500px;
    display: flex;
    border: 1px solid #d8d8d8;
  }
</style>
<style scoped>
  .charts .pie,
  .charts .pie2,
  .charts .pie3 {
    display: flex;
    align-items: center;
    width: calc(100% / 3);
    height: 100%;
    background-image: none !important;
    justify-content: center;
  }
  .__btn-primary {
    background: #64A5D4;
    margin-left: .5rem;
    font-size: 14px;
    height: 16px;
    padding: 12px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
