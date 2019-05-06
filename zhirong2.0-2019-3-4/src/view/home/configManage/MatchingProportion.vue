<template>
  <div id="MatchingProportion">
    <div class="MatchingProportion">
      <div class="MatchingProportion-img">
        <img :src="$img.batchUploadBg">
      </div>
      <div class="container">
        <div class="size">
          <span>检测文件大小上限</span>
          <el-input type="text" v-model="size" onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')"></el-input>
          <el-select v-model="unit">
            <el-option
              v-for="item in unitOption"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="unit">
          <span>家族相似比例</span>
          <el-input type="text" v-model="percentage" onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')"></el-input>
          <span class="percentage">%</span>
          <span class="percentageTip">请输入40%~80%</span>
        </div>
        <div class="button">
          <el-button @click="setFileMatch">提交</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      size: '0',
      unit: 'M',
      unitOption: [
        {
          label: 'M',
          value: 'M'
        },
        {
          label: 'K',
          value: 'K'
        }
      ],
      percentage: '0'
    }
  },
  mounted () {
    this.getFileMatch()
  },
  methods: {
    getFileMatch () {
      this.$api.get('getFileMatch').then((res) => {
        this.size = res.data.limit_size.substring(0, res.data.limit_size.length - 1)
        this.unit = res.data.limit_size.substring(res.data.limit_size.length - 1)
        this.percentage = res.data.gene_rate.split('%')[0]
      })
    },
    setFileMatch () {
      let setMatchObj = {
        size: this.size + this.unit,
        rate: this.percentage + '%'
      }
      if (Number(this.size).toFixed(1) !== 0 && Number(this.size) >= 0 && Number(this.percentage) >= 40 && Number(this.percentage) <= 80) {
        this.size = Number(this.size).toFixed(1)
        this.percentage = Number(this.percentage)
        this.$api.get('setFileMatch', {size: setMatchObj.size, rate: setMatchObj.rate}).then((res) => {
          if (res.status === 200) {
            this.$message({
              type: 'success',
              message: res.message,
              duration: 2000
            })
          } else {
            this.$message({
              type: 'warning',
              message: res.message,
              duration: 2000
            })
          }
        })
        this.getFileMatch()
      } else {
        this.$message({
          type: 'warning',
          message: '请正确输入',
          duration: 2000
        })
      }
    }
  }
}
</script>
<style scoped>
  .MatchingProportion {
    width: 60%;
    margin: 0 auto;
  }
  .MatchingProportion-img {
    width: 70%;
    margin: 0 auto 1rem;
    padding-top: 10%;
  }
  .MatchingProportion-img img {
    width: 100%;
  }
  .container > div {
    margin-bottom: 5%;
  }
  .container > div span:first-of-type {
    display: inline-block;
    width: 25%;
    font-size: .8rem;
    color: #fff;
  }
  .percentageTip {
    color: #fff;
  }
  .percentage {
    position: absolute;
    margin-left: -3%;
    margin-top: 5px;
  }
  .button {
    text-align: center;
  }
  .el-input {
    display: inline;
  }
</style>
