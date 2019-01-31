<style scoped>
  .detection {
    width: 80%;
    margin: 5% auto;
  }
  .detection_img {
    width: 40%;
    margin: 0 auto;
  }
  img {
    width: 100%;
  }
  .detection_file {
    position: relative;
    width: 50%;
    margin: 2% auto;
  }
  .upload {    
    width: 300px;
    margin: 0 auto;
  }
  .el-button {
    margin: 1% auto;
    width: 300px;
    color: #fff;
    border-radius: 25px;
    background: #169275;
  }
  .upload p {
    font-size: 14px;
    margin-top: 1%;
    text-align: center;
    line-height: 20px;
  }
  .upload p > a {
    color: #169275;
    font-weight: bold;
  }
  .upload span {
    display: block;
    color: #F0816F;
    font-size: 10px;
    line-height: 18px;
    text-align: center;
    margin-top: 3%;
  }
</style>
<style>
  .el-upload-list {
    min-height: 10px;
  }
</style>
<template>
  <div class="detection">
    <div class="detection_img">
      <img src="../../../static/img/search_bg.png">
    </div>
    <div class="detection_file">
      <div class="upload">
        <!-- upload -->
        <el-upload
          class="upload-demo"
          ref="upload"
          action=""
          :on-remove="handleRemove"
          :before-upload="beforeUpload"
          :file-list="fileList"
          :auto-upload="true"
          :limit="20"
          :multiple="false">
          <el-button>{{ $t('messages.geneDetection.startDetection') }}</el-button>
        </el-upload>
        <p>{{ $t('messages.geneDetection.geneDetTipone') }}<router-link to='/login'>{{ $t('messages.geneDetection.geneDetTiptwo') }}</router-link>{{ $t('messages.geneDetection.geneDetTipthree') }}</p>
        <span>{{ uploadTips }}</span>
        <!-- upload -->
      </div>
    </div> 
  </div>
</template>
<script>
import api from '../../api/ipApi'
import { Loading } from 'element-ui'
export default {
  data () {
    return {
      fileList: [],
      maxSize: '',
      index: '',
      uploadTips: ''
    }
  },
  methods: {
    delete (fileList) {
      this.index = fileList.length - 1
      fileList.splice(this.index, 1)
    },
    submitUpload () {
      this.$refs.upload.submit()
      this.$router.push({path: '/detQueue'})
    },
    handleRemove (file, fileList) {
    },
    getCookie(name) {
      var cookieValue = null;
      if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';')
        for (var i = 0; i < cookies.length; i++) {
          var cookie = jQuery.trim(cookies[i])
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
            break;
          }
        }
      }
      return cookieValue
    },
    beforeUpload (file) {
      // 这里是重点，将文件转化为formdata数据上传
      var token = this.$options.methods.getCookie('token_virus')
      this.maxSize = file.size
      if (this.maxSize > 5242880) {
        this.uploadTips = file.name + '上传失败！请选择小于5M以下文件'
      } else {
        let fd = new FormData()
        fd.append('file', file)
        fd.append('token', token)
        Loading.service()
        api.postDetectionUp(file.name, fd).then((res) => {
          Loading.service().close()
          if (res.data.status === 0) {
            this.$router.push({path: '/login'})
            document.cookie = 'token_virus=' + escape('')
          } else if (res.data.status === 301) {
            alert(this.$t('messages.login.incorrectErr'))
            this.$router.push({path: '/detection'})
          } else {
            var fileName = file.name
            var filePath = res.data.testPath
            this.fileList.push({name: fileName, path: filePath})
            for (var i = 0; i < this.fileList.length; i++) {
              api.getFileName(this.fileList[i].name, this.fileList[i].path)
            }
            this.submitUpload()
          }
        }).catch(() => {
          Loading.service().close()
          this.uploadTips = file.name + '请求超时！请重新上传或选择其它文件上传'
        })
      }
      return false
    }
  }
}
</script>