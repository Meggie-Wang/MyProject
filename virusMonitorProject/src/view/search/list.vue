<style scoped>
  .list_container {
    display: flex;
    width: 80%;
    margin: 1% auto;
  }
  /*左边*/
  .el-aside {
    color: #333;
    border: 1px solid #0e6955;
    padding: 1%;
  }
  .list_head > h4 {
    font-weight: bold;
    font-size: 16px;
    line-height: 30px;
    text-indent: 10px;
    margin-bottom: 10px;
  }
  .resultsNum {
    display: flex;
    align-items: center;
    padding: 20px 10px;
  }
  .resultsNum p:first-of-type {
    color: #148F73;
    font-weight: bold;
    font-size: 14px;
    margin-right: 10px;
  }
  .resultsDistributed {
    padding: 20px 10px;
    color: #148F73;
    font-weight: bold;
    font-size: 14px;
  }
  #map {
    width: 100%;
    height: 150px;
    margin-top: 10px;
  }
  .el-aside .el-table {
    margin-bottom: 3%;
  }
  /*右边*/
  .list_data {
    width: 75%;
    border: 1px solid #0e6955;
    padding: 1% 2%;
    margin-left: 2%;
  }
  .main_head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1%;
    user-select: none;
  }
  .main_head h4 {
    font-weight: bold;
    font-size: 16px;
  }
  .main_head h4 > span {
    margin-left: 20px;
    color: #0e6955;
    font-size: 12px;
    border: 1px solid #0e6955;
    padding: 2px;
    border-radius: 5px;
  }
  .main_head > span {
    background: #0A634F;
    padding: 10px 15px;
    color: #fff;
    display: inline-block;
    font-size: 12px;
    cursor: pointer;
  }
  .main_head_top > div {
    margin-bottom: 10px;
  }
  .resList {
    border: 2px solid #0e6955;
    border-radius: 10px;
    user-select: none;
    margin-bottom: 15px;
  }
  .ipTitle {
    color: #0e6955;
    margin: 15px 20px;
    font-size: 16px;
    font-weight: bold;
    -webkit-user-select: text;
  }
  .basicInfor,
  .geoInfor > ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 20px;
  }
  .basicInfor > p,
  .geoInfor > ul li {
    width: 50%;
    margin: 10px 0;
    font-size: 14px;
  }
  .line {
    width: 97%;
    margin: 10px auto;
  }
  .portService {
    display: flex;
  }
  .portService > p {
    white-space: nowrap;
    margin-right: 50px;
  }
  .portServiceTags > span {
    display: inline-block;
    margin: 0 5px 5px 0;
  }
  .resList_td_bottom {
    padding: 0 50px 10px 20px;
  }
  /*分页*/
  .el-pagination {
    text-align: end;
  }
</style>
<style>
  /*左边栏*/
  .list_container .el-table td {
    cursor: pointer;
  }
  .list_container .el-table th .cell {
    color: #148F73;
    font-weight: bold;
    font-size: 14px;
  }
  /*搜索内容*/
  .list_container .el-tag {
    min-width: 80px;
    color: #0e6955;
    text-align: center;
    margin-right: 10px;
    background: rgba(10, 99, 79, .1);
    border: 1px solid rgba(10, 99, 79, .2);
  }
  /*分页*/
  .list_container .pagination {
    display: flex;
    justify-content: flex-end;
    height: 30px;
    line-height: 30px;
  }
  .list_container .pagination li {
    margin-left: 1rem;
  }
  .list_container .pagination li a {
    display: flex;
    justify-content: space-around;
    align-items: center;
    min-width: 1.5rem;
    height: 1.5rem;
    white-space: nowrap;
    border-radius: 2px;
    outline: none;
    user-select: none;
  }
  .list_container .page-item.active a {
    background: #017d63;
    color: #fff;
  }
  .list_container .pagination li a:hover {
    color: #017d63;
  }
  .list_container .page-item.active a:hover {
    color: #fff;
  }
  .list_container .el-pager .active {
    border-color: #0E6A55!important;
    background-color: #0E6A55!important;
  }
</style>
<template>
  <el-container class="list_container">
    <!-- 左边部分 -->
    <el-aside>
      <div class="list_head">
        <h4>{{ $t('messages.list.searchResAnalysis') }}</h4>
      </div>
      <div>
        <hr>
        <div class="resultsNum">
          <p>{{ $t('messages.list.totalResQuantity') }}：</p>
          <p>{{ total }}</p>
        </div>
        <hr>
        <p class="resultsDistributed">{{ $t('messages.list.totalResDistribution') }}：</p>
        <hr>
      </div>
      <div id="map"></div>
      <el-table :data="portData" @row-click="choice_port" :title="$t('messages.list.secondSearch')">
        <el-table-column prop="item" :label="$t('messages.list.portDistribution')" width="180"></el-table-column>
        <el-table-column prop="num"></el-table-column>
      </el-table>
      <el-table :data="serviceData" @row-click="choice_tags" :title="$t('messages.list.secondSearch')">
        <el-table-column prop="item" :label="$t('messages.list.serviceDistribution')" width="180"></el-table-column>
        <el-table-column prop="num"></el-table-column>
      </el-table>
      <el-table :data="nationalData" @row-click="choice_country" :title="$t('messages.list.secondSearch')">
        <el-table-column prop="item" :label="$t('messages.list.nationalDistribution')" width="180"></el-table-column>
        <el-table-column prop="num"></el-table-column>
      </el-table>
    </el-aside>
    <!-- 右边部分 -->
    <div class="list_data">
      <div class="main_head">
        <h4>{{ $t('messages.list.searchResList') }}
          <span>{{ $t('messages.list.timeUse') }}{{ searchTime }}{{ $t('messages.list.seconds') }}</span>
        </h4>
        <span @click="back">{{ $t('messages.list.Research') }}</span>
      </div>
      <div class="main_head_top">
        <div>
          <el-tag>{{ $t('messages.list.firstSearch') }}：</el-tag>
          <el-tag
            :key="i"
            v-for="(first, i) in firstSearch"
            :disable-transitions="true">
            {{first}}
          </el-tag>
        </div>
        <div>
          <el-tag>{{ $t('messages.list.secondSearch') }}：</el-tag>
          <el-tag
            :key="second"
            v-for="second in secondSearch"
            closable
            :disable-transitions="true"
            @close="handleClose(second)">
            {{second}}
          </el-tag>
        </div>
      </div>
      <div class="resList" v-for="(listData, index) in listDatas" :key="index">
        <p class="ipTitle" onselectstart="return true">{{ $t('messages.advSearch.IPAddress') }}：{{listData._source.ip}}</p>
        <div @click="getDetail(listData._source.ip)" style="cursor: pointer;">
          <div class="basicInfor">
            <p>{{ $t('messages.list.operatingSystem') }}：
              <span v-if="listData._source.metadata != null">{{listData._source.metadata.os}}</span>
            </p>
            <p>{{ $t('messages.list.homemadeSystemName') }}：{{listData._source.autonomous_system.name.replace(',', '')}}</p>
            <p>{{ $t('messages.list.homemadeSystemNum') }}：{{listData._source.autonomous_system.routed_prefix}}</p>
            <p>{{ $t('messages.list.organization') }}：{{listData._source.autonomous_system.organization}}</p>
            <p>{{ $t('messages.list.equipmentType') }}：<p v-if="listData._source.metadata != null">{{listData._source.metadata.device_type}}</p></p>
          </div>
          <hr class="line" />
          <div class="portService">
            <p class="ipTitle">{{ $t('messages.list.portAndService') }}</p>
            <div class="portServiceTags">
              <span v-for="(ptag, index) in listData._source.ptags" :key="index"><el-button>{{ptag}} / {{getPort(ptag)}}</el-button></span>
            </div>
          </div>
          <hr class="line" />
          <div class="geoInfor">
            <p class="ipTitle">{{ $t('messages.list.geographicInfo') }}</p>
            <ul>
              <li>
                {{ $t('messages.advSearch.country') }}：
                <span v-if="listData._source.location != null">{{listData._source.location.country}}</span>
              </li>
              <li>
                {{ $t('messages.advSearch.provinceAndState') }}：
                <span v-if="listData._source.location != null">{{listData._source.location.province}}</span>
              </li>
              <li>
                {{ $t('messages.advSearch.city') }}：
                <span v-if="listData._source.location != null">{{listData._source.location.city}}</span>
              </li>
              <li>
                {{ $t('messages.list.coordinate') }}：
                <span v-if="listData._source.location != null">{{listData._source.location.longitude}}, </span>
                <span v-if="listData._source.location != null" @click="getDetail(listData._source.ip)">{{listData._source.location.latitude}}</span>
              </li>
            </ul>
          </div>
          <hr class="line" />
          <table>
            <tbody>
              <tr>
                <td class="resList_td_bottom ipTitle">{{ $t('messages.advSearch.geographicalPosition') }}</td>
                <td class="resList_td_bottom">
               <span v-if="listData._source.location != null"><img v-bind:src="['../../static/img/flag/' + listData._source.location.country + '.png']" height="40px;" width="60px"></span>
              </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <el-pagination
        v-if="totalPage"
        background
        layout="prev, pager, next"
        :total="totalPage"
        :page-size="20"
        :pager-count="5"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage">
      </el-pagination>
    </div>
  </el-container>
</template>
<script type="text/javascript">
import echarts from 'echarts'
import api from '../../api/ipApi'
import { Loading } from 'element-ui'
export default {
  data() {
    return {
      id: Number(this.$route.query.id),
      // 搜索结果分析
      searchResults: [],
      portData: [],
      serviceData: [],
      nationalData: [],
      nationalDataMap: [],
      mapRes: [],
      myMap: {},
      option: {},
      // 搜索结果列表
      listDatas: [],
      searchTime: 0,
      portDatas: [],
      total: 0,
      totalPage: 0,
      vals: 0,
      loading: {},
      port: [],
      tags: [],
      country: '',
      firstSearch: [],
      secondSearch: [],
      currentPage: 1
    }
  },
  props: ['language'],
  watch: {
    language () {
      if (this.id === 1) {
        this.getData(this.port, this.tags, this.country, this.vals, this.$route.query.search)
      } else if (this.id === 2) {
        this.getData(this.port, this.tags, this.country, this.vals, this.$route.query.ip, this.$route.query.city, this.$route.query.province)
      }
    }
  },
  mounted() {
    this.currentPage = Number(this.$route.query.page) || 1
    if (this.$route.query.page === 1) {
      this.vals = 0
    } else {
      this.vals = (this.$route.query.page - 1) * 10
    }
    if (this.id === 1) {
      this.firstSearch[0] = this.$route.query.search || ''
      if (sessionStorage.secondSearch) {
        this.secondSearch = JSON.parse(sessionStorage.secondSearch)
      }
      if (sessionStorage.port) {
        this.port = JSON.parse(sessionStorage.port)
      }
      if (sessionStorage.tags) {
        this.tags = JSON.parse(sessionStorage.tags)
      }
      if (sessionStorage.country) {
        this.country = sessionStorage.country
      }
      this.getData(this.port, this.tags, this.country, this.vals, this.$route.query.search)
    }
    if (this.id === 2) {
      // firstSeach begin
      if (this.$route.query.ip) {
        this.firstSearch[this.firstSearch.length] = this.$route.query.ip
      }
      if (this.$route.query.tags !== '') {
        this.firstSearch[this.firstSearch.length] = this.$route.query.tags
      }
      if (this.$route.query.port !== '') {
        this.firstSearch[this.firstSearch.length] = this.$route.query.port
      }
      if (this.$route.query.country !== '') {
        this.firstSearch[this.firstSearch.length] = this.$route.query.country
      }
      if (this.$route.query.city) {
        this.firstSearch[this.firstSearch.length] = this.$route.query.city
      }
      if (this.$route.query.province) {
        this.firstSearch[this.firstSearch.length] = this.$route.query.province
      }
      // firstSeach end
      if (sessionStorage.secondSearch) {
        this.secondSearch = JSON.parse(sessionStorage.secondSearch)
      }
      if (sessionStorage.port) {
        this.port = JSON.parse(sessionStorage.port)
      } else {
        this.port[0] = this.$route.query.port
      }
      if (sessionStorage.tags) {
        this.tags = JSON.parse(sessionStorage.tags)
      } else {
        this.tags[0] = this.$route.query.tags
      }
      if (sessionStorage.country) {
        this.country = sessionStorage.country
      } else {
        this.country = this.$route.query.country
      }
      this.getData(this.port, this.tags, this.country, this.vals, '', this.$route.query.ip, this.$route.query.city, this.$route.query.province)
    }
  },
  methods: {
    // 获取数据
    getData(port, tags, country, from, search = null, ip = null, city = null, province = null) {
      this.loading = Loading.service()
      if (this.id === 1) {
        api.getChoice(port, tags, country, from, search).then(res => {
          this.loading = Loading.service().close()
          if (res.data.status === 0) {
            // token过期或无token
            this.$router.push({path: '/login'})
            document.cookie = 'token_virus=' + escape('')
          } else if (res.data.status === 301) {
            // 访问次数限制
            alert(this.$t('messages.login.incorrectErr'))
            this.back()
          } else if (res.status === 200) {
            this.total = res.data.hits.total
            if (this.total < 10000) {
              this.totalPage = res.data.hits.total
            } else {
              this.totalPage = 10000
            }
            // 搜索结果分析
            var searchResultArr = []
            if (res.data.aggregations) {
              searchResultArr.push({
                aggregations: res.data.aggregations
              })
              sessionStorage.setItem('searchResultArr', JSON.stringify(searchResultArr))
            }
            if (sessionStorage.searchResultArr) {
              this.searchResults = JSON.parse(sessionStorage.searchResultArr)
              // 端口分布
              this.portData = []
              for (var i = 0; i < this.searchResults[0].aggregations.ports.buckets.length; i++) {
                this.portData.push({item: this.searchResults[0].aggregations.ports.buckets[i].key + this.$t('messages.list.ports') + '：', num: this.searchResults[0].aggregations.ports.buckets[i].doc_count})
              }
              // 服务分布
              this.serviceData = []
              for (i = 0; i < this.searchResults[0].aggregations.services.buckets.length; i++) {
                this.serviceData.push({item: this.searchResults[0].aggregations.services.buckets[i].key + this.$t('messages.list.service') + '：', num: this.searchResults[0].aggregations.services.buckets[i].doc_count})
              }
              // 国家分布
              this.nationalDataMap = []
              this.nationalData = []
              for (i = 0; i < this.searchResults[0].aggregations.country.buckets.length; i++) {
                this.nationalDataMap.push({item: this.searchResults[0].aggregations.country.buckets[i].key, num: this.searchResults[0].aggregations.country.buckets[i].doc_count})
                this.nationalData.push({item: this.searchResults[0].aggregations.country.buckets[i].key, num: this.searchResults[0].aggregations.country.buckets[i].doc_count})
              }
              // 全部结果分布 地图
              this.mapRes = []
              for (i = 0; i < this.nationalDataMap.length; i++) {
                this.mapRes.push({
                  name: this.nationalDataMap[i].item,
                  value: this.nationalDataMap[i].num
                })
              }
              this.myMap = echarts.init(document.getElementById("map"))
              this.option = {
                visualMap: {
                  show: false,
                  min: 0,
                  max: this.total,
                  realtime: false,
                  inRange: {
                    color: ['lightskyblue', 'yellow', 'orangered']
                  }
                },
                series: [
                  {
                    type: 'map',
                    map: 'world',
                    // 缩放
                    roam: false,
                    scaleLimit: {
                      min: 1,
                      max: 5
                    },
                    left: 5,
                    right: 5,
                    top: 5,
                    bottom: 5,
                    data: this.mapRes
                  }
                ]
              }
              this.myMap.setOption(this.option, true);
              this.drawMap()
            }
            // 搜索结果列表
            this.listDatas = res.data.hits.hits
            this.searchTime = res.data.took / 1000
            api.getPorts().then((res) => {
              this.portDatas = res.data.ports
            })
          }
        })
      } else if (this.id === 2) {
        api.getChoice(port, tags, country, from, ip, city, province).then(res => {
          this.loading = Loading.service().close()
          if (res.data.status === 0) {
            this.$router.push({path: '/login'})
            document.cookie = 'token_virus=' + escape('')
          } else if (res.data.status === 301) {
            alert(this.$t('messages.login.incorrectErr'))
            this.back()
          } else if (res.status === 200) {
            this.total = res.data.hits.total
            if (this.total < 10000) {
              this.totalPage = res.data.hits.total
            } else {
              this.totalPage = 10000
            }
            // 搜索结果分析
            var searchResultArr = []
            if (res.data.aggregations) {
              searchResultArr.push({
                aggregations: res.data.aggregations
              })
              sessionStorage.setItem('searchResultArr', JSON.stringify(searchResultArr))
            }
            if (sessionStorage.searchResultArr) {
              this.searchResults = JSON.parse(sessionStorage.searchResultArr)
              // 端口分布
              this.portData = []
              for (var i = 0; i < this.searchResults[0].aggregations.ports.buckets.length; i++) {
                this.portData.push({item: this.searchResults[0].aggregations.ports.buckets[i].key + this.$t('messages.list.ports') + '：', num: this.searchResults[0].aggregations.ports.buckets[i].doc_count})
              }
              // 服务分布
              this.serviceData = []
              for (i = 0; i < this.searchResults[0].aggregations.services.buckets.length; i++) {
                this.serviceData.push({item: this.searchResults[0].aggregations.services.buckets[i].key + this.$t('messages.list.service') + '：', num: this.searchResults[0].aggregations.services.buckets[i].doc_count})
              }
              // 国家分布
              this.nationalDataMap = []
              this.nationalData = []
              for (i = 0; i < this.searchResults[0].aggregations.country.buckets.length; i++) {
                this.nationalDataMap.push({item: this.searchResults[0].aggregations.country.buckets[i].key, num: this.searchResults[0].aggregations.country.buckets[i].doc_count})
                this.nationalData.push({item: this.searchResults[0].aggregations.country.buckets[i].key, num: this.searchResults[0].aggregations.country.buckets[i].doc_count})
              }
              // 全部结果分布 地图
              this.mapRes = []
              for (i = 0; i < this.nationalDataMap.length; i++) {
                this.mapRes.push({
                  name: this.nationalDataMap[i].item,
                  value: this.nationalDataMap[i].num
                })
              }
              this.myMap = echarts.init(document.getElementById("map"))
              this.option = {
                visualMap: {
                  show: false,
                  min: 0,
                  max: this.total,
                  realtime: false,
                  inRange: {
                    color: ['lightskyblue', 'yellow', 'orangered']
                  }
                },
                series: [
                  {
                    type: 'map',
                    map: 'world',
                    // 缩放
                    roam: false,
                    scaleLimit: {
                      min: 1,
                      max: 5
                    },
                    left: 5,
                    right: 5,
                    top: 5,
                    bottom: 5,
                    data: this.mapRes
                  }
                ]
              }
              this.myMap.setOption(this.option, true)
              this.drawMap()
            }
            // 搜索结果列表
            this.listDatas = res.data.hits.hits
            this.searchTime = res.data.took / 1000
            api.getPorts().then((res) => {
              this.portDatas = res.data.ports
            })
          }
        })
      }
    },
    handleClose(value) {
      this.pageToFirst()
      this.secondSearch.splice(this.secondSearch.indexOf(value), 1)
      if (this.port.indexOf(value) > -1) {
        this.port.splice(this.port.indexOf(value), 1)
      }
      if (this.tags.indexOf(value) > -1) {
        this.tags.splice(this.tags.indexOf(value), 1)
      }
      if (this.country === value) {
        this.country = ''
        sessionStorage.removeItem('country')
      }
      sessionStorage.setItem('secondSearch', JSON.stringify(this.secondSearch))
      sessionStorage.setItem('tags', JSON.stringify(this.tags))
      sessionStorage.setItem('port', JSON.stringify(this.port))
      sessionStorage.setItem('country', this.country)
      if (this.id === 1) {
        this.getData(this.port, this.tags, this.country, 0, this.$route.query.search)
      } else if (this.id === 2) {
        this.getData(this.port, this.tags, this.country, this.vals, this.$route.query.ip, this.$route.query.city, this.$route.query.province)
      }
    },
    isInArray(arr, value) {
      for (var i = 0; i < arr.length; i++) {
        if (value === arr[i]) {
          return false
        }
      }
      return true
    },
    pageToFirst () {
      let query = JSON.parse(JSON.stringify(this.$route.query))
      this.currentPage = query.page = 1
      this.vals = 0
      this.$router.push({path: '/list', query: query})
    },
    choice_port(row) {
      this.pageToFirst()
      let choice = ''
      if (this.language === 'zh') {
        choice = row.item.substring(0, row.item.length - 3)
      } else if (this.language === 'en') {
        choice = row.item.split('P')[0]
      }
      if (this.id === 1) {
        if (this.isInArray(this.secondSearch, choice) && this.$route.query.search !== choice) {
          this.port[this.port.length] = choice
          this.secondSearch[this.secondSearch.length] = choice
          sessionStorage.setItem('port', JSON.stringify(this.port))
          sessionStorage.setItem('secondSearch', JSON.stringify(this.secondSearch))
          this.getData(this.port, this.tags, this.country, 0, this.$route.query.search)
        }
      } else if (this.id === 2) {
        if (this.isInArray(this.secondSearch, choice) && this.$route.query.port !== choice) {
          this.port[this.port.length] = choice;
          this.secondSearch[this.secondSearch.length] = choice;
          sessionStorage.setItem('port', JSON.stringify(this.port))
          sessionStorage.setItem('secondSearch', JSON.stringify(this.secondSearch))
          this.getData(this.port, this.tags, this.country, this.vals, this.$route.query.ip, this.$route.query.city, this.$route.query.province)
        }
      }
    },
    choice_tags(row) {
      this.pageToFirst()
      var choice = ''
      if (this.language === 'zh') {
        choice = row.item.substring(0, row.item.length - 3);
      } else if (this.language === 'en') {
        choice = row.item.split('S')[0]
      }
      if (this.id === 1) {
        if (this.isInArray(this.secondSearch, choice) && this.$route.query.search !== choice) {
          this.tags[this.tags.length] = choice;
          this.secondSearch[this.secondSearch.length] = choice;
          sessionStorage.setItem('tags', JSON.stringify(this.tags))
          sessionStorage.setItem('secondSearch', JSON.stringify(this.secondSearch))
          this.getData(this.port, this.tags, this.country, 0, this.$route.query.search)
        }
      } else if (this.id === 2) {
        if (this.isInArray(this.secondSearch, choice) && this.$route.query.tags !== choice) {
          this.tags[this.tags.length] = choice;
          this.secondSearch[this.secondSearch.length] = choice;
          sessionStorage.setItem('tags', JSON.stringify(this.tags))
          sessionStorage.setItem('secondSearch', JSON.stringify(this.secondSearch))
          this.getData(this.port, this.tags, this.country, this.vals, this.$route.query.ip, this.$route.query.city, this.$route.query.province)
        }
      }
    },
    choice_country(row) {
      this.pageToFirst()
      var choice = row.item
      if (this.id === 1) {
        if (this.isInArray(this.secondSearch, choice) && this.$route.query.search !== choice) {
          this.country = choice;
          this.secondSearch[this.secondSearch.length] = choice;
          sessionStorage.setItem('country', this.country)
          sessionStorage.setItem('secondSearch', JSON.stringify(this.secondSearch))
          this.getData(this.port, this.tags, this.country, 0, this.$route.query.search)
        }
      } else if (this.id === 2) {
        if (this.isInArray(this.secondSearch, choice) && this.$route.query.search !== choice) {
          this.country = choice;
          this.secondSearch[this.secondSearch.length] = choice;
          sessionStorage.setItem('country', this.country)
          sessionStorage.setItem('secondSearch', JSON.stringify(this.secondSearch))
          this.getData(this.port, this.tags, this.country, this.vals, this.$route.query.ip, this.$route.query.city, this.$route.query.province)
        }
      }
    },
    back() {
      if (this.id === 1) {
        this.$router.push({path: '/search'})
      } else if (this.id === 2) {
        this.$router.push({path: '/advSearch'})
      }
    },
    drawMap() {
      window.addEventListener('resize', function() {
        this.myMap.resize()
      }.bind(this))
    },
    getDetail(ip) {
      if (ip.length > 0) {
        sessionStorage.setItem('port', JSON.stringify(this.port))
        sessionStorage.setItem('tags', JSON.stringify(this.tags))
        sessionStorage.setItem('secondSearch', JSON.stringify(this.secondSearch))
        sessionStorage.setItem('country', this.country)
        this.$router.push({name: 'ipDetail', query: {ip: ip}})
      }
    },
    getPort(key) {
      for (var item in this.portDatas) {
        if (this.portDatas[item].hasOwnProperty(key)) {
          return this.portDatas[item][key]
        }
      }
    },
    // 当前页码
    handleCurrentChange(val) {
      this.currentPage = Number(val)
      var urlData = api.getUrlByName()
      if (val === 1) {
        this.vals = 0
      } else {
        this.vals = (val - 1) * 10
      }
      if (this.id === 1) {
        this.getData(this.port, this.tags, this.country, this.vals, urlData.search)
        location.href = location.href.split('?')[0] + '?id=' + urlData.id + '&search=' + urlData.search + '&page=' + String(val)
      }
      if (this.id === 2) {
        this.getData(this.port, this.tags, this.country, this.vals, urlData.ip, urlData.city, urlData.province)
        location.href = location.href.split('?')[0] + '?id=' + urlData.id + '&ip=' + urlData.ip + '&tags=' + urlData.tags + '&port=' + urlData.port + '&country=' + urlData.country + '&city=' + urlData.city + '&province=' + urlData.province + '&page=' + String(val)
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.path !== '/dashboard') {
      this.loading = Loading.service().close()
    }
    if (to.path !== '/detail') {
      sessionStorage.removeItem('port')
      sessionStorage.removeItem('tags')
      sessionStorage.removeItem('country')
      sessionStorage.removeItem('secondSearch')
    }
    next()
  },
  destroyed () {
    if (this.mapRes.length) {
      this.myMap.clear()
    }
  }
}
</script>