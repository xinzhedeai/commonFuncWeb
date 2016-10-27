'use strict';

/**
 * 
 * @functionName: datagridViewEasyUI
 * @Description:扩展easyUI的datagridView
 * @param:
 */
// $.fn.datagrid.defaults.view
var datagridViewEasyUI = $.extend({}, $.fn.datagrid.defaults.view, {
	onAfterRender : function(target) {
		$.fn.datagrid.defaults.view.onAfterRender.call(this, target);
		var vc = $(target).datagrid('getPanel').children('div.datagrid-view').children('.datagrid-view2');
		vc.parent('div.datagrid-view').css('background', 'none');
		vc.children('div.datagrid-empty').remove();
		if (!$(target).datagrid('getRows').length) {
			vc.parent('div.datagrid-view').css('background-color', '#efefef');
			$('<div class="datagrid-empty"></div>').html('<img src="../lib/img/pic/pic_empty.png"/><p>未查询到数据</p>').appendTo(vc);
		}
		if ($(target).parents('.popupWrapper').length) {
			vc.parents('.datagrid-wrap').find('.datagrid-pager table').css('margin-left', (vc.parents('.datagrid-wrap').find('.datagrid-pager').width() - vc.parents('.datagrid-wrap').find('.datagrid-pager table').width()) / 2);
		}
		//填充窗口
		fillWindow();
	}
});

/**
 * 
 * @functionName: datagridEasyUI
 * @Description: 自定义easyUI的create datagrid 方法
 * @param: options
 */
jQuery.fn.datagridEasyUI = function() {
	if (arguments.length === 1) {
		var options = arguments[0], datagridElement = this,
		options_extend = { 
			view : datagridViewEasyUI,
			checkOnSelect : false,
			selectOnCheck : false,
			singleSelect : true,
			nowrap : false,
			loadFilter : function(data) {
				if (data && data.errCd === 0 && data.result) {
					data = data.result;
				} else if (data && data.rows) {
					data = data;
				} else {
					if (data.errCd === -600) {
				    	$alert(data.errMsg, function() {
				    		delCookie('access-token');
				    		window.location.href = '/login.html';
				    	});
				    } else {
				     	$alert('Error: ' + data.errMsg + '(' + data.errCd + ')');
				    }
					data = {
						'total' : 0,
						'summarys' : null,
						'rows' : []
					};
				}
				if (data.summarys) {
					var summaryLi = $(this).parents('.datagrid').prevAll('.membership:eq(0)').find('ul li');
					for (var x in data.summarys) {
						summaryLi.eq(x).children('span').text(data.summarys[x]);
					}
				} else {
					$(this).parents('.datagrid').prevAll('.membership:eq(0)').find('ul li span').text(0);
				}
				return data;
			},
			onLoadSuccess : function(data) {
				//如果跨页选择：off
				if($(this).parents('.datagrid-view').next().find('.crossPageSwitch').length && !($(this).parents('.datagrid-view').next().find('.crossPageSwitch').switchbutton('options').checked)) { 
	            	$(this).datagrid('clearChecked'); //uncheck所有行
				}
				//如果条件操作：on
				if($(this).parents('.datagrid-view').next().find('.conditionSwitch').length && ($(this).parents('.datagrid-view').next().find('.conditionSwitch').switchbutton('options').checked)) { 
					$(this).prev().find('.datagrid-header, .datagrid-body').find('table tbody tr td[field="ck"] input[type="checkbox"]').attr('disabled', true) //disable checkbox 列
					$('.datagrid-row,.datagrid-header-row').find('td[field="ck"] input[type="checkbox"]').attr('disabled', true) //disable checkbox 列
				}
				//如果是datagrid在dialog中，则隐藏datagrid中的表单元素，并使dialog居中
				if ($(this).parents('.popupWrapper').length) {
					$(this).parents('.popupWrapper:eq(0)').setDialogCenter();
					if ($(this).parents('.popupWrapper:eq(0)').find('.formMark:hidden').length) {
						//$(this).parents('.datagrid').hideForm();
					}
				}
				//如果一个页面中左右各有一个datagrid,则右边的datagrid的高度向左边看齐
				if ($(this).parents('.leftPart').length && $(this).parents('.leftPart').nextAll('.rightPart:eq(0)').find('.datagrid').length) {
					var dgRight = '#' + $(this).parents('.leftPart').nextAll('.rightPart:eq(0)').find('.datagrid .datagrid-view').children('table').attr('id'),
					height = $(this).parents('.datagrid-view').height() - 76;
					height = height > 400 ? height : 400;
					$(dgRight).datagrid('resize', {height: height});
				}
				if (!$(this).datagrid('options').fitColumns) {
					if(data.total) {
						$(this).datagrid('getPanel').find('div.datagrid-view .datagrid-view2 .datagrid-body').css({height: 'auto', overflow: 'auto'});				
					} else {
						$(this).datagrid('getPanel').find('div.datagrid-view').css({height: '141px'}).find('.datagrid-view2 .datagrid-body').css({height: '12px', overflow: 'hidden'});
					}
				}
			},
			onLoadError : function(e) {
			    $(this).datagrid('loadData', {}); 
			    $alert('Error: ' + e.statusText + '(' + e.status + ')');
			 },
			onBeforeLoad : function(param) { //liuliang
				var pageName = getPageName();
				pageName = pageName.replace('-','');
				if ($(this).parents('.popupWrapper').length){ 	//判断是否为dialog中的datagrid
					
				} else if ($(this).parents('.leftPart').length) {	//判断是否为页面左侧的datagrid
					//setCookie(pageName,JSON.stringify(param),"1");
					if (getCookie("map")) {
						var getMap = $.parseJSON(getCookie("map"));
						getMap[pageName] = JSON.stringify(param);
						setCookie("map",JSON.stringify(getMap),"1");
					} else {
						var newMap = {};
						newMap[pageName] = JSON.stringify(param);
						setCookie("map",JSON.stringify(newMap),"1");
					}
				} else if ($(this).parents('.rightPart').length){	//判断是否为页面右侧的datagrid
					
				} else {	//主页面中只有一个datagrid
					//setCookie(pageName,JSON.stringify(param),"1");
					if (getCookie("map")) {
						var getMap = $.parseJSON(getCookie("map"));		//获取Cookie中的数据,json格式
						getMap[pageName] = JSON.stringify(param);	//对json中相应键值对赋值
						setCookie("map",JSON.stringify(getMap),"1");	//将最新的json数据存入Cookie
					} else {
						var newMap = {};	//创建新的json
						newMap[pageName] = JSON.stringify(param);	//创建键值对
						setCookie("map",JSON.stringify(newMap),"1");	//存入cookie
					}
				}
			}
		};
		if (options.crossPageSwitch || options.conditionSwitch || options.scrollSwitch) {
			$(this).after('<div class="pagerButtons"></div>');
			//跨页选择开关
			if (options.crossPageSwitch) {
				$(this).next().append('<span style="margin-right: 8px;">跨页选择:<input class="crossPageSwitch" style="width: 40px; height: 18px;" checked /></span>');
				$(this).next().find('.crossPageSwitch').switchbutton({
					width : 30,
					onText : '',
					offText : '',
				    checked : localStorage.crossPageSwitch === 'off' ? false : true,
				    onChange : function(checked) {
				    	localStorage.crossPageSwitch = checked ? 'on' : 'off';
				        if (!checked) {
				        	var allCheckedRows = $(datagridElement).datagrid('getChecked').slice(0), recentPageRows = $(datagridElement).datagrid('getRows');
				        	$(datagridElement).datagrid('clearChecked'); //uncheck所有行
				        	if (allCheckedRows && recentPageRows) {//check当前页
				        		for (var i = 0; i < allCheckedRows.length; i++) {
				        			var index = $(datagridElement).datagrid('getRowIndex', allCheckedRows[i]);
				        			if (index > -1) {
				        				$(datagridElement).datagrid('checkRow', index);
				        			}
				        		}
							}
				        }
				    }
				});
				options.crossPageSwitch = undefined;
			}
			//条件操作开关
			if (options.conditionSwitch) {
				$(this).next().append('<span style="margin-right: 8px;">条件操作:<input class="conditionSwitch" style="width: 40px; height: 18px;" /></span>');
				$(this).next().find('.conditionSwitch').switchbutton({
					width : 30,
					onText : '',
					offText : '',
				    checked : localStorage.conditionSwitch === 'on' ? true : false,
				    onChange : function(checked) {
				    	localStorage.conditionSwitch = checked ? 'on' : 'off';
				    	if (checked) { //打开条件操作
//				        	console.info($(datagridElement).prev().find('.datagrid-header, .datagrid-body').find('table tbody tr td[field="ck"] input[type="checkbox"]'));
				        	$(datagridElement).datagrid('clearChecked'); //uncheck所有行
				        	$(datagridElement).prev().find('.datagrid-header, .datagrid-body').find('table tbody tr td[field="ck"] input[type="checkbox"]').attr('disabled', true) //disable checkbox 列
				        	$('.datagrid-row,.datagrid-header-row').find('td[field="ck"] input[type="checkbox"]').attr('disabled', true) //disable checkbox 列
				        } else { //关闭条件操作
				        	$(datagridElement).prev().find('.datagrid-header, .datagrid-body').find('table tbody tr td[field="ck"] input[type="checkbox"]').attr('disabled', false) //enable checkbox 列
				        	$('.datagrid-row,.datagrid-header-row').find('td[field="ck"] input[type="checkbox"]').attr('disabled', false) //disable checkbox 列
				        }
				    }
				});
				options.conditionSwitch = undefined;
			}
			//滚动显示开关
			if (options.scrollSwitch) {
				$(this).next().append('<span style="margin-right: 8px;">滚动显示:<input class="scrollSwitch" style="width: 40px; height: 18px;" /></span>');
				$(this).next().find('.scrollSwitch').switchbutton({
					width : 30,
					onText : '',
					offText : '',
				    checked : localStorage.scrollSwitch === 'off' ? false : true,
				    onChange : function(checked) {
				    	localStorage.scrollSwitch = checked ? 'on' : 'off';
				        if (checked) { //打开滚动显示
				        	if ($(window).scrollTop() >= $(datagridElement).parents('.datagrid').offset().top) {
				        		$(window).scrollTop($(datagridElement).parents('.datagrid').offset().top);
				        	}
				        } else { //关闭滚动显示
							$(datagridElement).datagrid('resize', {height: 'auto'});
				        }
				    }
				});
				options.scrollSwitch = undefined;
			}
		}
		//是否展示细节
		if (options.detailView) {
			$.extend(options_extend.view, detailview);
			options.detailView = undefined;
		}
		$.extend(options, options_extend);
		if ($(this).parents('.popupWrapper').length) {
			$(this).parents('.popupWrapper:eq(0)').show();
		}
		//创建datagrid
		$(this).datagrid(options); 
		if ($(this).parents('.popupWrapper').length) {
			$(this).parents('.popupWrapper:eq(0)').hide();
		}
		if (options.pagination) {
			var pager = $(this).datagrid('getPager'); // get the pager of datagrid
			var buttons = '', pagination = {};
			if ($(this).parents('.datagrid').next().hasClass('pagerButtons')) {
				buttons = $(this).parents('.datagrid').next();
				pagination.buttons = buttons;
			}
			if ($(this).parents('.popupWrapper').length) {
				pagination.layout = ['first', 'prev', 'next', 'last'];
			}
			pager.pagination(pagination);
		}
	} else {
		alert('datagridEasyUI : 参数错误, 支持1个参数(options)');
	}
} 

/**
 * @functionName: downloadFileEasyUI
 * @Description: 自定义下载方法,datagrid下载或表单下载
 * @param: option {
 * 			url: 必填
 * 			field: 必填,datagrid主键列或表单主键域
 * 			button: 触发下载事件的按钮
 * 			param: 选填, 附加参数,值 {pram1: val1, pram2: val2, ...}
 * 			callback: 选填, 是否有回调函数, 值为true或false
 * 			success: 选填, 回调函数, 值 function
 * 		}
 * @desc 下载easyui文件方法调用
 * $('#dldBtn').click(function() { 
 * 		$($gridDetail.datagrid).downloadFileEasyUI({url : '/v1/api/test/sample/exporter/samples.excel', field : ['id'], button : this});
 * });
 * 
 */
jQuery.fn.downloadFileEasyUI = function() {
	if (arguments.length === 1) {
		var option = arguments[0], url = option.url, field = option.field, button = option.button, queryParam = option.param;
		queryParam = queryParam ? queryParam : {};
		if (this[0].tagName === 'TABLE') { //datagrid下载
			queryParam.operate_type = '01';
			if($(this).parents('.datagrid-view').next().find('.conditionSwitch').length && ($(this).parents('.datagrid-view').next().find('.conditionSwitch').switchbutton('options').checked)) { 
				//如果条件操作：on
				queryParam.operate_type = '02';
				queryParam.params = JSON.stringify(serializeObject($(this).parents('.datagrid').prevAll('.searchForm:eq(0)')));
				$confirm('确认要按查询条件下载吗？', function() {
					downloadByForm({url : url, param : queryParam, button : button, callback : option.callback, success : option.success});
				});
			} else {
				var rows = $(this).datagrid('getChecked');
				if (rows.length) {
					var ids = [];
					for (var i=0; i<rows.length; i++) {
						if (field.length > 1) {
							var obj = new Object();
							for (var j=0; j<field.length; j++) {
								obj[field[j]] = rows[i][field[j]];
							}
							ids.push(obj);
						} else {
							ids.push(rows[i][field[0]]);
						}
					}
					queryParam.params = JSON.stringify(ids);
					$confirm('共选择了' + rows.length + '条数据，确认要下载吗？', function() {
						downloadByForm({url : url, param : queryParam, button : button, callback : option.callback, success : option.success});
					});
				} else {
					$alert('请选择要下载的数据。');
				}
			}
		} else if (this[0].tagName === 'FORM') { //表单下载
			var formObj = serializeObject($(this));
			$.each(field, function(i, field) {
				queryParam[field] = formObj[field];
			});
			$confirm('确认要下载吗？', function() {
				downloadByForm({url : url, param : queryParam, button : button, callback : option.callback, success : option.success});
			});
		}
	} else {
		alert('downloadFileEasyUI : 参数错误, 支持1个参数(option{url, field, button, param-选填, callback-选填, success-选填})');
	}
} 

/**
 * 
 * @functionName: getIdsDatagridEasyUI
 * @Description: 获得datagrid中选中行的ids
 * @author: Double
 * @param: idFields [idField1, idField2, ...]
 * 
 */
jQuery.fn.getIdsDatagridEasyUI = function() {
	if (arguments.length === 1) {
		var rows = $(this).datagrid('getChecked'), idFields = arguments[0], ids = [];
		rows = rows.length ? rows : $(this).datagrid('getRows');
		for (var i=0; i<rows.length; i++) {
			if (idFields.length > 1) {
				var obj = new Object();
				for (var j=0; j<idFields.length; j++) {
					obj[idFields[j]] = rows[i][idFields[j]];
				}
				ids.push(obj);
			} else {
				ids.push(rows[i][idFields[0]]);
			}
		}
		$(this).datagrid('clearChecked');
		return JSON.stringify(ids);
	} else {
		$alert('getIdsDatagridEasyUI : 参数错误, 支持1个参数(idFields)');
	}
} 

/**
 * @functionName: conditionOperatingEasyUI
 * @Description: 基于easyui datagrid的条件操作
 * @author: Double
 * @param: idFields [idField1, idField2, ...]-必填, noCondition-选填
 */
jQuery.fn.conditionOperatingEasyUI = function() {
	if (arguments.length >= 1 && arguments.length <= 2) {
		var conditionOperatingObj = {operate_type : '01'};
		if($(this).parents('.datagrid-view').next().find('.conditionSwitch').length && ($(this).parents('.datagrid-view').next().find('.conditionSwitch').switchbutton('options').checked)) { 
			//如果条件操作：on
			if (arguments[1] !== 'noCondition') {
				conditionOperatingObj.operate_type = '02';
				conditionOperatingObj.params = JSON.stringify(serializeObject($(this).parents('.datagrid').prevAll('.searchForm:eq(0)')));
				return {msg: '确定要按查询条件', data: conditionOperatingObj};
			} else {
				$alert('此功能需要关闭条件操作。');
			}
		} else {
			var rows = $(this).datagrid('getChecked');
			if (rows.length) {
				var idFields = arguments[0], ids = [];
				for (var i=0; i<rows.length; i++) {
					if (idFields.length > 1) {
						var obj = new Object();
						for (var j=0; j<idFields.length; j++) {
							obj[idFields[j]] = rows[i][idFields[j]];
						}
						ids.push(obj);
					} else {
						ids.push(rows[i][idFields[0]]);
					}
				}
				var data = JSON.stringify(ids);
				if($(this).parents('.datagrid-view').next().find('.conditionSwitch').length) {
					conditionOperatingObj.params = data;
					data = conditionOperatingObj;
				}
				return {msg: '共选择' + ids.length + '条数据，确认要', data: data};
			} else {
				$alert('请选择要操作的数据。');
			}
		}
	} else {
		$alert('batchOperatingEasyUI : 参数错误, 支持2个参数(idFields-必填, noCondition-选填)');
	}
} 

/**
 * 
 * @functionName: 
 * @Description: datagrid a 元素动画效果
 * @author: Double
 * @param: 
 * 
 */
$(document).on('mouseenter', 'div.datagrid-body div.datagrid-cell a', function() {
	//$(this).text('[' + $(this).text() + ']');;
});
$(document).on('mouseleave', 'div.datagrid-body div.datagrid-cell a', function() {
	//$(this).text($(this).text().replace('[', '').replace(']', ''));
});

//easyUI验证扩展
//说明: easyUI自带验证有以下4个,有其他需要的在此处扩展
//	a. email：匹配E-Mail的正则表达式规则。
//	b. url：匹配URL的正则表达式规则。
//	c. length[0,100]：允许在x到x之间个字符。
//	d. remote['http://.../action.do','paramName']：发送ajax请求需要验证的值，当成功时返回true。
$.extend($.fn.validatebox.defaults.rules, {
	remote: {
		validator: function(value, url) {
			if($(this).next().has('textMark') && value == $(this).next().text()) {
				return true;
			} else {
				var data = {};
				data[this.name] = value;
				var response = $.ajax({
					url: contextPath + url[0],
					dataType: 'json',
					data: data,
					async: false,
					cache: false,
					type: 'post'
				}).responseText;
				response = $.parseJSON(response);
				return (response && response.errCd === 0 && response.result && response.result.success);
			}
		},
		message: '此名称已被占用'
	},
	equals: {    
        validator: function(value, param){    
            return value == $(param[0]).val();    
        },    
        message: '两次输入的密码不相同'   
    },
    intOrFloat : {
        validator : function(value) { 
            return /^\d+(\.\d+)?$/i.test(value); 
        }, 
        message : '请输入数字，并确保格式正确'
    }, 
	code: {
		validator: function(value) {
			return /^[0-9a-zA-Z\-_,.\s　]+$/.test(value); 
		},
		message: '只能填写字母、数字、下划线'
	},   
	chinese: {
		validator: function(value) {
			return /^[\u4e00-\u9fa5\-_，。\（）\s　]*$/.test(value); 
		},
		message: '只允许中文'
	},
	japanese: {
		validator: function(value) {
			return /^[\u0800-\u9fa5\-_、。\（）\s　]*$/.test(value); 
		},
		message: '只允许日文'
	},
	english: {
		validator: function(value) {
			return /^[0-9A-Za-z\-_,.:\""\&\()\s　]+$/.test(value); 
		},
		message: '只能填写英文、数字'
	},   
	integer: {
		validator: function(value) {
			return /^[+-]?[0-9]+\d*$/.test(value); 
		},
		message: '只能填写整数或负整数'
	},  
	integerPositive: {
		validator: function(value) {
			return /^[+]?[0-9]+\d*$/.test(value); 
		},
		message: '请填写非负整数'
	},
	number: {
		validator: function(value) {
			return /^([1-9]\d{0,3}|10000)$/.test(value); 
		},
		message: '只能填写1-8000整数'
	},
	decimal: {
		validator: function(value) {
			return /^\d{1,7}\.?\d{0,2}$/.test(value); 
		},
		message: '小数点后面最多填写两位'
	},
	decimalthree: {
		validator: function(value) {
			return /^\d{1,9}\.?\d{0,3}$/.test(value); 
		},
		message: '小数点后面最多填写三位'
	}, 
	decimalfour: {
		validator: function(value) {
			return /^\d{1,5}\.?\d{0,4}$/.test(value); 
		},
		message: '小数点后面最多填写四位'
	},  
	zip: {
		validator: function(value) {
			return /^\d{6,7}$/.test(value); 
		},
		message: '请输入正确邮编'
	},
	faxno: {
		validator: function(value) {
			return  /^(?!-)[0-9\-]{5,20}$/.test(value); 
		},
		message: '请输入正确传真号'
	}, 
	emails: {
		validator: function(value) {
			return  /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
		},
		message: '请输入有效的电子邮箱地址'
	},
	phone: {
		validator: function(value) {
			return  /^(?!-)[0-9\-]{5,20}$/.test(value);
		},
		message: '请输入正确电话号'
	},
	phoneL: {
		validator: function(value) {
			var lstr=value.replace(/-/g,"");
			return  /^1[34578]\d{9}$/.test(lstr);
		},
		message: '请输入正确手机号'
	},
	phoneN: {
		validator: function(value) {
			return  /^(13|15|18)\d{9}$/i.test(value);
		},
		message: '请输入正确手机号'
	},
	int_four: {
		validator: function(value) {
			return  /^[\d]{4}$/.test(value);
		},
		message: '请输入4位整数'
	},
	int_three: {
		validator: function(value) {
			return  /^[\d]{3}$/.test(value);
		},
		message: '请输入3位整数'
	},
	isfloat : {
		validator: function(value) {
			return  /^\d*\.{0,1}\d{0,1}$/.test(value);
		},
		message: '请输入数字'
	},
	isnum : {
		validator: function(value) {
			return  /\b\d{12}\b/.test(value);
		},
		message: '请输入12位数字'
	},
	spec : {
		validator: function(value) {
			return  /^\d{1,9}\*?\d{1,9}$/.test(value);
		},
		message: '请输入a*b格式规格'
	},
	specThree : {
		validator: function(value) {
			return  /^([1-9][0-9]*)[\*]([1-9][0-9]*)[\*]([1-9][0-9]*)$/.test(value);
		},
		message: '请输入a*b*c格式规格'
	},
	
	  minLength: {     
	      validator: function(value, param){   //value 为需要校验的输入框的值 , param为使用此规则时存入的参数
	          return value.length >= param[0];     
	      },     
	      message: '请输入最小{0}位字符.'    
	  },
	  chinen : {// 匹配中文，英文字母和数字及_ 
	        validator : function(value) { 
	            return /^[\u4e00-\u9fa50-9A-Za-z,，；_ ~ ( ) - - ！。\.;\:"'!]+$/.test(value); 
	        }, 
	        message : '含有非法字符' 
	    },
    isBankCard: {//允许输入16或19位
    	validator : function(value) { 
            return /^\d{4}(?:\s\d{4}){4}$/.test(value + "1") || /^\d{4}(?:\s\d{4}){3}$/.test(value); 
        }, 
        message : '请输入正确格式的银行卡号'
    	
    },
    isRightUrl: { 
    	validator : function(value) { 
            return /^(http(s)?:\/\/)?(www\.)?[\w-]+\.\w{2,4}(\/)?$/.test(value); 
        }, 
        message : '请输入正确的网址'
    },
    isInt: { 
    	validator : function(value) { 
            return /^-?[0-9]/.test(value); 
        }, 
        message : '只能输入整数'
    },
	oneInteger: {
		validator: function(value) {
			return /^[+]?[1-9]+\d*$/.test(value); 
		},
		message: '只能填写1-9整数'
	}
});

//扩展datagrid的行号自适应
$.extend($.fn.datagrid.methods, {
	fixRownumber: function(jq) {
		return jq.each(function() {
			var panel = $(this).datagrid("getPanel");
			//获取最后一行的number容器,并拷贝一份
			var clone = $(".datagrid-cell-rownumber", panel).last().clone();
			//由于在某些浏览器里面,是不支持获取隐藏元素的宽度,所以取巧一下
			clone.css({
				"position": "absolute",
				left: -1000
			}).appendTo("body");
			//更改宽度后对容器进行重新计算
			$(this).datagrid("resize");
			var width = clone.width("auto").width();
			//默认宽度是25,所以只有大于25的时候才进行fix
			if (width > 25) {
				//多加5个像素,保持一点边距
				$(".datagrid-header-rownumber,.datagrid-cell-rownumber", panel).width(width + 5);
				//修改了宽度之后,需要对容器进行重新计算,所以调用resize
				$(this).datagrid("resize");
				//一些清理工作
				clone.remove();
				clone = null;
			} else {
				//还原成默认状态
				$(".datagrid-header-rownumber,.datagrid-cell-rownumber", panel).removeAttr("style");
			}
		});
	}
});
/**
 *  起始日期与结束日期进行大小的判断(待测试)
 */
$.extend($.fn.validatebox.defaults.rules, {
	endTimeToStartTime: {
		validator: function(value, param) {
			if (value != null && value != "") {
				startTime2 = $(param[0]).datetimebox('getValue');
				var d1 = $.fn.datebox.defaults.parser(startTime2);
				var d2 = $.fn.datebox.defaults.parser(value);
				varify = d2 >= d1;
				return varify;
			}
			return true;
		},
		message: '終了時間を開始時間の前にしてください！'
	},
	startTimeToEndTime: {
		validator: function(value, param) {
			if (value != null && value != "") {
				endTime2 = $(param[0]).datetimebox('getValue');
				var d1 = $.fn.datebox.defaults.parser(endTime2);
				var d2 = $.fn.datebox.defaults.parser(value);
				varify = d2 <= d1;
				return varify;
			}
			return true;
		},
		message: '終了時間を開始時間の前にしてください！'
	}
});

/**
 * @functionName: hideAllValidation
 * @Description: 隐藏easyui的所有验证红框
 */
jQuery.fn.hideAllValidation = function() {
	$(this).find('.validatebox-invalid').removeClass('validatebox-invalid').end().find('.textbox-invalid').removeClass('textbox-invalid');
} 


$(function() {
	//消除验证红框
	$('form').hideAllValidation();
	
	//点击查询按钮，datagrid clear chenked
	$('.searchForm').prev('.searchBtns').children('button:eq(0)').click(function() {
		$('#' + $('.acticle .datagrid:eq(0) .datagrid-view').children('table').attr('id')).datagrid('clearChecked');
	});
	
	//timespinner
	$('span.textbox.spinner').css({height: '26px'});
	$('span.textbox.spinner input.textbox-text').css({height: '22px'});
});