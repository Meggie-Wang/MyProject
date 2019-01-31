<template>
  <div class="UserList">
    <div>
      <myHeader :title="$route.meta.title"></myHeader>
      <div class="ul-list-style">
        <ul>
          <li>用户名</li>
          <li>创建时间</li>
          <li>用户类型</li>
          <li>在线状态</li>
          <!-- <li>操作</li> -->
        </ul>
        <ul v-for="(item, index) in LogList" :key="index">
          <li>{{item.name}}</li>
          <li>{{item.create_time}}</li>
          <li>{{item.user_group}}</li>
          <li>
            <span v-if="item.is_online">在线</span>
            <span v-else>离线</span>
          </li>
          <!-- <li>
            <span @click="resetbtn(item.name)" class="resetPassword">重置密码</span>
          </li> -->
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'UserList',
  data () {
    return {
      LogList: [],
      visible2: false,
      setInterval: null
    }
  },
  methods: {
    // // 重置密码按钮
    // resetbtn (name) {
    //   this.$confirm('此操作将重置密码, 是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     this.resetpwd(name)
    //   }).catch(() => {
    //   })
    // },
    // 确认重置
    // resetpwd (name) {
    //   this.$api.get('reset_pwd', {
    //     username: name
    //   }).then(res => {
    //     if (res.status === 200) {
    //       this.$message({
    //         message: res.message,
    //         type: 'success'
    //       })
    //     } else {
    //       this.$message.error(res.message)
    //     }
    //   })
    // },
    // 请求数据
    init () {
      this.$api.get('userstatus').then(webkitDep => {
        this.LogList = webkitDep.result
      })
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<style scoped="scoped">
  .UserList {
    color: rgb(52,82,126);
  }
  .ul-list-style {
    width: 80%;
    margin: 1rem auto;
  }
  .ul-list-style ul {
    height: 2.8rem;
    width: 100%;
    font-weight: bolder;
    color: rgb(52,82,126);
    display: flex;
    text-align: center;
    overflow: hidden;
  }
  .ul-list-style ul li {
    float: left;
    line-height: 2.5rem;
    width: calc(25% - 4px);
    margin: .1rem .1rem;
    border:1px solid rgb(52,82,126);
    border-radius: 5px;
  }
  .resetPassword:hover {
    cursor:pointer;
  }
</style>
