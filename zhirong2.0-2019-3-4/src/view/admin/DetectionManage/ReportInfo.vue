<template>
  <div class="ReportInfo">
    <div class="ReportInfo-con">
      <div class="btn-con">
        <el-button @click="downloadExcel()" :disabled="tableData.length ? false : true">导出Excel</el-button>
        <el-button @click="downloadHtml()" :disabled="tableData.length ? false : true">导出Html</el-button>
      </div>
      <div v-if="tableData.length" class="tableShow">
        <section class="table-con" v-for="(i, j) in tableList" :key="j">
          <h1 style="text-align: center; font-size: 1.5rem;">{{ i }}</h1>
          <div class="reportList" style="display: flex; justify-content: space-between; border-left: 1px solid #3a537e; border-top: 1px solid #3a537e;">
            <ul style="flex: 1; padding: 0; margin: 0;">
              <li style="list-style: none; border-bottom: 1px solid #3a537e; border-right: 1px solid #3a537e; text-align: center; padding: 5px 0;">录入时间</li>
              <li style="list-style: none; border-bottom: 1px solid #3a537e; border-right: 1px solid #3a537e; text-align: center; padding: 5px 0;" v-for="(time_list, index) in tableData[j].time_list" :key="index">{{ time_list }}</li>
            </ul>
            <ul style="flex: 1; padding: 0; margin: 0;">
              <li style="list-style: none; border-bottom: 1px solid #3a537e; border-right: 1px solid #3a537e; text-align: center; padding: 5px 0;">威胁IP</li>
              <li style="list-style: none; border-bottom: 1px solid #3a537e; border-right: 1px solid #3a537e; text-align: center; padding: 5px 0;" v-for="(host_ip_list, index) in tableData[j].host_ip_list" :key="index">{{ host_ip_list }}</li>
            </ul>
            <ul style="flex: 1; padding: 0; margin: 0;">
              <li style="list-style: none; border-bottom: 1px solid #3a537e; border-right: 1px solid #3a537e; text-align: center; padding: 5px 0;">病毒事件</li>
              <li style="list-style: none; border-bottom: 1px solid #3a537e; border-right: 1px solid #3a537e; text-align: center; padding: 5px 0;" v-for="(virus_list, index) in tableData[j].virus_list" :key="index">{{ virus_list }}</li>
            </ul>
            <ul v-if="tableData.receiver_list" style="flex: 1; padding: 0; margin: 0;">
              <li style="list-style: none; border-bottom: 1px solid #3a537e; border-right: 1px solid #3a537e; text-align: center; padding: 5px 0;">接收者</li>
              <li style="list-style: none; border-bottom: 1px solid #3a537e; border-right: 1px solid #3a537e; text-align: center; padding: 5px 0;" v-for="(receiver_list, index) in tableData[j].receiver_list" :key="index">{{ receiver_list }}</li>
            </ul>
          </div>
        </section>
      </div>
      <div v-else class="noData">未检测到威胁流量</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ReportInfo',
  data () {
    return {
      tableList: [],
      tableData: []
    }
  },
  methods: {
    init () {
      this.$api.get('import_forms_read', {id: this.$route.query.id}).then(res => {
        if (res.status === 200) {
          for (let i in res.data) {
            if (res.data[i]) {
              for (let j in res.data[i]) {
                if (res.data[i][j].length && this.tableData.indexOf(res.data[i]) === -1) {
                  this.tableList.push(i.toUpperCase())
                  this.tableData.push(res.data[i])
                }
              }
            }
          }
        }
      })
    },
    downloadExcel () {
      let headerName = []
      let verticalHeader = []
      let dataArr = []

      this.$api.get('import_forms', {
        id: this.$route.query.id
      }).then(res => {
        if (res.status === 200) {
          let r = res.data
          // 对象的第一层key作为excel的横向表头
          // 第二层的key作为纵向表头
          // 对应的第三层数据作为表格的数据填充

          // 横向表头
          headerName = Object.keys(r)
          headerName.unshift('#')

          // 纵向表头
          headerName.forEach(i => {
            if (r[i]) {
              verticalHeader = verticalHeader.concat(Object.keys(r[i]))
            }
          })
          verticalHeader = Array.from(new Set(verticalHeader)).sort() // 去重并排序

          // 遍历数据
          let listArr = [
            {
              en: 'host_ip_list',
              cn: '威胁IP'
            },
            {
              en: 'receiver_list',
              cn: '接收者'
            },
            {
              en: 'time_list',
              cn: '录入时间'
            },
            {
              en: 'virus_list',
              cn: '病毒事件'
            }
          ]
          verticalHeader.forEach((i, j) => {
            let dataArrItem = []
            if (i === listArr[j].en) {
              dataArrItem.push(listArr[j].cn) // 每行插入纵向表头
            }
            for (let m in r) {
              let item = r[m][i] && r[m][i].length
                ? r[m][i].join(', ')
                : '无'
              dataArrItem.push(item)
            }
            dataArr.push(dataArrItem)
          })
          this.$exportExcel('报表' + this.$route.query.id, dataArr, headerName)
        } else {
          this.$message.warning(res.message)
        }
      })
    },
    downloadHtml () {
      var content = document.querySelector('.tableShow').outerHTML
      // 创建隐藏的可下载链接
      var eleLink = document.createElement('a')
      eleLink.style.display = 'none'
      eleLink.download = '报表' + this.$route.query.id + '.html'
      // 字符内容转变成blob地址
      var blob = new Blob([content])
      eleLink.href = URL.createObjectURL(blob)
      // 触发点击
      document.body.appendChild(eleLink)
      eleLink.click()
      // 移除
      document.body.removeChild(eleLink)
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<style scoped="scoped" lang="scss">
  .ReportInfo {
    .ReportInfo-con {
      width: 80%;
      margin: 1rem auto;
      .btn-con {
        text-align: right;
      }
      .noData {
        text-align: center;
      }
    }
  }
</style>
