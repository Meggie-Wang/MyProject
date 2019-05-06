<template>
  <div class="upload-con">
    <div class="upload-overlay" @click="hideUpd"></div>
    <div class="upload-main">
      <el-steps :active="active" finish-status="success">
        <el-step title="基本信息"></el-step>
        <el-step title="上传文件"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>

      <section>
        <figure v-if="active === 1">
          <el-form
            ref="form"
            :model="sizeForm"
            label-width=""
            size="mini">
            <el-form-item label="软件版本号（选填）">
              <el-input
                v-model="sizeForm.software_version"
                @change="removeSpace('software_version')"></el-input>
            </el-form-item>
            <el-form-item label="软件类型（选填）">
              <el-input
                v-model="sizeForm.software_type"
                @change="removeSpace('software_type')"></el-input>
            </el-form-item>
            <el-form-item label="软件描述（选填）">
              <el-input
                v-model="sizeForm.software_describe"
                @change="removeSpace('software_describe')"></el-input>
            </el-form-item>
            <el-form-item label="软件开发商（选填）">
              <el-input
                v-model="sizeForm.software_developer"
                @change="removeSpace('software_developer')"></el-input>
            </el-form-item>
            <el-form-item label="漏洞编号（选填）" v-if="router === 'right'">
              <el-input
                v-model="sizeForm.bugNo"
                @change="removeSpace('bugNo')"></el-input>
            </el-form-item>
          </el-form>
        </figure>

        <figure v-if="active === 2" class="__text-center upd-con-main">
          <UploadFile
            :btnImg="$img.upload"
            uploadApi="uploadsoftware"
            :idStr="idStr"
            :params="sizeForm"
            @progress="listenProgress"
            @callback="uploadFile" />
          <el-progress
            v-if="progress"
            :percentage="progress"></el-progress>
        </figure>

        <figure v-if="active === 3">
          完成
        </figure>

      </section>

      <section class="__text-center">
        <el-button size="mini" @click="active = 2" v-if="active === 1">下一步</el-button>
        <el-button size="mini" @click="active = 1" v-if="active === 2">上一步</el-button>
        <el-button size="mini" @click="hideUpd">取消</el-button>
      </section>

    </div>
  </div>
</template>
<script>
export default {
  name: 'upload',
  props: ['router', 'params', 'idStr'],
  data () {
    return {
      active: 1,
      progress: 0,
      sizeForm: {
        software_version: '',
        software_type: '',
        software_describe: '',
        software_developer: '',
        bugNo: this.params ? this.params.bugNo : ''
      },
      software_version: '',
      software_type: '',
      software_describe: '',
      software_developer: '',
      bugNo: this.params ? this.params.bugNo : ''
    }
  },
  watch: {

  },
  methods: {
    next () {
      if (this.active++ > 2) this.active = 0
    },
    listenProgress (progress) {
      this.progress = progress
    },
    uploadFile (e) {
      this.$message({
        type: e.status === 200 ? 'success' : 'warning',
        message: e.message
      })
      this.progress = 0
      this.active = 3
      this.hideUpd()
    },
    hideUpd () {
      this.$emit('hideUpd')
    },
    removeSpace (key) {
      this.sizeForm[key] = this.sizeForm[key].replace(/(^\s*)|(\s*$)/g, '')
    }
  }
}
</script>
<style scoped="scoped" lang="scss">
  .upload-con {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
    height: 100%;
    width: 100%;
    .upload-overlay {
      position: absolute;
      z-index: 999;
      height: 100%;
      width: 100%;
      background-color: rgba(0, 0, 0, .5);
    }
    .upload-main {
      position: absolute;
      top: 100px;
      left: calc(50% - 200px);
      z-index: 9999;
      width: 400px;
      background-color: #fff;
      box-sizing: border-box;
      padding: 2rem;
      border-radius: 5px;
      .upd-con-main {
        box-sizing: border-box;
        padding: 2rem 0;
      }
    }
  }
</style>
<style lang="scss">
  .el-step__head { display: flex; }
  .el-step.is-horizontal .el-step__line {
    left: 24px;
  }
  .el-form-item--mini.el-form-item {
    margin-bottom: .5rem;
    .el-input {
      box-sizing:border-box;
      border: 1px solid #333;
      border-radius: 4px;
    }
  }
</style>
