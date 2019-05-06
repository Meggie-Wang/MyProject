<template>
  <div id="login">
    <div class="logo-img">
      <img :src="$img.logo">
    </div>
    <div class="login-con">
      <div class="el-input el-input--prefix">
        <input
        type="text"
        name="userName"
        class="el-input__inner"
        placeholder="用户名"
        v-model="userName"
        autocomplete="off"
        @keyup.enter="loginAct">
        <span class="el-input__prefix">
          <img src="../assets/img/loginUser.png" slot="prefix">
        </span>
      </div>
      <div class="el-input el-input--prefix">
        <input
        type="password"
        name="userName"
        class="el-input__inner"
        placeholder="密码"
        v-model="pwd"
        autocomplete="new-password"
        @keyup.enter="loginAct">
        <span class="el-input__prefix">
          <img src="../assets/img/loginPwd.png" slot="prefix">
        </span>
      </div>
      <el-button class="__btn __btn-info" @click="loginAct">
        <i class="el-icon-loading" v-if="loging"></i>
        <span class="__handCursor">登&nbsp;录</span>
      </el-button>
      <p class="err-event">{{err}}</p>
    </div>
  </div>
</template>

<script>
export default{
  name: 'login',
  data () {
    return {
      userName: '',
      pwd: '',
      err: '',
      loging: false
    }
  },
  watch: {
    userName (val) {
      this.userName = this.$common.inputTest(val, 0)
    },
    pwd (val) {
      this.pwd = this.$common.inputTest(val, 0)
    }
  },
  methods: {
    loginAct () {
      this.err = ''
      if (this.userName && this.pwd && this.err === '') {
        this.loging = true
        this.$api.post('login', {
          userName: this.userName,
          pwd: this.$sha256(this.pwd)
        }).then((res) => {
          this.loging = false
          if (res.status === 200) {
            // 存储token
            localStorage.setItem(localStorage.tokenName + '_token', res.data.token)
            // 用户id
            localStorage.setItem('session_id', res.data.session_id)
            localStorage.setItem('userName', res.data.name)
            // 跳转
            this.$router.push({'path': '/Main'})
          } else {
            this.err = res.message
          }
        }).catch(() => {
          this.loging = false
        })
      } else {
        this.err = '账号密码需要填写完整'
      }
    }
  }
}
</script>

<style scoped="scoped" lang="scss">
  #login{
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    .logo-img {
      text-align: center;
      img {
        max-height: 150px;
      }
    }
    .login-con {
      width: 80%;
      max-width: 400px;
      min-width: 200px;
      margin: 10% auto 0;
      border-radius: 10px;
      text-align: center;
      background: $bgColor-opacity;
      padding: 2.3rem 0;
      .el-input {
        width: 75%;
        margin-bottom: 3%;
        input {
          color: $textColor;
          padding-left: 45px;
          background: $bgColor;
          border-radius: 2px;
          box-shadow: 1px 1px 5px #333 inset;
        }
        input::-webkit-input-placeholder {
          color: $textColor;
        }
        .el-input__prefix {
          left: 10px;
          display: flex;
          align-items: center;
          img{
            width: 80%;
          }
        }
      }
      button {
        width: 75%;
        border: none;
        padding: 13px;
        color: $textColor;
        background: $bgColor;
        box-shadow: 1px 1px 10px #333;
        border-radius: 4px;
      }
      .err-event {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        font-size: 14px;
        margin-top: .3rem;
        color: red;
      }
    }
  }
</style>
