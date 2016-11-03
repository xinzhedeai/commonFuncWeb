'use strict'
//清楚浏览器所有cocokie
function clearAllCookie() {  
    //获取所有Cookie，并把它变成数组  
    var cookies = document.cookie.split(";");  
    //循环每一个数组项，把expires设置为过去时间，这样很容易地消除了所有Cookie  
    for (var i = 0; i < cookies.length; i++) {  
        var cookie = cookies[i];  
        var eqPos = cookie.indexOf("=");  
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;  
        name = name.replace(/^\s*|\s*$/, "");//清除Cookie里的空格
        //选出不想被清掉的cookie名
        /*if(name == "un" || name == "pw" || name == "rmb"){
        	continue;
        }*/
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/"  
    }  
}
//
/**
 * 获取当前时间（带有时分秒）
 * d 是指new Date()出来的当前时间
 * num是指天数
 */
function getCurrentTimeHMS(d,num){
	var str='';
	var newDay = null;
	d.setDate(d.getDate()+num);
	str += formatDate(d) + ' ';
	str +=((d.getHours()>9)?d.getHours():("0"+d.getHours()))+':';
	str +=((d.getMinutes()>9)?d.getMinutes():("0"+d.getMinutes()))+':';
	str +=((d.getSeconds()>9)?d.getSeconds():("0"+d.getSeconds()));
	return str;
}

//Timstamp 函数， durian请求体用
/**
 * 知道为什么我的qinganlan项目为什么时间总是不标准。。
 * 可能是这个方法的原因
 */
function makeStamp(d) { // Date d
	var y = d.getFullYear(), M = d.getMonth() + 1, D = d.getDate(), h = d
			.getHours(), m = d.getMinutes(), s = d.getSeconds(), ss = d
			.getMilliseconds(),

	pad = function(x) {
		x = x + '';
		if (x.length === 1) {
			return '0' + x;
		}
		return x;
	};
	return y + pad(M) + pad(D) + pad(h) + pad(m) + pad(s) + pad(ss);
}

/**
 * 
 * @functionName:getPageName
 * @Description: 获取网页名称 
 * 
 */
function getPageName() {
	var pathname = window.location.pathname;
	if (pathname) {
		pathname = pathname.split('/');
		return pathname[pathname.length - 1].split('.')[0];
	} else {
		return '';
	}
}

/**
 * 
 * @functionName: getOS
 * @Description: 获取操作系统名称
 * 
 */
function getOS() {
	var ua = navigator.userAgent.toLowerCase();
	if (ua.indexOf('windows nt 6.3') != -1) {
		return 'Windows 8';
	} else if (ua.indexOf('windows nt 6.1') != -1) {
		return 'Windows 7';
	} else if (ua.indexOf('windows nt 6.0') != -1) {
		return 'Windows Vista';
	} else if (ua.indexOf('windows nt 5.2') != -1) {
		return 'Windows 2003';
	} else if (ua.indexOf('windows nt 5.1') != -1) {
		return 'Windows XP';
	} else if (ua.indexOf('windows nt 5.0') != -1) {
		return 'Windows 2000';
	} else if (ua.indexOf('windows') != -1 || ua.indexOf('win32') != -1) {
		return 'Windows';
	} else if (ua.indexOf('macintosh') != -1 || ua.indexOf('mac os x') != -1) {
		return 'Macintosh';
	} else if (ua.indexOf('adobeair') != -1) {
		return 'Adobeair';
	} else if (ua.indexOf('linux') != -1) {
		return 'Linux';
	} else if (ua.indexOf('iphone') != -1) {
		return 'iPhone';
	} else if (ua.indexOf('ipad') != -1) {
		return 'iPad';
	} else if (ua.indexOf('android') != -1) {
		return 'Android';
	} else {
		return 'Unknow';
	}
}

/**
 * 
 * @functionName: getNavigator
 * @Description: 获取浏览器类型
 * 
 */
function getNavigator() {
	var ua = navigator.userAgent.toLowerCase();
	if (ua.indexOf('chrome') != -1) {
		return 'Chrome';
	} else if (ua.indexOf('firefox') != -1) {
		return 'Firefox';
	} else if (ua.indexOf('safari') != -1) {
		return 'Safari';
	} else if (ua.indexOf('opera') != -1) {
		return 'Opera';
	} else if(ua.indexOf('trident') != -1 && ua.indexOf('rv:11') != -1) {
    return 'IE 11.0';
	} else if (ua.indexOf('msie 10.0') != -1) {
		return 'IE 10.0';
	} else if (ua.indexOf('msie 9.0') != -1) {
		return 'IE 9.0';
	} else if (ua.indexOf('msie 8.0') != -1) {
		return 'IE 8.0';
	} else {
		return 'Unknow';
	}
}

/**
 * 
 * @functionName: getParameter
 * @Description: 获取url上传递的参数值
 * 
 */
function getParameter(name) {
	var search = location.search;
	if(!search) {
		return false;
	}
	search = search.split('?')
	var data = search[1].split('=');
	if(search[1].indexOf(name) == (-1)) {
	    return '';
	    return;
	}
	if(search[1].indexOf('&') == (-1)) {
	    data = search[1].split('=');
	    return data[1];
	} else {
	    data = search[1].split('&'); 
	    for(var i = 0; i <= data.length - 1; i++){
	    	var l_data=data[i].split('=');
	        if(l_data[0] == name) {
	        	return l_data[1];
	        	break;
	        } else {
	        	continue;
	        }
	    }
	}
}

/**
 * 
 * @functionName: setParameter
 * @Description: 设置url上面传递的参数
 * 
 */
function setParameter() {
	if (arguments.length >= 1) {
		var url = arguments[0], paramsObj = arguments[1];
		if (paramsObj) {
			var parameter = '';
			for (var x in paramsObj) {
				parameter += x + '=' + paramsObj[x] + '&';
			}
			url += '?' + parameter.substr(0, parameter.length - 1);
		}
		return url;
	} else {
		alert('setParameter : 参数错误, 支持2个参数(url-必填, paramsObj)');
	}
}
/**
 * 
 * @functionName: encrypt
 * @Description: 加密--常用于登陆时存账号密码cookie加密
 * @param: code
 */
function encrypt(code)  
{    
   var c=String.fromCharCode(code.charCodeAt(0)+code.length);  
   for(var i=1;i<code.length;i++){  
   c+=String.fromCharCode(code.charCodeAt(i)+code.charCodeAt(i-1));  
   }
   return c;
} 

/**
 * 
 * @functionName: decrypt
 * @Description: 解密
 * @param: code
 */
function decrypt(code)  
{  
   code=unescape(code);  
   var c=String.fromCharCode(code.charCodeAt(0)-code.length);  
   for(var i=1;i<code.length;i++){  
   c+=String.fromCharCode(code.charCodeAt(i)-c.charCodeAt(i-1));  
   }  
   return c;  
} 

/**
 * 
 * @functionName: trim
 * @Description: 由于IE8不支持trim方法，此处自定义 
 */
String.prototype.trim = function() {  
    return this.replace(/(^\s*)|(\s*$)/g, '');  
}

/**
 * @functionName: setCookie
 * @Description: 设置缓存
 */
function setCookie(name, value, days) { 
	var len = arguments.length; 
	if (len == 2) {
	    var exp = new Date(); 
	    exp.setTime(exp.getTime() + 30*24*60*60*1000); 
	    document.cookie = name + '=' + escape (value) + ';expires=' + exp.toGMTString() + ';path=/'; 
	} else if (len == 3) {
		var exp = new Date();
		exp.setDate(exp.getDate() + parseInt(days));
		exp.setHours(1, 0, 0, 0);
		document.cookie = name + '=' + escape (value) + ';expires=' + exp.toGMTString() + ';path=/';
	} else {
		alert('SetCookie参数错误!');
	}
} 

/**
 * 
 * @functionName: getCookie
 * @Description: 获取缓存
 * 
 */
function getCookie(name) { 
    var arr,reg=new RegExp('(^| )'+name+'=([^;]*)(;|$)');
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]); 
    else 
        return null; 
} 

/**
 * 
 * @functionName: jumpBack
 * @Description: 从详情页跳回
 * 
 */
function jumpBack(destination) {
	var from = getParameter('from');
	if (!from || from == destination) {
		window.location.href = destination + '.html';
	} else {
	    window.close();
	}
}

/**
 * 
 * @functionName: delCookie
 * @Description: 删除缓存
 * 
 */
function delCookie(name) { 
    var exp = new Date(); 
    exp.setTime(exp.getTime() - 1); 
    var cval = getCookie(name); 
    if(cval != null) 
        document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString() + ';path=/'; 
}

/**
 * 
 * @functionName: serializeObject
 * @Description: form序列化成object
 * @param: form
 */
var serializeObject = function() {
	if (arguments.length === 1) {
		var form = arguments[0], o = {};
		$.each(form.serializeArray(), function(index) {
			if (o[this['name']]) {
				o[this['name']] = o[this['name']] + ',' + this['value'].trim();
			} else {
				o[this['name']] = this['value'].trim();
			}
		});
		return o;
	} else {
		alert('serializeObject : 参数错误, 支持1个参数(form)');
	}
};
/**
 * 
 * @functionName: exportFileByForm
 * @Description: form表单导出文件
 */
function exportFileByForm(url, params, button) {
	var orgText = $(button).text();
	$(button).text('下载中...');
	$(button).attr('disabled', false);
	
	setTimeout("$('" + button + "').text('" + orgText + "');$('" + button + "').attr('disabled', false);", 2000);
	
	var form = $('<form>');
    form.attr('style', 'display:none');
    form.attr('target', '');
    form.attr('method', 'post');
    form.attr('action', url);
    
    $('body').append(form);
    
    for(var i = 0; i < params.length; i++) {
    	var input = $('<input>'); 
        input.attr('type', 'hidden'); 
        input.attr('name', params[i].name); 
        input.attr('value', params[i].value); 
        form.append(input);
    }
    form.submit();
}

/**
 * @functionName: downloadByForm
 * @Description: form表单下载文件
 * @param: option {
 * 			url, 
 * 			param, 
 * 			button, 
 * 			callback: 选填, 是否有回调函数, 值 true|false
 * 			success: 选填, 回调函数, 值 function
 * 		}
 * @desc  调用方法：
 * 		var field = ["waybill_no"], queryParam = {};
		//queryParam.operate_type = '01';//配合条件操作
		var rows = $($productClassify.datagridDelivery).datagrid("getChecked");
		if (rows) {
			var ids = [];
			ids.push(rows[0][field[0]]);
			//将选中行的id都赋值给params
			queryParam.params = JSON.stringify(ids);
			downloadByForm({url : '/v1/api/productReg/export/export-waybillno.excel', param : queryParam, button : this, callback : true, success : function() {
				//下载文件成功后回调函数
			}});
		}
 */
function downloadByForm() {
	if (arguments.length === 1) {
		var option = arguments[0], url = option.url, param = option.param, button = option.button, orgText = $(button).text();
//		var url = arguments[0], param = arguments[1], button = arguments[2], orgText = $(button).text();
		$(button).addClass('btnDisabled');
		$(button).attr('disabled', true);
		if (!(typeof button === 'string')) {
			button = '#' + button.id;
		}
			
		if (option.callback) {
	    	param.process_id = makeStamp(new Date());
	  } else {
		  if (!$(button).hasClass('btnImg')) {
			  $(button).text('下载中...');
			  setTimeout("$('" + button + "').text('" + orgText + "'); $('" + button + "').removeClass('btnDisabled'); $('" + button + "').attr('disabled', false);", 2000);
		  } else {
			  var buttonHoverTitle = $(button).parent().next();
			  buttonHoverTitle.html('<p style="left: ' + ($(button).offset().left - buttonHoverTitle.offset().left - 2) + 'px;">下载中...</p>');
			  setTimeout(function() {
				  $(button).parent().next().html('');
				  $(button).removeClass('btnDisabled'); 
				  $(button).attr('disabled', false);
			  }, 2000);
		  }
	  }
		 
		var form = $('<form>');
	    form.attr('style', 'display:none');
	    form.attr('target', 'downloadFrame');
	    form.attr('method', 'post');
	    form.attr('action', contextPath + url);
//	    form.attr('id', 'form');
	    
	    $('body').append(form);
	    for (var x in param) {
	    	var input = $('<input>'); 
	        input.attr('type', 'hidden'); 
	        input.attr('name', x); 
	        input.attr('value', param[x]); 
	        form.append(input);
	    }
	    form.submit();
	    if (option.callback) {
	    	 if (!$(button).hasClass('btnImg')) {
	    		 $(button).text('处理中...');
			 } else {
				 var buttonHoverTitle = $(button).parent().next();
				 buttonHoverTitle.html('<p style="left: ' + ($(button).offset().left - buttonHoverTitle.offset().left - 2) + 'px;">处理中...</p>');
			 }
	    	setTimeout(function() {
	    		var getProcessStatusCount = 0,
	    		getProcessStatusInterval = setInterval(function() {
		    		$.post(contextPath + '/v1/api/common/get-process-status.json', {process_id : param.process_id}, function(res) {
			    		if (res.errCd === 0) {
			    			var result = res.result;
			    			if (result) {
			    				if (result.success) {
			    					if (!$(button).hasClass('btnImg')) {
			    			    		 $(button).text('下载中...');
			    			    		 setTimeout("$('" + button + "').text('" + orgText + "'); $('" + button + "').removeClass('btnDisabled'); $('" + button + "').attr('disabled', false);", 2000);
			    					} else {
			    						var buttonHoverTitle = $(button).parent().next();
			    						 buttonHoverTitle.html('<p style="left: ' + ($(button).offset().left - buttonHoverTitle.offset().left - 2) + 'px;">下载中...</p>');
			    						 setTimeout(function() {
			    							  $(button).parent().next().html('');
			    							  $(button).removeClass('btnDisabled'); 
			    							  $(button).attr('disabled', false);
			    						  }, 2000);
			    					}
									if (option.success instanceof Function) {
										option.success();
									}
									clearInterval(getProcessStatusInterval);
			    				} else {
			    					if (getProcessStatusCount === 149) {
			    						clearInterval(getProcessStatusInterval);
			    					} else {
			    						getProcessStatusCount += 1;
			    					}
			    				}
			    			}
			    		} else {
			    			$alert(res.errMsg);
			    		}
			    	});
	    		}, 2000);
	    	}, 500);
	  	}
	} else {
		alert('downloadByForm : 参数错误, 支持1个参数(option{url, param, button, callback-选填, success-选填})');
	}
}

/**
 * 
 * @functionName: formatDate
 * @Description: 格式化Date对象
 * @param: date, symbol-选填
 */
function formatDate() {  
	if (arguments.length > 0 && arguments.length < 3) {
		var date = arguments[0], symbol = (arguments[1] ? arguments[1] : '-');
		if (!date) {
			return '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
		}
		if (!(date instanceof Date)) {
			date = date.split(/\s/)[0].split('-');
			date = new Date(date[0], parseInt(date[1]) - 1, date[2]);
		}
		var year = date.getFullYear(), month = date.getMonth() + 1, day = date.getDate();
		month = month < 10 ? '0' + month : month;
		day = day < 10 ? '0' + day : day;
		return year + symbol +  month + symbol + day;
	} else {
		alert('formatDate : 参数错误, 支持2个参数(date, symbol-选填)');
	}
}

/**
 * 
 * @functionName: formatTime
 * @Description: 格式化Date对象的time
 * @param: date
 */
function formatTime() {
	if (arguments.length === 1) {
		var date = arguments[0];
		if (!(date instanceof Date)) {
			date  = date.split(/\s/);
			if (!date[1]) {
				return '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
			}
			var time = date[1].split(':');
			if (!time[2]) {
				time[2] = '00';
			}
			date = date[0].split('-');
			date = new Date(date[0], parseInt(date[1]) - 1, date[2], time[0], time[1], time[2]);
		}
		var hour = date.getHours(), minute = date.getMinutes(), second = date.getSeconds();
		hour = hour < 10 ? '0' + hour : hour;
		minute = minute < 10 ? '0' + minute : minute;
		second = second < 10 ? '0' + second : second;
		return hour + ':' +  minute + ':' + second;
	} else {
		alert('formatTime : 参数错误, 支持1个参数(date)');
	}
}

/**
 * 
 * @functionName: formatDay
 * @Description: 根据浏览器语言格式化Date对象的day
 * @param: date
 */
function formatDay() {  
	if (arguments.length === 1) {
		var date = arguments[0];
		if (!date) {
			return '';
		}
		if (!(date instanceof Date)) {
			date = date.split(/\s/)[0].split('-');
			date = new Date(date[0], parseInt(date[1]) - 1, date[2]);
		}
		var lang = navigator.language, day = date.getDay();
		lang = lang ? lang : navigator.systemLanguage;
		switch (lang) {
			case 'zh-CN':
				switch (day) {
					case 0:
						return '周日';
						break;
					case 1:
						return '周一';
						break;
					case 2:
						return '周二';
						break;
					case 3:
						return '周三';
						break;
					case 4:
						return '周四';
						break;
					case 5:
						return '周五';
						break;
					case 6:
						return '周六';
						break;
				}
				break;
			case 'ja-JP':
				switch (day) {
					case 0:
						return '日曜日';
						break;
					case 1:
						return '月曜日';
						break;
					case 2:
						return '火曜日';
						break;
					case 3:
						return '水曜日 ';
						break;
					case 4:
						return '木曜日 ';
						break;
					case 5:
						return '金曜日';
						break;
					case 6:
						return '土曜日 ';
						break;
				}
				break;
		}
	} else {
		alert('formatTime : 参数错误, 支持1个参数(date)');
	}
}

/**
 * 
 * @functionName: objToStr
 * @Description: 将JSON转换为String, 作为参数传进函数
 * @param: obj
 */
function objToStr(obj) {
	if (arguments.length === 1) {
		for(var key in obj) {
			if (typeof(obj[key]) === 'string' && obj[key].indexOf('[') > -1) {
				obj[key] = obj[key].replace(/\\\"/g, '\"');
				obj[key] = obj[key].replace(/\"/g, '\\\"');
			}
		}
		return JSON.stringify(obj).replace(/\s/g, '&nbsp;');
	} else {
		alert('objToStr : 参数错误, 支持1个参数(obj)');
	}
}
/**
*
* @functionName: fillWindow
* @Description: 当窗口没被填充满时，填充窗口
*
*/
function fillWindow() {
	var height = $(window).height() - 145-9;
	if (height >= 570) {
		$('.main-body').css('min-height', height);
	}
}
/***
 * 获取url中"?"符后的字串
 */
function getRequest() {
	var url = location.search; 
	var theRequest = new Object();
	if (url.indexOf("?") != -1) {
	   var str = url.substr(1);
	   strs = str.split("&");
	   for(var i = 0; i < strs.length; i ++) {
	      theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
	   }
	}
	return theRequest;
}

/* 取URL参数的函数 */
function request(paras) {
	var url = decodeURI(location.href);
	var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
	var paraObj = {};
	for (var i = 0; j = paraString[i]; i++) {
		paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
	}
	var returnValue = paraObj[paras.toLowerCase()];
	if (typeof(returnValue) == "undefined") {
		return "";
	} else {
		return returnValue;
	}
}

/**
 * 
 * @functionName: myRequest
 * @Description: 所有请求可以使用的通用方法
 * @param: paramObj, url
 */
function myRequest(paramObj, url){
	var result = '';
 	$.ajax({
	 	type : 'post',
	 	url : contextPath + url,
	 	data : paramObj,
	 	async : false,
	 	cache : false,
	 	dataType : 'json',
	 	success : function(data) {
	 		if (data.errCd === 0) {
	 			if (data.result) {
	 				result = data.result;
	 			}
	 		} else {
	 			alert(data.errMsg);
	 		}
	 	},
	 	error : function(){
	 		alert('发生错误');
	 	}
 	});
	return result;
}

/**
 * 
 * @param flag 显示时间类型
 * @desc 显示日期
 * @returns
 */
function cutTime(flag){
	var time;
	var nowTime=$("#changeTime").val();
	if(flag == "DAY"){
		time=nowTime;
	}else if(flag == "MONTH"){
		time=nowTime.substring(0,7);
	}else{
		time=nowTime.substring(0,4);
	}
	return time;
}

/** 
 * 在页面中任何嵌套层次的窗口中获取顶层窗口 
 * @return 当前页面的顶层窗口对象 
 */
function getTopWinow() {
	var p = window;
	while (p != p.parent) {
		p = p.parent;
	}
	return p;
}

setTimeout('resizeDatagrid()', 300);

/**
 * 当页面加载完之后需要调用的函数
 * @desc 详细介绍：http://www.jb51.net/article/32832.htm
 */
window.addEventListener('load', function(event) {
	//处理逻辑
});

//处理键盘事件
//禁止后退键（Backspace）密码或单行、多行文本框除外
function banKeyEvent(e) {
	var ev = e || window.event;// 获取event对象
	var obj = ev.target || ev.srcElement;// 获取事件源
	var t = obj.type || obj.getAttribute('type');// 获取事件源类型
 
 // 获取作为判断条件的事件类型
 var vReadOnly = obj.getAttribute('readonly');
 var vEnabled = obj.getAttribute('enabled');
 // 处理null值情况
 var userAgent = navigator.userAgent.toLowerCase();
 var rMsie = /(msie\s|trident.*rv:)([\w.]+)/;
 var match = rMsie.exec(userAgent);  
 if (match !== null) {
  	if(parseInt(match[2]) === 8) //IE 8.0 
  		vReadOnly = (vReadOnly === '') ? null : vReadOnly;
 }
 vReadOnly = (vReadOnly === null) ? false : true;
 vEnabled = (vEnabled === null) ? true : vEnabled;
 
 // 当敲Backspace键时，事件源类型为密码或单行、多行文本的，
 // 并且readonly属性为true或enabled属性为false的，则退格键失效
 var flag1 = (ev.keyCode === 8 && (t === 'password' || t === 'text' || t === 'textarea') && (vReadOnly === true || vEnabled !== true)) ? true : false;

 // 当敲Backspace键时，事件源类型非密码或单行、多行文本的，则退格键失效
//var flag2 = (ev.keyCode === 8 && t !== 'password' && t !== 'text' && t !== 'textarea') ? true : false;
 
 // 当敲Backspace键时，事件源类型非密码或单行、多行文本的，则退格键失效
 var flag2 = (ev.keyCode === 8 && obj.tagName !== 'INPUT' && obj.tagName !== 'TEXTAREA') ? true : false;
 
 // 判断
 if (flag1) {
     return false;
 }
 if (flag2) {
     return false;
 }
 
}
//禁止后退键
//作用于Firefox、Opera
document.onkeypress = banKeyEvent;
//禁止后退键
//作用于IE、Chrome
document.onkeydown = banKeyEvent;

//图片比例缩放
$(".img img").load(function(){
	DrawImage(this, 416, 312);
	$(".img img").show();
});
function DrawImage(Img, FitWidth, FitHeight) {//按比例显示
    var image = new Image();
    image.src = Img.src;
    if (image.width > 0 && image.height > 0) {
        if (image.width / image.height >= FitWidth / FitHeight) {
            if (image.width > FitWidth) {
                Img.width = FitWidth;
                Img.height = (image.height * FitWidth) / image.width;
            } else {
                Img.width = image.width;
                Img.height = image.height;
            }
        } else {
            if (image.height > FitHeight) {
                Img.height = FitHeight;
                Img.width = (image.width * FitHeight) / image.height;
            } else {
                Img.width = image.width;
                Img.height = image.height;
            }
        }
    }
    
}

/**
 * 
 * @functionName: JSONArrayToList
 * @Description: JSON数组转换为字符串
 * @param: array
 */
function JSONArrayToList() {
	if (arguments.length === 1) {
		var array = arguments[0], list = '[';
		for(var i=0; i<array.length; i++) {
			list += JSON.stringify(array[i]);
			if(i < array.length - 1) {
				list += ',';
			}
		}
		list += ']';
		return list;
	} else {
		alert('JSONArrayToList : 参数错误, 支持1个参数(array)');
	}
}

/**
 * 
 * @functionName: TableToJSONArray
 * @Description: 表格转换为JSON数组
 * 
 */
function TableToJSONArray(table, start, end, keyArr) {
	var list = new Array();
	var trs = $('#' + table + ' tbody').find('tr');
	for(var i = 0; i < trs.length; i++) {
		var keyCount = 0;
		var trObj = new Object();
		var tds = $(trs[i]).children();
		for(var j = start; j <= end && j < tds.length; j++) {
			var items = tds.eq(j).children();
			if(items != null && items.length > 0) {
				for(var q = 0; q < items.length; q++) {
					trObj[keyArr[keyCount]] = items.eq(q).val();
					keyCount++;
				}
			} else {
				trObj[keyArr[keyCount]] = tds.eq(j).text();
				keyCount++;
			}
		}
		list[i] = trObj;
	}
	return list;
}

//页面回到顶部功能
var scrolltotop={
		setting:{
			startline:100, //起始行
			scrollto:0, //滚动到指定位置
			scrollduration:400, //滚动过渡时间
			fadeduration:[500,100] //淡出淡现消失
		},
		controlHTML:'<img src="/lib/img/images/topback.gif" style="width:54px; height:54px; border:0; " />', //返回顶部按钮
		controlattrs:{offsetx:0,offsety:115},//返回按钮固定位置
		anchorkeyword:"#top",
		state:{
			isvisible:false,
			shouldvisible:false
		},scrollup:function(){
			if(!this.cssfixedsupport){
				this.$control.css({opacity:0});
			}
			var dest=isNaN(this.setting.scrollto)?this.setting.scrollto:parseInt(this.setting.scrollto);
			if(typeof dest=="string"&&jQuery("#"+dest).length==1){
				dest=jQuery("#"+dest).offset().top;
			}else{
				dest=0;
			}
			this.$body.animate({scrollTop:dest},this.setting.scrollduration);
		},keepfixed:function(){
			var $window=jQuery(window);
			var controlx=$window.scrollLeft()+$window.width()-this.$control.width()-this.controlattrs.offsetx;
			var controly=$window.scrollTop()+$window.height()-this.$control.height()-this.controlattrs.offsety;
			this.$control.css({left:controlx+"px",top:controly+"px"});
		},togglecontrol:function(){
			var scrolltop=jQuery(window).scrollTop();
			if(!this.cssfixedsupport){
				this.keepfixed();
			}
			this.state.shouldvisible=(scrolltop>=this.setting.startline)?true:false;
			if(this.state.shouldvisible&&!this.state.isvisible){
				this.$control.stop().animate({opacity:1},this.setting.fadeduration[0]);
				this.state.isvisible=true;
			}else{
				if(this.state.shouldvisible==false&&this.state.isvisible){
					this.$control.stop().animate({opacity:0},this.setting.fadeduration[1]);
					this.state.isvisible=false;
				}
			}
		},init:function(){
			jQuery(document).ready(function($){
				var mainobj=scrolltotop;
				var iebrws=document.all;
				mainobj.cssfixedsupport=!iebrws||iebrws&&document.compatMode=="CSS1Compat"&&window.XMLHttpRequest;
				mainobj.$body=(window.opera)?(document.compatMode=="CSS1Compat"?$("html"):$("body")):$("html,body");
				mainobj.$control=$('<div id="topcontrol">'+mainobj.controlHTML+"</div>").css({position:mainobj.cssfixedsupport?"fixed":"absolute",bottom:mainobj.controlattrs.offsety,right:mainobj.controlattrs.offsetx,opacity:0,cursor:"pointer"}).attr({title:"返回顶部"}).click(function(){mainobj.scrollup();return false;}).appendTo("body");if(document.all&&!window.XMLHttpRequest&&mainobj.$control.text()!=""){mainobj.$control.css({width:mainobj.$control.width()});}mainobj.togglecontrol();
				$('a[href="'+mainobj.anchorkeyword+'"]').click(function(){mainobj.scrollup();return false;});
				$(window).bind("scroll resize",function(e){mainobj.togglecontrol();});
			});
		}
	};
	scrolltotop.init();
	
/** * 对Date的扩展，将 Date 转化为指定格式的String * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
    可以用 1-2 个占位符 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) * eg: * (new
    Date()).pattern("yyyy-MM-dd hh:mm:ss.S")==> 2006-07-02 08:09:04.423      
 * (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04      
 * (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04      
 * (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04      
 * (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18      
 */  
	Date.prototype.pattern=function(fmt) {         
	    var o = {         
	    "M+" : this.getMonth()+1, //月份         
	    "d+" : this.getDate(), //日         
	    "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时         
	    "H+" : this.getHours(), //小时         
	    "m+" : this.getMinutes(), //分         
	    "s+" : this.getSeconds(), //秒         
	    "q+" : Math.floor((this.getMonth()+3)/3), //季度         
	    "S" : this.getMilliseconds() //毫秒         
	    };         
	    var week = {         
	    "0" : "/u65e5",         
	    "1" : "/u4e00",         
	    "2" : "/u4e8c",         
	    "3" : "/u4e09",         
	    "4" : "/u56db",         
	    "5" : "/u4e94",         
	    "6" : "/u516d"        
	    };         
	    if(/(y+)/.test(fmt)){         
	        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));         
	    }         
	    if(/(E+)/.test(fmt)){         
	        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);         
	    }         
	    for(var k in o){         
	        if(new RegExp("("+ k +")").test(fmt)){         
	            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));         
	        }         
	    }         
	    return fmt;         
	}       
	     
	var date = new Date();      
	window.alert(date.pattern("yyyy-MM-dd hh:mm:ss"));
	