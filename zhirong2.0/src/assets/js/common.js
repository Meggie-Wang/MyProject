import Vue from 'vue'

// 分割cookie参数
const getCookie = (cookieName) => {
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

const setCookie = (name, value) => {
  // 定义一天
  let days = 1
  let exp = new Date()
  // 定义的失效时间，
  exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000)
  // 写入Cookie  ，toGMTstring将时间转换成字符串。
  document.cookie = name + '=' + escape(value) + ';path=/;expires=' + exp.toGMTString
}

// 验证输入内容 用户名验证 case=0 ,密码验证 case=1
const inputTest = (val, choose) => {
  if (choose === 0) {
    var reg = new RegExp('^[A-Za-z0-9-]+$')
    var rs = ''
    for (var i = 0; i < val.length; i++) {
      rs = rs + (reg.test(val.substr(i, 1)) ? val.substr(i, 1) : '')
    }
    return rs
  } else if (choose === 1) {
    var reg2 = new RegExp('^[A-Za-z0-9_\u4e00-\u9fa5]+$')
    var rs2 = ''
    for (var j = 0; j < val.length; j++) {
      rs2 = rs2 + (reg2.test(val.substr(j, 1)) ? val.substr(j, 1) : '')
    }
    return rs2
  }
}

// 验证文件名
const fileName = (str) => {
  if (/^[\w-.]+$/.test(str) && str.indexOf(' ') === -1) {
    return true
  }
  return false
}

// 时间转换
const dateChange = (val) => {
  var Time = val
  var choose = -1
  Time = String(Time).split('.')[0]
  if (/^(\d{10})$/.test(Time)) {
    // 时间戳
    choose = 1
  } else if (/^(((\d{4})[-](\d{1,2})[-](\d{1,2})))[T\s](\d{1,2}):(\d{1,2}):(\d{1,2})$/.test(Time)) {
    // 匹配 2018-11-28T00:12:40
    if (Time.indexOf(' ') > -1) {
      Time = Time.replace(' ', 'T')
    }
    choose = 0
  } else {
    choose = 0
  }
  if (choose === 0) {
    // 日期转换
    Time = new Date(Time)
    let o = [Time.getMonth() + 1, Time.getDate(), Time.getHours(), Time.getMinutes(), Time.getSeconds()]
    o.forEach((k, j) => {
      if (String(k).length === 1) {
        if (k !== 0) {
          o[j] = '0' + String(k)
        } else {
          o[j] = '00'
        }
      }
    })
    return Time.getFullYear() + '-' + o[0] + '-' + o[1] + ' ' + o[2] + ':' + o[3] + ':' + o[4]
  } else if (choose === 1) {
    // 时间戳转换
    if (Time) {
      var date = new Date(Time * 1000)
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
      var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
      var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
      var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
      return Y + M + D + h + m + s
    } else {
      return '0000-00-00 00:00:00'
    }
  }
}

// obj arr 继承
const inheritObj = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

// 后端传来的数据是一个非标准格式json的字符串，需要全部替换单引号为双引号的func
const formatJson = (str) => {
  if (str) {
    return JSON.parse(str.replace(/'/g, '"'))
  } else {
    return str
  }
}

// 打印
const print = () => {
  // 打印开始之前，隐藏sidebar
  if (Number(window.localStorage.userClass) !== 4) {
    let sideBar = document.querySelector('.side-bar')
    let btn = document.querySelector('.handleButton')
    sideBar.className = 'side-bar'
    btn.className = 'handleButton __handCursor'
  }
  // 开始打印
  window.print()
}

const printConHeight = (route) => {
  // 主路由app启动函数
  // 实时检测route
  // 定义html, body, app 高度
  let height = ''
  switch (route.path) {
    case '/SampleReport':case '/ReportDetail':case '/iotSampleReport':
      height = 'auto!important'
      break
    default:
      height = '100%!important'
      break
  }
  document.querySelector('html').setAttribute('style', 'height: ' + height)
  document.querySelector('body').setAttribute('style', 'height: ' + height)
  return height
}

const homePrintConOverflowY = (route) => {
  let oy = ''
  switch (route.path) {
    case '/SampleReport':case '/ReportDetail':
      oy = true
      break
    default:
      oy = false
      break
  }
  return oy
}

// 数字转单位
const numberChange = (num) => {
  let nn = isNaN(num) ? 0 : String(num)
  let showNum = 0
  let func = (ll, kmgt) => {
    return nn.slice(0, nn.length - ll) + '.' + nn.slice(nn.length - ll, nn.length - ll + 2) + kmgt
  }
  if (nn.length <= 3) {
    showNum = nn
  } else if (nn.length > 3 && nn.length <= 6) {
    showNum = func(3, 'K')
  } else if (nn.length > 6 && nn.length <= 9) {
    showNum = func(6, 'M')
  } else if (nn.length > 9 && nn.length <= 12) {
    showNum = func(9, 'G')
  } else if (nn.length > 12) {
    showNum = func(12, 'T')
  }
  return showNum
}

// 滚动条
const scrollBar = () => {
  let userAgent = () => {
    var userAgent = navigator.userAgent // 取得浏览器的userAgent字符串
    var isFF = userAgent.indexOf('Firefox') > -1 // 判断是否Firefox浏览器
    var isMac = userAgent.indexOf('Mac') > -1 // mac os
    var isLinux = userAgent.indexOf('Linux') > -1 // Linux
    return {
      isFF: isFF,
      isMac: isMac,
      isLinux: isLinux
    }
  }
  let detectionTableThW = 0
  let agent = userAgent()
  if (agent.isMac) {
    if (agent.isFF) {
      detectionTableThW = '0px'
    } else {
      detectionTableThW = '0px'
    }
  } else if (agent.isLinux) {
    if (agent.isFF) {
      detectionTableThW = '10px'
    } else {
      detectionTableThW = '10px'
    }
  } else {
    if (agent.isFF) {
      detectionTableThW = '17px'
    } else {
      detectionTableThW = '17px'
    }
  }
  Vue.prototype.detectionTableThW = detectionTableThW
}
scrollBar()

/*
** randomWord 产生任意长度随机字母数字组合
** randomFlag-是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
*/
const randomWord = (randomFlag, min, max) => {
  let str = ''
  let range = min
  let arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  // 随机产生
  if (randomFlag) {
    range = Math.round(Math.random() * (max - min)) + min
  }
  for (var i = 0; i < range; i++) {
    let pos = Math.round(Math.random() * (arr.length - 1))
    str += arr[pos]
  }
  return str
}

// 文件下载
const downloadFile = (url, callback) => {
  try {
    var elemIF = document.createElement('iframe')
    elemIF.src = localStorage.downloadUrl + url
    elemIF.style.display = 'none'
    document.body.appendChild(elemIF)
    if (callback) {
      callback()
    }
  } catch (e) {
    alert('下载异常!')
  }
}

// 将一个对象切割成N个对象并加入到一个数组
const splitObjToArr = (d, n) => {
  let objLen = Object.keys(d).length // 由于vue动态给数据对象添加的__ob__增加了属性名长度, getOwnPropertyNames 会获取到
  let targetArr = [] // 最后导出
  let objFlag = 1 // 递归行计数
  let objItem = {} // 单行存储
  for (let x in d) {
    objItem[x] = d[x]
    if (objFlag === n) {
      // 当行最后一位
      objFlag = 1
      targetArr.push(objItem)
      objItem = {}
    } else if (targetArr.length === parseInt(objLen / n) && objFlag === objLen % n) {
      // 不足一行
      // 导出 === 总行数 - 1
      // && 递增flag === 最后一行数
      targetArr.push(objItem)
    } else if (objFlag < n) {
      objFlag++
    }
  }
  return targetArr
}

// 分析报告详情，根据报告的type，返回时间字符串
// 日报： h:m:s
// 周报：月报 y-m-d
const typeTime = (time, type) => {
  let timeStr = ''
  switch (Number(type)) {
    case 1:
      timeStr = time.slice(11, 19)
      break
    case 2:case 3:
      timeStr = time.slice(0, 10)
      break
  }
  return timeStr
}

export default {
  getCookie: getCookie,
  setCookie: setCookie,
  inputTest: inputTest,
  fileName: fileName,
  dateChange: dateChange,
  inheritObj: inheritObj,
  formatJson: formatJson,
  print: print,
  printConHeight: printConHeight,
  homePrintConOverflowY: homePrintConOverflowY,
  numberChange: numberChange,
  randomWord: randomWord,
  downloadFile: downloadFile,
  splitObjToArr: splitObjToArr,
  typeTime: typeTime
}
