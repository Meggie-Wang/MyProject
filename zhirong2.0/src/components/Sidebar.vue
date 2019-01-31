<template>
  <div class="side-bar">
    <div class="sideBar-container">
      <el-menu
        class="el-menu-vertical-demo"
        router
        @select="sideBarOpen"
        background-color="#315697"
        text-color="#ddd"
        active-text-color="#fff"
        :unique-opened=true
        :default-active="activeIndex">
        <el-menu-item index="/Main">
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/Globe">
          <span slot="title">态势分析</span>
        </el-menu-item>
        <el-submenu index="4">
          <span slot="title">样本管理</span>
          <el-menu-item index="/BatchUpload">批量检测</el-menu-item>
          <el-menu-item index="/FreeUpload">手动检测</el-menu-item>
          <el-menu-item index="/DetectionQueue">检测队列</el-menu-item>
          <el-menu-item index="/DetectionHistory">检测历史</el-menu-item>
          <el-menu-item index="/AnalysisReport">分析报告</el-menu-item>
        </el-submenu>
        <el-submenu index="5">
          <span slot="title">基因分析</span>
          <el-menu-item index="/GeneExtract">基因提取</el-menu-item>
          <el-menu-item index="/GeneQueue">提取队列</el-menu-item>
          <el-menu-item index="/GeneAnalysis">基因分析</el-menu-item>
          <el-menu-item index="/GeneHeatmap">热力图分析</el-menu-item>
          <el-menu-item index="/GeneContrast">聚类分析</el-menu-item>
          <el-menu-item index="/GeneModel">模型管理</el-menu-item>
        </el-submenu>
        <el-menu-item index="/Search">
          <span slot="title">威胁拓线</span>
        </el-menu-item>
        <el-menu-item index="/SoftwareReport">
          <span slot="title">杀软评测</span>
        </el-menu-item>
        <el-submenu index="7">
          <span slot="title">配置管理</span>
          <el-menu-item index="/SystemBasic">系统基本状态</el-menu-item>
          <el-menu-item index="/Resource">资源状态</el-menu-item>
          <el-menu-item index="/Equipment">设备设置</el-menu-item>
          <el-menu-item index="/ReportCof">报表设置</el-menu-item>
        </el-submenu>
      </el-menu>
      <button
      @click="sideBarOpen"
      class="handleButton __handCursor"></button>
    </div>
    <div class="logout-con">
      <label class="__handCursor">
        <span>{{userName}}</span>
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
</template>
<script>
export default {
  name: 'side-bar',
  data () {
    return {
      activeIndex: '/' + location.href.split('/#/')[1].split('?')[0],
      isBackground: false,
      userName: localStorage.userName
    }
  },
  methods: {
    sideBarOpen (index) {
      let _this = this
      // 获取点击后的path
      // PathA -> PathB , 此时的activeIndex 的router名字没有更新，需要手动更新
      // 解决手动上传 -> 队列 -> 手动上传 -> 队列， menu highlight 没有更新
      if (typeof index === 'string') {
        this.activeIndex = index
      }

      // 使得sidebar出现和消失
      let sideBar = document.querySelector('.side-bar')
      let btn = document.querySelector('.handleButton')

      // 点击其他路由位置，使得sidebar消失
      let header = document.querySelector('.header')
      let homeRouter = document.querySelector('.home-router')

      let hideSidebar = () => {
        sideBar.className = 'side-bar act-out'
        btn.className = 'handleButton __handCursor'
        /*
          @ 根据路由判断按钮背景颜色
          - 隐藏菜单时候才去更改
        */
        // 路由到达后才去更改
        /*
          @ 没有切换路由
          - 可直接获取$route对象
        */
        let hideSidebarAct = (isBackground) => {
          if (isBackground) {
            btn.setAttribute('style', 'background-image: url(' + _this.$img.sideBarA + ')')
          } else {
            btn.setAttribute('style', 'background-image: url(' + _this.$img.sideBarB + ')')
          }
        }
        hideSidebarAct(this.$route.meta.isBackground)
        this.$router.afterEach((to, from) => {
          this.isBackground = to.meta.isBackground
          hideSidebarAct(this.isBackground)
        })
      }

      if (sideBar.className === 'side-bar act-out' || sideBar.className === 'side-bar') {
        sideBar.className = 'side-bar act-in'
        btn.className = 'handleButton is-reverse __handCursor'
        btn.setAttribute('style', 'background-image: url(' + _this.$img.sideBarA + ')')

        // 点击其他路由位置
        header.onclick = () => { hideSidebar() }
        homeRouter.onclick = () => { hideSidebar() }
      } else {
        hideSidebar()
      }
    },
    jumpTo (val) {
      this.$router.push({path: '/' + val})
      let componentName = location.href.split('#/')[1].split('?')[0]
      this.isSelect = componentName
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
    // 更新高亮显示
    var self = this
    this.$bus.$on('activeIndex2', function (defaultActive) {
      // 虽然在mounted中，但是跳转页面时候启动bus实例监听，这里是执行的
      self.activeIndex = defaultActive
    })

    let btn = document.querySelector('.handleButton')
    // 根据路由判断按钮背景颜色
    if (this.$route.meta.isBackground) {
      btn.setAttribute('style', 'background-image: url(' + this.$img.sideBarA + ')')
    } else {
      btn.setAttribute('style', 'background-image: url(' + this.$img.sideBarB + ')')
    }
  }
}
</script>
<style scoped lang="scss">
  .side-bar {
    position: fixed;
    top: 0;
    left: -200px;
    width: 200px;
    height: 100%;
    opacity: 1;
    z-index: 100;
  }
  /*动画*/
  .act-in {
    animation: act-in .5s ease;
    animation-fill-mode: forwards;
  }
  @keyframes act-in {
    0% {
      left: -50%;
    }
    100% {
      left: 0;
    }
  }
  .act-out {
    animation: act-out .5s ease;
    animation-fill-mode: forwards;
  }
  @keyframes act-out {
    0% {
      left: 0;
    }
    100% {
      left: -200px;
    }
  }
  /*动画结束*/
  .side-bar {
    left: -200px;
    background: #315697;
  }
  .sideBar-container > .el-menu {
    padding-top: 30%;
  }
  .sideBar-container > .el-menu > li > span, .sideBar-container > .el-menu > li > .el-submenu__title > span {
    font-size: 18px;
  }
  button {
    position: absolute;
    top: 50%;
    right: -20px;
    width: 20px;
    height: 40px;
    transition: transform .3s,-webkit-transform .3s;
    transform: rotateZ(180deg);
    border: none;
    background-color: transparent;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
  button.is-reverse {
    transform: rotateZ(0);
    right: 0;
  }
  .logout-con{
    position: absolute;
    bottom: 1rem;
    right: 15%;
    width: 70%;
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
</style>
