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
import SampleReport from '@/view/home/sample/sampleReport'
import ExportExcel from '@/view/home/sample/ExportExcel'

import GeneExtract from '@/view/home/gene/GeneExtract'
import GeneQueue from '@/view/home/gene/GeneQueue'
import GeneAnalysis from '@/view/home/gene/GeneAnalysis'
import SpecialModel from '@/view/home/gene/SpecialModel'
import GeneModel from '@/view/home/gene/GeneModel'

import AnalysisReport from '@/view/home/analysis/AnalysisReport'
import ReportDetail from '@/view/home/analysis/reportDetail/ReportDetail'

import MatchingProportion from '@/view/home/configManage/MatchingProportion'
import SystemBasic from '@/view/home/configManage/GTD-SystemBasic'
import Resource from '@/view/home/configManage/GTD-Resource'
import Equipment from '@/view/home/configManage/Equipment'
import ReportCof from '@/view/home/configManage/ReportCof'

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
            title: '批量上传设置',
            keepAlive: false,
            isBackground: true
          }
        },
        {
          path: '/FreeUpload',
          name: 'FreeUpload',
          component: FreeUpload,
          meta: {
            title: '样本手动上传',
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
            title: '检测历史',
            keepAlive: false,
            isBackground: false
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
            title: '基因提取',
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
            title: '家族基因分析',
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
            title: '家族模型管理',
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
          path: '/MatchingProportion',
          name: 'MatchingProportion',
          component: MatchingProportion,
          meta: {
            title: '检测设置',
            keepAlive: false,
            isBackground: true
          }
        },
        {
          path: '/GTD-SystemBasic',
          name: 'GTD-SystemBasic',
          component: SystemBasic,
          meta: {
            title: '系统基本状态',
            keepAlive: false,
            isBackground: false
          }
        },
        {
          path: '/GTD-Resource',
          name: 'GTD-Resource',
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
