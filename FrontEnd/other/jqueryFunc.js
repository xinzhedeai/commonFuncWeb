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
