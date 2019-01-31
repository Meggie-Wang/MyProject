var apiPath = localStorage.apiPath;

function loadTestData(callback) {
	// 地球用数据
	timeBins = [{
		data: [],
		year: 2017
	}]
	var haha = [{
		geoip: [{
			country_name: "China",
			cn_country_name: '中国',
			ip: "0.0.0.0",
			md5: "MD5 value",
			latitude: 30.5,
			longitude: 121,
			threaten_type: 'threaten_type'
		}],
		hp_name: '中国'
	}]
	$.get(apiPath + 'api/attack_list/', {
		token: localStorage[localStorage.tokenName + '_token'],
		userId: localStorage.seesionId
	}, function (response) {
		if (response.status === 200) {
			res = response.geo_data.length ? response.geo_data : haha

			// swiper
			swiperData = res;

			// 清空配置
			latlonData.facilities = {}
			missileLookup = {}
			missileColors = {}
			missleName = {}

			res.forEach(function (i, j) {
				// 名称中间空格影响程序
				i.hp_name = i.hp_name.replace(/ /g, '')
				// latlonData.facilities
				latlonData.facilities[i.hp_name] = {
					name: i.hp_name,
					lat: latlonData.hlj.lat,
					lon: latlonData.hlj.lon
				}
				// missileLookup
				missileLookup[i.hp_name] = {
					name: i.hp_name,
					type: i.hp_name
				}
				// missileColors
				missileColors[i.hp_name] = missileColorsArr[j]
				// missleName
				missleName[i.hp_name] = i.hp_name
				// legend
				$('#legend-' + j).find('.label').text(i.hp_name)
				$('#legend-' + j).removeClass().addClass(i.hp_name)
				// 3D
				i.geoip.forEach(function (m, n) {
					let dataLi = {
						"date": m.detect_finished_time,
						"ip": m.ip,
						"time": m.country_name,
						"cn_country_name": m.cn_country_name,
						"missile": i.hp_name,
						"facility": i.hp_name,
						"lat": m.latitude,
						"lon": m.longitude,
						"landing": "",
						"apogee": Math.random() * 700 + 1800,
						"distance": 6940,
						"bearing": 72,
						"outcome": "success",
						"description": "this is may not useful."
					}
					timeBins[0].data.push(dataLi)
				})
				// console.log(timeBins)
				// 遍历missle名字字典，出现一个显示一个
				if (i.hp_name && i.geoip.length) {
					// $('.' + i.hp_name).show()
					$('#legend-' + j).show()
					defalutHoneypot = i.hp_name
				}
			})

			maxValue = 0;

			startTime = timeBins.year;
			endTime = timeBins.year;
			timeLength = endTime - startTime;

			if(callback)
				callback();
			console.log("finished read data file");
		}
	})
}

function loadAttackType (potName) {
	// var sum = 0;
	var ulDom = $('.attack-type ul');
	var path = apiPath + 'api/attackType_list/';
	$.get(path, {
		token: localStorage[localStorage.tokenName + '_token'],
		userId: localStorage.seesionId
	}, function (res) {
		if (res.status === 200) {
			ulDom.find('.attack-type-count').text(0);
			
			// 显示apt家族检测数据量
			if (res.data.apt_lines && res.data.apt_lines.length) {
				var aptShow = Math.floor(Math.random() * res.data.apt_lines.length);
				$('.attack-type-apt')
					.find('.attack-type-name')
					.text(res.data.apt_lines[aptShow].name);
				$('.attack-type-apt')
					.find('.attack-type-count')
					.text(res.data.apt_lines[aptShow].value);
				$('.attack-type-apt').show();
			}

			res.data.lines.forEach(function (i, j) {
				// sum += i.value;
				$('.attack-type').find('.attack-type-' + j).show();
				$('.attack-type').find('.attack-type-' + j).find('.attack-type-count').text(i.value);
				$('.attack-type').find('.attack-type-' + j).find('.attack-type-name').text(i.name.toUpperCase());
			})
			var numberChange = function (num) {
			  let nn = String(num)
			  let showNum = 0
			  if (nn.length <= 3) {
			  	showNum = nn
			  } else if (nn.length > 3 && nn.length <= 6) {
			    showNum = nn.slice(0, nn.length - 3) + '.' + nn.slice(nn.length - 3, nn.length - 1) + 'K'
			  } else if (nn.length > 6 && nn.length <= 9) {
			    showNum = nn.slice(0, nn.length - 6) + '.' + nn.slice(nn.length - 6, nn.length - 4) + 'M'
			  } else if (nn.length > 9 && nn.length <= 12) {
			    showNum = nn.slice(0, nn.length - 9) + '.' + nn.slice(nn.length - 9, nn.length - 7) + 'G'
			  } else if (nn.length > 12) {
			    showNum = nn.slice(0, nn.length - 12) + '.' + nn.slice(nn.length - 12, nn.length - 10) + 'T'
			  }
			  return showNum
			}
			$('.attack-type-sum').find('p').text(numberChange(res.data.nonmaliciously_amount));
			$('.attack-type').show();
		}
	})
}
