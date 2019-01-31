import api from '../api/api.js'

export const mainDataAct = ({commit}) => {
  let broadcastData = []
  let mapData = []
  let honeypotFixed = [
    {attackName: 'IND_Mumbai', attackGeo: [72.83, 18.98], attackVal: 9},
    {attackName: 'USA_Western', attackGeo: [-122.36, 37.53], attackVal: 9},
    {attackName: 'ARE_Dubai', attackGeo: [55.30, 25.26], attackVal: 9},
    {attackName: 'GER_Frankfurt', attackGeo: [8.68, 50.12], attackVal: 9},
    {attackName: 'CHN_Shanghai', attackGeo: [120.16, 30.29], attackVal: 9},
    {attackName: 'AUS_Sydney', attackGeo: [144.95, -37.81], attackVal: 9}
  ]
  api.get('honeypotMain', {}).then(res => {
    if (res.status === 1) {
      let resData = res.res
      resData.forEach((i, j) => {
        /*
        * broadcast
        * mapdata
        */
        // start
        // dynamic honeypot
        let honeypotDy = {}
        // judge which honeypot
        let honeypotName = i.hp_name.split('_')[1] + '_' + i.hp_name.split('_')[2]
        if (honeypotName === 'IND_Mumbai') {
          honeypotDy = honeypotFixed[0]
        } else if (honeypotName === 'USA_Western') {
          honeypotDy = honeypotFixed[1]
        } else if (honeypotName === 'ARE_Dubai') {
          honeypotDy = honeypotFixed[2]
        } else if (honeypotName === 'GER_Frankfurt') {
          honeypotDy = honeypotFixed[3]
        } else if (honeypotName === 'CHN_Shanghai') {
          honeypotDy = honeypotFixed[4]
        } else if (honeypotName === 'AUS_Sydney') {
          honeypotDy = honeypotFixed[5]
        }
        // hoenypot attack item
        let mapDataCon = []
        i.geoip.forEach((item, _index) => {
          // mapDataItem
          let mapDataItem = [
            {
              name: honeypotDy.attackName,
              attackGeo: honeypotDy.attackGeo,
              count: i.count
            },
            {
              name: item.country_name,
              ip: item.ip,
              value: honeypotDy.attackVal, // miniItem._source.geoip. 现在没有攻击次数，之后补上
              longitude: item.longitude.toFixed(2),
              latitude: item.latitude.toFixed(2)
            }
          ]
          // set mapDataCon
          mapDataCon.push(mapDataItem)
          // broadcastData set
          let broadcastDataItem = {
            ip: item.ip,
            country: item.country_name,
            city: item.city_name
          }
          broadcastData.push(broadcastDataItem)
        })
        // set mapData
        if (mapDataCon.length) {
          mapData.push(mapDataCon)
        }
        // end
      })
      // vuex 存储data
      commit('setMapData', mapData)
      commit('setBroadcastData', broadcastData)
    }
  })
}

export const attackType = ({commit}) => {
  let MaliciousInvasion = [
    {key: 'Cowrie', key2: 'Password attacks', name: '字典口令攻击', doc_count: 0},
    {key: 'Honeytrap', key2: 'Port scanning', name: '端口扫描', doc_count: 0},
    {key: 'Dionaea', key2: 'Malicious code', name: '恶意代码', doc_count: 0},
    {key: 'Glastopf', key2: 'Web attacks', name: 'web攻击', doc_count: 0},
    {key: 'eMobility', key2: 'Industrial threats', name: '工控攻击', doc_count: 0},
    {key: 'Syslog', key2: 'E-mail threats', name: '邮件攻击', doc_count: 0},
    {key: 'ElasticPot', key2: 'Remote code execution', name: '远程代码执行', doc_count: 0}
  ]
  api.get('honeypotType', {}).then(res => {
    if (res.status === 1) {
      let resData = res.res
      resData.forEach((i, j) => {
        MaliciousInvasion.forEach((m, n) => {
          if (i.key === m.key) {
            m.doc_count = i.doc_count
            return false
          }
        })
      })
      commit('setMaliciousInvasion', MaliciousInvasion)
    }
  })
}

export const statusDataAct = ({commit}, val) => {
  let sideBarData = {
    'HP_USA_Western_47.254.45.254': 'USA_Western',
    'HP_AUS_Sydney': 'AUS_Sydney',
    'HP_GER_Frankfurt': 'GER_Frankfurt',
    'HP_ARE_Dubai_47.91.109.182': 'ARE_Dubai',
    'HP_IND_Mumbai_149.129.128.234': 'IND_Mumbai',
    'HP_CHN_Shanghai': 'CHN_Shanghai'
  }
  let sideBarTime = {
    0: '15分钟|15 minutes',
    1: '1小时|An hour',
    2: '1天|One day',
    3: '1周|One week',
    4: '1月|One month'
  }
  // 攻击类型
  let MaliciousInvasion = [
    {name: 'Cowrie', name2: 'Password attacks', nameC: '字典口令攻击', value: 0},
    {name: 'Honeytrap', name2: 'Port scanning', nameC: '端口扫描', value: 0},
    {name: 'Dionaea', name2: 'Malicious code', nameC: '恶意代码', value: 0},
    {name: 'Glastopf', name2: 'Web attacks', nameC: 'web攻击', value: 0},
    {name: 'eMobility', name2: 'Transport infrastructure', nameC: '交通基础设施攻击', value: 0},
    {name: 'Syslog', name2: 'E-mail threats', nameC: '邮件攻击', value: 0},
    {name: 'ElasticPot', name2: 'Remote code execution', nameC: '远程代码执行', value: 0},
    {name: 'ConPot', name2: 'Industrial threats', nameC: '工控攻击', value: 0}
  ]
  commit('setSideBar', {
    sideBarData: sideBarData,
    sideBarActive: sideBarData[val.search],
    sideBarTime: sideBarTime,
    sideBarTimeActive: sideBarTime[val.section]
  })
  api.get('statusData', {search: val.search, section: val.section}).then(res => {
    if (res.res) { // 简单返回判断，等待接口标示统一做进一步更改
      let resData = res.res
      let getData = (res, type) => {
        let Name = [] // name
        let Series = [] // value
        let DataX = [] // x
        let DataY = [] // y
        for (let i in res) {
          Name.push(i)
          let SeriesLi = {
            name: i,
            type: type,
            showSymbol: false,
            data: []
          }
          DataX = []
          res[i].forEach((item, index) => {
            SeriesLi.data.push(item.value)
            DataY.push(item.value)
            if (val.section <= 2) {
              DataX.push(api.dateFormat(new Date(item.from_as_string)).split(' ')[1])
            } else if (Number(val.section) === 3) {
              DataX.push(api.dateFormat1(new Date(item.from_as_string)))
            } else if (Number(val.section) === 4) {
              DataX.push(api.dateFormat(new Date(item.from_as_string)).split(' ')[0])
            }
          })
          Series.push(SeriesLi)
        }
        return {
          Name: Name,
          Series: Series,
          DataX: DataX,
          DataY: Math.max.apply(null, DataY)
        }
      }
      resData.hp_type.forEach((i, j) => {
        let newTypeCount = 0
        MaliciousInvasion.forEach((m, n) => {
          /*
          * 遍历字典
          * 如果都i都不能匹配
          * 则mal中增加对象
          */
          if (i.name === m.name) {
            m.value = i.value
            return false
          } else {
            newTypeCount++
            if (newTypeCount === MaliciousInvasion.length) {
              i.nameC = i.name
              MaliciousInvasion.push(i)
            }
          }
        })
      })
      // 攻击国家
      let attackCountry = resData.hp_country
      // 事件line
      let attackEvent = getData(resData.hp_type_statistic, 'line')
      // 目标bar
      let attackBar = getData(resData.hp_port_statistic, 'bar')
      // 国家line
      let attackCountryLine = getData(resData.hp_country_statistic, 'line')
      let attackData = {
        attackType: MaliciousInvasion,
        attackCountry: attackCountry,
        attackEvent: attackEvent,
        attackBar: attackBar,
        attackCountryLine: attackCountryLine
      }
      commit('setStatusData', attackData)
    }
  })
  wordcloudDataAct({commit}, val)
}

export const wordcloudDataAct = ({commit}, val) => {
  api.get('wordcloudData', {search: val.search, section: val.section}).then(res => {
    if (res.res) {
      let resData = res.res
      if (resData) {
        commit('setWordcloudData', resData)
      }
    }
  })
}

export const aboutDataAct = ({commit}, val) => {
  api.get('aboutData', {}).then(res => {
    if (res.status === 1) {
      let resData = res.res
      commit('setAboutData', resData)
    }
  })
}
