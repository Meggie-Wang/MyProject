<style scoped>
  .advanced_search {  
    width: 80%;
    margin: 5% auto;
  }
  .advSearch_img {
    width: 40%;
    margin: 0 auto;
    border-radius: 20px;
    overflow: hidden;
  }
  img {
    width: 100%;
  }
  .sub_body {
    position: relative;
    left: calc(30% - 100px);
    margin-top: 5%;
  }
  .div_body {
    display: flex;
    align-items: center;
    padding: 1% 0;
  }
  .sub_body_left {
    width: 100px;
    font-weight: 500;
    color: #1C927A;
    user-select: none;
  }  
  .sub_body_center {
    display: flex;
    justify-content: space-between;
    width: 40%;
  }
  .el-select {
    margin-right: 1%;
  }
  .el-select:last-of-type {
    margin-right: 0;
  }
  .tip {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 5px;
    color: red;
    font-size: 12px;
  }
  .search_btn .btn {
    display: block;
    width: 25%;
    margin: 3% auto;
    background: #1E9379;
    color: #fff;
    font-size: 16px;
  }
  .el-select-dropdown__item:hover,
  .el-select-dropdown__item.selected {
    background: #169275;
    color: #fff;
  }
  .el-select-dropdown__item:hover span,
  .el-select-dropdown__item.selected span {
    font-weight: bold;
  }
</style>
<style>
  .advanced_search .el-input__suffix {
    right: 0;
    width: 35px;
    background: #1C927A;
    border-radius: 5px;
  }
  input::-webkit-input-placeholder {
    color: #1C927A !important;
  }
  input::-moz-placeholder {
    color: #1C927A !important;
    opacity: 1;
  }
  .advanced_search .el-input__inner {
    color: #1C927A;
    border: 1px solid #1C927A;
  }
  .advanced_search .el-input__inner:hover,
  .advanced_search .el-input--suffix.is-focus .el-input__inner {
    border-color: #1C927A;
  }
  .advanced_search .el-select__caret {
    background: url('../../../static/img/icon.png') 2px 5px no-repeat;
  }
  .advanced_search .el-select__caret:before, .advanced_search .el-select__caret:after {
    display: none;
  }
</style>
<template>
  <div class="advanced_search">
    <div class="sub">
      <div class="advSearch_img">
        <img src="../../../static/img/search_bg.png">
      </div>
      <div class="sub_body">
        <!-- IP地址 begin -->
        <div class="div_body">
          <div class="sub_body_left">{{ $t('messages.advSearch.IPAddress') }}</div>
          <div class="sub_body_center">
           <el-input v-model="ipValue" :placeholder="$t('messages.advSearch.inputBox')" @keyup.enter.native="ipSearch"></el-input>
          </div>
        </div>
        <!-- IP地址 end -->
        
        <!-- 服务类型 begin -->
        <div class="div_body">
          <div class="sub_body_left" >{{ $t('messages.advSearch.serviceType') }}</div>
          <div class="sub_body_center">
            <el-select v-model="typeValue" :placeholder="$t('messages.advSearch.allTypes')" style="width: 100%">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </div>
        </div>
        <!-- 服务类型 end -->

        <!-- 端口号 begin -->
        <div class="div_body">
          <div class="sub_body_left" >{{ $t('messages.advSearch.portNumber') }}</div>
          <div class="sub_body_center">
            <el-select v-model="portValue" :placeholder="$t('messages.advSearch.allPorts')" style="width: 100%">
              <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </div>
        </div>
        <!-- 端口号 end -->
        <div>
          <!-- 地理位置 begin -->
          <div class="div_body">
            <div class="sub_body_left" >{{ $t('messages.advSearch.geographicalPosition') }}</div>
            <div class="sub_body_center">
              <el-select
                v-model="countryValue" 
                :placeholder="$t('messages.advSearch.country')"
                filterable
                clearable
                @change="getRegion">
                <el-option
                  v-for="item in countries"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name + ',' + item.id">
                </el-option>
              </el-select>
              <el-select
                v-model="regionValue"
                :placeholder="$t('messages.advSearch.provinceAndState')"
                filterable
                clearable
                @change="getCity">
                <el-option
                  v-for="item in regions"
                  :key="item.id"
                  :label="item.name_std"
                  :value="item.name_std + ',' + item.id">
                </el-option>
              </el-select>
              <el-select
                v-model="cityValue" 
                :placeholder="$t('messages.advSearch.city')"
                filterable
                clearable>
                <el-option
                  v-for="item in cities"
                  :key="item.id"
                  :label="item.name_std"
                  :value="item.name_std">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <!-- 地理位置 end -->
      </div>
    </div>
    <div class="tip"></div>
    <div class="search_btn">
      <el-button class="btn" @click="ipSearch">{{ $t('messages.advSearch.search') }}</el-button>
    </div>
  </div>
</template>

<script>
  import api from '../../api/ipApi'
  export default {
    data () {
      return {
        options: [
          {
            value: this.$t('messages.advSearch.allTypes'),
            label: ''
          },
          {
            value: 'http',
            label: ''
          },
          {
            value: 'https',
            label: ''
          },
          {
            value: 'ssh',
            label: ''
          },
          {
            value: 'ftp',
            label: ''
          },
          {
            value: 's7',
            label: ''
          },
          {
            value: 'pop3',
            label: ''
          },
          {
            value: 'imap',
            label: ''
          },
          {
            value: 'upnp',
            label: ''
          },
          {
            value: 'fox',
            label: ''
          },
          {
            value: 'dnp3',
            label: ''
          },
          {
            value: 'telnet',
            label: ''
          },
          {
            value: 'smtp',
            label: ''
          },
          {
            value: 'smb',
            label: ''
          },
          {
            value: 'smtps',
            label: ''
          },
          {
            value: 'bacnet',
            label: ''
          },
          {
            value: 'modbus',
            label: ''
          },
          {
            value: 'dns',
            label: ''
          },
          {
            value: 'cwmp',
            label: ''
          },
          {
            value: 'imaps',
            label: ''
          },
          {
            value: 'pop3s',
            label: ''
          }
        ],
        options2: [
          {
            value: this.$t('messages.advSearch.allPorts'),
            label: ''
          },
          {
            value: '102',
            label: ''
          },
          {
            value: '110',
            label: ''
          },
          {
            value: '143',
            label: ''
          },
          {
            value: '1900',
            label: ''
          },
          {
            value: '20000',
            label: ''
          },
          {
            value: '21',
            label: ''
          },
          {
            value: '22',
            label: ''
          },
          {
            value: '23',
            label: ''
          },
          {
            value: '25',
            label: ''
          },
          {
            value: '443',
            label: ''
          },
          {
            value: '445',
            label: ''
          },
          {
            value: '465',
            label: ''
          },
          {
            value: '502',
            label: ''
          },
          {
            value: '53',
            label: ''
          },
          {
            value: '7547',
            label: ''
          },
          {
            value: '80',
            label: ''
          },
          {
            value: '993',
            label: ''
          },
          {
            value: '995',
            label: ''
          }
        ],
        ipValue: '',
        typeValue: '',
        portValue: '',
        countryValue: '',
        regionValue: '',
        cityValue: '',
        countries: {},
        regions: {},
        cities: {}
      }
    },
    props: ['language'],
    watch: {
      language (res) {
        this._data.options[0].label = this.$t('messages.advSearch.allTypes')
        this._data.options2[0].label = this.$t('messages.advSearch.allPorts')
      }
    },
    methods: {
      isValidIP(ip) {
        var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
        return reg.test(ip)
      },
      ipSearch: function() {
        if (this.$options.methods.isValidIP(this.ipValue) || this.ipValue === '') {
          var country = this.countryValue.split(',')[0]
          var city = this.cityValue.split(',')[0]
          var province = this.regionValue.split(',')[0]
          if (this.ipValue !== '' || this.typeValue !== '' || this.portValue !== '' || country !== '' || city !== '' || province !== '') {
            this.$router.push({
              name: 'iplist',
              query: {
                id: 2,
                ip: this.ipValue,
                tags: this.typeValue,
                port: this.portValue,
                country: country,
                city: city,
                province: province,
                page: 1
              }
            })
          } else {
            $('.tip')
              .show()
              .text(this.$t('messages.search.searchTip'))
            $(document).mouseup(function(e) {
              $('.tip').hide()
            })
          }
        } else {
          $('.tip')
            .show()
            .text(this.$t('messages.advSearch.tip'))
          $('.el-input__inner:first').css('border-color', 'red')
          $(document).mouseup(function(e) {
            $('.el-input__inner:first').css('border-color', '#1C927A');
            $('.tip').hide()
          })
        }
        return
      },
      getRegion() {
        this.regions = {}
        this.regionValue = ''
        this.cities = {}
        this.cityValue = ''
        if (this.countryValue.split(',')[1]) {
          api.getCountry('regionlist/', {
            id: this.countryValue.split(',')[1]
          }).then(res => {
            this.regions = res.data
          })
        }
      },
      getCity() {
        this.cities = null
        this.cityValue = ''
        if (this.regionValue.split(',')[1]) {
          api.getCountry('citylist/', {
            id: this.regionValue.split(',')[1]
          }).then(res => {
            this.cities = res.data
          })
        }
      }
    },
    mounted () {
      // 加载国家
      api.getCountry('countrylist/').then((res) => {
        this.countries = res.data
      })
    }
  }
</script>