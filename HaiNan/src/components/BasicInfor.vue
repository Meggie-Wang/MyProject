<template>
  <div class="BasicInfor">
    <h1>基本信息</h1>

    <!-- 命中漏洞显示 -->
    <img
      v-if="$route.name === 'SoftwareDetectResult'"
      :src="$route.query.target === '命中'
        ? $img.loudongActive
        : $img.loudong" alt="">

    <table>
      <tr
        v-for="(i, j) in basicInfo"
        :key="j" v-if="basicInfo[j] && j !== 'notes'">
        <!-- <td>{{ j }}</td> -->
        <td>{{ dictionarie[j]}}</td>
        <td v-if="j !== 'notes'">
          {{ i }}
          <el-button
            size="mini"
            v-if="j === 'detect_result' && basicInfo.detect_result === '有'"
            @click="downloadFile">下载</el-button>
        </td>
      </tr>

      <!-- # 备注功能 - 判断是否有备注字段 notes，显示输入框，鼠标抬起提交 -->
      <tr v-if="$route.name === 'LoopholeGeneAnalysisDetail'">
        <td>备注</td>
        <td style="text-indent: 0; display: flex;">
          <textarea
            rows="2"
            class="remark"
            v-model="remark"
            placeholder="可输入备注内容..."></textarea>
          <el-button size="mini" class="upload-code" @click="remarkAct">保存</el-button>
        </td>
      </tr>

    </table>
  </div>
</template>
<script>
export default {
  name: 'BasicInfor',
  data () {
    return {
      basicInfoData: {},
      dictionarie: {
        id: 'ID',
        cve_number: 'cve编号',
        cnvd_number: 'cnvd编号',
        cnnvd_number: 'cnnvd编号',
        cve_name: '漏洞名称',
        cve_describe: '漏洞描述',
        serverity: '威胁等级',
        hole_type: '漏洞种类',
        attack_type: '攻击种类',
        products: '影响产品',
        reference_link: '参考链接',
        formalway: '漏洞解决方案',
        patch_name: '补丁名',
        patch_link: '补丁链接',
        attachment: '漏洞附件',
        hasRelateSoft: '是否有关联软件',
        hasRelateBugGeneFile: '是否有关联漏洞基因',
        analyse_status: '分析状态',
        analyse_user: '分析用户',
        analyse_date: '分析时间',
        open_time: '提交时间',
        update_time: '更改时间',
        create_date: '入库时间',
        hasBugCode: '是否有漏洞代码',
        bugCode: '漏洞代码',
        software_name: '软件名称',
        software_version: '软件版本号',
        software_type: '软件类型',
        software_describe: '软件描述',
        software_describe_path: '软件描述文件上传路径',
        software_developer: '软件开发者',
        submit_user: '提交人',
        hasRelateBug: '是否有关联漏洞',
        hasRelateBugGene: '是否有关联漏洞基因',
        software_path: '软件解压路径',
        software_md5: '软件md5',
        detect_status: '基因检测完成状态',
        update_date: '更改时间',
        file_name: '文件名',
        file_md5: '文件MD5',
        file_sha1: '文件sha1',
        file_sha256: '文件sha256',
        file_type: '文件类型',
        software: '软件id',
        file_path: '文件上传路径',
        detect_result: '检测基因有无',
        file_gene: '基因路径',
        gene_md5: '基因MD5',
        detect_finished_date: '基因提取完成时间',
        analysis_style: '分析方式',
        complete_date: '完成时间',
        analysis_rate: '相似度阈值',
        software_id: '软件入库ID',
        relateBugCount: '关联漏洞数',
        notes: '自定义备注',
        predict_status: '检测状态'
      },
      remark: ''
    }
  },
  props: ['basicInfo'],
  watch: {
    basicInfo (val) {
      // 显示备注
      if (val.notes) {
        this.remark = val.notes
      }
    }
  },
  methods: {
    downloadFile () {
      this.$api.get('download_genefile', {
        gene_id: this.basicInfo.id
      }).then(r => {
        if (r.status === 200) {
          this.$common.downloadFile(r.data.gene_url, (msg) => {
            this.$message({
              type: 'success',
              message: msg
            })
          })
        } else {
          this.$message({
            type: 'warning',
            message: r.message
          })
        }
      })
    },
    clearRemark () {
      if (this.remark === '...') {
        this.remark = ''
      }
    },
    remarkAct (e) {
      this.$api.get('add_remark', {
        cve_id: this.basicInfo.id,
        remark: this.remark.replace(/(^\s*)|(\s*$)/g, '').length ? this.remark : '...'
      }).then(e => {
        if (e.status !== 200) {
          this.$message({
            type: 'warning',
            message: e.message
          })
        } else {
          this.$message({
            type: 'success',
            message: e.message
          })
          this.$emit('init')
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
  .BasicInfor {
    position: relative;
    margin-top: 5px;
    img {
      position: absolute;
      top: 20px;
      left: calc(20% + 4em);
      width: 3rem;
    }
    h1 {
      color: $tableTitleText;
      background: $tableTitleBg;
      text-indent: 1rem;
      font-size: 0.9rem;
      font-weight: normal;
      border-radius: 2px;
      margin-bottom: 2px;
      padding: 5px 0;
    }
    table {
      width: 100%;
      background: $bgColor-opacity;
      td {
        border-bottom: 2px solid #0a2a25;
        border-right: 2px solid #0a2a25;
        font-size: 0.8rem;
      }
      td:first-of-type {
        width: 20%;
        text-align: center;
      }
      td:last-of-type {
        box-sizing: border-box;
        padding: 0.3rem .5rem;
        text-indent: 2em;
        border-right: none;
      }
      button {
        border: none;
        box-shadow: 0px 1px 5px #001913;
      }
      button:hover {
        color: $greenLight;
      }
      .remark {
        background-color: $selectBg;
        color: #333;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        border: none;
        width: 100%;
        max-width: 100%;
        box-sizing: border-box;
        padding: .2rem 0;
        text-indent: 2em;
        resize: vertical;
        z-index: 999;
      }
    }
  }
</style>
