'use strict';
$(function() {
	//模拟赋值--datepicker, 实际赋值时根据具体情况
	var today = new Date();
	$('.endDate').val(formatDate(today));
	today.setMonth(today.getMonth() - 6);
	$('.startDate').val(formatDate(today));
	
	//创建jQueryUI datepicker
	$('.startDate, .endDate').datepickerJQueryUI();
	
	//验证全部表单
	$('#validateAll').click(function() {
		if ($('#formID').form('validate')) {
			$alert('yy');
		}
	});
	
	//验证单个input
	$('#validateOne').click(function() {
		
	});
	
});