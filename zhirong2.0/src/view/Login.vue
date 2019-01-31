<template>
  <div id="login">
    <div class="login-con">
      <div class="logo-img">
        <img :src="$img.logo">
      </div>
      <header class="login-titile">登录</header>
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
          <img src="../assets/img/user.png" slot="prefix">
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
          <img src="../assets/img/pwd.png" slot="prefix">
        </span>
      </div>

      <button class="__btn __btn-info" @click="loginAct">
        <i class="el-icon-loading" v-if="loging"></i>
        <span class="__handCursor">登录</span>
      </button>

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
          // console.log(res)
          if (res.status === 200) {
            // 存储token
            localStorage.setItem(localStorage.tokenName + '_token', res.data.token)
            // 用户id
            localStorage.setItem('session_id', res.data.session_id)
            localStorage.setItem('userName', res.data.name)
            localStorage.setItem('userClass', res.data.userClass)
            localStorage.setItem('editAuth', 0)
            this.$store.commit('setAuthEdit', 0)
            // 用户分类
            let userClass = res.data.userClass
            // 分类用户跳转
            switch (Number(userClass)) {
              case 1:
                // 审计
                this.$router.push({path: '/UserLog'})
                break
              case 2:
                localStorage.setItem('editAuth', 1)
                this.$store.commit('setAuthEdit', 1)
                // 管理员
                switch (localStorage.tokenName) {
                  case 'zhirong':
                  case 'guoan':
                  case 'gtd':
                    this.$router.push({path: '/UserList'})
                    break
                  case 'cncert':
                    this.$router.push({path: '/Main'})
                    break
                }
                break
              case 3:
                // 普通
                switch (localStorage.tokenName) {
                  case 'zhirong':
                  case 'guoan':
                  case 'gtd':
                    localStorage.setItem('editAuth', 1)
                    this.$store.commit('setAuthEdit', 1)
                    break
                  case 'cncert':
                    localStorage.setItem('editAuth', 0)
                    this.$store.commit('setAuthEdit', 0)
                    break
                }
                this.$router.push({path: '/Main'})
                break
              case 4:
                // 普通
                this.$router.push({path: '/index'})
                break
            }
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
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-con {
  text-align: center;
  max-width: 400px;
  min-width: 200px;
  width: 40%;
  padding: 0 0 1rem;
  background-color: rgba(255, 255, 255, .2);
  box-sizing: border-box;
  border-radius: 5px;
  overflow: hidden;
 .logo-img {
  box-sizing: border-box;
  padding: 14px 0;
  background-color: rgba(255, 255, 255, .3);
  img {
    max-width: 70%;
    height: 50px;
  }
 }
 header {
  color: #d8d8d8;
  font-size: 1.2rem;
  margin: .5rem 0;
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
 .err-event {
  font-size: .8rem;
  color: red;
  margin: .6rem 0;
 }
 button {
  width: 90%;
  padding: 10px;
  background-color: #3a537e;
  color: #fff;
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, .5);
 }
}
</style>
