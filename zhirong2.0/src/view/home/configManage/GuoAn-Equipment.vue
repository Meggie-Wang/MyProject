<template>
  <div class="Equipment">
    <div>
      <h3>设备设置</h3>
      <div class="EquipmentSetup">
        <div class="setup">
          <div>
            设置系统时间
            <div class="Equipment-function">
              <el-date-picker
                v-model="sys_time"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
              <button class="Equipment-btn .Equipment-btn1" @click="SetupTime"><img :src="$img.setupBtn" alt=""></button>
            </div>
          </div>
          <div>
            设备重启
            <div class="Equipment-function">
              <button class="Equipment-btn" @click="reset"><img :src="$img.resetBtn" alt=""></button>
            </div>
          </div>
          <div>
            关闭设备
            <div class="Equipment-function">
              <button class="Equipment-btn" @click="close"><img :src="$img.closeBtn" alt=""></button>
            </div>
          </div>
        </div>
      </div>
      <!-- <h3>网卡设置</h3>
      <div class="Webcard-setup">
        <div
          v-for="(item,index) in NICList"
          :key="index">
          <div class="Webcard-setup-center">
            <p>网卡{{index}}
            <span v-if="item.addr===''" :style="{borderColor:'gray',backgroundColor:'gray'}">未连接</span>
            <span v-else :style="{borderColor:'rgb(52,82,126)',backgroundColor:'rgb(52,82,126)'}">已连接</span></p>
            <ul>
              <li>IP</li>
              <li><input type="text" v-model="item.addr"></li>
            </ul>
            <ul>
              <li>子网掩码</li>
              <li><input type="text" v-model="item.netmask"></li>
            </ul>
            <ul>
              <li>网关</li>
              <li><input type="text" v-model="item.gateway"></li>
            </ul>
            <div class="setup-btn">
              <el-button type='button' @click='webcardSetup(item,index)'>设置</el-button>
            </div>
          </div>
        </div>
      </div> -->
      <h3>DNS设置</h3>
      <div class="DNSsetupContainer">
        <div class="DNSsetupContainer">
          <input type="text" v-model="DNS1">
          <button class="save-btn" @click="DNSsetup">保存</button>
        </div>
      </div>
      <!-- <h3>检测设置</h3>
      <div class="DetectionSetup">
        <div>
          <el-radio-group v-model="radio">
            <el-radio-button label="静态检测"></el-radio-button>
            <el-radio-button label="动态检测"></el-radio-button>
            <el-radio-button label="全功能检测"></el-radio-button>
          </el-radio-group>
          <button class="save-btn Detectionbtn" @click="DetectionSave">保存</button>
        </div>
      </div> -->
    </div>
  </div>
</template>
<script>
export default {
  name: 'Equipment',
  data () {
    return {
      sys_time: '',
      NICList: [],
      cancle: false,
      DNS: [],
      DNS1: '',
      DNS2: '',
      DNS3: '',
      radio: '静态检测'
    }
  },
  methods: {
    // 重启设备
    reset () {
      this.$confirm('此操作将重启设备, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.post('machine_power', {
          signal: 1
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
      }).catch(() => {})
    },
    // 设置系统时间
    SetupTime () {
      this.$api.post('machine_sys_time', {
        time: this.$common.dateChange(this.sys_time)
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
    },
    // 关闭设备
    close () {
      this.$confirm('此操作将关闭设备, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.post('machine_power', {
          signal: 0
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
      }).catch(() => {})
    },
    // 获取数据
    init () {
      this.$api.get('machine_sys_time').then(res => {
        this.sys_time = res.data.time
      })
      this.$api.get('machine_dns').then(res => {
        this.DNS = res.data
        if (this.DNS[0]) {
          this.DNS1 = this.DNS[0]
        } else {
          this.DNS1 = ''
        }
        if (this.DNS[1]) {
          this.DNS2 = this.DNS[1]
        } else {
          this.DNS2 = ''
        }
        if (this.DNS[2]) {
          this.DNS3 = this.DNS[2]
        } else {
          this.DNS3 = ''
        }
      })
      // this.$api.get('machine_interfaces').then(res => {
      //   this.NICList = res.data
      // })
    },
    removeClick () {
      this.cancle = false
    },
    // 设置
    // upload (item, index) {
    //   this.$api.post('machine_interfaces', {
    //     id: index,
    //     ip: item.addr,
    //     netmask: item.netmask,
    //     gateway: item.gateway
    //   }).then(res => {
    //     if (res.status === 200) {
    //       this.$message({
    //         message: res.message,
    //         type: 'success'
    //       })
    //     } else {
    //       this.$message.error(res.message)
    //     }
    //   })
    // },
    // webcardSetup (item, index) {
    //   this.$confirm('此操作将提交设置, 是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     this.upload(item, index)
    //     console.log(index)
    //   }).catch(() => {})
    // },
    // 提交DNS
    DNSsetup () {
      let DNSarr = []
      if (this.DNS1) {
        DNSarr.push(this.DNS1)
      }
      if (this.DNS2) {
        DNSarr.push(this.DNS2)
      }
      if (this.DNS3) {
        DNSarr.push(this.DNS3)
      }
      this.$confirm('此操作将提交设置, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.post('machine_dns', {
          dns_servers: DNSarr
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
      }).catch(() => {})
    },
    // 保存检测设置
    DetectionSave () {
      console.log('aa')
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<style scoped="scoped">
  .Equipment {
    color: rgb(52,82,126);
  }
  .Equipment > div {
    width: 80%;
    margin: 0 auto;
  }
  .Equipment h3 {
    font-size: 1.5rem;
    margin-top: 1rem;
    border-bottom: 2px solid rgb(52,82,126);
  }
  .setup > div {
    font-weight: bolder;
    display: flex;
    width: 30rem;
    height: 40px;
    margin:.5rem 0;
    justify-content: flex-end;
    align-items: center;
  }
  .Equipment-function {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 1rem;
    height: 40px;
    width: 20rem;
    border: 1px solid rgb(52,82,126);
    border-radius: 5px;
  }
  .Equipment-btn {
    background-color: white;
    border: none;
    height: calc(80% - 2px);
  }
  .Equipment-btn img {
    max-height: 100%;
    max-width: 100%;
    height: auto;
    width: auto;
  }
  .Equipment-btn1 {
    background-color: white;
    border: none;
    margin-left: 2rem;
    height: calc(80% - 2px);
  }
  .Webcard-setup {
    display: flex;
    flex-wrap: wrap;
  }
  .Webcard-setup > div {
    width: calc(50% - 3rem - 2px);
    margin: 2rem 1rem;
    border: 1px solid rgb(52,82,126);
    border-radius: 5px;
    padding: 0 .5rem 1rem;
  }
  .Webcard-setup-center {
    width: 95%;
    margin: 0 auto;
  }
  .Webcard-setup p {
    font-weight: bolder;
    margin: 1rem auto 1rem 0;
  }
  .Webcard-setup p span{
    margin-left: 1rem;
    padding: 4px 8px;
    background-color: rgb(52,82,126);
    border: 1px solid rgb(52,82,126);
    border-radius: 4px;
    color: white;
    font-weight: normal;
  }
  .Webcard-setup ul {
    height: 2.85rem;
    width: 100%;
    overflow: hidden;
  }
  .Webcard-setup ul li {
    height: 40px;
    line-height: 40px;
    float: left;
    border: 1px solid rgb(52,82,126);
    border-radius: 5px;
    margin: .05rem;
    text-align: center;
  }
  .Webcard-setup ul li input {
    text-align: center;
    color: rgb(52,82,126);
  }
  .Webcard-setup ul li:first-of-type{
    width: 20%;
  }
  .Webcard-setup ul li:last-of-type{
    width: calc(80% - 8px - .2rem);
  }
  .setup-btn {
    margin-top: .5rem;
  }
  .DNSsetupContainer {
    margin-top: 2rem;
  }
  .DNSsetupContainer input {
    height: 40px;
    line-height: 40px;
    width: calc((100% - 12px - .3rem)/3);
    border: 1px solid rgb(52,82,126);
    border-radius: 5px;
    margin: .05rem;
    text-align: center;
    color: rgb(52,82,126);
  }
  .save-btn {
    height: 41px;
    line-height: 40px;
    font-size: .9rem;
    width: 4.5rem;
    border: 1px solid rgb(52,82,126);
    border-radius: 5px;
    margin: .05rem;
    text-align: center;
    color: white;
    background-color: rgb(52,82,126);
  }
  .Detectionbtn {
    height: 38px;
  }
  .save-btn:hover {
    cursor: pointer;
    background-color: #fff;
    color: rgb(52,82,126);
    transition: .1s;
  }
  .DetectionSetup > div{
    margin-top: 2rem;
    display: flex;
    align-items: center;
  }
</style>
