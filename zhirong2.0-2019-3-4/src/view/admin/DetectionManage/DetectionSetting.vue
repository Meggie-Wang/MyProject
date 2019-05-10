<template>
  <div class="DetectionSetting">
    <header><h2>样本检测策略</h2></header>

    <figure class="detectFile">
      <label><h3>设置需要检测的文件类型</h3></label>
      <div style="display: flex;align-items: center;">
        <el-checkbox-group v-model="detectFileTypeCheckList">
          <el-checkbox-button
            v-for="(i, j) in detectFileTypeList"
            :label="i.value"
            :key="j">{{i.label}}
          </el-checkbox-button>
        </el-checkbox-group>
        <el-checkbox-button
          class=""
          v-model="allCheck"
          @change="allCheckFunc()"
          style="margin-right: 30px;">全选
        </el-checkbox-button>
      </div>
    </figure>

    <figure>
      <label><h3>ZIP样本检测设置</h3></label>
      <div>
        <div class="inputDiv">
          <span>是否进行解压检测</span>
          <el-radio-group v-model="isCheckZIP">
            <el-radio-button label="1">是</el-radio-button>
            <el-radio-button label="0">否</el-radio-button>
          </el-radio-group>
        </div>
        <div class="inputDiv">
          <span>解压级别</span>
          <input
            v-model="decompressionLevel"
            :disabled="isCheckZIP === '0' || userClass !== '2'"
            @blur="inputCheck('decompressionLevel', 1, 10)">级（级别范围：1-10）
        </div>
      </div>
    </figure>

    <figure>
      <label><h3>检测方式</h3></label>
      <div>
        <el-checkbox-group v-model="detect_method">
          <!-- <el-checkbox-button label="antivirus">杀软检测</el-checkbox-button> -->
          <el-tooltip class="item" effect="light" content="样本静态检测使用现有的软件基因引擎，对样本进行静态基因检测(单样本检测时间较快)" placement="bottom-start">
            <el-checkbox-button label="static">静态基因检测</el-checkbox-button>
          </el-tooltip>
          <el-tooltip class="item" effect="light" content="样本动态检测使用丰富的沙箱引擎对样本进行动态检测(单样本检测时间较长)" placement="bottom-start">
            <el-checkbox-button label="dynamic">沙箱动态检测</el-checkbox-button>
          </el-tooltip>
          <el-tooltip class="item" effect="light" content="进行戎磐云检测服务并获取检测结果" placement="bottom-start">
            <el-checkbox-button label="ioc">戎磐云检测</el-checkbox-button>
          </el-tooltip>
        </el-checkbox-group>
      </div>
    </figure>

    <!-- <figure>
      <label><h3>设置告警级别</h3></label>
      <div>
        <el-radio-group v-model="setWarningLevel">
          <el-radio label="1">低级</el-radio>
          <el-radio label="2">中级</el-radio>
          <el-radio label="3">高级</el-radio>
        </el-radio-group>
      </div>
    </figure> -->

    <!-- <figure>
      <label><h3>流量监测文件存储设置</h3></label>
      <div>
        <div class="inputDiv">
          <span>文件威胁等级保存</span>
          <el-radio-group
            v-model="saveLevel"
           >
            <el-radio-button label="-1">不保存</el-radio-button>
            <el-radio-button label="0">保存全部</el-radio-button>
            <el-radio-button label="1">保存低级及以上</el-radio-button>
            <el-radio-button label="2">保存中级及以上</el-radio-button>
            <el-radio-button label="3">保存高级</el-radio-button>
          </el-radio-group>
        </div>
        <div class="inputDiv">
          <span>保存时间</span>
          <input
            v-model="storeTime"
            @blur="inputCheck('storeTime', 1, 7)">天（时间范围：1-7）
        </div>
      </div>
    </figure>

    <figure>
      <label><h3>用户日志存储设置</h3></label>
      <div class="inputDiv">
        <span>日志存储时间</span>
        <input
          v-model="logTime"
          @blur="inputCheck('logTime', 6, 12)">月（时间范围：6-12）
      </div>
    </figure> -->

    <figure>
      <el-button @click="saveDetect()">保存</el-button>
    </figure>
  </div>
</template>
<script>
export default {
  name: 'Tatics',
  data () {
    return {
      isCheckZIP: '0',
      decompressionLevel: 5,
      // saveLevel: '-1',
      detectFileTypeList: [{
        label: '执行类',
        value: 'PE'
      }, {
        label: 'OFFICE类',
        value: 'OFFICE'
      }, {
        label: '压缩类',
        value: 'ZIP'
      }, {
        label: '脚本类',
        value: 'TEXT'
      }],
      detectFileTypeCheckList: [],
      // storeTime: 1,
      // logTime: 6,
      addCheckOption: false,
      newCheck: '',
      userClass: localStorage.userClass,
      detect_method: [],
      allCheck: true
    }
  },
  watch: {
    newCheck (val) {
      this.newCheck = this.$common.inputTest(val, 1)
    },
    isCheckZIP (val) {
      if (val === '0') {
        this.decompressionLevel = 0
      } else {
        this.decompressionLevel = this.decompressionLevel === 0 ? 1 : this.decompressionLevel
      }
    },
    detectFileTypeCheckList (val) {
      if (val.length === this.detectFileTypeList.length + 1) {
        this.allCheck = true
      } else {
        this.allCheck = false
      }
    }
  },
  methods: {
    allCheckFunc () {
      if (this.allCheck) {
        this.detectFileTypeCheckList = ['PE', 'ELF', 'OFFICE', 'ZIP', 'TEXT']
      } else {
        this.detectFileTypeCheckList = []
      }
    },
    detect_setting () {
      this.$api.get('detect_setting').then((res) => {
        this.decompressionLevel = res.data.unzip_level
        // this.setWarningLevel = res.data.warning_level.toString()
        this.detectFileTypeCheckList = res.data.detect_type.split(', ')[0].split('"')[1].split(',')
        // this.saveLevel = res.data.storage_level.toString()
        // this.storeTime = res.data.storage_time
        // this.logTime = res.data.log_time
        this.isCheckZIP = res.data.unzip_level === 0 ? '0' : '1'
        // this.detectFileTypeList = res.data.type_list.split(',')
        this.detect_method = res.data.detect_method.split(',')
      })
    },
    saveDetect () {
      if (localStorage.userClass === '2') {
        let obj = {
          detect_setting: JSON.stringify({
            detect_method: this.detect_method.join(','),
            unzip_level: this.decompressionLevel,
            warning_level: '',
            detect_type: JSON.stringify(this.detectFileTypeCheckList.join(',')),
            // storage_level: this.saveLevel,
            // storage_time: this.storeTime,
            log_time: 6,
            type_list: ['PE', 'ELF', 'OFFICE', 'ZIP', 'TEXT']
          })
        }
        this.$api.post('detect_setting', obj).then((res) => {
          if (res.status === 200) {
            this.$message({
              message: res.message,
              type: 'success'
            })
            this.detect_setting()
          } else {
            this.$message.error(res.message)
          }
        })
      } else {
        this.$message.warning('您没有此项权限！')
      }
    },
    inputCheck (val, minLimit, maxLimit) {
      this[val] = Number(this[val].toString().replace(/\D/g, ''))
      this[val] = this[val] > maxLimit ? maxLimit : (this[val] < minLimit ? minLimit : this[val])
    }
  },
  mounted () {
    this.detect_setting()
  }
}
</script>
<style scoped="scoped" lang="scss">
  h2 {
    font-size: 1.5rem;
    color: $textColor;
    border-bottom: 2px solid $borderColor;
  }
  h3 {
    display: block;
    font-size: 1rem;
    margin-top: 1rem;
    color: $textColor;
    /*border-bottom: 1px solid $borderColor;*/
  }
  figure {
    margin: 0 0 1rem;
    >div {
      margin: .5rem 0;
      border: 1px solid #d8d8d8;
      padding: 1rem;
      >div {
        margin: .2rem 0;
      }
    }
  }
  .inputDiv {
    display: flex;
    align-items: center;
    span {
      min-width: 9rem;
    }
    .input {
      width: auto;
      margin-right: .5rem;
    }
  }
  input {
    height: 38px;
    line-height: 38px;
    border: 1px solid $borderColor;
    border-radius: 4px;
    margin: 0 .5rem 0 0;
    text-align: center;
  }
  input:disabled {
    background-color: #f5f7fa;
    border: 1px solid #3a537e;
    color: #c0c4cc;
    cursor: not-allowed;
  }
  .detectFile {
    .add-tag {
      position: relative;
      top: 1px;
      display: inline-block;
      padding: 0 1rem;
      height: 32px;
      line-height: 30px;
      img {
        position: relative;
        height: .7rem;
        cursor: pointer;
      }
      input {
        position: relative;
        font-size: 0.8rem;
        padding: 0 7px;
        width: 250px;
        height: auto;
        line-height: normal;
        border: none;
        margin: auto;
        text-align: left;
        border-radius: 0;
      }
    }
  }
</style>
<style>
  .timing-send {
    border: 1px solid #3a537e;
    border-radius: 4px;
  }
  .allCheckBtn .el-checkbox-button__inner {
    border-radius: 4px !important;
  }
  .DetectionSetting .el-radio-button__inner {
    padding: 8px 12px;
  }
</style>
