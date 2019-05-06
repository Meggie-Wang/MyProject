<template>
  <div class="pointChart">
    <Vechart
      className="point"
      :options="option"
      :winResize="winResize"
      @chart="chartExample" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
var nameMap = {
  'Afghanistan': '阿富汗',
  'Angola': '安哥拉',
  'Albania': '阿尔巴尼亚',
  'United Arab Emirates': '阿联酋',
  'Argentina': '阿根廷',
  'Armenia': '亚美尼亚',
  'Fr. S. Antarctic Lands': '法属南半球和南极领地',
  'Australia': '澳大利亚',
  'Austria': '奥地利',
  'Azerbaijan': '阿塞拜疆',
  'Burundi': '布隆迪',
  'Belgium': '比利时',
  'Benin': '贝宁',
  'Burkina Faso': '布基纳法索',
  'Bangladesh': '孟加拉国',
  'Bulgaria': '保加利亚',
  'Bahamas': '巴哈马',
  'Bosnia and Herz.': '波斯尼亚和黑塞哥维那',
  'Belarus': '白俄罗斯',
  'Belize': '伯利兹',
  'Bermuda': '百慕大',
  'Bolivia': '玻利维亚',
  'Brazil': '巴西',
  'Brunei': '文莱',
  'Bhutan': '不丹',
  'Botswana': '博茨瓦纳',
  'Central African Rep.': '中非共和国',
  'Canada': '加拿大',
  'Switzerland': '瑞士',
  'Chile': '智利',
  'China': '中国',
  'Ivory Coast': '象牙海岸',
  'Cameroon': '喀麦隆',
  'Congo': '刚果民主共和国',
  'Dem. Rep. Korea': '北朝鲜',
  'Dem. Rep. Congo': '刚果共和国',
  'Colombia': '哥伦比亚',
  'Costa Rica': '哥斯达黎加',
  'Cuba': '古巴',
  'Northern Cyprus': '北塞浦路斯',
  'Cyprus': '塞浦路斯',
  'Czech Rep.': '捷克共和国',
  'Germany': '德国',
  'Djibouti': '吉布提',
  'Denmark': '丹麦',
  'Dominican Rep.': '多明尼加共和国',
  'Algeria': '阿尔及利亚',
  'Ecuador': '厄瓜多尔',
  'Egypt': '埃及',
  'Eritrea': '厄立特里亚',
  'Spain': '西班牙',
  'Estonia': '爱沙尼亚',
  'Ethiopia': '埃塞俄比亚',
  'Finland': '芬兰',
  'Fiji': '斐',
  'Falkland Is.': '福克兰群岛',
  'France': '法国',
  'Gabon': '加蓬',
  'United Kingdom': '英国',
  'Georgia': '格鲁吉亚',
  'Ghana': '加纳',
  'Guinea': '几内亚',
  'Gambia': '冈比亚',
  'Guinea-Bissau': '几内亚比绍',
  'Eq. Guinea': '赤道几内亚',
  'Greece': '希腊',
  'Greenland': '格陵兰',
  'Guatemala': '危地马拉',
  'French Guiana': '法属圭亚那',
  'Guyana': '圭亚那',
  'Honduras': '洪都拉斯',
  'Heard I. and McDonald Is.': '赫德岛和麦克唐纳群岛',
  'Croatia': '克罗地亚',
  'Haiti': '海地',
  'Hungary': '匈牙利',
  'Indonesia': '印尼',
  'India': '印度',
  'Ireland': '爱尔兰',
  'Iran': '伊朗',
  'Iraq': '伊拉克',
  'Iceland': '冰岛',
  'Israel': '以色列',
  'Italy': '意大利',
  'Jamaica': '牙买加',
  'Jordan': '约旦',
  'Japan': '日本',
  'Kazakhstan': '哈萨克斯坦',
  'Kenya': '肯尼亚',
  'Kyrgyzstan': '吉尔吉斯斯坦',
  'Cambodia': '柬埔寨',
  'Korea': '韩国',
  'Kosovo': '科索沃',
  'Kuwait': '科威特',
  'Lao PDR': '老挝',
  'Lebanon': '黎巴嫩',
  'Liberia': '利比里亚',
  'Libya': '利比亚',
  'Sri Lanka': '斯里兰卡',
  'Lesotho': '莱索托',
  'Lithuania': '立陶宛',
  'Luxembourg': '卢森堡',
  'Latvia': '拉脱维亚',
  'Morocco': '摩洛哥',
  'Moldova': '摩尔多瓦',
  'Madagascar': '马达加斯加',
  'Mexico': '墨西哥',
  'Macedonia': '马其顿',
  'Mali': '马里',
  'Myanmar': '缅甸',
  'Montenegro': '黑山',
  'Mongolia': '蒙古',
  'Mozambique': '莫桑比克',
  'Mauritania': '毛里塔尼亚',
  'Malawi': '马拉维',
  'Malaysia': '马来西亚',
  'Namibia': '纳米比亚',
  'New Caledonia': '新喀里多尼亚',
  'Niger': '尼日尔',
  'Nigeria': '尼日利亚',
  'Nicaragua': '尼加拉瓜',
  'Netherlands': '荷兰',
  'Norway': '挪威',
  'Nepal': '尼泊尔',
  'New Zealand': '新西兰',
  'Oman': '阿曼',
  'Pakistan': '巴基斯坦',
  'Panama': '巴拿马',
  'Peru': '秘鲁',
  'Philippines': '菲律宾',
  'Papua New Guinea': '巴布亚新几内亚',
  'Poland': '波兰',
  'Puerto Rico': '波多黎各',
  'Portugal': '葡萄牙',
  'Paraguay': '巴拉圭',
  'Qatar': '卡塔尔',
  'Romania': '罗马尼亚',
  'Russia': '俄罗斯',
  'Rwanda': '卢旺达',
  'W. Sahara': '西撒哈拉',
  'Saudi Arabia': '沙特阿拉伯',
  'Sudan': '苏丹',
  'S. Sudan': '南苏丹',
  'Senegal': '塞内加尔',
  'Solomon Is.': '所罗门群岛',
  'Sierra Leone': '塞拉利昂',
  'Samoa': '萨摩亚群岛',
  'El Salvador': '萨尔瓦多',
  'Somaliland': '索马里兰',
  'Somalia': '索马里',
  'Serbia': '塞尔维亚共和国',
  'Suriname': '苏里南',
  'Slovakia': '斯洛伐克',
  'Slovenia': '斯洛文尼亚',
  'Sweden': '瑞典',
  'Swaziland': '斯威士兰',
  'Syria': '叙利亚',
  'Chad': '乍得',
  'Togo': '多哥',
  'Thailand': '泰国',
  'Tajikistan': '塔吉克斯坦',
  'Turkmenistan': '土库曼斯坦',
  'East Timor': '东帝汶',
  'Trinidad and Tobago': '特里尼达和多巴哥',
  'Tunisia': '突尼斯',
  'Turkey': '土耳其',
  'Tanzania': '坦桑尼亚联合共和国',
  'Uganda': '乌干达',
  'Ukraine': '乌克兰',
  'Uruguay': '乌拉圭',
  'United States': '美国',
  'Uzbekistan': '乌兹别克斯坦',
  'Venezuela': '委内瑞拉',
  'Vietnam': '越南',
  'Vanuatu': '瓦努阿图',
  'West Bank': '西岸',
  'Yemen': '也门',
  'South Africa': '南非',
  'Zambia': '赞比亚',
  'Zimbabwe': '津巴布韦',
  'Andorra': '安道尔共和国',
  'Antigua and Barbuda': '安提瓜和巴布达',
  'Aruba': '阿鲁巴',
  'Bahrain': '巴林',
  'Barbados': '巴巴多斯',
  'Bosnia and Herzegovina': '波黑',
  'Cayman Islands': '开曼群岛',
  'Congo, The Democratic Republic of the': '刚果（金）',
  'Cote D"Ivoire': '科特迪瓦',
  'Czech Republic': '捷克',
  'Dominican Republic': '多米尼加共和国',
  'Europe': '欧洲联盟',
  'Faroe Islands': '法罗群岛',
  'French Polynesia': '法属玻利尼西亚',
  'Gibraltar': '直布罗陀',
  'Guam': '关岛',
  'Hong Kong': '香港',
  'Jersey': '泽西岛',
  'Liechtenstein': '列支敦士登',
  'Macau': '澳门',
  'Maldives': '马尔代夫',
  'Malta': '马耳他',
  'Mauritius': '毛里求斯',
  'Monaco': '摩纳哥',
  'Netherlands Antilles': '库拉索岛',
  'Palestinian Territory': '巴勒斯坦',
  'Reunion': '留尼旺',
  'Saint Kitts and Nevis': '圣基茨和尼维斯',
  'San Marino': '圣马力诺',
  'Singapore': '新加坡',
  'Taiwan': '台湾省',
  'Tanzania, United Republic of': '坦桑尼亚',
  'Virgin Islands, British': '英属维尔京群岛',
  'Virgin Islands, U.S.': '美属维尔京群岛',
  'S. Geo. and S. Sandw. Is.': '南乔治亚岛和南桑威奇群岛'
}
export default {
  name: 'point',
  data () {
    return {
      geoCoordMap: {},
      countryData: {},
      myChart: {},
      option: {},
      country: '',
      symbolSize: 4,
      activeCountryIndex: ''
    }
  },
  computed: {
    ...mapGetters(['activeCountry'])
  },
  props: ['winResize', 'myChartData'],
  watch: {
    activeCountry (val) {
      this.country = val
      this.chartOption()
    },
    myChartData (val) {
      this.geoCoordMap = val.geo_data
      this.countryData = val.country_data
      for (let i in this.countryData) {
        this.countryData[i].itemStyle = {
          normal: {
            shadowBlur: 15,
            shadowColor: '#333'
          }
        }
      }
      this.chartOption()
    }
  },
  methods: {
    chartExample (chart) {
      let that = this
      this.myChart = chart
      if (this.country) {
        this.myChart.dispatchAction({
          type: 'hideTip'
        })
        this.myChart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: that.activeCountryIndex
        })
      } else {
        this.myChart.dispatchAction({
          type: 'hideTip'
        })
      }
    },
    chartOption () {
      let that = this
      if (Array.isArray(this.countryData)) {
        let map = {
          type: 'map',
          mapType: 'world',
          zoom: 1.2,
          showEffectOn: 'render',
          itemStyle: {
            normal: {
              areaColor: '#c2d3fc'
            }
          },
          data: that.countryData
        }

        let opArr = that.convertData(that.countryData.sort(function (a, b) {
          return b.value - a.value
        }))
        opArr.unshift(map)

        that.option = {
          tooltip: {
            trigger: 'item',
            position: function (point, params, dom, rect, size) {
              return [point[0] + 10, point[1] + 10]
            },
            formatter: function (params) {
              if (!params.name) {
                return '印巴争议区' + ' : ' + (params.value ? (params.value[2] ? params.value[2] : params.value) : 0)
              }
              return (nameMap[params.name] ? nameMap[params.name] : params.name) + '(' + params.name + ')' + ' : ' + (params.value ? (params.value[2] ? params.value[2] : params.value) : 0)
            }
          },
          visualMap: {
            show: false,
            inRange: {
              color: ['#52a2e2', '#2ebdf0']
            }
          },
          geo: {
            map: 'world',
            zoom: 1.2
          },
          series: opArr
        }
      }
    },
    // 获取bubbledata
    convertData (data) {
      let that = this
      // 散点图数据
      let opArr = []
      // 两层散点的数据
      let resAll1 = []
      let resAll2 = []
      // 散点对象函数
      let op = (d, l) => {
        return {
          type: 'effectScatter',
          coordinateSystem: 'geo',
          data: d,
          symbolSize: function (val) {
            return val[3]
          },
          rippleEffect: {
            scale: 2
          },
          showEffectOn: 'render',
          itemStyle: {
            normal: {
              color: '#d34c5c',
              shadowBlur: 10,
              shadowColor: '#111'
            }
          },
          zlevel: l
        }
      }
      // 处理
      for (var i = 0; i < data.length; i++) {
        var geoCoord = this.geoCoordMap[data[i].name]
        if (geoCoord) {
          if (that.country === data[i].name) {
            // 记录显示国家的index
            that.activeCountryIndex = i
            resAll2.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value).concat(30),
              visualMap: false
            })
          } else {
            resAll1.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value).concat(10),
              visualMap: false
            })
          }
        }
      }
      opArr = [op(resAll1, 1), op(resAll2, 5)]
      return opArr
    }
  }
}
</script>
<style scoped>
  .pointChart {
    width: 60%;
    height: 100%;
  }
  .main {
    width: 90%;
    height: 90%;
    margin: 0 auto;
  }
</style>
