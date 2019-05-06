import ajax from '@/assets/js/api'
import Vue from 'vue'

let apiPath = ''
if (Vue.config.productionTip) {
  apiPath = 'http://taishi.roarpanda.com:28003/'
} else {
  apiPath = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '') + '/'
}
localStorage.setItem('apiPath', apiPath)

// localStorage.tokenName
localStorage.setItem('tokenName', 'gtd')

const apiArr = {
  'login': 'user/login/', // 登陆接口 post
  'logout': 'user/logout/', // 登出
  'detection_result': 'api/index_detectionresult/', // 最新检测结果
  'wordList': 'api/word_cloud/', // 样本类型热度
  'geneFamily': 'api/gene_family/', // 基因家族归属
  'point': 'api/map_show/', // 样本地理分布
  'sampleDetection': 'api/detection_count/', // 样本检测统计
  'sampleAnalysis': 'api/sample_trend/', // 样本分析状态
  'threatData': 'api/threaten_data/', // 威胁数据总量
  'search': 'api/search_info/', // 搜索
  'detection_queue': 'api/detection_queue/', // 检测队列
  'detection_history': 'api/detection_history/', // 检测历史
  'undetectSample': 'api/undetect_sample/', // 未检测样本列表
  'uploadUndetectSample': 'api/download_undetect_sample/', // 下载未检测样本列表
  'detectionUndetectSample': 'api/undetect_to_detect/', // 检测未检测样本
  're_dynamic_detect': 'api/re_dynamic_detect/', // 重新动态检测
  'sample_sandbox_detection_result': 'api/sample_sandbox_detection_result/', // 在检测报告中点击对应沙箱 返回对应的数据
  'export_detetion_result_list': 'api/export_detetion_result_list/', // 导出检测结果列表
  'important_sign': 'api/important_sign/', // 重要性
  'sampleReport': 'api/detection_result/', // 样本分析报告
  'gene_image_packet': 'api/gene_image_packet/', // 获取gene图谱
  'aptList': 'api/aptinfo_list/', // apt
  'label_list': 'api/label_list/', // 标签
  'add_label': 'api/add_label/', // 自定义标签
  'delete_label': 'api/delete_label/', // 删除自定义标签
  'add_sample_label': 'api/add_sample_label/', // 给样本添加标签
  'sample_download': 'api/sample_download/', // 下载源文件
  'gene_file_download': 'api/gene_file_download/', // 下载gene文件
  'handleUpload': 'api/sample_upload/', // 手动上传
  'getFileMatch': 'api/show_limit/', // 匹配比例设置
  'setFileMatch': 'api/set_limit/', // 匹配比例设置
  'redetect': 'api/recheck_file/', // 重新检测
  'userstatus': 'user/userstatus/', // 用户列表
  'reset_pwd': 'user/reset_pwd/', // 重置密码
  'precedence': 'api/set_priority/', // 设置优先
  'analysisReport': 'api/analysis_report/', // 报表分析报告
  'analysisReportDetail': 'api/show_report/', // 报表分析报告详情
  'system_basic_status': 'api/system_basic_status/', // 运行状态
  'gene_analysis': 'api/gene_analysis/', // 基因分析样本上传
  'detect_analysis': 'api/detect_analysis/', // 基因检测并分析
  'analysis_queue': 'api/analysis_queue/', // 基因分析队列
  'analysis_history': 'api/analysis_history/', // 基因分析历史
  'model_import': 'api/model_import/', // 模型导入
  'tree_list': 'api/tree_list/', // 决策树列表
  'tree_delete': 'api/tree_delete/', // 删除决策树
  'system_storage_info': 'api/system_storage_info/', // 存储状态
  'system_resource_status': 'api/system_resource_status/', // 存储节点状态
  'report_setting': 'api/report_setting/', // 报表设置
  'machine_sys_time': 'api/machine_sys_time/', // 系统时间设置
  'machine_power': 'api/machine_power/', // 设备关闭或重启
  'machine_interfaces': 'api/machine_interfaces/', // 网卡设置
  'machine_dns': 'api/machine_dns/', // DNS设置
  'detect_result_list': 'api/detect_result_list/', // 存储列表
  'report_test': 'api/report_test/', // 报表测试设置
  'userlogshow': 'user/userlogshow/', // 用户日志显示
  'loguser': 'user/loguser/', // 用户日志-用户名
  'scheduler_controler': 'api/scheduler_controler/', // 沙箱集群关闭开启
  'system_total': 'api/system_total/', // 平台状态
  'evalutation_application': 'api/evalutation_application/', // 评测申请
  'evalutation_list': 'api/evalutation_list/', // 评测结果列表
  'evalutation_result': 'api/evalutation_result/', // 评测结果
  'deal_application': 'api/deal_application/', // 处理申请
  'sample_data': 'api/sample_data/', // 样本库
  'add_application': 'api/add_application/', // 添加申请
  'application_description': 'api/application_description/', // 评测申请详情
  'download_analysis_model': 'api/download_analysis_model/', // 家族模型分析导出模型
  'sample_geneinfo': 'api/sample_geneinfo/', // 热力图聚类分析表格
  'cluster_analysis': 'api/cluster_analysis/', // 生成聚类分析
  'tricolor': 'api/sample_similar/', // 生成热力图
  'download_genefiledeamo': 'api/download_genefiledeamo/', // 基因文件下载
  'process_status_sign': 'api/process_status_sign/' // 检测历史处理
}

// 这段代码重复，原因：apiArr, apiPath需要传入'@/api/api'中
const api = {
  apiPath: apiPath,
  post: (Interface, requestData) => {
    return ajax.post(Interface, requestData, apiArr, apiPath)
  },
  get: (Interface, requestData) => {
    return ajax.get(Interface, requestData, apiArr, apiPath)
  },
  blob: (Interface, requestData) => {
    return ajax.blob(Interface, requestData, apiArr, apiPath)
  },
  upload: (Interface, formData, config) => {
    return ajax.upload(Interface, formData, config, apiArr, apiPath)
  }
}
export default api
