import axios from 'axios'
import Router from '../router'

// 命名接口
const apiPath = '//taishi.roarpanda.com:9300/'

const apiArr = {
  'login': 'user/newlogin/', // 登陆接口 post
  'refreshtoken': 'user/refreshtoken', // 刷新token
  'guestLogin': 'user/anonlogin/', // 一键登录
  'register': 'user/newregister', // 注册接口 post
  'honeypotMain': 'api/honeypotattack', // 主页数据
  'honeypotType': 'api/honeypottype', // 攻击类型
  'checkip': 'api/checkip/', // ip搜索
  'checkdns': 'api/checkdns/', // dns搜索
  'checkmd5': 'api/md5_detail_view/', // md5_detail_view
  'MD5Malicious': 'api/checkmd5/', // dns搜索
  'MD5Behavior': 'api/md5_behavior_view/', // md5_behavior_view
  'MD5Detection': 'api/md5_detection_view/', // md5_detection_view
  'MD5Relations': 'api/md5_relations_view/', // md5_relations_view
  'log': 'api/honeypotlog/', // log
  'statusData': 'api/honeytogdetail/', // 状态页
  'wordcloudData': 'api/honeyhecklog/', // 状态页词云
  'aboutData': 'api/honeypotstatus/' // 关于
}
// axios 请求超时
axios.defaults.timeout = 20000

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(
  (response) => {
    // 对响应数据做些事
    if (response.data.status === 0) {
      api.setCookie('token_honeypot', '')
      Router.push({name: 'Login'})
      return response.data
    } else {
      return response.data
    }
  },
  (error) => {
    return Promise.reject(error)
  }
)

const api = {}

api.post = (Interface, requestData) => {
  return axios.post(apiPath + apiArr[Interface], requestData, {
    // 转换数据格式，有待测试传送文件的方式时候同样可行。
    transformRequest: [function (requestData) {
      let ret = ''
      if (Interface !== 'login') {
        requestData.token = api.getCookie('token_honeypot')
      }
      for (let it in requestData) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(requestData[it]) + '&'
      }
      ret = ret.slice(0, ret.length - 1)
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

api.get = (Interface, requestData) => {
  return api.tokenDate().then((tokenRes) => {
    if (Interface !== 'guestLogin') {
      requestData.token = api.getCookie('token_honeypot')
    }
    return axios.get(apiPath + apiArr[Interface], {
      params: requestData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  })
}

// 请求接口时判断token是否过期
api.tokenDate = () => {
  var p = new Promise(function (resolve) {
    // 当前请求时间
    let nowTime = Date.parse(new Date()) / 1000
    // token刷新时间
    let expTime = Number(api.getCookie('token_exp'))
    // token过期时间
    let refreshExpTime = Number(api.getCookie('token_refresh_exp'))
    // 当前请求时间小于刷新token时间并且大于token过期时间，刷新token
    if (nowTime >= expTime && nowTime < refreshExpTime) {
      api.post('refreshtoken', {username: api.getCookie('userName')}).then((res) => {
        if (res.status === 1) {
          api.setCookie('token_honeypot', res.token)
          api.setCookie('token_exp', res.token_exp)
          resolve()
        }
      })
    // 当前请求时间大于token刷新时间，重新登录
    } else if (nowTime >= refreshExpTime) {
      api.setCookie('token_honeypot', '')
      api.setCookie('token_refresh_exp', '')
      api.setCookie('token_exp', '')
      resolve()
    } else {
      resolve()
    }
  })
  return p
}

api.getCookie = (cookieName) => {
  let strCookie = document.cookie
  // 将多cookie切割为多个名/值对
  let arrCookie = strCookie.split('; ')
  let userId
  // 遍历cookie数组，处理每个cookie对
  for (let i = 0; i < arrCookie.length; i++) {
    let arr = arrCookie[i].split('=')
    // 找到名称为userId的cookie，并返回它的值
    if (cookieName === arr[0]) {
      userId = arr[1]
      break
    }
  }
  return unescape(userId)
}

api.setCookie = (name, value) => {
  // 定义一天
  let days = 7
  let exp = new Date()
  // 定义的失效时间
  exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000)
  // 写入Cookie  ，toGMTstring将时间转换成字符串。
  document.cookie = name + '=' + escape(value) + ';path=/;expires=' + exp.toGMTString
}

api.dateFormat = (fmt) => {
  let o = [fmt.getMonth() + 1, fmt.getDate(), fmt.getHours(), fmt.getMinutes(), fmt.getSeconds()]
  o.forEach((k, j) => {
    if (String(k).length === 1) {
      if (k !== 0) {
        o[j] = '0' + String(k)
      } else {
        o[j] = '00'
      }
    }
  })
  return fmt.getFullYear() + '-' + o[0] + '-' + o[1] + ' ' + o[2] + ':' + o[3] + ':' + o[4]
  // return o[2] + ':' + o[3] + ':' + o[4]
}

api.dateFormat1 = (fmt) => {
  let o = [fmt.getMonth() + 1, fmt.getDate(), fmt.getHours(), fmt.getMinutes(), fmt.getSeconds()]
  o.forEach((k, j) => {
    if (String(k).length === 1) {
      if (k !== 0) {
        o[j] = '0' + String(k)
      } else {
        o[j] = '00'
      }
    }
  })
  return o[0] + '-' + o[1] + ' ' + o[2] + ':00'
}

export default api
