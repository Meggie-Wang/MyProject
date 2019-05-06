<template>
  <div class="SaveStatus">
    <Loading v-if="is_unFinished"></Loading>
    <div class="SaveStatus-container">
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
            <li>{{StorageState.total_storage || 0}}</li>
            <li>{{StorageState.use_storage || 0}}</li>
            <li>{{StorageState.storage_rate || 0}}</li>
            <li>{{StorageState.sample_storage_rate || 0}}</li>
            <li>{{StorageState.virus_sample_storage_rate || 0}}</li>
            <li>{{StorageState.normal_sample_storage_rate || 0}}</li>
          </ul>
        </div>
      </div>
      <div class="node-state">
        <h3>存储节点运行状态</h3>
        <ul class="node-state-list">
          <li>节点总数:{{NodeState.total_nodes || 0}}</li>
          <li>正常运行数:{{NodeState.active_nodes || 0}}</li>
          <li>关闭数:{{NodeState.offline_nodes || 0}}</li>
          <li>异常节点数:{{NodeState.error_nodes || 0}}</li>
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
    </div>
  </div>
</template>
<script>
export default {
  name: 'SaveStatus',
  data () {
    return {
      is_unFinished: true,
      StorageState: '',
      NodeList: [],
      NodeState: '',
      dataFailedCount: 0,
      sandboxList: []
    }
  },
  methods: {
    // 获取沙箱状态 资源状态 存储节点运行状态
    init () {
      this.$api.get('system_storage_info').then(res => {
        if (res.status === 200) {
          this.StorageState = res.ret[0]
        }
      })
      this.$api.get('system_resource_status').then(res => {
        this.NodeList = res.storage_info.data.storages_info
        this.NodeState = res.storage_info.data.storage_total_info
        if (this.dataFailedCount === 0 && res.storage_info.status === 400) {
          this.$message.error(res.storage_info.message)
          this.dataFailedCount = 1
        }
        this.sandboxList = res.sandboxes_info.data.sandboxes_info[1].machine_list
        this.is_unFinished = false
      })
    }
  },
  mounted () {
    // 为了防止sibebar卡顿，使得加载数据在0.5（sidebar运行时间）后执行
    setTimeout(() => {
      this.init()
      // 定时调用init()刷新数据
      this.interval = setInterval(() => {
        this.init()
      }, 3000)
    }, 500)
  },
  beforeRouteLeave (to, from, next) {
    if (this.interval) {
      clearInterval(this.interval)
    }
    next()
  },
  // 由于上一步概率出现定时器清除失败问题，若未成功清除则再清除一次
  beforeDestroy () {
    if (this.interval) {
      clearInterval(this.interval)
    }
  }
}

</script>
<style scoped="scoped">
  .SaveStatus {
    color: rgb(52,82,126);
  }
  .SaveStatus-container {
    width: 80%;
    margin: .5rem auto;
  }
  .SaveStatus h3 {
    font-size: 1.5rem;
    border-bottom: 2px solid rgb(52,82,126)
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
</style>
