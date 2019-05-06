<template>
  <div class="white-list-con">
    <h2>白名单设置</h2>
    <div>
      <span style="display: block; font-size: 1.5rem;text-align: center;color: #315697;margin: 1rem 0;">
        {{whiteListBtn === '0' ? (whiteList.length === 0 ? '开启白名单功能，并会把本次访问IP加入白名单' : '开启白名单功能，若本次访问IP不在白名单内，将无法继续访问系统') : '关闭白名单功能，所有IP 均可访问系统'}}
      </span>
    </div>
    <div style="display: flex;justify-content: space-between;">
      <div>
        <el-button @click="stateChange()">{{whiteListBtn === '0' ? '开启' : '关闭'}}白名单<i class="el-icon-loading" v-if="loading" style="margin-left: 2px;"></i></el-button>
      </div>
      <div>
        <el-button @click="dialogWhiteList = !dialogWhiteList" class="resetPassword" :disabled="whiteListBtn === '0'"><span>添加白名单</span></el-button>
      </div>
      <el-dialog title="添加白名单" :visible.sync="dialogWhiteList" style="text-align: center;">
        <div class="addDiv">
          <span>IP</span>
          <div class="addinput" style="margin-left: 1rem">
            <input
              type="text"
              class="el-input__inner"
              v-model="whiteIp"
              placeholder="(请输入IP)"
              style="width:300px"/>
          </div>
        </div>
        <div class="passwordCheck">
        </div>
        <div class="addDiv">
          <span>描述</span>
          <div class="addinput" style="margin-left: 1rem">
            <input
              type="text"
              class="el-input__inner"
              v-model="ipDiscribe"
              placeholder="(请输入描述)"
              style="width:300px"/>
          </div>
        </div>
        <div class="passwordCheck">
        </div>
        <div style="margin: 2rem 0">
          <el-button
            size="small"
            :disabled="whiteIp === ''"
            @click="submit()">确认</el-button>
          <el-button
            size="small"
            @click="dialogWhiteList = false">取消</el-button>
        </div>
      </el-dialog>
      <!-- <div class="add_whiteList">
        <el-input type="tel" v-model="whiteIp"></el-input>
        <el-button @click="submit()">提交</el-button>
      </div> -->
    </div>
    <div class="whiteList">
      <el-table
        :data="whiteList"
        border
        fit
        highlight-current-row
        :cell-style="{borderColor: '#3a537e', textAlign: 'center'}"
        :header-cell-style="{borderColor: '#3a537e', textAlign: 'center', color: '#000'}"
        style="border: 1px solid #3a537e">
        <el-table-column label="提交用户" prop="username"></el-table-column>
        <el-table-column prop="ip" label="IP"></el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">{{ $common.dateChange(scope.row.create_time) }}</template>
        </el-table-column>
        <el-table-column prop="description" label="描述"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="ipDelete(scope.row.ip)" class=""  :disabled="whiteListBtn === '0'">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
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
</template>
<script>
export default {
  name: 'WhiteList',
  data () {
    return {
      whiteList: [],
      whiteIp: '',
      ipDiscribe: '',
      whiteListBtn: '0',
      loading: false,
      dialogWhiteList: false,
      total: 0,
      currentPage: 1
    }
  },
  watch: {
    currentPage (page) {
      // 更新url上pageNo
      this.$router.push({
        path: '/WhiteList',
        query: {
          pageNo: page || 1
        }
      })
    }
  },
  methods: {
    stateChange () {
      this.$confirm(this.whiteListBtn === '0' ? (this.whiteList.length === 0 ? '此次操作将开启白名单功能，并会把本次访问IP加入白名单，是否继续' : '此次操作将开启白名单功能，若本次访问IP不在白名单内，将无法继续访问系统，是否继续') : '此次操作将关闭白名单功能，所有IP 均可访问系统，是否继续', '提示').then((res) => {
        this.loading = true
        this.$api.post('white_ip_switch', {
          username: localStorage.userName,
          switch_status: this.whiteListBtn === '0' ? '1' : '0'
        }).then((res) => {
          if (res.status === 200) {
            this.$message({
              message: res.message,
              type: 'success'
            })
          } else {
            this.$message.error(res.message)
          }
          this.whiteListState()
        })
        this.loading = false
      }).catch(() => {})
    },
    submit () {
      this.$api.get('add_white_ip', {
        username: localStorage.userName,
        ip: this.whiteIp,
        description: this.ipDiscribe
      }).then((res) => {
        if (res.status === 200) {
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.dialogWhiteList = false
        } else {
          this.$message.error(res.message)
        }
        this.init()
      })
    },
    whiteListState () {
      this.$api.get('white_ip_switch').then((res) => {
        this.whiteListBtn = res.data.switch_status.toString()
      })
    },
    ipDelete (val) {
      this.$confirm('此操作将删除此ip，是否继续', '提示').then((res) => {
        this.$api.get('delete_white_ip', {ip: val}).then((res) => {
          if (res && res.status === 200) {
            this.$message.success(res.message)
          } else {
            this.$message.error(res.message)
          }
          this.init()
        })
      }).catch(() => {})
    },
    init (val) {
      this.$api.get('white_ip', {page: val || 1}).then((res) => {
        this.whiteList = res.results
        this.total = res.count
        /*
        @ 更新当前页码
        * 需要在本地数据total有意义后才能生效
        */
        this.currentPage = Number(this.$route.query.pageNo) || 1
      })
    },
    pageChange (val) {
      this.currentPage = val
      this.init(val)
    }
  },
  mounted () {
    this.whiteListState()
    this.init(this.$route.query.pageNo)
  }
}
</script>
<style scoped="scoped" lang="scss">
  h2 {
    font-size: 1.5rem;
    width: 100%;
    border-bottom: 2px solid $borderColor;
    color: $textColor;
  }
  .whiteList {
    margin-top: 1rem;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    span {
      display: flex;
      padding: 5px 0;
      justify-content: center;
      align-items: center;
      width: calc(25% - .2rem - 2px);
      margin: .1rem;
      border: 1px solid $borderColor;
      border-radius: 3px;
    }
  }
  .add_whiteList {
    display: flex;
    align-items: center;
    span {
      min-width: 6rem;
    }
    .el-input {
      width: auto;
      margin-right: .5rem;
    }
  }
</style>
<style lang="scss">
  .add_whiteList {
    .el-input__inner {
      border-color: rgb(52,82,126);
    }
  }
  .addinput {
    border: 1px solid $borderColor;
    border-radius: 5px;
  }
  .addDiv {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 5%;
    >span {
      width: 3rem;
    }
  }
  .addDiv span {
    text-align: left;
  }
  .passwordCheck {
    display: block;
    font-size: .8rem;
    margin-left: 5%;
    color: red;
    height: 1.2rem;
    text-align: left;
    >span {
      margin-left: 7rem;
    }
  }
</style>
