import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/view/Login'
import UserList from '@/view/admin/UserList'
import UserLog from '@/view/auditor/UserLog'
import Home from '@/view/Home'

import Main from '@/view/home/main/Main'
import Globe from '@/view/home/Globe'
import Search from '@/view/home/search/Search'
import SearchDetail from '@/view/home/search/SearchDetail'

import BatchUpload from '@/view/home/sample/BatchUpload'
import FreeUpload from '@/view/home/sample/FreeUpload'
import DetectionQueue from '@/view/home/sample/DetectionQueue'
import DetectionHistory from '@/view/home/sample/DetectionHistory'
import SampleReport from '@/view/home/sample/SampleReport'

import GeneExtract from '@/view/home/gene/GeneExtract'
import GeneQueue from '@/view/home/gene/GeneQueue'
import GeneAnalysis from '@/view/home/gene/GeneAnalysis'
import SpecialModel from '@/view/home/gene/SpecialModel'
import GeneModel from '@/view/home/gene/GeneModel'
import GeneHeatmap from '@/view/home/gene/GeneHeatmap'
import GeneContrast from '@/view/home/gene/GeneContrast'

import AnalysisReport from '@/view/home/analysis/AnalysisReport'
import ReportDetail from '@/view/home/analysis/reportDetail/ReportDetail'

import SystemBasic from '@/view/home/configManage/SystemBasic'
import Resource from '@/view/home/configManage/Resource'
import Equipment from '@/view/home/configManage/Equipment'
import ReportCof from '@/view/home/configManage/ReportCof'

import SoftwareReport from '@/view/home/software/SoftwareReport'
import SoftwareReportDetail from '@/view/home/software/SoftwareReportDetail'

// import VirusEncyclopedia from '@/view/home/VirusEncyclopedia/VirusEncyclopedia'
// import VirusEncyclopedia1 from '@/view/home/VirusEncyclopedia/VirusEncyclopedia1'
// import VirusEncyclopedia2 from '@/view/home/VirusEncyclopedia/VirusEncyclopedia2'
// import VirusEncyclopedia3 from '@/view/home/VirusEncyclopedia/VirusEncyclopedia3'
// import VirusEncyclopedia4 from '@/view/home/VirusEncyclopedia/VirusEncyclopedia4'

import iotHome from '@/view/iot/Home'
import iotindex from '@/view/iot/index'
import maliceSample from '@/view/iot/maliceSample'
import iotSampleReport from '@/view/iot/SampleReport'
import specialVirus from '@/view/iot/specialVirus'
import iotVirusEncyclopedia from '@/view/iot/VirusEncyclopedia/VirusEncyclopedia'
import iotVirusEncyclopedia1 from '@/view/iot/VirusEncyclopedia/VirusEncyclopedia1'
import iotVirusEncyclopedia2 from '@/view/iot/VirusEncyclopedia/VirusEncyclopedia2'
import iotVirusEncyclopedia3 from '@/view/iot/VirusEncyclopedia/VirusEncyclopedia3'
import iotVirusEncyclopedia4 from '@/view/iot/VirusEncyclopedia/VirusEncyclopedia4'
// import specialVirusReport from '@/view/iot/specialVirusReport'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/Main',
          name: 'Main',
          component: Main,
          meta: {
            keepAlive: false,
            isBackground: true
          }
        },
        {
          path: '/Globe',
          name: 'Globe',
          component: Globe,
          meta: {
            title: '态势分析',
            keepAlive: false,
            isBackground: true
          }
        },
        {
          path: '/BatchUpload',
          name: 'BatchUpload',
          component: BatchUpload,
          meta: {
            title: '批量检测',
            keepAlive: false,
            isBackground: true
          }
        },
        {
          path: '/FreeUpload',
          name: 'FreeUpload',
          component: FreeUpload,
          meta: {
            title: '手动检测',
            keepAlive: true,
            isBackground: true
            // iotuser: 4
          }
        },
        {
          path: '/DetectionQueue',
          name: 'DetectionQueue',
          component: DetectionQueue,
          meta: {
            title: '检测队列',
            keepAlive: false,
            isBackground: false
            // iotuser: 4
          }
        },
        {
          path: '/DetectionHistory',
          name: 'DetectionHistory',
          component: DetectionHistory,
          meta: {
            title: '检测历史',
            keepAlive: false,
            isBackground: false
            // iotuser: 4
          }
        },
        {
          path: '/SampleReport',
          name: 'SampleReport',
          component: SampleReport,
          meta: {
            title: '检测结果',
            keepAlive: false,
            isBackground: false
            // iotuser: 4
          }
        },
        {
          path: '/GeneExtract',
          name: 'GeneExtract',
          component: GeneExtract,
          meta: {
            title: '基因提取',
            keepAlive: false,
            isBackground: true
          }
        },
        {
          path: '/GeneQueue',
          name: 'GeneQueue',
          component: GeneQueue,
          meta: {
            title: '提取队列',
            keepAlive: false,
            isBackground: false
          }
        },
        {
          path: '/GeneAnalysis',
          name: 'GeneAnalysis',
          component: GeneAnalysis,
          meta: {
            title: '基因分析',
            keepAlive: false,
            isBackground: false
          }
        },
        {
          path: '/SpecialModel',
          name: 'SpecialModel',
          component: SpecialModel,
          meta: {
            title: '特马建模',
            keepAlive: false,
            isBackground: false
          }
        },
        {
          path: '/GeneModel',
          name: 'GeneModel',
          component: GeneModel,
          meta: {
            title: '模型管理',
            keepAlive: false,
            isBackground: false
          }
        },
        {
          path: '/GeneHeatmap',
          name: 'GeneHeatmap',
          component: GeneHeatmap,
          meta: {
            title: '热力图分析',
            keepAlive: false,
            isBackground: false
          }
        },
        {
          path: '/GeneContrast',
          name: 'GeneContrast',
          component: GeneContrast,
          meta: {
            title: '聚类分析',
            keepAlive: false,
            isBackground: false
          }
        },
        {
          path: '/AnalysisReport',
          name: 'AnalysisReport',
          component: AnalysisReport,
          meta: {
            title: '分析报告',
            keepAlive: false,
            isBackground: false
          }
        },
        {
          path: '/ReportDetail',
          name: 'ReportDetail',
          component: ReportDetail,
          meta: {
            title: '报告详情',
            keepAlive: false,
            isBackground: false
          }
        },
        {
          path: '/SoftwareReport',
          name: 'SoftwareReport',
          component: SoftwareReport,
          meta: {
            title: '软件基因杀软评测平台',
            keepAlive: false,
            isBackground: false
          }
        },
        {
          path: '/SoftwareReportDetail',
          name: 'SoftwareReportDetail',
          component: SoftwareReportDetail,
          meta: {
            title: '软件基因杀软评测详情',
            keepAlive: false,
            isBackground: false
          }
        },
        {
          path: '/Search',
          name: 'Search',
          component: Search,
          meta: {
            title: '威胁拓线',
            keepAlive: false,
            isBackground: true
          }
        },
        {
          path: '/SearchDetail',
          name: 'SearchDetail',
          component: SearchDetail,
          meta: {
            title: '威胁信息检索',
            keepAlive: false,
            isBackground: false
          }
        },
        {
          path: '/SystemBasic',
          name: 'SystemBasic',
          component: SystemBasic,
          meta: {
            title: '系统基本状态',
            keepAlive: false,
            isBackground: false
          }
        },
        {
          path: '/Resource',
          name: 'Resource',
          component: Resource,
          meta: {
            title: '资源状态',
            keepAlive: false,
            isBackground: false
          }
        },
        {
          path: '/Equipment',
          name: 'Equipment',
          component: Equipment,
          meta: {
            title: '设备设置',
            keepAlive: false,
            isBackground: false
          }
        },
        {
          path: '/ReportCof',
          name: 'ReportCof',
          component: ReportCof,
          meta: {
            title: '报表设置',
            keepAlive: false,
            isBackground: false
          }
        }
        // {
        //   path: '/VirusEncyclopedia',
        //   name: 'VirusEncyclopedia',
        //   component: VirusEncyclopedia,
        //   meta: {
        //     title: '病毒百科',
        //     keepAlive: false,
        //     isBackground: false,
        //     // iotuser: 4
        //   }
        // },
        // {
        //   path: '/VirusEncyclopedia1',
        //   name: 'VirusEncyclopedia1',
        //   component: VirusEncyclopedia1,
        //   meta: {
        //     title: '病毒百科',
        //     keepAlive: false,
        //     isBackground: false,
        //     // iotuser: 4
        //   }
        // },
        // {
        //   path: '/VirusEncyclopedia2',
        //   name: 'VirusEncyclopedia2',
        //   component: VirusEncyclopedia2,
        //   meta: {
        //     title: '病毒百科',
        //     keepAlive: false,
        //     isBackground: false,
        //     // iotuser: 4
        //   }
        // },
        // {
        //   path: '/VirusEncyclopedia3',
        //   name: 'VirusEncyclopedia3',
        //   component: VirusEncyclopedia3,
        //   meta: {
        //     title: '病毒百科',
        //     keepAlive: false,
        //     isBackground: false,
        //     // iotuser: 4
        //   }
        // },
        // {
        //   path: '/VirusEncyclopedia4',
        //   name: 'VirusEncyclopedia4',
        //   component: VirusEncyclopedia4,
        //   meta: {
        //     title: '病毒百科',
        //     keepAlive: false,
        //     isBackground: false,
        //     iotuser: 4
        //   }
        // }
      ]
    },
    {
      path: '/iot-Home',
      name: 'iotHome',
      component: iotHome,
      children: [
        {
          path: '/index',
          name: 'index',
          component: iotindex,
          meta: {
            keepAlive: false,
            iotuser: 4
          }
        },
        {
          path: '/maliceSample',
          name: 'iotmaliceSample',
          component: maliceSample,
          meta: {
            keepAlive: false,
            iotuser: 4
          }
        },
        {
          path: '/iotSampleReport',
          name: 'iotSampleReport',
          component: iotSampleReport,
          meta: {
            keepAlive: false,
            iotuser: 4,
            isBackground: false
          }
        },
        {
          path: '/specialVirus',
          name: 'iotspecialVirus',
          component: specialVirus,
          meta: {
            keepAlive: false,
            iotuser: 4
          }
        },
        {
          path: '/iotVirusEncyclopedia',
          name: 'iotVirusEncyclopedia',
          component: iotVirusEncyclopedia,
          meta: {
            title: '病毒百科',
            keepAlive: false,
            isBackground: false,
            iotuser: 4
          }
        },
        {
          path: '/iotVirusEncyclopedia1',
          name: 'iotVirusEncyclopedia1',
          component: iotVirusEncyclopedia1,
          meta: {
            title: '病毒百科',
            keepAlive: false,
            isBackground: false,
            iotuser: 4
          }
        },
        {
          path: '/iotVirusEncyclopedia2',
          name: 'iotVirusEncyclopedia2',
          component: iotVirusEncyclopedia2,
          meta: {
            title: '病毒百科',
            keepAlive: false,
            isBackground: false,
            iotuser: 4
          }
        },
        {
          path: '/iotVirusEncyclopedia3',
          name: 'iotVirusEncyclopedia3',
          component: iotVirusEncyclopedia3,
          meta: {
            title: '病毒百科',
            keepAlive: false,
            isBackground: false,
            iotuser: 4
          }
        },
        {
          path: '/iotVirusEncyclopedia4',
          name: 'iotVirusEncyclopedia4',
          component: iotVirusEncyclopedia4,
          meta: {
            title: '病毒百科',
            keepAlive: false,
            isBackground: false,
            iotuser: 4
          }
        }
      ]
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login,
      meta: {
        keepAlive: false,
        isBackground: true
      }
    },
    {
      path: '/UserList',
      name: 'UserList',
      component: UserList,
      meta: {
        title: '用户列表',
        keepAlive: false,
        isBackground: false
      }
    },
    {
      path: '/UserLog',
      name: 'UserLog',
      component: UserLog,
      meta: {
        title: '用户日志',
        keepAlive: false,
        isBackground: false
      }
    },
    {
      path: '*',
      redirect: to => {
        if (Number(localStorage.userClass) === 4) {
          return '/index'
        } else {
          return '/Main'
        }
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  let name = ''
  if (to.name) {
    name = to.name.toLowerCase()
  } else {
    name = ''
  }
  let userclass = ''
  if (to.meta.iotuser) {
    userclass = to.meta.iotuser
  } else {
    userclass = ''
  }

  // 配合着api中拦截处理
  let _deviceId = localStorage[localStorage.tokenName + '_token']
  if (_deviceId === undefined || _deviceId === 'undefined') {
    if (name === 'login') {
      next()
    } else {
      next({name: 'Login'})
      return
    }
  } else {
    if (localStorage.userClass === '1') {
      if (name !== 'userlog') {
        next({name: 'UserLog'})
        return
      }
    } else if (localStorage.userClass === '4') {
      if (userclass !== 4) {
        next({name: 'index'})
        return
      }
    } else {
      if (userclass === 4) {
        next({name: 'Main'})
        return
      }
    }
  }
  next()
})

export default router
