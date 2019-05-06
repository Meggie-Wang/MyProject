import ajax from '@/assets/js/api'
import Vue from 'vue'

let apiPath = ''
if (Vue.config.productionTip) {
  apiPath = 'http://117.186.16.166:9800/'
  // apiPath = 'http://taishi.roarpanda.com:9800/'
} else {
  apiPath = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '') + '/'
}
localStorage.setItem('apiPath', apiPath)

// localStorage.tokenName 设置token前缀；项目组件功能区分标示
localStorage.setItem('tokenName', 'zhirong')

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
  'export_detetion_result_list': 'api/export_detetion_result_list/', // 导出检测结果列表
  'sampleReport': 'api/detection_result/', // 样本分析报告
  'important_sign': 'api/important_sign/', // 重要性
  'gene_image_packet': 'api/gene_image_packet/', // 获取gene图谱
  'aptList': 'api/aptinfo_list/', // apt
  'label_list': 'api/label_list/', // 标签
  'add_label': 'api/add_label/', // 自定义标签
  'delete_label': 'api/delete_label/', // 删除自定义标签
  'add_sample_label': 'api/add_sample_label/', // 给样本添加标签
  'sample_download': 'api/sample_download/', // 下载源文件
  'gene_file_download': 'api/gene_file_download/', // 下载gene文件
  'handleUpload': 'api/sample_upload/', // 手动上传
  'redetect': 'api/recheck_file/', // 重新检测
  'userstatus': 'user/userstatus/', // 用户列表
  'reset_pwd': 'user/reset_pwd/', // 重置密码
  'precedence': 'api/set_priority/', // 设置优先
  'analysisReport': 'api/analysis_report/', // 报表分析报告
  'analysisReportDetail': 'api/show_report/', // 报表分析报告详情
  'system_basic_status': 'api/system_basic_status/', // 运行状态
  'detect_analysis': 'api/detect_analysis/', // 基因检测并分析
  'analysis_queue': 'api/analysis_queue/', // 基因分析队列
  'analysis_history': 'api/analysis_history/', // 基因分析历史
  'model_import': 'api/model_import/', // 模型导入
  'tree_list': 'api/tree_list/', // 决策树列表
  'tree_delete': 'api/tree_delete/', // 删除决策树
  'system_storage_info': 'api/system_storage_info/', // 存储状态
  'system_resource_status': 'api/system_resource_status/', // 存储节点状态
  'detect_result_list': 'api/detect_result_list/', // 存储列表
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
  'detect_setting': '/api/detect_setting/', // 样本检测策略
  'process_status_sign': 'api/process_status_sign/', // 检测历史处理
  'warning_info': 'api/warning_info/', // 流量检测告警信息
  'malicious_count': 'api/bro_threaten/', // 流量检测统计记录
  // 审计用户
  'event_info': 'api/event_info/', // 审计事件记录表格
  'import_event': 'api/import_event/', // 审计事件记+++录导出文件
  'logshow': 'user/logshow/', // 审计搜索
  'logdaylist': 'user/logdaylist/', // 审计日志日期列表
  'loguser': 'user/loguser/', // 用户日志-用户名
  // 管理员用户
  'register': 'user/register/', // 用户注册
  'grouplist': 'user/grouplist/', // 用户组
  'changegroup': 'user/changegroup/', // 修改用户组
  'delete_user': 'user/delete_user/', // 删除用户
  'change_endtime': 'user/change_endtime/', // 修改到期时间
  'useralive': 'user/useralive/', // 验证用户名是否存在
  'genenate_password': 'user/genenate_password/', // 随机密码
  'license_auth': 'api/license_auth/', // license认证
  'license_upload': 'api/license_upload/', // lisense上传
  'user_code_upload': 'api/user_code_upload/', // user_code上传
  'admin_changepassword': 'user/admin_changepassword/', // 用户管理修改密码
  'data_line_parameter': '/api/data_line_parameter/', // 设备管理设备状态
  'manual_data_line': '/api/manual_data_line/', // 设备管理设备状态
  'machine_interfaces': 'api/machine_interfaces/', // 设备管理网络配置网卡设置
  'machine_dns': 'api/machine_dns/', // 设备管理网络配置DNS设置
  'white_ip_switch': 'api/white_ip_switch/', // 设备管理IP白名单设置
  'white_ip': 'api/white_ip/', // 设备管理IP白名单设置
  'add_white_ip': 'api/add_white_ip/', // 设备管理IP白名单设置添加白名单
  'delete_white_ip': 'api/delete_white_ip/', // 删除白名单
  'storage_usage': 'api/storage_usage/', // 设备管理存储设置存储空间
  'storage_alarm_setting': 'api/storage_alarm_setting/', // 设备管理存储设置
  'storage_clean': 'api/storage_clean/', // 设备管理存储设置存储清理
  'self_check': 'api/self_check/', // 设备管理系统管理自检
  'machine_sys_time': 'api/machine_sys_time/', // 设备管理系统管理设备设置
  'machine_power': 'api/machine_power/', // 设备管理系统管理设备关闭或重启
  'vdb_update': 'api/vdb_update/', // 设备管理系统管理系统升级
  'bro_setting': '/api/bro_setting/', // 检测管理流量设置旁路检测
  'add_type': '/api/add_type/', // 检测管理检测设置样本检测策略增加检测文件类型
  'forms_info': 'api/forms_info/', // 检测管理报表设置报表记录
  'import_forms': 'api/import_forms/', // 检测管理报表设置报表导出
  'report_setting': 'api/report_setting/', // 检测管理告警信息设置邮件设置
  'report_test': 'api/report_test/', // 检测管理告警信息设置邮件测试设置
  'syslog_config': 'api/syslog_config/', // 检测管理告警信息设置syslog配置
  'generate_forms': 'api/generate_forms/', // 即时报表
  'forms_setting': 'api/forms_setting/', // 定时报表
  're_dynamic_detect': 'api/re_dynamic_detect/' // 样本重新检测9800
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
