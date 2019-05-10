<template>
  <div class="adminSidebar">
    <div class="adminSidebar-con">
      <el-menu
        v-if="userClass === '2' || userClass === '5'"
        class="el-menu-vertical-demo"
        router
        background-color="#315697"
        text-color="#d8d8d8"
        active-text-color="#315697"
        :unique-opened=true
        :default-active="$route.path"
        @select="select">
        <el-menu-item index="/DeviceStatus" :class="currentRoute === '0' ? 'Active' : ''">
          <template slot="title">
            <i class="el-icon-one"></i>
            <span>设备管理</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/TrafficSetting" :class="currentRoute === '1' ? 'Active' : ''">
          <template slot="title">
            <i class="el-icon-two"></i>
            <span>检测管理</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/UserList">
          <template slot="title">
            <i class="el-icon-three"></i>
            <span>用户管理</span>
          </template>
        </el-menu-item>
      </el-menu>
      <el-menu
        v-if="userClass === '1'"
        class="el-menu-vertical-demo auditClass"
        router
        background-color="#315697"
        text-color="#d8d8d8"
        active-text-color="#315697"
        :unique-opened=true
        :default-active="$route.path">
        <el-menu-item index="/UserLog">
          <template slot="title">
            <i class="el-icon-UserLog"></i>
            <span>用户日志</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/EventLog">
          <template slot="title">
            <i class="el-icon-EventLog"></i>
            <span>事件记录</span>
          </template>
        </el-menu-item>
      </el-menu>
      <div class="logout-con">
        <label class="__handCursor">
          <span>{{ userName }}</span>
          <img :src="$img.userLog">
        </label>
        <label
          class="__handCursor"
          @click="logout">
          <span>退出</span>
          <img :src="$img.logout">
        </label>
      </div>
    </div>
    <AdminHeader class="adminHeader-router" :routers="routers"/>
  </div>
</template>
<script>
export default {
  name: 'adminSidebar',
  data () {
    return {
      userName: localStorage.userName,
      userClass: localStorage.userClass,
      routers: [],
      currentRoute: ''
    }
  },
  watch: {
    $route (to, from) {
      if (to.path === '/DeviceStatus' || to.path === '/NetworkConfig' || to.path === '/WhiteList' || to.path === '/ResourceClear' || to.path === '/SystemSetting') {
        this.routers = [
          {
            label: '设备状态',
            path: '/DeviceStatus'
          },
          {
            label: '网络配置',
            path: '/NetworkConfig'
          },
          {
            label: 'IP白名单设置',
            path: '/WhiteList'
          },
          {
            label: '存储设置',
            path: '/ResourceClear'
          },
          {
            label: '系统管理',
            path: '/SystemSetting'
          }
        ]
        this.currentRoute = '0'
      } else if (to.path === '/TrafficSetting' || to.path === '/DetectionSetting' || to.path === '/ReportSetting' || to.path === '/AlarmInfoSetting') {
        this.routers = [
          {
            label: '流量设置',
            path: '/TrafficSetting'
          },
          {
            label: '检测设置',
            path: '/DetectionSetting'
          },
          {
            label: '报表管理',
            path: '/ReportSetting'
          },
          {
            label: '告警信息设置',
            path: '/AlarmInfoSetting'
          }
        ]
        this.currentRoute = '1'
      } else if (to.path === '/ReportInfo') {
        this.routers = []
        this.currentRoute = '1'
      } else {
        this.routers = []
        this.currentRoute = ''
      }
    }
  },
  methods: {
    select (val) {
      if (val === '/DeviceStatus' || val === '/NetworkConfig' || val === '/WhiteList' || val === '/ResourceClear' || val === '/SystemSetting') {
        this.routers = [
          {
            label: '设备状态',
            path: '/DeviceStatus'
          },
          {
            label: '网络配置',
            path: '/NetworkConfig'
          },
          {
            label: 'IP白名单设置',
            path: '/WhiteList'
          },
          {
            label: '存储设置',
            path: '/ResourceClear'
          },
          {
            label: '系统管理',
            path: '/SystemSetting'
          }
        ]
        this.currentRoute = '0'
      } else if (val === '/TrafficSetting' || val === '/DetectionSetting' || val === '/ReportSetting' || val === '/AlarmInfoSetting') {
        this.routers = [
          {
            label: '流量设置',
            path: '/TrafficSetting'
          },
          {
            label: '检测设置',
            path: '/DetectionSetting'
          },
          {
            label: '报表管理',
            path: '/ReportSetting'
          },
          {
            label: '告警信息设置',
            path: '/AlarmInfoSetting'
          }
        ]
        this.currentRoute = '1'
      } else if (val === '/ReportInfo') {
        this.routers = []
        this.currentRoute = '1'
      } else {
        this.routers = []
        this.currentRoute = ''
      }
    },
    logout () {
      this.$api.post('logout').then(res => {
        // 清理localStorage
        localStorage.setItem(localStorage.tokenName + '_token', 'undefined')
        localStorage.setItem('session_id', 'undefined')
        localStorage.setItem('userName', 'undefined')
        // 清理cookie
        // 跳转login
        this.$router.push({path: '/Login'})
      })
    }
  },
  mounted () {
    this.select(this.$route.path)
  }
}
</script>
<style scoped lang="scss">
  .adminSidebar {
    display: flex;
    width: 100%;
    .adminSidebar-con {
      position: relative;
      width: 200px;
      height: 100%;
      .el-menu {
        height: 100%;
        border-right: none;
        padding-top: 2rem;
        box-sizing: border-box;
        .el-menu-item {
          text-align: center;
          i {
            height: 24px;
            background-position: center center;
            background-repeat: no-repeat;
            background-size: cover;
          }
          span {
            font-size: 1rem;
          }
        }
      }
      .logout-con{
        position: absolute;
        bottom: 1rem;
        right: 15%;
        width: 85%;
        text-align: right;
        label{
          display: block;
          margin-top: 10px;
        }
        span{
          color: #fff;
        }
        img {
          width: 1.5rem;
        }
      }
    }
    .adminHeader-router {
      width: calc(100% - 200px);
      height: 100%;
      overflow-y: scroll;
      background: #f1f6ff;
    }
  }
</style>
<style lang="scss">
  .el-icon-one { background-image: url('../../assets/img/adminDevice.png'); }
  .el-icon-two { background-image: url('../../assets/img/adminTraffic.png'); }
  .el-icon-three { background-image: url('../../assets/img/adminUser.png'); }
  .adminSidebar .el-menu-item.is-active {
    background: #f1f6ff!important;
  }
  .el-menu-item:first-of-type.is-active i, .el-menu-item:first-of-type:hover i { background-image: url('../../assets/img/adminDeviceA.png'); }
  .el-menu-item:nth-of-type(2).is-active i, .el-menu-item:nth-of-type(2):hover i { background-image: url('../../assets/img/adminTrafficA.png'); }
  .el-menu-item:last-of-type.is-active i, .el-menu-item:last-of-type:hover i { background-image: url('../../assets/img/adminUserA.png'); }
  .adminSidebar .el-menu-item.is-active span {
    font-weight: bold;
  }
  .adminSidebar .el-menu-item.Active {
    background: #f1f6ff!important;
  }
  .el-menu-item:first-of-type.Active i, .el-menu-item:first-of-type:hover i { background-image: url('../../assets/img/adminDeviceA.png'); }
  .el-menu-item:nth-of-type(2).Active i, .el-menu-item:nth-of-type(2):hover i { background-image: url('../../assets/img/adminTrafficA.png'); }
  .el-menu-item:last-of-type.Active i, .el-menu-item:last-of-type:hover i { background-image: url('../../assets/img/adminUserA.png'); }
  .adminSidebar .el-menu-item.Active span {
    font-weight: bold;
    color: $textColor!important;
  }
  .auditClass .el-icon-UserLog { background-image: url('../../assets/img/Log.png'); }
  .auditClass .el-icon-EventLog { background-image: url('../../assets/img/EventLog.png'); }
  .auditClass .el-menu-item:first-of-type.is-active i, .auditClass .el-menu-item:first-of-type:hover i { background-image: url('../../assets/img/LogA.png'); }
  .auditClass .el-menu-item:nth-of-type(2).is-active i, .auditClass .el-menu-item:nth-of-type(2):hover i { background-image: url('../../assets/img/EventLogA.png'); }
</style>
