<template>
  <div class="TrafficSetting">
    <header><h2>旁路检测策略</h2></header>
    <figure>
      <label><h3>选择旁路协议</h3></label>
      <div style="display: flex;align-items: center;">
        <el-checkbox-group v-model="protocolSelect">
          <el-checkbox-button
            v-for="(i, j) in protocolSelectList"
            :label="i"
            :key="j">
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
      <el-button @click="saveBro()">保存</el-button>
    </figure>
  </div>
</template>
<script>
export default {
  name: 'Tatics',
  data () {
    return {
      protocolSelect: [],
      protocolSelectList: ['HTTP', 'FTP', 'POP3', 'SMTP', 'SMB/CIFS'],
      savePosition: 0,
      saveRatio: 0,
      start_time: 0,
      end_time: 24,
      userClass: localStorage.userClass,
      allCheck: false
    }
  },
  watch: {
    protocolSelect (val) {
      if (val.length === this.protocolSelectList.length) {
        this.allCheck = true
      } else {
        this.allCheck = false
      }
    }
  },
  methods: {
    allCheckFunc () {
      if (this.allCheck) {
        this.protocolSelect = ['HTTP', 'FTP', 'POP3', 'SMTP', 'SMB/CIFS']
      } else {
        this.protocolSelect = []
      }
    },
    bro_setting () {
      this.$api.get('bro_setting').then((res) => {
        this.protocolSelect = res.data.bro_protocol === '' ? [] : res.data.bro_protocol.split(',')
        // this.savePosition = res.data.bro_storage.split('M')[0]
        // this.saveRatio = res.data.warning_rate.split('%')[0]
      })
    },
    saveBro () {
      let obj = {
        bro_setting: JSON.stringify({
          bro_protocol: this.protocolSelect.join(','),
          bro_detect: '',
          bro_time: this.start_time + '-' + this.end_time,
          bro_storage: this.savePosition + 'M',
          warning_rate: this.saveRatio + '%'
        })
      }
      this.$api.post('bro_setting', obj).then((res) => {
        if (res.status === 200) {
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.bro_setting()
        } else {
          this.$message.error(res.message)
        }
      })
    }
    // inputCheck (val, minLimit, maxLimit) {
    //   this[val] = Number(this[val].toString().replace(/\D/g, ''))
    //   this[val] = this[val] > maxLimit ? maxLimit : (this[val] < minLimit ? minLimit : this[val])
    // },
    // inputTimeCheck (val, minLimit, maxLimit) {
    //   this[val] = Number(this[val].toString().replace(/\D/g, ''))
    //   this[val] = this[val] > maxLimit ? maxLimit : (this[val] <= minLimit ? minLimit : this[val])
    // }
  },
  mounted () {
    this.bro_setting()
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
    /*font-weight: normal;*/
    color: $textColor;
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
    margin: 0 .5rem ;
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
</style>
