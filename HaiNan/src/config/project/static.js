import Vue from 'vue'

// imgs
import maskImage from '@/assets/img/maskImage.png'
import icon from '@/assets/img/icon.png'
import logo from '@/assets/img/logo.png'
import loginBg from '@/assets/img/loginBg.png'
import mainBg from '@/assets/img/mainBg.png'
import Search from '@/assets/img/search.png'
import selectOption from '@/assets/img/selectOption.png'
import goback from '@/assets/img/goback.png'
import user from '@/assets/img/user.png'
import select from '@/assets/img/select.png'
import upload from '@/assets/img/upload.png'
import loudong from '@/assets/img/loudong.png'
import loudongActive from '@/assets/img/loudong-active.png'
import smallImg from '@/assets/img/smallImg.png'
import bigImg from '@/assets/img/bigImg.png'

import '@/assets/css/reset.css'
import '@/assets/css/common.scss'
import common from '@/assets/js/common.js'
Vue.prototype.$common = common

// 图片引入
Vue.prototype.$img = {
  maskImage: maskImage,
  logo: logo,
  loginBg: loginBg,
  mainBg: mainBg,
  Search: Search,
  selectOption: selectOption,
  goback: goback,
  user: user,
  select: select,
  upload: upload,
  loudong: loudong,
  loudongActive: loudongActive,
  smallImg: smallImg,
  bigImg: bigImg
}

Vue.prototype.$bugType = {
  placeholder: '漏洞类型',
  option: [
    {value: '0', label: '其他'},
    {value: '1', label: '工控系统'},
    {value: '2', label: '移动互联网'},
    {value: '3', label: '电信'},
    {value: '4', label: 'web应用漏洞'},
    {value: '5', label: '安全产品漏洞'},
    {value: '6', label: '操作系统漏洞'},
    {value: '7', label: '数据库漏洞'},
    {value: '8', label: '网络设备漏洞'},
    {value: '9', label: '应用程序漏洞'}
  ]
}
Vue.prototype.$harmWho = {
  placeholder: '攻击类型',
  option: [
    {value: '10', label: '未知'},
    {value: '11', label: 'SQL注入'},
    {value: '12', label: '代码注入'},
    {value: '13', label: '代码问题'},
    {value: '14', label: '会话固定'},
    {value: '15', label: '信任管理'},
    {value: '16', label: '信息泄露'},
    {value: '17', label: '加密问题'},
    {value: '18', label: '后置链接'},
    {value: '19', label: '命令注入'},
    {value: '20', label: '安全特征问题'},
    {value: '21', label: '开放重定向'},
    {value: '22', label: '授权问题'},
    {value: '23', label: '控制错误'},
    {value: '24', label: '操作系统命令注入'},
    {value: '25', label: '数字错误'},
    {value: '26', label: '整数错误'},
    {value: '27', label: '未充分验证数据可靠性'},
    {value: '28', label: '权限许可和访问控制'},
    {value: '29', label: '权限许可和访问控制错误'},
    {value: '30', label: '格式化字符串'},
    {value: '31', label: '注入'},
    {value: '32', label: '环境条件错误'},
    {value: '33', label: '竞争条件'},
    {value: '34', label: '缓冲区溢出'},
    {value: '35', label: '缓冲区错误'},
    {value: '36', label: '设计错误'},
    {value: '37', label: '访问控制'},
    {value: '38', label: '访问验证错误'},
    {value: '39', label: '资料不足'},
    {value: '40', label: '资源管理错误'},
    {value: '41', label: '跨站脚本'},
    {value: '42', label: '跨站请求伪造'},
    {value: '43', label: '路径遍历'},
    {value: '44', label: '输入验证'},
    {value: '45', label: '边界条件错误'},
    {value: '46', label: '配置错误'}
  ]
}
Vue.prototype.$bugTypeDic = (val) => {
  var bugType = {
    '10': '未知',
    '11': 'SQL注入',
    '12': '代码注入',
    '13': '代码问题',
    '14': '会话固定',
    '15': '信任管理',
    '16': '信息泄露',
    '17': '加密问题',
    '18': '后置链接',
    '19': '命令注入',
    '20': '安全特征问题',
    '21': '开放重定向',
    '22': '授权问题',
    '23': '控制错误',
    '24': '操作系统命令注入',
    '25': '数字错误',
    '26': '整数错误',
    '27': '未充分验证数据可靠性',
    '28': '权限许可和访问控制',
    '29': '权限许可和访问控制错误',
    '30': '格式化字符串',
    '31': '注入',
    '32': '环境条件错误',
    '33': '竞争条件',
    '34': '缓冲区溢出',
    '35': '缓冲区错误',
    '36': '设计错误',
    '37': '访问控制',
    '38': '访问验证错误',
    '39': '资料不足',
    '40': '资源管理错误',
    '41': '跨站脚本',
    '42': '跨站请求伪造',
    '43': '路径遍历',
    '44': '输入验证',
    '45': '边界条件错误',
    '46': '配置错误'
  }
  return bugType[val]
}

Vue.prototype.$harmWhoDic = (val) => {
  var harmWho = {
    '0': '其他',
    '1': '工控系统',
    '2': '移动互联网',
    '3': '电信',
    '4': 'web应用漏洞',
    '5': '安全产品漏洞',
    '6': '操作系统漏洞',
    '7': '数据库漏洞',
    '8': '网络设备漏洞',
    '9': '应用程序漏洞'
  }
  return harmWho[val]
}

const webIcon = document.querySelector('#web-icon')
webIcon.href = icon

// 项目的中英文名字
Vue.prototype.$projectEnName = 'project'
Vue.prototype.$projectCnName = document.title = '软件供应链漏洞威胁基因检测系统' // 基于大数据软件基因的漏洞预处理平台
