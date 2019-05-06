import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/view/Login'
import UserList from '@/view/UserList'
import UserLog from '@/view/UserLog'
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
import ApiWord from '@/view/home/sample/ApiWord'
import ExportExcel from '@/view/home/sample/ExportExcel'
// 证据链查看
import Article from '@/view/home/sample/Article'
import GeneCompareResult from '@/view/home/sample/GeneCompareResult'
import GeneCompareImg from '@/view/home/sample/GeneCompareImg'
import GeneCompare from '@/view/home/sample/GeneCompare'

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

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      redirect: '/Main',
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
            title: 'FTP上传',
            keepAlive: false,
            isBackground: true
          }
        },
        {
          path: '/FreeUpload',
          name: 'FreeUpload',
          component: FreeUpload,
          meta: {
            title: '手动上传',
            keepAlive: true,
            isBackground: true
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
          }
        },
        {
          path: '/DetectionHistory',
          name: 'DetectionHistory',
          component: DetectionHistory,
          meta: {
            title: '检测结果',
            keepAlive: false,
            isBackground: false
          }
        },
        {
          path: '/SampleReport',
          name: 'SampleReport',
          component: SampleReport,
          meta: {
            title: '检测结果详情',
            keepAlive: false,
            isBackground: false
          }
        },
        {
          path: '/Article',
          name: 'Article',
          component: Article,
          meta: {
            title: '相关证明',
            keepAlive: false,
            isBackground: false
          }
        },
        {
          path: '/GeneCompareResult',
          name: 'GeneCompareResult',
          component: GeneCompareResult,
          meta: {
            title: '关联样本归属证明',
            keepAlive: false,
            isBackground: false
          }
        },
        {
          path: '/GeneCompareImg',
          name: 'GeneCompareImg',
          component: GeneCompareImg,
          meta: {
            title: '关联样本基因对比详情',
            keepAlive: false,
            isBackground: false
          }
        },
        {
          path: '/GeneCompare',
          name: 'GeneCompare',
          component: GeneCompare,
          meta: {
            title: '关联样本基因对比详情',
            keepAlive: false,
            isBackground: false
          }
        },
        {
          path: '/ApiWord',
          name: 'ApiWord',
          component: ApiWord,
          meta: {
            title: 'API说明',
            keepAlive: false,
            isBackground: false
          }
        },
        {
          path: '/ExportExcel',
          name: 'ExportExcel',
          component: ExportExcel,
          meta: {
            title: '检测历史列表',
            keepAlive: false,
            isBackground: false
          }
        },
        {
          path: '/GeneExtract',
          name: 'GeneExtract',
          component: GeneExtract,
          meta: {
            title: '基因综合分析',
            keepAlive: true,
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
            title: '基因分析结果',
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
            title: '聚类图分析',
            keepAlive: false,
            isBackground: false
          }
        },
        {
          path: '/AnalysisReport',
          name: 'AnalysisReport',
          component: AnalysisReport,
          meta: {
            title: '分析报表',
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
            title: '威胁信息分析',
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
      redirect: '/Main'
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
    if (localStorage.userClass === '2') {
      if (name !== 'userlist') {
        next({name: 'UserList'})
        return
      }
    } else if (localStorage.userClass === '1') {
      if (name !== 'userlog') {
        next({name: 'UserLog'})
        return
      }
    }
  }
  next()
})

export default router
