import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/view/Login'

// 管理员用户
import AdminUser from '@/view/admin/AdminUser'

import DeviceStatus from '@/view/admin/DeviceManage/DeviceStatus'
import NetworkConfig from '@/view/admin/DeviceManage/NetworkConfig'
import WhiteList from '@/view/admin/DeviceManage/WhiteList'
import ResourceClear from '@/view/admin/DeviceManage/ResourceClear'
import SystemSetting from '@/view/admin/DeviceManage/SystemSetting'

import TrafficSetting from '@/view/admin/DetectionManage/TrafficSetting'
import DetectionSetting from '@/view/admin/DetectionManage/DetectionSetting'
import ReportSetting from '@/view/admin/DetectionManage/ReportSetting'
import ReportInfo from '@/view/admin/DetectionManage/ReportInfo.vue'
import AlarmInfoSetting from '@/view/admin/DetectionManage/AlarmInfoSetting'

import UserList from '@/view/admin/UserList'

// 审计用户
import Auditor from '@/view/auditor/Auditor'
import UserLog from '@/view/auditor/UserLog'
import EventLog from '@/view/auditor/EventLog'

// 普通用户
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

import GeneExtract from '@/view/home/gene/GeneExtract'
import GeneQueue from '@/view/home/gene/GeneQueue'
import GeneAnalysis from '@/view/home/gene/GeneAnalysis'
import SpecialModel from '@/view/home/gene/SpecialModel'
import GeneModel from '@/view/home/gene/GeneModel'
import GeneHeatmap from '@/view/home/gene/GeneHeatmap'
import GeneContrast from '@/view/home/gene/GeneContrast'

import AnalysisReport from '@/view/home/analysis/AnalysisReport'
import ReportDetail from '@/view/home/analysis/reportDetail/ReportDetail'

import SoftwareReport from '@/view/home/software/SoftwareReport'
import SoftwareReportDetail from '@/view/home/software/SoftwareReportDetail'

import AlarmInfor from '@/view/home/Traffic/AlarmInfor.vue'
import StatisticsRecord from '@/view/home/Traffic/StatisticsRecord.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/AdminUser',
      name: 'AdminUser',
      component: AdminUser,
      redirect: '/DeviceStatus',
      children: [
        {
          path: '/DeviceStatus',
          name: 'DeviceStatus',
          component: DeviceStatus
        },
        {
          path: '/NetworkConfig',
          name: 'NetworkConfig',
          component: NetworkConfig
        },
        {
          path: '/WhiteList',
          name: 'WhiteList',
          component: WhiteList
        },
        {
          path: '/ResourceClear',
          name: 'ResourceClear',
          component: ResourceClear
        },
        {
          path: '/SystemSetting',
          name: 'SystemSetting',
          component: SystemSetting
        },
        {
          path: '/TrafficSetting',
          name: 'TrafficSetting',
          component: TrafficSetting
        },
        {
          path: '/DetectionSetting',
          name: 'DetectionSetting',
          component: DetectionSetting
        },
        {
          path: '/ReportSetting',
          name: 'ReportSetting',
          component: ReportSetting
        },
        {
          path: '/ReportInfo',
          name: 'ReportInfo',
          component: ReportInfo
        },
        {
          path: '/AlarmInfoSetting',
          name: 'AlarmInfoSetting',
          component: AlarmInfoSetting
        },
        {
          path: '/UserList',
          name: 'UserList',
          component: UserList
        }
      ]
    },
    {
      path: '/Auditor',
      name: 'Auditor',
      component: Auditor,
      redirect: '/UserLog',
      children: [
        {
          path: '/UserLog',
          name: 'UserLog',
          component: UserLog
        },
        {
          path: '/EventLog',
          name: 'EventLog',
          component: EventLog
        }
      ]
    },
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
          path: '/AlarmInfor',
          name: 'AlarmInfor',
          component: AlarmInfor,
          meta: {
            title: '告警信息',
            keepAlive: false,
            isBackground: false
          }
        },
        {
          path: '/StatisticsRecord',
          name: 'StatisticsRecord',
          component: StatisticsRecord,
          meta: {
            title: '统计记录',
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
      // 路由不存在时候跳转
      if (to.name === 'Main') { // 如果未匹配到路由
        next({name: 'DeviceStatus'})
        return
      } else {
        next()
        return
      }
    } else if (localStorage.userClass === '1') {
      if (to.name === 'Main') { // 如果未匹配到路由
        next({name: 'UserLog'})
        return
      } else {
        next()
        return
      }
    }
  }
  next()
})

export default router
