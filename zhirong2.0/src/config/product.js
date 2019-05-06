import Vue from 'vue'

// @分辨产品间的差异
// 1.条件的序列
// 2.功能分辨反馈
// 2.1 不直接用1条件的原因：
// 2方便记录功能差别，
// 同时，如果直接利用1，和在代码中直接判断并无区别，混乱依然存在

const p = Vue.prototype.$tokenName
const o = {
  a: p === 'zhirong',
  b: p === 'cncert',
  c: p === 'gtd',
  d: p === 'guoan',
  un_a: p !== 'zhirong',
  un_b: p !== 'cncert',
  un_c: p !== 'gtd',
  un_d: p !== 'guoan',
  // a
  ab: p === 'zhirong' && p === 'cncert',
  ac: p === 'zhirong' && p === 'gtd',
  ad: p === 'zhirong' && p === 'guoan',
  a__or__b: p === 'zhirong' || p === 'cncert',
  a__or__c: p === 'zhirong' || p === 'gtd',
  un_a__or__un_c: p !== 'zhirong' || p !== 'gtd',
  un_a_un_c: p !== 'zhirong' && p !== 'gtd',
  a__or__d: p === 'zhirong' || p === 'guoan',
  // b
  bc: p === 'cncert' && p === 'gtd',
  bd: p === 'cncert' && p === 'guoan',
  b__or__c: p === 'cncert' || p === 'gtd',
  b__or__d: p === 'cncert' || p === 'guoan',
  // c
  cd: p === 'gtd' && p === 'guoan',
  c__or__d: p === 'gtd' || p === 'guoan'
}
const product = {
  FamilyAi2: { selection: o.un_c },
  header: { logo: o.a },
  SampleReportOption: { sandBox: o.c },
  searchOptions: {
    threaten: o.ac,
    fileType: o.un_c,
    platform: o.un_c,
    cpu: o.un_c,
    importantLevelVal: o.a__or__c,
    processStatusVal: o.c,
    is_read: o.a__or__c,
    date: o.a__or__c,
    fileContainVal: o.un_c,
    md5: o.a__or__c,
    hash_value: o.a__or__c,
    hash_style: o.a__or__c
  },
  UserList: {
    adduser: o.a__or__c,
    operate: o.a__or__c,
    view: o.a__or__c
  },
  ReportDetail: {
    point2: o.d,
    pie2: o.d,
    systemLine: o.d,
    CheckReport: o.a__or__c
  },
  GTD_Resource: { CheckReport: o.c },
  Resource: { CheckReport: o.a },
  GeneAnalysis: { export: o.un_c },
  GeneModel: {
    operate: o.un_d,
    selection: o.b,
    export: o.b
  },
  DetectionHistory: {
    mark: o.a__or__c,
    markDisabled: o.a,
    commitDate: o.a__or__c,
    family: o.c,
    manage: o.c,
    deepAnalysis: o.c,
    pageAll: o.a__or__c,
    checkReport: o.a__or__c,
    downloadFiles_pages: o.a__or__c,
    downloadFiles_page: o.un_a__or__un_c,
    downloadListShow: o.a__or__c
  },
  DetectionQueue: {
    uploadStyle: o.a__or__c,
    detectStatus: o.c
  },
  SampleReport: {
    SampleReportOption: o.a__or__c,
    export: o.un_a_un_c,
    gene: o.un_a_un_c
  },
  UndetectSample: { downloadFiles: o.un_a_un_c },
  SearchDetail: { resView: o.c }
}

Vue.prototype.$product = product
