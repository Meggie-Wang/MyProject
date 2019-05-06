<template>
  <div class="Resource">
    <div v-if="is_unFinished">
      <template>
        <Loading></Loading>
      </template>
    </div>
    <div class="Resource-container">
      <div class="box-state">
        <h3>沙箱状态</h3>
        <div>
          <div class="equipment1">
            <p>沙箱集群1</p>
            <ul>
              <li>
                <span><img src="@/assets/img/zhirong-logo.png" alt=""></span>
                <span><img src="@/assets/img/equipment.png" alt="" v-if="ZR1&&ZR1==='1'"><img src="@/assets/img/un-equipment.png" alt="" v-else></span>
              </li>
              <li>
                <span><img src="@/assets/img/antian-logo.png" alt=""></span>
                <span><img src="@/assets/img/equipment.png" alt="" v-if="AT1&&AT1==='1'"><img src="@/assets/img/un-equipment.png" alt="" v-else></span>
              </li>
              <li>
                <span><img src="@/assets/img/lingdun-logo.png" alt=""></span>
                <span><img src="@/assets/img/equipment.png" alt="" v-if="LD1&&LD1==='1'"><img src="@/assets/img/un-equipment.png" alt="" v-else></span>
              </li>
            </ul>
          </div>
          <div class="equipment2">
            <p>沙箱集群2<button v-if="(ZR2&&AT2&&LD2)&&!(ZR2===0&&AT2===0&&LD2===0)"  @click="closeOrOpen(0)">关闭集群</button><button v-else @click="closeOrOpen(1)">开启集群</button></p>
            <ul>
              <li>
                <span><img src="@/assets/img/zhirong-logo.png" alt=""></span>
                <span><img src="@/assets/img/equipment.png" alt="" v-if="ZR2&&ZR2==='1'"><img src="@/assets/img/un-equipment.png" alt="" v-else></span>
              </li>
              <li>
                <span><img src="@/assets/img/antian-logo.png" alt=""></span>
                <span><img src="@/assets/img/equipment.png" alt="" v-if="AT2&&AT2==='1'"><img src="@/assets/img/un-equipment.png" alt="" v-else></span>
              </li>
              <li>
                <span><img src="@/assets/img/lingdun-logo.png" alt=""></span>
                <span><img src="@/assets/img/equipment.png" alt="" v-if="LD2&&LD2==='1'"><img src="@/assets/img/un-equipment.png" alt="" v-else></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="storage">
        <h3>存储状态</h3>
        <div class="__beeTable">
          <ul>
            <li>总存储空间</li>
            <li>已用存储空间</li>
            <li>存储空间使用率</li>
            <li>样本占用空间</li>
            <li>病毒样本占用比</li>
            <li>普通样本占用比</li>
          </ul>
          <ul>
            <li>{{StorageState.total_storage}}</li>
            <li>{{StorageState.use_storage}}</li>
            <li>{{StorageState.storage_rate}}</li>
            <li>{{StorageState.sample_storage_rate}}</li>
            <li>{{StorageState.virus_sample_storage_rate}}</li>
            <li>{{StorageState.normal_sample_storage_rate}}</li>
          </ul>
        </div>
      </div>
      <div class="node-state">
        <h3>存储节点运行状态</h3>
        <ul class="node-state-list">
          <li>节点总数:{{NodeState.total_nodes}}</li>
          <li>正常运行数:{{NodeState.active_nodes}}</li>
          <li>关闭数:{{NodeState.offline_nodes}}</li>
          <li>异常节点数:{{NodeState.error_nodes}}</li>
        </ul>
        <div class="storage-node-list">
          <ul class="storage-node">
            <li v-for="(item, index) in NodeList" :key='index'>
              <div class="node-number"><p>节点{{index+1}}</p></div>
              <div class="storage-node-details">
                <p><span>状态：</span><span :style="{'color': item.status==='OFFLINE'?'red':'rgb(52,82,126)'}">{{item.status}}</span></p>
                <p><span>存储：</span>{{item.usage}}</p>
                <p><span>CPU：</span>{{item.cpu_usage}}</p>
                <p><span>内存：</span>{{item.memory_usage}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="storage-clear">
        <h3>存储清理</h3>
        <div class="select-opt">
          <div class="option">
            <el-select
            v-model="threatenVal"
            placeholder="恶意性"
            @change="urlSync()">
              <template slot="prefix" v-if="threatenVal">
                <i
                  class="el-icon-error el-icon-error-custom"
                  style="line-height: 39px;"
                  @click="threatenVal = ''"></i>
              </template>
              <el-option
                v-for="item in $threatenOptions()"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="select-time">
            <el-date-picker
              v-model="selectTime"
              type="datetimerange"
              range-separator=""
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00']"
              @change="selectDate(selectTime); urlSync()"
              >
            </el-date-picker>
            <el-button @click="storageTable(currentPage = 1)">搜索</el-button>
          </div>
          <div class="clear-button">
            <el-button :disabled="delDisable" @click='del()'>开始清除</el-button>
          </div>
        </div>
        <el-table
          class="storage-list"
          :data="TestList"
          border
          @selection-change="selsChange"
          :cell-style="{borderColor: '#3a537e', 'text-align': 'center'}"
          :header-cell-style="{borderColor: '#3a537e', textAlign: 'center', color: '#000'}"
          style="border: 1px solid #3a537e">
          <el-table-column
            prop="sample_name"
            label="测试文件名">
            <template slot-scope="scope">
              <FileName :name="scope.row.sample_name" :length="20" />
            </template>
          </el-table-column>
          <el-table-column
            label="完成时间">
            <template slot-scope="scope">
              <span>{{$common.dateChange(scope.row.detect_finished_time)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="is_malicious"
            label="检测结果">
            <template slot-scope="scope">
              <span>{{$detectionResult(scope.row.is_malicious)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="标签">
            <template slot-scope="scope">
              <Tags
              :id="scope.row.id"
              :md5="scope.row.sample_md5"
              :exist="scope.row.sample_label + ',' + Math.random()"
              :alltags="alltags"
              @initList="init()"/>
            </template>
          </el-table-column>
          <el-table-column
            label="结果查看"
            width="90">
            <template slot-scope="scope">
              <img
              class="check-report-icon gtd-handCursor"
              :src="$img.view"
              @click="checkReport(scope.row.sample_md5, scope.row.id, scope.row.important_level)">
            </template>
          </el-table-column>
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
        </el-table>
        <div class="btn-container">
          <el-pagination
            v-if="total"
            class="gtd-text-left"
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
  </div>
  <!-- 注册Tags组件,watch检测标签变化,表格标签绑定id,md5,exist,alltags,通过mapGetters从vuex遍历allLable,mounted()里获取tags数据,@initList重新获取数据用于刷新列表-->
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Resource',
  data () {
    return {
      AT1: '',
      ZR1: '',
      LD1: '',
      AT2: '',
      ZR2: '',
      LD2: '',
      StorageState: '',
      NodeState: '',
      threatenVal: '',
      total: 0,
      currentPage: 1,
      value: '',
      selectTime: [],
      value2: '',
      NodeList: [],
      TestList: [],
      allcheck: false,
      SingleCheck: [],
      alltags: [],
      sels: [],
      check: [],
      startTime: '',
      endTime: '',
      dataFailedCount: 0,
      is_unFinished: true,
      delDisable: true
    }
  },
  computed: {
    ...mapGetters(['allLable', 'aptFamily'])
  },
  watch: {
    allLable (res) {
      this.alltags = this.$common.inheritObj(res)
    },
    currentPage (page) {
      this.urlSync()
    },
    check (val) {
      if (val.length !== 0) {
        this.delDisable = false
      } else {
        this.delDisable = true
      }
    }
  },
  methods: {
    urlSync () {
      // 更新url上pageNo
      // 携带选择条件
      // 携带标签
      this.$router.push({
        path: '/GTD-Resource',
        query: {
          pageNo: this.currentPage,
          threatenVal: this.threatenVal,
          startTime: this.startTime,
          endTime: this.endTime
        }
      })
    },
    selectDate (selectTime) {
      if (this.selectTime === null) {
        this.selectTime = ''
        this.startTime = ''
        this.endTime = ''
      } else {
        this.startTime = this.$common.dateChange(this.selectTime[0])
        this.endTime = this.$common.dateChange(this.selectTime[1])
      }
    },
    // 获取当前选中行
    selsChange (sels) {
      this.sels = sels
      this.check = []
      for (var i = 0; i < this.sels.length; i++) {
        this.check[i] = this.sels[i].id
      }
    },
    // 开始清除
    del () {
      this.$confirm('此操作将清除所选项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.post('detect_result_list', {
          sample_list: this.check
        }).then(res => {
          this.storageTable(this.currentPage = 1)
          if (res.status === 200) {
            this.$message({
              message: res.message,
              type: 'success'
            })
          } else {
            this.$message.error(res.message)
          }
        })
      }).catch(() => {})
    },
    // 沙箱集群开启和关闭
    closeOrOpen (val) {
      this.$confirm((val === 1 ? '此操作将开启集群, 是否继续?' : '此操作将关闭集群, 是否继续?'), '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.post('scheduler_controler', {
          schedulerNum: 'IP2',
          schedulerStatus: val
        }).then(res => {
          if (res.status === 200) {
            this.$message({
              message: res.message,
              type: 'success'
            })
          } else {
            this.$message.error(res.message)
          }
        })
      }).catch(() => {
      })
    },
    // 获取沙箱状态 资源状态 存储节点运行状态
    init () {
      this.$api.get('system_storage_info').then(res => {
        this.StorageState = res.ret[0]
      })
      this.$api.get('system_resource_status').then(res => {
        this.NodeList = res.storage_info.data.storages_info
        this.NodeState = res.storage_info.data.storage_total_info
        if (this.dataFailedCount === 0 && res.storage_info.status === 400) {
          this.$message.error(res.storage_info.message)
          this.dataFailedCount = 1
        }
        let equipmentState2 = res.sandboxes_info.data.sandboxes_info.IP2
        let equipmentState1 = res.sandboxes_info.data.sandboxes_info.IP1
        if (equipmentState2) {
          this.AT2 = equipmentState2[1].AT.running_status
          this.ZR2 = equipmentState2[0].ZR.running_status
          this.LD2 = equipmentState2[2].LD.running_status
        }
        if (equipmentState1) {
          this.AT1 = equipmentState1[1].AT.running_status
          this.ZR1 = equipmentState1[0].ZR.running_status
          this.LD1 = equipmentState1[2].LD.running_status
        }
        this.is_unFinished = false
      })
    },
    // 获取表格数据
    storageTable (val) {
      this.$api.get('detect_result_list', {
        page: val || 1,
        malicious: this.threatenVal,
        start_time: this.startTime,
        end_time: this.endTime
      }).then(res => {
        // this.currentPage = 1
        this.TestList = res.results
        this.total = res.count
        /*
        @ 更新当前页码
        * 需要在本也数据total有意义后才能生效
        */
        this.currentPage = Number(this.$route.query.pageNo)
      })
    },
    // 翻页
    pageChange (val) {
      this.currentPage = val
      this.storageTable(val)
    },
    // 跳转到查看页面
    checkReport (md5, id, importLevel) {
      if (this.$tokenName === 'gtd') {
        window.open(window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '') + '/#/SampleReport?md5=' + md5 + '&id=' + id + '&importLevel=' + importLevel)
      } else {
        this.$router.push({'path': '/SampleReport', query: {md5: md5, id: id}})
      }
    }
  },
  mounted () {
    this.init()
    // 定时调用init()刷新数据
    this.interval = setInterval(() => {
      this.init()
    }, 3000)
    this.storageTable(this.$route.query.pageNo)
    // lable数据
    this.$store.dispatch('getAllLable')
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      // 从url上更新搜索信息
      // 恶意性
      if (vm.$route.query.threatenVal) {
        vm.threatenVal = vm.$route.query.threatenVal
      }
      // 时间
      vm.selectTime.push(vm.$route.query.startTime || '')
      vm.selectTime.push(vm.$route.query.endTime || '')
      vm.startTime = vm.$route.query.startTime || ''
      vm.endTime = vm.$route.query.endTime || ''
    })
  },
  beforeRouteLeave (to, from, next) {
    if (this.interval) {
      clearInterval(this.interval)
    }
    next()
  }
}

</script>
<style scoped="scoped">
  .Resource {
    color: rgb(52,82,126);
  }
  .Resource > div {
    width: 80%;
    margin: 0 auto;
  }
  .Resource h3 {
    font-size: 1.5rem;
    margin-top: 1.5rem;
    border-bottom: 2px solid rgb(52,82,126)
  }
  .box-state > div {
    margin-top: 2rem;
    width: 98%;
    margin: 2rem auto;
    color: black;
    font-weight: bolder;
    font-size: 1.4rem;
    display: flex;
  }
  .box-state p:first-of-type {
    text-align: left;
    margin-bottom: .2rem;
  }
  .box-state p:last-of-type {
    display: flex;
    justify-content: space-between;
  }
  .box-state p button {
    display: block;
    width: 6rem;
    font-size: 14px;
    border: none;
    background-color: rgb(52,82,126);
    color: white;
    font-weight: normal;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .box-state p button:hover {
    cursor: pointer;
  }
  .box-state > div ul {
    border: 1px solid rgb(52,82,126);
    display: flex;
  }
  .box-state > div ul li {
    flex: 1;
    margin: 1rem auto;
  }
  .box-state > div ul li span {
    display: block;
    margin: auto;
    width: 100%;
  }
  .box-state > div ul li span:last-of-type {
    margin-top: .5rem;
    width: 70%;
  }
  .box-state > div ul li:last-of-type span {
    width: 80%;
  }
  .box-state > div ul li:last-of-type span:last-of-type {
    width: 70%;
  }
  .box-state > div ul li span img {
    width: 50%;
  }
  .lingdun-img img{
    width: 35%;
  }
  .box-state > div > div {
    flex: 1;
    margin:auto 1% 0;
    text-align: center;
  }
  .node-state-list {
    width: 100%;
    font-weight: bolder;
    height: 40px;
    margin-top: 1.5rem;
    border: 1px solid rgb(52,82,126);
    border-radius: 5px;
  }
  .node-state-list li {
    line-height: 2.5rem;
    float: left;
    width: calc(25% - .5px);
    text-align: center;
  }
  .storage .__beeTable {
    margin-top: 1rem;
  }
  .__beeTable li {
    color: rgb(52,82,126);
    border: 1px solid rgb(52,82,126);
  }
  .storage-node-list {
    width: 100%;
    margin-top: 1.5rem;
  }
  .storage-node {
    margin: auto;
    font-weight: bolder;
    overflow: hidden;
  }
  .storage-node p {
    height: 40px;
    line-height: 40px;
    margin: 0.1rem auto;
    text-align: center;
  }
  .storage-node li {
    float: left;
    margin-right: 2%;
    width: calc(18.4%);
  }
  .storage-node li:nth-of-type(5n){
    margin-right: 0;
  }
  .storage-node-details p {
    border: 1px solid rgb(52,82,126);
    border-radius: 5px;
    overflow: hidden;
  }
  .storage-node-details p span{
    margin-right: .5rem;
  }
  .select-opt {
    margin: .5rem auto;
    display: flex;
    flex-wrap: wrap;
    /*align-items: center;*/
    /*min-width: 705px;*/
  }
  .option {
    flex: 1;
    min-width: 117px;
    margin-bottom: .5rem;
  }
  .select-time {
    flex: 5;
    min-width: 500px;
    text-align: center;
    margin-bottom: .5rem;
  }
  .btn-container {
    position: relative;
    margin-top: 1rem;
    margin-bottom: 1rem;
    text-align: end;
  }
  .gtd-handCursor {
    height: 1rem;
  }
</style>
