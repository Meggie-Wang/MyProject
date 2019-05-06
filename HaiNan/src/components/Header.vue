<style scoped="scoped">
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    margin: 0 2%;
    overflow: hidden;
  }
  .logo {
    display: flex;
    align-items: center;
    height: 100%;
  }
  .logo img {
    height: 45%;
  }
  .headerList {
    display: flex;
    flex: 3;
    height: 60px;
    line-height: 60px;
  }
  .headerList > li {
    flex: 1;
    text-align: center;
    white-space: nowrap;
    margin: 0 2%;
    color: #fff;
  }
  .headerList > li:hover,
  .activeDad {
    box-sizing: border-box;
    border-bottom: 3px solid #169275;
    color: #169275 !important;
  }
  .logout-con span {
    color: #fff;
  }
  .logout-con img {
    height: 1.5rem;
  }
  .dropMenuContainer {
    position: absolute;
    width: 100%;
    color: #fff;
    background: #169275;
    text-align: center;
    z-index: 999;
  }
  .dropMenuContainer > ul > li{
    display: inline-block;
    padding: 15px 30px;
    font-size: 14px;
    color: #ccc;
  }
  .dropMenuContainer > ul > li:hover,
  .activeSon {
    color: #fff!important;
  }
</style>
<template>
  <div class="header_container">
    <div class="header">
      <div
        class="logo"
        @click="goMain()">
        <img :src="$img.logo">
      </div>
      <ul class="headerList">
        <li
          v-for="(i, j) in headerList"
          :key="j"
          class="__handCursor"
          :class="{activeDad: isSelect === i.componentName}"
          @click="jumpTo(i.componentName, i.indexNum)"
          @mouseover="dadLiHover(i.indexNum)">{{i.title}}</li>
      </ul>
      <div
        class="logout-con">
        <label
          class="__handCursor"
          @click="logout">
          <span>退出</span>
          <img :src="$img.logout">
        </label>
      </div>
    </div>
    <div
      class="dropMenuContainer"
      @mouseleave="dropMenuData=[]">
      <ul>
        <li
          class="__handCursor"
          v-for="(i,j) in dropMenuData"
          :key="j"
          :class="{activeSon: i.active}"
          @click="jumpTo(i.componentName, i.indexNum)">{{i.title}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Header',
  data () {
    return {
      headerList: [
        {
          componentName: 'LoopholeDatabase',
          title: '漏洞库',
          indexNum: 0
        },
        {
          componentName: 'SoftwareDatabase',
          title: '软件库',
          indexNum: 1
        },
        {
          componentName: 'LoopholeGene',
          title: '漏洞基因库',
          indexNum: 2
        },
        {
          componentName: 'SoftwareGeneAnalysis',
          title: '软件基因分析',
          indexNum: 3
        }
      ],
      dropMenuList: [
        {
          componentName: 'LoopholeGeneAnalysis',
          title: '漏洞基因分析',
          indexNum: 4,
          active: false
        },
        {
          componentName: 'SoftwareLoopholeDetect',
          title: '软件漏洞检测',
          indexNum: 4,
          active: false
        },
        {
          componentName: 'GeneAnalysisTool',
          title: '基因分析工具',
          indexNum: 4,
          active: false
        }
      ],
      isSelect: '',
      dropMenuData: []
    }
  },
  mounted () {
    let componentName = location.href.split('#/')[1].split('?')[0]
    this.defaultComponentName(componentName)
  },
  methods: {
    goMain () {
      this.$router.push({path: '/Main'})
    },
    logout () {
      this.$api.post('logout').then(res => {
        // 清理localStorage
        localStorage.setItem(localStorage.tokenName + '_token', 'undefined')
        localStorage.setItem('session_id', 'undefined')
        localStorage.setItem('userName', 'undefined')
        this.$router.push({path: '/Login'})
      })
    },
    // 路由跳转
    jumpTo (val, indexNum) {
      this.defaultComponentName(val)
      if (indexNum === 3) {
        let componentName = location.href.split('#/')[1].split('?')[0]
        if (componentName !== '/LoopholeGeneAnalysis' &&
            componentName !== '/SoftwareLoopholeDetect' &&
            componentName !== '/GeneAnalysisTool') {
          this.$router.push({path: '/LoopholeGeneAnalysis'})
        }
      } else {
        this.$router.push('/' + val)
      }
    },
    // 二级菜单
    dadLiHover (indexNum) {
      if (indexNum !== 3) {
        this.dropMenuData = []
      } else {
        this.dropMenuList.forEach((i, j) => {
          if (i.componentName === location.href.split('#/')[1].split('?')[0]) {
            i.active = true
          } else {
            i.active = false
          }
        })
        this.dropMenuData = this.dropMenuList
      }
    },
    // 刷新默认高亮menu函数
    defaultComponentName (val) {
      if (val === 'LoopholeGeneAnalysis' || val === 'LoopholeGeneAnalysisDetail' || val === 'SoftwareLoopholeDetect' || val === 'GeneAnalysisTool') {
        this.isSelect = 'SoftwareGeneAnalysis'
      } else if (val === 'LoopholeDatabaseDetail') {
        this.isSelect = 'LoopholeDatabase'
      } else if (val === 'SoftwareDatabaseDetail') {
        this.isSelect = 'SoftwareDatabase'
      } else if (val === 'LoopholeGeneDetail') {
        this.isSelect = 'LoopholeGene'
      } else {
        this.isSelect = val
      }
    }
  }
}
</script>
