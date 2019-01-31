export const messages = {
  register: {
    "enterUserName": "请输入用户名",
    "enterPwd": "请输入密码",
    "confirmPwd": "请确认密码",
    "enterEmail": "请输入邮箱，注册后验证邮箱以获取更多权限",
    "register": "立即注册",
    "agree": "我已阅读并同意",
    "clause": "Roarpanda用户服务条款",
    "and": "和",
    "strategy": "隐私策略",
    "checkOut": "请勾选",
    "userNameEmpty": "用户名不能为空",
    "pwdEmpty": "密码不能为空",
    "confirmPwdEmpty": "确认密码不能为空",
    "emailEmpty": "邮箱不能为空",
    "userNameTip": "用户名请用6~16位数字及字母组合",
    "pwdTip": "密码请用8~18位数字及字母组合",
    "enterCorrectEmail": "请输入正确的邮箱地址",
    "diffPwd": "两次密码不同",
    "succeRegister": "注册成功！请激活邮箱以获得更多权限",
    "regTipOne": "参数不能为空",
    "regTipTwo": "用户名为6-16位字母数字组合",
    "regTipThree": "密码为8-18位字母数字组合",
    "regTipFour": "邮箱格式不正确",
    "regTipFive": "用户或邮箱已存在",
    "regTipSix": "服务器繁忙",
    'accountNum': '已有账号？'
  },
  login: {
    "login": "登录",
    'loginNow': '立即登录',
    "guest": "游客登录",
    "rememberPwd": "记住密码",
    "noAccountNum": "没有账号?",
    "pleaseLogin": "请登录！",
    "loginTip": "用户名或密码错误",
    "incorrectErr": "今天此模块接口的访问已达上限！",
    "logged": "正在登录",
    "loginTipOne": "试用账号已到期！",
    "loginTipTwo": "服务器繁忙"
  },
  dashboard: {
    "totalData": "数据总量",
    "hotSpotAnalysis": "热点分析",
    "threatInfo": "威胁信息",
    "IPFingerDistribut": "IP指纹分布",
    "hackerTrack": "黑客跟踪",
    "realTimeData": "实时数据",
    "vulnerabilityTotal": "漏洞总量",
    "title": "标题",
    "explain": "说明",
    "obtainTime": "获得时间",
    "securityHole": "安全漏洞",
    pointLegend: [
      {
        name: "展示分布"
      },
      {
        name: "TOP 5"
      }
    ],
    gene: "基因信息",
    geneTotal: [
      {
        name: '基因总量'
      }
    ],
    sample: "恶意样本",
    sampleTotal: [
      {
        name: '样本总量'
      }
    ],
    IPFingerprint: "IP指纹信息",
    IPTotal: [
      {
        name: 'IP指纹总量'
      }
    ],
    pieGeneArr: [
      {
        name: "共性基因"
      },
      {
        name: "家族基因"
      },
      {
        name: "特殊基因"
      }
    ],
    pieToolsArr: [
      {
        name: "蠕虫"
      },
      {
        name: "木马"
      },
      {
        name: "病毒"
      },
      {
        name: "黑客工具"
      },
      {
        name: "其他"
      }
    ],
    columnLegend: [
      {
        name: "CNVD总量"
      },
      {
        name: "CVE总量"
      }
    ],
    dynamicLegend: [
      {
        name: "CVE漏洞"
      },
      {
        name: "CNVD漏洞"
      }
    ],
    "prePage": "上一页",
    "nextPage": "下一页",
    "more": "更 多",
    "details": "详情"
  },
  nav: {
    dadLi: [
      {
        componentName: "dashboard",
        title: "首页",
        indexNum: 0
      },
      {
        componentName: "search",
        title: "IP指纹",
        indexNum: 1
      },
      // {
      //   componentName: "softGene",
      //   title: "软件基因",
      //   indexNum: 2
      // },
      {
        componentName: "threats",
        title: "威胁情报",
        indexNum: 3
      },
      {
        componentName: "help",
        title: "样本API",
        indexNum: 4
      }
      // {
      //   componentName: "about",
      //   title: "关于戎磐",
      //   indexNum: 5
      // }
    ],
    dropMenuDataOne: [
      {
        componentName: "detection",
        title: "基因检测",
        indexNum: 6,
        active: false
      },
      {
        componentName: "detQueue",
        title: "检测队列",
        indexNum: 6,
        active: false
      },
      {
        componentName: "detHistory",
        title: "检测历史",
        indexNum: 6,
        active: false
      }
    ],
    dropMenuDataTwo: [
      {
        componentName: "safeInfor",
        title: "安全信息",
        indexNum: 7,
        active: false
      },
      {
        componentName: "safeWords",
        title: "安全热词",
        indexNum: 7,
        active: false
      },
      {
        componentName: "inforloophole",
        title: "漏洞信息",
        indexNum: 7,
        active: false
      }
    ],
    "exit": "退出登录",
    "personalCenter": "个人中心"
  },
  search: {
    "input": "请输入IP、端口、服务类型、区域",
    "advSearch": "高级搜索 组合搜索",
    "searchTip": "请输入搜索内容",
    "searchTypeTip": "格式错误，请重新输入"
  },
  advSearch: {
    "IPAddress": "IP地址",
    "inputBox": "输入框",
    "serviceType": "服务类型",
    "allTypes": "全部类型",
    "portNumber": "端口号",
    "allPorts": "全部端口",
    "geographicalPosition": "地理位置",
    "country": "国家",
    "provinceAndState": "省/州",
    "city": "城市",
    "search": "搜索",
    "tip": "请输入正确的IP地址"
  },
  list: {
    "Research": "重新搜索",
    "timeUse": "用时",
    "seconds": "秒",
    "searchResAnalysis": "搜索结果分析",
    "totalResQuantity": "全部结果数量",
    "totalResDistribution": "全部结果分布",
    "portDistribution": "端口分布",
    "ports": "端口",
    "serviceDistribution": "服务分布",
    "service": "服务",
    "nationalDistribution": "国家分布",
    "searchResList": "搜索结果列表",
    "firstSearch": "一次搜索",
    "secondSearch": "二次搜索",
    "operatingSystem": "操作系统",
    "homemadeSystemName": "自制系统名称",
    "homemadeSystemNum": "自治系统号",
    "organization": "组织",
    "equipmentType": "设备类型",
    "portAndService": "端口/服务",
    "geographicInfo": "地理信息",
    "coordinate": "坐标"
  },
  detail: {
    "essentialInfo": "基本信息",
    "fingerprintData": "指纹数据"
  },
  geneDetection: {
    "startDetection": "开始检测",
    "geneDetTipone": "普通用户上传文件不能超过5M，如需检测更大文件，请",
    "geneDetTiptwo": "注册/登录",
    "geneDetTipthree": "为专业用户"
  },
  detectionQueue: {
    "recentGeneDet": "近期基因检测概要",
    "taskDistribution": "任务分布",
    "lastTenDetDis": "最近10天检测任务分布",
    "maliciousOne": "无恶意性 具有恶意基因",
    "maliciousTwo": "无恶意性 无恶意基因",
    "maliciousThree": "有恶意性 具有恶意基因",
    "maliciousFour": "有恶意性 无恶意基因",
    "lastTenDetRes": "最近10天检测结果报告",
    "GeneDetQueue": "基因检测任务队列",
    "sampleName": "样本名称",
    "submitTime": "提交时间",
    "expecteComTime": "预计完成时间",
    "detProgress": "检测进度",
    "detState": "检测状态",
    "taskUser": "任务用户",
    "historyTasks": "查看历史任务",
    "detection": "检测中",
    "waiting": "等待中",
    "nothing": "无",
    "error": "检测错误"
   },
   detectionHistory: {
    "historicalDet": "历史检测概要",
    "LastYearDetTask": "最近一年检测任务分布",
    "testResAnalysis": "平台检测结果分析",
    "historicalDetRes": "历史检测结果",
    "completionTime": "完成时间",
    "detRes": "检测结果",
    "resView": "结果查看"
  },
  geneReport: {
    "fileName": "文件名称",
    "fileSize": "文件大小",
    "latestAnalysisTime": "最新分析时间",
    "downloadReport": "下载报告",
    "geneAnalysisReport": "基因分析报告",
    "neSequenceArrangement": "基因序列物理排列图",
    "tipOne": "整个圆圈代表程序的物理空间，最上方的红色线条的地方代表程序的入口点，也就是物理上的0点，每一个绿色的线条代表一条基因序列，然后按照顺时针方向，根据基因在程序上的出现位置将其标记在相应的地方。基因序列图表示了基因在程序物理位置上的排列关系，是基因在程序体上一种直观分布。",
    "note": "注",
    "bigPicture": "查看大图",
    "fileDownload": "文件下载",
    "geneLogicDiagram": "基因逻辑图",
    "tipTwo": "这里面的每一个块代表一个基因，每一个基因序有自己的标号。在基因生成过程中，各个基因之间的具有一定的逻辑关系，如数据流相关或控制流相关，根据基因之间的相互关系，生成右图所示的基因逻辑图。基因逻辑图是程序中基因功能块之间的相互关系图，是后期进行图匹配和家族图谱构建、相似性溯源分析的基础。",
    "threatRelated": "威胁相关性说明",
    "threatAnalysisReport": "威胁分析报告",
    "maliciousJudgment": "恶意判定",
    "yaraRule": "yara规则下载",
    "behaviorAnalysis": "行为分析总结",
    "antiAnalysisDetection": "抗分析检测",
    "generalConnection": "网络通联关系",
    "type": "类型",
    "demand": "需求",
    "downPcap": "下载pcap文件",
    "geneticRelation": "基因关系分析",
    "keyString": "关键字符串"
  },
  securityInformation: {
    "securityInfoSearch": "请输入想要搜索的安全信息",
    "securityInfo": "安全信息",
    "source": "来源",
    "searchTip": "请输入正确的搜索内容"
  },
  safetyWords: {
    "hotWordsList": "热词榜",
    "newHotWords": "最新录入热词",
    "ranking": "排名",
    "hotWords": "热词",
    "entryTime": "录入时间",
    "degreeHeat": "热度",
    "serialNumber": "序号"
  },
  safeWordsDetail: {
    "relatedDetail": "相关详情",
    "relatedTrend": "相关趋势",
    "relatedLoophole": "相关漏洞"
  },
  vulnerabilityInformation: {
    "safeVocabularySearch": "请输入想要搜索的安全词汇",
    "vulnerDiscoverTime": "漏洞发现时间",
    "vulnerName": "漏洞名称",
    "damageLevel": "危害程度"
  },
  inforloopholeDetail: {
    "title": "CVND_ID",
    "openDate": "公开日期",
    "vulnerabilityDes": "漏洞描述",
    "vulnerabilitySol": "漏洞解决方案",
    "deliveryTime": "报送时间",
    "collectionTime": "收录时间",
    "updateTime": "更新时间"
  },
  personal: {
    "reviseHeadImg": "修改头像",
    "userName": "用户名",
    "tel": "手机号码",
    "setUp": "已设置",
    "notSet": "未设置",
    "password": "登录密码",
    "modify": "修改",
    "email": "电子邮箱",
    "reactivation": "重新激活",
    "oldCipher": "旧密码",
    "newPwd": "新密码",
    "confirmNewPwd": "确认新密码",
    "confirmModify": "确认修改",
    "currentTel": "当前手机号",
    "newTel": "新手机号",
    "verificationCode": "验证码",
    "getVerifyCode": "获取验证码",
    "confirmActivation": "是否确认激活？",
    "currentMail": "当前邮箱",
    "newMail": "新邮箱",
    "confirm": "确定",
    "cancel": "取消",
    "originalPwd": "请输入原密码！",
    "enterNewPwd": "请输入新密码！",
    "enterConfirmNewPwd": "请输入确认新密码！",
    "modifyPwdSuccess": "密码修改成功！",
    "oldPwdErr": "原密码错误",
    "noUser": "用户不存在",
    "emailPostSuccess": "邮件已发送",
    "unauthorizedUser": "未授权用户！请登录",
    "reLogin": "请重新登录",
    "activated": "用户之前已经激活"
  }
}