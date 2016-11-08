/**
 * 元素位置交换方法
 * 常用于多个图片显示时,顺序互换
 */
var dragging, placeholders = $();
$.fn.sortable = function(options) {
	options = options || {};
	return this.each(function() {
		if (/^enable|disable|destroy$/.test(options)) {
			var items = $(this).children($(this).data('items')).attr('draggable', options == 'enable');
			options == 'destroy' &&	items.add(this)
				.removeData('connectWith').removeData('items')
				.unbind('dragstart.h5s dragend.h5s selectstart.h5s dragover.h5s dragenter.h5s drop.h5s');
			return;
		}
		var index, items = $(this).children(options.items), connectWith = options.connectWith || false;
		var placeholder = $('<' + items[0].tagName + ' class="sortable-placeholder">');
		var handle = options.handle, isHandle;
		items.find(handle).mousedown(function() {
			isHandle = true;
		}).mouseup(function() {
			isHandle = false;
		});
		$(this).data('items', options.items)
		placeholders = placeholders.add(placeholder);
		if (connectWith) {
			$(connectWith).add(this).data('connectWith', connectWith);
		}
		items.attr('draggable', 'true').bind('dragstart.h5s', function(e) {
			if (handle && !isHandle) {
				return false;
			}
			isHandle = false;
			var dt = e.originalEvent.dataTransfer;
			dt.effectAllowed = 'move';
			dt.setData('Text', 'dummy');
			dragging = $(this).addClass('sortable-dragging');
			index = dragging.index();
		}).bind('dragend.h5s', function() {
			dragging.removeClass('sortable-dragging').fadeIn();
			placeholders.detach();
			if (index != dragging.index()) {
				items.parent().trigger('sortupdate');
			}
			dragging = null;
		}).not('a[href], img').bind('selectstart.h5s', function() {
			this.dragDrop && this.dragDrop();
			return false;
		}).end().add([this, placeholder]).bind('dragover.h5s dragenter.h5s drop.h5s', function(e) {
			if (!items.is(dragging) && connectWith !== $(dragging).parent().data('connectWith')) {
				return true;
			}
			if (e.type == 'drop') {
				e.stopPropagation();
				placeholders.filter(':visible').after(dragging);
				return false;
			}
			e.preventDefault();
			e.originalEvent.dataTransfer.dropEffect = 'move';
			if (items.is(this)) {
				dragging.hide();
				$(this)[placeholder.index() < $(this).index() ? 'after' : 'before'](placeholder);
				placeholders.not(placeholder).detach();
			}
			return false;
		});
	});
};

//输入银行卡号自动添加空格
$('#box').keyup(function(){  
	var value = $(this).val().replace(/\s/g,'').replace(/(\d{4})(?=\d)/g,"$1 ");    
	$(this).val(value);  
});
/**
 * @name ajax请求前后处理函数
 * @desc 
 */
$.ajaxSetup({
	error: function(XMLHttpRequest, textStatus, errorThrown) {
		if (XMLHttpRequest.status == 403) {
			alert('すみません、権限足りない');
			return false;
		}
	},
	complete: function(XMLHttpRequest, textStatus) {
		var sessionstatus = XMLHttpRequest.getResponseHeader("sessionstatus"); //通过XMLHttpRequest取得响应头,sessionstatus， 
		if (sessionstatus == 'timeout') {
			//如果超时就处理 ，指定要跳转的页面  
			var top = getTopWinow(); //获取当前页面的顶层窗口对象
			top.location.href = "http://localhost/mo/login?session=timeout"; //跳转到登陆页面
		} else if (sessionstatus == 'permissionDenied') {
			var top = getTopWinow(); //获取当前页面的顶层窗口对象
			alert('すみません、権限足りない.');
			top.location.href = "http://logistics/mo/pages/login/login.jsp"; //跳转到登陆页面
		}
	}
});

$('#' + listNumber + '-receiver').hide();//拼串选择器
$("#form-add").form('clear');//easyui清楚表单方法

//定时器，发送信息倒计时。
$register.btnCount = 60;
$register.timer = null;
$("body").bind("click", myaction = function(){
	$("#code").focus();
	$("#getcode").attr("disabled",true);
	setBtnDisabled(); 
 });

function setBtnDisabled() {
	 $("#getcode").text( "(" + $register.btnCount + "秒后)重新发送");
		   if ($register.btnCount == 0) {
		       window.clearTimeout($register.timer);
		        $("#getcode").text( "获取校验码");
		        $("#code").focus();
		        $("#getcode").attr("disabled",false);
		       return false;
		   }
		   $register.btnCount = $register.btnCount - 1;
		   $register.timer = window.setTimeout("setBtnDisabled()", 1000);
		   $("body").unbind("click", myaction);
};

//页面加载图片出现错误时，给一个默认图片
$("img").error(function() { 
	$(this).attr("src", contextPath + "/lib/img/images/microlaw.jpg"); 
});

/**
 * 
 * @functionName: clone
 * @Description: 重写jQuery.clone方法
 * 
 */
(function (original) {
	jQuery.fn.clone = function () {
		var result = original.apply(this, arguments),
		my_textareas = this.find('textarea').add(this.filter('textarea')),
		result_textareas = result.find('textarea').add(result.filter('textarea')),
		my_selects = this.find('select').add(this.filter('select')),
		result_selects = result.find('select').add(result.filter('select'));
		 
		for (var i = 0, l = my_textareas.length; i < l; ++i) $(result_textareas[i]).val($(my_textareas[i]).val());
		for (var i = 0, l = my_selects.length; i < l; ++i) result_selects[i].selectedIndex = my_selects[i].selectedIndex;
		 
		return result;
	};
}) (jQuery.fn.clone);

/**
 * 所有表单不能输入特殊字符
 * 统一页面中的表单类名，便于管理。
 * 通过下面的控制，就不用再每个获取form字段值的时候再次trim操作了。
 */
$('form').on('keyup', 'input, textarea', function(e) {
	//禁止字符  ':222, ;:186, ^:54
	if (e.keyCode == 222 || e.keyCode == 186 || e.keyCode == 54) {
		$(this).val($(this).val().replace(/[';^]/g, ''));
	}
}).on('blur', 'input, textarea', function(e) {
	var newValue = $(this).val().trim();
	newValue = newValue.replace(/[\s]{2,}/, ' ');//出现2次以上的空格就替换为一个空格
	$(this).val(newValue);
});

/**
 * 导出文件方式的第二种方法
 * 并通过定时器定义按钮动态效果。
 */
$confirm('确认要导出内部账单吗？', function() {
	window.location.href = "/v1/api/analysis/bill/export-inner-bills.excel?sender_nm_cn=" + sender_nm_cn + "&master_id=" + master_id + "&start_date=" + start_date + "&end_date=" + end_date + "&waybill_id=" + waybill_id + "&cargo_type=" + cargo_type;
	$('#innerBill').text('处理中...');
	setTimeout("$('#innerBill').text('下载中...');", 4000);
	setTimeout("$('#innerBill').text('导出内部账单');", 8000);
});

/**
 * 使用jquery遍历方法
 *
 */
$.each($($innerBill.dialogChange).find('form').serializeArray(), function(index, field) {
	modifyPrice.addParam(field.name, encodeURIComponent(field.value));
});

$('input[name="waybill_no"]').unbind().keypress(function(e) {})//解绑回车事件再重新绑定其他事件

$alert(res.errMsg, function() {//提示确认后进行回调函数里面的操作
	window.location.href = "masters.html";
});
$confirm(result.msg + '是否继续入单？', {//提示窗可以定义两种按钮以及相应的处理函数
	yesText : '是',
	yesHandler : function() {
		location.reload();
	},
	noText : '否',
	noHandler : function() {
		jumpBack('masters');
	}
});

//再添加弹窗里面，如果有日期输入框，那么可以直接默认赋值为今天的日期，提高用户体验
var today = new Date();
$('#startDate').val(formatDate(today));