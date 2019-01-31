import axios from 'axios'
import Vue from 'vue'

let requestUrl = ''
if (Vue.config.productionTip) {
  requestUrl =  'http://taishi.roarpanda.com:9000/' // 'http://192.168.1.33/'
} else {
  requestUrl = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '') + '/'
}
const securityHeadPic = '//taishi.roarpanda.com:9527/'

export default {
  requestUrl,
  securityHeadPic,
  /*
  * yhy
  * 获取url参数
  */ 
  getUrlByName(paramValue) {
    if (location.href.indexOf('?') > -1) {
      let url = location.href.split('?')[1]
      let theRequest = {}
      let strs = url.split("&")
      for(var i = 0; i < strs.length; i ++) {
        theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1])
      }
      return theRequest
    }
  },
  /**
   * 游客登录
  */
  getGuest () {
    return axios.get(requestUrl + 'user/anonlogin/')
  },
  /**
   * 登录
  */
  postLogin (para) {
    // 方法一：
    // axios.post('http://192.168.1.171/login/', para, {
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   }
    // })
    // .then(function (response) {
    //   console.log(response)
    // })
    // .catch(function (error) {
    //   console.log(error)
    // });
    // 方法二
    // const url ='http://192.168.1.171/login/'
    // var params = new URLSearchParams()
    // // 你要传给后台的参数值 key/value
    // params.append('username', para.username)
    // params.append('password', para.password)
    // axios({
    //     method: 'post',
    //     url:url,
    //     data:params
    // }).then((res)=>{        
    // });
    // 方法三
    const url = requestUrl + 'user/newlogin/'
    var params = new URLSearchParams();
    // 你要传给后台的参数值 key/value
    // params.append('csrfmiddlewaretoken', 'APgpK82XxarwQUW36i5QaHq1SCGrEryuukTzBE1GuUZIa2lOxS6Jol8jx2ONvmOl');
    params.append('username', para.username)
    params.append('password', para.password)
    return axios.post(url, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },
  /**
   * 注册
  */
  postRegister (para) {
    const url = requestUrl + 'user/newregister'
    var params = new URLSearchParams()
    // 你要传给后台的参数值 key/value
    params.append('username', para.username)
    params.append('password', para.password)
    params.append('email', para.email);
    return axios.post(url, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },
  /**
   * 修改密码
  */
  postmodifyPassword (para) {
    const url = requestUrl + 'user/newchangepassword'
    var params = new URLSearchParams()
    // 你要传给后台的参数值 key/value
    params.append('username', para.username)
    params.append('old_password', para.oldPassword)
    params.append('new_password', para.newPassword)
    return axios.post(url, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },
  /**
   * 邮箱验证
  */
  getEamilActive (val) {
    return axios.get(requestUrl + 'user/active/' + val)
  },
  /**
   * 邮箱再次激活
  */
  postEamilActivate (para) {
    const url = requestUrl + 'user/pactive'
    var params = new URLSearchParams()
    // 你要传给后台的参数值 key/value
    params.append('email', para.email)
    params.append('token', para.token)
    return axios.post(url, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },
  /**
   * 大屏黑客图表
  */
  formatData () {
    return axios.get(requestUrl + 'api/dashboard/hacker_tracking/?format=json')
  },
  /**
   * 大屏饼图
   * author: yhy
   * 接口内新增字段对象描述饼图模块标签数据
   * numbers:[{gene_amount: 2777},{samples_amount: 209},{ip_amount:2222}]
   * end yhy .
  */
  pie () {
    return axios.get(requestUrl + 'api/pie_amount/')
  },
  /**
   * 大屏柱状图
  */
  column () {
    return axios.get(requestUrl + 'api/hole_aritcle_amount/')
  },
  /**
   * 大屏数据更新态势
  */
  dynamicChart () {
    return axios.get(requestUrl + 'api/realholedata/')
  },
  /**
   * 大屏热点分析
  */
  wordList (number) {
    return axios.get(requestUrl + 'api/hotword/?number=' + number)
  },
  wordListEn (number) {
    return axios.get(requestUrl + 'api/cvehotword/?number=' + number)
  },
  /**
   * ip指纹分布(世界地图)
  */
  point () {
    return axios.get(requestUrl + 'api/show_top_50/')
  },
  /**
   * 大屏安全信息(列表)
   * author: yhy 04/03
   * 原接口api/dashboard/security_info/
   * 更新动态数据接口api/IndexSecurityInfo
   * end yhy .
  */
  secureInfoList (url) {
    if (typeof url === 'undefined' || typeof url === 'object') {
      return axios.get(requestUrl + 'api/IndexSecurityInfo/')
    } else {
      return axios.get(url)
    }
  },
  secureInfoListEn(url = null) {
    if (typeof url === 'undefined' || typeof url === 'object') {
      return axios.get(requestUrl + 'api/article_en/')
    } else {
      return axios.get(url)
    }
  },
  // window.onresize
  windowResize(that) {
    window.addEventListener('resize', function() {
      if (location.href.split('#/')[1] === 'dashboard') {
        that.myChart.resize()
      }
    }.bind(that))
  },
  /**
   * list左边栏
  */
  getChoice (port, tags, country, from, search = null, ip = null, city = null, province = null) {
    var token = this.getCookie('token_virus')
    return axios.get(requestUrl + 'api/filterquery/?port=' + port + '&tags=' + tags + '&country=' + country + "&from=" + from + "&search=" + search.toLowerCase() + '&ip=' + ip + '&city=' + city + '&province=' + province + '&token=' + token)
  },
  /*
  * yhy
  * 高级搜索国家选择
  */
  getCountry (apiName, requestData) {
    return axios.get(requestUrl + 'api/' + apiName, {params: requestData})
  },
  /**
   * 搜索列表详情
  */
  getIpDetail (params) {
    var token = this.getCookie('token_virus')
    return axios.get(requestUrl + 'api/ipexteranlinfo/?ipaddress=' + params + '&token=' + token)
  },
  /**
   * 端口服务
  */
  getPorts () {
    // return axios.get(requestUrl + 'static/json/ports.json')
    return axios.get('./static/json/ports.json')
  },
  getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';')
        for (var i = 0; i < cookies.length; i++) {
        var cookie = jQuery.trim(cookies[i])
        if (cookie.substring(0, name.length + 1) == (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue
  },
  setCookie (name, value, expiredays) {
    var exdate = new Date()
    exdate.setTime(exdate.getTime() + (expiredays * 60 * 60 * 1000 * 24 * 7))
    var expires = 'expires=' + exdate.toUTCString()
    document.cookie = name + '=' + value + '; ' + expires
  },
  /**
   * 基因检测上传
  */
  postDetectionUp (params, fd) {
    var c = this.getCookie('csrftoken')
    axios.defaults.xsrfCookieName = 'HTTP_X_CSRFTOKEN'
    axios.defaults.xsrfHeaderName = c
    return axios.post(requestUrl + 'api/upload/' + params, fd, {
      timeout: 120000
    })
  },
  /**
   * 基因解析
  */
  getFileName (fileName, filePath) {
    var token = this.getCookie('token_virus')
    return axios.get(requestUrl + 'api/checkviruses/?testName=' + fileName + '&testPath=' + filePath + '&token=' + token)
  },
  /**
   * 检测队列
  */
  getQueueEchartsDay () {
    return axios.get(requestUrl + 'api/GENE_projectInfo/submitDaily/')
  },
  getQueue () {
    var token = this.getCookie('token_virus')
    return axios.get(requestUrl + 'api/checkstatus/' + '?token=' + token)
  },
  /**
   * 检测历史
  */
  getQueueEchartsMonth () {
    return axios.get(requestUrl + 'api/GENE_projectInfo/submitMonthly/')
  },
  getDecetionPage (page) {
    return axios.get(requestUrl + 'api/checkhistory/?format=json&page=' + page)
  },
  /**
   * 基因报告页面数据
  */
  getGenetic (id, fileName) {
    var token = this.getCookie('token_virus')
    return axios.get(requestUrl + 'api/GENE_projectInfo/id=' + id + '/filename=' + fileName + '/' + '?token=' + token)
  },
  /**
   * 安全文章
  */
  safeArticle(id = null, page = null, search = null) {
    if (id) {
      return axios.get(requestUrl + 'api/articlesecurity/' + id)
    }
    // 搜索
    if (page && search) {
      return axios.get(requestUrl + 'api/articlesecurity/?page=' + page + '&search=' + search)
    }
    if (page) {
      return axios.get(requestUrl + 'api/articlesecurity/?page=' + page)
    }
  },
  /**
   * 安全信息
  */
  safeInfor(page = null, search = null) {
    return axios.get(requestUrl + 'api/articlesecuritybug/?page=' + page + '&search=' + search)
  },
  // 安全热词
  safeWords (page = null, search = null, time = null) {
    // 搜索
    if (page && search && time) {
      return axios.get(requestUrl + 'api/hotword_list/?page=' + page + '&search=' + search + '&time=' + time)
    }
    // 最新录入热词
    if (page && time) {
      return axios.get(requestUrl + 'api/hotword_list/?page=' + page + '&time=' + time)
    }
    // 搜索
    if (page && search) {
      return axios.get(requestUrl + 'api/hotword_list/?page=' + page + '&search=' + search)
    }
    if (page) {
      return axios.get(requestUrl + 'api/hotword_list/?page=' + page)
    }
  },
  // 安全热词详情
  wordListDetail (name, page) {
    return axios.get(requestUrl + 'api/hotword_information/?name=' + name + '&page=' + page)
  },
  // 安全热词英文
  safeWordsEn (page = null, search = null, time = null) {
    // 搜索
    if (page && search && time) {
      return axios.get(requestUrl + 'api/cve_hotword_list/?page=' + page + '&search=' + search + '&time=' + time)
    }
    // 最新录入热词
    if (page && time) {
      return axios.get(requestUrl + 'api/cve_hotword_list/?page=' + page + '&time=' + time)
    }
    // 搜索
    if (page && search) {
      return axios.get(requestUrl + 'api/cve_hotword_list/?page=' + page + '&search=' + search)
    }
    if (page) {
      return axios.get(requestUrl + 'api/cve_hotword_list/?page=' + page)
    }
  },
  // 安全热词英文详情
  wordListDetailEn (name, page) {
    return axios.get(requestUrl + 'api/cve_hotword_information/?name=' + name + '&page=' + page)
  },
  /**
   * 漏洞信息
  */
  getInforLoophole (choice = null, page = null, id = null, search = null) {
    // 搜索
    if (choice && page && search) {
      return axios.get(requestUrl + 'api/holeinfo_list/?choice=' + choice + '&page=' + page + '&search=' + search)
    }
    if (choice && page) {
      return axios.get(requestUrl + 'api/holeinfo_list/?choice=' + choice + '&page=' + page)
    }
    // 详情
    if (id) {
      return axios.get(requestUrl + 'api/holeinfo_list/?id=' + id)
    }
  },
  /**
   * 漏洞信息英文
  */
  getInforLoopholeEn (choice = null, page = null, id = null, search = null) {
    // 搜索
    if (choice && page && search) {
      return axios.get(requestUrl + 'api/cve/?choice=' + choice + '&page=' + page + '&search=' + search)
    }
    if (choice && page) {
      return axios.get(requestUrl + 'api/cve/?choice=' + choice + '&page=' + page)
    }
    // 详情
    if (id) {
      return axios.get(requestUrl + 'api/cve/?id=' + id)
    }
  },
  // 样本API
  getSampleCount () {
    return axios.get(requestUrl + 'api/sample_count/')
  },
  getSample (data) {
    return axios.get(requestUrl + 'api/sample_list/?md5=' + (data.md5 || '') + '&type=' + data.type + '&page=' + data.page)
  },
  downloadSample (arr) {
    return axios.get(requestUrl + 'api/download_sample/?sample_list=' + JSON.stringify(arr))
  },
  sampleGene (id) {
    return axios.get(requestUrl + 'api/sample_result/?id=' + id)
  }
}