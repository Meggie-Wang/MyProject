<template>
  <div class="GeneDetectionSelect">
    <div class="bg" @click="closeSelect"></div>
    <div class="GeneDetectionSelect_container">
      <div class="GeneHead">
        <span>请 选 择</span>
        <span class="el-icon-close close" @click="closeSelect()"></span>
      </div>
      <div class="model __handCursor" :class="model1Selected ? 'is_select' : 'un_select'" @click="modelSelect(1)">
        <div class="selectImg">
          <span @click="modelSelect(1)"></span>
        </div>
        <div class="modelSetting">
          <span>基于漏洞基因库扫描（推荐）</span>
          <div style="display: flex;align-items: center;">
            <div style="width: 200px;">
              <el-slider
              v-model="slider" :disabled="model2Selected"></el-slider>
            </div>
            <span style="margin-left: 1rem;">设置基因相似度 </span>
            <span style="margin-left: .5rem">{{slider}}</span>
          </div>
          <p>选择这种扫描方式，系统将基于漏洞基因库对待查软件进行漏洞检测。这个方式检测效率高，准确率高，命中率较低。用户可通过人工调整基因相似度阈值，获得最佳的检测精准度和命中率。</p>
        </div>
      </div>
      <div class="model __handCursor" :class="model2Selected ? 'is_select' : 'un_select'" @click="modelSelect(2)">
        <div class="selectImg">
          <span @click="modelSelect(2)"></span>
        </div>
        <div class="modelSetting">
          <span>基于漏洞库扫描</span>
          <div style="display: flex;align-items: center;">
            <div style="width: 200px;">
              <el-slider
              v-model="slider2" :disabled="model1Selected"></el-slider>
            </div>
            <span style="margin-left: 1rem;">设置基因相似度 </span>
            <span style="margin-left: .5rem">{{slider2}}</span>
          </div>
          <p>选择这种扫描方式，系统将基于漏洞库对待查软件进行漏洞检测。这个方式命中率高，效率和准确率较低。用户可通过人工调整基因相似度阈值，获得最佳的检测精准度和命中率。</p>
        </div>
      </div>
      <div class="DetectionSelectBTN">
        <el-button @click="AutoDetect">启动检查</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'GeneDetectionSelect',
  data () {
    return {
      slider: 60,
      slider2: 60,
      model1Selected: true,
      model2Selected: false,
      modelselect: {
        model: 1,
        value: 0
      }
    }
  },
  props: ['softId'],
  watch: {
    model1Selected (val) {
      if (val) {
        this.modelselect.model = 1
        this.modelselect.value = this.slider
      }
    },
    model2Selected (val) {
      if (val) {
        this.modelselect.model = 2
        this.modelselect.value = this.slider2
      }
    },
    slider (val) {
      if (val > 0) {
        this.modelselect.model = 1
        this.modelselect.value = this.slider
      }
    },
    slider2 (val) {
      if (val > 0) {
        this.modelselect.model = 2
        this.modelselect.value = this.slider2
      }
    }
  },
  methods: {
    modelSelect (val) {
      if (val === 1) {
        if (!this.model1Selected) {
          this.model1Selected = true
          this.model2Selected = false
        }
      } else if (val === 2) {
        if (!this.model2Selected) {
          this.model1Selected = false
          this.model2Selected = true
          this.modelselect.model = 1
        }
      }
    },
    AutoDetect () {
      this.$emit('closeSelect', true)
      // 启动检测
      // 选择了哪个silder
      let s = this.modelselect.model === 1 ? '1' : '0'
      // 和选中的值
      let v = Number(s) ? this.slider : this.slider2
      this.$api.get('cveSoftAnalysis', {
        analysis_style: s,
        analysis_rate: v / 100,
        soft_id: this.softId,
        analysis_user: localStorage.userName
      }).then(res => {
        // 提交检测后跳转检测列表
        this.$router.push({
          path: '/SoftwareDetectList'
        })
      })
    },
    closeSelect () {
      this.$emit('closeSelect', true)
    }
  }
}
</script>
<style scoped lang="scss">
  .GeneDetectionSelect {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .6);
    display: flex;
    justify-content: center;
    align-items: center;
    .GeneDetectionSelect_container {
      width: 600px;
      z-index: 20;
      .GeneHead {
        text-align: center;
        margin-bottom: 2px;
        background-color: $headerBgColor;
        color: $selectBg;
        border-radius: 4px;
        position: relative;
      }
      .model {
        display: flex;
        margin-bottom: 2px;
        padding: 20px 0;
        border-radius: 4px;
        .selectImg {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 20px;
          > span {
            width: 50px;
            height: 50px;
            border: 2px solid $geneToolSelectBg;
            border-radius: 50%;
          }
        }
        .modelSetting {
          padding: 0 10px;
          p {
            padding: 5px;
            font-size: .8rem;
          }
        }
      }
      .DetectionSelectBTN {
        text-align: center;
        margin-top: 1rem;
        button {
          border: none;
        }
        button:hover {
          color: $greenLight;
        }
      }
    }
  }
  .bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .is_select {
    background-color: $greenLight;
    .selectImg span {
      background: url('../assets/img/select.png') no-repeat;
      background-position: center 9px;
      background-color: $greenLight;
    }
  }
  .un_select {
    background-color: $headerBgColor;
    color: $selectBg;
    .selectImg span {
      background-color: $geneToolSelectBg;
    }
  }
  .close {
    font-size: .5rem;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 2%;
    cursor: pointer;
  }
</style>
<style lang="scss">
  .el-slider__button {
    border: none;
    background-color: $greenLight;
    box-shadow: 0 2px 2px #333;
  }
  .el-slider__runway.disabled .el-slider__button {
    background-color: $headerBgColor;
  }
</style>
