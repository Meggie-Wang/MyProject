<style scoped>
  .detail_list {
    width: 80%;
    margin: 1% auto;
    border: 1px solid #0E6955;
    border-radius: 5px;
    padding: 1%;
  }
  .detail_list > div {
    margin-top: 2%;
  }
  .detail_title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .detail_title i {
    width: 40px;
    height: 30px;
    background: url(../../../static/img/icon.png) -250px 0 no-repeat;
    cursor: pointer;
  }
  .line {
    height: 1px;
    margin: 5px 0 10px;
    background: #0E6955;
  }
  .detail_body > div {
    margin-bottom: 1%;
  }
  .basicInfor {
    display: flex;
    padding: 1% 2%;
  }
  .basicInfor ul {
    width: 50%;
  }
  .basicInfor ul li {
    line-height: 35px;
  }
  .geoInfor ul {
    display: flex;
    flex-wrap: wrap;
    padding: 1% 2%;
  }
  .geoInfor ul li {
    width: 50%;
    line-height: 35px;
  }
  .bm-view {
    width: 100%;
    height: 400px;
  }
  pre { 
    white-space: pre-wrap; /*css-3*/ 
    white-space: -moz-pre-wrap; /*Mozilla,since1999*/ 
    white-space: -pre-wrap; /*Opera4-6*/ 
    white-space: -o-pre-wrap; /*Opera7*/ 
    word-wrap: break-word; /*InternetExplorer5.5+*/ 
  } 
  .json {
    border: 2px solid #0E6955;
    border-radius: 5px;
    padding: 1%;
  }
</style>
<template>
  <div class="detail_container">
    <div class="detail_list">
      <div>
        <div class="detail_title">
          <h3 style="color:#0E6955;font-weight: 700;">{{detailInfo.ip}}</h3>
          <i @click="back"></i>
        </div>
        <div class="line"></div>
        <div class="detail_body" v-if="detailInfo">
          <div>
            <h3>{{ $t('messages.detail.essentialInfo') }}</h3>
            <div class="basicInfor">
              <ul>
                <li>
                  {{ $t('messages.advSearch.IPAddress') }}：
                  <span>{{detailInfo.ip}}</span>
                </li>
                <li>
                  {{ $t('messages.list.organization') }}：
                  <span>{{detailInfo.autonomous_system.organization}}</span>
                </li>
                <li style="display: flex;flex-wrap: nowrap;">
                  <span style="white-space: nowrap;">{{ $t('messages.list.portAndService') }}：</span>
                  <div>
                    <el-button size="medium" v-for="ptag in detailInfo.ptags" style="margin: 0px 5px 5px 0">{{ ptag }}/{{ getPort(ptag) }}</el-button>
                  </div>
                </li>
              </ul>
              <ul>
                <li>
                  {{ $t('messages.list.operatingSystem') }}：
                  <span>{{detailInfo.metadata.os}}</span>
                </li>
                <li>
                  {{ $t('messages.list.equipmentType') }}：
                  <span>{{detailInfo.metadata.device_type}}</span>
                </li>
                <li>
                  {{ $t('messages.list.homemadeSystemName') }}：
                  <span>{{detailInfo.autonomous_system.name.replace(',', '')}}</span>
                </li>
                <li>
                  {{ $t('messages.list.homemadeSystemNum') }}：
                  <span>{{detailInfo.autonomous_system.routed_prefix}}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="geoInfor">
            <h3>{{ $t('messages.list.geographicInfo') }}</h3>
            <ul>
              <li>
                {{ $t('messages.advSearch.country') }}：
                <span v-if="detailInfo.location != null">{{detailInfo.location.country}}</span>
              </li>
              <li>
                {{ $t('messages.advSearch.provinceAndState') }}：
                <span v-if="detailInfo.location != null">{{detailInfo.location.province}}</span>
              </li>
              <li>
                {{ $t('messages.advSearch.city') }}：
                <span v-if="detailInfo.location != null">{{detailInfo.location.city}}</span>
              </li>
              <li>
                {{ $t('messages.list.coordinate') }}：
                <span v-if="detailInfo.location != null">{{detailInfo.location.longitude}},{{detailInfo.location.latitude}}</span>
              </li>
            </ul >
          </div>
          <baidu-map class="bm-view" :center="center" :zoom="zoom" @ready="handler">
            <bm-marker :position="center " :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
            </bm-marker>
          </baidu-map>
        </div>
      </div>
      <div v-for="tag in detailInfo.tags">
        <!-- <h3>{{ getPort(tag) }}/{{ tag }}{{ $t('messages.detail.fingerprintData') }}</h3> -->
        <h3>{{ getPortData(tag) }}/{{ tag }}{{ $t('messages.detail.fingerprintData') }}</h3>
        <div class="line"></div>
        <div v-for="detailData in detailInfo" class="json" v-if="detailData[tag] != null">
          <pre>{{detailData[tag]}}</pre> 
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from '../../api/ipApi'
import { Loading } from 'element-ui'
export default {
  data() {
    return {
      ip: '',
      detailInfo: '',
      longitude: '',
      latitude: '',
      center: {lng: 0, lat: 0},
      zoom: 3,
      loading: {}
    }
  },
  mounted() {
    this.ip = this.$route.query.ip
    this.loading = Loading.service()
    api.getIpDetail(this.ip).then(res => {
      if (res.data.status === 0) {
        this.$router.push({path: '/login'})
        document.cookie = 'token_virus=' + escape('')
      } else if (res.data.status === 301) {
        alert(this.$t('messages.login.incorrectErr'))
        this.$router.push({path: '/search'})
      } else if (res.status === 200) {
        if (res.data.hits) {
          this.detailInfo = res.data.hits.hits[0]._source
          if (this.detailInfo.hasOwnProperty('metadata')) {
            if (this.detailInfo.metadata.hasOwnProperty('os')) {
            } else {
              Object.assign(this.detailInfo.metadata, {os: ''})
            }
            if (this.detailInfo.metadata.hasOwnProperty('device_type')) {
            } else {
              Object.assign(this.detailInfo.metadata, {device_type: ''})
            }
          } else {
            Object.assign(this.detailInfo, {metadata: ''})
          }
          // 地图
          this.longitude = this.detailInfo.location.longitude
          this.latitude = this.detailInfo.location.latitude
        }
      }
      this.loading = Loading.service().close()
    })
    api.getPorts().then((res) => {
      this.portDatas = res.data.ports
    })
  },
  methods: {
    handler ({BMap, map}) {
      this.center.lng = this.longitude
      this.center.lat = this.latitude
      this.zoom = 15
    },
    getPort(key) {
      for (var item in this.portDatas) {
        if (this.portDatas[item].hasOwnProperty(key)) {
          return this.portDatas[item][key]
        }
      }
    },
    getPortData (key) {
      for (var item in this.portDatas) {
        for (var val in this.portDatas[item]) {
          if (this.portDatas[item][val] === key) {
            return val
          }
        }
      }
    },
    back () {
      this.$router.go(-1)
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.path !== '/dashboard') {
      this.loading = Loading.service().close()
    }
    next()
  }
}
</script>