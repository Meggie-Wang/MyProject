import Vue from 'vue'
import axios from 'axios'
import _this from '@/main.js'

let apiPath = ''
if (Vue.config.productionTip) {
  apiPath = 'http://taishi.roarpanda.com:29000/'
} else {
  apiPath = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '') + '/'
}

localStorage.setItem('apiPath', apiPath)
localStorage.setItem('tokenName', 'hainan')

localStorage.setItem('downloadUrl', apiPath)

// axios 请求超时
// axios.defaults.timeout = 40000

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
      localStorage.setItem(localStorage.tokenName + '_token', undefined)
      localStorage.setItem('session_id', undefined)
      localStorage.setItem('userName', undefined)
      _this.$router.push({path: '/Login'})
    }
    return data
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)

const apiArr = {
  'login': 'user/login/', // 登陆接口 post
  'logout': 'user/logout/', // 登出
  'cveTrend': 'api/cve_trend/', // 漏洞录入数据 传参 days_num
  'analysisTrend': 'api/analysis_trend/', // 漏洞数据分析 传参 days_num
  'cveStyleAttack': 'api/cve_style_attack/', // 漏洞类型分析
  'cveStyleWork': 'api/cve_style_work/', // 漏洞基因库分析
  'softGeneTrend': 'api/soft_gene_trend/', // 漏洞软件及基因数据 传参 days_num
  'wordCloud': 'api/word_cloud/', // 漏洞热词 传参 num
  'indexCveresult': 'api/index_cveresult/', // 录入漏洞
  'bugStore': 'api/bugStore/', // 漏洞库
  'bugStoreDetail': 'api/bugStoreDetail/', // 漏洞库详情
  'exploitCode': 'api/cve_using_code/', // 漏洞库详情漏洞利用代码
  'bugGeneStore': 'api/bugGeneStore/', // 漏洞基因库
  'bugGeneStoreDetail': 'api/bugGeneStoreDetail/', // 漏洞基因库详情
  'softStore': 'api/softStore/', // 漏洞软件库
  'softStoreDetail': 'api/softStoreDetail/', // 漏洞软件库详情
  'uploadsoftware': 'api/uploadsoftware/', // 上传软件
  'upload_cve_using_code': 'api/upload_cve_using_code/', // 漏洞代码上传
  'cveSoftAnalysis': 'api/cveSoftAnalysis/', // 软件分析
  'cluster_analysis': 'api/cluster_analysis/', // 聚类分析
  'detectList': 'api/cve_detect_queue/', // 软件基因检测列表
  'detectResult': 'api/cve_detect_result/', // 软件基因检测结果
  'file_geneinfo': 'api/file_geneinfo/', // 聚类表格
  'userList': 'user/userlist/', // 用户列表
  'softGeneDetectionAct': 'api/softGeneDetectionAct/', // 漏洞基因分析，确定文件基因
  'differAnalysis': 'api/differAnalysis/', // 对比分析
  'image_show': 'api/image_show/', // 展示图片
  'detect_history': 'api/detect_history/', // 对比检测历史
  'analysis_result': 'api/analysis_result/', // 对比结果
  'download_genefile': 'api/download_genefile/', // 下载基因文件
  'add_remark': 'api/add_remark/', // 漏洞详情中基本信息加备注功能
  'softRelateGeneStore': 'api/softRelateGeneStore/', // 漏洞详情中软件的文件列表 & 软件库的相关漏洞基因
  'cve_one_similar': 'api/cve_one_similar/', // 基因检测结果命中漏洞展示
  'file_two_similar': 'api/file_two_similar/' // 基因检测结果命中漏洞: 命中基因展示
}

const api = {}
api.apiPath = apiPath
api.post = (Interface, requestData) => {
  return axios.post(apiPath + apiArr[Interface], requestData, {
    // 转换数据格式，有待测试传送文件的方式时候同样可行。
    transformRequest: [function (requestData) {
      let ret = ''
      if (Interface !== 'login') {
        requestData.token = localStorage[localStorage.tokenName + '_token']
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
  if (!requestData) requestData = {}
  // return api.tokenDate().then((tokenRes) => {
  //   if (Interface !== 'guestLogin') {
  //     requestData.token = localStorage[localStorage.tokenName + '_token']
  //   }
  return axios.get(apiPath + apiArr[Interface], {
    params: requestData,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  // })
}

// 请求接口时判断token是否过期
api.tokenDate = () => {
  var p = new Promise(function (resolve) {
    // 当前请求时间
    let nowTime = Date.parse(new Date()) / 1000
    // token刷新时间
    let expTime = Number(localStorage.token_exp)
    // token过期时间
    let refreshExpTime = Number(localStorage.token_refresh_exp)
    // 当前请求时间小于刷新token时间并且大于token过期时间，刷新token
    if (nowTime >= expTime && nowTime < refreshExpTime) {
      api.post('refreshtoken', {
        username: localStorage.userName
      }).then((res) => {
        if (res.status === 1) {
          localStorage.setItem(localStorage.tokenName + '_token', res.token)
          localStorage.setItem('token_exp', res.token_exp)
          resolve()
        }
      })
    // 当前请求时间大于token刷新时间，重新登录
    } else if (nowTime >= refreshExpTime) {
      localStorage.setItem(localStorage.tokenName + '_token', undefined)
      localStorage.setItem('token_refresh_exp', undefined)
      localStorage.setItem('token_exp', undefined)
      resolve()
    } else {
      resolve()
    }
  })
  return p
}

api.upload = (Interface, formData, config) => {
  formData.append('token', localStorage[localStorage.tokenName + '_token'])
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

export default api
