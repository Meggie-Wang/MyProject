<template>
  <div class="upload-act __text-center">
    <section v-if="fileList.length">
      <div>
        <span>待检测文件:</span>
      </div>
      <div>
        <ul>
          <li
            v-for="(i, j) in fileList"
            :key="j"
            :ref="i.name">
            {{i.name}}
          </li>
        </ul>
      </div>
      <el-progress
      :percentage="progress"
      color="#029376"></el-progress>
    </section>
    <el-badge :value="fileList.length" class="item btn-upload">
      <label for="uploadAct" class="__handCursor">上传文件</label>
      <label for="uploadActs" class="__handCursor">上传文件夹</label>
    </el-badge>
    <form ref="formContainer">
      <!-- 多文件上传 -->
      <input
      type="file"
      id="uploadAct"
      directory
      multiple="multiple"
      hidden
      @change="changeFiles($event)"/>
      <!-- 文件夹上传 -->
      <input
      type="file"
      id="uploadActs"
      directory
      webkitdirectory
      hidden
      @change="changeFiles($event)"/>
    </form>

    <div class="tip">
      <p>注：可选多个样本文件或样本目录</p>
      <p>文件名只能包含数字, 英文, 中划线'-', 下划线'_', 点'.'，批量提交检测任务; 文件大小不能超过10M</p>
    </div>

    <div class="start-detact" v-if="showStartDetect">
      <button
        class="__btn __btn-big"
        @click="startDetect">查看检测</button>
    </div>

    <!-- 显示文件上传问题文件 -->
    <div class="err-list" v-if="errFileList.length">
      <table>
        <thead>
          <tr>
            <th>文件名</th>
            <th>MD5</th>
            <th>提示信息</th>
            <th v-if="reoperat">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in errFileList" :key="index">
            <td>{{ item.name }}</td>
            <td>{{ item.enName }}</td>
            <td>{{ item.errVal }}</td>
            <td
              v-if="reoperat">
              <span class="reUpload" :style="{'background': item.check ? 'transparent' : '#ccc', 'border-style': item.operat === '重新检测' ? 'solid' : '', 'cursor': item.operat === '重新检测' ? 'pointer' : ''}" @click="reUpload(item.operat, item.enName, index)">{{ item.operat }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default{
  name: 'uploadact',
  props: ['method', 'apiPath', 'jumpPath'],
  data () {
    return {
      fileList: [],
      errFileList: [],
      fileListNum: 0,
      progress: 0,
      alreadyUpload: [],
      smapleAlreadyUploadMsg: [
        '样本已经检测过',
        '样本检测失败过',
        '样本正在检测'
      ],
      showStartDetect: false,
      reoperat: true
    }
  },
  watch: {
    fileList (cur, old) {
      if (cur.length === 0) {
        this.$refs.formContainer.reset()
      }
    }
  },
  methods: {
    changeFiles (e) {
      this.fileList = []
      this.alreadyUpload = []
      this.errFileList = []
      let files = e.target.files
      this.fileListNum = 0
      // 存储这个files为数组，为了方便之后删除上传完成的显示问题，和取消上传操作
      for (let i in files) {
        if (i !== 'length' && i !== 'item') {
          // vertify files[i].name && 文件大小不能超过10M
          if (this.$common.fileName(files[i].name) && files[i].size <= 10485760) {
            this.fileList.push(files[i])
            ++this.fileListNum
          } else {
            if (this.$common.fileName(files[i].name)) {
              this.errFileList.push({
                name: files[i].name,
                enName: '无',
                errVal: '文件大小不能超过10M',
                operat: '无',
                check: true
              })
            } else {
              if (files[i].size <= 10485760) {
                this.errFileList.push({
                  name: files[i].name,
                  enName: '无',
                  errVal: '文件名不符合标准',
                  operat: '无',
                  check: true
                })
              } else {
                this.errFileList.push({
                  name: files[i].name,
                  enName: '无',
                  errVal: '文件名不符合标准，大小超过10M',
                  operat: '无',
                  check: true
                })
              }
            }
          }
        }
      }
      if (this.fileList.length) {
        this.uploadBtn()
      }
    },
    uploadBtn () {
      let _flag = 0
      let files = this.fileList
      let uploadAct = () => {
        if (_flag < this.fileListNum) {
          let fd = new FormData()
          fd.append('file', files[0])
          fd.append('session_id', localStorage.session_id)
          fd.append('submit_user', localStorage.userName)
          fd.append('token', localStorage[localStorage.tokenName + '_token'])
          let config = {
            timeout: 40000,
            onUploadProgress: progressEvent => {
              let complete = (progressEvent.loaded / progressEvent.total * 100 | 0)
              this.progress = complete
            }
          }
          this.$api.upload(this.apiPath, fd, config).then((res) => {
            if (res) {
              // accoding to res.status is already upload
              // if (res.status === 402) {
              //   this.alreadyUpload.push({
              //     name: files[0].name,
              //     id: res.ret.id,
              //     msg: this.smapleAlreadyUploadMsg[res.ret.code - 1],
              //     code: res.ret.code,
              //     detect_result: res.ret.detect_result ? res.ret.detect_result : -1,
              //     finish_time: res.ret.finish_time ? res.ret.finish_time : 0,
              //     gene_path: res.ret.gene_path ? res.ret.gene_path : 0
              //   })
              // } else if (res.status === 401) {
              //   return
              // }
              if (this.apiPath !== 'handleUpload') {
                this.reoperat = false
              } else {
                this.reoperat = true
              }
              if (res.status !== 200) {
                this.errFileList.push({
                  name: files[0].name,
                  enName: res.ret ? res.ret.md5 : '',
                  errVal: res.message,
                  operat: res.ret.code === 1 ? '重新检测' : '无',
                  check: true
                })
              } else {
                this.errFileList.push({
                  name: files[0].name,
                  enName: res.md5 || '',
                  errVal: res.message,
                  operat: '无',
                  check: true
                })
              }
            } else {
              // this.fileListNum = files.length
              // 上传失败后，递归调用
              // 为什么递归整个函数
              // this.uploadBtn()
              // uploadAct()
              this.errFileList.push({
                name: files[0].name,
                enName: '',
                errVal: res.message
              })
            }
            // del success item
            files.splice(0, 1)
            // next act
            this.progress = 0
            _flag++
            uploadAct()
          })
        } else {
          this.progress = 0
          this.fileListNum = files.length
          this.showStartDetect = true // 显示查看按钮
          if (this.jumpPath === 'GeneQueue') {
            this.$api.get('detect_analysis')
          } else {
            // this.$router.push({path: '/' + this.jumpPath})
          }
          // if (this.alreadyUpload.length === 0) {
          //   this.stratDetect()
          // }
        }
      }
      uploadAct()
    },
    checkResult (md5) {
      // let testResult = -1
      // switch (detectResult) {
      //   case 0:
      //     testResult = '非恶意性'
      //     break
      //   case 1:
      //     testResult = '恶意性'
      //     break
      //   case 2:
      //     testResult = '恶意性'
      //     break
      //   case 3:
      //     testResult = '恶意性'
      //     break
      //   case -1:
      //     testResult = ''
      // }
      // 跳转到报告页面
      this.$router.push({
        path: '/SampleReport',
        query: {
          md5: md5
        }
      })
    },
    reUpload (operat, md5, index) {
      if (operat === '重新检测') {
        if (this.errFileList[index].check) {
          this.$api.get('redetect', {
            sample_md5_list: '["' + md5 + '"]'
          })
          this.errFileList[index].check = false
        }
      }
    },
    startDetect () {
      this.$router.push({path: '/' + this.jumpPath})
    }
  }
}
</script>
<style scoped="scoped">
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    font-size: .8rem;
  }
  ul > li:first-child {
    color: #3399f3;
  }
  section {
    display: flex;
    margin: 2rem auto;
    max-width: 70%;
    max-height: 5rem;
  }
  section > div {
    flex: 1;
  }
  section > div:first-child {
    color: #029376;
    font-size: 1.1rem;
    line-height: 1.1rem;
    font-weight: bold;
  }
  section > div:nth-child(2) {
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
  }
  .btn-upload label {
    display: inline-block;
    width: 10rem;
    padding: 1rem;
    box-sizing: border-box;
    font-size: 1.3rem;
    line-height: 1.5rem;
    color: #fff;
    box-shadow: 0px 7px 15px 0px rgba(0,0,0,.7);
  }
  .btn-upload label:first-of-type {
    margin-right: 1rem;
    border-radius: 4.9rem 0 0 4.9rem;
  }
  .btn-upload label:last-of-type {
    border-radius: 0 4.9rem 4.9rem 0;
  }
  .tip {
    margin-top: 2rem;
    font-size: .8rem;
    color: white;
  }
  .tip > p:first-child {
    margin-bottom: .3rem;
  }
  .start-detact {
    margin: 1rem 0;
  }
  .err-list {
    color: #fff;
    font-size: .8rem;
    margin-top: 1rem;
  }
  .err-list > table {
    width: 100%;
  }
  .err-list > table th, .err-list > table td {
    border: 1px solid #fff;
    box-sizing: border-box;
    padding: 3px 10px;
    text-align: center;
  }
  .reUpload {
    display: inline-block;
    border-width: 1px;
    border-color: #ccc;
    border-radius: 5px;
    padding: 2px 5px;
    box-sizing: border-box;
    white-space: nowrap;
  }
</style>
