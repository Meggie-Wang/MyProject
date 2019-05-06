<template>
  <div class="AlarmInfor">
    <div class="AlarmInfor-con">
      <section class="operate-con">
        <el-date-picker
          v-model="date"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['12:00:00']"
          @change="changeTime">
        </el-date-picker>
        <el-select
          v-model="protocol"
          placeholder="请选择协议"
          @change="init(currentPage = 1)">
          <template slot="prefix" v-if="protocol">
            <i
              class="el-icon-error el-icon-error-custom"
              @click="protocol = ''; init(currentPage = 1)"
              style="line-height: 40px;"></i>
          </template>
          <el-option
            v-for="item in protocolData"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </section>

      <section class="table-con">
        <el-table
          :data="tableData"
          key="tableData"
          border
          fit
          highlight-current-row
          :cell-style="{borderColor: '#3a537e', textAlign: 'center'}"
          :header-cell-style="{borderColor: '#3a537e', textAlign: 'center', color: '#000'}"
          style="border: 1px solid #3a537e">
          <el-table-column
            label="发现时间"
            :show-overflow-tooltip="true">
            <template slot-scope="scope">
              {{ $common.dateChange(scope.row.open_time) }}
            </template>
          </el-table-column>
          <el-table-column
            label="文件名"
            prop="file_name"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="md5值"
            prop="sample_md5"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column label="协议" width="70">
            <template slot-scope="scope">
              {{scope.row.protocol.toUpperCase()}}
            </template>
          </el-table-column>
          <el-table-column prop="source_ip" label="源IP" width="120"></el-table-column>
          <el-table-column prop="source_port" label="源端口" width="100"></el-table-column>
          <el-table-column prop="target_ip" label="目的IP" width="120"></el-table-column>
          <el-table-column prop="target_port" label="目的端口" width="100"></el-table-column>
          <el-table-column prop="virus_name" label="病毒名称" width="120"></el-table-column>
        </el-table>
      </section>

      <div class="btn-container">
        <el-pagination
          v-if="total"
          class="__text-left"
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="20"
          :pager-count="5"
          @current-change="pageChange"
          :current-page.sync="currentPage">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AlarmInfor',
  data () {
    return {
      date: '',
      startTime: '',
      endTime: '',
      protocol: '',
      protocolData: [
        {
          value: 'http',
          label: 'http'
        },
        {
          value: 'ftp',
          label: 'ftp'
        },
        {
          value: 'pop3',
          label: 'pop3'
        },
        {
          value: 'smtp',
          label: 'smtp'
        },
        {
          value: 'smb',
          label: 'smb'
        }
      ],
      tableData: [],
      total: 0,
      currentPage: 1
    }
  },
  watch: {
    currentPage (page) {
      // 更新url上pageNo
      this.$router.push({
        path: '/AlarmInfor',
        query: {
          pageNo: page || 1
        }
      })
    }
  },
  methods: {
    changeTime (date) {
      if (date) {
        this.startTime = this.$common.dateChange(date[0])
        this.endTime = this.$common.dateChange(date[1])
      } else {
        this.startTime = ''
        this.endTime = ''
      }
      this.init(this.currentPage = 1)
    },
    init (val) {
      this.$api.get('warning_info', {
        start_time: this.startTime,
        end_time: this.endTime,
        protocol: this.protocol,
        page: val || this.currentPage
      }).then(res => {
        if (res) {
          this.tableData = res.results
          this.total = res.count
          /*
          @ 更新当前页码
          * 需要在本地数据total有意义后才能生效
          */
          this.currentPage = Number(this.$route.query.pageNo) || 1
        }
      })
    },
    pageChange (val) {
      this.currentPage = val
      this.init(val)
    }
  },
  mounted () {
    this.init(this.$route.query.pageNo)
  }
}
</script>
<style scoped="scoped" lang="scss">
  .AlarmInfor {
    .AlarmInfor-con {
      width: 80%;
      margin: 0 auto;
      .operate-con {
        display: flex;
        justify-content: flex-end;
        padding: 20px 0;
        div {
          margin-right: 10px;
        }
      }
      .btn-container {
        margin-top: 1rem;
      }
    }
  }
  .el-input__inner, .el-input {
    width: auto;
    border: 1px solid #3a537e;
    border-radius: 5px;
  }
</style>
<style lang="scss">
  .AlarmInfor .el-select .el-input input {
    max-width: 198px;
  }
  .el-tooltip__popper.is-dark {
    background: #fff;
    color: #303133;
    border: 1px solid #303133;
  }
  .el-tooltip__popper .popper__arrow, .el-tooltip__popper .popper__arrow::after {
    border-color: #fff transparent transparent;
    border-style: solid dashed dashed;
  }
  .el-tooltip__popper[x-placement^=top] .popper__arrow::after {
    border-top-color: #fff;
  }
</style>
