<template>
  <div class="BatchUpload">
    <div class="BatchUpload-container">
      <div class="BatchUpload-img">
        <img :src="$img.batchUploadBg">
      </div>
      <div class="copyDatas">
        <ul
        v-for="(i, j) in copyDatas"
        :key="j">
          <li>{{i.name}}</li>
          <li>{{copyAuth ? i.content : i.secret}}</li>
          <li
            v-clipboard:copy="copyAuth ? i.content : i.secret"
            v-clipboard:success="copy">复制</li>
        </ul>
      </div>
      <div class="__text-center">
        <button
        class="__btn __btn-info __btn-big"
        @click="centerDialogVisible = true">验证用户</button>
      </div>

      <el-dialog
        title="验证用户"
        :visible.sync="centerDialogVisible"
        width="400px"
        center>
        <div class="__text-center">

          <div class="el-input el-input--prefix">
            <input
            type="text"
            name="userName1"
            class="el-input__inner"
            placeholder="用户名"
            v-model="userName"
            autocomplete="off"
            @keyup.enter="loginAct">
            <span class="el-input__prefix">
              <img src="../../../assets/img/user.png" slot="prefix">
            </span>
          </div>
          <div class="el-input el-input--prefix">
            <input
            type="password"
            name="pwd2"
            class="el-input__inner"
            placeholder="密码"
            v-model="pwd"
            autocomplete="new-password"
            @keyup.enter="loginAct">
            <span class="el-input__prefix">
              <img src="../../../assets/img/pwd.png" slot="prefix">
            </span>
          </div>

        </div>

        <span slot="footer" class="dialog-footer">
          <button
          class="__btn __btn-info __btn-big"
          @click="centerDialogVisible = false">取 消</button>
          <button
          class="__btn __btn-primary __btn-big"
          @click="loginAct()">确 定</button>
        </span>

      </el-dialog>

      <p style="margin-top: 10px;">
        <i class="el-icon-info"></i>
        <span>批量分析时，单个文件不能超过10MB.</span>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BatchUpload',
  data () {
    return {
      copyDatas: [
        {
          name: 'FTP共享目录地址',
          content: 'ftp://' + (localStorage.tokenName === 'gtd' ? '192.168.1.111' : window.location.hostname),
          secret: 'ftp://' + (localStorage.tokenName === 'gtd' ? '192.168.1.111' : window.location.hostname)
        },
        {
          name: '用户名',
          content: 'ftp',
          secret: '********'
        },
        {
          name: '密码',
          content: 'ftp )P:?9ol.',
          secret: '********'
        }
      ],
      copyAuth: false,
      centerDialogVisible: false,
      userName: '',
      pwd: ''
    }
  },
  methods: {
    copy (content) {
      this.$message({
        message: '复制成功',
        type: 'success'
      })
    },
    loginAct () {
      if (this.userName.length && this.pwd.length && this.userName === localStorage.userName) {
        this.$message({
          message: '验证成功',
          type: 'success'
        })
        this.centerDialogVisible = false
        this.copyAuth = true
      } else {
        this.$message({
          message: '验证有错误',
          type: 'warning'
        })
        this.centerDialogVisible = false
      }
    }
  }
}
</script>
<style scoped lang="scss">
  .BatchUpload-container {
    position: relative;
    width: 60%;
    margin: 0 auto;
    .BatchUpload-img {
      width: 70%;
      margin: 0 auto 1rem;
      padding-top: 10%;
      img {width: 100%;}
    }
    .BatchUpload-input{
      text-align: center;
      padding-top: 5%;
      input {
        width: 100%;
        height: 40px;
        color: #fff;
        border: 1px solid #fff;
        background: transparent;
        text-indent: 20px;
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
      p {
        text-align: center;
        color: #fff;
        font-size: 0.8rem;
      }
    }
    p {
      text-align: center;
      color: #fff;
      font-size: 0.8rem;
    }
    .copyDatas {
      width: 100%;
      margin: 0rem auto 0;
      font-size: 0;
      li {
        display: inline-block;
        text-align: left;
        font-size: .8rem;
        line-height: 40px;
        color: #fff;
        margin-bottom: 1rem;
      }
      li:nth-child(1){
        width: calc(15% + 20px);
      }
      li:nth-child(2){
        width: calc(100% - 30% - 4rem - 42px);
        border: 1px solid #fff;
        border-right: none;
        box-sizing: border-box;
        padding-left: 1rem;
      }
      li:nth-child(3){
        width: 4rem;
        height: 40px;
        border: 1px solid #fff;
        border-left: none;
        text-align: center;
        background-color: rgba(255, 255, 255, .5);
        cursor: pointer;
      }
    }
    .el-input {
      width: 90%;
      margin-bottom: .5rem;
      box-sizing: border-box;
      border-radius: 5px;
      box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, .5) inset;
      background-color: #3a537e;
      img{
        height: 20px;
        margin-top: 10px;
      }
      input {
        background: transparent!important;
        color: #fff!important;
        padding-left: 40px!important;
      }
      .el-input__prefix {
        left: 10px!important;
      }
     }
  }
</style>
