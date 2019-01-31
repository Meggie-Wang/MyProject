export const messages = {
  register: {
    "enterUserName": "Username",
    "enterPwd": "Password",
    "confirmPwd": "Re-enter password",
    "enterEmail": "Email",
    "register": "Register now",
    "agree": "By creating an account, you agree to",
    "clause": "RoarPanda's Conditions of Use ",
    "and": "and",
    "strategy": " Privacy Notice",
    "checkOut": "checkOut",
    "userNameEmpty": "Enter your username",
    "pwdEmpty": "Enter your password",
    "confirmPwdEmpty": "Re-enter your password",
    "emailEmpty": "Enter your email",
    "userNameTip": "Your username must be a combination of alphanumeric characters of 6-16 characters in length",
    "pwdTip": "Your password must be a combination of alphanumeric characters of 8-18 characters in length",
    "enterCorrectEmail": "Please enter a valid email address",
    "diffPwd": "The password must be identical to the above/following one",
    "succeRegister": "succeRegister",
    "regTipOne": "Parameters can not be empty.",
    "regTipTwo": "The username is a 6-16 bit alphanumeric combination",
    "regTipThree": "The password is 8-18 in alphanumeric combination",
    "regTipFour": "Incorrect mailbox format",
    "regTipFive": "The user or mailbox already exists",
    "regTipSix": "The server is busy",
    'accountNum': 'Existing account？'
  },
  login: {
    "login": "Log in",
    'loginNow': 'Log in immediately',
    "guest": "guest login",
    "rememberPwd": "Remember the password",
    "noAccountNum": "Need an account?",
    "pleaseLogin": "Please Login",
    "loginTip": "The username or password is incorrect.",
    "incorrectErr": "Today the access to this module interface has reached the limit!",
    "logged": "Logged in",
    "loginTipOne": "Trial account has expired!",
    "loginTipTwo": "Server busy!"
  },
  dashboard: {
    "IPFingerDistribut": "IP Fingerprint Distribution",
    pointLegend: [
      {
        name: "Display distribution"
      },
      {
        name: "TOP 5"
      }
    ],
    "totalData": "Total Data",
    pieLegendArr: [
      {
        name: "Gene"
      },
      {
        name: "Sample"
      },
      {
        name: "IP Fingerprint"
      }
    ],
    pieGeneArr: [
      {
        name: "Common Gene"
      },
      {
        name: "Family Gene"
      },
      {
        name: "Unique Gene"
      }
    ],
    pieToolsArr: [
      {
        name: "Worm"
      },
      {
        name: "Trojan Horse"
      },
      {
        name: "Virus"
      },
      {
        name: "Hacker Tools"
      },
      {
        name: "Other"
      }
    ],
    "hotSpotAnalysis": "Hotspot Analysis",
    "threatInfo": "Threat Information",
    "prePage": "Previous",
    "nextPage": "Next",
    "title": "Title",
    "obtainTime": "Obtain Time",
    "explain": "Explain",
    "securityHole": "security Hole",
    "hackerTrack": "Hacker Tracking",
    "realTimeData": "Realtime Data",
    dynamicLegend: [
      {
        name: "IP Fingerprint"
      },
      {
        name: "Malicious Sample"
      },
      {
        name: "Gene Information"
      }      
    ],
    columnLegend: [
      {
        name: "IP Data"
      },
      {
        name: "Sample Data"
      },
      {
        name: "Gene Data"
      }      
    ],
    "sampleAnalysis": "Sample Analysis",
    "more": "More",
    "details": "Detail"
  },
  nav: {
    dadLi: [
      {
        componentName: "dashboard",
        title: "Homepage",
        indexNum: 0
      },
      {
        componentName: "search",
        title: "IP Fingerprint",
        indexNum: 1
      },
      {
        componentName: "softGene",
        title: "Software Gene",
        indexNum: 2
      },
      {
        componentName: "threats",
        title: "Threat Information",
        indexNum: 3
      },
      {
        componentName: "help",
        title: "Help",
        indexNum: 4
      },
      {
        componentName: "about",
        title: "About Us",
        indexNum: 5
      }
    ],
    dropMenuDataOne: [
      {
        componentName: "detection",
        title: "Gene Detection",
        indexNum: 6,
        active: false
      },
      {
        componentName: "detQueue",
        title: "Ongoing Dection",
        indexNum: 6,
        active: false
      },
      {
        componentName: "detHistory",
        title: "Detection History",
        indexNum: 6,
        active: false
      }
    ],
    dropMenuDataTwo: [
      {
        componentName: "safeInfor",
        title: "Security Information",
        indexNum: 7,
        active: false
      },
      {
        componentName: "safeWords",
        title: "Security Hotwords",
        indexNum: 7,
        active: false
      },
      {
        componentName: "inforloophole",
        title: "Vulnerability",
        indexNum: 7,
        active: false
      }
    ],
    "exit": "Exit",
    "personalCenter": "Your Account"
  },
  search: {
    "input": "Please enter IP,Port,Service Type and Area",
    "advSearch": "Advanced Search  Combinatorial Search",
    "searchTip": "Please enter what you are searching for.",
    "searchTypeTip": "The format is wrong, please re-enter"
  },
  advSearch: {
    "IPAddress": "IP Address",
    "inputBox": "Input Box",
    "serviceType": "Service Type",
    "allTypes": "All Types",
    "portNumber": "Port Number",
    "allPorts": "All Ports",
    "geographicalPosition": "Geographical Position",
    "country": "Country",
    "provinceAndState": "State/Province",
    "city": "City",
    "search": "Search",
    "tip": "Please enter a valid IP address."
  },
  list: {
    "Research": "Search again",
    "timeUse": "Time consumed",
    "seconds": "seconds",
    "searchResAnalysis": "Search Results",
    "totalResQuantity": "Total",
    "totalResDistribution": "Statistics",
    "portDistribution": "Port Statistics",
    "ports": " Port",
    "serviceDistribution": "Service Statistics",
    "service": " Service",
    "nationalDistribution": "Country Statistics",
    "searchResList": "List of Search Results",
    "firstSearch": "Priliminary Search",
    "secondSearch": "Secondary Search",
    "operatingSystem": "Operating System",
    "homemadeSystemName": "AS Name",
    "homemadeSystemNum": "AS Number",
    "organization": "Organization",
    "equipmentType": "Type of Equipment ",
    "portAndService": "Port/Service",
    "geographicInfo": "GEO",
    "coordinate": "Lng&Lat"
  },
  detail: {
    "essentialInfo": "Basic Information",
    "fingerprintData": "Fingerprint Data"
  },
  geneDetection: {
    "startDetection": "Start",
    "geneDetTipone": "The files uploaded by trial users cannot exceed 5M. If larger files need to be detected, please",
    "geneDetTiptwo": "register / log in",
    "geneDetTipthree": "as RoarPanda users;"
  },
  detectionQueue: {
    "recentGeneDet": "Summary of Recent Gene Detection",
    "taskDistribution": "Mission",
    "lastTenDetDis": "Detection Missions over the last 10 days",
    "maliciousOne": "Non-malicious  Malicious Gene Found",
    "maliciousTwo": "Non-malicious  Malicious Gene NOT Found",
    "maliciousThree": "Malicious  Malicious Gene Found",
    "maliciousFour": "Malicious  Malicious Gene NOT Found",
    "lastTenDetRes": "Detection Report over the last 10 days",
    "GeneDetQueue": "Ongoing Gene Dection",
    "sampleName": "Sample Name",
    "submitTime": "Upload Time",
    "expecteComTime": "Estimated Time Of Completion; ETC",
    "detProgress": "Percentage",
    "detState": "Status",
    "taskUser": "User",
    "historyTasks": "Check mission history",
    "detection": "In Detection",
    "waiting": "Waiting",
    "nothing": "None",
    "error": "Error in detection"
   },
   detectionHistory: {
    "historicalDet": "Summary of Historical Detection",
    "LastYearDetTask": "Statistics of Detection Mission over the Last Year",
    "testResAnalysis": "Detection Result Analysis",
    "historicalDetRes": "Historical Detections Results",
    "completionTime": "Time of Completion",
    "detRes": "Detection Result",
    "resView": "View Report"
  },
  geneReport: {
    "fileName": "File name",
    "fileSize": "File size",
    "latestAnalysisTime": "Updated by",
    "downloadReport": "Download report",
    "geneAnalysisReport": "Gene Analysis Report",
    "neSequenceArrangement": "Physical diagram of gene sequence",
    "tipOne": "The whole circle represents the physical space of the sample, and the top red line represents the entry point of the sample, that is, the physical zero point,Each green line represents a gene sequence, which is then labeled in a clockwise direction according to where the gene appears on the sample.Gene sequence diagram shows the arrangement of genes in their physical position of a sample, and it is an intuitive distribution of genes in the sample.",
    "note": "Note",
    "bigPicture": "Click to zoom in.",
    "fileDownload": "Download the file",
    "geneLogicDiagram": "Gene logic map",
    "tipTwo": "Each of these blocks represents a gene, and each gene sequence has its own label.In the process of gene generation, each gene has a certain logical relationship, such as data flow correlation or control flow correlation,According to the relationship between genes, a gene logic map shown in the right figure is generated.The gene logic map shows the interrelationship of gene function blocks in the program, which is the basis of follow-on map matching, family map construction and similarity tracing analysis.",
    "threatRelated": "Threat correlation",
    "threatAnalysisReport": "Threat analysis report",
    "maliciousJudgment": "Judgment of malice",
    "yaraRule": "Download yara rule",
    "behaviorAnalysis": "Behavior analysis report",
    "antiAnalysisDetection": "antiAnalysisDetection",
    "generalConnection": "Network connection relationship",
    "type": "Type",
    "demand": "Request",
    "downPcap": "Download pcap file",
    "geneticRelation": "Genetic relationship",
    "keyString": "Strings"
  },
  securityInformation: {
    "securityInfoSearch": "Please enter the security information you want to search",
    "securityInfo": "Security Information",
    "source": "Source",
    "searchTip": "Please enter the correct search content"
  },
  safetyWords: {
    "hotWordsList": "Top Words",
    "newHotWords": "Lastest Hotwords",
    "ranking": "Ranking",
    "hotWords": "Hotwords",
    "entryTime": "Last Input",
    "degreeHeat": "Popularity",
    "serialNumber": "Number"
  },
  safeWordsDetail: {
    "relatedDetail": "Detail",
    "relatedTrend": "Trend",
    "relatedLoophole": "Vulnerability"
  },
  vulnerabilityInformation: {
    "safeVocabularySearch": "Please enter the security key words you want to search",
    "vulnerDiscoverTime": "First Found",
    "vulnerName": "Name of Vulnerability",
    "damageLevel": "Degree of Harm"
  },
  inforloopholeDetail: {
    "title": "CVE_ID",
    "openDate": "Disclosure date",
    "vulnerabilityDes": "Description",
    "vulnerabilitySol": "Solution",
    "deliveryTime": "Reported On",
    "collectionTime": "Accepted On",
    "updateTime": "Updated On"
  },
  personal: {
    "reviseHeadImg": "Change you avatar",
    "userName": "Username",
    "tel": "Cellphone number",
    "setUp": "Set",
    "notSet": "To be set",
    "password": "Login password",
    "modify": "Modify",
    "email": "Email",
    "reactivation": "Reactivate",
    "oldCipher": "Old password",
    "newPwd": "New password",
    "confirmNewPwd": "Confirm new password",
    "confirmModify": "Modification confirmed",
    "currentTel": "Current phone number",
    "newTel": "New phone number",
    "verificationCode": "Verification code",
    "getVerifyCode": "Obtain verification code",
    "confirmActivation": "Do you confirm the activation?",
    "currentMail": "Current email",
    "newMail": "New email",
    "confirm": "Confirm",
    "cancel": "Cancel",
    "originalPwd": "Please enter the original password!",
    "enterNewPwd": "Please enter the new password!",
    "enterConfirmNewPwd": "Please enter the confirmation new password",
    "modifyPwdSuccess": "Password modification success",
    "oldPwdErr": "Original password error",
    "noUser": "The user does not exist",
    "emailPostSuccess": "emailPostSuccess",
    "unauthorizedUser": "Unauthorized user! Please log in",
    "reLogin": "Please log in again",
    "activated": "The user has been activated before"
  }
}