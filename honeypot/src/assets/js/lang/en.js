export const messages = {
  register: {
    'enterUserName': 'Username',
    'enterPwd': 'Password',
    'confirmPwd': 'Re-enter password',
    'enterEmail': 'Email',
    'register': 'Register now',
    'agree': 'By creating an account, you agree to ',
    'clause': "RoarPanda's Conditions of Use ",
    'and': 'and',
    'strategy': ' Privacy Notice.',
    'checkOut': 'checkOut',
    'userNameEmpty': 'Enter your username',
    'pwdEmpty': 'Enter your password',
    'confirmPwdEmpty': 'Re-enter your password',
    'emailEmpty': 'Enter your email',
    'userNameTip': 'Your username must be a combination of alphanumeric characters of 8-12 characters in length',
    'pwdTip': 'Your password must be a combination of alphanumeric characters of 8-18 characters in length',
    'enterCorrectEmail': 'Please enter a valid email address',
    'diffPwd': 'The password must be identical to the above/following one',
    'succeRegister': 'succeRegister',
    'regTipOne': 'Parameters can not be empty.',
    'regTipTwo': 'The username is a 6-16 bit alphanumeric combination',
    'regTipThree': 'The password is 8-18 in alphanumeric combination',
    'regTipFour': 'Incorrect mailbox format',
    'regTipFive': 'The user or mailbox already exists',
    'regTipSix': 'The server is busy',
    'accountNum': 'Existing account？'
  },
  login: {
    'login': 'Log in',
    'loginNow': 'Log in immediately',
    'rememberPwd': 'Remember the password',
    'noAccountNum': 'Need an account?',
    'formatError': 'Error in username or password format',
    'lockTip': 'The uppercase lock key is pressed, please pay attention to the case',
    'loginTip': 'The username or password is incorrect.',
    'incorrectErr': 'Today the access to this module interface has reached the limit!',
    'reLogin': 'Please login again',
    'guestLogin': 'Tourist login',
    'logged': 'Logged in',
    'loginTipOne': 'Trial account has expired!',
    'loginTipTwo': 'Server busy!'
  },
  main: {
    'maliciousInvasion': 'Malicious Behaviors over the Last 15Min'
  },
  nav: {
    navData: [
      {
        name: 'Homepage',
        component: 'Main'
      },
      {
        name: 'AttackState',
        component: 'AttackState'
      },
      {
        name: 'Search',
        component: 'Search'
      },
      {
        name: 'Log',
        component: 'Logs'
      },
      {
        name: 'Status',
        component: 'Status'
      },
      {
        name: 'Help',
        component: 'Help'
      },
      {
        name: 'About',
        component: 'About'
      }
    ],
    'exit': 'Exit'
  },
  search: {
    'input': 'Please enter IP,DNS,MD5.',
    'searchTip': 'Please enter a valid IP,DNS or MD5.'
  },
  searchDetail: {
    'maliceJudgment': 'Result',
    'nonMaliciously': 'Non-malicious',
    'malice': 'Malicious',
    'unknow': 'Unknown',
    'country': 'Country',
    'provinceAndState': 'State/Province',
    'city': 'City',
    'coordinate': 'Lng&Lat',
    'relatedDNS': 'DNS',
    'relatedIP': 'IP',
    'time': 'Time',
    'relatedURLs': 'URLs',
    'urlInfo': 'URL Info',
    'relatedSha': 'Sha256',
    'fileType': 'File Type',
    'positionInfo': 'Position',
    'essentialInfo': 'Basic Information',
    'packer': 'Packers',
    'softLabel': 'AV Detection',
    'staticInfo': 'Static Information',
    'section': 'Sections',
    'fileName': 'Name',
    'adress': 'Virtual Address',
    'virtualSize': 'Virtual Size',
    'rawSize': 'Raw Size',
    'entropy': 'Entropy',
    'imports': 'Imports',
    'exifTool': 'ExifTool File Metadata',
    'dynamicInfo': 'Dynamic Information',
    'netWorkCommunicat': 'Network Communication',
    'fileSystemAction': 'File System Actions',
    'processService': 'Process And Service Actions',
    'syncMechanisms': 'Synchronization Mechanisms',
    'moduleLoad': 'Modules Loaded',
    'relationshipInfo': 'Relationship Information',
    'scanneDate': 'Date scanned'
  },
  logs: {
    'searchCont': 'Please enter what you\'re searching for',
    'noResult': 'No Result',
    'resources': 'Resource',
    'detail': 'Detail',
    'fold': 'Zoom out',
    'logSearchTip': 'Please enter what you are searching for.'
  },
  status: {
    'attackTypeTime': 'Dynamic Changes by Attack Types',
    'targetPortTime': 'Dynamic Changes by Ports',
    'attackSourceCountry': 'Attack source by country',
    'attackUsers': 'Dictionary Attack User Name',
    'attackPwd': 'Dictionary Attack User Password',
    'maliciousCodeUser': 'Malware Attack User Name',
    'maliciousCodePwd': 'Malware Attack User Password',
    'attackSourceTime': 'Attack source by time'
  },
  about: {
    'status': 'Status',
    'days': 'days',
    stateNames: ['Total attack events', 'Number of Active Probes', 'Storage Capacity', 'Monitoring Time'],
    'introduceOne': 'Distributed Cyber Threat Awareness System',
    'introduceTwo': 'HunterPanda-Distributed Cyber Threat Awareness System is a network attack behaviors and samples capturing system independently developed by Shanghai Roarpanda Network Technology Co., Ltd.It is based on a distributed architecture and builds multiple types of honeypots such as protocol attacks, Web attacks, session attacks, and password attacks, etc. The system realized Lightweight Virtual Centralized Management Based on Container. With years of experience on virtual environment simulation and attack behaviors monitoring, it can provide timely, real, and detailed data support for software gene, threat intelligence, attack tracing and situation awareness. The system has a built-in report module that can generate attack situation reports automatically which includes sections such as "indicators and parameters", "consequences of risks", "developments and trends", and "prevention and control recommendations" sections.',
    websiteIntroductions: [
      'Supporting multiple types of honeypots, including protocol attacks, industrial control network attacks, Web attacks, session attacks, password attacks and other types of honeypots, covering different industries and areas.',
      'Connecting to Roarpanda data cloud, the system can restore attack event related information from multiple dimensions.',
      'Users can obtain all the monitoring details so that they can further analyze the threat information by combining its own analysis tools.',
      'Provide customers with flexible and customized display page, and tailored template reporting function.',
      'Connecting to Roarpanda Genetic Analysis Cloud to track the attribution of malicious IP related files.',
      'According to the monitoring needs of customers, the deployment scale of honeypot can be customized.'
    ],
    'introduceThree': 'Shanghai RoarPanda Network Technology Co., Ltd. is a network security company, with "software gene" as its core technology. We mainly provide network security data analysis, malware gene detection, network security situation awareness and other services using machine learning, big data, software gene and other key technologies. Our goal is to provide strong technical support on network security for various industries and countries. We are dedicated to increasing the level of information security and risk control abilities of our partners; safeguarding national strategic security in the information age; leading network security technology progress and creating innovative brands in the field of network security. The leading team members are mainly composed of veterans from the army. Our products have been popularized and applied in the military, government and large enterprises. We are a typical military-civilian fusion technology innovation enterprise. ',
    'company': 'Shanghai RoarPanda Network Technology Co., Ltd.'
  }
}
