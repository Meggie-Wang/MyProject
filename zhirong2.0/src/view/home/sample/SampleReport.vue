<template>
  <div class="SampleReport" id="pdfDom">
    <div class="SampleReport-container">
      <div class="downPdf">
        <SampleReportOption path="SampleReport" v-if="$tokenName === 'gtd' || $tokenName === 'zhirong'"/>
        <button
          v-if="(Object.getOwnPropertyNames(detect_result).length > 1 ||
            Object.getOwnPropertyNames(basic_info).length > 1) &&
            $tokenName !== 'gtd' &&
            $tokenName !== 'zhirong'"
          class="el-button print-btn el-button--default"
          @click="$common.print()">导出/打印</button>
      </div>

      <el-collapse v-model="activeNames">
        <el-collapse-item title="概述" name="1">
          <p class="summaryTitle">
            {{$projectName}}系统通过多引擎分析，获得样本的分析信息、分别包括：样本检测、样本基本信息、{{$projectName}}系统对该样本评测的标签信息、以及对该样本的处置建议。
            <img :src="threatClassify">
          </p>
          <!-- 检测结果 -->
          <div v-if="Object.getOwnPropertyNames(detect_result).length > 1 && dataStatus[3]">
            <h1>检测结果</h1>
            <div class="tableList">
              <table>
                <tr>
                  <td width="200">样本名称</td>
                  <td>{{ detect_result.sample_name || '无' }}</td>
                </tr>
                <tr>
                  <td>首次发现时间</td>
                  <td>{{ $common.dateChange(detect_result.start_time) || '无' }}</td>
                </tr>
                <tr>
                  <td>最新检测时间</td>
                  <td>{{ $common.dateChange(detect_result.end_time) || '无' }}</td>
                </tr>
                <tr>
                  <td>MD5</td>
                  <td>{{ detect_result.sample_md5 || '无' }}</td>
                </tr>
                <tr>
                  <td>威胁分类</td>
                  <td>{{ detect_result.threat_type || '无' }}</td>
                </tr>
                <tr>
                  <td>威胁评估</td>
                  <td>{{ detect_result.threat_level !== '' ? detect_result.threat_level : '无' }}</td>
                </tr>
                <tr>
                  <td>威胁名称</td>
                  <td>{{ detect_result.threat_type === '安全' ? '无' : detect_result.threat_name || '无' }}</td>
                </tr>
              </table>
            </div>
          </div>
          <div v-if="isNormalData(basic_info, basic_info.wiki)">
            <h1>威胁百科</h1>
            <table>
              <tr>
                <td width="100">威胁名称</td>
                <td>威胁介绍</td>
              </tr>
              <tr
              v-for="(i, j) in basic_info.wiki"
              :key="j">
                <td>{{i.name}}</td>
                <td class="content-indent">{{i.desc}}</td>
              </tr>
            </table>
          </div>
          <!-- 基本信息 -->
          <div v-if="Object.getOwnPropertyNames(basic_info).length > 1 && dataStatus[2]">
            <h1>基本信息</h1>
            <div class="tableList">
              <table>
                <tr>
                  <td width="200">威胁名称</td>
                  <td>{{ detect_result.threat_type === '安全' ? '无' : detect_result.threat_name || '无' }}</td>
                </tr>
                <tr>
                  <td>{{$projectName}}检测系统系统版本号</td>
                  <td>V1.0</td>
                </tr>
                <tr>
                  <td>样本名称</td>
                  <td>{{ basic_info.sample_name || '无' }}</td>
                </tr>
                <!-- <tr>
                  <td>检测时间</td>
                  <td>{{ $common.dateChange(basic_info.detect_time) || '无' }}</td>
                </tr> -->
                <tr>
                  <td>样本大小</td>
                  <td>{{ basic_info.sample_size || '无' }}</td>
                </tr>
                <tr>
                  <td>MD5</td>
                  <td>{{ basic_info.sample_md5 || '无' }}</td>
                </tr>
                <tr>
                  <td>SHA-1</td>
                  <td>{{ basic_info.sample_sha1 || '无' }}</td>
                </tr>
                <tr>
                  <td>SHA-256</td>
                  <td>{{ basic_info.sample_sha256 || '无' }}</td>
                </tr>
                <tr>
                  <td>加密信息</td>
                  <td>{{ basic_info.crypto || '无' }}</td>
                </tr>
                <tr>
                  <td>加壳信息</td>
                  <td>{{ basic_info.shell || '无' }}</td>
                </tr>
                <tr>
                  <td>数字签名</td>
                  <td>{{ basic_info.sample_sign === '1' ? '有' : '无' }}</td>
                </tr>
                <tr>
                  <td>文件类型</td>
                  <td>{{ basic_info.sample_type || '无' }}</td>
                </tr>
              </table>
            </div>
          </div>
          <div v-if="Object.getOwnPropertyNames(basic_info).length > 1 && basic_info.threat_label">
            <h1>威胁名称</h1>
            <div class="threatLabel">
              <span v-for="(item, index) in basic_info.threat_label.split(',')" :key="index">{{ item }}</span>
            </div>
          </div>
          <p class="printNewLine"></p>
          <div v-if="behaviorLabelShow">
            <h1>行为标签</h1>
            <div class="behaviorLabel"></div>
          </div>
          <div v-if="isNormalData(basic_info, basic_info.threat_wiki)">
            <h1>病毒百科</h1>
            <table>
              <tr>
                <td>威胁名称</td>
                <td>威胁平台</td>
                <td>威胁类型</td>
                <td>威胁描述</td>
              </tr>
              <tr
                v-for="(item, index) in threat_wiki"
                :key="index">
                <td>{{item.threat_name}}</td>
                <td>{{item.threat_influence}}</td>
                <td>{{item.threat_type}}</td>
                <td :title="item.threat_desc">
                  {{item.threat_desc ? item.threat_desc.slice(0, 100) +  (item.threat_desc.length > 100 ? '...' : ''): '暂无'}}
                </td>
              </tr>
            </table>
          </div>
          <div v-if="geneDownload.length || pcapDownload.length" class="printHide">
            <h1>相关文件下载</h1>
            <div class="fileDownload">
              <figure
              @click="$common.downloadFile(geneDownload)"
              v-if="geneDownload.length">
                <img :src="$img.geneDownload">
                <p>基因文件下载</p>
              </figure>
              <figure
              @click="$common.downloadFile(pcapDownload)"
              v-if="pcapDownload.length">
                <img :src="$img.pcapDownload">
                <p>PCAP文件下载</p>
              </figure>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="静态检测" name="2" v-if="dataStatus[0]">
          <p>{{$projectName}}系统使用多种静态检测技术，包括：特征检测、软件基因分析，对样本进行静态分析，获得样本的恶意信息、家族信息等。</p>
          <div>
            <h1>家族信息</h1>
            <table v-if="isNormalData(static_info, static_info.gene_family)">
              <tr>
                <td>家族名称</td>
                <td>基因相似度</td>
              </tr>
              <tr
              v-for="(i, j) in static_info.gene_family"
              :key="j">
                <td>{{i.family}}</td>
                <td>{{i.rate}}</td>
              </tr>
              <!-- 增加为匹配文字 -->
            </table>
            <p v-else style="color: #999;">未检测到家族基因</p>

          </div>
          <div class="predict-result-con">
            <h1 class="__row" v-if="predict_result.length">
              <span class="__col-50">基因分析结果</span>
              <span
                v-if="Array.isArray(this.predict_result_ori)"
                class="__col-50 __text-right __handCursor"
                style="font-size: 10px; line-height: 31px;"
                @click="predictResultShowMore = !predictResultShowMore">
                <i :class="{
                  'el-icon-arrow-up': predictResultShowMore,
                  'el-icon-arrow-down': !predictResultShowMore
                }"></i>
                {{predictResultShowMore ? '收起' : '更多'}}</span>
            </h1>
            <table
              v-if="predict_result.length"
              class="predict-result-table"
              v-for="(x, y) in predict_result"
              :key="y">
                <tr>
                  <td
                    v-for="(x1, y1) in x"
                    :key="y1"
                    :style="{
                      borderTopWidth: y === 0 ? '1px' : '0px'
                    }">
                      <span>{{y1}}</span>
                    </td>
                  <td
                    v-if="y === predict_result.length - 1 && predictResultTableTdNullNum"
                    :colspan="predictResultTableTdNullNum"
                    style="border-color: transparent;"></td>
                </tr>
                <tr>
                  <td
                  v-for="(x1, y1) in x"
                  :key="y1">
                    <span
                    class="results-num printHide"
                    @mouseenter="showResultsNum(x1, $event)"
                    @mouseleave="showResultsNum(x1, $event)"
                    :style="{backgroundImage: backImg(x1)}">
                      <i style="color: rgba(255, 255, 255, 0);">{{x1}}</i>
                    </span>
                    <span class="node-i printHide" style="color: rgba(255, 255, 255, 0);" si='other'>{{x1}}</span>
                    <span class="printShowTrans">{{x1}}</span>
                  </td>
                </tr>
              </table>
            <div
              v-if="predictResultShowMore && predict_result.length"
              class="__text-right"
              style="margin-top: 10px;">
              <el-button
                size="mini"
                @click="predictResultShowMore = false">
                <i class="el-icon-arrow-up"></i>
                收起</el-button>
            </div>

            <div
              class="__row gene-img-con"
              v-if="geneImg1.length || geneImg2.length">
                <div
                class="__col-50 gene-img"
                v-if="geneImg1.length">
                  <img v-lazy="geneImg1">
                  <footer>基因序列物理排列图</footer>
                  <!-- <span @click="dialogVisible = true; showGeneImg = geneImg1">查看大图</span> -->
                  <span @click="showGeneImg = geneImg1; checkOriImg()">查看原图</span>
                  <span><a :href="geneImg1" download="基因序列物理排列图">下载</a></span>
                </div>
                <div
                class="__col-50 gene-img"
                v-if="geneImg2.length">
                  <div>
                    <img v-lazy="geneImg2">
                    <footer>基因逻辑图</footer>
                  </div>
                  <!-- <span @click="dialogVisible = true; showGeneImg = geneImg2">查看大图</span> -->
                  <span @click="showGeneImg = geneImg2; checkOriImg()">查看原图</span>
                  <span><a :href="geneImg2" download="基因逻辑图">下载</a></span>
                </div>
              </div>
          </div>

          <!-- 相关md5 -->
          <div v-if="basic_info.relate_md5">
            <h1>证据链</h1>
            <table>
              <tr>
                <td>本文件MD5</td>
                <td>{{static_info.gene_family[0].family}}家族相关样本MD5</td>
                <td align="center" width="170">关联样本归属证明</td>
                <td align="center" width="120">相关证明</td>
              </tr>
              <tr>
                <td>{{basic_info.sample_md5}}</td>
                <td>{{basic_info.relate_md5}}</td>
                <td align="center">
                  <img
                    class="__handCursor"
                    :src="$img.view"
                    style="height: 13px;"
                    @click="checkEvidence(basic_info.relate_md5, 1)">
                </td>
                <td align="center">
                  <img
                    class="__handCursor"
                    :src="$img.view"
                    style="height: 13px;"
                    @click="checkEvidence(basic_info.relate_md5, 0)">
                </td>
              </tr>
            </table>
          </div>

          <div v-if="isNormalData(static_info, static_info.apt_match)">
            <h1>APT基因检测结果</h1>
            <table>
              <tr>
                <td>名称</td>
                <td width="200">疑似相关组织</td>
                <td width="200">疑似归属国家</td>
              </tr>
              <tr
              v-for="(i, j) in static_info.apt_match"
              :key="j">
                <td>{{i.sampleName}}</td>
                <td>{{i.GroupName}}</td>
                <td>{{i.Nation}}</td>
              </tr>
            </table>
          </div>
          <!-- <div v-if="isNormalData(static_info, static_info.APT_match)">
            <h1>家族基因归属分析结果</h1>
            <el-table
              :data="static_info"
              border
              fit
              highlight-current-row
              :cell-style="{borderColor: '#3a537e', textAlign: 'center', color: '#3a537e'}"
              :header-cell-style="{borderColor: '#3a537e', color: '#3a537e'}"
              style="border: 1px solid #3a537e">
              <el-table-column
                label="归属家族">
              </el-table-column>
              <el-table-column
                label="APT1">
              </el-table-column>
              <el-table-column
                label="APT28">
              </el-table-column>
              <el-table-column
                label="LOCKER">
              </el-table-column>
              <el-table-column
                label="MIRA">
              </el-table-column>
              <el-table-column
                label="GAFGYT">
              </el-table-column>
            </el-table>
          </div> -->
          <div v-if="isNormalData(static_info, static_info.static_detec)">
            <h1>静态启发式检测</h1>
            <table>
              <tr>
                <td width="100">检测类型</td>
                <td width="200">监测点</td>
                <td>详细说明</td>
              </tr>
              <tr
              v-for="(i, j) in static_info.static_detec"
              :key="j">
                <td>{{i.type}}</td>
                <td>{{i.point}}</td>
                <td>{{i.desc}}</td>
              </tr>
            </table>
          </div>
          <div v-if="isNormalData(static_info, static_info.file_relations)">
            <h1>文件衍生关系</h1>
            <p v-for="(relations, index) in static_info.file_relations" :key="index">·&emsp;{{ relations }}</p>
          </div>
          <div v-if="isNormalData(static_info, static_info.section_info)">
            <h1>程序段信息</h1>
            <table>
              <tr>
                <td>SizeOfRawData</td>
                <td>Entropy</td>
                <td>Name</td>
                <td>VirtualAddress</td>
                <td>VirtualSize</td>
              </tr>
              <tr
              v-for="(i, j) in static_info.section_info"
              :key="j">
                <td>{{i.data_size}}</td>
                <td>{{i.entropy}}</td>
                <td>{{i.name}}</td>
                <td>{{i.addr}}</td>
                <td>{{i.virtul_size}}</td>
              </tr>
            </table>
          </div>
          <div v-if="isNormalData(static_info, static_info.PE_import)">
            <h1>调用库信息</h1>
            <table>
              <tr>
                <td width="200">库</td>
                <td>接口</td>
              </tr>
              <tr
              v-for="(i, j) in static_info.PE_import"
              :key="j">
                <td>{{i.lib}}</td>
                <td>{{i.inter}}</td>
              </tr>
            </table>
          </div>
          <div v-if="isNormalData(static_info, static_info.resource_info)">
            <h1>资源信息</h1>
            <!-- <el-table
              :data="static_info.resource_info"
              border
              fit
              highlight-current-row
              :cell-style="{borderColor: '#3a537e', textAlign: 'center', color: '#3a537e'}"
              :header-cell-style="{borderColor: '#3a537e', color: '#3a537e'}"
              style="border: 1px solid #3a537e">
              <el-table-column
                prop="lang"
                label="Lang">
              </el-table-column>
              <el-table-column
                prop="rva"
                label="RVA">
              </el-table-column>
              <el-table-column
                prop="name"
                label="Name">
              </el-table-column>
              <el-table-column
                prop="type"
                label="Type">
              </el-table-column>
              <el-table-column
                prop="sublang"
                label="Sublang">
              </el-table-column>
              <el-table-column
                prop="size"
                label="Size">
              </el-table-column>
            </el-table> -->
            <table>
              <tr>
                <td>Lang</td>
                <td>RVA</td>
                <td>Name</td>
                <td>Type</td>
                <td>Sublang</td>
                <td>Size</td>
              </tr>
              <tr
              v-for="(i, j) in static_info.resource_info"
              :key="j">
                <td>{{i.lang}}</td>
                <td>{{i.rva}}</td>
                <td>{{i.name}}</td>
                <td>{{i.type}}</td>
                <td>{{i.sublang}}</td>
                <td>{{i.size}}</td>
              </tr>
            </table>
          </div>
        </el-collapse-item>
        <el-collapse-item title="动态检测" name="3" v-if="dataStatus[1]">
          <p>{{$projectName}}系统使用多种动态检测技术，对样本进行全方位的动态分析，获得样本的恶意行为信息，包括：文件操作、进程控制、网络访问、注册表控制、同步控制等。</p>
          <div v-if="isNormalData(dynamic_info, dynamic_info.sysinfo)">
            <h1>运行环境</h1>
            <table>
              <tr>
                <td>操作系统</td>
                <td>内置软件</td>
              </tr>
              <tr
              v-for="(i, j) in dynamic_info.sysinfo"
              :key="j">
                <td>{{i.systype}}</td>
                <td>{{i.soft}}</td>
              </tr>
            </table>
          </div>
          <div v-if="isNormalData(dynamic_info, dynamic_info.danger_behavior)">
            <h1>危险行为</h1>
            <table>
              <tr>
                <td>行为描述</td>
                <td width="80">危险等级</td>
                <td>附加信息</td>
              </tr>
              <tr
              v-for="(i, j) in dynamic_info.danger_behavior"
              :key="j">
                <td>{{i.name}}</td>
                <td>{{i.level}}</td>
                <td class="content-td-table">
                  <table>
                    <tr v-for="(dangerBehavior, index) in i.desc" :key="index">
                      <td>{{ dangerBehavior.name }}</td>
                      <td>{{ dangerBehavior.value }}</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </div>
          <div v-if="isNormalData(dynamic_info, dynamic_info.other_behavior)">
            <h1>常见行为</h1>
            <table>
              <tr>
                <td>行为描述</td>
                <td width="80">危险等级</td>
                <td>附加信息</td>
              </tr>
              <tr
              v-for="(i, j) in dynamic_info.other_behavior"
              :key="j">
                <td>{{i.name}}</td>
                <td>{{i.level}}</td>
                <td class="content-td-table">
                  <table>
                    <tr
                    class="content-table-td"
                    v-for="(otherBehavior, index) in i.desc" :key="index">
                      <td width="100">{{ otherBehavior.name }}</td>
                      <td>{{ otherBehavior.value }}</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </div>
          <div v-if="isNormalData(dynamic_info, dynamic_info.file_op)">
            <h1>文件操作</h1>
            <table>
              <tr>
                <td width="100">操作</td>
                <td>路径</td>
              </tr>
              <tr
              class="content-table-td"
              v-for="(i, j) in dynamic_info.file_op"
              :key="j">
                <td>{{i.action}}</td>
                <td>{{i.path}}</td>
              </tr>
            </table>
          </div>
          <div v-if="isNormalData(dynamic_info, dynamic_info.file_scan)">
            <h1>文件扫描</h1>
            <table>
              <tr>
                <td width="200">文件名</td>
                <td width="250">文件MD5</td>
                <td>文件类型</td>
                <td>Yara扫描</td>
              </tr>
              <tr
              v-for="(i, j) in dynamic_info.file_scan"
              :key="j">
                <td>{{i.filename}}</td>
                <td>{{i.MD5}}</td>
                <td>{{i.familydetect.length === 0 ? '无' : i.familydetect}}</td>
                <td>{{i.yara.length === 0 ? '无' : i.yara}}</td>
              </tr>
            </table>
          </div>
          <div v-if="isNormalData(dynamic_info, dynamic_info.process_create)">
            <h1>进程创建</h1>
            <table>
              <tr>
                <td>进程名</td>
              </tr>
              <tr
              v-for="(i, j) in dynamic_info.process_create"
              :key="j">
                <td>{{i.name}}</td>
              </tr>
            </table>
          </div>
          <div v-if="isNormalData(dynamic_info, dynamic_info.process_monitor)">
            <h1>进程监控</h1>
            <table>
              <tr>
                <td width="100">PID</td>
                <td width="100">创建</td>
                <td>命令行</td>
              </tr>
              <tr
              class="content-table-td"
              v-for="(i, j) in dynamic_info.process_monitor"
              :key="j">
                <td>{{i.pid}}</td>
                <td>{{i.name}}</td>
                <td>{{i.cmdline}}</td>
              </tr>
            </table>
          </div>
          <div v-if="isNormalData(dynamic_info, dynamic_info.memory_revise)">
            <h1>内存属性修改</h1>
            <table>
              <tr>
                <td width="100">进程ID</td>
                <td>进程名</td>
                <td width="100">目标进程ID</td>
                <td>目标进程名</td>
                <td width="100">地址</td>
                <td width="100">大小</td>
              </tr>
              <tr
              v-for="(i, j) in dynamic_info.memory_revise"
              :key="j">
                <td>{{i.id}}</td>
                <td>{{i.pname}}</td>
                <td>{{i.tid}}</td>
                <td>{{i.tname}}</td>
                <td>{{i.addr}}</td>
                <td>{{i.size}}</td>
              </tr>
            </table>
          </div>
          <div v-if="isNormalData(dynamic_info, dynamic_info.reg_monitor)">
            <h1>注册表监控</h1>
            <table>
              <tr>
                <td width="70">动作</td>
                <td>路径</td>
                <td>内容</td>
              </tr>
              <tr
              v-for="(i, j) in dynamic_info.reg_monitor"
              :key="j">
                <td>{{i.action}}</td>
                <td>{{i.keypath}}</td>
                <td class="content-td-table">
                  <table>
                    <tr
                    class="content-table-td"
                    v-for="(item, index) in i.valuelist" :key="index">
                      <td width="120">{{ item.valuename }}</td>
                      <td>{{ item.data }}</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </div>
          <div v-if="isNormalData(dynamic_info, dynamic_info.contact_ip)">
            <h1>访问IP</h1>
            <table>
              <tr>
                <td>IP地址</td>
                <td>端口</td>
                <td>归属地</td>
              </tr>
              <tr
              v-for="(i, j) in dynamic_info.contact_ip"
              :key="j">
                <td>{{i.ip}}</td>
                <td>{{i.port}}</td>
                <td>{{i.country}}</td>
              </tr>
            </table>
          </div>
          <div v-if="isNormalData(dynamic_info, dynamic_info.udp)">
            <h1>UDP信息</h1>
            <table>
              <tr>
                <td>源IP地址</td>
                <td>源端口</td>
                <td>目的IP</td>
                <td>目的端口</td>
              </tr>
              <tr
              v-for="(i, j) in dynamic_info.udp"
              :key="j">
                <td>{{i.src}}</td>
                <td>{{i.sport}}</td>
                <td>{{i.dst}}</td>
                <td>{{i.dport}}</td>
              </tr>
            </table>
          </div>
          <div v-if="isNormalData(dynamic_info, dynamic_info.tcp)">
            <h1>TCP信息</h1>
            <table>
              <tr>
                <td>源IP地址</td>
                <td>源端口</td>
                <td>目的IP</td>
                <td>目的端口</td>
              </tr>
              <tr
              v-for="(i, j) in dynamic_info.tcp"
              :key="j">
                <td>{{i.src}}</td>
                <td>{{i.sport}}</td>
                <td>{{i.dst}}</td>
                <td>{{i.dport}}</td>
              </tr>
            </table>
          </div>
          <div v-if="isNormalData(dynamic_info, dynamic_info.icmp)">
            <h1>ICMP信息</h1>
            <table>
              <tr>
                <td>源IP地址</td>
                <td>目的IP</td>
              </tr>
              <tr
              v-for="(i, j) in dynamic_info.icmp"
              :key="j">
                <td>{{i.src_ip}}</td>
                <td>{{i.target_ip}}</td>
              </tr>
            </table>
          </div>
          <div v-if="isNormalData(dynamic_info, dynamic_info.dns)">
            <h1>DNS信息</h1>
            <table>
              <tr>
                <td>IP</td>
                <td>域名</td>
                <td>状态</td>
              </tr>
              <tr
              v-for="(i, j) in dynamic_info.dns"
              :key="j">
                <td>{{i.ip}}</td>
                <td>{{i.dns}}</td>
                <td>{{i.status}}</td>
              </tr>
            </table>
          </div>
          <div v-if="isNormalData(dynamic_info, dynamic_info.mutex)">
            <h1>同步控制</h1>
            <table>
              <tr>
                <td>互斥量名</td>
              </tr>
              <tr
              v-for="(i, j) in dynamic_info.mutex"
              :key="j">
                <td>{{i.name}}</td>
              </tr>
            </table>
          </div>
        </el-collapse-item>
        <el-collapse-item title="处置建议" name="4" v-if="detect_result.threat_type !== '安全'">
          <table class="disposeProposal">
            <tr>
              <td width="250">上报威胁信息</td>
              <td>将文件的MD5(“{{ $route.query.md5 }}”)上报给您安全软件的厂商技术支持人员。根据技术支持工程师的要求，您可能需要提供其他信息供其参考。</td>
            </tr>
            <tr>
              <td>获取、分发特征库</td>
              <td>在提供充分的信息后，您将进入等待新特征库制作的时间，根据厂商能力不同耗时可能在1小时到数天不等在得到相关特征已发布的通知后，您应该在第一时间进行升级。根据部署情况不同可能使用离线升级包或在线升级的方式当管理中心或您内部的升级服务器升级到最新版本后，您应立即进行终端全网升级。根据您带宽的情况耗时可能在1小时到数天不等。在全网升级分发特征库过程中，建议您保持对服务器的关注，特别是各个终端的版本。当全部终端或大部分终端升级到最新版本后，您可以进行后续步骤。</td>
            </tr>
            <tr>
              <td>进行全网扫描</td>
              <td>请参考您使用的安全软件的管理员手册，下达全网扫描指令。等待全网扫描完成，根据网络规模不同，这个过程可能耗时几周，请您保持耐心。如果您下达扫描指令前，不是所有终端都升级到了最新版版本，您可能需要重复此步骤多次。</td>
            </tr>
          </table>
        </el-collapse-item>
      </el-collapse>

      <Loading v-if="loading"/>

      <el-dialog
        :visible.sync="dialogVisible"
        :before-close="() => { dialogImgScale = 1; dialogVisible = false}"
        width="70%"
        maxHeight="600">
          <template slot="title">
            <button @click="dialogImgScale++">放大</button>
            <button @click="dialogImgScale = 1">还原</button>
            <button @click="checkOriImg()">查看原图</button>
          </template>
          <img :src="showGeneImg" width="100%" :style="{width: dialogImgScale + '00%'}">
      </el-dialog>
    </div>
    <ToTop />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      activeNames: ['1', '2', '3', '4'],
      myChart: {},
      detect_result: {},
      basic_info: {},
      behaviorLabelShow: false,
      static_info: {},
      predict_result_ori: [],
      predict_result: [],
      predictResultShowMore: false,
      predictResultTableTdNullNum: 0,
      geneImg1: '',
      geneImg2: '',
      geneDownload: '',
      pcapDownload: '',
      dynamic_info: {},
      legendName: [],
      htmlTitle: this.$route.query.md5,
      dataStatus: [0, 0, 0, 0],
      threatClassify: '',
      loading: true,
      dialogVisible: false,
      showGeneImg: '',
      dialogImgScale: 1,
      threat_wiki: []
    }
  },
  computed: {
    ...mapGetters(['sampleReport'])
  },
  watch: {
    sampleReport (val) {
      this.loading = false
      // 重置计数, 控制显示动态，静态的collapse显示
      this.dataStatus = [0, 0, 0, 0]
      // 切换沙箱后，需要给下载的url清空
      this.geneDownload = ''
      this.pcapDownload = ''
      // 清空显示
      this.basic_info = {}
      this.detect_result = {}
      this.static_info = {}
      this.dynamic_info = {}
      // 行为标签
      this.behaviorLabelShow = false
      // 基因分析结果
      this.predict_result = []

      if (val) {
        this.basic_info = val.basic_info
        if (this.isNormalData(this.basic_info, this.basic_info.behavior_label)) {
          this.basic_info.behavior_label.forEach((i) => {
            this.legendName.push(i.name)
          })
          // watcher.run() 之后才会更新dom
          // 虽然这里设置判断dom显示的条件了，但是并没有真的渲染dom
          // nextTick后才渲染dom
          // 在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM
          this.behaviorLabelShow = true
          this.$nextTick(() => {
            // if (!this.myChart.id) {
            //   // echart 只创建一次实例
            //   this.myChart = this.$echarts.init(document.querySelector('.behaviorLabel'))
            // }
            this.drawEcharts(this.basic_info.behavior_label)
          })
        } else {
          this.behaviorLabelShow = false
        }

        // 基本信息，沙箱不同显示
        if (this.basicDetectShow(this.basic_info)) { this.dataStatus[2] = 1 }

        // 是否显示gene文件下载
        if (this.basic_info.gene && (this.basic_info.gene.is_gene || this.basic_info.gene.is_pcap)) {
          this.getFileUrl()
        }

        this.threat_wiki = this.basic_info.threat_wiki

        this.detect_result = val.detect_result

        // 威胁图标
        switch (this.detect_result.threat_type) {
          case '安全':
            this.threatClassify = this.$img.safe
            break
          case '未知':
            this.threatClassify = this.$img.unknown
            break
          case '':
          case undefined:
            this.threatClassify = ''
            break
          default:
            this.threatClassify = this.$img.malice
            break
        }

        if (this.basicDetectShow(this.detect_result)) { this.dataStatus[3] = 1 }

        // 静态信息，动态信息
        for (var i in val) {
          if (i === 'static_info') {
            for (let j in val[i]) {
              if (val[i][j].length !== 0) {
                this.dataStatus[0] += 1
                this.static_info = val.static_info
              }
            }
          }
          if (i === 'dynamic_info') {
            for (let j in val[i]) {
              if (val[i][j].length !== 0) {
                this.dataStatus[1] += 1
                this.dynamic_info = val.dynamic_info
              }
            }
          }
        }

        // 基因分析结果进度条显示，每行显示n条
        this.predict_result_ori = val.static_info.predict_result
        if (Array.isArray(val.static_info.predict_result)) {
          if (val.static_info.predict_result.length) {
            this.predictResultMore(this.predict_result_ori)
          }
        } else {
          // 老数据是个对象
          this.predict_result = this.$common.splitObjToArr(this.predict_result_ori, 6)
          this.predictResultTableTdNullNum = 6 - Object.keys(
            this.predict_result[this.predict_result.length - 1]
          ).length
        }
      }
    },
    predictResultShowMore (val) {
      this.predictResultMore(this.predict_result_ori)
    }
  },
  methods: {
    checkEvidence (rm, type) {
      switch (Number(type)) {
        case 0:
          this.$common.newTab('Article', {
            relate_md5: rm
          })
          break
        case 1:
          this.$common.newTab('GeneCompareResult', {
            id: this.$route.query.id,
            originMd5: this.basic_info.sample_md5,
            tar_md5: rm,
            sort_style: '-1'
          })
          break
      }
    },
    predictResultMore (pr) {
      let res = null
      if (this.predictResultShowMore) {
        res = pr.slice(0, pr.length)
      } else {
        res = pr.slice(0, 12)
      }
      this.predict_result = this.$common.splitArrToArr(res, 6)
      this.predictResultTableTdNullNum = 6 - Object.keys(
        this.predict_result[this.predict_result.length - 1]
      ).length
    },
    checkOriImg () {
      var newwin = window.open()
      newwin.document.write('<img style="width: 100%" src=' + this.showGeneImg + ' />')
    },
    drawEcharts (data) {
      this.myChart = {}
      this.myChart = this.$echarts.init(document.querySelector('.behaviorLabel'))
      let option = {
        color: this.chartColor,
        legend: {
          orient: 'vertical',
          left: '50%',
          top: 'middle',
          data: this.legendName
        },
        series: [
          {
            type: 'pie',
            center: ['20%', '50%'],
            radius: ['40%', '60%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            data: data
          }
        ]
      }
      this.myChart.clear()
      this.myChart.setOption(option)
      window.addEventListener('resize', function () {
        this.myChart.resize()
      }.bind(this))
    },
    isNormalData (obj, arr) {
      if (Object.getOwnPropertyNames(obj).length > 1 && arr && arr.length) {
        return true
      }
    },
    // 检测结果和基本信息属性可能有，但是数据可能都为空
    basicDetectShow (o) {
      let ol = Object.keys(o).length
      let f = 0
      if (ol) {
        for (let i in o) {
          // 判断o[i]的类型
          switch (typeof o[i]) {
            case 'object':
              if (Array.isArray(o[i]) && o[i].length === 0) { // 数组
                f++
              }
              break
            case 'string':
              if (!o[i]) { f++ }
              break
          }
        }
      }
      return !(ol === f)
    },
    getFileUrl () {
      this.$api.get('gene_image_packet', {
        id: this.$route.query.id
      }).then(res => {
        if (res.status === 200) {
          this.pcapDownload = res.data.pcap_url || ''
        }
      })
      this.$api.get('gene_file_download', {
        id: this.$route.query.id
      }).then(res => {
        if (res.status === 200) {
          this.geneImg1 = res.data.png_url ? (localStorage.downloadUrl + res.data.png_url || '') : ''
          this.geneImg2 = res.data.svg_url ? (localStorage.downloadUrl + res.data.svg_url || '') : ''
          this.geneDownload = res.data.gene_url || ''
        }
      })
    },
    showResultsNum (m, e) {
      let nodeI = e.target.parentNode.querySelector('.node-i')
      void (
        nodeI.style.color === 'rgba(255, 255, 255, 0)'
          ? nodeI.style.color = '#555'
          : nodeI.style.color = 'rgba(255, 255, 255, 0)'
      )
    },
    backImg (m) {
      if (m === '0%') {
        return 'linear-gradient(90deg, #315697 0%, #315697 1.00%, #eee 1.00%, #eee 100%)'
      } else {
        return 'linear-gradient(90deg, #315697 0%, #315697 ' + m + ', #eee ' + m + ', #eee 100%)'
      }
    }
  },
  mounted () {
    document.title = this.$projectName + '-' + this.$route.query.md5
    // 加载gene图谱
    if (this.$tokenName !== 'gtd' && this.$tokenName !== 'zhirong') {
      this.$store.dispatch('getSampleReport', this.$route.query.id)
    }
  },
  beforeRouteLeave (to, from, next) {
    document.title = this.$projectName
    next()
  }
}
</script>
<style scoped>
  .SampleReport-container {
    width: 80%;
    margin: 20px auto;
  }
  .downPdf {
    text-align: end;
    margin-bottom: 5px;
  }
  .downPdf button {
    padding: 8px 15px;
  }
  .el-collapse-item__content > div {
    margin-top: 20px;
  }
  p {
    color: #3a537e;
    font-size: 16px;
    text-indent: 2em;
    margin: 10px 0 5px;
  }
  h1 {
    font-size: 17px;
    color: #3a537e;
    border-bottom: 1px solid #3a537e;
    margin-bottom: 10px;
  }
  .summaryTitle {
    position: relative;
    height: 80px;
    padding-right: 15%;
  }
  .summaryTitle > img {
    position: absolute;
    right: 5%;
    top: 0;
    height: 100%;
  }
  .tableList {
    display: flex;
  }
  .tableList > ul {
    border: 1px solid #3a537e;
  }
  .tableList > ul:first-of-type {
    flex: 1;
    border-right: none;
  }
  .tableList > ul:last-of-type {
    flex: 2;
  }
  .tableList li {
    color: #3a537e;
    border-bottom: 1px solid #3a537e;
    text-indent: 20px;
  }
  .tableList > ul li:last-of-type {
    border-bottom: none;
  }
  .threatLabel {
    padding: 0 20px;
  }
  .threatLabel span {
    display: inline-block;
    background-color: #3a537e;
    color: #fff;
    height: 35px;
    line-height: 35px;
    box-sizing: border-box;
    padding: 0 10px;
    border-radius: 4px;
    border: 1px solid #3a537e;
    margin-right: 10px;
  }
  .behaviorLabel {
    width: 600px;
    height: 250px;
  }
  .disposeProposal {
    margin-top: 10px;
  }
  .disposeProposal > tr > td {
    color: #3a537e;
    border: 1px solid #3a537e;
    padding: 10px;
  }
  .disposeProposal > tr > td:last-of-type {
    text-indent: 2em;
  }
  table {
    width: 100%;
    background: transparent;
    /*text-align: center;*/
    box-sizing: border-box;
    color: #3a537e;
    table-layout: fixed;
  }
  table tr td {
    box-sizing: border-box;
    padding: 0 10px;
    border: 1px solid #3a537e;
  }
  table tr td table tr td {
    padding: 0;
    box-sizing: border-box;
    border: 1px solid #3a537e;
  }
  table tr td table tr:first-child td {
    border-top-width: 0;
  }
  table tr td table tr:last-child td {
    border-bottom-width: 0;
  }
  table tr td table tr td:first-child {
    border-left-width: 0;
    border-right-width: 0;
  }
  table tr td table tr td:last-child {
    border-right-width: 0;
    /*border-left: 1px solid transparent!important;*/
  }
  .content-indent {
    text-indent: 2em;
  }
  .content-td-table{
    padding: 0;
  }
  .content-td-table table tr td {
    box-sizing: border-box;
    padding: 0 10px;
  }
</style>
<style type="text/css" lang="scss">
.SampleReport-container {
  .el-table th,
  .el-table td {
    padding: 0!important;
  }
  .el-dialog {max-width: 600px;}
  .el-dialog__header {
    button {
      background: transparent;
      border: 1px solid $borderColor;
      padding: 0 10px;
      border-radius: 3px;
      cursor: pointer;
    }
  }
  .el-dialog__body {
    overflow: auto;
    box-sizing: border-box;
  }
  .results-num {
    font-size: .6rem;
    display: inline-table;
    margin-right: 0.1rem;
    width: 3rem;
    height: .8rem;
    line-height: .8rem;
    text-align: right;
    border: none;
  }
  .fileDownload {
    figure {
      display: inline-block;
      margin-right: 1rem;
      text-align: center;
      cursor: pointer;
      img {
        height: 4rem;
      }
      p {
        display: block;
        margin-top: 10px;
        color: #333;
        font-size: 0.8rem;
        text-indent: 0;
      }
    }
  }
}

.gene-img-con {
  margin: 15px 0;
  text-align: center;
  .gene-img {
    > img {
      max-width: 60%;
    }
    img {
      height: 200px;
    }
    div {
      width: 60%;
      margin: 0 auto;
      overflow: hidden;
    }
    span {
      background: transparent;
      border: 1px solid $borderColor;
      padding: 0 10px;
      border-radius: 3px;
      cursor: pointer;
      a {color: #333;}
    }
  }
}
</style>
