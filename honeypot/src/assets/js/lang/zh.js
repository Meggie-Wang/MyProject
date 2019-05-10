import Vue from 'vue'
export const messages = {
  register: {
    'enterUserName': '请输入用户名',
    'enterPwd': '请输入密码',
    'confirmPwd': '请确认密码',
    'enterEmail': '请输入邮箱，注册后验证邮箱以获取更多权限',
    'register': '立即注册',
    'agree': '我已阅读并同意',
    'clause': 'Roarpanda用户服务条款',
    'and': '和',
    'strategy': '隐私策略',
    'checkOut': '请勾选',
    'userNameEmpty': '用户名不能为空',
    'pwdEmpty': '密码不能为空',
    'confirmPwdEmpty': '确认密码不能为空',
    'emailEmpty': '邮箱不能为空',
    'userNameTip': '用户名请用6~12位数字及字母组合',
    'pwdTip': '密码请用8~18位数字及字母组合',
    'enterCorrectEmail': '请输入正确的邮箱地址',
    'diffPwd': '两次密码不同',
    'succeRegister': '注册成功！请激活邮箱以获得更多权限',
    'regTipOne': '参数不能为空',
    'regTipTwo': '用户名为6-16位字母数字组合',
    'regTipThree': '密码为8-18为字母数字组合',
    'regTipFour': '邮箱格式不正确',
    'regTipFive': '用户或邮箱已存在',
    'regTipSix': '服务器繁忙',
    'accountNum': '已有账号？'
  },
  login: {
    'login': '登录',
    'loginNow': '立即登录',
    'rememberPwd': '记住密码',
    'noAccountNum': '没有账号?',
    'formatError': '用户名或密码格式错误',
    'lockTip': '大写锁定键被按下，请注意大小写',
    'loginTip': '用户名或密码错误',
    'incorrectErr': '今天此模块接口的访问已达上限！',
    'reLogin': '请重新登录',
    'guestLogin': '游客一键登录',
    'logged': '正在登录',
    'loginTipOne': '试用账号已到期！',
    'loginTipTwo': '服务器繁忙'
  },
  main: {
    'maliciousInvasion': '最近15分钟恶意入侵'
  },
  nav: {
    navData: [
      {
        name: '首页',
        component: 'Main'
      },
      {
        name: '态势',
        component: 'AttackState'
      },
      {
        name: '日志',
        component: 'Logs'
      },
      {
        name: '状态',
        component: 'Status'
      },
      {
        name: '帮助',
        component: 'Help'
      },
      {
        name: '关于',
        component: 'About'
      }
    ],
    'exit': '退出'
  },
  search: {
    'input': '请输入IP地址、DNS域名、文件MD5值',
    'searchTip': '请输入正确的IP地址，DNS域名或文件MD5值'
  },
  searchDetail: {
    'maliceJudgment': '恶意性判定',
    'nonMaliciously': '非恶意性',
    'malice': '恶意性',
    'unknow': '未知',
    'country': '国家',
    'provinceAndState': '省/州',
    'city': '城市',
    'coordinate': '坐标',
    'relatedDNS': '相关DNS',
    'relatedIP': '相关IP',
    'time': '时间',
    'relatedURLs': '相关URLs',
    'urlInfo': 'url信息',
    'relatedSha': '相关文件Sha256值',
    'fileType': '文件类型',
    'positionInfo': '位置信息',
    'essentialInfo': '基本信息',
    'packer': '加壳',
    'softLabel': '杀软标签',
    'staticInfo': '静态信息',
    'section': '程序段信息',
    'fileName': '文件名',
    'adress': '地址',
    'virtualSize': '大小',
    'rawSize': '尺寸',
    'entropy': '熵',
    'imports': '载入库信息',
    'exifTool': '附加文件信息',
    'dynamicInfo': '动态信息',
    'netWorkCommunicat': '网络操作',
    'fileSystemAction': '文件操作',
    'processService': '进程或服务操作',
    'syncMechanisms': '同步操作',
    'moduleLoad': '模块导入操作',
    'relationshipInfo': '关系信息',
    'scanneDate': '扫描日期'
  },
  logs: {
    'searchCont': '请输入搜索内容',
    'noResult': '无结果',
    'resources': '资源',
    'detail': '详情',
    'fold': '收起',
    'logSearchTip': '搜索内容不能为空'
  },
  status: {
    'attackTypeTime': '攻击类型时间分布图',
    'targetPortTime': '目标端口时间分布图',
    'attackSourceCountry': '攻击源国家分布图',
    'attackUsers': '字典口令攻击用户分布图',
    'attackPwd': '字典口令攻击密码分布图',
    'maliciousCodeUser': '恶意代码用户分布图',
    'maliciousCodePwd': '恶意代码密码分布图',
    'attackSourceTime': '攻击来源时间分布图'
  },
  about: {
    'status': '状态',
    'days': '天',
    stateNames: ['攻击事件总量', '活跃探针数', '存储量', '监控时间'],
    'introduceOne': Vue.prototype.$projectCnName,
    'introduceTwo': '是上海戎磐网络科技有限公司独立开发的一款恶意网络攻击行为及样本捕获系统。系统基于分布式架构，构建协议攻击、Web攻击、会话攻击、口令攻击等多类型蜜罐，基于容器实现轻量化虚拟集中管理，凭借多年环境模拟、行为监控技术及经验积累能够为软件基因、威胁情报、攻击溯源和态势感知等需求提供及时、真实、详细的数据支撑。',
    websiteIntroductions: [
      '支持多种类型蜜罐。包括协议攻击、工控网络攻击、Web攻击、会话攻击、口令攻击等多类型蜜罐，覆盖不同行业、领域。',
      '连接戎磐数据云，多维度还原攻击事件的相关信息。包括：恶意IP基本信息、DNS信息、URL信息、文件信息。',
      '客户可获得所有的监控细节数据，便于客户使用自己的分析手段，深度分析威胁信息。',
      '可定制展示页面。客户可定制展示页面的形式和组合，以及定制化模板通报功能。',
      '连接戎磐基因分析云，画像恶意IP相关文件的归属，辅助溯源恶意IP。',
      '根据客户的监控需求，可定制蜜罐部署规模，提高客户的监控范围。'
    ],
    'introduceThree': '上海戎磐网络科技有限公司是以“软件基因”为核心技术的网络安全公司，公司融合机器学习、大数据、软件基因等核心技术，主要开展网络安全大数据分析，恶意代码基因检测、网络基因态势感知等服务及业务。目标是为各行业和国家提供强有力的网络安全技术支撑，为用户单位在互联网时代下的信息安全建设、业务安全风控、科技安全保障和国家战略安全做出技术贡献，努力推动和引领网络安全技术进步，打造网络安全领域创新品牌。公司核心团队主要由部队自主择业干部构成，相关产品已在军队、政府、网络安全企业等进行了服务推广应用，是典型的军民融合技术创新型企业。',
    'company': '上海戎磐网络科技有限公司'
  }
}
