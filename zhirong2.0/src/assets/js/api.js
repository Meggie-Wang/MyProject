import axios from 'axios'
import _this from '@/main.js'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(
  (response) => {
    // 对响应数据做些事
    let data
    if (response.data) {
      data = response.data
    } else {
      data = response
    }
    // 401 跳转到login
    if (data.status === 401) {
      // 清理localStorage
      localStorage.setItem(localStorage.tokenName + '_token', 'undefined')
      localStorage.setItem('session_id', 'undefined')
      localStorage.setItem('userName', 'undefined')
      _this.$router.push({path: '/Login'})
    }
    return data
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)

const $post = (Interface, requestData, apiArr, apiPath) => {
  let timeout = 0
  switch (Interface) {
    case 'report_setting':
      timeout = 60000
      break
    default:
      timeout = 20000
      break
  }
  return axios.post(apiPath + apiArr[Interface], requestData, {
    transformRequest: [function (requestData) {
      if (apiArr[Interface] !== 'login') {
        if (requestData === undefined) {
          requestData = {}
        }
        requestData.token = localStorage[localStorage.tokenName + '_token']
      }
      let ret = ''
      for (let it in requestData) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(requestData[it]) + '&'
      }
      ret = ret.slice(0, ret.length - 1)
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    /* 使用电子邮件发送报表，发送多个邮箱时后端完成需要40-60秒 */
    timeout: timeout
  })
}

const $get = (Interface, requestData, apiArr, apiPath) => {
  if (requestData === undefined) {
    requestData = {}
  }
  // 这里取split是为了适应检测历史详情的title操作
  requestData.token = localStorage[localStorage.tokenName + '_token']
  return axios.get(apiPath + apiArr[Interface], {
    params: requestData,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

const $blob = (Interface, requestData, apiArr, apiPath) => {
  if (requestData === undefined) {
    requestData = {}
  }
  let configOri = {
    params: requestData,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    responseType: 'blob'
  }
  // 这里取split是为了适应检测历史详情的title操作
  requestData.token = localStorage[localStorage.tokenName + '_token']
  return axios.get(apiPath + apiArr[Interface], configOri)
}

const $upload = (Interface, formData, config, apiArr, apiPath) => {
  return new Promise((resolve, reject) => {
    axios.post(apiPath + apiArr[Interface], formData, config).then((res) => {
      if (res) {
        resolve(res)
      }
    }).catch((res) => {
      resolve(res)
    })
  })
}

export default {
  post: $post,
  get: $get,
  blob: $blob,
  upload: $upload
}
