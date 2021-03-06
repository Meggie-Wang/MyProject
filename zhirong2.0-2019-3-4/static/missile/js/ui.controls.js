/**
ui.control.js
Created by Pitch Interactive
Created on 6/26/2012
This code will control the primary functions of the UI in the ArmsGlobe app
**/
d3.selection.prototype.moveToFront = function() {
	return this.each(function() {
		this.parentNode.appendChild(this);
	});
};

function mediaType() {
	if (screen.width < 640 && window.innerWidth < 640) {
		return 'phone';
	} else if (screen.width < 1280 && window.innerWidth < 1280) {
		return 'tablet';
	}
	return 'pc';
}

function size(sizeArray) {
	return sizeArray[mediaType() !== 'phone' ? 0 : 1];
}

function swiperInit () {
	swiper = new Swiper('.swiper-container', {
		autoplay: {
	    delay: 550,
	    stopOnLastSlide: false,
	    disableOnInteraction: true
	  },
	  loop : true,
	  speed: 2000,
	  observer: true,
	  observeParents: true,
	  direction: 'vertical',
	  slidesPerView: 10, // 决定上下滚动条数，并是否循环滚动
	  spaceBetween: 0,
	  mousewheel: false
	});
}
function imgErr (_this) {
	_this.hide()
	_this.next().show()
}
function checkReport (md5,id,importLevel) {
	localStorage.setItem('Report3d', '1')
	window.open(window.location.protocol +
		'//' + window.location.hostname +
		(window.location.port ? ':' + window.location.port : '') +
		'/#/SampleReport?md5=' +md5 +
		'&id=' + id +
		'&importLevel=' + importLevel)
}
function swiperDom (m, n, bol) {
  return '<div class="swiper-slide swiper-no-swiping" num='+ n +'>\
				<div>\
				<p title="'+m.md5+'" onclick=checkReport("'+m.md5+'",'+m.id + ',' + m.important_level +')>'+m.md5.toLowerCase().slice(0, 16)+'...</p>\
				<p>'+m.ip+'</p>\
				<p title="'+m.cn_country_name+'">\
				<img src="images/flag/'+m.country_name+'.png" alt="'+m.cn_country_name+'" onerror="imgErr($(this))"/>\
				<span style="display: none;">'+m.cn_country_name+'</span>\
				</p>\
				<p>'+m.threaten_type+'</p>\
				</div>\
				</div>'
}

function showMiniMaps(honeypot) {
		if (camera.zoom > cameraMin) {
			camera.zoom = cameraMin;
			camera.updateProjectionMatrix();
		}

		$('.mini-map').show().removeClass('map-act-out').addClass('map-act-in');
		
		var hp_name = honeypot; 

		// minimap
		// miniMap(hp_name)

		// 添加滚动dom
		var wrapCon = $('.swiper-wrapper')
		wrapCon.empty()
		if (swiperData.length) {
			swiperData.forEach(function (i, j) {
				i.geoip.forEach(function (m, n) {
					// 判断图片能否加载成功
					// let backImg = new Image()
				 //  backImg.src = 'images/flag/'+m.country_name+'.png'
				 //  backImg.onload = function () {
				  	wrapCon.append(swiperDom(m, n, true))
				  // }
				  // backImg.onerror = function () {
				  // 	wrapCon.append(swiperDom(m, n, false))
				  // }
				})
			})
		}

		swiperInit()

		// 加载攻击类型数据
		loadAttackType(hp_name);
		setInterval(function () {
			loadAttackType(hp_name);
		}, 60000)
}

// 默认显示某一个honeyport
function loadLineOnly (potName) {
	// 隐藏line的legend
	var closeMissile = function (className) {
		var check = $('.' + className).find('.check');
		check.addClass('inactive');
		d3Graphs.updateViz(true);
	}
	
	for(let i in missileColors) {
		if (i !== potName) {
			closeMissile(i)
		} else {
			$('.' + i).find('.check').removeClass('inactive');
			d3Graphs.updateViz(true);
		}
	}
}

var counter = 0;
var d3Graphs = {
	barGraphWidth: 420,
	barGraphHeight: 800,
	barGraphMinHeight: 530,
	barGraphMaxHeight: 790,
	barWidth: 14,
	barGraphTopPadding: 0,
	barGraphBottomPadding: 75,
	histogramWidth: [686, 371],
	histogramHeight: 160,
	histogramBarWidth: [28, 14],
	histogramLeftPadding: 28,
	histogramRightPadding: 28,
	histogramVertPadding: 20,
	barGraphSVG: d3.select("#wrapper").append("svg").attr('id','barGraph'),
	histogramSVG: null,
	histogramYScale: null,
	histogramXScale: null,
	cumOutcomeY: 0,
	cumSuccessY: 0,cumFailureY: 0,cumUnknownY: 0,
	cumSuccessLblY: 0,cumFailureLblY: 0,cumUnknownLblY: 0,
	inited: false,
	hudButtonsOpen: false,
	histogramOpen: false,
	handleLeftOffset: [34, 24],
	handleInterval: [42, 21],
	missileTypeBtnsOpen: false,
	windowResizeTimeout: -1,
	histogramAbsMax: 0,
	graphIconPadding: [20, -20],
	previousSuccessLabelTranslateY: -1,
	previousFailureLabelTranslateY: -1,
	previousUnknownLabelTranslateY: -1,
	tiltBtnInterval: -1,
	zoomBtnInterval: -1,
	selectedYearIndex: 14,


	setTest: function(test) {
		$("#hudButtons .testTextInput").val(test);
		d3Graphs.updateViz();
	},
	initGraphs: function() {
		this.showHud();
		this.drawBarGraph();
		this.drawHistogram();
	},
	showHud: function() {
		if(this.inited) return;
		this.inited = true;
		// $("#hudHeader .title").text(dict['_title']);
		// $("#hudHeader .subtitle").text(dict['_subtitle']);
		// $("#hudButtons .searchBtn").val(dict['search'].toUpperCase());
		// $("#hudButtons .aboutBtn").val(dict['about'].toUpperCase());
		// $("#history .graph .labels .outcome").text(dict['test-outcome'].toUpperCase());
		// $("#history .graph .labels .successes").text(dict['success'].toUpperCase());
		// $("#history .graph .labels .failures").text(dict['failure'].toUpperCase());
		// $("#history .graph .labels .unknowns").text(dict['unknown'].toUpperCase());
		// $("#outcomeBtns .success .label").text(dict['success']);
		// $("#outcomeBtns .failure .label").text(dict['failure']);
		// $("#outcomeBtns .unknown .label").text(dict['unknown']);
		for (var i in missileLookup) {
			$("#missileTypeBtns ." + i + " .label").text(missileLookup[i].name);
		}
		// $("#aboutBox .title").text(dict['_abouttitle']);
		// $("#aboutBox .text").html(dict['_about']);
		d3Graphs.windowResize();
		$("#hudHeader").hide();
		$("#hudButtons").hide();
		$("#outcomeBtns").hide(); // 隐藏左侧的bar legend
		$("#missileTypeBtns").show();
		$("#history").hide();
		$("#graphIcon").hide();
		$("#graphIcon").on('click', d3Graphs.graphIconClick);
		$("#history .close").on('click', d3Graphs.closeHistogram);
		$("#history ul li").on('click', d3Graphs.clickTimeline);
		$("#handle").draggable({axis: 'x',containment: "parent",grid:[size(this.handleInterval), 0], stop: d3Graphs.dropHandle, drag: d3Graphs.dropHandle });
		$("#hudButtons .searchBtn").on('click', d3Graphs.updateViz);
		$("#outcomeBtns>div>.label").on('click', d3Graphs.outcomeLabelClick);
		$("#missileTypeBtns>div>div>.label").on('click', d3Graphs.missileBtnClick); // 取到原点击事件的内层label
		$("#missileTypeBtns>div>div>.box").on('click', d3Graphs.missileBtnClick); // 取到原点击事件的内层label
		$("#missileTypeBtns>div>div").on('click', d3Graphs.showMiniMap); // 显示miniMap
		$(".map-close").on('click', d3Graphs.closeMiniMap); // 关闭小地图
		$("#hudButtons .testTextInput").autocomplete({ source:selectableTests, autoFocus: true });
		$("#hudButtons .testTextInput").keyup(d3Graphs.testKeyUp);
		$("#hudButtons .testTextInput").focus(d3Graphs.testFocus);
		$("#hudButtons .aboutBtn").on('click', d3Graphs.toggleAboutBox);
		$(document).on('click', '.ui-autocomplete li', d3Graphs.menuItemClick);
		$(window).resize(d3Graphs.windowResizeCB);
		$(".tiltBtn").on('mousedown touchstart', d3Graphs.tiltBtnClick);
		$(".tiltBtn").on('mouseup touchend touchcancel', d3Graphs.tiltBtnMouseup);
		$(".zoomBtn").on('mousedown touchstart', d3Graphs.zoomBtnClick);
		$(".zoomBtn").on('mouseup touchend touchcancel', d3Graphs.zoomBtnMouseup);
		$("#hudButtonHandle").on('click', d3Graphs.hudButtonHandleClick);
		$("#missileTypeBtnHandle").on('click', d3Graphs.missileTypeBtnHandleClick);
		$('.globe-tags').on('click', d3Graphs.globeTags);
	},
	tiltBtnMouseup: function() {
		clearInterval(d3Graphs.tiltBtnInterval);
	},
	tiltBtnClick:function() {
		var delta;
		if($(this).hasClass('sideViewBtn')) {
			delta = 5;
		} else {
			delta = -5;
		}
		d3Graphs.doTilt(delta);
		d3Graphs.tiltBtnInterval = setInterval(d3Graphs.doTilt, 50, delta);
	},
	doTilt:function(delta) {
		tilt += delta * 0.01;
		tilt = constrain(tilt, 0, Math.PI / 2);
		camera.position.y = 300 * Math.sin(-tilt);
		camera.position.z = 100 + 300 * Math.cos(-tilt);
		camera.lookAt(new THREE.Vector3(0, 0, 100));
		tiltTarget = undefined;
	},
	zoomBtnMouseup: function() {
		clearInterval(d3Graphs.zoomBtnInterval);
	},
	zoomBtnClick:function() {
		var delta;
		if($(this).hasClass('zoomOutBtn')) {
			delta = -0.5;
		} else {
			delta = 0.5;
		}
		d3Graphs.doZoom(delta);
		d3Graphs.zoomBtnInterval = setInterval(d3Graphs.doZoom,50,delta);
	},
	doZoom:function(delta) {
		camera.zoom += delta * 0.1;
		camera.zoom = constrain( camera.zoom, cameraMin, cameraWheelMax );
		camera.updateProjectionMatrix();
		scaleTarget = undefined;
	},
	toggleAboutBox:function() {
		$("#aboutContainer").toggle();
	},
	clickTimeline:function() {
		var year = $(this).html();
		if (year < 70) {
			year = (year * 1) + 2000;
		}
		if (year < 100) {
			year = (year * 1) + 1900;
		}
		d3Graphs.setHandlePosition(yearIndexLookup[year]);
		d3Graphs.updateViz(true);
	},
	windowResizeCB:function() {
		clearTimeout(d3Graphs.windowResizeTimeout);
		d3Graphs.windowResizeTimeout = setTimeout(d3Graphs.windowResize, 50);
	},
	windowResize: function() {
		var windowWidth = $(window).width();
		var windowHeight = $(window).height();
		var minWidth = 1280;
		var minHeight = 600;
		if (mediaType() === 'pc') {
			var w = Math.max(windowWidth, minWidth);
			var h = Math.max(windowHeight, minHeight);
			var hudButtonWidth = 489;
			// $('#hudButtons').css('left', 20);
			var outcomeButtonHeight = $("#outcomeBtns").height();
			$("#outcomeBtns").css('top', h - outcomeButtonHeight - 15);
			var missileButtonWidth = $("#missileTypeBtns").width();
			var missileButtonHeight = $("#missileTypeBtns").height();
			$("#missileTypeBtns").css('right', 20); // 使右侧legend移动到左侧 w - missileButtonWidth - 20
			// $("#missileTypeBtns").css('top', h - missileButtonHeight - 15);
			$("#missileTypeBtns").css('top', '2rem');
			d3Graphs.barGraphHeight = Math.min(
				d3Graphs.barGraphMinHeight + Math.max(windowHeight - minHeight, 0),
				d3Graphs.barGraphMaxHeight);
			$("#barGraph").hide(); // 隐藏左侧的bar图
			$("#barGraph").css('top', h - d3Graphs.barGraphHeight);
		} else {
			$("#hudButtons").css('right', d3Graphs.hudButtonsOpen ?
				0 : $("#hudButtonHandle").width() - $("#hudButtons").width() + 'px');
		}
		/*
		var hudHeaderLeft = $("#hudHeader").css('left');
		hudHeaderLeft = hudHeaderLeft.substr(0,hudHeaderLeft.length-2);
		console.log(hudHeaderLeft);
		var hudPaddingRight = 30;
		$("#hudHeader").width(w-hudHeaderLeft - hudPaddingRight);
		*/
		d3Graphs.drawBarGraph();
		d3Graphs.drawHistogram();
		d3Graphs.setHandlePosition(d3Graphs.selectedYearIndex);
		$("#handle").draggable({
			axis: 'x',
			containment: "parent",
			grid:[size(d3Graphs.handleInterval), 0],
			stop: d3Graphs.dropHandle,
			drag: d3Graphs.dropHandle
		});
		d3Graphs.positionHistory(windowWidth);
	},
	positionHistory: function(windowWidth) {
		var graphIconPadding = size(d3Graphs.graphIconPadding);
		var historyWidth = $("#history").width();
		var totalWidth = historyWidth + $("#graphIcon").width() + graphIconPadding;
		var historyLeftPos = (windowWidth - totalWidth) / 2.0;
		var minLeftPos = 360;
		if (mediaType() === 'pc' && historyLeftPos < minLeftPos) {
			historyLeftPos = minLeftPos;
		}
		$("#history").css('left',historyLeftPos+"px");
		$("#graphIcon").css('left',historyLeftPos + historyWidth + graphIconPadding+'px');
	},
	testFocus:function(event) {
		//console.log("focus");
		setTimeout(function() { $('#hudButtons .testTextInput').select() },50);
	},
	menuItemClick:function(event) {
		setTimeout(function() {
			$('#hudButtons .testTextInput').blur();
		}, 50);
		d3Graphs.updateViz();
	},
	testKeyUp: function(event) {
		if(event.keyCode == 13 /*ENTER */) {
			$('#hudButtons .testTextInput').blur();
			d3Graphs.updateViz();
		}
	},

	updateViz:function(filterChanged) {
		var test = $("#hudButtons .testTextInput").val().toUpperCase();
		if (typeof testData[test] == 'undefined') {
			if (!filterChanged) {
				return;
			}
			test = selectedTest ? selectedTest.testName : '';
		}

		// year
		var year = 2017;// timeBins[d3Graphs.selectedYearIndex].year;
		if (!filterChanged) {
			year = testData[test].date.substr(0, 4);
			d3Graphs.setHandlePosition(yearIndexLookup[year]);
		}

		// outcome
		var outcomeArray = []
		var outcomeBtns = $("#outcomeBtns>div");
		for(var i = 0; i < outcomeBtns.length; i++) {
			var btn = $(outcomeBtns[i]);
			var outcomeKey = btn.attr('class');
			if(btn.find('.inactive').length == 0) {
				outcomeArray.push(outcomeKey);
				selectionData.outcomeCategories[outcomeKey] = true;
			} else {
				selectionData.outcomeCategories[outcomeKey] = false;
			}
		}
		if (!filterChanged && !selectionData.outcomeCategories[testData[test].outcome]) {
			outcomeArray.push(testData[test].outcome);
			selectionData.outcomeCategories[testData[test].outcome] = true;
			outcomeBtns.filter('.' + testData[test].outcome).find('.label').removeClass('inactive');
		}

		//missile
		var missileArray = [];
		var missileBtns = $("#missileTypeBtns>div>div");
		for(var i = 0; i < missileBtns.length; i++) {
			var btn = $(missileBtns[i]);
			var missileKey = btn.attr('class');
			if(btn.find('.inactive').length == 0) {
				missileArray.push(missileKey);
				selectionData.missileCategories[missileKey] = true;
			} else {
				selectionData.missileCategories[missileKey] = false;
			}
		}
		if (!filterChanged && !selectionData.missileCategories[testData[test].missile]) {
			missileArray.push(testData[test].missile);
			selectionData.missileCategories[testData[test].missile] = true;
			missileBtns.filter('.' + testData[test].missile).find('.check').removeClass('inactive');
		}

		selectionData.selectedYear = year;
		selectionData.selectedTest = test;
		selectVisualization(timeBins, year, [test], outcomeArray, missileArray);
	},
	dropHandle:function() {
		var yearOffset = $("#handle").css('left');
		yearOffset = yearOffset.substr(0, yearOffset.length - 2);
		yearOffset -= size(d3Graphs.handleLeftOffset);
		yearOffset /= size(d3Graphs.handleInterval);
		d3Graphs.selectedYearIndex = yearOffset;
		$("#handle").css('top','');
		d3Graphs.updateViz(true);
	},
	outcomeLabelClick: function() {
		var label = $(this);
		if(label.hasClass('inactive')) {
			label.removeClass('inactive');
		} else {
			label.addClass('inactive');
		}
		d3Graphs.updateViz(true);
	},
	missileBtnClick:function() {
		var check = $(this).parent().find('.check');
		if(check.hasClass('inactive')) {
			check.removeClass('inactive');
		} else {
			check.addClass('inactive');
		}
		d3Graphs.updateViz(true);
	},
	showMiniMap: function () {

			var hp_name = $(this).attr("class")

			// minimap
			// miniMap(hp_name)

			// 添加滚动dom
			// 现在可以多选legend
			// legend取消时候hasClass inactive
			// 查询一遍legend
			var legendConDom = JSON.parse(JSON.stringify(missileColors))
			for (let i in legendConDom) {
				if ($('.' + i).find('.check').hasClass('inactive')) {
					legendConDom[i] = false
				}
			}

			var wrapCon = $('.swiper-wrapper')
			wrapCon.empty()
			var _this = $(this)
			if (swiperData.length) {
				swiperData.forEach(function (i, j) {
					// 判断legend的显示，注入数据
					if (legendConDom[i.hp_name]) {
						i.geoip.forEach(function (m, n) {
							wrapCon.append(swiperDom(m, n))
						})
					}
				})
			}

			swiper.destroy()
			swiperInit()

			// 加载攻击类型数据
			// loadAttackType(hp_name);

			// 只显示当前pot
			// loadLineOnly(hp_name);
	},
	closeMiniMap: function () {
		/*
		* 关闭小窗
		*	1，清理小窗数据
		* 2，关闭小窗
		* 3，地球复位
		*/
		swiper.autoplay.stop();
		globe_x = 0;
		camera.zoom = cameraMax;
		camera.updateProjectionMatrix();
	},
	hudButtonHandleClick: function() {
		if (!d3Graphs.hudButtonsOpen) {
			d3Graphs.hudButtonsOpen = true;
			$("#hudButtons").animate({right: '0px'});
		} else {
			d3Graphs.hudButtonsOpen = false;
			$("#hudButtons").animate({right: $("#hudButtonHandle").width() - $("#hudButtons").width() + 'px'});
			$("#aboutContainer").hide();
		}
	},
	missileTypeBtnHandleClick: function() {
		if (!d3Graphs.missileTypeBtnsOpen) {
			d3Graphs.missileTypeBtnsOpen = true;
			$("#missileTypeBtns").animate({right: '0px'});
		} else {
			d3Graphs.missileTypeBtnsOpen = false;
			$("#missileTypeBtns").animate({right: $("#missileTypeBtnHandle").width() - $("#missileTypeBtns").width() + 'px'});
		}
	},
	globeTags: function () {
		console.log(1111)
		if (!markers.length) {
			markers = globeTags;
		} else {
			markers = [];
		}
	},
	graphIconClick: function() {
		if(!d3Graphs.histogramOpen) {
			d3Graphs.histogramOpen = true;
			$("#history .graph").slideDown();
		} else {
			d3Graphs.closeHistogram();
		}
	},
	closeHistogram: function() {
		d3Graphs.histogramOpen = false;
		$("#history .graph").slideUp();
	},
	line: d3.line()
		// assign the X function to plot our line as we wish
	.x(function(d,i) {
		if(d == null) {
			return null;
		}
		return d3Graphs.histogramXScale(d.x) + d3Graphs.histogramLeftPadding;
	 })
	.y(function(d) {
		if(d == null) {
			return null;
		}
		return d3Graphs.histogramYScale(d.y) + d3Graphs.histogramVertPadding;
	}),
	setHistogramData:function() {
		var outcomeArray = [];
		var historical = summary.historical;
		var numHistory = historical.length;
		var absMax = 0;

		for(var i = 0; i < numHistory; i++) {
			var successes = historical[i].successes;
			var failures = historical[i].failures;
			var unknowns = historical[i].unknowns;
			outcomeArray.push([
				{'type': 'unknown', 'count': unknowns},
				{'type': 'failure', 'count': failures},
				{'type': 'success', 'count': successes}
			]);
			absMax = Math.max(absMax, successes + failures + unknowns);
		}
		this.histogramOutcomeArray = outcomeArray;
		this.histogramAbsMax = absMax;
	},
	drawHistogram:function() {
		var histogramWidth = size(this.histogramWidth);
		var histogramBarWidth = size(this.histogramBarWidth);
		if(this.histogramSVG == null) {
			this.histogramSVG = d3.select('#history .container').append('svg')
				.attr('id', 'histogram');
		}
		this.histogramSVG
			.attr('width', histogramWidth)
			.attr('height', this.histogramHeight);
		this.setHistogramData();

		this.histogramYScale = d3.scaleLinear().domain([0, this.histogramAbsMax]).range([0, this.histogramHeight - this.histogramVertPadding*2]);
		var maxX = summary.historical.length;
		this.histogramXScale = d3.scaleLinear().domain([0,maxX]).range([0, histogramWidth - this.histogramLeftPadding - this.histogramRightPadding]);

		var tickData = this.histogramYScale.ticks(5);

		//tick lines
		var ticks = this.histogramSVG.selectAll('line.tick').data(tickData);
		ticks.enter().append('svg:line')
			.attr('class', 'tick')
			.merge(ticks)
			.attr('x1', this.histogramLeftPadding)
			.attr('y1', function(d) {
				return d3Graphs.histogramHeight - d3Graphs.histogramVertPadding - d3Graphs.histogramYScale(d);
			})
			.attr('x2', histogramWidth - this.histogramRightPadding)
			.attr('y2', function(d) {
				return d3Graphs.histogramHeight - d3Graphs.histogramVertPadding - d3Graphs.histogramYScale(d);
			})
			.attr('stroke-dasharray', function(d) { return d == 0 ? null : '3,1'; })
			.attr('stroke-width', function(d) { return d == 0 ? 2 : 1; });
		ticks.exit().remove();

		//tick labels
		var tickLabels = this.histogramSVG.selectAll("text.tickLblLeft").data(tickData);
		tickLabels.enter().append('svg:text')
			.attr('class', 'tickLbl tickLblLeft')
			.attr('text-anchor', 'end')
			.merge(tickLabels)
			.attr('x', d3Graphs.histogramLeftPadding - 3)
			.attr('y', function(d) {
				return d3Graphs.histogramHeight - d3Graphs.histogramVertPadding - d3Graphs.histogramYScale(d) + 4;
			})
			.text(function(d) { return d; });
		tickLabels.exit().remove();

		var tickLabelsRight = this.histogramSVG.selectAll("text.tickLblRight").data(tickData);
		tickLabelsRight.enter().append('svg:text')
			.attr('class', 'tickLbl tickLblRight')
			.merge(tickLabelsRight)
			.attr('x', histogramWidth - d3Graphs.histogramRightPadding + 3)
			.attr('y', function(d) {
				return d3Graphs.histogramHeight - d3Graphs.histogramVertPadding - d3Graphs.histogramYScale(d) + 4;
			})
			.text(function(d) { return d; });
		tickLabelsRight.exit().remove();

		//lines
		var successesVisible = !$("#outcomeBtns .success .label").hasClass('inactive');
		var failuresVisible = !$("#outcomeBtns .failure .label").hasClass('inactive');
		var unknownsVisible = !$("#outcomeBtns .unknown .label").hasClass('inactive');
		$("#history .labels .failures").css('display', failuresVisible ? 'block' : 'none');
		$("#history .labels .successes").css('display', successesVisible ? 'block' : 'none');
		$("#history .labels .unknowns").css('display', unknownsVisible ? 'block' : 'none');


		var outcomeBars = this.histogramSVG.selectAll("g.outcome").data(this.histogramOutcomeArray);
		outcomeBars = outcomeBars.enter().append('g')
			.attr('class', 'outcome')
			.merge(outcomeBars)
			.attr('transform', function(d, i) {
				return 'translate(' + (d3Graphs.histogramXScale(i) + d3Graphs.histogramLeftPadding) + ',' + d3Graphs.histogramVertPadding + ')';
			});

		var outcomeRects = outcomeBars.selectAll("rect.outcome").data(function(d) { return d; });
		outcomeRects.enter().append('rect')
			.attr('class', function(d) { return 'outcome ' + d.type; })
			.merge(outcomeRects).transition()
			.attr('x', histogramBarWidth / 4)
			.attr('y', function(d, i) {
				if (i == 0) {
					d3Graphs.cumOutcomeY = 0;
				}
				d3Graphs.cumOutcomeY += d3Graphs.histogramYScale(d.count);
				return d3Graphs.histogramHeight - d3Graphs.histogramVertPadding * 2 - d3Graphs.cumOutcomeY;
			})
			.attr('width', histogramBarWidth)
			.attr('height', function(d) { return d3Graphs.histogramYScale(d.count); });
		outcomeRects.exit().remove();
		outcomeBars.exit().remove();
		outcomeBars.moveToFront();

		//active year labels
		var activeYearOutcome = this.histogramOutcomeArray[this.selectedYearIndex];

	},
	setHandlePosition: function(index) {
		var leftPos = size(d3Graphs.handleLeftOffset) + size(d3Graphs.handleInterval) * index;
		$("#handle").css('left', leftPos + "px");
		d3Graphs.selectedYearIndex = index;
	},
	drawBarGraph: function() {
		this.barGraphSVG
			.attr('id', 'barGraph')
			.attr('width', d3Graphs.barGraphWidth)
			.attr('height', d3Graphs.barGraphHeight)
			.attr('class', 'overlayTests noPointer');
		var successArray = [];
		var failureArray = [];
		var unknownArray = [];
		var successTotal = summary.success.total;
		var failureTotal = summary.failure.total;
		var unknownTotal = summary.unknown.total;
		var minMissileCount = Number.MAX_VALUE;
		var maxMissileCount = Number.MIN_VALUE;
		for(var code in missileLookup) {
			var sCount = summary.success[code];
			var fCount = summary.failure[code];
			var uCount = summary.unknown[code];
			if (sCount > 0) {
				minMissileCount = Math.min(minMissileCount, sCount);
				maxMissileCount = Math.max(maxMissileCount, sCount);
			}
			if (fCount > 0) {
				minMissileCount = Math.min(minMissileCount, fCount);
				maxMissileCount = Math.max(maxMissileCount, fCount);
			}
			if (uCount > 0) {
				minMissileCount = Math.min(minMissileCount, uCount);
				maxMissileCount = Math.max(maxMissileCount, uCount);
			}
			successArray.unshift({"type":code, "count": sCount});
			failureArray.unshift({"type":code, "count": fCount});
			unknownArray.unshift({"type":code, "count": uCount});
		}
		var max = 19;
		var yScale = d3.scaleLinear().domain([0,max]).range([0,this.barGraphHeight - this.barGraphBottomPadding - this.barGraphTopPadding]);
		var midX = this.barGraphWidth / 3;
		this.cumSuccessY = this.cumFailureY = this.cumUnknownY = 0;

		var successRects = this.barGraphSVG.selectAll(".bar.success").data(successArray);
		successRects.enter().append('rect')
			.attr('class', function(d) { return 'bar success ' + d.type; })
			.attr('x', midX - this.barWidth)
			.attr('width', this.barWidth)
			.merge(successRects).transition()
			.attr('y', function(d) {
				d3Graphs.cumSuccessY += yScale(d.count);
				return value = d3Graphs.barGraphHeight - d3Graphs.barGraphBottomPadding - d3Graphs.cumSuccessY;
			})
			.attr('height', function(d) { return yScale(d.count); });
		successRects.exit().remove();

		var failureRects = this.barGraphSVG.selectAll('.bar.failure').data(failureArray);
		failureRects.enter().append('rect')
			.attr('class', function(d) { return 'bar failure ' + d.type; })
			.attr('x', midX + 10)
			.attr('width', this.barWidth)
			.merge(failureRects).transition()
			.attr('y', function(d) {
				d3Graphs.cumFailureY += yScale(d.count);
				return value = d3Graphs.barGraphHeight - d3Graphs.barGraphBottomPadding - d3Graphs.cumFailureY;
			})
			.attr('height', function(d) { return yScale(d.count); });
		failureRects.exit().remove();

		var unknownRects = this.barGraphSVG.selectAll('.bar.unknownBar').data(unknownArray);
		unknownRects.enter().append('rect')
			.attr('class', function(d) { return 'bar unknownBar ' + d.type; })
			.attr('x', midX + 112)
			.attr('width', this.barWidth)
			.merge(unknownRects).transition()
			.attr('y', function(d) {
				d3Graphs.cumUnknownY += yScale(d.count);
				return d3Graphs.barGraphHeight - d3Graphs.barGraphBottomPadding - d3Graphs.cumUnknownY;
			})
			.attr('height', function(d) { return yScale(d.count); });
		unknownRects.exit().remove();

		//bar graph labels
		this.cumSuccessLblY = 0;
		this.cumFailureLblY = 0;
		this.cumUnknownLblY = 0;
		this.previousSuccessLabelTranslateY = 0;
		this.previousFailureLabelTranslateY = 0;
		this.previousUnknownLabelTranslateY = 0;
		var fontSizeInterpolater = function(v, min, max) {
			return d3.interpolateRound(14, 28)(min == max ? 1 : (v - min) / (max - min));
		}
		var smallLabelSize = 22;
		var mediumLabelSize = 40;

		//success labels
		var successLabels = this.barGraphSVG.selectAll('g.successLabel').data(successArray);
		var newSuccessLabels = successLabels.enter().append('g')
			.attr('class', function(d) { return 'successLabel ' + d.type; });
		newSuccessLabels.append('rect')
			.attr('class', function(d) { return 'barGraphLabelBG ' + d.type; });
		newSuccessLabels.append('text')
			.attr('class', 'numericLabel')
			.attr('text-anchor', 'end');
		newSuccessLabels.append('text')
			.attr('class', function(d) { return 'textLabel success ' + d.type; })
			.attr('text-anchor', 'end')
			.attr('y', 14);
		successLabels = newSuccessLabels.merge(successLabels);
		successLabels.transition()
			.attr('transform', function(d) {
				var translate = 'translate(' + (d3Graphs.barGraphWidth / 3 - 25) + ',';
				var value = d3Graphs.barGraphHeight - d3Graphs.barGraphBottomPadding - d3Graphs.cumSuccessLblY - yScale(d.count) / 2;
				d3Graphs.cumSuccessLblY += yScale(d.count);
				translate += value + ')';
				this.previousSuccessLabelTranslateY = value;
				return translate;
			})
			.attr('opacity', function(d) { return d.count > 0 ? 1 : 0; });
		successLabels.exit().remove();
		successLabels.selectAll('.numericLabel').transition()
			.text(function(d) { return this.parentNode.__data__.count || this.textContent; })
			.attr('font-size', function(d) {
				return fontSizeInterpolater(this.parentNode.__data__.count, minMissileCount, maxMissileCount) + 'px';
			});
		successLabels.selectAll('.textLabel')
			.text(function(d) { return missileLookup[this.parentNode.__data__.type].name.toUpperCase(); });
		successLabels.selectAll('.barGraphLabelBG').transition()
			.attr('width', function(d) {
				return d3.select(this.parentNode).select('.textLabel').node().getComputedTextLength();
			})
			.attr('height', function(d) {
				return fontSizeInterpolater(this.parentNode.__data__.count, minMissileCount, maxMissileCount) + 15;
			})
			.attr('x', function(d) {
				return -d3.select(this.parentNode).select('.textLabel').node().getComputedTextLength();
			})
			.attr('y', function(d) {
				return -fontSizeInterpolater(this.parentNode.__data__.count, minMissileCount, maxMissileCount);
			});

		//failure labels
		var failureLabels = this.barGraphSVG.selectAll('g.failureLabel').data(failureArray);
		var newFailureLabels = failureLabels.enter().append('g')
			.attr('class', function(d) { return 'failureLabel ' + d.type; });
		newFailureLabels.append('rect')
			.attr('class', function(d) { return 'barGraphLabelBG failureBG ' + d.type; })
			.attr('x', 0);
		newFailureLabels.append('text')
			.attr('class', 'numericLabel')
			.attr('text-anchor', 'start');
		newFailureLabels.append('text')
			.attr('class', function(d) { return 'textLabel failure ' + d.type; })
			.attr('text-anchor', 'start')
			.attr('y', 14);
		failureLabels = newFailureLabels.merge(failureLabels);
		failureLabels.transition()
			.attr('transform', function(d) {
				var translate = 'translate(' + (d3Graphs.barGraphWidth / 3 + 35) + ',';
				var value = d3Graphs.barGraphHeight - d3Graphs.barGraphBottomPadding - d3Graphs.cumFailureLblY - yScale(d.count) / 2;
				d3Graphs.cumFailureLblY += yScale(d.count);
				translate += value + ')';
				this.previousFailureLabelTranslateY = value;
				return translate;
			})
			.attr('opacity', function(d) { return d.count > 0 ? 1 : 0; });
		failureLabels.exit().remove();
		failureLabels.selectAll('.numericLabel').transition()
			.text(function(d) { return this.parentNode.__data__.count || this.textContent; })
			.attr('font-size', function(d) {
				return fontSizeInterpolater(this.parentNode.__data__.count, minMissileCount, maxMissileCount) + 'px';
			});
		failureLabels.selectAll('.textLabel')
			.text(function(d) { return missileLookup[this.parentNode.__data__.type].name.toUpperCase(); });
		failureLabels.selectAll('.barGraphLabelBG').transition()
			.attr('width', function(d) {
				return d3.select(this.parentNode).select('.textLabel').node().getComputedTextLength();
			})
			.attr('height', function(d) {
				return fontSizeInterpolater(this.parentNode.__data__.count, minMissileCount, maxMissileCount) + 15;
			})
			.attr('y', function(d) {
				return -fontSizeInterpolater(this.parentNode.__data__.count, minMissileCount, maxMissileCount);
			});

		//unknown labels
		var unknownLabels = this.barGraphSVG.selectAll('g.unknownLabel').data(unknownArray);
		var newUnknownLabels = unknownLabels.enter().append('g')
			.attr('class', function(d) { return 'unknownLabel ' + d.type; });
		newUnknownLabels.append('rect')
			.attr('class', function(d) { return 'barGraphLabelBG unknownBG ' + d.type; })
			.attr('x', 0);
		newUnknownLabels.append('text')
			.attr('class', 'numericLabel')
			.attr('text-anchor', 'start');
		newUnknownLabels.append('text')
			.attr('class', function(d) { return 'textLabel unknown ' + d.type; })
			.attr('text-anchor', 'start')
			.attr('y', 14);
		unknownLabels = newUnknownLabels.merge(unknownLabels);
		unknownLabels.transition()
			.attr('transform', function(d) {
				var translate = 'translate(' + (d3Graphs.barGraphWidth / 3 + 137) + ',';
				var value = d3Graphs.barGraphHeight - d3Graphs.barGraphBottomPadding - d3Graphs.cumUnknownLblY - yScale(d.count) / 2;
				d3Graphs.cumUnknownLblY += yScale(d.count);
				translate += value + ')';
				this.previousUnknownLabelTranslateY = value;
				return translate;
			})
			.attr('opacity', function(d) { return d.count > 0 ? 1 : 0; });
		unknownLabels.exit().remove();
		unknownLabels.selectAll('.numericLabel').transition()
			.text(function(d) { return this.parentNode.__data__.count || this.textContent; })
			.attr('font-size', function(d) {
				return fontSizeInterpolater(this.parentNode.__data__.count, minMissileCount, maxMissileCount) + 'px';
			});
		unknownLabels.selectAll('.textLabel')
			.text(function(d) { return missileLookup[this.parentNode.__data__.type].name.toUpperCase(); });
		unknownLabels.selectAll('.barGraphLabelBG').transition()
			.attr('width', function(d) {
				return d3.select(this.parentNode).select('.textLabel').node().getComputedTextLength();
			})
			.attr('height', function(d) {
				return fontSizeInterpolater(this.parentNode.__data__.count, minMissileCount, maxMissileCount) + 15;
			})
			.attr('y', function(d) {
				return -fontSizeInterpolater(this.parentNode.__data__.count, minMissileCount, maxMissileCount);
			});

		//over all numeric total outcome labels
		var successsesVisible = !$("#outcomeBtns .success .label").hasClass('inactive');
		var failuresVisible = !$("#outcomeBtns .failure .label").hasClass('inactive');
		var unknownVisible = !$("#outcomeBtns .unknown .label").hasClass('inactive');

		//success total label at bottom
		var successTotalLabel = this.barGraphSVG.selectAll('text.totalLabel.successTotalLabel').data([1]);
		successTotalLabel.enter().append('text')
			.attr('class', 'totalLabel successTotalLabel')
			.attr('text-anchor', 'end')
			.attr('x', midX)
			.merge(successTotalLabel).transition()
			.attr('y', this.barGraphHeight - this.barGraphBottomPadding + 25)
			.text(successsesVisible ? successTotal : function() { return this.textContent; })
			.attr('opacity', successsesVisible ? 1 : 0);

		//failure total label at bottom
		var failureTotalLabel = this.barGraphSVG.selectAll('text.totalLabel.failureTotalLabel').data([1]);
		failureTotalLabel.enter().append('text')
			.attr('class', 'totalLabel failureTotalLabel')
			.attr('x', midX + 10)
			.merge(failureTotalLabel).transition()
			.attr('y', this.barGraphHeight - this.barGraphBottomPadding + 25)
			.text(failuresVisible ? failureTotal : function() { return this.textContent; })
			.attr('opacity', failuresVisible ? 1 : 0);

		//unknown total label at bottom
		var unknownTotalLabel = this.barGraphSVG.selectAll('text.totalLabel.unknownTotalLabel').data([1]);
		unknownTotalLabel.enter().append('text')
			.attr('class', 'totalLabel unknownTotalLabel')
			.attr('x', midX + 112)
			.merge(unknownTotalLabel).transition()
			.attr('y', this.barGraphHeight - this.barGraphBottomPadding + 25)
			.text(unknownVisible ? unknownTotal : function() { return this.textContent; })
			.attr('opacity', unknownVisible ? 1 : 0);
	},
	dragHandleStart: function(event) {
		console.log('start');
		event.dataTransfer.setData('text/uri-list','images/yearHandle.png');
		event.dataTransfer.setDragImage(document.getElementById('handle'),0,0);
		event.dataTransfer.effectAllowed='move';
	}
}
