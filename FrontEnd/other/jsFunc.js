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