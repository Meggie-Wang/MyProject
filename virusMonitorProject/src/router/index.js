import Vue from 'vue'
import Router from 'vue-router'
import api from '../api/ipApi'

import register from 'view/register'
import login from 'view/Login'
import personal from 'view/personal/personal'
import active from 'view/active'
import userService from 'view/userAgreement/userService'
import userPolicy from 'view/userAgreement/userPolicy'
import dashboard from 'view/dashboard'
import Home from 'view/Home'
import search from 'view/search/search'
import advSearch from 'view/search/advSearch'
import list from 'view/search/list'
import detail from 'view/search/detail'
import detection from 'view/softwareGene/detection'
import detQueue from 'view/softwareGene/detQueue'
import detHistory from 'view/softwareGene/detHistory'
import geneReport from 'view/softwareGene/geneReport'
import safeInfor from 'view/safeInfor/safeInfor'
import safeInforDetail from 'view/safeInfor/safeInforDetail'
import safeWords from 'view/safeWords/safeWords'
import safeWordsDetail from 'view/safeWords/safeWordsDetail'
import inforloophole from 'view/inforloophole/inforloophole'
import inforloopholeDetail from 'view/inforloophole/inforloopholeDetail'
import help from 'view/help'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/dashboard'
    },
    {
      path: '/register',
      component: register
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/active',
      component: active
    },
    {
      path: '/userService',
      component: userService
    },
    {
      path: '/userPolicy',
      component: userPolicy
    },
    {
      path: '/dashboard',
      meta: {
        keeplive: true
      },
      component: dashboard
    },
    {
      path: '/Home',
      component: Home,
      redirect: '/search',
      children: [
        {
          name: 'personal',
          path: '/personal',
          component: personal
        },
        {
          path: '/search',
          component: search
        },
        {
          path: '/advSearch',
          component: advSearch
        },
        {
          name: 'iplist',
          path: '/list',
          component: list
        },
        {
          name: 'ipDetail',
          path: '/detail',
          component: detail
        },
        {
          name: 'Detection',
          path: '/detection',
          component: detection
        },
        {
          path: '/detQueue',
          component: detQueue
        },
        {
          path: '/detHistory',
          component: detHistory
        },
        {
          name: 'geneReport',
          path: '/geneReport',
          component: geneReport
        },
        {
          path: '/safeInfor',
          component: safeInfor
        },
        {
          name: 'safeInforDetail',
          path: '/safeInforDetail',
          component: safeInforDetail
        },
        {
          path: '/safeWords',
          component: safeWords
        },
        {
          path: '/safeWordsDetail',
          component: safeWordsDetail
        },
        {
          path: '/inforloophole',
          component: inforloophole
        },
        {
          path: '/inforloopholeDetail',
          component: inforloopholeDetail
        },
        {
          path: '/help',
          component: help
        }
      ]
    }
  ],
  linkActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
  let path = ''
  let _deviceId = api.getCookie('token_virus')
  if (to.path) {
    path = to.path.toLowerCase()
  } else {
    path = ''
  }
  // 第一次进入时候，_deviceId是对象null
  // 退出登陆、或token过期，token被设置为'' 空
  let routers = ['/login', '/register', '/userService', '/userPolicy', '/active']
  if (_deviceId === null) {
    if (routers.includes(to.path)) {
      next()
    } else {
      next({path: '/login'})
    }
  } else if (_deviceId === '') {
    if (routers.includes(to.path)) {
      next()
    } else {
      next({path: '/login', query: {isLogin: true}})
    }
  } else {
    // 有token时
    if (to.path !== '/login') {
      next()
    } else {
      // 路由到login，强制回到路由前的路由
      history.go(-1)
    }
  }
})
export default router