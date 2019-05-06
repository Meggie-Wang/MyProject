import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/view/Login'
import Home from '@/view/Home'

import Status from '@/view/home/Status'

import LoopholeDatabase from '@/view/home/LoopholeDatabase/LoopholeDatabase'
import LoopholeDatabaseDetail from '@/view/home/LoopholeDatabase/LoopholeDatabaseDetail'

import LoopholeSoftwareDatabase from '@/view/home/LoopholeSoftwareDatabase/LoopholeSoftwareDatabase'
import LoopholeSoftwareDatabaseDetail from '@/view/home/LoopholeSoftwareDatabase/LoopholeSoftwareDatabaseDetail'

import LoopholeGene from '@/view/home/LoopholeGene/LoopholeGene'
import LoopholeGeneDetail from '@/view/home/LoopholeGene/LoopholeGeneDetail'

import LoopholeGeneAnalysis from '@/view/home/LoopholeGeneAnalysis/LoopholeGeneAnalysis'
import LoopholeGeneAnalysisDetail from '@/view/home/LoopholeGeneAnalysis/LoopholeGeneAnalysisDetail'

import SoftwareGeneDetect from '@/view/home/SoftGeneAnalysis/SoftwareGeneDetect'
import SoftwareDetectList from '@/view/home/SoftGeneAnalysis/SoftwareDetectList'
import SoftwareDetectResult from '@/view/home/SoftGeneAnalysis/SoftwareDetectResult'
import TargetGeneFiles from '@/view/home/SoftGeneAnalysis/TargetGeneFiles'

import GeneAnalysisTool from '@/view/home/SoftGeneContrast/GeneAnalysisTool'
import GeneCompareQuene from '@/view/home/SoftGeneContrast/GeneCompareQuene'
import GeneCompareResult from '@/view/home/SoftGeneContrast/GeneCompareResult'
import GeneCompareImg from '@/view/home/SoftGeneContrast/GeneCompareImg'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      redirect: '/Status',
      children: [
        {
          path: '/Status',
          name: 'Status',
          component: Status,
          meta: {
            keepAlive: false,
            highLight: 'Status'
          }
        },
        {
          path: '/LoopholeDatabase',
          name: 'LoopholeDatabase',
          component: LoopholeDatabase,
          meta: {
            keepAlive: false,
            title: '漏洞库',
            highLight: 'LoopholeDatabase'
          }
        },
        {
          path: '/LoopholeDatabaseDetail',
          name: 'LoopholeDatabaseDetail',
          component: LoopholeDatabaseDetail,
          meta: {
            keepAlive: false,
            title: '漏洞库详情',
            highLight: 'LoopholeDatabase'
          }
        },
        {
          path: '/LoopholeSoftwareDatabase',
          name: 'LoopholeSoftwareDatabase',
          component: LoopholeSoftwareDatabase,
          meta: {
            keepAlive: false,
            title: '漏洞软件库',
            highLight: 'LoopholeSoftwareDatabase'
          }
        },
        {
          path: '/LoopholeSoftwareDatabaseDetail',
          name: 'LoopholeSoftwareDatabaseDetail',
          component: LoopholeSoftwareDatabaseDetail,
          meta: {
            keepAlive: false,
            title: '漏洞软件库详情',
            highLight: 'LoopholeSoftwareDatabase'
          }
        },
        {
          path: '/LoopholeGene',
          name: 'LoopholeGene',
          component: LoopholeGene,
          meta: {
            keepAlive: false,
            title: '漏洞基因库',
            highLight: 'LoopholeGene'
          }
        },
        {
          path: '/LoopholeGeneDetail',
          name: 'LoopholeGeneDetail',
          component: LoopholeGeneDetail,
          meta: {
            keepAlive: false,
            title: '漏洞基因库详情',
            highLight: 'LoopholeGene'
          }
        },
        {
          path: '/LoopholeGeneAnalysis',
          name: 'LoopholeGeneAnalysis',
          component: LoopholeGeneAnalysis,
          meta: {
            keepAlive: false,
            title: '漏洞基因分析',
            highLight: 'LoopholeGeneAnalysis'
          }
        },
        {
          path: '/LoopholeGeneAnalysisDetail',
          name: 'LoopholeGeneAnalysisDetail',
          component: LoopholeGeneAnalysisDetail,
          meta: {
            keepAlive: false,
            title: '漏洞详情',
            highLight: 'LoopholeDatabase'
          }
        },
        {
          path: '/SoftwareGeneDetect',
          name: 'SoftwareGeneDetect',
          component: SoftwareGeneDetect,
          meta: {
            keepAlive: false,
            title: '软件基因检测',
            highLight: 'SoftwareGeneDetect'
          }
        },
        {
          path: '/SoftwareDetectList',
          name: 'SoftwareDetectList',
          component: SoftwareDetectList,
          meta: {
            keepAlive: false,
            title: '软件检测历史',
            highLight: 'SoftwareDetectList'
          }
        },
        {
          path: '/SoftwareDetectResult',
          name: 'SoftwareDetectResult',
          component: SoftwareDetectResult,
          meta: {
            keepAlive: false,
            title: '软件检测结果',
            highLight: 'SoftwareDetectList'
          }
        },
        {
          path: '/GeneAnalysisTool',
          name: 'GeneAnalysisTool',
          component: GeneAnalysisTool,
          meta: {
            keepAlive: false,
            title: '基因分析工具',
            highLight: 'GeneAnalysisTool'
          }
        },
        {
          path: '/GeneCompareQuene',
          name: 'GeneCompareQuene',
          component: GeneCompareQuene,
          meta: {
            keepAlive: false,
            title: '对比检测历史',
            highLight: 'GeneCompareQuene'
          }
        },
        {
          path: '/GeneCompareResult',
          name: 'GeneCompareResult',
          component: GeneCompareResult,
          meta: {
            keepAlive: false,
            title: '对比检测结果',
            highLight: 'GeneCompareQuene'
          }
        },
        {
          path: '/GeneCompareImg',
          name: 'GeneCompareImg',
          component: GeneCompareImg,
          meta: {
            keepAlive: false,
            title: '对比图片展示',
            highLight: 'GeneCompareQuene'
          }
        },
        {
          path: '/TargetGeneFiles',
          name: 'TargetGeneFiles',
          component: TargetGeneFiles,
          meta: {
            keepAlive: false,
            title: '命中漏洞详情',
            highLight: 'GeneCompareQuene'
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
        highLight: 'Login'
      }
    },
    {
      path: '*',
      redirect: '/Status'
    }
  ]
})
router.beforeEach((to, from, next) => {
  // @ 处理详情页面中包含分页时候，返回按钮按url history返回
  // 将下钻链 设为数组
  let jumpArr = localStorage.jumpArr
    ? JSON.parse(localStorage.jumpArr)
    : []
  if (to.name === to.meta.highLight) { // 判断是否是主路由，加入数组第一位
    jumpArr = []
    jumpArr.push({
      path: to.name,
      query: to.query
    })
  } else {
    // 当沿着链返回时候，需要判断链元素是否存在
    // 判断最后一个元素的path === to.name
    // 但是，非主路由时候刷新页面
    if (jumpArr[jumpArr.length - 1].path !== to.name) {
      jumpArr.push({
        path: to.name,
        query: to.query
      })
    }
  }
  localStorage.setItem('jumpArr', JSON.stringify(jumpArr))

  // @ menu显示问题
  // 漏洞库详情 用的是漏洞基因分析的详情
  // 这个详情页面的highLight设置的默认 漏洞库
  // 所以判断 from.name
  // to.name === to.meta.highLight
  let fromName = to.name === to.meta.highLight // 判断是否是主路由页面
    ? to.name
    : from.name || localStorage.lastRouter
  switch (fromName) {
    case 'LoopholeGeneAnalysis':
      to.meta.highLight = 'LoopholeGeneAnalysis'
      break
    case 'LoopholeDatabase':
      to.meta.highLight = 'LoopholeDatabase'
      break
  }

  // 配合着api中拦截处理
  let _deviceId = localStorage[localStorage.tokenName + '_token']
  if (_deviceId === undefined || _deviceId === 'undefined') {
    if (to.name === 'Login') {
      next()
    } else {
      next({name: 'Login'})
      return
    }
  } else {
    if (localStorage.userClass === '2') {
      if (name !== 'UserList') {
        next({name: 'UserList'})
        return
      }
    } else if (localStorage.userClass === '1') {
      if (name !== 'UserLog') {
        next({name: 'UserLog'})
        return
      }
    }
  }
  next()
})

export default router
