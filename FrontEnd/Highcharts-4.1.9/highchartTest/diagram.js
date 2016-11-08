/**
 * @file 图表显示
 * @date: 2015/12/9 14:40
 * @version: V1.0
 */

'use strict';

$(function() {
	 
		//创建jQueryUI datepicker
		$('.startDate, .endDate').datepickerJQueryUI();
		var today = new Date();
		today.setDate(today.getDate() - 3);
		$('.startDate').val(formatDate(today));
	 
	 	//tab标签被选中
		$('#tab').tabs({    //查看barcode-print.js
		    border:false,    
		    onSelect:function(title){ 
		    	$diagram.title = title;
		    	$diagram.demo();
		    }    
		});
		
		$diagram.demo();
		
		//查询按钮
		$('#searchBtn').click(function() { 
			 //清空获取数据的数组赋值
			 $diagram.total_sender_nm.length = 0;
			 $diagram.total_waybill.length = 0;
			 $diagram.total_cost.length = 0;
			 $diagram.total_fare.length = 0;
			 $diagram.total_profit.length = 0;
			 $diagram.fan_total_waybill.length = 0;
			 $diagram.fan_total_cost.length = 0;
			 $diagram.fan_total_fare.length = 0;
			 $diagram.fan_total_profit.length = 0;
			 if ($diagram.title == "总票数统计图") {
				 $('#demoOne').hide();
				 $diagram.getGraphData();
				 $diagram.getLineChartData();
				 $('#fanchartWaybill').show();
				 $('#histogramWaybill').show();
				 $('#linechartWaybill').show();
				 if ($("#sender_nm_cn input").val() == "") {
					 $diagram.waybillTitleFan = $('.startDate').val() + " 至 " + $('.endDate').val() + " 各" +"公司总票数扇形图";
					 $diagram.waybillTitleHist = $('.startDate').val() + " 至 " + $('.endDate').val() + " 各" +"公司总票数柱状图";
					 $diagram.waybillTitleLine= $('.startDate').val() + " 至 " + $('.endDate').val() + " 各" +"公司总票数折线图";
						
				 } else {
					 $diagram.waybillTitleFan = $('.startDate').val() + " 至 " + $('.endDate').val() + " " + $("#sender_nm_cn input").val() +"总票数扇形图";
					 $diagram.waybillTitleHist = $('.startDate').val() + " 至 " + $('.endDate').val() + " " + $("#sender_nm_cn input").val() +"总票数柱状图";
					 $diagram.waybillTitleLine = $('.startDate').val() + " 至 " + $('.endDate').val() + " " + $("#sender_nm_cn input").val() +"总票数折线图";
				 }
			 } else if ($diagram.title == "总利润统计图") {
				 $('#demoTwo').hide();
				 $diagram.getProfitGraphData();
				 $diagram.getProfitLineData();
				 $('#fanchartProfit').show();
				 $('#histogramProfit').show();
				 $('#linechartProfit').show();
				 if ($("#sender_nm_cn input").val() == "") {
					 $diagram.profitTitleFan = $('.startDate').val() + " 至 " + $('.endDate').val() + " 各" +"公司总利润扇形图";
					 $diagram.profitTitleHist = $('.startDate').val() + " 至 " + $('.endDate').val() + " 各" +"公司总利润柱状图";
					 $diagram.profitTitleLine= $('.startDate').val() + " 至 " + $('.endDate').val() + " 各" +"公司总利润折线图";
						
				 } else {
					 $diagram.profitTitleFan = $('.startDate').val() + " 至 " + $('.endDate').val() + " " + $("#sender_nm_cn input").val() +"总利润扇形图";
					 $diagram.profitTitleHist = $('.startDate').val() + " 至 " + $('.endDate').val() + " " + $("#sender_nm_cn input").val() +"总利润柱状图";
					 $diagram.profitTitleLine = $('.startDate').val() + " 至 " + $('.endDate').val() + " " + $("#sender_nm_cn input").val() +"总利润折线图";
				 }
			 } else if ($diagram.title == "总运费统计图") {
				 $('#demoThree').hide();
				 $diagram.getFareGraphData();
				 $diagram.getFareLineData();
				 $('#fanchartFare').show();
				 $('#histogramFare').show();
				 $('#linechartFare').show();
				 if ($("#sender_nm_cn input").val() == "") {
					 $diagram.fareTitleFan = $('.startDate').val() + " 至 " + $('.endDate').val() + " 各" +"公司总运费扇形图";
					 $diagram.fareTitleHist = $('.startDate').val() + " 至 " + $('.endDate').val() + " 各" +"公司总运费柱状图";
					 $diagram.fareTitleLine= $('.startDate').val() + " 至 " + $('.endDate').val() + " 各" +"公司总运费折线图";
						
				 } else {
					 $diagram.fareTitleFan = $('.startDate').val() + " 至 " + $('.endDate').val() + " " + $("#sender_nm_cn input").val() +"总运费扇形图";
					 $diagram.fareTitleHist = $('.startDate').val() + " 至 " + $('.endDate').val() + " " + $("#sender_nm_cn input").val() +"总运费柱状图";
					 $diagram.fareTitleLine = $('.startDate').val() + " 至 " + $('.endDate').val() + " " + $("#sender_nm_cn input").val() +"总运费折线图";
				 }
			 }
		});
		
		//清空按钮
		$('#clearBtn').click(function() {
			$("#sender_nm_cn input").val(""); 	//清空发件公司
			$('#searchBtn').click();
			$diagram.senders();
		});	
		
		//初始下拉框suggest
		$diagram.suggestSender = $('#sender_nm_cn').suggestBui([]);
		//运单导入公司下拉框change事件
		var flagCompany = false;
		$('#sender_nm_cn input').change(function() {
			for (var i=0; i<$diagram.companyResult.length; i++) {
				if ($(this).val() == $diagram.companyResult[i].sender_nm_cn) {
					var sender_nm_cn = $diagram.companyResult[i].sender_nm_cn;
					flagCompany = true;
					break;
				}
			}
			if (!flagCompany) {
				$(this).val('');
			}
			flagCompany = false;
		});
		
		//1周按钮
		$('#oneWeek').click(function() {
			var startday = new Date();
			var endday = new Date();
			startday.setDate(startday.getDate() - 7);
			$('.startDate').val(formatDate(startday));
			$('.endDate').val(formatDate(endday));
			$('#searchBtn').click();
		});	
				
		//1月按钮
		$('#oneMonth').click(function() {
			var startday = new Date();
			var endday = new Date();
			startday.setDate(startday.getDate() - 30);
			$('.startDate').val(formatDate(startday));
			$('.endDate').val(formatDate(endday));
			$('#searchBtn').click();
		});	
		
		//3个月按钮
		$('#threeMonth').click(function() {
			var startday = new Date();
			var endday = new Date();
			startday.setDate(startday.getDate() - 90);
			$('.startDate').val(formatDate(startday));
			$('.endDate').val(formatDate(endday));
			$('#searchBtn').click();
		});	
		
		//6个月按钮
		$('#sixMonth').click(function() {
			var startday = new Date();
			var endday = new Date();
			startday.setDate(startday.getDate() - 183);
			$('.startDate').val(formatDate(startday));
			$('.endDate').val(formatDate(endday));
			$('#searchBtn').click();
		});	
		
		//1年按钮
		$('#oneYear').click(function() {
			var startday = new Date();
			var endday = new Date();
			startday.setDate(startday.getDate() - 365);
			$('.startDate').val(formatDate(startday));
			$('.endDate').val(formatDate(endday));
			$('#searchBtn').click();
		});	
		
		//2年按钮
		$('#twoYear').click(function() {
			var startday = new Date();
			var endday = new Date();
			startday.setDate(startday.getDate() - 730);
			$('.startDate').val(formatDate(startday));
			$('.endDate').val(formatDate(endday));
			$('#searchBtn').click();
		});	
		
		$diagram.senders();
});

var $diagram = {
		suggestSender : undefined,
		companyResult : [],
		date : new Date(),
		title : "总票数统计图",
		waybillTitleFan : "公司总票数扇形图",
		profitTitleFan : "公司总利润扇形图",
		fareTitleFan : "公司总运费扇形图",
		waybillTitleHist : "公司总票数柱状图",
		profitTitleHist : "公司总利润柱状图",
		fareTitleHist : "公司总运费柱状图",
		waybillTitleLine : "公司总票数折线图",
		profitTitleLine : "公司总利润折线图",
		fareTitleLine : "公司总运费折线图",
		total_sender_nm : new Array(),	//获取各公司名称
		total_waybill : new Array(), //获取各公司的总票数
		total_cost : new Array(),	//获取各公司的总成本
		total_fare : new Array(),  //获取各公司的总运费
		total_profit : new Array(),  //获取各公司的总利润
		fan_total_waybill : new Array(), 
		fan_total_cost : new Array(),	
		fan_total_fare : new Array(),  
		fan_total_profit : new Array(),  
		browseRecord : function() {  //获取浏览记录
			if ($.parseJSON(getCookie("map"))) {	//获取页面显示行数，页面数，排序方法和排序字段
				if ('diagram' in $.parseJSON(getCookie("map"))) {
					$("#searchForm").form('load',$.parseJSON($.parseJSON(getCookie("map")).diagram));	//获取查询条件中的数据
				}
			}
		},
		demo : function() {
			if ($diagram.title == "总票数统计图") {
				$('#demoOne').highcharts({
					credits: {
				 		enabled:false
				 	},
				 	exporting: {
				 		enabled:false
				 	},
			        title: {
			            text: '折线图效果图',
			            x: -20 //center
			        },
			        subtitle: {
			            text: '请点击查询按钮查看真实图表',
			            x: -20
			        },
			        xAxis: {
			            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
			        },
			        yAxis: {
			            title: {
			                text: '数据'
			            },
			            plotLines: [{
			                value: 0,
			                width: 1,
			                color: '#808080'
			            }]
			        },
			        tooltip: {
			            valueSuffix: ''
			        },
			        legend: {
			            layout: 'vertical',
			            align: 'right',
			            verticalAlign: 'middle',
			            borderWidth: 0
			        },
			        series: [{
			            name: 'one',
			            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
			        }, {
			            name: 'two',
			            data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
			        }, {
			            name: 'three',
			            data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
			        }]
			    });
			} else if ($diagram.title == "总利润统计图")  {
				$('#demoTwo').highcharts({
					credits: {
				 		enabled:false
				 	},
				 	exporting: {
				 		enabled:false
				 	},
			        title: {
			            text: '折线图效果图',
			            x: -20 //center
			        },
			        subtitle: {
			            text: '请点击查询按钮查看真实图表',
			            x: -20
			        },
			        xAxis: {
			            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
			        },
			        yAxis: {
			            title: {
			                text: '数据'
			            },
			            plotLines: [{
			                value: 0,
			                width: 1,
			                color: '#808080'
			            }]
			        },
			        tooltip: {
			            valueSuffix: ''
			        },
			        legend: {
			            layout: 'vertical',
			            align: 'right',
			            verticalAlign: 'middle',
			            borderWidth: 0
			        },
			        series: [{
			            name: 'one',
			            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
			        }, {
			            name: 'two',
			            data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
			        }, {
			            name: 'three',
			            data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
			        }]
			    });
			} else if ($diagram.title == "总运费统计图") {
				$('#demoThree').highcharts({
					credits: {
				 		enabled:false
				 	},
				 	exporting: {
				 		enabled:false
				 	},
			        title: {
			            text: '折线图效果图',
			            x: -20 //center
			        },
			        subtitle: {
			            text: '请点击查询按钮查看真实图表',
			            x: -20
			        },
			        xAxis: {
			            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
			        },
			        yAxis: {
			            title: {
			                text: '数据'
			            },
			            plotLines: [{
			                value: 0,
			                width: 1,
			                color: '#808080'
			            }]
			        },
			        tooltip: {
			            valueSuffix: ''
			        },
			        legend: {
			            layout: 'vertical',
			            align: 'right',
			            verticalAlign: 'middle',
			            borderWidth: 0
			        },
			        series: [{
			            name: 'one',
			            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
			        }, {
			            name: 'two',
			            data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
			        }, {
			            name: 'three',
			            data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
			        }]
			    });
			}
			
		},
		senders : function() {	 //获取发件公司信息	
			var senders = new nssoft.openApi.senders.api();
			senders.request({
				method : 'POST',
				async : true,
				url : contextPath + '/v1/api/analysis/senders.json'
			});
		},	
		getGraphData : function() {	 //获取柱状图、扇形图数据	
			var getGraphData = new nssoft.openApi.getGraphData.api();
			getGraphData.addParam("start_date", $(".startDate").val());
			getGraphData.addParam("end_date", $(".endDate").val());
			getGraphData.addParam("sender_nm_cn", $("#sender_nm_cn input").val());
			getGraphData.request({
				method : 'POST',
				async : true,
				url : contextPath + '/v1/api/analysis/graph/totalwaybill/bar-sector-chart.json'
			});
		},	
		getProfitGraphData : function() {	 //获取柱状图、扇形图数据	
			var getProfitGraphData = new nssoft.openApi.getProfitGraphData.api();
			getProfitGraphData.addParam("start_date", $(".startDate").val());
			getProfitGraphData.addParam("end_date", $(".endDate").val());
			getProfitGraphData.addParam("sender_nm_cn", $("#sender_nm_cn input").val());
			getProfitGraphData.request({
				method : 'POST',
				async : true,
				url : contextPath + '/v1/api/analysis/graph/totalprofit/bar-sector-chart.json'
			});
		},	
		getFareGraphData : function() {	 //获取柱状图、扇形图数据	
			var getFareGraphData = new nssoft.openApi.getFareGraphData.api();
			getFareGraphData.addParam("start_date", $(".startDate").val());
			getFareGraphData.addParam("end_date", $(".endDate").val());
			getFareGraphData.addParam("sender_nm_cn", $("#sender_nm_cn input").val());
			getFareGraphData.request({
				method : 'POST',
				async : true,
				url : contextPath + '/v1/api/analysis/graph/totalfare/bar-sector-chart.json'
			});
		},	
		getLineChartData : function() {	 //获取折线图数据	
			var getLineChartData = new nssoft.openApi.getLineChartData.api();
			getLineChartData.addParam("start_date", $(".startDate").val());
			getLineChartData.addParam("end_date", $(".endDate").val());
			getLineChartData.addParam("sender_nm_cn", $("#sender_nm_cn input").val());
			getLineChartData.request({
				method : 'POST',
				async : true,
				url : contextPath + '/v1/api/analysis/graph/totalwaybill/line-chart.json'
			});
		},
		getProfitLineData : function() {	 //获取折线图数据	
			var getProfitLineData = new nssoft.openApi.getProfitLineData.api();
			getProfitLineData.addParam("start_date", $(".startDate").val());
			getProfitLineData.addParam("end_date", $(".endDate").val());
			getProfitLineData.addParam("sender_nm_cn", $("#sender_nm_cn input").val());
			getProfitLineData.request({
				method : 'POST',
				async : true,
				url : contextPath + '/v1/api/analysis/graph/totalprofit/line-chart.json'
			});
		},
		getFareLineData : function() {	 //获取折线图数据	
			var getFareLineData = new nssoft.openApi.getFareLineData.api();
			getFareLineData.addParam("start_date", $(".startDate").val());
			getFareLineData.addParam("end_date", $(".endDate").val());
			getFareLineData.addParam("sender_nm_cn", $("#sender_nm_cn input").val());
			getFareLineData.request({
				method : 'POST',
				async : true,
				url : contextPath + '/v1/api/analysis/graph/totalfare/line-chart.json'
			});
		}
};

//发件公司下拉框回调函数
(function() {
	$class('nssoft.openApi.senders.api').extend(nssoft.absAPI).define({
		onSuccess : function(status, res) {
			if (res.errCd === 0) {
				var result = res.result;
				if (result) {
					var array = [];
					for (var i=0; i<result.length; i++) {
						array[i] = result[i].sender_nm_cn;
						//$diagram.line_total_sender_nm[i] = result[i].sender_nm_cn;
					}
					$diagram.suggestSender.set('data', array);
					$diagram.companyResult = result;
					if (result.length) {
						if (result.length == 1) {
							$('#sender_nm_cn input').val(result[0].sender_nm_cn);
						}
					}
				}
			} else {
				$alert(res.errMsg);
			}
		},
		onFail : function(status) {
			$alert('发生错误');
		}
	});
}());

//运单折线图 回调函数
(function() {
	$class('nssoft.openApi.getLineChartData.api').extend(nssoft.absAPI).define({
		onSuccess : function(status, res) {
			if (res.errCd === 0) {
				var result = res.result;
				if (result) {
					var seriesData = new Array();
					if (result.length) {	//判读返回数据是否为空
						for (var i = 1; i < result.length; i++) {
							seriesData[i-1] = result[i];
						}
					} 
					$('#linechartWaybill').highcharts({
						credits: {
					 		enabled:false
					 	},
					 	exporting: {
					 		enabled:false
					 	},
				        title: {
				            text: $diagram.waybillTitleLine,
				            x: -20 //center
				        },
				        xAxis: {
				            //categories: ['1月', '2月', '3月', '4月', '5月', '6月','7月', '8月', '9月', '10月', '11月', '12月']
				        	categories: result[0]
				        },
				        yAxis: {
				            title: {
				                text: '总票数（票）'
				            },
				            plotLines: [{
				                value: 0,
				                width: 1,
				                color: '#808080'
				            }]
				        },
				        tooltip: {
				            valueSuffix: ''
				        },
				        series: seriesData
				    });
					/*$('#linechartCost').highcharts({
						credits: {
					 		enabled:false
					 	},
					 	exporting: {
					 		enabled:false
					 	},
				        title: {
				            text: '各公司总成本折线图',
				            x: -20 //center
				        },
				        xAxis: {
				        	categories: $diagram.date
				        },
				        yAxis: {
				            title: {
				                text: '总成本（元）'
				            },
				            plotLines: [{
				                value: 0,
				                width: 1,
				                color: '#808080'
				            }]
				        },
				        tooltip: {
				            valueSuffix: ''
				        },
				        series: cost_series
				    });*/
					/*$('#linechartPrice').highcharts({
						credits: {
					 		enabled:false
					 	},
					 	exporting: {
					 		enabled:false
					 	},
				        title: {
				            text: '各公司总运费折线图',
				            x: -20 //center
				        },
				        xAxis: {
				        	categories: $diagram.date
				        },
				        yAxis: {
				            title: {
				                text: '总运费（元）'
				            },
				            plotLines: [{
				                value: 0,
				                width: 1,
				                color: '#808080'
				            }]
				        },
				        tooltip: {
				            valueSuffix: ''
				        },
				        series: price_series
				    });*/

				}
			} else {
				$alert(res.errMsg);
			}
		},
		onFail : function(status) {
			$alert('发生错误');
		}
	});
}());

//利润折线图 回调函数
(function() {
	$class('nssoft.openApi.getProfitLineData.api').extend(nssoft.absAPI).define({
		onSuccess : function(status, res) {
			if (res.errCd === 0) {
				var result = res.result;
				if (result) {
					var seriesData = new Array();
					if (result.length) {	//判读返回数据是否为空
						for (var i = 1; i < result.length; i++) {
							seriesData[i-1] = result[i];
						}
					} 
					$('#linechartProfit').highcharts({
						credits: {
					 		enabled:false
					 	},
					 	exporting: {
					 		enabled:false
					 	},
				        title: {
				            text: $diagram.profitTitleLine,
				            x: -20 //center
				        },
				        xAxis: {
				        	categories: result[0]
				        },
				        yAxis: {
				            title: {
				                text: '总利润（元）'
				            },
				            plotLines: [{
				                value: 0,
				                width: 1,
				                color: '#808080'
				            }]
				        },
				        tooltip: {
				            valueSuffix: ''
				        },
				        series: seriesData
				    });

				}
			} else {
				$alert(res.errMsg);
			}
		},
		onFail : function(status) {
			$alert('发生错误');
		}
	});
}());

//运费折线图 回调函数
(function() {
	$class('nssoft.openApi.getFareLineData.api').extend(nssoft.absAPI).define({
		onSuccess : function(status, res) {
			if (res.errCd === 0) {
				var result = res.result;
				if (result) {
					var seriesData = new Array();
					if (result.length) {	//判读返回数据是否为空
						for (var i = 1; i < result.length; i++) {
							seriesData[i-1] = result[i];
						}
					} 
					$('#linechartFare').highcharts({
						credits: {
					 		enabled:false
					 	},
					 	exporting: {
					 		enabled:false
					 	},
				        title: {
				            text: $diagram.fareTitleLine,
				            x: -20 //center
				        },
				        xAxis: {
				        	categories: result[0]
				        },
				        yAxis: {
				            title: {
				                text: '总运费（元）'
				            },
				            plotLines: [{
				                value: 0,
				                width: 1,
				                color: '#808080'
				            }]
				        },
				        tooltip: {
				            valueSuffix: ''
				        },
				        series: seriesData
				    });

				}
			} else {
				$alert(res.errMsg);
			}
		},
		onFail : function(status) {
			$alert('发生错误');
		}
	});
}());


//运单柱状图 扇形图 回调函数
(function() {
	$class('nssoft.openApi.getGraphData.api').extend(nssoft.absAPI).define({
		onSuccess : function(status, res) {
			if (res.errCd === 0) {
				var result = res.result;
				if (result) {
					if (result.length) {
						for (var i = 0; i < result.length; i++) {
							if (result[i].total_waybill != null) {	//获取各公司的总票数
								$diagram.fan_total_waybill[i] = [result[i].sender_nm_cn,parseFloat(result[i].total_waybill)];
							} else {
								result[i].total_waybill = 0;
								$diagram.fan_total_waybill[i] = [result[i].sender_nm_cn,result[i].total_waybill];
							}
						}
						
						for (var i = 0; i < result.length; i++) {
							if (result[i].sender_nm_cn != null) {	//获取各公司名称
								$diagram.total_sender_nm[i] = result[i].sender_nm_cn;
							} else {
								result[i].sender_nm_cn = "获取公司名称出错了";
								$diagram.total_sender_nm[i] = result[i].sender_nm_cn;
							}
							if (result[i].total_waybill != null) {	//获取各公司的总票数
								$diagram.total_waybill[i] = parseFloat(result[i].total_waybill);
							} else {
								result[i].total_waybill = 0;
								$diagram.total_waybill[i] = result[i].total_waybill;
							}
						}
					}
					
					//各公司总票数柱状图
					 $('#histogramWaybill').highcharts({
						 	credits: {
						 		enabled:false
						 	},
						 	exporting: {
						 		enabled:false
						 	},
					        chart: {
					            type: 'column'
					        },
					        title: {
					            text: $diagram.waybillTitleHist
					        },
					        /*subtitle: {
					            text: 'Source: WorldClimate.com'
					        },*/
					        legend: {	//隐藏小方块说明
					            enabled: false
					        },
					        xAxis: {
					            categories: $diagram.total_sender_nm
					        },
					        yAxis: {
					            title: {
					                text: '总票数（票）'
					            }
					        },
					        tooltip: {
					            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
					            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
					                '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
					            footerFormat: '</table>',
					            shared: true,
					            useHTML: true
					        },
					        plotOptions: {
					            column: {
					                pointPadding: 0.2,
					                borderWidth: 0
					            },
					        },
					        series: [{
					            name: '总票数',
					            data: $diagram.total_waybill,
					        }]
					    });
					//各公司总票数扇形图
					 $('#fanchartWaybill').highcharts({
						 credits: {
					          enabled:false
						 	},
						 exporting: {
							  enabled:false
							},
						chart: {
					          plotBackgroundColor: null,
					          plotBorderWidth: null,
					          plotShadow: false
					        },
					    title: {
					          text: $diagram.waybillTitleFan
					        },
					        /*tooltip: {
					    	    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
					        },*/
					    plotOptions: {
					        pie: {
					           allowPointSelect: true,
					           cursor: 'pointer',
					           dataLabels: {
					               enabled: true,
					               color: '#000000',
					               connectorColor: '#000000',
					               format: '<b>{point.name}</b>: {point.percentage:.1f} %'
					             },
					           showInLegend: true
					          }
					       },
					     series: [{
					            type: 'pie',
					            name: '总票数',
					            data: $diagram.fan_total_waybill
					        }]
					    });
				}
			} else {
				$alert(res.errMsg);
			}
		},
		onFail : function(status) {
			$alert('发生错误');
		}
	});
}());

//利润柱状图 扇形图 回调函数
(function() {
	$class('nssoft.openApi.getProfitGraphData.api').extend(nssoft.absAPI).define({
		onSuccess : function(status, res) {
			if (res.errCd === 0) {
				var result = res.result;
				if (result) {
					if (result.length) {
						for (var i = 0; i < result.length; i++) {
							if (result[i].pure_profit != null) {	//获取各公司的总利润
								$diagram.fan_total_profit[i] = [result[i].sender_nm_cn,parseFloat(result[i].pure_profit)];
							} else {
								$diagram.fan_total_profit[i] = [result[i].sender_nm_cn,0];
							}
						}
						for (var i = 0; i < result.length; i++) {
							if (result[i].sender_nm_cn != null) {	//获取各公司名称
								$diagram.total_sender_nm[i] = result[i].sender_nm_cn;
							} else {
								result[i].sender_nm_cn = "获取公司名称出错了";
								$diagram.total_sender_nm[i] = result[i].sender_nm_cn;
							}
							if (result[i].pure_profit != null) {	//获取各公司的总利润
								$diagram.total_profit[i] = parseFloat(result[i].pure_profit);
							} else {
								$diagram.total_profit[i] = 0;
							}
						}
					}
					
					//各公司总利润柱状图
					 $('#histogramProfit').highcharts({
						 	credits: {
						 		enabled:false
						 	},
						 	exporting: {
						 		enabled:false
						 	},
					        chart: {
					            type: 'column'
					        },
					        title: {
					            text: $diagram.profitTitleHist
					        },
					        legend: {	//隐藏小方块说明
					            enabled: false
					        },
					        xAxis: {
					            categories: $diagram.total_sender_nm
					        },
					        yAxis: {
					            title: {
					                text: '利润'
					            }
					        },
					        tooltip: {
					            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
					            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
					                '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
					            footerFormat: '</table>',
					            shared: true,
					            useHTML: true
					        },
					        plotOptions: {
					            column: {
					                pointPadding: 0.2,
					                borderWidth: 0
					            },
					        },
					        series: [{
					            name: '总利润',
					            data: $diagram.total_profit,
					        }]
					    });
					//各公司总利润扇形图
					 $('#fanchartProfit').highcharts({
						 credits: {
					          enabled:false
						 	},
						 exporting: {
							  enabled:false
							},
						chart: {
					          plotBackgroundColor: null,
					          plotBorderWidth: null,
					          plotShadow: false
					        },
					    title: {
					          text: $diagram.profitTitleFan
					        },
					        tooltip: {
					    	    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
					        },
					    plotOptions: {
					        pie: {
					           allowPointSelect: true,
					           cursor: 'pointer',
					           dataLabels: {
					               enabled: true,
					               color: '#000000',
					               connectorColor: '#000000',
					               format: '<b>{point.name}</b>: {point.percentage:.1f} %'
					             },
					           showInLegend: true
					          }
					       },
					     series: [{
					            type: 'pie',
					            name: '总利润',
					            data: $diagram.fan_total_profit
					        }]
					    });
				}
			} else {
				$alert(res.errMsg);
			}
		},
		onFail : function(status) {
			$alert('发生错误');
		}
	});
}());

//运费柱状图 扇形图 回调函数
(function() {
	$class('nssoft.openApi.getFareGraphData.api').extend(nssoft.absAPI).define({
		onSuccess : function(status, res) {
			if (res.errCd === 0) {
				var result = res.result;
				if (result) {
					if (result.length) {
						for (var i = 0; i < result.length; i++) {
							if (result[i].fare != null) {	//获取各公司的总运费
								$diagram.fan_total_fare[i] = [result[i].sender_nm_cn,parseFloat(result[i].fare)];
							} else {
								$diagram.fan_total_fare[i] = [result[i].sender_nm_cn,0];
							}
						}
						for (var i = 0; i < result.length; i++) {
							if (result[i].sender_nm_cn != null) {	//获取各公司名称
								$diagram.total_sender_nm[i] = result[i].sender_nm_cn;
							} else {
								result[i].sender_nm_cn = "获取公司名称出错了";
								$diagram.total_sender_nm[i] = result[i].sender_nm_cn;
							}
							if (result[i].fare != null) {	//获取各公司的总运费
								$diagram.total_fare[i] = parseFloat(result[i].fare);
							} else {
								$diagram.total_fare[i] = 0;
							}
						}
					}
					
					//各公司总运费柱状图
					 $('#histogramFare').highcharts({
						 	credits: {
						 		enabled:false
						 	},
						 	exporting: {
						 		enabled:false
						 	},
					        chart: {
					            type: 'column'
					        },
					        title: {
					            text: $diagram.fareTitleHist
					        },
					        legend: {	//隐藏小方块说明
					            enabled: false
					        },
					        xAxis: {
					            categories: $diagram.total_sender_nm
					        },
					        yAxis: {
					            title: {
					                text: '运费'
					            }
					        },
					        tooltip: {
					            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
					            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
					                '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
					            footerFormat: '</table>',
					            shared: true,
					            useHTML: true
					        },
					        plotOptions: {
					            column: {
					                pointPadding: 0.2,
					                borderWidth: 0
					            },
					        },
					        series: [{
					            name: '总运费',
					            data: $diagram.total_fare,
					        }]
					    });
					//各公司总运费扇形图
					 $('#fanchartFare').highcharts({
						 credits: {
					          enabled:false
						 	},
						 exporting: {
							  enabled:false
							},
						chart: {
					          plotBackgroundColor: null,
					          plotBorderWidth: null,
					          plotShadow: false
					        },
					    title: {
					          text: $diagram.fareTitleFan
					        },
					        tooltip: {
					    	    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
					        },
					    plotOptions: {
					        pie: {
					           allowPointSelect: true,
					           cursor: 'pointer',
					           dataLabels: {
					               enabled: true,
					               color: '#000000',
					               connectorColor: '#000000',
					               format: '<b>{point.name}</b>: {point.percentage:.1f} %'
					             },
					           showInLegend: true
					          }
					       },
					     series: [{
					            type: 'pie',
					            name: '总运费',
					            data: $diagram.fan_total_fare
					        }]
					    });
				}
			} else {
				$alert(res.errMsg);
			}
		},
		onFail : function(status) {
			$alert('发生错误');
		}
	});
}());