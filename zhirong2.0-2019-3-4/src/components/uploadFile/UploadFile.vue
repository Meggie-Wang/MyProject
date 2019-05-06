<template>
  <div class="upload-file">
    <label :for="ids || upload-input">
      <!-- <img :src="btnImg"> -->
      <span>文件上传</span>
    </label>
    <input
      type="file"
      name="upload-input"
      :id="ids || upload-input"
      hidden
      :webkitdirectory="webkitdirectory === 'true' ? true : false"
      :multiple="multiple === 'true' ? true : false"
      @change="uploadBtn($event)">
  </div>
</template>
<script>
/*
  * 本组件接收上传api
  * 上传反馈给父组件
*/
/*
  * * 多个文件上传
  * * 文件夹、多个文件上传
*/
export default {
  name: 'uploadFile',
  props: ['uploadApi', 'ids', 'multiple', 'webkitdirectory'],
  data () {
    return {}
  },
  methods: {
    uploadBtn (e) {
      console.time('upload')
      let _flag = 0

      let files = []
      for (let i in e.target.files) {
        if (e.target.files[i].lastModified) {
          files.push(e.target.files[i])
        }
      }
      let fileListNum = files.length
      let uploadAct = () => {
        if (_flag < fileListNum) {
          let fd = new FormData()
          // 充实需要提交的数据
          fd.append('file', files[0])
          // fd.append('soft_name', files[0].name)
          fd.append('submit_user', localStorage.userName)
          fd.append('token', localStorage[localStorage.tokenName + '_token'])
          // fd = Object.assign(fd, this.params)
          // for (let i in this.params) {
          //   fd.append(i, this.params[i])
          // }
          /*
          @ 上传进度条
          * 根据axios配置中onUploadProgress属性回调函数
          * config虽然属于axios提交方法中参数
          * config的动态，应该属于内存中同一个对象
          * 并且progressNum 属于本组件
          */
          let config = {
            onUploadProgress: progressEvent => {
              let complete = (progressEvent.loaded / progressEvent.total * 100 | 0)
              this.$emit('progress', Number(complete))
            }
          }
          this.$api.upload(this.uploadApi, fd, config).then((res) => {
            if (res) {
              this.$emit('callback', res)
              console.timeEnd('upload')

              // del success item
              files.splice(0, 1)
              _flag++
              uploadAct()
            } else {
              // err color red
              this.$emit('callback', 0)
              console.timeEnd('upload')
            }
          })
        }
      }
      uploadAct()
    }
  }
}
</script>
<style scoped="scoped" lang="scss">
  .upload-file {
    display: inline-block;
    label {
      display: inline-block;
      width: 100%;
      height: 100%;
      span {
        border: 1px solid $borderColor;
        border-radius: 5px;
        padding: 5.5px 12px;
        font-size: 14px;
        margin-right: 10px;
        text-align: center;
        display: block;
        background-color: $bgColor;
        color: white;
        cursor: pointer;
      }
    }
  }
</style>
