<template>
  <div class="searchDetail">
    <div class="searchDetail_container">
      <Loading v-if="loading" />
      <div class="searchContent" v-if="searchDetailData.describe">
        <h3>{{ $route.query.search }}简介</h3>
        <i class="__handCursor" @click="back"></i>
        <div class="describe">{{ searchDetailData.describe }}</div>
      </div>
      <div class="positionInformation" v-if="searchDetailData.location">
        <h3>位置信息</h3>
        <ul>
          <li>
            国家：
          </li>
          <li>
            省/州：
          </li>
          <li>
            城市：
          </li>
          <li>
            坐标：
          </li>
        </ul>
        <baidu-map
          class="bm-view"
          :center="center"
          :zoom="zoom"
          @ready="handler">
          <bm-marker
            :position="center"
            :dragging="true"
            animation="BMAP_ANIMATION_BOUNCE"></bm-marker>
        </baidu-map>
      </div>
      <div class="threatIntelligence">
        <h3>威胁信息关联关系图</h3>
        <div class="threatIntelligenceChart"></div>
      </div>
      <div class="sampleList" v-if="searchDetailData.sample && searchDetailData.sample.length">
        <h3>相关样本列表</h3>
        <el-table
          :data="sample"
          border
          fit
          highlight-current-row
          :cell-style="{borderColor: '#3a537e', textAlign: 'center'}"
          :header-cell-style="{borderColor: '#3a537e', textAlign: 'center', color: '#000'}"
          style="border: 1px solid #3a537e">
          <el-table-column
            prop="sample_name"
            label="测试文件名">
          </el-table-column>
          <el-table-column
            prop="sample_md5"
            label="MD5"
            width="300">
          </el-table-column>
          <el-table-column
            prop="detect_finished_time"
            label="完成时间">
            <template slot-scope="scope">
              <span>{{$common.dateChange(scope.row.detect_finished_time)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="检测结果"
            width="180">
            <template slot-scope="scope">
              {{ $detectionResult(scope.row.is_malicious) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="sample_label"
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
                :src="$img.view"
                class="resView __handCursor"
                @click="resView(scope.row.sample_md5, scope.row.is_malicious, scope.row.id, scope.row.important_level)">
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-if="searchDetailData.sample.length"
          class="__text-left"
          background
          layout="prev, pager, next"
          :total="searchDetailData.sample.length"
          :page-size="10"
          :pager-count="5"
          @current-change="sample_pageChange"
          :current-page.sync="sample_page">
        </el-pagination>
      </div>
      <div class="ip" v-if="searchDetailData.ip && searchDetailData.ip.length">
        <h3>访问IP</h3>
        <el-table
          :data="ip"
          border
          fit
          highlight-current-row
          :cell-style="{borderColor: '#3a537e', textAlign: 'center'}"
          :header-cell-style="{borderColor: '#3a537e', textAlign: 'center', color: '#000'}"
          style="border: 1px solid #3a537e">
          <el-table-column
            prop="ip"
            label="IP地址">
          </el-table-column>
          <el-table-column
            label="最新发现时间">
            <template slot-scope="scope">
              {{ $common.dateChange(scope.row.create_time) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="port"
            label="端口">
          </el-table-column>
          <el-table-column
            prop="country"
            label="归属地">
          </el-table-column>
        </el-table>
        <el-pagination
          v-if="searchDetailData.ip.length"
          class="__text-left"
          background
          layout="prev, pager, next"
          :total="searchDetailData.ip.length"
          :page-size="20"
          :pager-count="5"
          @current-change="ip_pageChange"
          :current-page.sync="ip_page">
        </el-pagination>
      </div>
      <div class="udp" v-if="searchDetailData.udp && searchDetailData.udp.length">
        <h3>UDP信息</h3>
        <el-table
          :data="udp"
          border
          fit
          highlight-current-row
          :cell-style="{borderColor: '#3a537e', textAlign: 'center'}"
          :header-cell-style="{borderColor: '#3a537e', textAlign: 'center', color: '#000'}"
          style="border: 1px solid #3a537e">
          <el-table-column
            prop="src_ip"
            label="源IP地址">
          </el-table-column>
          <el-table-column
            label="最新发现时间">
            <template slot-scope="scope">
              {{ $common.dateChange(scope.row.create_time) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="target_port"
            label="源端口">
          </el-table-column>
          <el-table-column
            prop="target_ip"
            label="目标IP">
          </el-table-column>
          <el-table-column
            prop="src_port"
            label="目的端口">
          </el-table-column>
        </el-table>
        <el-pagination
          v-if="searchDetailData.udp.length"
          class="__text-left"
          background
          layout="prev, pager, next"
          :total="searchDetailData.udp.length"
          :page-size="20"
          :pager-count="5"
          @current-change="udp_pageChange"
          :current-page.sync="udp_page">
        </el-pagination>
      </div>
      <div class="tcp" v-if="searchDetailData.tcp && searchDetailData.tcp.length">
        <h3>TCP信息</h3>
        <el-table
          :data="tcp"
          border
          fit
          highlight-current-row
          :cell-style="{borderColor: '#3a537e', textAlign: 'center'}"
          :header-cell-style="{borderColor: '#3a537e', textAlign: 'center', color: '#000'}"
          style="border: 1px solid #3a537e">
          <el-table-column
            prop="src_ip"
            label="源IP地址">
          </el-table-column>
          <el-table-column
            label="最新发现时间">
            <template slot-scope="scope">
              {{ $common.dateChange(scope.row.create_time) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="src_port"
            label="源端口">
          </el-table-column>
          <el-table-column
            prop="target_ip"
            label="目的IP">
          </el-table-column>
          <el-table-column
            prop="target_port"
            label="目的端口">
          </el-table-column>
        </el-table>
        <el-pagination
          v-if="searchDetailData.tcp.length"
          class="__text-left"
          background
          layout="prev, pager, next"
          :total="searchDetailData.tcp.length"
          :page-size="20"
          :pager-count="5"
          @current-change="tcp_pageChange"
          :current-page.sync="tcp_page">
        </el-pagination>
      </div>
      <div class="icmp" v-if="searchDetailData.icmp && searchDetailData.icmp.length">
        <h3>ICMP信息</h3>
        <el-table
          :data="icmp"
          border
          fit
          highlight-current-row
          :cell-style="{borderColor: '#3a537e', textAlign: 'center'}"
          :header-cell-style="{borderColor: '#3a537e', textAlign: 'center', color: '#000'}"
          style="border: 1px solid #3a537e">
          <el-table-column
            prop="src_ip"
            label="源IP地址">
          </el-table-column>
          <el-table-column
            label="最新发现时间">
            <template slot-scope="scope">
              {{ $common.dateChange(scope.row.create_time) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="target_ip"
            label="目的IP">
          </el-table-column>
        </el-table>
        <el-pagination
          v-if="searchDetailData.icmp.length"
          class="__text-left"
          background
          layout="prev, pager, next"
          :total="searchDetailData.icmp.length"
          :page-size="20"
          :pager-count="5"
          @current-change="icmp_pageChange"
          :current-page.sync="icmp_page">
        </el-pagination>
      </div>
      <div class="dns" v-if="searchDetailData.dns && searchDetailData.dns.length">
        <h3 >DNS信息</h3>
        <el-table
          :data="dns"
          border
          fit
          highlight-current-row
          :cell-style="{borderColor: '#3a537e', textAlign: 'center'}"
          :header-cell-style="{borderColor: '#3a537e', textAlign: 'center', color: '#000'}"
          style="border: 1px solid #3a537e">
          <el-table-column
            prop="ip"
            label="ip">
          </el-table-column>
          <el-table-column
            prop="dns"
            label="域名">
          </el-table-column>
          <el-table-column
            label="最新发现时间">
            <template slot-scope="scope">
              {{ $common.dateChange(scope.row.create_time) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态">
          </el-table-column>
        </el-table>
        <el-pagination
          v-if="searchDetailData.dns.length"
          class="__text-left"
          background
          layout="prev, pager, next"
          :total="searchDetailData.dns.length"
          :page-size="20"
          :pager-count="5"
          @current-change="dns_pageChange"
          :current-page.sync="dns_page">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      center: {lng: 0, lat: 0},
      longitude: '',
      latitude: '',
      zoom: 3,
      myChart: {},
      alltags: [],
      searchDetailData: {},
      categories: [],
      loading: false,
      sample: [],
      sample_page: 1,
      ip: [],
      ip_page: 1,
      udp: [],
      udp_page: 1,
      tcp: [],
      tcp_page: 1,
      icmp: [],
      icmp_page: 1,
      dns: [],
      dns_page: 1
    }
  },
  computed: {
    ...mapGetters(['search', 'allLable'])
  },
  watch: {
    search (val) {
      if (val.data) {
        this.loading = false
        this.searchDetailData = val.data
        this.searchDetailData.nodes.forEach((i) => {
          this.categories.push({name: i.category})
        })
        this.drawChart(this.searchDetailData)
        this.paging(this.sample, this.searchDetailData.sample, 10)
        this.paging(this.ip, this.searchDetailData.ip, 20)
        this.paging(this.udp, this.searchDetailData.udp, 20)
        this.paging(this.tcp, this.searchDetailData.tcp, 20)
        this.paging(this.icmp, this.searchDetailData.icmp, 20)
        this.paging(this.dns, this.searchDetailData.dns, 20)
      } else {
        document.querySelector('.threatIntelligence').style.display = 'none'
      }
    },
    allLable (res) {
      this.alltags = this.$common.inheritObj(res)
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.loading = true
      this.$store.dispatch('getSearch', {
        query: this.$route.query.search,
        select: this.$route.query.type,
        map_num: this.$route.query.map_num,
        sample_num: this.$route.query.sample_num,
        ip_num: this.$route.query.ip_num
      })
      this.$store.dispatch('getAllLable')
      this.myChart = this.$echarts.init(document.querySelector('.threatIntelligenceChart'))
    })
  },
  methods: {
    handler ({BMap, map}) {
      this.center.lng = this.longitude
      this.center.lat = this.latitude
      this.zoom = 15
    },
    back () {
      this.$router.go(-1)
    },
    drawChart (data) {
      var option = {
        color: this.chartColor,
        tooltip: {
          formatter: function (params) {
            return params.data.display
          }
        },
        legend: {
          top: 20,
          data: this.categories.map(function (a) {
            return a.name
          })
        },
        series: {
          type: 'graph',
          layout: 'circular',
          categories: this.categories,
          data: data.nodes,
          links: data.edges,
          focusNodeAdjacency: true,
          itemStyle: {
            normal: {
              shadowBlur: 10,
              shadowColor: '#000'
            }
          },
          lineStyle: {
            normal: {
              width: 2,
              curveness: 0.5
            }
          },
          label: {
            normal: {
              formatter: function (params) {
                return params.data.display
              }
            }
          },
          top: 70
        }
      }
      this.myChart.setOption(option)
      window.addEventListener('resize', function () {
        this.myChart.resize()
      }.bind(this))
    },
    resView (md5, malicious, id, importLevel) {
      if (this.$tokenName === 'gtd') {
        window.open(window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '') + '/#/SampleReport?md5=' + md5 + '&malicious=' + malicious + '&id=' + id + '&importLevel=' + importLevel)
      } else {
        this.$router.push({'path': '/SampleReport', query: {md5: md5, malicious: malicious, id: id}})
      }
      // this.$router.push({path: '/SampleReport', query: {md5: md5, malicious: malicious, id: id}})
    },
    init () {
      this.$store.dispatch('getSearch', {
        query: this.$route.query.search,
        select: this.$route.query.type,
        map_num: this.$route.query.map_num,
        sample_num: this.$route.query.sample_num,
        ip_num: this.$route.query.ip_num
      })
    },
    sample_pageChange (val) {
      this.sample = []
      this.pagechange(this.sample, this.searchDetailData.sample, val, 10)
    },
    ip_pageChange (val) {
      this.ip = []
      this.pagechange(this.ip, this.searchDetailData.ip, val, 20)
    },
    udp_pageChange (val) {
      this.udp = []
      this.pagechange(this.udp, this.searchDetailData.udp, val, 20)
    },
    tcp_pageChange (val) {
      this.tcp = []
      this.pagechange(this.tcp, this.searchDetailData.tcp, val, 20)
    },
    icmp_pageChange (val) {
      this.icmp = []
      this.pagechange(this.icmp, this.searchDetailData.icmp, val, 20)
    },
    dns_pageChange (val) {
      this.dns = []
      this.pagechange(this.dns, this.searchDetailData.dns, val, 20)
    },

    // 第一次进入页面触发的事件 data为存储当前页数据的数组 e为总数据 pageSize为每页条数
    paging (data, e, pageSize) {
      if (e.length > pageSize) {
        for (var i = 0; i < pageSize; i++) {
          data[i] = e[i]
        }
      } else {
        for (var j = 0; j < e.length; j++) {
          data[j] = e[j]
        }
      }
    },

    // 翻页事触发的事件 data为存储当前页数据的数组 e为总数据 val为页码 pageSize为每页条数
    pagechange (data, e, val, pageSize) {
      if (val > (e.length / pageSize)) {
        for (var i = (val - 1) * pageSize; i < e.length; i++) {
          data.push(e[i])
        }
      } else {
        for (var j = (val - 1) * pageSize; j < val * pageSize; j++) {
          data.push(e[j])
        }
      }
    }
  }
}
</script>
<style scoped>
  .searchDetail_container {
    position: relative;
    width: 80%;
    margin: 0 auto;
    padding: 1rem;
  }
  .searchDetail_container > div {
    margin-top: 20px;
  }
  .searchDetail_container h3 {
    font-size: 20px;
    color: #3a537e;
  }
  .searchContent {
    position: relative;
  }
  .searchContent i {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    display: block;
    width: 2rem;
    height: 1rem;
    background: url('../../../assets/img/Rectangle.png') center center / cover no-repeat;
  }
  .searchContent > h3, .positionInformation > h3 {
    border-bottom: 1px solid #3a537e;
  }
  .describe {
    padding: 5px 20px;
  }
  .positionInformation ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0.5rem 1.5rem;
  }
  .positionInformation ul li {
    width: 50%;
    line-height: 2rem;
  }
  /*位置信息*/
  .bm-view {
    width: 100%;
    height: 200px;
    border: 1px solid #3a537e;
    border-radius: 5px;
    overflow: hidden;
  }
  .threatIntelligenceChart {
    width: 100%;
    height: 500px;
    border: 1px solid #3a537e;
    border-radius: 5px;
  }
  .resView {
    width: 30%;
  }
</style>
