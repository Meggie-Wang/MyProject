import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/view/Login'
import Register from '@/view/Register'
import Home from '@/view/Home'
import Active from '@/view/Active'
import UserService from '@/view/UserService'
import UserPolicy from '@/view/UserPolicy'

import Main from '@/view/pages/Main'
import AttackState from '@/view/pages/AttackState'
import Search from '@/view/pages/Search'
import SearchDetail from '@/view/searchDetail/SearchDetail'
import Logs from '@/view/pages/Logs'
import Status from '@/view/pages/Status'
import Help from '@/view/pages/Help'
import About from '@/view/pages/About'

import api from '@/api/api'

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
          name: 'main',
          component: Main,
          meta: {
            keepAlive: true
          }
        },
        {
          path: '/AttackState',
          component: AttackState,
          meta: {
            keepAlive: true
          }
        },
        {
          path: '/Search',
          name: 'Search',
          component: Search
        },
        {
          path: '/SearchDetail',
          component: SearchDetail
        },
        {
          path: '/Logs',
          component: Logs
        },
        {
          path: '/Status',
          component: Status,
          meta: {
            keepAlive: true
          }
        },
        {
          path: '/Help',
          component: Help,
          meta: {
            keepAlive: true
          }
        },
        {
          path: '/About',
          component: About,
          meta: {
            keepAlive: true
          }
        }
      ]
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/UserService',
      name: 'UserService',
      component: UserService
    },
    {
      path: '/UserPolicy',
      name: 'UserPolicy',
      component: UserPolicy
    },
    {
      path: '/Active',
      name: 'Active',
      component: Active
    },
    {
      path: '*',
      redirect: '/Main'
    }
  ]
})

router.beforeEach((to, from, next) => {
  let name = ''
  let _deviceId = api.getCookie('token_honeypot')
  if (to.name) {
    name = to.name.toLowerCase()
  } else {
    name = ''
  }
  // 第一次进入时候，_deviceId是字符串undefined
  // 退出登陆，token过期，token被设置为''空
  if (_deviceId === 'undefined' || _deviceId === '') {
    if (name === 'login' || name === 'register' || name === 'userservice' || name === 'userpolicy' || name === 'active') {
      next()
    } else {
      next({name: 'Login'})
    }
  } else {
    // 有token时
    if (name !== 'login') {
      next()
    } else {
      // 路由到login，强制回到路由前的路由
      history.go(-1)
    }
  }
})

export default router
